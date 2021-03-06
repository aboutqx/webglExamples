// GLShader.js

'use strict';

import { gl, GlTools } from './GlTools';
import GLTexture from './GLTexture';
import GLCubeTexture from './GLCubeTexture';
import WebglNumbers from './utils/WebglNumber'
import ModifyShader from './shaders/ModifyShader'

const isSame = (array1, array2) => {
    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }

    return true;
};

const addLineNumbers = (string) => {
    const lines = string.split('\n');
    for (let i = 0; i < lines.length; i++) {
        lines[i] = `${(i + 1)}: ${lines[i]}`;
    }
    return lines.join('\n');
};


const cloneArray = (mArray) => {
    if (mArray.slice) {
        return mArray.slice(0);
    } else {
        return new Float32Array(mArray);
    }
};


import defaultVertexShader from './glsl/basic.vert'
import defaultFragmentShader from './glsl/basic.frag'

const uniformMapping = {
    float: 'uniform1f',
    vec2: 'uniform2fv',
    vec3: 'uniform3fv',
    vec4: 'uniform4fv',
    int: 'uniform1i',
    mat3: 'uniformMatrix3fv',
    mat4: 'uniformMatrix4fv'
};

const mapping = {
    FLOAT_VEC2: 'uniform2fv',
    FLOAT_VEC3: 'uniform3fv',
    FLOAT_VEC4: 'uniform4fv',
    FLOAT_MAT3: 'uniformMatrix3fv',
    FLOAT_MAT4: 'uniformMatrix4fv'
}

class GLShader {
    constructor(strVertexShader = defaultVertexShader, strFragmentShader = defaultFragmentShader, settings = {}) {
        this.parameters = [];
        this._uniformTextures = [];
        this._varyings = settings.varyings;
        this.pointSize = settings.pointSize;
        this._replaces = settings.replaces;

        if (!strVertexShader) { strVertexShader = defaultVertexShader; }
        if (!strFragmentShader) { strFragmentShader = defaultVertexShader; }

        this._name = strFragmentShader.split('//')[1]
        this._name = !this._name ? '' : this.name.split('\n')[0]

        
        strVertexShader = this._modify(strVertexShader)

        const vsShader = this._createShaderProgram(strVertexShader, true);
        const fsShader = this._createShaderProgram(strFragmentShader, false);
        this._attachShaderProgram(vsShader, fsShader);

    }

    _modify(strVertexShader) {
        if(this.pointSize) strVertexShader = ModifyShader.addPointSize(strVertexShader, this.pointSize)
        if(this._varyings && !this._varyings.length) {
            for(let key in this._varyings) {
                strVertexShader = ModifyShader.addVertIn(strVertexShader, key, this._varyings[key])
            }
        }
        if(this.replaces) {}
        return strVertexShader
    }

    use() {
        this.bind()
    }

    bind() {

        if(GlTools.shader === this) {
        	return;
        }
        gl.useProgram(this.shaderProgram);
        GlTools.useShader(this)
        // this.uniformTextures = [];

    }


    uniform(mName, mType, mValue) {
        if (typeof mName === 'object') {
            this.uniformObject(mName);
            return;
        }
		/*
		if(!!mValue === undefined || mValue === null) {
			console.warn('mValue Error:', mName);
			return;
		}
    */  
 
        const uniformType = (mType == 'float' && mValue.length) ? 'uniform1fv' :(uniformMapping[mType] || mType);

        let hasUniform = false;
        let oUniform;
        let parameterIndex = -1;


        for (let i = 0; i < this.parameters.length; i++) {
            oUniform = this.parameters[i];
            if (oUniform.name === mName) {
                hasUniform = true;
                parameterIndex = i;
                break;
            }
        }

        let isNumber = false;
        const customShaders = GlTools.customUniforms

        if (!hasUniform) {
            isNumber = uniformType === 'uniform1i' || uniformType === 'uniform1f';
            this.shaderProgram[mName] = gl.getUniformLocation(this.shaderProgram, mName);

            if(!this.shaderProgram[mName] && !customShaders.includes(mName)) {
                console.log(this.shaderProgram[mName], mName, this._name)
            }
            
            if (isNumber) {
                this.parameters.push({ name: mName, type: uniformType, value: mValue, uniformLoc: this.shaderProgram[mName], isNumber });
            } else {
                this.parameters.push({ name: mName, type: uniformType, value: cloneArray(mValue), uniformLoc: this.shaderProgram[mName], isNumber });
            }

            parameterIndex = this.parameters.length - 1;
        } else {
            this.shaderProgram[mName] = oUniform.uniformLoc;
            isNumber = oUniform.isNumber;
        }


        if (!this.parameters[parameterIndex].uniformLoc) {
            return;
        }


        if (uniformType.indexOf('Matrix') === -1) {
            if (!isNumber) {
                if (!isSame(this.parameters[parameterIndex].value, mValue) || !hasUniform) {
                    gl[uniformType](this.shaderProgram[mName], mValue);
                    this.parameters[parameterIndex].value = cloneArray(mValue);
                }
            } else {
                const needUpdate = (this.parameters[parameterIndex].value !== mValue || !hasUniform);
                if (needUpdate) {
                    gl[uniformType](this.shaderProgram[mName], mValue);
                    this.parameters[parameterIndex].value = mValue;
                }
            }

        } else {
            if (!isSame(this.parameters[parameterIndex].value, mValue) || !hasUniform) {
                gl[uniformType](this.shaderProgram[mName], false, mValue);
                this.parameters[parameterIndex].value = cloneArray(mValue);

            }
        }

    }

