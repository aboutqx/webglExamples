import Pipeline from '../PipeLine'
import {
    gl,
    GlTools
} from 'libs/GlTools'
import vs from 'shaders/mask.vert'
import fs from 'shaders/mask.frag'
import outlineFs from 'shaders/maskOutline.frag'
import { mat4, vec4 } from 'gl-matrix'
import Intersect from 'physics/Intersect'
import Geom from 'libs/Geom'

function transformPosition(vertices, mMatrix) {
    let t1
    let result = []
    for (let i = 0; i < vertices.length; i++) {
        t1 = vec4.fromValues(vertices[i][0], vertices[i][1], vertices[i][2], 1)
        let t = vec4.create()
        vec4.transformMat4(t, t1, mMatrix)
        let tmp = Array(...t).splice(0, 3, 1)
        result.push(tmp)
    }
    return result
}
export default class Mask extends Pipeline {
    constructor() {
        super()
    }
    init() {
        this.outlinePrg = this.compile(vs, outlineFs)
        this.prg = this.compile(vs, fs)

        this.intersect = new Intersect()
    }
    attrib() {

        this.cube = Geom.cube(1)
        this.torus = Geom.torus(64, 64, .1, .4)


        this.cubeFrame = this.cube.boundingAABB().getFrame()
        this.torusFrame = this.torus.boundingAABB().getFrame()


        this.texture = getAssets.flower
        this.texture.magFilter =  gl.LINEAR
        this.texture.minFilter =  gl.NEAREST_MIPMAP_NEAREST

    }
    _setGUI() {
        this.addGUIParams({
            lod: 1.
        })

        let folder = this.gui.addFolder('tetxureLod lod param')
        folder.add(this.params, 'lod', 1., Math.log2(512)).step(1.)
        folder.open()

        this.addRadio('NEAREST_MIPMAP_NEAREST', ['NEAREST_MIPMAP_NEAREST', 'LINEAR_MIPMAP_LINEAR'], 'filter type')
    }

    prepare() {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LESS);
        gl.enable(gl.STENCIL_TEST);
        gl.stencilFunc(gl.NOTEQUAL, 1, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);

    }
    uniform() {

        const pMatrix = mat4.clone(this.camera.projectionMatrix)
        const vMatrix = mat4.clone(this.camera.viewMatrix)
        this.intersect.setRay(this.mousePos.x, this.mousePos.y, pMatrix, vMatrix, this.camera.position)

        this.texture.bind()
        if(this.params.LINEAR_MIPMAP_LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        else gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
    }
    render() {

        GlTools.clear()
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT)
        gl.stencilMask(0x00) //写入0

        // translate 之后鼠标放在cube水平中心点很远的地方也能触发outline，这是个bug,原因是boundingbox计算有问题，初始minX，maxX这些值为0，0实际上已经是一个值了
        // 应该换成循环的第一个值为min和max，而不是0
        const mMatrix = mat4.create()
        mat4.translate(mMatrix, mMatrix, [-2.5, 0, 0])

        if (this.intersect.castRay(transformPosition(this.cube.vertices, mMatrix))) {
            this.renderOutline(mMatrix, this.cube)
        } else this.renderDefault(mMatrix, this.cube)

        mat4.identity(mMatrix)
        mat4.translate(mMatrix, mMatrix, [2., 0, 0])
        if (this.intersect.castRay(transformPosition(this.torus.vertices, mMatrix))) {
            this.renderOutline(mMatrix, this.torus)
        } else this.renderDefault(mMatrix, this.torus)

        /*draw boundingVolume
            mMatrix = mat4.create()
            mat4.translate(mMatrix, mMatrix, [1.5, 0, 0])
            this.prg.use()
            this.prg.style({
              uModelMatrix: mMatrix,
              texture: 0,
              lod: this.params.lod
            })
            GlTools.draw(this.torusFrame)

            mMatrix = mat4.create()
            mat4.scale(mMatrix, mMatrix, [.6, .6, .6])
            mat4.translate(mMatrix, mMatrix, [-2.05, 0, 0])
            this.prg.style({
              uModelMatrix: mMatrix,
              texture: 0,
              lod: this.params.lod
            })
            GlTools.draw(this.cubeFrame)
        */
    }
    renderDefault(mMatrix, mesh) {
        this.prg.use()
        this.prg.style({
            texture: this.texture,
            uModelMatrix: mMatrix,
            lod: this.params.lod
        })
        GlTools.draw(mesh, true)
    }
    renderOutline(mMatrix, mesh) {
        gl.stencilFunc(gl.ALWAYS, 1, 0xff)
        gl.stencilMask(0xff) //写入1
        this.renderDefault(mMatrix, mesh)

        gl.stencilFunc(gl.NOTEQUAL, 1, 0xff);//不等于1的才能通过测试
        gl.stencilMask(0x00); //写入0
        const scale = 1.1;
        mat4.scale(mMatrix, mMatrix, [scale, scale, scale])

        this.outlinePrg.use()
        this.outlinePrg.style({
            uModelMatrix: mMatrix,
        })
        GlTools.draw(mesh, true)
    }

}
