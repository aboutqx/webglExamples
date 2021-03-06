/*
 https://developer.download.nvidia.cn/CgTutorial/cg_tutorial_chapter07.html
*/
import Pipeline from '../PipeLine'
import BatchSkyBox from 'libs/helpers/BatchSkyBox'
import sFs from 'libs/glsl/env_map/env_specular.frag'
import rFs from 'libs/glsl/env_map/env_refract.frag'
import fFs from 'libs/glsl/env_map/fresnell_chromatic.frag'
import {
    mat4
} from 'gl-matrix'
import {
    GlTools
} from 'libs/GlTools'

export default class EnvMap extends Pipeline {
    constructor() {
        super()

    }
    init() {

        this.specularPrg = this.basicVert(sFs)
        this.refractPrg = this.basicVert(rFs)
        this.frenellPrg = this.basicVert(fFs)
    }
    attrib() {
        this.skybox = new BatchSkyBox(40, getAssets.rad)

    }
    prepare() {
        this.venus = getAssets.venus

        this.orbital.radius = 19
        this.orbital.target = [0, 5, 0]

        window.params = {
            metallic:1,
            roughness:0,
            specular:1,

            
            gamma:2.2,
            exposure:1,
            color: [.1, .1, .1]
        };

		this.textureIrr = getAssets.irr;
		this.textureRad = getAssets.rad
        
        this.addPbrParams(window.params)

    }
    uniform() {
        const { metallic, specular, roughness, color, gamma, exposure } = this.params;

        this.customUniforms = {
            uRadianceMap: this.textureRad,
            uIrradianceMap: this.textureIrr,
            uAoMap: getAssets.aoVenus,
            uGamma: gamma,
            uExposure: exposure,
            uRoughness: roughness,
            uMetallic: metallic,
            uSpecular: specular,
            uBaseColor: color.map(v => v/255)
        }

    }
    render() {

        GlTools.clear()
        this.skybox.draw()

        const mMatrix = mat4.create()
        mat4.translate(mMatrix, mMatrix, [-6, 0, 0])
        this.specularPrg.use()
        this.specularPrg.style({
            mMatrix,
            ...this.customUniforms
        })
        GlTools.draw(this.venus)

        mat4.identity(mMatrix)
        mat4.translate(mMatrix, mMatrix, [0, 0, 0])
        this.refractPrg.use()
        this.refractPrg.style({
            mMatrix,
            uRefractionRate: 1.53,
            ...this.customUniforms
        })
        GlTools.draw(this.venus)

        mat4.identity(mMatrix)
        mat4.translate(mMatrix, mMatrix, [6, 0, 0])
        this.frenellPrg.use()
        this.frenellPrg.style({
            mMatrix,
            ...this.customUniforms,
            etaRatio: [.65, .67, .69],
            fresnelPower: .8,
            fresnelBias: .1,
            fresnelScale: .9
        })
        GlTools.draw(this.venus)


    }
}

