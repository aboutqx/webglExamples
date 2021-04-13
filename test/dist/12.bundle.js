(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{45:function(e,t,r){"use strict";var a=r(0),n=r(3);let s,i;t.a=class{constructor(e,t,r={},n=1){s=!window.useWebgl2&&a.c.getExtension("WEBGL_depth_texture"),this.width=e||a.b.width,this.height=t||a.b.height,this._numTargets=n,this._multipleTargets=n>1,1==r.hdr?this._parameters={internalFormat:a.c.RGBA16F,type:a.c.HALF_FLOAT,minFilter:r.minFilter,maxFilter:r.magFilter}:this._parameters=r,window.useWebgl2||(i=a.c.getExtension("WEBGL_draw_buffers")),this._multipleTargets&&this._checkMaxNumRenderTarget(),this._init()}_init(){if(this._initTextures(),this.frameBuffer=a.c.createFramebuffer(),a.c.bindFramebuffer(a.c.FRAMEBUFFER,this.frameBuffer),window.useWebgl2){if(0===this._numTargets)a.c.readBuffer(a.c.NONE),a.c.drawBuffers([a.c.NONE]);else{const e=[];for(let t=0;t<this._numTargets;t++)a.c.framebufferTexture2D(a.c.DRAW_FRAMEBUFFER,a.c.COLOR_ATTACHMENT0+t,a.c.TEXTURE_2D,this._textures[t].texture,0),e.push(a.c["COLOR_ATTACHMENT"+t]);a.c.drawBuffers(e)}a.c.framebufferTexture2D(a.c.DRAW_FRAMEBUFFER,a.c.DEPTH_ATTACHMENT,a.c.TEXTURE_2D,this.glDepthTexture.texture,0)}else{for(let e=0;e<this._numTargets;e++)a.c.framebufferTexture2D(a.c.FRAMEBUFFER,a.c.COLOR_ATTACHMENT0+e,a.c.TEXTURE_2D,this._textures[e].texture,0);if(this._multipleTargets){const e=[];for(let t=0;t<this._numTargets;t++)e.push(i[`COLOR_ATTACHMENT${t}_WEBGL`]);i.drawBuffersWEBGL(e)}s&&a.c.framebufferTexture2D(a.c.FRAMEBUFFER,a.c.DEPTH_ATTACHMENT,a.c.TEXTURE_2D,this.glDepthTexture.texture,0)}a.c.checkFramebufferStatus(a.c.FRAMEBUFFER)!=a.c.FRAMEBUFFER_COMPLETE&&console.log("gl.checkFramebufferStatus() returned "+status.toString(16)),a.c.bindTexture(a.c.TEXTURE_2D,null),a.c.bindRenderbuffer(a.c.RENDERBUFFER,null),a.c.bindFramebuffer(a.c.FRAMEBUFFER,null),this.clear()}_checkMaxNumRenderTarget(){const e=window.useWebgl2?a.c.getParameter(a.c.MAX_DRAW_BUFFERS):a.c.getParameter(i.MAX_DRAW_BUFFERS_WEBGL);this._numTargets>e&&(console.error("Over max number of draw buffers supported : ",e),this._numTargets=e)}_initTextures(){this._textures=[];for(let e=0;e<this._numTargets;e++){const e=this._createTexture();this._textures.push(e)}window.useWebgl2?this.glDepthTexture=this._createTexture(a.c.DEPTH_COMPONENT16,a.c.UNSIGNED_SHORT,a.c.DEPTH_COMPONENT,{minFilter:a.c.NEAREST,magFilter:a.c.NEAREST}):this.glDepthTexture=this._createTexture(a.c.DEPTH_COMPONENT,a.c.UNSIGNED_SHORT,a.c.DEPTH_COMPONENT,{minFilter:a.c.LINEAR})}_createTexture(e,t,r,s={}){const i=Object.assign({},this._parameters);i.internalFormat=e||i.internalFormat,i.format=r||i.format||a.c.RGBA,i.type=t||i.type||a.c.UNSIGNED_BYTE;for(const e in s)i[e]=s[e];return new n.a(null,i,this.width,this.height)}bind(e=!0){e&&a.c.viewport(0,0,this.width,this.height),a.c.bindFramebuffer(a.c.FRAMEBUFFER,this.frameBuffer),a.a.clear(0,0,0,1)}unbind(e=!0){e&&a.c.viewport(0,0,a.b.width,a.b.height),a.c.bindFramebuffer(a.c.FRAMEBUFFER,null),this._textures.forEach(e=>{e.generateMipmap()})}clear(e=0,t=0,r=0,n=0){this.bind(),a.a.clear(e,t,r,n),this.unbind()}get textures(){return this._textures}getTexture(e=0){return this._textures[e]}get depthTexture(){return this.glDepthTexture}get minFilter(){return this._textures[0].minFilter}set minFilter(e){this._textures.forEach(t=>{t.minFilter=e})}get magFilter(){return this._textures[0].magFilter}set magFilter(e){this._textures.forEach(t=>{t.magFilter=e})}get wrapS(){return this._textures[0].wrapS}set wrapS(e){this._textures.forEach(t=>{t.wrapS=e})}get wrapT(){return this._textures[0].wrapT}set wrapT(e){this._textures.forEach(t=>{t.wrapT=e})}showParameters(){this._textures[0].showParameters()}get numTargets(){return this._numTargets}}},51:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var a=r(2),n=r(5),s=r.n(n),i=r(16),o=r.n(i);class u{constructor(e,t){Object(a.a)(this,"_materials",{}),Object(a.a)(this,"materialsInfo",{}),Object(a.a)(this,"name",""),this.name=e,this.path=t}parse(e){var t,r,a,n,i,o,u,l,c,m=this;return s.a.async((function(h){for(;;)switch(h.prev=h.next){case 0:t=e.split("\n"),r={},a=/\s+/,n=0;case 4:if(!(n<t.length)){h.next=18;break}if(0!==(i=(i=t[n]).trim()).length&&"#"!==i.charAt(0)){h.next=9;break}return h.abrupt("continue",15);case 9:o=i.indexOf(" "),u=(u=o>=0?i.substring(0,o):i).toLowerCase(),l=(l=o>=0?i.substring(o+1):"").trim(),"newmtl"===u?(r={name:l},m.materialsInfo[l]=r):"ka"===u||"kd"===u||"ks"===u?(c=l.split(a,3),r[u]=[parseFloat(c[0]),parseFloat(c[1]),parseFloat(c[2])]):r[u]=l;case 15:n++,h.next=4;break;case 18:return h.next=20,s.a.awrap(m.setMaterials());case 20:return h.abrupt("return",m.materials);case 21:case"end":return h.stop()}}),null,null,null,Promise)}setMaterials(){var e,t,r,a,n=this;return s.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:i.t0=s.a.keys(n.materialsInfo);case 1:if((i.t1=i.t0()).done){i.next=58;break}t=i.t1.value,n._materials[t]={},i.t2=s.a.keys(n.materialsInfo[t]);case 5:if((i.t3=i.t2()).done){i.next=56;break}r=i.t3.value,a=n.materialsInfo[t][r],i.t4=r.toLowerCase(),i.next="kd"===i.t4?11:"ks"===i.t4?13:"map_ka"===i.t4?15:"map_kd"===i.t4?19:"map_ks"===i.t4?23:"norm"===i.t4?27:"map_bump"===i.t4||"bump"===i.t4?31:"map_ke"===i.t4?35:"map_d"===i.t4?39:"ns"===i.t4?44:"d"===i.t4?46:"tr"===i.t4?49:53;break;case 11:return n._materials[t].kd=a,i.abrupt("break",54);case 13:return n._materials[t].ks=a,i.abrupt("break",54);case 15:return i.next=17,s.a.awrap(n.setMapType("ambientMap",a));case 17:return n._materials[t].ambientMap=i.sent,i.abrupt("break",54);case 19:return i.next=21,s.a.awrap(n.setMapType("diffuseMap",a));case 21:return n._materials[t].diffuseMap=i.sent,i.abrupt("break",54);case 23:return i.next=25,s.a.awrap(n.setMapType("specularMap",a));case 25:return n._materials[t].specularMap=i.sent,i.abrupt("break",54);case 27:return i.next=29,s.a.awrap(n.setMapType("normalMap",a));case 29:return n._materials[t].normalMap=i.sent,i.abrupt("break",54);case 31:return i.next=33,s.a.awrap(n.setMapType("bumpMap",a));case 33:return n._materials[t].bumpMap=i.sent,i.abrupt("break",54);case 35:return i.next=37,s.a.awrap(n.setMapType("emissiveMap",a));case 37:return n._materials[t].emissiveMap=i.sent,i.abrupt("break",54);case 39:return i.next=41,s.a.awrap(n.setMapType("alphaMap",a));case 41:return n._materials[t].alphaMap=i.sent,params.transparent=!0,i.abrupt("break",54);case 44:return n._materials[t].shininess=parseFloat(a),i.abrupt("break",54);case 46:return(e=parseFloat(a))<1&&(n._materials[t].opacity=e),i.abrupt("break",54);case 49:return(e=1-(e=parseFloat(a)))>0&&(n._materials[t].opacity=1-e),i.abrupt("break",54);case 53:return i.abrupt("break",54);case 54:i.next=5;break;case 56:i.next=1;break;case 58:case"end":return i.stop()}}),null,null,null,Promise)}setMapType(e,t){var r,a,n=this;return s.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.split(/\s+/).pop(),e.next=3,s.a.awrap(o()(n.path+"/"+r));case 3:return a=e.sent,e.abrupt("return",a);case 5:case"end":return e.stop()}}),null,null,null,Promise)}get materials(){return this._materials}set materials(e){this._materials=e}}},91:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return x}));var a=r(5),n=r.n(a),s=r(43),i=r(0),o=r(13),u=r(1),l=r(18),c=r(51),m=r(45),h=r(3),p=r(42);const f=[0,-1,0],g=[.2,.2,.7];let b=new Float32Array(192),d=new Float32Array(48);class x extends s.a{constructor(){super()}init(){i.a.applyHdrExtension(),this.gBufferPrg=this.compile("#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nlayout (location = 0) in vec3 position;\nlayout (location = 1) in vec3 normal;\nlayout (location = 2) in vec2 texCoord;\n\nout vec3 vPosition;\nout vec2 vTexCoord;\nout vec3 Normal;\n\nuniform bool invertedNormals;\n\nuniform mat4 mMatrix;\nuniform mat4 uViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nvoid main()\n{\n    vec4 viewPos = uViewMatrix * mMatrix * vec4(position, 1.0);\n    vPosition = vec3(viewPos);\n    vTexCoord = texCoord;\n\n    mat3 normalMatrix = transpose(inverse(mat3(mMatrix)));\n    Normal = normalMatrix * (invertedNormals ? -normal : normal);\n\n    gl_Position = uProjectionMatrix * viewPos;\n}\n","#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nlayout (location = 0) out vec3 gPositionDepth;\nlayout (location = 1) out vec3 gNormal;\nlayout (location = 2) out vec4 gAlbedoSpec;\n\nin vec2 vTexCoord;\nin vec3 vPosition;\nin vec3 Normal;\n\nconst float NEAR = 0.1; // 投影矩阵的近平面\nconst float FAR = 50.0f; // 投影矩阵的远平面\nfloat LinearizeDepth(float depth)\n{\n    float z = depth * 2.0 - 1.0; // 回到NDC\n    return (2.0 * NEAR * FAR) / (FAR + NEAR - z * (FAR - NEAR));\n}\n\nvoid main()\n{\n    // store the fragment position vector in the first gbuffer texture\n    gPositionDepth.xyz = vPosition;\n    // // 储存线性深度到gPositionDepth的alpha分量\n    // gPositionDepth.a = LinearizeDepth(gl_FragCoord.z);\n    // also store the per-fragment normals into the gbuffer\n    gNormal = normalize(Normal);\n    // and the diffuse per-fragment color\n    gAlbedoSpec.rgb = vec3(0.95);\n}\n"),this.ssaoPrg=this.compile(o.c,"#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nout float FragColor;\nin vec2 vTexCoord;\n\nuniform sampler2D gPositionDepth;\nuniform sampler2D gNormal;\nuniform sampler2D texNoise;\n\nuniform vec3 samples[64];\nuniform mat4 uProjectionMatrix;\n\nint kernelSize = 64;\nfloat radius = 0.5;\nfloat bias = 0.025;\n// 屏幕的平铺噪声纹理会根据屏幕分辨率除以噪声大小的值来决定\nconst vec2 noiseScale = vec2(960.0/4.0, 640.0/4.0);\n\nvoid main() {\n    vec3 fragPos = texture(gPositionDepth, vTexCoord).xyz;\n    vec3 normal = texture(gNormal, vTexCoord).rgb;\n    vec3 randomVec = texture(texNoise, vTexCoord * noiseScale).xyz;\n\n    // Gramm-Schmidt正交化\n    vec3 tangent = normalize(randomVec - normal * dot(randomVec, normal));\n    vec3 bitangent = cross(normal, tangent);\n    mat3 TBN = mat3(tangent, bitangent, normal);\n\n    float occlusion = 0.0;\n    for(int i = 0; i < kernelSize; ++i)\n    {\n        // 获取样本位置\n        vec3 sample1 = TBN * samples[i]; // 切线->观察空间\n        sample1 = fragPos + sample1 * radius;\n\n        vec4 offset = vec4(sample1, 1.0);\n        offset = uProjectionMatrix * offset; // 观察->裁剪空间\n        offset.xyz /= offset.w; // 透视划分\n        offset.xyz = offset.xyz * 0.5 + 0.5; // 变换到0.0 - 1.0的值域\n\n        float sampleDepth = texture(gPositionDepth, offset.xy).z;\n        float rangeCheck = smoothstep(0.0, 1.0, radius / abs(fragPos.z - sampleDepth));\n        occlusion += (sampleDepth >= sample1.z ? 1.0 : 0.0) * rangeCheck;\n\n    }\n    occlusion = 1.0 - (occlusion / float(kernelSize));\n    FragColor = occlusion;\n}\n"),this.blurPrg=this.compile(o.c,"#version 300 es\nprecision highp float;\n#define GLSLIFY 1\nin vec2 vTexCoord;\nout float FragColor;\nuniform sampler2D ssaoInput;\n\nvoid main() {\n  // simple box filter\n  vec2 texelSize = 1.0 / vec2(textureSize(ssaoInput, 0));\n  float result = 0.0;\n  for (int x = -2; x < 2; ++x)\n  {\n    for (int y = -2; y < 2; ++y)\n    {\n        vec2 offset = vec2(float(x), float(y)) * texelSize;\n        result += texture(ssaoInput, vTexCoord + offset).r;\n    }\n  }\n  FragColor = result / (4.0 * 4.0);\n\n}\n"),this.prg=this.compile(o.c,"#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\nout vec4 outColor;\n\nin vec2 vTexCoord;\n\nuniform sampler2D gPosition;\nuniform sampler2D gNormal;\nuniform sampler2D gAlbedoSpec;\nuniform sampler2D ssao;\n\nstruct Light {\n    vec3 Position;\n    vec3 Color;\n\n    float Linear;\n    float Quadratic;\n};\nuniform Light lights;\n\nvoid main() {\n    vec3 vPosition = texture(gPosition, vTexCoord).rgb;\n    vec3 Normal = texture(gNormal, vTexCoord).rgb;\n    vec3 Diffuse = texture(gAlbedoSpec, vTexCoord).rgb;\n    float AmbientOcclusion = texture(ssao, vTexCoord).r;\n\n    // then calculate lighting as usual\n    vec3 ambient = vec3(0.3 * Diffuse * AmbientOcclusion);\n    vec3 lighting  = ambient;\n    vec3 viewDir  = normalize(-vPosition);\n\n    // diffuse\n    vec3 lightDir = normalize(lights.Position - vPosition);\n    vec3 diffuse = max(dot(Normal, lightDir), 0.0) * Diffuse * lights.Color;\n    // specular\n    vec3 halfwayDir = normalize(lightDir + viewDir);\n    float spec = pow(max(dot(Normal, halfwayDir), 0.0), 16.0);\n    vec3 specular = lights.Color * spec;\n    // attenuation\n    float distance = length(lights.Position - vPosition);\n    float attenuation = 1.0 / (1.0 + lights.Linear * distance + lights.Quadratic * distance * distance);\n    diffuse *= attenuation;\n    specular *= attenuation;\n    lighting += diffuse + specular;\n\n    outColor = vec4(lighting, 1.0);\n}\n")}attrib(){var e,t=this;return n.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return t.cube=p.a.cube(5),t.bigTriangle=p.a.bigTriangle(),r.next=4,n.a.awrap(new c.a("nanosuit.mtl","./assets/models/nanosuit").parse(getAssets.nanosuitMTL));case 4:e=r.sent,(new l.a).load("./assets/models/nanosuit/nanosuit.obj",r=>{t.nanosuit=l.a.parse(r,e)});case 6:case"end":return r.stop()}}),null,null,null,Promise)}prepare(){this.mrt=new m.a(i.b.width,i.b.height,{hdr:!0},3),this.ssaoFbo=new m.a,this.blurFbo=new m.a,(()=>{for(let e=0;e<64;e++){let t=u.e.fromValues(2*Math.random()-1,2*Math.random()-1,Math.random());b[3*e]=t[0],b[3*e+1]=t[1],b[3*e+2]=t[2]}})(),(()=>{for(let e=0;e<16;e++){let t=u.e.fromValues(2*Math.random()-1,2*Math.random()-1,0);d[3*e]=t[0],d[3*e+1]=t[1],d[3*e+2]=t[2]}})(),this.noiseTexture=new h.a(d,{format:i.c.RGB},4,4),this.noiseTexture.repeat(),this.orbital.target=[0,-1,0],this.orbital.radius=8,i.c.disable(i.c.CULL_FACE)}uniform(){this.frameBufferGUI.textureList=[{texture:this.noiseTexture}]}_renderScene(){if(i.a.clear(),this.gBufferPrg.use(),this.nanosuit){let e=u.b.create();u.b.translate(e,e,[-1,-3.3,3]),u.b.scale(e,e,[.4,.4,.4]),u.b.rotate(e,e,-Math.PI/2,[1,0,0]),this.gBufferPrg.style({mMatrix:e,invertedNormals:0}),i.a.draw(this.nanosuit)}let e=u.b.create();u.b.scale(e,e,[8,4,8]),this.gBufferPrg.style({mMatrix:e,invertedNormals:1}),i.a.draw(this.cube)}render(){this.mrt.bind(),this._renderScene(),this.mrt.unbind(),this.ssaoFbo.bind(),this.ssaoPrg.use(),this.ssaoPrg.style({gPosition:this.mrt.getTexture(0),gNormal:this.mrt.getTexture(1),texNoise:this.noiseTexture,samples:b}),i.a.draw(this.bigTriangle),this.ssaoFbo.unbind(),this.blurFbo.bind(),this.blurPrg.use(),this.blurPrg.style({ssaoInput:this.ssaoFbo.getTexture()}),i.a.draw(this.bigTriangle),this.blurFbo.unbind(),i.a.clear(),this.prg.use(),this.prg.style({gPosition:this.mrt.getTexture(0),gNormal:this.mrt.getTexture(1),gAlbedoSpec:this.mrt.getTexture(2),ssao:this.blurFbo.getTexture(),"lights.Position":f,"lights.Color":g,"lights.Linear":.09,"lights.Quadratic":.032}),i.a.draw(this.bigTriangle)}}}}]);