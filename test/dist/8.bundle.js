(window.webpackJsonp=window.webpackJsonp||[]).push([[8,22,28],{112:function(t,e){t.exports="precision mediump float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec4 color;\nuniform   mat4 mMatrix;\nuniform   mat4 vpMatrix;\nuniform   bool mirror;\nvarying   vec3 vNormal;\nvarying   vec4 vColor;\nuniform vec3 eyeDirection;\nvarying float dist;\n\nvoid main(void){\n\n\tvec4 pos       = mMatrix * vec4(position, 1.0);\n\tif(mirror){pos = vec4(pos.x, -pos.y, pos.zw);}\n\tgl_Position    = vpMatrix * pos;\n\n  vNormal = normal;\n  vColor      = color;\n  dist = distance(position.xyz, eyeDirection);\n}\n"},113:function(t,e){t.exports="\nprecision mediump float;\n#define GLSLIFY 1\n\nuniform mat4 invMatrix;\nuniform vec3 lightDirection;\nuniform vec3 eyeDirection;\nuniform vec4 ambientColor;\nvarying vec3 vNormal;\nvarying vec4 vColor;\nvarying float dist;\n\nvoid main(void){\n    vec3  invLight  = normalize(invMatrix * vec4(lightDirection, 0.0)).xyz;\n    vec3  invEye    = normalize(invMatrix * vec4(eyeDirection, 0.0)).xyz;\n    vec3  halfLE    = normalize(invLight + invEye);\n    float diffuse   = clamp(dot(vNormal, invLight), 0.0, 1.0);\n    float specular  = pow(clamp(dot(vNormal, halfLE), 0.0, 1.0), 50.0); // 50.0来模仿粗糙度\n    vec4  destColor = vColor * vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0) + ambientColor;\n    // float gamma = 2.2; // 我们本身用的已经是数字颜色，而不是看到的颜色，所以不需要gamma校正\n    // destColor.rgb = pow(destColor.rgb, vec3(1.0/gamma));\n    gl_FragColor    = destColor;\n    // gl_FragColor = vec4(700.,0.3,1.,1.);\n}\n"},114:function(t,e){t.exports="#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 texCoord;\nuniform   mat4 ortMatrix;\nvarying   vec2 vTexCoord;\n\nvoid main(void){\n    vTexCoord   = texCoord;\n    gl_Position = ortMatrix * vec4(position, 1.0);\n}\n"},115:function(t,e){t.exports="precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D texture;\nuniform float     alpha;\nvarying vec2      vTexCoord;\n\nvoid main(void){\n    vec2 tc      = vec2(vTexCoord.s, 1. - vTexCoord.t);\n    gl_FragColor = vec4(texture2D(texture, tc).rgb, alpha);\n    // gl_FragColor = vec4(vec3(vTexCoord.t),1.);\n}\n"},142:function(t,e){t.exports="// basic.vert\n\n#define SHADER_NAME BASIC_VERTEX\n\nprecision highp float;\n#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 texCoord;\nattribute vec3 normal;\n\nuniform mat4 uModelMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec3 vNormal;\n\nvoid main(void) {\n    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);\n    vTextureCoord = texCoord;\n    vNormal = normal;\n}"},143:function(t,e){t.exports="// basic.frag\n\n#define SHADER_NAME BASIC_FRAGMENT\n\nprecision lowp float;\n#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nuniform float time;\n// uniform sampler2D texture;\n\nvoid main(void) {\n    gl_FragColor = vec4(vTextureCoord, sin(time) * .5 + .5, 1.0);\n}"},26:function(t,e,i){var r=i(4);function a(t,e){this.gl=t,this.width=0,this.height=0,this.fbo=null;var i=(e=e||n).depth|e.stencil<<1,a=e.type||t.UNSIGNED_BYTE;this.types=Array.isArray(a)?a:[a],this.color=new r(t,e.format),this.attachment=new s(this,i)}function s(t,e){this.fbo=t,this.flags=e,this.buffer=null}a.prototype={resize:function(t,e){this.width===t&&this.height===e||(this.width=0|t,this.height=0|e,null===this.fbo&&this._init(),this._allocate())},bindColor:function(t,e){var i=this.gl;i.activeTexture(i.TEXTURE0+e),i.bindTexture(i.TEXTURE_2D,this.color.id),i.uniform1i(t,e)},bind:function(){var t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.fbo),t.viewport(0,0,this.width,this.height)},unbind:function(){var t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,null)},clear:function(){var t=this.gl,e=t.COLOR_BUFFER_BIT|this.attachment.clearBits();t.clear(e)},isValid:function(){var t=this.gl;return t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE},getActualType:function(){return this.color.type},dispose:function(){this.gl.deleteFramebuffer(this.fbo),this.color.dispose(),this.attachment.dispose(),this.valid=!1,this.fbo=null,this.gl=null},_init:function(){var t=this.gl;this.fbo=t.createFramebuffer(),t.bindFramebuffer(t.FRAMEBUFFER,this.fbo),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.color.id,0),this.attachment._init()},_allocate:function(){var t=this.gl;this.attachment._allocate(),t.bindFramebuffer(t.FRAMEBUFFER,this.fbo);var e=0,i=this.types[e];do{this.color.fromData(this.width,this.height,null,i),t.getError()}while(!(this.valid=this.isValid())&&(i=this.types[++e]));t.bindFramebuffer(t.FRAMEBUFFER,null)}},s.prototype={_init:function(){var t=this.fbo.gl,e=3&this.flags,i=null;0!==e&&(i=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,i),t.framebufferRenderbuffer(t.FRAMEBUFFER,function(t,e){switch(e){case 1:return 36096;case 2:return 36128;case 3:return 33306;default:throw new Error("unknown attachment type "+e)}}(0,e),t.RENDERBUFFER,i)),this.buffer=i},_allocate:function(){var t=this.fbo.gl,e=3&this.flags;0!==e&&(t.bindRenderbuffer(t.RENDERBUFFER,this.buffer),t.renderbufferStorage(t.RENDERBUFFER,function(t,e){switch(e){case 1:return 33189;case 2:return 36168;case 3:return 34041;default:throw new Error("unknown attachment type "+e)}}(0,e),this.fbo.width,this.fbo.height),t.bindRenderbuffer(t.RENDERBUFFER,null))},dispose:function(){this.buffer&&this.fbo.gl.deleteRenderbuffer(this.buffer),this.buffer=null},clearBits:function(){return(1&this.flags?256:0)|(2&this.flags?1024:0)}};var n={};t.exports=a},28:function(t,e,i){"use strict";var r=i(0),a=i(14),s=i(12);i(144);const n=(t,e)=>{if(t.length!==e.length)return!1;for(let i=0;i<t.length;i++)if(t[i]!==e[i])return!1;return!0},o=t=>{const e=t.split("\n");for(let t=0;t<e.length;t++)e[t]=`${t+1}: ${e[t]}`;return e.join("\n")},h=t=>t.slice?t.slice(0):new Float32Array(t),c=i(142),u=i(143),l={float:"uniform1f",vec2:"uniform2fv",vec3:"uniform3fv",vec4:"uniform4fv",int:"uniform1i",mat3:"uniformMatrix3fv",mat4:"uniformMatrix4fv"};class f{constructor(t=c,e=u,i){this.parameters=[],this._uniformTextures=[],this._varyings=i,t||(t=c),e||(e=c);const r=this._createShaderProgram(t,!0),a=this._createShaderProgram(e,!1);this._attachShaderProgram(r,a)}use(){this.bind()}bind(){r.c.useProgram(this.shaderProgram),r.a.useShader(this)}uniform(t,e,i){if("object"==typeof t)return void this.uniformObject(t);const a=l[e]||e;let s,o=!1,c=-1;for(let e=0;e<this.parameters.length;e++)if((s=this.parameters[e]).name===t){o=!0,c=e;break}let u=!1;if(o?(this.shaderProgram[t]=s.uniformLoc,u=s.isNumber):(u="uniform1i"===a||"uniform1f"===a,this.shaderProgram[t]=r.c.getUniformLocation(this.shaderProgram,t),u?this.parameters.push({name:t,type:a,value:i,uniformLoc:this.shaderProgram[t],isNumber:u}):this.parameters.push({name:t,type:a,value:h(i),uniformLoc:this.shaderProgram[t],isNumber:u}),c=this.parameters.length-1),this.parameters[c].uniformLoc)if(-1===a.indexOf("Matrix"))if(u){(this.parameters[c].value!==i||!o)&&(r.c[a](this.shaderProgram[t],i),this.parameters[c].value=i)}else n(this.parameters[c].value,i)&&o||(r.c[a](this.shaderProgram[t],i),this.parameters[c].value=h(i));else n(this.parameters[c].value,i)&&o||(r.c[a](this.shaderProgram[t],!1,i),this.parameters[c].value=h(i))}style(t){this.uniformObject(t)}uniformObject(t){for(const e in t)if(t[e]instanceof a.a||t[e]instanceof s.a){const i=t[e];let r=-1;this._uniformTextures.forEach((t,a)=>{t.name===e&&(r=a,t.texture=i)}),-1===r&&(r=this._uniformTextures.length,this._uniformTextures.push({name:e,texture:i})),this.uniform(e,"uniform1i",r),i.bind(r)}else{let i=t[e];const r=f.getUniformType(i);if(i.concat&&i[0].concat){let t=[];for(let e=0;e<i.length;e++)t=t.concat(i[e]);i=t}this.uniform(e,r,i)}}_createShaderProgram(t,e){const i=e?r.c.VERTEX_SHADER:r.c.FRAGMENT_SHADER,a=r.c.createShader(i);return r.c.shaderSource(a,t),r.c.compileShader(a),r.c.getShaderParameter(a,r.c.COMPILE_STATUS)?a:(console.warn("Error in Shader : ",r.c.getShaderInfoLog(a)),console.log(o(t)),null)}_attachShaderProgram(t,e){this.shaderProgram=r.c.createProgram(),r.c.attachShader(this.shaderProgram,t),r.c.attachShader(this.shaderProgram,e),r.c.deleteShader(t),r.c.deleteShader(e),this._varyings&&(console.log("Transform feedback setup : ",this._varyings),r.c.transformFeedbackVaryings(this.shaderProgram,this._varyings,r.c.SEPARATE_ATTRIBS)),r.c.linkProgram(this.shaderProgram)}}f.getUniformType=function(t){const e=function(t){return 9===t.length?"uniformMatrix3fv":16===t.length?"uniformMatrix4fv":`vec${t.length}`};return!!t.length?t[0].concat?e(t[0]):e(t):"float"},e.a=f},4:function(t,e){var i=0,r=3553;function a(t,e,i){return 9728|+t|+e<<8|+(e&&i)<<1}function s(t,e){return this._uid=i++,this.gl=t,this.id=this.gl.createTexture(),this.width=0,this.height=0,this.format=e||t.RGB,this.type=t.UNSIGNED_BYTE,this.img=null,t.bindTexture(r,this.id),this.setFilter(!0),this}s.prototype={fromImage:function(t){var e=this.gl;return this.img=t,this.width=t.width,this.height=t.height,e.bindTexture(r,this.id),e.texImage2D(r,0,this.format,this.format,this.type,t),this},fromData:function(t,e,i,a){var s=this.gl;return this.width=t,this.height=e,i=i||null,this.type=a||s.UNSIGNED_BYTE,s.bindTexture(r,this.id),window.useWebgl2?a===s.RGBA16F?s.texImage2D(s.TEXTURE_2D,0,this.type,t,e,0,this.format,s.HALF_FLOAT,i):a===s.RG32F||a===s.RGBA32F||a===s.RGB32F?s.texImage2D(s.TEXTURE_2D,0,this.type,t,e,0,this.format,s.FLOAT,i):s.texImage2D(r,0,this.format,t,e,0,this.format,this.type,i):s.texImage2D(r,0,this.format,t,e,0,this.format,this.type,i),this},bind:function(t){var e=this.gl;void 0!==t&&e.activeTexture(e.TEXTURE0+(0|t)),e.bindTexture(r,this.id)},dispose:function(){this.gl&&this.gl.deleteTexture(this.id),this.id=null,this.gl=null},setFilter:function(t,e,i){var s=this.gl,n=a(!!t,!!e,!!i);s.texParameteri(r,s.TEXTURE_MAG_FILTER,a(!!t,!1,!1)),s.texParameteri(r,s.TEXTURE_MIN_FILTER,n)},repeat:function(){this.wrap(this.gl.REPEAT)},clamp:function(){this.wrap(this.gl.CLAMP_TO_EDGE)},mirror:function(){this.wrap(this.gl.MIRRORED_REPEAT)},wrap:function(t){var e=this.gl;e.texParameteri(r,e.TEXTURE_WRAP_S,t),e.texParameteri(r,e.TEXTURE_WRAP_T,t)}},t.exports=s},5:function(t,e,i){"use strict";i.r(e);var r=i(2),a=i(28),s=i(1),n=i(0);const o=function(t,e,i){const r=e||{};return t.touches&&!i?(r.x=t.touches[0].pageX,r.y=t.touches[0].pageY):t.touches?t.touches&&i&&(r.x=t.touches[1].pageX,r.y=t.touches[1].pageY):(r.x=t.clientX,r.y=t.clientY),r},h=1e-4;class c{constructor(t=[0,0,0],e=[0,1,0]){Object(r.a)(this,"cameraPos",void 0),Object(r.a)(this,"up",void 0),Object(r.a)(this,"cameraFront",[0,0,-1]),Object(r.a)(this,"_mouse",{}),Object(r.a)(this,"_preMouse",{}),Object(r.a)(this,"_mousedown",!1),Object(r.a)(this,"_rx",0),Object(r.a)(this,"_ry",0),Object(r.a)(this,"_preRx",0),Object(r.a)(this,"_preRy",0),Object(r.a)(this,"_targetRx",0),Object(r.a)(this,"_targetRy",0),Object(r.a)(this,"_viewMatrix",s.b.identity(s.b.create())),Object(r.a)(this,"_width",n.b.width),Object(r.a)(this,"_height",n.b.height),Object(r.a)(this,"sensitivity",1),Object(r.a)(this,"target",[0,0,0]),Object(r.a)(this,"offset",[0,0,0]),Object(r.a)(this,"radius",5),Object(r.a)(this,"_targetRadius",5),Object(r.a)(this,"_updateWheel",!1),this.cameraPos=t,this.up=e,this.projMatrix=s.b.create(),s.b.perspective(this.projMatrix,Object(n.d)(45),n.b.clientWidth/n.b.clientHeight,.1,100),this._addEvents()}setProj(t,e,i){s.b.perspective(this.projMatrix,Object(n.d)(t),n.b.clientWidth/n.b.clientHeight,e,i)}_addEvents(){n.b.addEventListener("mousedown",t=>this._down(t)),n.b.addEventListener("mousemove",t=>this._move(t)),document.addEventListener("mouseup",t=>this._up(t)),n.b.addEventListener("mousewheel",t=>this._onWheel(t)),n.b.addEventListener("DOMMouseScroll",t=>this._onWheel(t))}_down(t){this._mousedown=!0,o(t,this._mouse),o(t,this._preMouse),this._preRx=this._targetRx,this._preRy=this._targetRy}_move(t){if(this._mousedown){o(t,this._mouse);let e=(this._mouse.x-this._preMouse.x)/this._width,i=(this._mouse.y-this._preMouse.y)/this._height;this._targetRx=this._preRx+e*Math.PI*2*this.sensitivity,this._targetRy=this._preRy+i*Math.PI*this.sensitivity}}_up(t){this._mousedown=!1}updateMatrix(){this._rx+=.1*(this._targetRx-this._rx),Math.abs(this._targetRx-this._rx)<h&&(this._rx=this._targetRx),this._ry+=.1*(this._targetRy-this._ry),Math.abs(this._targetRy-this._ry)<h&&(this._ry=this._targetRy),this._updateWheel&&(this.radius+=.1*(this._targetRadius-this.radius),Math.abs(this._targetRadius-this.radius)<h&&(this.radius=this._targetRadius)),this.cameraPos[1]=Math.sin(this._ry)*this.radius;let t=Math.abs(Math.cos(this._ry)*this.radius);this.cameraPos[0]=Math.cos(this._rx+.5*Math.PI)*t,this.cameraPos[2]=Math.sin(this._rx+.5*Math.PI)*t,this.cameraPos=[this.cameraPos[0]+this.offset[0],this.cameraPos[1]+this.offset[1],this.cameraPos[2]+this.offset[2]],s.b.lookAt(this._viewMatrix,this.cameraPos,this.target,this.up)}_onWheel(t){const e=t.wheelDelta,i=t.detail;let r=0;r=i?e?e/i/40*i>0?1:-1:-i/3:e/120,this._targetRadius=this.radius+1*-r,this._targetRadius<=1&&(this._targetRadius=1),this._updateWheel=!0}get viewMatrix(){return this._viewMatrix}set rx(t){this._targetRx=t}}var u=i(43);i.d(e,"default",function(){return l});class l{constructor(){Object(r.a)(this,"rotateQ",s.c.create()),Object(r.a)(this,"mousePos",{x:0,y:0}),Object(r.a)(this,"camera",new c),Object(r.a)(this,"pMatrix",s.b.identity(s.b.create())),Object(r.a)(this,"mvpMatrix",s.b.identity(s.b.create())),Object(r.a)(this,"tmpMatrix",s.b.identity(s.b.create())),Object(r.a)(this,"_params",{}),Object(r.a)(this,"gui",new u.a({width:300})),this.vMatrix=this.camera.viewMatrix,n.a.setCamera(this.camera),this.init(),this.attrib(),this.prepare(),this._setGUI(),this._animate=this.animate.bind(this),n.c.enable(n.c.DEPTH_TEST),n.c.depthFunc(n.c.LEQUAL),n.c.enable(n.c.CULL_FACE)}init(){}compile(t,e){return new a.a(t,e)}attrib(){}uniform(){}prepare(){}animate(){requestAnimationFrame(this._animate),this.camera.updateMatrix(),this.uniform(),this.render()}render(){}play(){this.animate()}_setGUI(){}addGUIParams(t){return Object.assign(this._params,t)}get params(){return this._params}set params(t){throw Error("Params has no setter,please use addGUIParams")}}},55:function(t,e,i){"use strict";i.r(e),i.d(e,"default",function(){return _});var r=i(2),a=i(5),s=i(0),n=i(112),o=i.n(n),h=i(113),c=i.n(h),u=i(114),l=i.n(u),f=i(115),m=i.n(f),d=i(6),b=i(1),p=i(26),v=i.n(p),g=i(3);class _ extends a.default{constructor(){super(),Object(r.a)(this,"count",0),Object(r.a)(this,"ortMatrix",b.b.identity(b.b.create()))}init(){this.prg=this.compile(o.a,c.a),this.mPrg=this.compile(l.a,m.a)}attrib(){let{pos:t,index:e,normal:i,color:r}=Object(d.Torus)(64,64,.2,.7),a=new g.a;a.bufferVertex(t),a.bufferIndex(e),a.bufferNormal(i),a.bufferColor(r),this.torus=a;r=[.3,.5,.5,1,.5,.5,.1,1,.5,.5,.1,1,.5,.5,.1,1];e=[0,2,1,1,2,3];let s=new g.a;s.bufferVertex([-1,1,0,1,1,0,-1,-1,0,1,-1,0]),s.bufferIndex(e),s.bufferTexCoord([0,0,1,0,0,1,1,1]),s.bufferColor(r),this.plane=s}prepare(){this.fbo=new v.a(s.c),this.fbo.resize(512,512),s.c.enable(s.c.DEPTH_TEST),s.c.depthFunc(s.c.LEQUAL),s.c.enable(s.c.CULL_FACE)}uniform(){let t=b.b.identity(b.b.create()),e=b.b.identity(b.b.create());this.tmpMatrix=b.b.identity(b.b.create());let i=[],r=[];b.e.transformQuat(i,[0,5,5],this.rotateQ),b.e.transformQuat(r,[0,1,-1],this.rotateQ),this.eyeDirection=i,b.b.lookAt(t,i,[0,0,0],r),b.b.perspective(e,45,s.b.clientWidth/s.b.clientHeight,.1,100),b.b.multiply(this.tmpMatrix,e,t),b.b.lookAt(t,[0,0,.1],[0,0,0],[0,1,0]),b.b.ortho(e,-1,1,-1,1,.1,1),b.b.multiply(this.ortMatrix,e,t)}render(){this.fbo.bind(),this.fbo.clear(),s.c.clearColor(.3,.8,.4,.3),s.c.clearDepth(1),s.c.clear(s.c.COLOR_BUFFER_BIT|s.c.DEPTH_BUFFER_BIT),s.c.cullFace(s.c.FRONT);let t=b.b.identity(b.b.create());b.b.rotate(t,t,2*Math.PI/9,[0,1,0]);let e=b.b.identity(b.b.create());b.b.invert(e,t),this.prg.use(),this.prg.style({vpMatrix:this.tmpMatrix,mMatrix:t,invMatrix:e,lightDirection:[0,-.5,.577],eyeDirection:this.eyeDirection,ambientColor:[0,0,0,0],mirror:!0}),this.torus.bind(this.prg),this.torus.draw(),this.fbo.unbind(),s.c.clearColor(0,.7,.7,1),s.c.clearDepth(1),s.c.clearStencil(0),s.c.clear(s.c.COLOR_BUFFER_BIT|s.c.DEPTH_BUFFER_BIT|s.c.STENCIL_BUFFER_BIT),s.c.cullFace(s.c.BACK),s.c.enable(s.c.STENCIL_TEST),s.c.stencilFunc(s.c.ALWAYS,1,-1),s.c.stencilOp(s.c.KEEP,s.c.KEEP,s.c.REPLACE),t=b.b.identity(t),b.b.translate(t,t,[0,1,0]),b.b.scale(t,t,[1.7,1.7,1.7]),b.b.rotate(t,t,1.5*Math.PI,[1,0,0]),b.b.invert(e,t),this.prg.style({mMatrix:t,invMatrix:e}),this.plane.bind(this.prg,["position","color","normal"]),this.plane.draw(),s.c.stencilFunc(s.c.EQUAL,1,-1),s.c.stencilOp(s.c.KEEP,s.c.KEEP,s.c.KEEP),this.mPrg.use(),this.fbo.bindColor(this.mPrg.texture(),0),this.mPrg.style({alpha:.9,texture:0,ortMatrix:this.ortMatrix}),this.plane.bind(this.mPrg,["position","texCoord"]),this.plane.draw(),s.c.disable(s.c.STENCIL_TEST)}}},6:function(t,e,i){"use strict";i.r(e),i.d(e,"Torus",function(){return a}),i.d(e,"hsva",function(){return s}),i.d(e,"Sphere",function(){return n}),i.d(e,"plane",function(){return o}),i.d(e,"QuadData",function(){return h}),i.d(e,"TorusKnot",function(){return c}),i.d(e,"regularPolyhedron",function(){return u});var r=i(3);function a(t,e,i,a,n){let o,h=[],c=[],u=[],l=[],f=[];for(let r=0;r<=t;r++){let c=2*Math.PI/t*r,m=Math.cos(c),d=Math.sin(c);for(let c=0;c<=e;c++){f.push(c/e,r/t);let b=2*Math.PI/e*c,p=(m*i+a)*Math.cos(b),v=d*i,g=(m*i+a)*Math.sin(b);h.push(p,v,g),o=n||s(360/e*c,1,1,1),l.push(o[0],o[1],o[2],o[3]);let _=m*Math.cos(b),x=m*Math.sin(b);u.push(_,d,x)}}for(let i=0;i<t;i++)for(let t=0;t<e;t++){let r=(e+1)*i+t;c.push(r,r+e+1,r+1),c.push(r+e+1,r+e+2,r+1)}let m=new r.a;return m.bufferFlattenData(h,"position",3),m.bufferFlattenData(f,"texCoord",2),m.bufferFlattenData(l,"color",4),m.bufferIndex(c),m.bufferFlattenData(u,"normal",3),m}function s(t,e,i,r){if(e>1||i>1||r>1)return;let a=t%360,s=Math.floor(a/60),n=a/60-s,o=i*(1-e),h=i*(1-e*n),c=i*(1-e*(1-n)),u=[];if(!e>0&&!e<0)u.push(i,i,i,r);else{let t=[i,h,o,o,c,i],e=[c,i,i,h,o,o],a=[o,o,c,i,i,h];u.push(t[s],e[s],a[s],r)}return u}function n(t,e,i,r){for(var a=[],n=[],o=[],h=[],c=[],u=0;u<=t;u++)for(var l=Math.PI/t*u,f=Math.cos(l),m=Math.sin(l),d=0;d<=e;d++){var b=2*Math.PI/e*d,p=m*i*Math.cos(b),v=f*i,g=m*i*Math.sin(b),_=m*Math.cos(b),x=m*Math.sin(b);if(r)var E=r;else E=s(360/t*u,1,1,1);a.push(p,v,g),n.push(_,f,x),o.push(E[0],E[1],E[2],E[3]),h.push(1-1/e*d,1/t*u)}for(l=0,u=0;u<t;u++)for(d=0;d<e;d++)l=(e+1)*u+d,c.push(l,l+1,l+e+2),c.push(l,l+e+2,l+e+1);return{pos:a,normal:n,color:o,uv:h,index:c}}function o(t,e,i){const r=t/2,a=i/2;return[r,e,a,0,1,0,1,0,-r,e,-a,0,1,0,0,1,-r,e,a,0,1,0,0,0,r,e,a,0,1,0,1,0,r,e,-a,0,1,0,1,1,-r,e,-a,0,1,0,0,1]}const h=[-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0];function c(){}function u(){}}}]);