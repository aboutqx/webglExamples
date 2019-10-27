(window.webpackJsonp=window.webpackJsonp||[]).push([[7,21],{106:function(t,e){t.exports="#version 300 es\n#define GLSLIFY 1\n\nlayout (location = 0) in vec3 position;\nlayout (location = 1) in vec3 normal;\nlayout (location = 2) in vec2 texCoord;\n\nout vec3 FragPos;\nout vec2 TexCoords;\nout vec3 Normal;\n\nuniform bool invertedNormals;\n\nuniform mat4 mMatrix;\nuniform mat4 vMatrix;\nuniform mat4 pMatrix;\n\nvoid main()\n{\n    vec4 viewPos = vMatrix * mMatrix * vec4(position, 1.0);\n    FragPos = vec3(viewPos);\n    TexCoords = texCoord;\n\n    mat3 normalMatrix = transpose(inverse(mat3(mMatrix)));\n    Normal = normalMatrix * (invertedNormals ? -normal : normal);\n\n    gl_Position = pMatrix * viewPos;\n}\n"},107:function(t,e){t.exports="#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\nlayout (location = 0) out vec3 gPositionDepth;\nlayout (location = 1) out vec3 gNormal;\nlayout (location = 2) out vec4 gAlbedoSpec;\n\nin vec2 TexCoords;\nin vec3 FragPos;\nin vec3 Normal;\n\nconst float NEAR = 0.1; // 投影矩阵的近平面\nconst float FAR = 50.0f; // 投影矩阵的远平面\nfloat LinearizeDepth(float depth)\n{\n    float z = depth * 2.0 - 1.0; // 回到NDC\n    return (2.0 * NEAR * FAR) / (FAR + NEAR - z * (FAR - NEAR));\n}\n\n\nvoid main()\n{\n    // store the fragment position vector in the first gbuffer texture\n    gPositionDepth.xyz = FragPos;\n    // // 储存线性深度到gPositionDepth的alpha分量\n    // gPositionDepth.a = LinearizeDepth(gl_FragCoord.z);\n    // also store the per-fragment normals into the gbuffer\n    gNormal = normalize(Normal);\n    // and the diffuse per-fragment color\n    gAlbedoSpec.rgb = vec3(0.95);\n}\n"},108:function(t,e){t.exports="#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\nout float FragColor;\nin vec2 TexCoords;\n\nuniform sampler2D gPositionDepth;\nuniform sampler2D gNormal;\nuniform sampler2D texNoise;\n\nuniform vec3 samples[64];\nuniform mat4 pMatrix;\n\nint kernelSize = 64;\nfloat radius = 0.5;\nfloat bias = 0.025;\n// 屏幕的平铺噪声纹理会根据屏幕分辨率除以噪声大小的值来决定\nconst vec2 noiseScale = vec2(960.0/4.0, 640.0/4.0);\n\nvoid main() {\n    vec3 fragPos = texture(gPositionDepth, TexCoords).xyz;\n    vec3 normal = texture(gNormal, TexCoords).rgb;\n    vec3 randomVec = texture(texNoise, TexCoords * noiseScale).xyz;\n\n    // Gramm-Schmidt正交化\n    vec3 tangent = normalize(randomVec - normal * dot(randomVec, normal));\n    vec3 bitangent = cross(normal, tangent);\n    mat3 TBN = mat3(tangent, bitangent, normal);\n\n    float occlusion = 0.0;\n    for(int i = 0; i < kernelSize; ++i)\n    {\n        // 获取样本位置\n        vec3 sample1 = TBN * samples[i]; // 切线->观察空间\n        sample1 = fragPos + sample1 * radius;\n\n        vec4 offset = vec4(sample1, 1.0);\n        offset = pMatrix * offset; // 观察->裁剪空间\n        offset.xyz /= offset.w; // 透视划分\n        offset.xyz = offset.xyz * 0.5 + 0.5; // 变换到0.0 - 1.0的值域\n\n        float sampleDepth = texture(gPositionDepth, offset.xy).z;\n        float rangeCheck = smoothstep(0.0, 1.0, radius / abs(fragPos.z - sampleDepth));\n        occlusion += (sampleDepth >= sample1.z ? 1.0 : 0.0) * rangeCheck;\n\n    }\n    occlusion = 1.0 - (occlusion / float(kernelSize));\n    FragColor = occlusion;\n}\n"},109:function(t,e){t.exports="#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\nin vec2 TexCoords;\nout float FragColor;\nuniform sampler2D ssaoInput;\n\nvoid main() {\n  // simple box filter\n  vec2 texelSize = 1.0 / vec2(textureSize(ssaoInput, 0));\n  float result = 0.0;\n  for (int x = -2; x < 2; ++x)\n  {\n    for (int y = -2; y < 2; ++y)\n    {\n        vec2 offset = vec2(float(x), float(y)) * texelSize;\n        result += texture(ssaoInput, TexCoords + offset).r;\n    }\n  }\n  FragColor = result / (4.0 * 4.0);\n\n}\n"},110:function(t,e){t.exports="#version 300 es\nprecision mediump float;\n#define GLSLIFY 1\n\nout vec4 outColor;\n\nin vec2 TexCoords;\n\nuniform sampler2D gPosition;\nuniform sampler2D gNormal;\nuniform sampler2D gAlbedoSpec;\nuniform sampler2D ssao;\n\nstruct Light {\n    vec3 Position;\n    vec3 Color;\n\n    float Linear;\n    float Quadratic;\n};\nuniform Light lights;\nuniform vec3 viewPos;\n\nvoid main() {\n    vec3 FragPos = texture(gPosition, TexCoords).rgb;\n    vec3 Normal = texture(gNormal, TexCoords).rgb;\n    vec3 Diffuse = texture(gAlbedoSpec, TexCoords).rgb;\n    float AmbientOcclusion = texture(ssao, TexCoords).r;\n\n    // then calculate lighting as usual\n    vec3 ambient = vec3(0.3 * Diffuse * AmbientOcclusion);\n    vec3 lighting  = ambient;\n    vec3 viewDir  = normalize(- FragPos);\n\n\n    // diffuse\n    vec3 lightDir = normalize(lights.Position - FragPos);\n    vec3 diffuse = max(dot(Normal, lightDir), 0.0) * Diffuse * lights.Color;\n    // specular\n    vec3 halfwayDir = normalize(lightDir + viewDir);\n    float spec = pow(max(dot(Normal, halfwayDir), 0.0), 16.0);\n    vec3 specular = lights.Color * spec;\n    // attenuation\n    float distance = length(lights.Position - FragPos);\n    float attenuation = 1.0 / (1.0 + lights.Linear * distance + lights.Quadratic * distance * distance);\n    diffuse *= attenuation;\n    specular *= attenuation;\n    lighting += diffuse + specular;\n\n    outColor = vec4(lighting, 1.0);\n}\n"},15:function(t,e){t.exports="#version 300 es\n#define GLSLIFY 1\nin vec3 position;\nin vec2 texCoord;\n\nout vec2 TexCoords;\nvoid main(){\n  TexCoords = texCoord;\n  gl_Position = vec4(position, 1.);\n}\n"},21:function(t,e,n){"use strict";var r=n(8),s=n(2),i=n(4);class a{constructor(){Object(s.a)(this,"object",null),Object(s.a)(this,"objectList",[]),Object(s.a)(this,"meshes",[]),Object(s.a)(this,"materialLibraries",[])}load(t,e,n=4){this._drawType=n,super.load(t,e)}_onLoaded(){this.parseObj(this._req.response)}parseObj(t,e){this.materials=e;const n=t.split("\n"),r=[],s=[],i=[];let a;const o=/^[og]\s*(.+)?/,l=/^mtllib /,u=/^usemtl /,c=/v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,h=/vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,d=/vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,f=/f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/,p=/f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/,m=/f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/,b=/f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;function g(t){const e=parseInt(t);return 3*(e>=0?e-1:e+r.length/3)}function E(t){const e=parseInt(t);return 3*(e>=0?e-1:e+s.length/3)}function x(t){const e=parseInt(t);return 2*(e>=0?e-1:e+i.length/2)}const F=(t,e,n)=>{this.object.positions.push([r[t],r[t+1],r[t+2]]),this.object.positions.push([r[e],r[e+1],r[e+2]]),this.object.positions.push([r[n],r[n+1],r[n+2]]),this.object.indices.push(3*this.object.count+0),this.object.indices.push(3*this.object.count+1),this.object.indices.push(3*this.object.count+2),this.object.count++},T=(t,e,n)=>{this.object.coords.push([i[t],i[t+1]]),this.object.coords.push([i[e],i[e+1]]),this.object.coords.push([i[n],i[n+1]])},v=(t,e,n)=>{this.object.finalNormals.push([s[t],s[t+1],s[t+2]]),this.object.finalNormals.push([s[e],s[e+1],s[e+2]]),this.object.finalNormals.push([s[n],s[n+1],s[n+2]])};function R(t,e,n,r,s,i,a,o,l,u,c,h){let d,f=g(t),p=g(e),m=g(n);void 0===r?F(f,p,m):(d=g(r),F(f,p,d),F(p,m,d)),void 0!==s&&(f=x(s),p=x(i),m=x(a),void 0===r?T(f,p,m):(d=x(o),T(f,p,d),T(p,m,d))),void 0!==l&&(f=E(l),p=E(u),m=E(c),void 0===r?v(f,p,m):(d=E(h),v(f,p,d),v(p,m,d)))}for(let t=0;t<n.length;t++){let e=n[t];if(0===(e=e.trim()).length||"#"===e.charAt(0))continue;e.charAt(0);if(l.test(e))this.materialLibraries.push(e.substring(7).trim());else if(u.test(e))this._startMaterial(e.substring(7).trim(),this.materialLibraries);else if(null!==(a=o.exec(e))){let t=(" "+a[0].substr(1).trim()).substr(1);this._startObject(t)}else null!==(a=c.exec(e))?r.push(parseFloat(a[1]),parseFloat(a[2]),parseFloat(a[3])):null!==(a=h.exec(e))?s.push(parseFloat(a[1]),parseFloat(a[2]),parseFloat(a[3])):null!==(a=d.exec(e))?i.push(parseFloat(a[1]),parseFloat(a[2])):null!==(a=f.exec(e))?R(a[1],a[2],a[3],a[4]):null!==(a=p.exec(e))?R(a[2],a[5],a[8],a[11],a[3],a[6],a[9],a[12]):null!==(a=m.exec(e))?R(a[2],a[6],a[10],a[14],a[3],a[7],a[11],a[15],a[4],a[8],a[12],a[16]):null!==(a=b.exec(e))&&R(a[2],a[5],a[8],a[11],void 0,void 0,void 0,void 0,a[3],a[6],a[9],a[12])}return this._generateMeshes()}_startObject(t){-1===function(t,e,n){if(!t||!t.length)return-1;for(let r=0;r<t.length;r++)if(t[r][e]===n)return r;return-1}(this.objectList,"name",t)&&(this.object={name:t,positions:[],coords:[],finalNormals:[],indices:[],count:0},this.objectList.push(this.object))}_startMaterial(t,e){let n={name:t,mtlLib:e[e.length-1]};this.object.material=n}_generateMeshes(){let t;for(let e=0;e<this.objectList.length;e++){const n=(t={positions:this.objectList[e].positions,coords:this.objectList[e].coords,indices:this.objectList[e].indices,normals:this.objectList[e].finalNormals,name:this.objectList[e].name,material:this.materials?Object(r.a)({},this.materials[this.objectList[e].material.name],{mtlLib:this.objectList[e].material.mtlLib}):this.objectList[e].material}).normals.length>0,s=t.coords.length>0;let a=new i.a(this._drawType,t.name,t.material);a.bufferVertex(t.positions),s&&a.bufferTexCoord(t.coords),a.bufferIndices(t.indices),n&&a.bufferNormal(t.normals),this._callback&&this._callback(a,t),this.meshes.push(a)}return this.meshes}}a.parse=function(t){return(new a).parseObj(t)},e.a=a},22:function(t,e,n){var r=n(3);function s(t,e){this.gl=t,this.width=0,this.height=0,this.fbo=null;var n=(e=e||a).depth|e.stencil<<1,s=e.type||t.UNSIGNED_BYTE;this.types=Array.isArray(s)?s:[s],this.color=new r(t,e.format),this.attachment=new i(this,n)}function i(t,e){this.fbo=t,this.flags=e,this.buffer=null}s.prototype={resize:function(t,e){this.width===t&&this.height===e||(this.width=0|t,this.height=0|e,null===this.fbo&&this._init(),this._allocate())},bindColor:function(t,e){var n=this.gl;n.activeTexture(n.TEXTURE0+e),n.bindTexture(n.TEXTURE_2D,this.color.id),n.uniform1i(t,e)},bind:function(){var t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,this.fbo),t.viewport(0,0,this.width,this.height)},unbind:function(){var t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,null)},clear:function(){var t=this.gl,e=t.COLOR_BUFFER_BIT|this.attachment.clearBits();t.clear(e)},isValid:function(){var t=this.gl;return t.checkFramebufferStatus(t.FRAMEBUFFER)===t.FRAMEBUFFER_COMPLETE},getActualType:function(){return this.color.type},dispose:function(){this.gl.deleteFramebuffer(this.fbo),this.color.dispose(),this.attachment.dispose(),this.valid=!1,this.fbo=null,this.gl=null},_init:function(){var t=this.gl;this.fbo=t.createFramebuffer(),t.bindFramebuffer(t.FRAMEBUFFER,this.fbo),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,this.color.id,0),this.attachment._init()},_allocate:function(){var t=this.gl;this.attachment._allocate(),t.bindFramebuffer(t.FRAMEBUFFER,this.fbo);var e=0,n=this.types[e];do{this.color.fromData(this.width,this.height,null,n),t.getError()}while(!(this.valid=this.isValid())&&(n=this.types[++e]));t.bindFramebuffer(t.FRAMEBUFFER,null)}},i.prototype={_init:function(){var t=this.fbo.gl,e=3&this.flags,n=null;0!==e&&(n=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,n),t.framebufferRenderbuffer(t.FRAMEBUFFER,function(t,e){switch(e){case 1:return 36096;case 2:return 36128;case 3:return 33306;default:throw new Error("unknown attachment type "+e)}}(0,e),t.RENDERBUFFER,n)),this.buffer=n},_allocate:function(){var t=this.fbo.gl,e=3&this.flags;0!==e&&(t.bindRenderbuffer(t.RENDERBUFFER,this.buffer),t.renderbufferStorage(t.RENDERBUFFER,function(t,e){switch(e){case 1:return 33189;case 2:return 36168;case 3:return 34041;default:throw new Error("unknown attachment type "+e)}}(0,e),this.fbo.width,this.fbo.height),t.bindRenderbuffer(t.RENDERBUFFER,null))},dispose:function(){this.buffer&&this.fbo.gl.deleteRenderbuffer(this.buffer),this.buffer=null},clearBits:function(){return(1&this.flags?256:0)|(2&this.flags?1024:0)}};var a={};t.exports=s},28:function(t,e,n){"use strict";n.d(e,"a",function(){return l});var r=n(9),s=n.n(r),i=n(2),a=n(29),o=n.n(a);class l{constructor(t,e){Object(i.a)(this,"_materials",{}),Object(i.a)(this,"materialsInfo",{}),Object(i.a)(this,"name",""),this.name=t,this.path=e}parse(t){var e,n,r,i,a,o,l,u,c;return s.a.async(function(h){for(;;)switch(h.prev=h.next){case 0:e=t.split("\n"),n={},r=/\s+/,i=0;case 4:if(!(i<e.length)){h.next=18;break}if(0!==(a=(a=e[i]).trim()).length&&"#"!==a.charAt(0)){h.next=9;break}return h.abrupt("continue",15);case 9:o=a.indexOf(" "),l=(l=o>=0?a.substring(0,o):a).toLowerCase(),u=(u=o>=0?a.substring(o+1):"").trim(),"newmtl"===l?(n={name:u},this.materialsInfo[u]=n):"ka"===l||"kd"===l||"ks"===l?(c=u.split(r,3),n[l]=[parseFloat(c[0]),parseFloat(c[1]),parseFloat(c[2])]):n[l]=u;case 15:i++,h.next=4;break;case 18:return h.next=20,s.a.awrap(this.setMaterials());case 20:return h.abrupt("return",this.materials);case 21:case"end":return h.stop()}},null,this)}setMaterials(){var t,e,n,r;return s.a.async(function(i){for(;;)switch(i.prev=i.next){case 0:i.t0=s.a.keys(this.materialsInfo);case 1:if((i.t1=i.t0()).done){i.next=50;break}e=i.t1.value,this._materials[e]={},i.t2=s.a.keys(this.materialsInfo[e]);case 5:if((i.t3=i.t2()).done){i.next=48;break}n=i.t3.value,r=this.materialsInfo[e][n],i.t4=n.toLowerCase(),i.next="kd"===i.t4?11:"ks"===i.t4?13:"map_kd"===i.t4?15:"map_ks"===i.t4?19:"norm"===i.t4?23:"map_bump"===i.t4?27:"bump"===i.t4?27:"map_d"===i.t4?31:"ns"===i.t4?36:"d"===i.t4?38:"tr"===i.t4?41:45;break;case 11:return this._materials[e].kd=r,i.abrupt("break",46);case 13:return this._materials[e].ks=r,i.abrupt("break",46);case 15:return i.next=17,s.a.awrap(this.setMapType("diffuseMap",r));case 17:return this._materials[e].diffuseMap=i.sent,i.abrupt("break",46);case 19:return i.next=21,s.a.awrap(this.setMapType("specularMap",r));case 21:return this._materials[e].specularMap=i.sent,i.abrupt("break",46);case 23:return i.next=25,s.a.awrap(this.setMapType("normalMap",r));case 25:return this._materials[e].normalMap=i.sent,i.abrupt("break",46);case 27:return i.next=29,s.a.awrap(this.setMapType("bumpMap",r));case 29:return this._materials[e].bumpMap=i.sent,i.abrupt("break",46);case 31:return i.next=33,s.a.awrap(this.setMapType("alphaMap",r));case 33:return this._materials[e].alphaMap=i.sent,params.transparent=!0,i.abrupt("break",46);case 36:return this._materials[e].shininess=parseFloat(r),i.abrupt("break",46);case 38:return(t=parseFloat(r))<1&&(this._materials[e].opacity=t),i.abrupt("break",46);case 41:return(t=1-(t=parseFloat(r)))>0&&(this._materials[e].opacity=1-t),i.abrupt("break",46);case 45:return i.abrupt("break",46);case 46:i.next=5;break;case 48:i.next=1;break;case 50:case"end":return i.stop()}},null,this)}setMapType(t,e){var n,r;return s.a.async(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.split(/\s+/).pop(),t.next=3,s.a.awrap(o()(this.path+"/"+n));case 3:return r=t.sent,t.abrupt("return",r);case 5:case"end":return t.stop()}},null,this)}get materials(){return this._materials}set materials(t){this._materials=t}}},55:function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return y});var r=n(9),s=n.n(r),i=n(2),a=n(5),o=n(0),l=n(106),u=n.n(l),c=n(107),h=n.n(c),d=n(15),f=n.n(d),p=n(108),m=n.n(p),b=n(109),g=n.n(b),E=n(110),x=n.n(E),F=n(6),T=n(1),v=n(4),R=n(21),_=n(28),M=n(22),D=n.n(M),w=n(3),P=n.n(w);const A=[0,-1,0],C=[.2,.2,.7];let L=new Float32Array(192),B=new Float32Array(48);const U=()=>{for(let t=0;t<64;t++){let e=T.d.fromValues(2*Math.random()-1,2*Math.random()-1,Math.random());L[3*t]=e[0],L[3*t+1]=e[1],L[3*t+2]=e[2]}},N=()=>{for(let t=0;t<16;t++){let e=T.d.fromValues(2*Math.random()-1,2*Math.random()-1,0);B[3*t]=e[0],B[3*t+1]=e[1],B[3*t+2]=e[2]}};class y extends a.default{constructor(){super(),Object(i.a)(this,"count",0)}init(){o.d.getExtension("OES_texture_float_linear"),o.d.getExtension("EXT_color_buffer_float"),o.d.getExtension("OES_texture_half_float_linear"),this.gBufferPrg=this.compile(u.a,h.a),this.ssaoPrg=this.compile(f.a,m.a),this.blurPrg=this.compile(f.a,g.a),this.prg=this.compile(f.a,x.a)}attrib(){var t,e,n;return s.a.async(function(r){for(;;)switch(r.prev=r.next){case 0:return(t=new v.a).bufferData(F.CubeData,["position","normal","texCoord"],[3,3,2]),this.cube=t,(e=new v.a).bufferData(F.QuadData,["position","texCoord"],[3,2]),this.quad=e,r.next=8,s.a.awrap(new _.a("nanosuit.mtl","./assets/models/nanosuit").parse(getAssets.nanosuitMTL));case 8:n=r.sent,this.nanosuit=(new R.a).parseObj(getAssets.nanosuit,n);case 10:case"end":return r.stop()}},null,this)}prepare(){o.d.clearColor(0,0,0,1),o.d.clearDepth(1),o.d.enable(o.d.DEPTH_TEST),o.d.depthFunc(o.d.LEQUAL),this.mrt=function(t,e,n){let r=o.d.createFramebuffer();o.d.bindFramebuffer(o.d.FRAMEBUFFER,r);let s=[];const i=[];for(let r=0;r<n.length;++r)s[r]=o.d.createTexture(),o.d.bindTexture(o.d.TEXTURE_2D,s[r]),"16f"===n[r]?o.d.texImage2D(o.d.TEXTURE_2D,0,o.d.RGBA16F,t,e,0,o.d.RGBA,o.d.HALF_FLOAT,null):o.d.texImage2D(o.d.TEXTURE_2D,0,o.d.RGBA,t,e,0,o.d.RGBA,o.d.UNSIGNED_BYTE,null),o.d.texParameteri(o.d.TEXTURE_2D,o.d.TEXTURE_MAG_FILTER,o.d.LINEAR),o.d.texParameteri(o.d.TEXTURE_2D,o.d.TEXTURE_MIN_FILTER,o.d.LINEAR),o.d.texParameteri(o.d.TEXTURE_2D,o.d.TEXTURE_WRAP_S,o.d.CLAMP_TO_EDGE),o.d.texParameteri(o.d.TEXTURE_2D,o.d.TEXTURE_WRAP_T,o.d.CLAMP_TO_EDGE),o.d.framebufferTexture2D(o.d.FRAMEBUFFER,o.d.COLOR_ATTACHMENT0+r,o.d.TEXTURE_2D,s[r],0),i.push(o.d.COLOR_ATTACHMENT0+r);o.d.drawBuffers(i);const a=o.d.createRenderbuffer();o.d.bindRenderbuffer(o.d.RENDERBUFFER,a),o.d.renderbufferStorage(o.d.RENDERBUFFER,o.d.DEPTH24_STENCIL8,t,e),o.d.framebufferRenderbuffer(o.d.FRAMEBUFFER,o.d.DEPTH_ATTACHMENT,o.d.RENDERBUFFER,a);const l=o.d.checkFramebufferStatus(o.d.FRAMEBUFFER);l!=o.d.FRAMEBUFFER_COMPLETE&&console.log(`gl.checkFramebufferStatus() returned ${l.toString(16)}`);return o.d.bindTexture(o.d.TEXTURE_2D,null),o.d.bindRenderbuffer(o.d.RENDERBUFFER,null),o.d.bindFramebuffer(o.d.FRAMEBUFFER,null),{frameBuffer:r,depthBuffer:a,texture:s}}(o.a.width,o.a.height,["16f","16f","rgba"]),this.ssaoFbo=new D.a(o.d),this.ssaoFbo.resize(o.a.width,o.a.height),this.blurFbo=new D.a(o.d),this.blurFbo.resize(o.a.width,o.a.height),U(),N(),this.noiseTexture=new P.a(o.d,o.d.RGB).fromData(4,4,B,o.d.RGB32F),this.noiseTexture.bind(),this.noiseTexture.repeat(),this.camera.target=[0,-1,0],this.camera.offset=[0,0,0],this.camera.radius=3,this.camera.rx=-1.5}uniform(){this.vMatrix=this.camera.viewMatrix,this.pMatrix=T.a.identity(T.a.create()),T.a.perspective(this.pMatrix,Object(o.e)(60),o.a.clientWidth/o.a.clientHeight,.1,100)}render(){if(o.d.bindFramebuffer(o.d.FRAMEBUFFER,this.mrt.frameBuffer),o.d.clear(o.d.COLOR_BUFFER_BIT|o.d.DEPTH_BUFFER_BIT),this.gBufferPrg.use(),this.gBufferPrg.style({vMatrix:this.vMatrix,pMatrix:this.pMatrix}),this.nanosuit){let t=T.a.identity(T.a.create());T.a.translate(t,t,[-1,-3.3,3]),T.a.scale(t,t,[.4,.4,.4]),T.a.rotate(t,t,-Math.PI/2,[1,0,0]),this.gBufferPrg.style({mMatrix:t,invertedNormals:0});for(let t=0;t<this.nanosuit.length;t++)this.nanosuit[t].bind(this.gBufferPrg,["position","normal","texCoord"]),this.nanosuit[t].draw()}let t=T.a.identity(T.a.create());T.a.scale(t,t,[8,4,8]),this.gBufferPrg.style({mMatrix:t,invertedNormals:1}),this.cube.bind(this.gBufferPrg,["position","normal","texCoord"]),this.cube.draw(),o.d.bindFramebuffer(o.d.FRAMEBUFFER,null),this.ssaoFbo.bind(),o.d.clear(o.d.COLOR_BUFFER_BIT),o.d.activeTexture(o.d.TEXTURE0),o.d.bindTexture(o.d.TEXTURE_2D,this.mrt.texture[0]),o.d.activeTexture(o.d.TEXTURE1),o.d.bindTexture(o.d.TEXTURE_2D,this.mrt.texture[1]),this.noiseTexture.bind(2),this.ssaoPrg.use(),this.ssaoPrg.style({gPositionDepth:0,gNormal:1,texNoise:2,samples:L,pMatrix:this.pMatrix}),this.quad.bind(this.ssaoPrg,["position","texCoord"]),this.quad.draw(o.d.TRIANGLE_STRIP),this.ssaoFbo.unbind(),this.blurFbo.bind(),this.ssaoFbo.color.bind(0),this.blurPrg.use(),this.blurPrg.style({ssaoInput:0}),this.quad.bind(this.blurPrg,["position","texCoord"]),this.quad.draw(o.d.TRIANGLE_STRIP),this.blurFbo.unbind(),o.d.clear(o.d.COLOR_BUFFER_BIT|o.d.DEPTH_BUFFER_BIT),o.d.activeTexture(o.d.TEXTURE0),o.d.bindTexture(o.d.TEXTURE_2D,this.mrt.texture[0]),o.d.activeTexture(o.d.TEXTURE1),o.d.bindTexture(o.d.TEXTURE_2D,this.mrt.texture[1]),o.d.activeTexture(o.d.TEXTURE2),o.d.bindTexture(o.d.TEXTURE_2D,this.mrt.texture[2]),this.blurFbo.color.bind(3),this.prg.use(),this.prg.style({gPosition:0,gNormal:1,gAlbedoSpec:2,ssao:3,viewPos:this.camera.cameraPos,"lights.Position":A,"lights.Color":C,"lights.Linear":.09,"lights.Quadratic":.032}),this.quad.bind(this.prg,["position","texCoord"]),this.quad.draw(o.d.TRIANGLE_STRIP)}}},6:function(t,e,n){"use strict";function r(t,e,n,r,i){let a,o=[],l=[],u=[],c=[];for(let l=0;l<=t;l++){let h=2*Math.PI/t*l,d=Math.cos(h),f=Math.sin(h);for(let t=0;t<=e;t++){let l=2*Math.PI/e*t,h=(d*n+r)*Math.cos(l),p=f*n,m=(d*n+r)*Math.sin(l);o.push(h,p,m),a=i||s(360/e*t,1,1,1),c.push(a[0],a[1],a[2],a[3]);let b=d*Math.cos(l),g=d*Math.sin(l);u.push(b,f,g)}}for(let n=0;n<t;n++)for(let t=0;t<e;t++){let r=(e+1)*n+t;l.push(r,r+e+1,r+1),l.push(r+e+1,r+e+2,r+1)}return{pos:o,index:l,normal:u,color:c}}function s(t,e,n,r){if(e>1||n>1||r>1)return;let s=t%360,i=Math.floor(s/60),a=s/60-i,o=n*(1-e),l=n*(1-e*a),u=n*(1-e*(1-a)),c=[];if(!e>0&&!e<0)c.push(n,n,n,r);else{let t=[n,l,o,o,u,n],e=[u,n,n,l,o,o],s=[o,o,u,n,n,l];c.push(t[i],e[i],s[i],r)}return c}function i(t,e,n,r){for(var i=[],a=[],o=[],l=[],u=[],c=0;c<=t;c++)for(var h=Math.PI/t*c,d=Math.cos(h),f=Math.sin(h),p=0;p<=e;p++){var m=2*Math.PI/e*p,b=f*n*Math.cos(m),g=d*n,E=f*n*Math.sin(m),x=f*Math.cos(m),F=f*Math.sin(m);if(r)var T=r;else T=s(360/t*c,1,1,1);i.push(b,g,E),a.push(x,d,F),o.push(T[0],T[1],T[2],T[3]),l.push(1-1/e*p,1/t*c)}for(h=0,c=0;c<t;c++)for(p=0;p<e;p++)h=(e+1)*c+p,u.push(h,h+1,h+e+2),u.push(h,h+e+2,h+e+1);return{pos:i,normal:a,color:o,uv:l,index:u}}function a(t,e,n){const r=t/2,s=n/2;return[r,e,s,0,1,0,1,0,-r,e,-s,0,1,0,0,1,-r,e,s,0,1,0,0,0,r,e,s,0,1,0,1,0,r,e,-s,0,1,0,1,1,-r,e,-s,0,1,0,0,1]}n.r(e),n.d(e,"Torus",function(){return r}),n.d(e,"hsva",function(){return s}),n.d(e,"Sphere",function(){return i}),n.d(e,"plane",function(){return a}),n.d(e,"QuadData",function(){return o}),n.d(e,"CubeData",function(){return l});const o=[-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0],l=[-1,-1,-1,0,0,-1,0,0,1,1,-1,0,0,-1,1,1,1,-1,-1,0,0,-1,1,0,1,1,-1,0,0,-1,1,1,-1,-1,-1,0,0,-1,0,0,-1,1,-1,0,0,-1,0,1,-1,-1,1,0,0,1,0,0,1,-1,1,0,0,1,1,0,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,-1,1,1,0,0,1,0,1,-1,-1,1,0,0,1,0,0,-1,1,1,-1,0,0,1,0,-1,1,-1,-1,0,0,1,1,-1,-1,-1,-1,0,0,0,1,-1,-1,-1,-1,0,0,0,1,-1,-1,1,-1,0,0,0,0,-1,1,1,-1,0,0,1,0,1,1,1,1,0,0,1,0,1,-1,-1,1,0,0,0,1,1,1,-1,1,0,0,1,1,1,-1,-1,1,0,0,0,1,1,1,1,1,0,0,1,0,1,-1,1,1,0,0,0,0,-1,-1,-1,0,-1,0,0,1,1,-1,-1,0,-1,0,1,1,1,-1,1,0,-1,0,1,0,1,-1,1,0,-1,0,1,0,-1,-1,1,0,-1,0,0,0,-1,-1,-1,0,-1,0,0,1,-1,1,-1,0,1,0,0,1,1,1,1,0,1,0,1,0,1,1,-1,0,1,0,1,1,1,1,1,0,1,0,1,0,-1,1,-1,0,1,0,0,1,-1,1,1,0,1,0,0,0]}}]);