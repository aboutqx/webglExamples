import Pipeline from '../PipeLine'
import fs from 'libs/glsl/obj/objMtl.frag'
import Geom from 'libs/Geom'
import {
    mat4,
    vec3
} from 'gl-matrix'
import {
    gl,
    canvas,
    toRadian,
    GlTools
} from 'libs/GlTools'
import MTLLoader from 'libs/loaders/MTLLoader'


const NR_LIGHTS = 32
const lightPositions = []
const lightColors = []
for (let i = 0; i < NR_LIGHTS; i++) {
    // calculate slightly random offsets
    let xPos = Math.random() * 20 - 16.0;
    let yPos = Math.random() * 25 - 2.0;
    let zPos = Math.random() * 10 - 4.0;
    lightPositions.push([xPos, yPos, zPos]);
    // lightPositions.push()
    // also calculate random color
    let rColor = (Math.random() / 2.0) + 0.5; // between 0.5 and 1.0
    let gColor = (Math.random() / 2.0) + 0.5; // between 0.5 and 1.0
    let bColor = (Math.random() / 2.0) + 0.5; // between 0.5 and 1.0
    lightColors.push([rColor, gColor, bColor]);
}
export default class Color extends Pipeline {
    constructor() {
        super()

    }
    init() {
        this.prg = this.basicVert(fs)
        this.lampPrg = this.basicColor()
    }
    async attrib() {

        this.lamp = Geom.sphere(.2, 60)

        const materials = await new MTLLoader('nanosuit.mtl', './assets/models/nanosuit').parse(getAssets.nanosuitMTL)
        this.nanosuit = getAssets.nanosuit.map(v => {
            v.setMaterial(materials[v.material.name])
            return v
        })

    }
    prepare() {
        this.orbital.radius = 22
        this.orbital.offset = [0, 8, 0]
        this.orbital.target = [0, 8, 0]

    }
    uniform() {

        const mMatrix = mat4.create()

        this.prg.use()
        this.prg.style({
            mMatrix
        })

        for (let i = 0; i < lightPositions.length; i++) {
            this.prg.style({
                [`lights[${i}].Position`]: lightPositions[i],
                [`lights[${i}].Color`]: lightColors[i],
                [`lights[${i}].Linear`]: .1,
                [`lights[${i}].Quadratic`]: .12
            })

        }
    }
    render() {
        GlTools.clear()

        GlTools.draw(this.nanosuit)

        const mMatrix = mat4.create()
        mat4.translate(mMatrix, mMatrix, lightPositions[0])
        mat4.scale(mMatrix, mMatrix, [.2, .2, .2])

        this.lampPrg.use()
        this.lampPrg.style({
            mMatrix,
            color: lightColors[0]
        })
        GlTools.draw(this.lamp)
    }
}
