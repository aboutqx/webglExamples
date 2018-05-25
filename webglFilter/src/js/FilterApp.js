/*
custom gl setting,has filter[s]
*/
import Program from 'libs/glProgram'
import Texture from 'libs/glTexture'
import Fbo from 'libs/glFbo'
import { ArrayBuffer } from 'libs/glBuffer'
import filter from './Filter'
import Emitter from './Emitter'

const SHADER = {}
SHADER.VERTEX_IDENTITY = `
  precision highp float;
  attribute vec3 position;
  uniform float flipY;
  varying vec2 uv;
  void main(void) {
  gl_Position = vec4(-position.x, position.y*flipY, position.z, 1.);
  uv = -position.xy*.5+.5;
  }`

SHADER.FRAGMENT_IDENTITY = require('../shaders/frg_identity.frag')

class FilterApp {
  _drawCount = 0
  _sourceTexture = null
  _lastInChain = false
  _curFBOIndex = -1
  _tmpFBO = [null, null]
  _filterChain = []
  _width = -1
  _height = -1
  prg = null
  _canvas = document.querySelector('canvas')
  textures = []

  constructor (data) {

    this._createGL()
    this._resize(data.width, data.height)
  }

  _createGL () {
    this.gl = this._canvas.getContext('webgl') || this._canvas.getContext('experimental-webgl')
    if (!this.gl) {
      throw new Error("Couldn't get WebGL context")
    }
    this._filter = filter

  }


  addFilter (name) {
    var args = Array.prototype.slice.call(arguments, 1)
    const Filter = this._filter[name]

    this._filterChain.push({ instance: new Filter(this), args: args })
  }

  reset () {
    this._filterChain = []
  }

  _setupGL (data) {
    let gl = this.gl
    if (data.nodeName.toLowerCase() === 'video') {
      data.width = data.videoWidth
      data.height = data.videoHeight
    }
    this._resize(data.width, data.height)
    gl.clearColor(161 / 255, 161 / 255, 161 / 255, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }

  render (data) {
    this._setupGL(data)

    // gl.getParameter(gl.ACTIVE_TEXTURE);
    this._drawCount = 0

    // no filters? just draw
    if (this._filterChain.length === 0) {
      this._compilePrg(SHADER.FRAGMENT_IDENTITY)
      this._lastInChain = true
      this.prg.use()
      let t= new Texture().fromImage(data)
      t.bind(0)
      this._draw()
    } else {
      for (var i = 0; i < this._filterChain.length; i++) {
        this._lastInChain = (i === this._filterChain.length - 1)
        this._filterChain[i].instance.render(this._filterChain[i].args || [])
      }
    }
    return this._canvas
  }

  _resize (width, height) {
    let gl = this.gl

    if (width === this._width && height === this._height) {
      return
    }

    this._canvas.width = this._width = width
    this._canvas.height = this._height = height

    Emitter.on('resizeCanvas' , (e,data) => {
      this._canvas.width = e.detail.width
      this._canvas.height = e.detail.height
    })
    // Note sure if this is a good idea; at least it makes texture loading
    // in Ejecta instant.
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
    gl.viewport(0, 0, this._width, this._height)

    // Delete old temp framebuffers
    this._tmpFBO = [null, null]
  }

  _getFbo (index) {
    this._tmpFBO[index] =
      this._tmpFBO[index] ||
      this._createFbo(this._width, this._height)

    return this._tmpFBO[index]
  }

  _createFbo (width, height) {
    let gl = this.gl
    var fbo = new Fbo()
    fbo.resize(width, height)
    return { fbo: fbo.fbo, texture: fbo.color }
  }

  _draw (toScreen) {
    let source = null
    let target = null
    this.flipY = false
    let gl = this.gl
    if (this._drawCount === 0) {
      // First draw call - use the source texture
      source = this._sourceTexture
    } else {
      // All following draw calls use the temp buffer last drawn to
      source = this._getFbo(this._curFBOIndex).texture
    }
    this._drawCount++

    // Set up the target
    if (this._lastInChain && !toScreen) {
      target = null
      this.flipY = this._drawCount % 2 === 0
    } else {
      // Intermediate draw call - get a temp buffer to draw to
      this._curFBOIndex = (this._curFBOIndex + 1) % 2
      target = this._getFbo(this._curFBOIndex).fbo
    }
    // Bind the source and target and draw the two triangles
    gl.bindTexture(gl.TEXTURE_2D, source)
    gl.bindFramebuffer(gl.FRAMEBUFFER, target)
    gl.uniform1f(this.prg.flipY(), this.flipY ? -1 : 1)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  _compilePrg (fshader, vshader) {
    // Compile shaders
    let gl = this.gl
    this.prg = new Program(gl)
    this.prg.compile(vshader || SHADER.VERTEX_IDENTITY, fshader)
    return this.prg
  }
}

export default FilterApp