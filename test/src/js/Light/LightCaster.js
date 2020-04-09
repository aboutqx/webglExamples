import Pipeline from '../PipeLine'
import Geom from 'libs/Geom'
import vs from 'shaders/basic.vert'
import fs from 'shaders/light_caster/directionalLight.frag'
import pointFs from 'shaders/light_caster/pointLight.frag'
import spotFs from 'shaders/light_caster/spotLight.frag'
import lampFs from 'shaders/light_caster/lamp.frag'
import lampVs from 'shaders/light_caster/lamp.vert'
import {
	mat4
} from 'gl-matrix'
import {
	toRadian,
	GlTools
} from 'libs/GlTools'

const lightColor = [0.33, 0.42, 0.18]
let lightPos
const cubePosition = [
	[0.0, 0.0, 0.0],
	[2.0, 5.0, -15.0],
	[-2.5, -2.2, -2.5],
	[-1.8, -2.0, -12.3],
	[2.4, -0.4, -3.5],
	[-1.7, 3.0, -7.5],
	[1.3, -2.0, -2.5],
	[1.5, 2.0, -2.5],
	[2.5, 0.2, -1.5],
	[-0.9, 1.0, -1.5]
]
export default class LightCaster extends Pipeline {
	count = 0
	constructor() {
		super()

	}
	init() {
		this.prg = this.compile(vs, fs)
		this.pointPrg = this.compile(vs, pointFs)
		this.spotPrg = this.compile(vs, spotFs)
		this.lampPrg = this.compile(lampVs, lampFs)
	}
	attrib() {

		this.cube = Geom.cube(1)

		this.lamp = Geom.sphere(.1, 20)
	}
	prepare() {

		this.diffuseTexture = getAssets.cubeDiffuse
		this.specularTexture = getAssets.cubeSpecular
		this.emissionTexture = getAssets.cubeEmission

		this.orbital.radius = 6
	}
	_setGUI() {
		this.addGUIParams({
			directionalLight: false,
			pointLight: true,
			spotLight: false
		})

		let folder1 = this.gui.addFolder('diffuse model')
		folder1.add(this.params, 'directionalLight').listen().onChange(() => {
			this.setChecked('directionalLight')
		})
		folder1.add(this.params, 'pointLight').listen().onChange(() => {
			this.setChecked('pointLight')
		})
		folder1.add(this.params, 'spotLight').listen().onChange(() => {
			this.setChecked('spotLight')
		})
		folder1.open()
	}

	setChecked(prop) {
		this.params.directionalLight = false
		this.params.pointLight = false
		this.params.spotLight = false
		this.params[prop] = true
	}

	uniform() {

	}

	_renderLight(lightPos) {
		
		let mMatrix = mat4.create()
		mat4.scale(mMatrix, mMatrix, [.5, .5, .5])
		mat4.translate(mMatrix, mMatrix, lightPos)
		this.lampPrg.use()
		this.lampPrg.style({
			mMatrix,
			lightColor
		})
		GlTools.draw(this.lamp)
	}

	render() {
		GlTools.clear(0, 0 , 0)

		const customUniforms = {
			'material.shininess': 30,
			'material.diffuse': this.diffuseTexture,
			'material.specular': this.specularTexture,
			'material.emission': this.emissionTexture,
			'light.ambient': [.1, .1, .1],
			'light.diffuse': [1.5, 1.5, 11.5],
			'light.specular': [.3, .3, .3],
		}
		if (this.params.directionalLight) {
			lightPos = [0, 0, 1].map(v => v * 10)
			this.prg.use()
			this.prg.style({
				...customUniforms,
				'light.direction': [-lightPos[0], -lightPos[1], -lightPos[2]] //光源方向为从光源出发，因此是坐标向量取负
			})
			cubePosition.map((position, i) => {
				let cubemMatrix = mat4.create()
				// mat4.scale(cubemMatrix, cubemMatrix, [.5, .5, .5])
				mat4.rotate(cubemMatrix, cubemMatrix, toRadian(20 * i), lightPos)
				mat4.translate(cubemMatrix, cubemMatrix, position)
				this.prg.style({
					mMatrix: cubemMatrix
				})
				GlTools.draw(this.cube)
			})
		} else if (this.params.pointLight) {
			this.pointPrg.use()

			lightPos = [0, 0, -1.5]
			this.pointPrg.style({
				...customUniforms,
				'light.position': lightPos,
				//衰减系数
				'light.constant': 3,
				'light.linear': .09,
				'light.quadratic': .032
			})
			cubePosition.map((position, i) => {
				let cubemMatrix = mat4.create()
				mat4.rotate(cubemMatrix, cubemMatrix, toRadian(20 * i), lightPos)
				mat4.translate(cubemMatrix, cubemMatrix, position)
				this.pointPrg.style({
					mMatrix: cubemMatrix
				})
				GlTools.draw(this.cube)
			})
		} else if (this.params.spotLight) {
			lightPos = [0, 0, 1].map(v => v * 6)
			this.spotPrg.use()

			this.spotPrg.style({
				...customUniforms,
				'light.position': lightPos,
				'light.direction': [-lightPos[0], -lightPos[1], -lightPos[2]],
				'light.cutOff': Math.cos(toRadian(12.5)),
				'light.outerCutOff': Math.cos(toRadian(15.5)),

				//衰减系数
				'light.constant': 1,
				'light.linear': .09,
				'light.quadratic': .032
			})
			cubePosition.map((position, i) => {
				let cubemMatrix = mat4.create()
				mat4.rotate(cubemMatrix, cubemMatrix, toRadian(20 * i), lightPos)
				mat4.translate(cubemMatrix, cubemMatrix, position)
				this.spotPrg.style({
					mMatrix: cubemMatrix
				})
				GlTools.draw(this.cube)
			})
		}

		this._renderLight(lightPos)
	}
}
