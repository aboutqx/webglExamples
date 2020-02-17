import getAttribLoc from './utils/getAttribLoc';
import {
  gl, GlTools
} from 'libs/GlTools'
import Texture from 'libs/GLTexture2'
import Object3D from 'physics/Object3D'
import { vec3 } from 'gl-matrix'
const STATIC_DRAW = 35044;

const allEqual = (array1, array2) => {
	if(array1.join(',')=== array2.join(',')){
		return true
	} else return false
}
const getBuffer = function (attr) {
	let buffer;
	
	if(attr.buffer !== undefined) {
		buffer = attr.buffer;	
	} else {
		buffer = gl.createBuffer();
		attr.buffer = buffer;
	}

	return buffer;
}

const formBuffer = function (mData, mNum) {
	const ary = [];

	for(let i=0; i<mData.length; i+= mNum) {
		const o = [];
		for(let j=0; j<mNum; j++) {
			o.push(mData[i+j]);
		}

		ary.push(o);
	}

	return ary;
};

export default class Mesh  extends Object3D {
  iBuffer = null
  _useVao = false
  _hasVao = false
  _isInstanced = false
  _bufferChanged = []
  _attributes = [];
	_numInstance 			 = -1;
	_enabledVertexAttribute = [];
		
	_indices                = [];
	_faces                  = [];
	_bufferChanged          = [];
  name = ''
  material = null
  textures = {}
  constructor(mDrawingType = 4, name, material) {
    super()

    this._extVAO                 = !!gl.createVertexArray;
		this._useVAO             	 = !!this._extVAO;
    this.drawType = mDrawingType
    this.name = name
    if(material) {
      this.material = material
      this._setMaterial()
    }
    
  }

  bufferVertex(mData) {
    this.bufferData(mData, 'position', 3)
  }

  bufferNormal(mData) {
    this.bufferData(mData, 'normal', 3)
  }

  bufferTexCoord(mData) {
    this.bufferData(mData, 'texCoord', 2)
  }

  bufferColor(mData) {
    this.bufferData(mData, 'color', 4)
  }

  bufferFlattenData(mData, mName, mItemSize, mDrawType = STATIC_DRAW, isInstanced = false) {
    const data = formBuffer(mData, mItemSize);
		this.bufferData(data, mName, mItemSize, mDrawType = STATIC_DRAW, isInstanced = false);
		return this;

  }

  bufferData(mData, mName, mItemSize, mDrawType = STATIC_DRAW, isInstanced = false) {
    const drawType   = mDrawType;
    let bufferData = []

    
    //	flatten buffer data		
	for (let i = 0; i < mData.length; i++) {
		for (let j = 0; j < mData[i].length; j++) {
		  bufferData.push(mData[i][j]);
		}
	}

    const dataArray = new Float32Array(bufferData);
    const attribute = this.getAttribute(mName);

    
    if(attribute) {	
      //	attribute existed, replace with new data
      attribute.itemSize = mItemSize;
      attribute.dataArray = dataArray;
      attribute.source = mData;
    } else {
      //	attribute not exist yet, create new attribute object
      this._attributes.push({ name:mName, source:mData, itemSize: mItemSize, drawType, dataArray, isInstanced });
    }
    this._bufferChanged.push(mName);
    
    
    return this;
  }

  bufferIndex(mArrayIndices, isDynamic = false) {
    this._drawType        = isDynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW;
		if(mArrayIndices instanceof Array) {
			this._indices	  = new Uint16Array(mArrayIndices);	
		} else {
			this._indices = mArrayIndices;
		}

    this._numItems 		  = this._indices.length;
		return this;

  }

  // 针对多个array buffer，list可以只激活部分attribute, mProgram 指的是glProgram实例
  bind() {
    let mShaderProgram = GlTools.shaderProgram
    if(!mShaderProgram) console.error('no current program used')

    //所有data在一个arrybuffer里（现在不支持了）
    this.generateBuffers(mShaderProgram);

	if(this.hasVAO) {
		gl.bindVertexArray(this.vao);
	} else {
		this.attributes.forEach((attribute)=> {
			gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
			const attrPosition = attribute.attrPosition;
			gl.vertexAttribPointer(attrPosition, attribute.itemSize, gl.FLOAT, false, 0, 0);

			if(attribute.isInstanced) {
				gl.vertexAttribDivisor(attrPosition, 1);
			}

		});

		//	BIND INDEX BUFFER
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);	
    }

