(window.webpackJsonp=window.webpackJsonp||[]).push([[1,22],[,,,function(t,e){var i=0,s=3553;function r(t,e,i){return 9728|+t|+e<<8|+(e&&i)<<1}function a(t,e){return this._uid=i++,this.gl=t,this.id=this.gl.createTexture(),this.width=0,this.height=0,this.format=e||t.RGB,this.type=t.UNSIGNED_BYTE,this.img=null,t.bindTexture(s,this.id),this.setFilter(!0),this}a.prototype={fromImage:function(t){var e=this.gl;return this.img=t,this.width=t.width,this.height=t.height,e.bindTexture(s,this.id),e.texImage2D(s,0,this.format,this.format,this.type,t),this},fromData:function(t,e,i,r){var a=this.gl;return this.width=t,this.height=e,i=i||null,this.type=r||a.UNSIGNED_BYTE,a.bindTexture(s,this.id),window.useWebgl2?r===a.RGBA16F?a.texImage2D(a.TEXTURE_2D,0,this.type,t,e,0,this.format,a.HALF_FLOAT,i):r===a.RG32F||r===a.RGBA32F||r===a.RGB32F?a.texImage2D(a.TEXTURE_2D,0,this.type,t,e,0,this.format,a.FLOAT,i):a.texImage2D(s,0,this.format,t,e,0,this.format,this.type,i):a.texImage2D(s,0,this.format,t,e,0,this.format,this.type,i),this},bind:function(t){var e=this.gl;void 0!==t&&e.activeTexture(e.TEXTURE0+(0|t)),e.bindTexture(s,this.id)},dispose:function(){this.gl&&this.gl.deleteTexture(this.id),this.id=null,this.gl=null},setFilter:function(t,e,i){var a=this.gl,h=r(!!t,!!e,!!i);a.texParameteri(s,a.TEXTURE_MAG_FILTER,r(!!t,!1,!1)),a.texParameteri(s,a.TEXTURE_MIN_FILTER,h)},repeat:function(){this.wrap(this.gl.REPEAT)},clamp:function(){this.wrap(this.gl.CLAMP_TO_EDGE)},mirror:function(){this.wrap(this.gl.MIRRORED_REPEAT)},wrap:function(t){var e=this.gl;e.texParameteri(s,e.TEXTURE_WRAP_S,t),e.texParameteri(s,e.TEXTURE_WRAP_T,t)}},t.exports=a},function(t,e,i){"use strict";i.d(e,"a",function(){return u});var s=i(2),r=i(7),a=i(0),h=i(3),n=i.n(h);class u{constructor(t,e,i){Object(s.a)(this,"_buffers",[]),Object(s.a)(this,"iBuffer",null),Object(s.a)(this,"_useVao",!0),Object(s.a)(this,"name",""),Object(s.a)(this,"material",null),Object(s.a)(this,"textures",{}),this.drawingType=t,this.name=e,i&&(this.material=i,this._setMaterial())}bufferVertex(t){this.bufferData(t,"position",3)}bufferNormal(t){this.bufferData(t,"normal",3)}bufferTexCoord(t){this.bufferData(t,"texCoord",2)}bufferColor(t){this.bufferData(t,"color",4)}bufferData(t,e,i){let s=[];if(t[0].length)for(let e=0;e<t.length;e++)for(let i=0;i<t[e].length;i++)s.push(t[e][i]);else s=t;let h=new r.a(a.d,new Float32Array(s));if(e.constructor!==Array)h.attrib(e,i,a.d.FLOAT),this._buffers.push({name:e,buffer:h});else{for(let t=0;t<e.length;t++)h.attrib(e[t],i[t],a.d.FLOAT);this._buffers.push({name:e.toString(),buffer:h})}}bufferIndices(t,e=!1){let i=e?a.d.DYNAMIC_DRAW:a.d.STATIC_DRAW;this.iBuffer=new r.b(a.d,a.d.UNSIGNED_SHORT,new Uint16Array(t),i)}bind(t,e){if(1===this._buffers.length)this._buffers[0].buffer.attribPointer(t,e);else if(e)for(let i=0;i<this._buffers.length;i++)for(let s=0;s<e.length;s++)e[s]===this._buffers[i].name&&this._buffers[i].buffer.attribPointer(t);else for(let e=0;e<this._buffers.length;e++)this._buffers[e].buffer.attribPointer(t);if(this.iBuffer&&this.iBuffer.bind(),this.textures){let e=1,i=1,s=1,r=1,h=0;for(let n in this.textures){a.d.activeTexture(a.d.TEXTURE0+h);let u="";"diffuseMap"===n?u=e+++"":"specularMap"===n?u=i+++"":"normalMap"===n?u=s+++"":"heightMap"!==n&&"bumpMap"!==n||(u=r+++"");let o={};o[n+u]=h,t.style(o),a.d.bindTexture(a.d.TEXTURE_2D,this.textures[n]),h++}}}draw(t){let e;e=this.iBuffer?this.iBuffer:this._buffers[0].buffer,this.drawingType&&(t=this.drawingType),t?e.draw(t):e.drawTriangles()}_setMaterial(){for(let t in this.material)this.material[t].constructor===HTMLImageElement&&(this.material[t]=new n.a(a.d).fromImage(this.material[t]).id,this.textures[t]=this.material[t])}get vertexBuffer(){let t=function(t,e,i){if(!t||!t.length)return-1;for(let s=0;s<t.length;s++)if(t[s][e]===i)return s;return-1}(this._buffers,"name","position");if(-1!==t)return this._buffers[t].buffer;console.warn("no vertex buffer set")}}},function(t,e,i){"use strict";i.r(e);var s=i(2),r=0;function a(t,e,i,s){this.gl=t,this.program=t.createProgram(),this.vShader=t.createShader(t.VERTEX_SHADER),this.fShader=t.createShader(t.FRAGMENT_SHADER),this.dyns=[],this.uniforms=[],this.ready=!1,t.attachShader(this.program,this.vShader),t.attachShader(this.program,this.fShader),this._uid=0|r++,this._cuid=0|r++,void 0!==e&&void 0!==i&&this.compile(e,i,s),this.unAssigned=[],this.prevTime=0}function h(t){console.warn(t)}a.debug=!0,a.prototype={use:function(){this.ready||this._grabParameters(),this.gl.useProgram(this.program)},style:function(t,e){if("{}"!==JSON.stringify(t)||0!==this.uniforms.length){if("{}"===JSON.stringify(t)&&this.uniforms.length>0)throw new Error("active uniform not assigned:"+this.uniforms);for(let e in t)"function"==typeof this[e]&&this[e](t[e]);this.unAssigned=this.unAssigned.filter(e=>{let i=!1;for(let s in t)s===e&&(i=!0);return!i}),Date.now()-this.prevTime<62500&&0===this.unAssigned.length&&null!==this.timer&&(clearTimeout(this.timer),this.timer=null),0!==this.unAssigned.length&&void 0===e&&(this.timer=setTimeout(()=>{if(this.unAssigned.length>0)throw new Error("active uniform not assigned: "+this.unAssigned)},1/16)),this.prevTime=Date.now()}},compile:function(t,e,i){this.ready=!1,i=i||"";var s=this.gl;if(!o(s,this.fShader,i+e)||!o(s,this.vShader,i+t))return!1;if(s.linkProgram(this.program),a.debug&&!s.getProgramParameter(this.program,s.LINK_STATUS))return h(s.getProgramInfoLog(this.program)),!1;for(;this.dyns.length>0;)delete this[this.dyns.pop()];return this._cuid=0|r++,!0},dispose:function(){null!==this.gl&&(this.gl.deleteProgram(this.program),this.gl.deleteShader(this.fShader),this.gl.deleteShader(this.vShader),this.gl=null)},_grabParameters:function(){for(var t=this.gl,e=this.program,i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS),s={texIndex:0},r=0;r<i;++r){var a=t.getActiveUniform(e,r);if(null!==a){var h=a.name,n=h.indexOf("[");n>=0&&(h=h.substring(0,n));var u=t.getUniformLocation(e,a.name);this[h]=l(a.type,u,t,s),this.dyns.push(h),this.uniforms.push(h),this.unAssigned.push(h)}else t.getError()}for(var o=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES),f=0;f<o;++f){var d=t.getActiveAttrib(e,f).name,g=t.getAttribLocation(e,d);this[d]=c(g),this.dyns.push(d)}this.ready=!0}},a.prototype.bind=a.prototype.use;var n=["","   ","  "," ",""];function u(t,e){return n[String(e+1).length]+(e+1)+": "+t}function o(t,e,i){return t.shaderSource(e,i),t.compileShader(e),!(a.debug&&!t.getShaderParameter(e,t.COMPILE_STATUS))||(h(t.getShaderInfoLog(e)),h(function(t){return t.split("\n").map(u).join("\n")}(i)),!1)}var f={};function d(t){return t=String(t),"uniform"+f[t]}function l(t,e,i,s){switch(t){case i.FLOAT_MAT2:case i.FLOAT_MAT3:case i.FLOAT_MAT4:return function(t,e,i,s){var r=d(t);return function(){if(arguments.length>0&&void 0!==arguments[0].length){var t=arguments.length>1&&!!arguments[1];i[r+"v"](e,t,arguments[0])}return e}}(t,e,i);case i.SAMPLER_2D:case i.SAMPLER_CUBE:return function(t,e,i,s){var r=s.texIndex++;return function(){return 1===arguments.length&&(void 0!==arguments[0].bind?(arguments[0].bind(r),i.uniform1i(e,r)):i.uniform1i(e,arguments[0])),e}}(0,e,i,s);default:return function(t,e,i,s){var r=d(t);return function(){return 1===arguments.length&&void 0!==arguments[0].length?i[r+"v"](e,arguments[0]):arguments.length>0&&i[r].apply(i,Array.prototype.concat.apply(e,arguments)),e}}(t,e,i)}}function c(t){return function(){return t}}f[5126]="1f",f[35664]="2f",f[35665]="3f",f[35666]="4f",f[35670]=f[5124]=f[35678]=f[35680]="1i",f[35671]=f[35667]="2i",f[35672]=f[35668]="3i",f[35673]=f[35669]="4i",f[35674]="Matrix2f",f[35675]="Matrix3f",f[35676]="Matrix4f";var g=a,m=i(1),b=i(0);const p=function(t,e,i){const s=e||{};return t.touches&&!i?(s.x=t.touches[0].pageX,s.y=t.touches[0].pageY):t.touches?t.touches&&i&&(s.x=t.touches[1].pageX,s.y=t.touches[1].pageY):(s.x=t.clientX,s.y=t.clientY),s},_=1e-4;class y{constructor(t=[0,0,0],e=[0,1,0]){Object(s.a)(this,"cameraPos",void 0),Object(s.a)(this,"up",void 0),Object(s.a)(this,"cameraFront",[0,0,-1]),Object(s.a)(this,"_mouse",{}),Object(s.a)(this,"_preMouse",{}),Object(s.a)(this,"_mousedown",!1),Object(s.a)(this,"_rx",0),Object(s.a)(this,"_ry",0),Object(s.a)(this,"_preRx",0),Object(s.a)(this,"_preRy",0),Object(s.a)(this,"_targetRx",0),Object(s.a)(this,"_targetRy",0),Object(s.a)(this,"_tmp",m.a.identity(m.a.create())),Object(s.a)(this,"_width",b.a.width),Object(s.a)(this,"_height",b.a.height),Object(s.a)(this,"sensitivity",1),Object(s.a)(this,"target",[0,0,0]),Object(s.a)(this,"offset",[0,0,0]),Object(s.a)(this,"radius",5),Object(s.a)(this,"_targetRadius",5),Object(s.a)(this,"_updateWheel",!1),this.cameraPos=t,this.up=e,this._addEvents()}_addEvents(){b.a.addEventListener("mousedown",t=>this._down(t)),b.a.addEventListener("mousemove",t=>this._move(t)),document.addEventListener("mouseup",t=>this._up(t)),b.a.addEventListener("mousewheel",t=>this._onWheel(t)),b.a.addEventListener("DOMMouseScroll",t=>this._onWheel(t))}_down(t){this._mousedown=!0,p(t,this._mouse),p(t,this._preMouse),this._preRx=this._targetRx,this._preRy=this._targetRy}_move(t){if(this._mousedown){p(t,this._mouse);let e=(this._mouse.x-this._preMouse.x)/this._width,i=(this._mouse.y-this._preMouse.y)/this._height;this._targetRx=this._preRx+e*Math.PI*2*this.sensitivity,this._targetRy=this._preRy+i*Math.PI*this.sensitivity}}_up(t){this._mousedown=!1}updateMatrix(){this._rx+=.1*(this._targetRx-this._rx),Math.abs(this._targetRx-this._rx)<_&&(this._rx=this._targetRx),this._ry+=.1*(this._targetRy-this._ry),Math.abs(this._targetRy-this._ry)<_&&(this._ry=this._targetRy),this._updateWheel&&(this.radius+=.1*(this._targetRadius-this.radius),Math.abs(this._targetRadius-this.radius)<_&&(this.radius=this._targetRadius)),this.cameraPos[1]=Math.sin(this._ry)*this.radius;let t=Math.abs(Math.cos(this._ry)*this.radius);this.cameraPos[0]=Math.cos(this._rx+.5*Math.PI)*t,this.cameraPos[2]=Math.sin(this._rx+.5*Math.PI)*t,this.cameraPos=[this.cameraPos[0]+this.offset[0],this.cameraPos[1]+this.offset[1],this.cameraPos[2]+this.offset[2]],m.a.lookAt(this._tmp,this.cameraPos,this.target,this.up)}_onWheel(t){const e=t.wheelDelta,i=t.detail;let s=0;s=i?e?e/i/40*i>0?1:-1:-i/3:e/120,this._targetRadius=this.radius+2*-s,this._targetRadius<=1&&(this._targetRadius=1),this._updateWheel=!0}get viewMatrix(){return this._tmp}set rx(t){this._targetRx=t}}var v=i(36);i.d(e,"default",function(){return T});class T{constructor(){Object(s.a)(this,"rotateQ",m.b.create()),Object(s.a)(this,"camera",new y),Object(s.a)(this,"_params",{}),Object(s.a)(this,"gui",new v.a({width:300})),this.init(),this.attrib(),this.prepare(),this._setGUI(),this._animate=this.animate.bind(this)}init(){}compile(t,e){let i=new g(b.d);return i.compile(t,e),i}attrib(){}uniform(){}prepare(){}animate(){requestAnimationFrame(this._animate),this.camera.updateMatrix(),this.uniform(),this.render()}render(){}play(){this.animate()}_setGUI(){}addGUIParams(t){return Object.assign(this._params,t)}get params(){return this._params}set params(t){throw Error("Params has no setter,please use addGUIParams")}}},,function(t,e,i){"use strict";i.d(e,"a",function(){return h}),i.d(e,"b",function(){return n});var s=function(t){switch(t){case 5120:case 5121:return 1;case 5122:case 5123:return 2;case 5124:case 5125:case 5126:return 4;default:return 0}},r=function(t){t.drawPoints=function(t,e){this.draw(0,t,e)},t.drawLines=function(t,e){this.draw(1,t,e)},t.drawLineLoop=function(t,e){this.draw(2,t,e)},t.drawLineStrip=function(t,e){this.draw(3,t,e)},t.drawTriangles=function(t,e){this.draw(4,t,e)},t.drawTriangleStrip=function(t,e){this.draw(5,t,e)},t.drawTriangleFan=function(t,e){this.draw(6,t,e)}},a=34962;function h(t,e,i){this.gl=t,this.usage=i||t.STATIC_DRAW,this.buffer=t.createBuffer(),this.attribs=[],this.stride=0,this.byteLength=0,this.length=0,e&&this.data(e)}h.prototype={bind:function(){this.gl.bindBuffer(a,this.buffer)},attrib:function(t,e,i,r){return this.attribs.push({name:t,type:0|i,size:0|e,normalize:!!r,offset:this.stride}),this.stride+=s(i)*e,this._computeLength(),this},data:function(t){var e=this.gl;e.bindBuffer(a,this.buffer),e.bufferData(a,t,this.usage),e.bindBuffer(a,null),this.byteLength=void 0===t.byteLength?t:t.byteLength,this._computeLength()},subData:function(t,e){var i=this.gl;i.bindBuffer(a,this.buffer),i.bufferSubData(a,e,t),i.bindBuffer(a,null)},attribPointer:function(t,e){var i=this.gl;if(i.bindBuffer(a,this.buffer),e&&e.length)for(let r=0;r<e.length;r++)for(var s=0;s<this.attribs.length;s++){let a=this.attribs[s];if(e[r]===a.name)if(void 0!==t[a.name]){let e=t[a.name]();i.enableVertexAttribArray(e),i.vertexAttribPointer(e,a.size,a.type,a.normalize,this.stride,a.offset)}else console.warn(`glBuffer can't get Attribute "${a.name}" Location.`)}else for(var r=0;r<this.attribs.length;r++){var h=this.attribs[r];if(void 0!==t[h.name]){var n=t[h.name]();i.enableVertexAttribArray(n),i.vertexAttribPointer(n,h.size,h.type,h.normalize,this.stride,h.offset)}else console.warn(`glBuffer can't get Attribute "${h.name}" Location.`)}},draw:function(t,e,i){e=void 0===e?this.length:e,this.gl.drawArrays(t,i,0|e)},dispose:function(){this.gl&&this.gl.deleteBuffer(this.buffer),this.buffer=null,this.gl=null},_computeLength:function(){this.stride>0&&(this.length=this.byteLength/this.stride)}},r(h.prototype);function n(t,e,i,s){this.gl=t,this.buffer=t.createBuffer(),this.usage=s||t.STATIC_DRAW,this.type=0,this.typeSize=0,this.size=0,this.setType(e||t.UNSIGNED_SHORT),i&&this.data(i)}n.prototype={bind:function(){this.gl.bindBuffer(34963,this.buffer)},setType:function(t){this.type=t,this.typeSize=s(t)},data:function(t){var e=this.gl;e.bindBuffer(34963,this.buffer),e.bufferData(34963,t,this.usage),e.bindBuffer(34963,null),this.size=void 0===t.byteLength?t:t.byteLength},subData:function(t,e){var i=this.gl;i.bindBuffer(34963,this.buffer),i.bufferSubData(34963,e,t),i.bindBuffer(34963,null)},dispose:function(){this.gl.deleteBuffer(this.buffer),this.buffer=null,this.gl=null},draw:function(t,e,i){e=void 0===e?this.size/this.typeSize:e,this.gl.drawElements(t,e,this.type,0|i)}},r(n.prototype)}]]);