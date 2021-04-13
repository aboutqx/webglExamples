(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{68:function(e,t,n){"use strict";t.a="#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n// material map\nuniform sampler2D albedoMap;\nuniform sampler2D normalMap;\nuniform sampler2D roughnessMap;\nuniform sampler2D metallicMap;\nuniform sampler2D aoMap;\n\nuniform bool lambertDiffuse;\nuniform vec3 lightPositions[4];\nuniform vec3 lightColors[4];\nuniform vec3 uCameraPos;\n\nin vec3 vNormal;\nin vec3 vPosition;\nin vec2 vTexCoord;\nout vec4 FragColor;\n#define saturate(x) clamp(x, 0.0, 1.0)\nconst float PI = 3.14159265359;\n// ----------------------------------------------------------------------------\nfloat DistributionGGX(vec3 N, vec3 H, float roughness)\n{\n    float a = roughness*roughness;\n    float a2 = a*a;\n    float NdotH = max(dot(N, H), 0.0);\n    float NdotH2 = NdotH*NdotH;\n\n    float nom   = a2;\n    float denom = (NdotH2 * (a2 - 1.0) + 1.0);\n    denom = PI * denom * denom;\n\n    return nom / denom;//max(denom, 0.001); // prevent divide by zero for roughness=0.0 and NdotH=1.0\n}\n// ----------------------------------------------------------------------------\nfloat GeometrySchlickGGX(float NdotV, float roughness)\n{\n    float r = (roughness + 1.0);\n    float k = (r*r) / 8.0;\n\n    float nom   = NdotV;\n    float denom = NdotV * (1.0 - k) + k;\n\n    return nom / denom;\n}\n// ----------------------------------------------------------------------------\nfloat GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)\n{\n    float NdotV = max(dot(N, V), 0.0);\n    float NdotL = max(dot(N, L), 0.0);\n    float ggx2 = GeometrySchlickGGX(NdotV, roughness);\n    float ggx1 = GeometrySchlickGGX(NdotL, roughness);\n\n    return ggx1 * ggx2;\n}\n// ----------------------------------------------------------------------------\nvec3 fresnelSchlick(float cosTheta, vec3 F0)\n{\n    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);\n}\n\n// OrenNayar diffuse\nvec3 getDiffuse( vec3 diffuseColor, float roughness4, float NoV, float NoL, float VoH )\n{\n\tfloat VoL = 2. * VoH - 1.;\n\tfloat c1 = 1. - 0.5 * roughness4 / (roughness4 + 0.33);\n\tfloat cosri = VoL - NoV * NoL;\n\tfloat c2 = 0.45 * roughness4 / (roughness4 + 0.09) * cosri * ( cosri >= 0. ? min( 1., NoL / NoV ) : NoL );\n\treturn diffuseColor / PI * ( NoL * c1 + c2 );\n}\n\nvec3 getNormalFromMap()\n{\n    vec3 tangentNormal = texture(normalMap, vTexCoord).xyz * 2.0 - 1.0;\n\n    vec3 Q1  = dFdx(vPosition);\n    vec3 Q2  = dFdy(vPosition);\n    vec2 st1 = dFdx(vTexCoord);\n    vec2 st2 = dFdy(vTexCoord);\n\n    vec3 N   = normalize(vNormal);\n    vec3 T  = normalize(Q1*st2.t - Q2*st1.t);\n    vec3 B  = -normalize(cross(N, T));\n    mat3 TBN = mat3(T, B, N);\n\n    return normalize(TBN * tangentNormal);\n}\n\nvoid main(void){\n    vec3 albedo     = pow(texture(albedoMap, vTexCoord).rgb, vec3(2.2));\n    vec3 N     = getNormalFromMap();\n    float metallic  = texture(metallicMap, vTexCoord).r;\n    float roughness = texture(roughnessMap, vTexCoord).r;\n    float ao        = texture(aoMap, vTexCoord).r;\n    vec3 V = normalize(uCameraPos - vPosition);\n\n    vec3 F0 = vec3(0.04);\n    F0      = mix(F0, albedo, metallic);\n\n    // reflectance equation\n    vec3 Lo = vec3(0.0);\n    for(int i = 0; i < 4; ++i)\n    {\n        // calculate per-light radiance\n        vec3 L = normalize(lightPositions[i] - vPosition);\n        vec3 H = normalize(V + L);\n\n        // get all the usefull dot products and clamp them between 0 and 1 just to be safe\n        float NoL\t\t\t\t= saturate( dot( N, L ) );\n        float NoV\t\t\t\t= saturate( dot( N, V ) );\n        float VoH\t\t\t\t= saturate( dot( V, H ) );\n        float NoH\t\t\t\t= saturate( dot( N, H ) );\n\n        float distance = length(lightPositions[i] - vPosition);\n        float attenuation = 1.0 / (distance * distance);\n        vec3 radiance = lightColors[i] * attenuation;\n\n        // Cook-Torrance BRDF\n        float NDF = DistributionGGX(N, H, roughness);\n        float G   = GeometrySmith(N, V, L, roughness);\n        vec3 F    = fresnelSchlick(clamp(dot(H, V), 0.0, 1.0), F0); //反射百分比\n\n        vec3 nominator    = NDF * G * F;\n        float denominator = 4. * max(dot(N, V), 0.0) * max(dot(N, L), 0.0);\n        vec3 specular = nominator / max(denominator, 0.001); // prevent divide by zero for NdotV=0.0 or NdotL=0.0\n\n        // kS is equal to Fresnel\n        vec3 kS = F;\n        // for energy conservation, the diffuse and specular light can't\n        // be above 1.0 (unless the surface emits light); to preserve this\n        // relationship the diffuse component (kD) should equal 1.0 - kS.\n        vec3 kD = vec3(1.0) - kS;\n        // multiply kD by the inverse metalness such that only non-metals\n        // have diffuse lighting, or a linear blend if partly metal (pure metals\n        // have no diffuse light).\n        kD *= 1.0 - metallic;\n\n        // scale light by NdotL\n        float NdotL = max(dot(N, L), 0.0);\n\n        vec3 diffuse = lambertDiffuse ? albedo / PI : getDiffuse( albedo, roughness, NoV, NoL, VoH );\n        // add to outgoing radiance Lo\n        Lo += (kD * diffuse + specular) * radiance * NdotL;  // note that we already multiplied the BRDF by the Fresnel (kS) so we won't multiply by kS again\n    }\n\n    // ambient lighting (note that the next IBL tutorial will replace\n    // this ambient lighting with environment lighting).\n    vec3 ambient = vec3(0.03) * albedo * ao;\n\n    vec3 color = ambient + Lo;\n\n    // HDR tonemapping\n    color = color / (color + vec3(1.0));\n    // gamma correct\n    color = pow(color, vec3(1.0/2.2));\n\n    FragColor = vec4(color, 1.);\n\n}\n"},69:function(e,t,n){"use strict";t.a="#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D equirectangularMap;\nin vec3 WorldPos;\nout vec4 outColor;\n\nconst vec2 invAtan = vec2(0.1591, 0.3183);\nvec2 SampleSphericalMap(vec3 v)\n{\n    vec2 uv = vec2(atan(v.z, v.x), asin(v.y)); // [-PI/2,PI/2]\n    uv *= invAtan; //[-.5,.5]\n    uv += 0.5;\n    return uv;\n}\n\nvoid main()\n{\n    vec2 uv = SampleSphericalMap(normalize(WorldPos));\n    vec3 color = textureLod(equirectangularMap, uv, 0.).rgb;\n\n    outColor = vec4(color, 1.0);\n    // gl_FragColor = vec4(WorldPos,1.);\n}\n"},97:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var o=n(2),a=n(43),r=n(0),i=n(68),s=n(69),l=n(1),c=n(42),u=n(10);var m=class{constructor(e,t={}){this._size=e,this.magFilter=t.magFilter||r.c.LINEAR,this.minFilter=t.minFilter||r.c.LINEAR,this.wrapS=t.wrapS||r.c.CLAMP_TO_EDGE,this.wrapT=t.wrapT||r.c.CLAMP_TO_EDGE,this._init()}_init(){this.texture=r.c.createTexture(),this.glTexture=new u.a(this.texture,{},!0),r.c.bindTexture(r.c.TEXTURE_CUBE_MAP,this.texture),r.c.texParameteri(r.c.TEXTURE_CUBE_MAP,r.c.TEXTURE_MAG_FILTER,this.magFilter),r.c.texParameteri(r.c.TEXTURE_CUBE_MAP,r.c.TEXTURE_MIN_FILTER,this.minFilter),r.c.texParameteri(r.c.TEXTURE_CUBE_MAP,r.c.TEXTURE_WRAP_S,this.wrapS),r.c.texParameteri(r.c.TEXTURE_CUBE_MAP,r.c.TEXTURE_WRAP_T,this.wrapT);const e=[r.c.TEXTURE_CUBE_MAP_POSITIVE_X,r.c.TEXTURE_CUBE_MAP_NEGATIVE_X,r.c.TEXTURE_CUBE_MAP_POSITIVE_Y,r.c.TEXTURE_CUBE_MAP_NEGATIVE_Y,r.c.TEXTURE_CUBE_MAP_POSITIVE_Z,r.c.TEXTURE_CUBE_MAP_NEGATIVE_Z];for(let t=0;t<e.length;t++)r.c.pixelStorei(r.c.UNPACK_FLIP_Y_WEBGL,!1),r.c.texImage2D(e[t],0,r.c.RGBA,this.width,this.height,0,r.c.RGBA,r.c.FLOAT,null);this._frameBuffers=[];for(let t=0;t<e.length;t++){const n=r.c.createFramebuffer();r.c.bindFramebuffer(r.c.FRAMEBUFFER,n),r.c.framebufferTexture2D(r.c.FRAMEBUFFER,r.c.COLOR_ATTACHMENT0,e[t],this.texture,0);const o=r.c.checkFramebufferStatus(r.c.FRAMEBUFFER);o!==r.c.FRAMEBUFFER_COMPLETE&&console.log("'gl.checkFramebufferStatus() returned '"+o),this._frameBuffers.push(n)}r.c.bindFramebuffer(r.c.FRAMEBUFFER,null),r.c.bindRenderbuffer(r.c.RENDERBUFFER,null),r.c.bindTexture(r.c.TEXTURE_CUBE_MAP,null)}bind(e){r.c.viewport(0,0,this.width,this.height),r.c.bindFramebuffer(r.c.FRAMEBUFFER,this._frameBuffers[e])}unbind(){r.c.bindFramebuffer(r.c.FRAMEBUFFER,null),r.c.viewport(0,0,r.b.width,r.b.height)}getTexture(){return this.glTexture}get width(){return this._size}get height(){return this._size}};function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}class d extends a.a{constructor(){super()}init(){r.a.applyHdrExtension(),this.prg=this.basicVert("\nprecision highp float;\n#define GLSLIFY 1\n\n// material parameters\nuniform vec3 albedo;\nuniform float metallic;\nuniform float roughness;\nuniform float ao;\n\n// IBL\nuniform samplerCube irradianceMap;\n\nuniform bool lambertDiffuse;\nuniform vec3 lightPositions[4];\nuniform vec3 lightColors[4];\nuniform vec3 camPos;\n\nvarying vec3 vNormal;\nvarying vec3 WorldPos;\n\n#define saturate(x) clamp(x, 0.0, 1.0)\nconst float PI = 3.14159265359;\n// ----------------------------------------------------------------------------\nfloat DistributionGGX(vec3 N, vec3 H, float roughness)\n{\n    float a = roughness*roughness;\n    float a2 = a*a;\n    float NdotH = max(dot(N, H), 0.0);\n    float NdotH2 = NdotH*NdotH;\n\n    float nom   = a2;\n    float denom = (NdotH2 * (a2 - 1.0) + 1.0);\n    denom = PI * denom * denom;\n\n    return nom / denom;//max(denom, 0.001); // prevent divide by zero for roughness=0.0 and NdotH=1.0\n}\n// ----------------------------------------------------------------------------\nfloat GeometrySchlickGGX(float NdotV, float roughness)\n{\n    float r = (roughness + 1.0);\n    float k = (r*r) / 8.0;\n\n    float nom   = NdotV;\n    float denom = NdotV * (1.0 - k) + k;\n\n    return nom / denom;\n}\n// ----------------------------------------------------------------------------\nfloat GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)\n{\n    float NdotV = max(dot(N, V), 0.0);\n    float NdotL = max(dot(N, L), 0.0);\n    float ggx2 = GeometrySchlickGGX(NdotV, roughness);\n    float ggx1 = GeometrySchlickGGX(NdotL, roughness);\n\n    return ggx1 * ggx2;\n}\n// ----------------------------------------------------------------------------\nvec3 fresnelSchlick(float cosTheta, vec3 F0)\n{\n    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);\n}\n// deal with IBL\nvec3 fresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness)\n{\n    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(1.0 - cosTheta, 5.0);\n}\n\n// OrenNayar diffuse\nvec3 getDiffuse( vec3 diffuseColor, float roughness4, float NoV, float NoL, float VoH )\n{\n\tfloat VoL = 2. * VoH - 1.;\n\tfloat c1 = 1. - 0.5 * roughness4 / (roughness4 + 0.33);\n\tfloat cosri = VoL - NoV * NoL;\n\tfloat c2 = 0.45 * roughness4 / (roughness4 + 0.09) * cosri * ( cosri >= 0. ? min( 1., NoL / NoV ) : NoL );\n\treturn diffuseColor / PI * ( NoL * c1 + c2 );\n}\n\nvoid main(void){\n    vec3 N = normalize(vNormal);\n    vec3 V = normalize(camPos - WorldPos);\n\n    vec3 F0 = vec3(0.04);\n    F0      = mix(F0, albedo, metallic);\n\n    // reflectance equation\n    vec3 Lo = vec3(0.0);\n    for(int i = 0; i < 4; ++i)\n    {\n        // calculate per-light radiance\n        vec3 L = normalize(lightPositions[i] - WorldPos);\n        vec3 H = normalize(V + L);\n\n        // get all the usefull dot products and clamp them between 0 and 1 just to be safe\n        float NoL\t\t\t\t= saturate( dot( N, L ) );\n        float NoV\t\t\t\t= saturate( dot( N, V ) );\n        float VoH\t\t\t\t= saturate( dot( V, H ) );\n        float NoH\t\t\t\t= saturate( dot( N, H ) );\n\n        float distance = length(lightPositions[i] - WorldPos);\n        float attenuation = 1.0 / (distance * distance);\n        vec3 radiance = lightColors[i] * attenuation;\n\n        // Cook-Torrance BRDF\n        float NDF = DistributionGGX(N, H, roughness);\n        float G   = GeometrySmith(N, V, L, roughness);\n        vec3 F    = fresnelSchlick(clamp(dot(H, V), 0.0, 1.0), F0); //反射百分比\n\n        vec3 nominator    = NDF * G * F;\n        float denominator = 4. * max(dot(N, V), 0.0) * max(dot(N, L), 0.0);\n        vec3 specular = nominator / max(denominator, 0.001); // prevent divide by zero for NdotV=0.0 or NdotL=0.0\n\n        // kS is equal to Fresnel\n        vec3 kS = F;\n        // for energy conservation, the diffuse and specular light can't\n        // be above 1.0 (unless the surface emits light); to preserve this\n        // relationship the diffuse component (kD) should equal 1.0 - kS.\n        vec3 kD = vec3(1.0) - kS;\n        // multiply kD by the inverse metalness such that only non-metals\n        // have diffuse lighting, or a linear blend if partly metal (pure metals\n        // have no diffuse light).\n        kD *= 1.0 - metallic;\n\n        // scale light by NdotL\n        float NdotL = max(dot(N, L), 0.0);\n\n        vec3 diffuse = lambertDiffuse ? albedo / PI : getDiffuse( albedo, roughness, NoV, NoL, VoH );\n        // add to outgoing radiance Lo\n        Lo += (kD * diffuse + specular) * radiance * NdotL;  // note that we already multiplied the BRDF by the Fresnel (kS) so we won't multiply by kS again\n    }\n\n    // ambient lighting (we now use IBL as the ambient term)\n    vec3 kS = fresnelSchlick(max(dot(N, V), 0.0), F0);\n    vec3 kD = 1.0 - kS;\n    kD *= 1.0 - metallic;\n    vec3 irradiance = textureCube(irradianceMap, N).rgb;\n    vec3 diffuse      = irradiance * albedo;\n    vec3 ambient = (kD * diffuse) * ao;\n\n    vec3 color = ambient + Lo;\n\n    // HDR tonemapping\n    color = color / (color + vec3(1.0));\n    // gamma correct\n    color = pow(color, vec3(1.0/2.2));\n\n    gl_FragColor = vec4(color, 1.0);\n\n}\n"),this.mapPrg=this.basicVert(i.a),this.cubePrg=this.basicVert(s.a),this.irradiancePrg=this.basicVert("precision highp float;\n#define GLSLIFY 1\nvarying vec3 WorldPos;\n\nuniform samplerCube environmentMap;\n\nconst float PI = 3.14159265359;\n\nvoid main()\n{\n\t// The world vector acts as the normal of a tangent surface\n    // from the origin, aligned to WorldPos. Given this normal, calculate all\n    // incoming radiance of the environment. The result of this radiance\n    // is the radiance of light coming from -Normal direction, which is what\n    // we use in the PBR shader to sample irradiance.\n    vec3 N = normalize(WorldPos);\n\n    vec3 irradiance = vec3(0.0);\n\n    // tangent space calculation from origin point\n    vec3 up    = vec3(0.0, 1.0, 0.0);\n    vec3 right = cross(up, N);\n    up            = cross(N, right);\n\n    const float sampleDelta = 0.025;\n    float nrSamples = 0.0;\n    for(float phi = 0.0; phi < 2.0 * PI; phi += sampleDelta)\n    {\n        for(float theta = 0.0; theta < 0.5 * PI; theta += sampleDelta)\n        {\n            // spherical to cartesian (in tangent space)\n            vec3 tangentSample = vec3(sin(theta) * cos(phi),  sin(theta) * sin(phi), cos(theta));\n            // tangent space to world\n            vec3 sampleVec = tangentSample.x * right + tangentSample.y * up + tangentSample.z * N;\n\n            irradiance += textureCube(environmentMap, sampleVec).rgb * cos(theta) * sin(theta);\n            nrSamples++;\n        }\n    }\n    irradiance = PI * irradiance * (1.0 / float(nrSamples));\n\n    gl_FragColor = vec4(irradiance, 1.0);\n}\n")}attrib(){this.sphere=c.a.sphere(2,100),this.cube=c.a.cube(2)}prepare(){this.orbital.radius=32,r.c.pixelStorei(r.c.UNPACK_FLIP_Y_WEBGL,!0),this.hdrTexture=getAssets.equirectangular;let e=r.c.createTexture();r.c.bindTexture(r.c.TEXTURE_CUBE_MAP,e);for(var t=0;t<6;t++)r.c.texImage2D(r.c.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,r.c.RGBA16F,512,512,0,r.c.RGBA,r.c.FLOAT,null);r.c.texParameteri(r.c.TEXTURE_CUBE_MAP,r.c.TEXTURE_WRAP_S,r.c.CLAMP_TO_EDGE),r.c.texParameteri(r.c.TEXTURE_CUBE_MAP,r.c.TEXTURE_WRAP_T,r.c.CLAMP_TO_EDGE),r.c.texParameteri(r.c.TEXTURE_CUBE_MAP,r.c.TEXTURE_MAG_FILTER,r.c.LINEAR),r.c.texParameteri(r.c.TEXTURE_CUBE_MAP,r.c.TEXTURE_MIN_FILTER,r.c.LINEAR),this.cubemapTexture=e,this.cubePrg.use(),this.hdrTexture.bind(0);let n=l.b.create(),o=l.b.create(),a=l.b.create(),i=l.b.create();l.b.perspective(n,Object(r.d)(90),1,.1,100);const s=[[l.e.fromValues(0,0,0),l.e.fromValues(1,0,0),l.e.fromValues(0,-1,0)],[l.e.fromValues(0,0,0),l.e.fromValues(-1,0,0),l.e.fromValues(0,-1,0)],[l.e.fromValues(0,0,0),l.e.fromValues(0,1,0),l.e.fromValues(0,0,1)],[l.e.fromValues(0,0,0),l.e.fromValues(0,-1,0),l.e.fromValues(0,0,-1)],[l.e.fromValues(0,0,0),l.e.fromValues(0,0,1),l.e.fromValues(0,-1,0)],[l.e.fromValues(0,0,0),l.e.fromValues(0,0,-1),l.e.fromValues(0,-1,0)]];r.c.viewport(0,0,512,512);let c=r.c.createFramebuffer();r.c.bindFramebuffer(r.c.FRAMEBUFFER,c);for(let e=0;e<6;e++)l.b.lookAt(a,s[e][0],s[e][1],s[e][2]),l.b.multiply(i,n,a),this.cubePrg.style({equirectangularMap:0,vpMatrix:i,mMatrix:o}),r.c.framebufferTexture2D(r.c.FRAMEBUFFER,r.c.COLOR_ATTACHMENT0,r.c.TEXTURE_CUBE_MAP_POSITIVE_X+e,this.cubemapTexture,0),r.c.clear(r.c.COLOR_BUFFER_BIT|r.c.DEPTH_BUFFER_BIT),r.a.draw(this.cube);r.c.bindFramebuffer(r.c.FRAMEBUFFER,null),this.irradiancePrg.use();let u=new m(32);r.c.activeTexture(r.c.TEXTURE0),r.c.bindTexture(r.c.TEXTURE_CUBE_MAP,this.cubemapTexture);for(let e=0;e<6;e++)l.b.lookAt(a,s[e][0],s[e][1],s[e][2]),l.b.multiply(i,n,a),this.irradiancePrg.style({environmentMap:0,vpMatrix:i,mMatrix:o}),u.bind(e),r.c.clear(r.c.COLOR_BUFFER_BIT|r.c.DEPTH_BUFFER_BIT),r.a.draw(this.cube);u.unbind(),this.irradianceFbo=u}uniform(){}_setGUI(){this.addGUIParams({roughness:.2,metallic:6/7,map:"none"});let e=this.gui.addFolder("material param");e.add(this.params,"roughness",.05,1).step(.01),e.add(this.params,"metallic",0,6/7).step(.01),e.open(),this.addRadio("lambertDiffuse",["lambertDiffuse","orenNayarDiffuse"],"diffuse model");let t=this.gui.addFolder("material map");t.add(this.params,"map",["none","plastic","wall","gold","grass","rusted_iron","wood"]).listen().onChange(()=>{this.setTexture()}),t.open()}setTexture(){let e=this.params.map;"none"!==e&&(this.texture0=getAssets[e+"Albedo"],this.texture1=getAssets[e+"Roughness"],this.texture2=getAssets[e+"Metallic"],this.texture3=getAssets[e+"Ao"],this.texture4=getAssets[e+"Normal"])}render(){r.c.viewport(0,0,r.b.width,r.b.height),r.c.clearColor(.3,.3,.3,1),r.c.clearDepth(1),r.c.clear(r.c.COLOR_BUFFER_BIT|r.c.DEPTH_BUFFER_BIT);let e={mMatrix:l.b.create(),lightPositions:[-10,10,10,10,10,10,-10,-10,10,10,-10,10],lightColors:new Array(12).fill(300),lambertDiffuse:this.params.lambertDiffuse,irradianceMap:0};"none"===this.params.map?(this.prg.use(),this.irradianceFbo.getTexture().bind(0),this.prg.style(h(h({},e),{},{albedo:[.5,0,0],roughness:this.params.roughness,metallic:this.params.metallic,ao:1}))):(this.mapPrg.use(),this.mapPrg.style(h(h({},e),{},{albedoMap:this.texture0,roughnessMap:this.texture1,metallicMap:this.texture2,aoMap:this.texture3,normalMap:this.texture4}))),r.a.draw(this.sphere)}}}}]);