    if (this.textures) {
      let diffuseNr = 1
      let specularNr = 1
      let normalNr = 1
      let heightNr = 1
      let i = 0
      for (let key in this.textures) {
        gl.activeTexture(gl.TEXTURE0 + i)
        let number =''
        if(key === 'diffuseMap') {

          number = (diffuseNr++) + ''
        } else if(key === 'specularMap') {
          number = (specularNr++) + ''
        } else if(key === 'normalMap') {
          number = (normalNr++) + ''
        } else if (key === 'heightMap' || key === 'bumpMap') { // three.js takes bumpMap as heightMap
          number = (heightNr++) + ''
        }
        let tmp = {}
        tmp[key + number] = i
        GlTools.shader.style(tmp)
        gl.bindTexture(gl.TEXTURE_2D, this.textures[key])
        i++
      }
    }
  }

  generateBuffers(mShaderProgram) {
		if(this._bufferChanged.length == 0) { return; }

		if(this._useVAO) { //	IF SUPPORTED, CREATE VAO

			//	CREATE & BIND VAO
			if(!this._vao) {
				this._vao = gl.createVertexArray();	
			}
			
			gl.bindVertexArray(this._vao);
      
			//	UPDATE BUFFERS
			this._attributes.forEach((attrObj) => {

				if(this._bufferChanged.indexOf(attrObj.name) !== -1) {
					const buffer = getBuffer(attrObj);
					gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
					gl.bufferData(gl.ARRAY_BUFFER, attrObj.dataArray, attrObj.drawType);
					
					const attrPosition = getAttribLoc(gl, mShaderProgram, attrObj.name)

					if(attrPosition < 0) { console.log(attrPosition, attrObj.name, GlTools.shaderName); return }
					gl.enableVertexAttribArray(attrPosition); 
					gl.vertexAttribPointer(attrPosition, attrObj.itemSize, gl.FLOAT, false, 0, 0);
					attrObj.attrPosition = attrPosition;

					if(attrObj.isInstanced) {
						gl.vertexAttribDivisor(attrPosition, 1);
					}
				}
				
			});
				
			//	check index buffer
			this._updateIndexBuffer();

			//	UNBIND VAO
			gl.bindVertexArray(null);	
			
			this._hasVAO = true;

		} else { //	ELSE, USE TRADITIONAL METHOD

			this._attributes.forEach((attrObj) => {
				//	SKIP IF BUFFER HASN'T CHANGED
				if(this._bufferChanged.indexOf(attrObj.name) !== -1) {
					const buffer = getBuffer(attrObj);
					gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
					gl.bufferData(gl.ARRAY_BUFFER, attrObj.dataArray, attrObj.drawType);

					const attrPosition = getAttribLoc(gl, mShaderProgram, attrObj.name);
					gl.enableVertexAttribArray(attrPosition);
					gl.vertexAttribPointer(attrPosition, attrObj.itemSize, gl.FLOAT, false, 0, 0);
					attrObj.attrPosition = attrPosition;

					if(attrObj.isInstanced) {
						gl.vertexAttribDivisor(attrPosition, 1);
					}
				}
			});

			this._updateIndexBuffer();
		}

		this._hasIndexBufferChanged = false;
		this._bufferChanged = [];
  }
  
  unbind() {
		if(this._useVAO) {
			gl.bindVertexArray(null);	
		}
		
		this._attributes.forEach((attribute)=> {
			if(attribute.isInstanced) {
				gl.vertexAttribDivisor(attribute.attrPosition, 0);
			}
		});
  }

  _updateIndexBuffer() {
		if(!this._hasIndexBufferChanged) {
			if (!this.iBuffer) { this.iBuffer = gl.createBuffer();	 }
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indices, this._drawType);
			this.iBuffer.itemSize = 1;
			this.iBuffer.numItems = this._numItems;
		}
  }
  computeNormals(normals, usingFaceNormals = false) {

		if(usingFaceNormals) {
			this.generateFaces(normals);
			//this._computeFaceNormals();
		} else {
			this._computeVertexNormals(normals);
		}
	}

	//	PRIVATE METHODS

	_computeFaceNormals() {

		let faceIndex;
		let face;
		const normals = [];

		for(let i = 0; i < this._indices.length; i += 3) {
			faceIndex = i / 3;
			face = this._faces[faceIndex];
			const N = face.normal;

			normals[face.indices[0]] = N;
			normals[face.indices[1]] = N;
			normals[face.indices[2]] = N;
		}

		this.bufferNormal(normals);
	}


	_computeVertexNormals(normals) {
		//	loop through all vertices
		let face;
		const sumNormal = vec3.create();
		const averageNormals = [];
		const { vertices } = this;
		// vertices with the same position they have the same average normal,each is averaged from adjacent 3 faces normals
		// so we need to know 3 adjacent faces for each vertices, although vertices may have the same position
		//since the indices is not reused , we can't find theses 3 faces there
		//we can simplely loop vertices, for each if them in the faces, wo get face normals
		//then we have 3 faces normals for each vertices. finally average them unweighted  
		let count = 0
		for(let i = 0; i < vertices.length; i++) {

			vec3.set(sumNormal, 0, 0, 0);

			for(let j = 0; j < vertices.length; j++) {
				if(allEqual(vertices[i], vertices[j])) {

					sumNormal[0] += normals[j][0];
					sumNormal[1] += normals[j][1];
					sumNormal[2] += normals[j][2];
					count++
				}

			}
			vec3.divide(sumNormal, sumNormal, vec3.fromValues(count, count, count))
			vec3.normalize(sumNormal, sumNormal);
			averageNormals.push([sumNormal[0], sumNormal[1], sumNormal[2]]);
			count = 0
		}
		this.bufferNormal(averageNormals);

	}


	generateFaces(normals) {
		let ia, ib, ic;
		let a, b, c;
		let na, nb, nc;
		const vba = vec3.create(), vca = vec3.create(), vNormal = vec3.create();
		const { vertices } = this;

		for(let i = 0; i < this._indices.length; i += 3) {

			ia = this._indices[i];
			ib = this._indices[i + 1];
			ic = this._indices[i + 2];

			a = vertices[ia];
			b = vertices[ib];
			c = vertices[ic];

     		na = normals[ia];
			nb = normals[ib];
			nc = normals[ic];

			const face = {
				indices:[ia, ib, ic],
				vertices:[a, b, c],
				normals: [na, nb, nc]
			};

			this._faces.push(face);
		}

	}

  getAttribute(mName) {	return this._attributes.find((a) => a.name === mName);	}
	getSource(mName) {
		const attr = this.getAttribute(mName);
		return attr ? attr.source : [];
  }
  
  _setMaterial() {
    for(let key in this.material){
      if (this.material[key].constructor === HTMLImageElement) {
        this.material[key] = new Texture(this.material[key]).texture
        this.textures[key] = this.material[key]
      }
    }
  }

  setMaterial(material) {
    this.material = material
  }

  get positionBuffer() {
    let i = has(this._buffers, 'name', 'position')
    if(i === -1) {
      console.warn('no vertex buffer set')
    } else {
      return this._buffers[i].buffer
    }
  }
  	//	GETTER AND SETTERS

	get vertices() {	return this.getSource('position');	}

	get normals() {		return this.getSource('normal');	}

	get coords() {		return this.getSource('texCoord');	}

	get indices() {		return this._indices;	}

	get vertexSize() {	return this.vertices.length;	}

	get faces() {	return this._faces;	}

	get attributes() {	return this._attributes;	}

	get hasVAO() {	return this._hasVAO;	}

	get vao() {	return this._vao;	}

	get numInstance() {	return this._numInstance;	}

	get isInstanced() { return this._isInstanced;	}
}

function has(arr, key, value) { // array child object has key-value
  if (!arr || !arr.length) return -1
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) return i
  }
  return -1
}