    style(mUniformObj) {

        this.uniformObject(mUniformObj)

    }

    uniformObject(mUniformObj) {
        for (const uniformName in mUniformObj) {
            if (mUniformObj[uniformName] === undefined || typeof mUniformObj[uniformName] === 'function') { 
                console.error('uniform: ', uniformName, 'undefined or function') 
            }
            if (mUniformObj[uniformName] instanceof GLTexture || mUniformObj[uniformName] instanceof GLCubeTexture) {
                const texture = mUniformObj[uniformName];

                let textureIndex = -1;;
                this._uniformTextures.forEach((ut, i) => {
                    if (ut.name === uniformName) {
                        textureIndex = i;
                        ut.texture = texture;
                    }
                });

                if (textureIndex === -1) {
                    textureIndex = this._uniformTextures.length;
                    this._uniformTextures.push({
                        name: uniformName,
                        texture
                    });
                }

                this.uniform(uniformName, 'uniform1i', textureIndex);
                texture.bind(textureIndex);
            } else if(mUniformObj[uniformName] instanceof Object && !(mUniformObj[uniformName].includes)) {

                console.error('uniform: ', uniformName, 'is a  object')

            } else {
                let uniformValue = mUniformObj[uniformName];
                const uniformType = this.getUniformType(uniformValue, uniformName);
                //console.log(uniformType, uniformName, uniformValue)
                if (uniformValue.concat && uniformValue[0].concat) {
                    let tmp = [];
                    for (let i = 0; i < uniformValue.length; i++) {
                        tmp = tmp.concat(uniformValue[i]);
                    }
                    uniformValue = tmp;
                }

                this.uniform(uniformName, uniformType, uniformValue);
            }

        }

    }


    _createShaderProgram(mShaderStr, isVertexShader) {

        const shaderType = isVertexShader ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
        const shader = gl.createShader(shaderType);

        gl.shaderSource(shader, mShaderStr);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn('Error in Shader : ', gl.getShaderInfoLog(shader));
            console.log(addLineNumbers(mShaderStr));
            return null;
        }

        return shader;
    }

    _attachShaderProgram(mVertexShader, mFragmentShader) {

        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, mVertexShader);
        gl.attachShader(this.shaderProgram, mFragmentShader);

        gl.deleteShader(mVertexShader);
        gl.deleteShader(mFragmentShader);

        if (this._varyings && this._varyings.length) {
            console.log('Transform feedback setup : ', this._varyings);
            gl.transformFeedbackVaryings(this.shaderProgram, this._varyings, gl.SEPARATE_ATTRIBS);
        }

        gl.linkProgram(this.shaderProgram);

    }

    get name() {
        return this._name
    }


    getUniformType(mValue, mUniformName) {
        const isArray = Array.isArray(mValue) || mValue.includes

        if (!isArray) {
            return 'float';
        } else {
            if (!mValue[0].concat) {
                return this.getArrayUniformType(mValue, mUniformName);
            } else {
                return this.getArrayUniformType(mValue[0], mUniformName);
            }
        }
    };

    getArrayUniformType(mValue, mUniformName) {
        if (mValue.length === 9) {
            return 'uniformMatrix3fv';
        } else if (mValue.length === 16) {
            return 'uniformMatrix4fv';
        } else if (mValue.length <= 4) {
            return `vec${mValue.length}`;
        } else if (mValue.length === 12) {
            return 'uniform3fv';
        } else {

            const uniformIndices = gl.getUniformIndices(this.shaderProgram, [mUniformName]);
            const uniformTypes = gl.getActiveUniforms(this.shaderProgram, uniformIndices, gl.UNIFORM_TYPE)
            if(!uniformTypes) console.error(uniformTypes)

            return mapping[WebglNumbers[uniformTypes[0]]]
        }
    };

}

export default GLShader;
