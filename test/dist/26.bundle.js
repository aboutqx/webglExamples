(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{63:function(e,t,s){"use strict";s.r(t);var r=s(2),n=s(5),a=s(8),o=s(13);var i=(e,t)=>new Promise((s,r)=>{const n=new XMLHttpRequest;n.addEventListener("load",e=>{s(n.response)}),n.addEventListener("error",e=>{r(e)}),t&&(n.responseType="arraybuffer"),n.open("GET",e),n.send()});const u=e=>new Promise((t,s)=>{const r=new Image;r.onload=function(){t(this)},r.onerror=function(){s(`Image not found : ${e}`)},r.src=e});var c=e=>Promise.all(e.map(u)),l=s(28);const h=[],f=function(e,t){return e=e.replace("#version 300 es",""),`#version 300 es\n${function(e){let t="";for(const s in e)e[s]&&(t+=`#define ${s} ${e[s]}\n`);return t}(t)}\n${e}`};var d={get:(e,t,s={})=>{let r;const n=f(e,s),a=f(t,s);return h.forEach(e=>{n===e.vs&&a===e.fs&&(r=e.glShader)}),r||(r=new l.a(n,a),h.push({vs:n,fs:a,glShader:r})),r}};var m=s(3),p=s(14),x=s(19);const g={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},b={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},M={NORMAL:"normal",POSITION:"position",TEXCOORD_0:"texCoord",WEIGHTS_0:"aWeight",JOINTS_0:"aJoint",COLOR:"color"};let A;const T=e=>new Promise((t,s)=>{const{nodes:r,scenes:n}=e,a=t=>{const s=r[t],n=void 0===s.mesh?new x.a:e.output.meshes[s.mesh];return s.scale&&(n.scaleX=s.scale[0],n.scaleY=s.scale[1],n.scaleZ=s.scale[2]),s.rotation&&n.setRotationFromQuaternion(s.rotation),s.translation&&(n.x=s.translation[0],n.y=s.translation[1],n.z=s.translation[2]),s.children&&s.children.forEach(e=>{const t=a(e);n.addChild(t)}),n};e.output.scenes=n.map(e=>{const t=new x.a;return e.nodes.forEach(e=>{const s=a(e);t.addChild(s)}),t}),t(e)}),y=e=>new Promise((t,s)=>{const{meshes:r}=e;r.forEach(t=>{const{primitives:s}=t,r={};s.forEach(t=>{let s={};if(Object.keys(t.attributes).forEach(n=>{const a=t.attributes[n],o=e.accessors[a],i=M[n];if(!i)return;"NORMAL"===n&&(s.HAS_NORMALS=1),n.indexOf("TEXCOORD")>-1&&(s.HAS_UV=1);const u=b[o.type];let c=S(e,a);c instanceof Uint32Array&&(c=new Float32Array(c)),"TEXCOORD_1"===n&&console.log(u,c),r[i]={value:c,size:u}}),null!=t.indices){const s=S(e,t.indices,!0);r.indices={value:s,size:1}}const n=new m.a;for(const e in r){const t=r[e];"indices"!==e?n.bufferFlattenData(t.value,e,t.size):n.bufferIndex(t.value)}const a=e.output.materialInfo[t.material];s=Object.assign(s,a.defines);const{emissiveFactor:i,emissiveTexture:u,normalTexture:c,occlusionTexture:l,pbrMetallicRoughness:h}=a,{baseColorTexture:f,metallicRoughnessTexture:p}=h,x={uEmissiveFactor:i||[0,0,0],uBaseColor:h.baseColorFactor||[1,1,1,1],uRoughness:h.roughnessFactor||1,uMetallic:h.metallicFactor||1,uScaleDiffBaseMR:[0,0,0,0],uScaleFGDSpec:[0,0,0,0],uScaleIBLAmbient:[1,1,1,1],uLightDirection:[1,1,1],uLightColor:[1,1,1],uGamma:1};f&&(x.uColorMap=f.glTexture),p&&(x.uMetallicRoughnessMap=p.glTexture),c&&(x.uNormalScale=c.scale||1,x.uNormalMap=c.glTexture),l&&(x.uAoMap=l.glTexture,x.uOcclusionStrength=l.strength||1),u&&(x.uEmissiveMap=u.glTexture);const g=new class{constructor(e,t,s={},r={}){this._shader=d.get(e,t,r),this.uniforms=Object.assign({},s)}update(){this._shader.bind(),this._shader.uniform(this.uniforms)}get shader(){return this._shader}}(o.a.gltfVert,o.a.gltfFrag,x,s);n.setMaterial(g),e.output.meshes.push(n)})}),t(e)}),O=e=>new Promise((t,s)=>{const{bufferViews:r,buffers:n}=e;r.forEach((e,t)=>{const s=n[e.buffer].data;e.data=s.slice(e.byteOffset||0,(e.byteOffset||0)+(e.byteLength||0))}),t(e)}),w=e=>new Promise((t,s)=>{"string"!=typeof e?t(e):i(e).then(e=>{const s=JSON.parse(e);s.output={meshes:[],scenes:[],textures:[],material:[],materialInfo:[]},t(s)},e=>{s(e)})}),E=e=>new Promise((t,s)=>{if(e.buffers){let r=e.buffers.length;e.buffers.forEach(n=>{const a=`${A}${e.buffers[0].uri}`;i(a,!0).then(s=>{n.data=s,0===--r&&t(e)},e=>{s(e)})})}else t(e)}),R=e=>new Promise((t,s)=>{const{textures:r,images:n,samplers:a}=e;n||t(e);const o=n.map(e=>`${A}${e.uri}`);c(o).then(s=>{e.output.textures=s.map((e,t)=>{const s=Object.assign({},a?a[r[t].sampler]:{});return new p.a(e,s)}),t(e)},e=>{s(e)})}),v=e=>new Promise((t,s)=>{const{materials:r}=e,{textures:n}=e.output;e.output.materialInfo=r.map(e=>(e.defines={USE_IBL:1},e.normalTexture&&(e.defines.HAS_NORMALMAP=1,e.normalTexture.glTexture=n[e.normalTexture.index]),e.occlusionTexture&&(e.defines.HAS_OCCLUSIONMAP=1,e.occlusionTexture.glTexture=n[e.occlusionTexture.index]),e.emissiveTexture&&(e.defines.HAS_EMISSIVEMAP=1,e.emissiveTexture.glTexture=n[e.emissiveTexture.index]),e.pbrMetallicRoughness.baseColorTexture&&(e.defines.HAS_BASECOLORMAP=1,e.pbrMetallicRoughness.baseColorTexture.glTexture=n[e.pbrMetallicRoughness.baseColorTexture.index]),e.pbrMetallicRoughness.metallicRoughnessTexture&&(e.defines.HAS_METALROUGHNESSMAP=1,e.pbrMetallicRoughness.metallicRoughnessTexture.glTexture=n[e.pbrMetallicRoughness.metallicRoughnessTexture.index]),e)),t(e)}),S=(e,t,s=!1)=>{const r=e.accessors[t],n=e.bufferViews[r.bufferView].data,a=r.byteOffset||0,o=g[r.componentType]||Float32Array;let i=b[r.type];null==i&&s&&(i=1);let u=new o(n,a,i*r.count);const c=r.extensions&&r.extensions.WEB3D_quantized_attributes;if(c){const e=new Float32Array(i*r.count),t=c.decodeMatrix,s=new Array(i),n=new Array(i);for(let e=0;e<i;e++)s[e]=t[i*(i+1)+e],n[e]=t[e*(i+1)+e];for(let t=0;t<r.count;t++)for(let r=0;r<i;r++)e[t*i+r]=u[t*i+r]*n[r]+s[r];u=e}return u};var P={load:e=>new Promise((t,s)=>{A="string"==typeof e?e.substring(0,e.lastIndexOf("/")+1):"",w(e).then(E).then(R).then(O).then(v).then(y).then(T).then(e=>{t(e)}).catch(e=>{console.log("Error:",e)})}),parse:(e,t)=>new Promise((e,t)=>{e(mSource)})},C=s(0),_=s(1);s.d(t,"default",function(){return I});class I extends n.default{constructor(){super(),Object(r.a)(this,"count",0)}init(){this.skyboxPrg=this.compile(o.a.skyboxVert,o.a.skyboxFrag),C.c.enable(C.c.BLEND),C.c.blendFunc(C.c.SRC_ALPHA,C.c.ONE_MINUS_SRC_ALPHA)}attrib(){this.skybox=a.a.skybox(40)}prepare(){this.skyMap=getAssets.outputskybox,this.env="studio9",this.textureIrr=getAssets[`${this.env}_irradiance`],this.textureRad=getAssets[`${this.env}_radiance`],this.textureBrdf=getAssets.brdfLUT;P.load("assets/gltf/BoomBox/scene.gltf").then(e=>{this.gltf=e;const{meshes:t}=e.output;this.scenes=e.output.scenes,t.forEach(e=>{e.material.uniforms.uBRDFMap=this.textureBrdf,e.material.uniforms.uIrradianceMap=this.textureIrr,e.material.uniforms.uRadianceMap=this.textureRad}),this.gltfPrg=t[0].material.shader}).catch(e=>{console.log("Error loading gltf:",e)}),this.camera.radius=6}uniform(){_.b.perspective(this.pMatrix,Object(C.d)(45),C.b.clientWidth/C.b.clientHeight,.1,100),_.b.multiply(this.tmpMatrix,this.pMatrix,this.vMatrix);let e=_.b.identity(_.b.create());_.b.multiply(this.mvpMatrix,this.tmpMatrix,e),this.skyboxPrg.use(),this.skyboxPrg.style({mvpMatrix:this.mvpMatrix,uGamma:2.2,uExposure:5,tex:this.skyMap})}render(){C.c.clearColor(.3,.3,.3,1),C.c.clear(C.c.COLOR_BUFFER_BIT),this.skyboxPrg.use(),C.a.draw(this.skybox),this.gltfPrg&&this.gltfPrg.use(),this.scenes&&this.scenes.forEach(e=>{e.scaleX=100,e.scaleY=100,e.scaleZ=100,C.a.draw(e)})}}}}]);