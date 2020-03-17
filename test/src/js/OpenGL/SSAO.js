import Pipeline from '../PipeLine'
import {
  gl,
  canvas,
  toRadian
} from 'libs/GlTools'

import gBufferVs from 'shaders/ssao/ssao_geometry.vert'
import gBufferFs from 'shaders/ssao/ssao_geometry.frag'
import ssaoVs from 'shaders/deferred_shading/finalQuad.vert'
import ssaoFs from 'shaders/ssao/ssao.frag'
import ssaoBlurFs from 'shaders/ssao/ssao_blur.frag'
import ssaoLightingFs from 'shaders/ssao/ssao_lighting.frag'

import {
  mat4, vec3
} from 'gl-matrix'
import OBJLoader from 'libs/loaders/ObjLoader'
import MTLLoader from 'libs/loaders/MTLLoader'
import FrameBuffer from 'libs/FrameBuffer'
import Texture from 'libs/GLTexture'
import Geom from 'libs/Geom'
import { GlTools } from '../../../libs/GlTools'


const lightPositions = [0 ,-1, 0]
const lightColors = [.2, .2, .7]
const kernelSize = 64
let ssaoKernel = new Float32Array(64*3)
let ssaoNoise = new Float32Array(16*3)
const generateSample = () => {
  for(let i =0; i < kernelSize; i++) {
    let sample = vec3.fromValues(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random())
    ssaoKernel[i * 3] = sample[0]
    ssaoKernel[i * 3 + 1] = sample[1]
    ssaoKernel[i * 3 + 2] = sample[2]
  }
}
const generateNoise = () => {
  for (let i = 0; i < 16; i++) {
    let noise = vec3.fromValues(Math.random() * 2 - 1, Math.random() * 2 - 1, 0)
    ssaoNoise[i * 3] = noise[0]
    ssaoNoise[i * 3 + 1] = noise[1]
    ssaoNoise[i * 3 + 2] = noise[2]
  }
}
export default class SSAO extends Pipeline {
  count = 0
  constructor() {
    super()

  }
  init() {

    GlTools.applyHdrExtension()
    this.gBufferPrg = this.compile(gBufferVs, gBufferFs)
    this.ssaoPrg = this.compile(ssaoVs, ssaoFs)
    this.blurPrg = this.compile(ssaoVs, ssaoBlurFs)
    this.prg = this.compile(ssaoVs, ssaoLightingFs)
  }
  async attrib() {

    this.cube = Geom.cube(2)

    this.quad = Geom.plane(3, 2)

    const materials = await new MTLLoader('nanosuit.mtl', './assets/models/nanosuit').parse(getAssets.nanosuitMTL)
    new OBJLoader().load('./assets/models/nanosuit/nanosuit.obj', (o) => {
      this.nanosuit = OBJLoader.parse(o ,materials)
    })

  }
  prepare() {
  
    //position, normal, AlbedoSpec(diffuse, specular indensity)
    this.mrt = new FrameBuffer(canvas.width, canvas.height, {hdr: true}, 3)
    this.ssaoFbo = new FrameBuffer()
    this.blurFbo = new FrameBuffer()


    generateSample()
    generateNoise()
    this.noiseTexture = new Texture(ssaoNoise, {}, 4, 4)
    this.noiseTexture.bind()
    this.noiseTexture.repeat()
    // execute once
    this.orbital.target = [0, -1., 0]
    this.orbital.offset = [0, 0., 0]
    this.orbital.radius = 3
    this.orbital.rx = -1.5

    
  }
  uniform() {
    this.frameBufferGUI.textureList = [{ texture:  this.noiseTexture}]

  }

  render() {

    // gl.bindFramebuffer(gl.FRAMEBUFFER, this.mrt.frameBuffer)
    //   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    //   this.gBufferPrg.use()
    //   if (this.nanosuit) { // loaded
    //     let mMatrix = mat4.create()
    //     mat4.translate(mMatrix, mMatrix, [-1.0, -3.3, 3.])
    //     mat4.scale(mMatrix, mMatrix, [.4, .4, .4])
    //     mat4.rotate(mMatrix, mMatrix, -Math.PI / 2 , [1, 0, 0])

    //     this.gBufferPrg.style({
    //       mMatrix,
    //       invertedNormals: 0
    //     })
    //     GlTools.draw(this.nanosuit)
    //   }

    //   let mMatrix = mat4.create()
    //   mat4.scale(mMatrix, mMatrix,[8, 4, 8])
    //   this.gBufferPrg.style({
    //     mMatrix,
    //     invertedNormals: 1
    //   })
    //   GlTools.draw(this.quad)
    // gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    // this.ssaoFbo.bind()
    //   gl.clear(gl.COLOR_BUFFER_BIT)

    //   this.ssaoPrg.use()
    //   this.ssaoPrg.style({
    //     gPosition: this.mrt.getTexture(0),
    //     gNormal: this.mrt.getTexture(1),
    //     texNoise: this.noiseTexture,
    //     samples: ssaoKernel,
    //     pMatrix: this.pMatrix
    //   })
    //   GlTools.draw(this.quad)
    // this.ssaoFbo.unbind()

    // this.blurFbo.bind()

    //   this.blurPrg.use()
    //   this.blurPrg.style({
    //     ssaoInput: this.ssaoFbo.getTexture()
    //   })
    //   GlTools.draw(this.quad)
    // this.blurFbo.unbind()

    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    
    // this.prg.use()
    // this.prg.style({
    //   gPosition: this.mrt.getTexture(0),
    //   gNormal: this.mrt.getTexture(1),
    //   gAlbedoSpec: this.mrt.getTexture(2),
    //   ssao: this.blurFbo.getTexture(),
    //   viewPos: this.camera.position,
    //   'lights.Position': lightPositions,
    //   'lights.Color': lightColors,
    //   'lights.Linear': .09,
    //   'lights.Quadratic': .032
    // })

    // GlTools.draw(this.quad)

  }
}

function framebufferMRT(width, height, type) {
  let frameBuffer = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer)

  let fTexture = []
  const bufferList = []
  for (let i = 0; i < type.length; ++i) {
    fTexture[i] = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, fTexture[i])
    if (type[i] === '16f') {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, width, height, 0, gl.RGBA, gl.HALF_FLOAT, null)
    } else {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, fTexture[i], 0)
    bufferList.push(gl.COLOR_ATTACHMENT0 + i)
  }
  gl.drawBuffers(bufferList) // 指定渲染目标

  const depthRenderBuffer = gl.createRenderbuffer()
  gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer)
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH24_STENCIL8, width, height)
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer)

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
  if (status != gl.FRAMEBUFFER_COMPLETE) {
    console.log(`gl.checkFramebufferStatus() returned ${status.toString(16)}`);
  }

  gl.bindTexture(gl.TEXTURE_2D, null)
  gl.bindRenderbuffer(gl.RENDERBUFFER, null)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  return {
    frameBuffer: frameBuffer,
    depthBuffer: depthRenderBuffer,
    texture: fTexture
  }
}
/*
  // 几何处理阶段: 渲染到G缓冲中
  glBindFramebuffer(GL_FRAMEBUFFER, gBuffer);
  [...]
  glBindFramebuffer(GL_FRAMEBUFFER, 0);

  // 使用G缓冲渲染SSAO纹理
  glBindFramebuffer(GL_FRAMEBUFFER, ssaoFBO);
  glClear(GL_COLOR_BUFFER_BIT);
  shaderSSAO.Use();
  glActiveTexture(GL_TEXTURE0);
  glBindTexture(GL_TEXTURE_2D, gPositionDepth);
  glActiveTexture(GL_TEXTURE1);
  glBindTexture(GL_TEXTURE_2D, gNormal);
  glActiveTexture(GL_TEXTURE2);
  glBindTexture(GL_TEXTURE_2D, noiseTexture);
  SendKernelSamplesToShader();
  glUniformMatrix4fv(projLocation, 1, GL_FALSE, glm::value_ptr(projection));
  RenderQuad();
  glBindFramebuffer(GL_FRAMEBUFFER, 0);

  // 光照处理阶段: 渲染场景光照
  glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  shaderLightingPass.Use();
  [...]
  glActiveTexture(GL_TEXTURE3);
  glBindTexture(GL_TEXTURE_2D, ssaoColorBuffer);
  [...]
  RenderQuad();
*/
