(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{120:function(e,t){e.exports="precision mediump float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec4 color;\nuniform   mat4 mMatrix;\nuniform   mat4 vpMatrix;\n\nvarying   vec3 vNormal;\nvarying vec3 WorldPos;\n\nvoid main(void){\n\n\tvec4 pos       = mMatrix * vec4(position, 1.0);\n\tgl_Position    = vpMatrix * pos;\n\n  vNormal = mat3(mMatrix) * normal;\n  WorldPos = pos.xyz;\n\n}\n"},121:function(e,t){e.exports="\nprecision mediump float;\n#define GLSLIFY 1\n\n// material parameters\nuniform vec3 albedo;\nuniform float metallic;\nuniform float roughness;\nuniform float ao;\n\n// IBL\nuniform samplerCube irradianceMap;\n\nuniform bool lambertDiffuse;\nuniform vec3 lightPositions[4];\nuniform vec3 lightColors[4];\nuniform vec3 camPos;\n\nvarying vec3 vNormal;\nvarying vec3 WorldPos;\n\n#define saturate(x) clamp(x, 0.0, 1.0)\nconst float PI = 3.14159265359;\n// ----------------------------------------------------------------------------\nfloat DistributionGGX(vec3 N, vec3 H, float roughness)\n{\n    float a = roughness*roughness;\n    float a2 = a*a;\n    float NdotH = max(dot(N, H), 0.0);\n    float NdotH2 = NdotH*NdotH;\n\n    float nom   = a2;\n    float denom = (NdotH2 * (a2 - 1.0) + 1.0);\n    denom = PI * denom * denom;\n\n    return nom / denom;//max(denom, 0.001); // prevent divide by zero for roughness=0.0 and NdotH=1.0\n}\n// ----------------------------------------------------------------------------\nfloat GeometrySchlickGGX(float NdotV, float roughness)\n{\n    float r = (roughness + 1.0);\n    float k = (r*r) / 8.0;\n\n    float nom   = NdotV;\n    float denom = NdotV * (1.0 - k) + k;\n\n    return nom / denom;\n}\n// ----------------------------------------------------------------------------\nfloat GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)\n{\n    float NdotV = max(dot(N, V), 0.0);\n    float NdotL = max(dot(N, L), 0.0);\n    float ggx2 = GeometrySchlickGGX(NdotV, roughness);\n    float ggx1 = GeometrySchlickGGX(NdotL, roughness);\n\n    return ggx1 * ggx2;\n}\n// ----------------------------------------------------------------------------\nvec3 fresnelSchlick(float cosTheta, vec3 F0)\n{\n    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);\n}\n// deal with IBL\nvec3 fresnelSchlickRoughness(float cosTheta, vec3 F0, float roughness)\n{\n    return F0 + (max(vec3(1.0 - roughness), F0) - F0) * pow(1.0 - cosTheta, 5.0);\n}\n\n// OrenNayar diffuse\nvec3 getDiffuse( vec3 diffuseColor, float roughness4, float NoV, float NoL, float VoH )\n{\n\tfloat VoL = 2. * VoH - 1.;\n\tfloat c1 = 1. - 0.5 * roughness4 / (roughness4 + 0.33);\n\tfloat cosri = VoL - NoV * NoL;\n\tfloat c2 = 0.45 * roughness4 / (roughness4 + 0.09) * cosri * ( cosri >= 0. ? min( 1., NoL / NoV ) : NoL );\n\treturn diffuseColor / PI * ( NoL * c1 + c2 );\n}\n\nvoid main(void){\n    vec3 N = normalize(vNormal);\n    vec3 V = normalize(camPos - WorldPos);\n\n    vec3 F0 = vec3(0.04);\n    F0      = mix(F0, albedo, metallic);\n\n    // reflectance equation\n    vec3 Lo = vec3(0.0);\n    for(int i = 0; i < 4; ++i)\n    {\n        // calculate per-light radiance\n        vec3 L = normalize(lightPositions[i] - WorldPos);\n        vec3 H = normalize(V + L);\n\n        // get all the usefull dot products and clamp them between 0 and 1 just to be safe\n        float NoL\t\t\t\t= saturate( dot( N, L ) );\n        float NoV\t\t\t\t= saturate( dot( N, V ) );\n        float VoH\t\t\t\t= saturate( dot( V, H ) );\n        float NoH\t\t\t\t= saturate( dot( N, H ) );\n\n        float distance = length(lightPositions[i] - WorldPos);\n        float attenuation = 1.0 / (distance * distance);\n        vec3 radiance = lightColors[i] * attenuation;\n\n        // Cook-Torrance BRDF\n        float NDF = DistributionGGX(N, H, roughness);\n        float G   = GeometrySmith(N, V, L, roughness);\n        vec3 F    = fresnelSchlick(clamp(dot(H, V), 0.0, 1.0), F0); //反射百分比\n\n        vec3 nominator    = NDF * G * F;\n        float denominator = 4. * max(dot(N, V), 0.0) * max(dot(N, L), 0.0);\n        vec3 specular = nominator / max(denominator, 0.001); // prevent divide by zero for NdotV=0.0 or NdotL=0.0\n\n        // kS is equal to Fresnel\n        vec3 kS = F;\n        // for energy conservation, the diffuse and specular light can't\n        // be above 1.0 (unless the surface emits light); to preserve this\n        // relationship the diffuse component (kD) should equal 1.0 - kS.\n        vec3 kD = vec3(1.0) - kS;\n        // multiply kD by the inverse metalness such that only non-metals\n        // have diffuse lighting, or a linear blend if partly metal (pure metals\n        // have no diffuse light).\n        kD *= 1.0 - metallic;\n\n        // scale light by NdotL\n        float NdotL = max(dot(N, L), 0.0);\n\n        vec3 diffuse = lambertDiffuse ? albedo / PI : getDiffuse( albedo, roughness, NoV, NoL, VoH );\n        // add to outgoing radiance Lo\n        Lo += (kD * diffuse + specular) * radiance * NdotL;  // note that we already multiplied the BRDF by the Fresnel (kS) so we won't multiply by kS again\n    }\n\n    // ambient lighting (we now use IBL as the ambient term)\n    vec3 kS = fresnelSchlick(max(dot(N, V), 0.0), F0);\n    vec3 kD = 1.0 - kS;\n    kD *= 1.0 - metallic;\n    vec3 irradiance = textureCube(irradianceMap, N).rgb;\n    vec3 diffuse      = irradiance * albedo;\n    vec3 ambient = (kD * diffuse) * ao;\n\n    vec3 color = ambient + Lo;\n\n    // HDR tonemapping\n    color = color / (color + vec3(1.0));\n    // gamma correct\n    color = pow(color, vec3(1.0/2.2));\n\n    gl_FragColor = vec4(color, 1.0);\n\n}\n"},122:function(e,t){e.exports="\nprecision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D equirectangularMap;\nvarying vec3 WorldPos;\nvarying vec2 vUv;\n\nconst vec2 invAtan = vec2(0.1591, 0.3183);\nvec2 SampleSphericalMap(vec3 v)\n{\n    vec2 uv = vec2(atan(v.z, v.x), asin(v.y)); // [-PI/2,PI/2]\n    uv *= invAtan; //[-.5,.5]\n    uv += 0.5;\n    return uv;\n}\n\nvoid main()\n{\n    vec2 uv = SampleSphericalMap(normalize(WorldPos));\n    vec3 color = texture2D(equirectangularMap, uv).rgb;\n\n    gl_FragColor = vec4(color, 1.0);\n    // gl_FragColor = vec4(WorldPos,1.);\n}\n"},123:function(e,t){e.exports="#define GLSLIFY 1\nattribute vec3 position;\nuniform   mat4 mMatrix;\nuniform   mat4 vpMatrix;\n\nvarying vec3 WorldPos;\n\nvoid main()\n{\n\n  vec4 pos       = mMatrix * vec4(position, 1.0);\n\tvec4 clipPos    = vpMatrix * pos;\n\tgl_Position = clipPos.xyww; // 设置深度测试的z为1，这样只会在没有遮挡时渲染skybox，节省性能\n\n  WorldPos = pos.xyz;\n}\n"},124:function(e,t){e.exports="\nprecision mediump float;\n#define GLSLIFY 1\n\nuniform samplerCube environmentMap;\nvarying vec3 WorldPos;\n\nvoid main()\n{\n    vec3 envColor = textureCube(environmentMap, WorldPos).rgb;\n\n    // HDR tonemap and gamma correct\n    envColor = envColor / (envColor + vec3(1.0));\n    envColor = pow(envColor, vec3(1.0/2.2));\n\n    gl_FragColor = vec4(envColor, 1.0);\n}\n"},125:function(e,t){e.exports="precision mediump float;\n#define GLSLIFY 1\nvarying vec3 WorldPos;\n\nuniform samplerCube environmentMap;\n\nconst float PI = 3.14159265359;\n\nvoid main()\n{\n\t// The world vector acts as the normal of a tangent surface\n    // from the origin, aligned to WorldPos. Given this normal, calculate all\n    // incoming radiance of the environment. The result of this radiance\n    // is the radiance of light coming from -Normal direction, which is what\n    // we use in the PBR shader to sample irradiance.\n    vec3 N = normalize(WorldPos);\n\n    vec3 irradiance = vec3(0.0);\n\n    // tangent space calculation from origin point\n    vec3 up    = vec3(0.0, 1.0, 0.0);\n    vec3 right = cross(up, N);\n    up            = cross(N, right);\n\n    const float sampleDelta = 0.025;\n    float nrSamples = 0.0;\n    for(float phi = 0.0; phi < 2.0 * PI; phi += sampleDelta)\n    {\n        for(float theta = 0.0; theta < 0.5 * PI; theta += sampleDelta)\n        {\n            // spherical to cartesian (in tangent space)\n            vec3 tangentSample = vec3(sin(theta) * cos(phi),  sin(theta) * sin(phi), cos(theta));\n            // tangent space to world\n            vec3 sampleVec = tangentSample.x * right + tangentSample.y * up + tangentSample.z * N;\n\n            irradiance += textureCube(environmentMap, sampleVec).rgb * cos(theta) * sin(theta);\n            nrSamples++;\n        }\n    }\n    irradiance = PI * irradiance * (1.0 / float(nrSamples));\n\n    gl_FragColor = vec4(irradiance, 1.0);\n}\n"},32:function(e,t){e.exports="precision mediump float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 texCoord;\nuniform   mat4 mMatrix;\nuniform   mat4 vpMatrix;\n\nvarying vec3 vNormal;\nvarying vec3 WorldPos;\nvarying vec2 TexCoords;\n\nvoid main(void){\n\n\tvec4 pos       = mMatrix * vec4(position, 1.0);\n\tgl_Position    = vpMatrix * pos;\n\n  vNormal = mat3(mMatrix) * normal;\n  WorldPos = pos.xyz;\n  TexCoords = texCoord;\n}\n"},33:function(e,t){e.exports="#extension GL_OES_standard_derivatives : enable\nprecision mediump float;\n#define GLSLIFY 1\n// material map\nuniform sampler2D albedoMap;\nuniform sampler2D normalMap;\nuniform sampler2D roughnessMap;\nuniform sampler2D metallicMap;\nuniform sampler2D aoMap;\n\nuniform bool lambertDiffuse;\nuniform vec3 lightPositions[4];\nuniform vec3 lightColors[4];\nuniform vec3 camPos;\n\nvarying vec3 vNormal;\nvarying vec3 WorldPos;\nvarying vec2 TexCoords;\n\n#define saturate(x) clamp(x, 0.0, 1.0)\nconst float PI = 3.14159265359;\n// ----------------------------------------------------------------------------\nfloat DistributionGGX(vec3 N, vec3 H, float roughness)\n{\n    float a = roughness*roughness;\n    float a2 = a*a;\n    float NdotH = max(dot(N, H), 0.0);\n    float NdotH2 = NdotH*NdotH;\n\n    float nom   = a2;\n    float denom = (NdotH2 * (a2 - 1.0) + 1.0);\n    denom = PI * denom * denom;\n\n    return nom / denom;//max(denom, 0.001); // prevent divide by zero for roughness=0.0 and NdotH=1.0\n}\n// ----------------------------------------------------------------------------\nfloat GeometrySchlickGGX(float NdotV, float roughness)\n{\n    float r = (roughness + 1.0);\n    float k = (r*r) / 8.0;\n\n    float nom   = NdotV;\n    float denom = NdotV * (1.0 - k) + k;\n\n    return nom / denom;\n}\n// ----------------------------------------------------------------------------\nfloat GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)\n{\n    float NdotV = max(dot(N, V), 0.0);\n    float NdotL = max(dot(N, L), 0.0);\n    float ggx2 = GeometrySchlickGGX(NdotV, roughness);\n    float ggx1 = GeometrySchlickGGX(NdotL, roughness);\n\n    return ggx1 * ggx2;\n}\n// ----------------------------------------------------------------------------\nvec3 fresnelSchlick(float cosTheta, vec3 F0)\n{\n    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);\n}\n\n// OrenNayar diffuse\nvec3 getDiffuse( vec3 diffuseColor, float roughness4, float NoV, float NoL, float VoH )\n{\n\tfloat VoL = 2. * VoH - 1.;\n\tfloat c1 = 1. - 0.5 * roughness4 / (roughness4 + 0.33);\n\tfloat cosri = VoL - NoV * NoL;\n\tfloat c2 = 0.45 * roughness4 / (roughness4 + 0.09) * cosri * ( cosri >= 0. ? min( 1., NoL / NoV ) : NoL );\n\treturn diffuseColor / PI * ( NoL * c1 + c2 );\n}\n\nvec3 getNormalFromMap()\n{\n    vec3 tangentNormal = texture2D(normalMap, TexCoords).xyz * 2.0 - 1.0;\n\n    vec3 Q1  = dFdx(WorldPos);\n    vec3 Q2  = dFdy(WorldPos);\n    vec2 st1 = dFdx(TexCoords);\n    vec2 st2 = dFdy(TexCoords);\n\n    vec3 N   = normalize(vNormal);\n    vec3 T  = normalize(Q1*st2.t - Q2*st1.t);\n    vec3 B  = -normalize(cross(N, T));\n    mat3 TBN = mat3(T, B, N);\n\n    return normalize(TBN * tangentNormal);\n}\n\nvoid main(void){\n    vec3 albedo     = pow(texture2D(albedoMap, TexCoords).rgb, vec3(2.2));\n    vec3 N     = getNormalFromMap();\n    float metallic  = texture2D(metallicMap, TexCoords).r;\n    float roughness = texture2D(roughnessMap, TexCoords).r;\n    float ao        = texture2D(aoMap, TexCoords).r;\n    vec3 V = normalize(camPos - WorldPos);\n\n    vec3 F0 = vec3(0.04);\n    F0      = mix(F0, albedo, metallic);\n\n    // reflectance equation\n    vec3 Lo = vec3(0.0);\n    for(int i = 0; i < 4; ++i)\n    {\n        // calculate per-light radiance\n        vec3 L = normalize(lightPositions[i] - WorldPos);\n        vec3 H = normalize(V + L);\n\n        // get all the usefull dot products and clamp them between 0 and 1 just to be safe\n        float NoL\t\t\t\t= saturate( dot( N, L ) );\n        float NoV\t\t\t\t= saturate( dot( N, V ) );\n        float VoH\t\t\t\t= saturate( dot( V, H ) );\n        float NoH\t\t\t\t= saturate( dot( N, H ) );\n\n        float distance = length(lightPositions[i] - WorldPos);\n        float attenuation = 1.0 / (distance * distance);\n        vec3 radiance = lightColors[i] * attenuation;\n\n        // Cook-Torrance BRDF\n        float NDF = DistributionGGX(N, H, roughness);\n        float G   = GeometrySmith(N, V, L, roughness);\n        vec3 F    = fresnelSchlick(clamp(dot(H, V), 0.0, 1.0), F0); //反射百分比\n\n        vec3 nominator    = NDF * G * F;\n        float denominator = 4. * max(dot(N, V), 0.0) * max(dot(N, L), 0.0);\n        vec3 specular = nominator / max(denominator, 0.001); // prevent divide by zero for NdotV=0.0 or NdotL=0.0\n\n        // kS is equal to Fresnel\n        vec3 kS = F;\n        // for energy conservation, the diffuse and specular light can't\n        // be above 1.0 (unless the surface emits light); to preserve this\n        // relationship the diffuse component (kD) should equal 1.0 - kS.\n        vec3 kD = vec3(1.0) - kS;\n        // multiply kD by the inverse metalness such that only non-metals\n        // have diffuse lighting, or a linear blend if partly metal (pure metals\n        // have no diffuse light).\n        kD *= 1.0 - metallic;\n\n        // scale light by NdotL\n        float NdotL = max(dot(N, L), 0.0);\n\n        vec3 diffuse = lambertDiffuse ? albedo / PI : getDiffuse( albedo, roughness, NoV, NoL, VoH );\n        // add to outgoing radiance Lo\n        Lo += (kD * diffuse + specular) * radiance * NdotL;  // note that we already multiplied the BRDF by the Fresnel (kS) so we won't multiply by kS again\n    }\n\n    // ambient lighting (note that the next IBL tutorial will replace\n    // this ambient lighting with environment lighting).\n    vec3 ambient = vec3(0.03) * albedo * ao;\n\n    vec3 color = ambient + Lo;\n\n    // HDR tonemapping\n    color = color / (color + vec3(1.0));\n    // gamma correct\n    color = pow(color, vec3(1.0/2.2));\n\n    gl_FragColor = vec4(color, 1.0);\n\n}\n"},4:function(e,t){var n=0,o=3553;function a(e,t,n){return 9728|+e|+t<<8|+(t&&n)<<1}function r(e,t){return this._uid=n++,this.gl=e,this.id=this.gl.createTexture(),this.width=0,this.height=0,this.format=t||e.RGB,this.type=e.UNSIGNED_BYTE,this.img=null,e.bindTexture(o,this.id),this.setFilter(!0),this}r.prototype={fromImage:function(e){var t=this.gl;return this.img=e,this.width=e.width,this.height=e.height,t.bindTexture(o,this.id),t.texImage2D(o,0,this.format,this.format,this.type,e),this},fromData:function(e,t,n,a){var r=this.gl;return this.width=e,this.height=t,n=n||null,this.type=a||r.UNSIGNED_BYTE,r.bindTexture(o,this.id),window.useWebgl2?a===r.RGBA16F?r.texImage2D(r.TEXTURE_2D,0,this.type,e,t,0,this.format,r.HALF_FLOAT,n):a===r.RG32F||a===r.RGBA32F||a===r.RGB32F?r.texImage2D(r.TEXTURE_2D,0,this.type,e,t,0,this.format,r.FLOAT,n):r.texImage2D(o,0,this.format,e,t,0,this.format,this.type,n):r.texImage2D(o,0,this.format,e,t,0,this.format,this.type,n),this},bind:function(e){var t=this.gl;void 0!==e&&t.activeTexture(t.TEXTURE0+(0|e)),t.bindTexture(o,this.id)},dispose:function(){this.gl&&this.gl.deleteTexture(this.id),this.id=null,this.gl=null},setFilter:function(e,t,n){var r=this.gl,i=a(!!e,!!t,!!n);r.texParameteri(o,r.TEXTURE_MAG_FILTER,a(!!e,!1,!1)),r.texParameteri(o,r.TEXTURE_MIN_FILTER,i)},repeat:function(){this.wrap(this.gl.REPEAT)},clamp:function(){this.wrap(this.gl.CLAMP_TO_EDGE)},mirror:function(){this.wrap(this.gl.MIRRORED_REPEAT)},wrap:function(e){var t=this.gl;t.texParameteri(o,t.TEXTURE_WRAP_S,e),t.texParameteri(o,t.TEXTURE_WRAP_T,e)}},e.exports=r},42:function(e,t){e.exports="#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 texCoord;\nuniform   mat4 mMatrix;\nuniform   mat4 vpMatrix;\n\nvarying vec3 WorldPos;\nvarying vec2 vUv;\nvoid main(void){\n  vec4 pos       = mMatrix * vec4(position, 1.0);\n\tgl_Position    = vpMatrix * pos;\n\n  WorldPos = pos.xyz;\n  vUv = texCoord;\n}\n"},66:function(e,t,n){"use strict";n.r(t);var o=n(7),a=n(2),r=n(5),i=n(0),s=n(120),l=n.n(s),c=n(121),m=n.n(c),u=n(32),d=n.n(u),h=n(33),f=n.n(h),p=n(42),v=n.n(p),g=n(122),b=n.n(g),x=n(123),T=n.n(x),E=n(124),_=n.n(E),F=n(125),N=n.n(F),P=n(11),R=n(15),L=n.n(R),M=n(6),y=n(1),A=n(3),C=n(4),D=n.n(C),U=n(9),V=n(12);var B=class{constructor(e,t={}){this._size=e,this.magFilter=t.magFilter||i.c.LINEAR,this.minFilter=t.minFilter||i.c.LINEAR,this.wrapS=t.wrapS||i.c.CLAMP_TO_EDGE,this.wrapT=t.wrapT||i.c.CLAMP_TO_EDGE,this._init()}_init(){this.texture=i.c.createTexture(),this.glTexture=new V.a(this.texture,{},!0),i.c.bindTexture(i.c.TEXTURE_CUBE_MAP,this.texture),i.c.texParameteri(i.c.TEXTURE_CUBE_MAP,i.c.TEXTURE_MAG_FILTER,this.magFilter),i.c.texParameteri(i.c.TEXTURE_CUBE_MAP,i.c.TEXTURE_MIN_FILTER,this.minFilter),i.c.texParameteri(i.c.TEXTURE_CUBE_MAP,i.c.TEXTURE_WRAP_S,this.wrapS),i.c.texParameteri(i.c.TEXTURE_CUBE_MAP,i.c.TEXTURE_WRAP_T,this.wrapT);const e=[i.c.TEXTURE_CUBE_MAP_POSITIVE_X,i.c.TEXTURE_CUBE_MAP_NEGATIVE_X,i.c.TEXTURE_CUBE_MAP_POSITIVE_Y,i.c.TEXTURE_CUBE_MAP_NEGATIVE_Y,i.c.TEXTURE_CUBE_MAP_POSITIVE_Z,i.c.TEXTURE_CUBE_MAP_NEGATIVE_Z];for(let t=0;t<e.length;t++)i.c.pixelStorei(i.c.UNPACK_FLIP_Y_WEBGL,!1),i.c.texImage2D(e[t],0,i.c.RGBA,this.width,this.height,0,i.c.RGBA,i.c.FLOAT,null);this._frameBuffers=[];for(let t=0;t<e.length;t++){const n=i.c.createFramebuffer();i.c.bindFramebuffer(i.c.FRAMEBUFFER,n),i.c.framebufferTexture2D(i.c.FRAMEBUFFER,i.c.COLOR_ATTACHMENT0,e[t],this.texture,0);const o=i.c.checkFramebufferStatus(i.c.FRAMEBUFFER);o!==i.c.FRAMEBUFFER_COMPLETE&&console.log(`'gl.checkFramebufferStatus() returned '${o}`),this._frameBuffers.push(n)}i.c.bindFramebuffer(i.c.FRAMEBUFFER,null),i.c.bindRenderbuffer(i.c.RENDERBUFFER,null),i.c.bindTexture(i.c.TEXTURE_CUBE_MAP,null)}bind(e){i.c.viewport(0,0,this.width,this.height),i.c.bindFramebuffer(i.c.FRAMEBUFFER,this._frameBuffers[e])}unbind(){i.c.bindFramebuffer(i.c.FRAMEBUFFER,null),i.c.viewport(0,0,i.b.width,i.b.height)}getTexture(){return this.glTexture}get width(){return this._size}get height(){return this._size}};n.d(t,"default",function(){return I});class I extends r.default{constructor(){super(),Object(a.a)(this,"count",0)}init(){i.c.getExtension("OES_standard_derivatives"),i.c.getExtension("OES_texture_float"),i.c.getExtension("OES_texture_float_linear"),this.prg=this.compile(l.a,m.a),this.mapPrg=this.compile(d.a,f.a),this.cubePrg=this.compile(v.a,b.a),this.skyboxPrg=this.compile(T.a,_.a),this.irradiancePrg=this.compile(v.a,N.a)}attrib(){let{pos:e,index:t,normal:n,uv:o}=Object(M.Sphere)(256,256,.15),a=new A.a;a.bufferVertex(e),a.bufferIndex(t),a.bufferNormal(n),a.bufferTexCoord(o),this.sphere=a;let r=new A.a;r.bufferData(M.CubeData,["position","normal","texCoord"],[3,3,2]),this.cube=r;this.planeBuffer=new P.a(i.c,new Float32Array([3,-.5,3,1,0,-3,-.5,3,0,0,-3,-.5,-3,0,1,3,-.5,3,1,0,-3,-.5,-3,0,1,3,-.5,-3,1,1])),this.planeBuffer.attrib("position",3,i.c.FLOAT),this.planeBuffer.attrib("texCoord",2,i.c.FLOAT),this.planeVao=new L.a(i.c),this.planeVao.setup(this.cubePrg,[this.planeBuffer])}prepare(){i.c.enable(i.c.DEPTH_TEST),i.c.depthFunc(i.c.LEQUAL),i.c.pixelStorei(i.c.UNPACK_FLIP_Y_WEBGL,!0);let e=Object(U.a)(getAssets.equirectangular);console.log("hdrInfo",e),this.hdrTexture=new D.a(i.c,i.c.RGBA).fromData(e.shape[0],e.shape[1],e.data,i.c.FLOAT),this.hdrTexture.clamp();let t=i.c.createTexture();i.c.bindTexture(i.c.TEXTURE_CUBE_MAP,t);for(var n=0;n<6;n++)i.c.texImage2D(i.c.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,i.c.RGBA,512,512,0,i.c.RGBA,i.c.FLOAT,null);i.c.texParameteri(i.c.TEXTURE_CUBE_MAP,i.c.TEXTURE_WRAP_S,i.c.CLAMP_TO_EDGE),i.c.texParameteri(i.c.TEXTURE_CUBE_MAP,i.c.TEXTURE_WRAP_T,i.c.CLAMP_TO_EDGE),i.c.texParameteri(i.c.TEXTURE_CUBE_MAP,i.c.TEXTURE_MAG_FILTER,i.c.LINEAR),i.c.texParameteri(i.c.TEXTURE_CUBE_MAP,i.c.TEXTURE_MIN_FILTER,i.c.LINEAR),this.cubemapTexture=t,this.cubePrg.use(),this.hdrTexture.bind(0);let o=y.b.identity(y.b.create()),a=y.b.identity(y.b.create()),r=y.b.identity(y.b.create()),s=y.b.identity(y.b.create());y.b.perspective(o,Object(i.d)(90),1,.1,100);const l=[[y.e.fromValues(0,0,0),y.e.fromValues(1,0,0),y.e.fromValues(0,-1,0)],[y.e.fromValues(0,0,0),y.e.fromValues(-1,0,0),y.e.fromValues(0,-1,0)],[y.e.fromValues(0,0,0),y.e.fromValues(0,1,0),y.e.fromValues(0,0,1)],[y.e.fromValues(0,0,0),y.e.fromValues(0,-1,0),y.e.fromValues(0,0,-1)],[y.e.fromValues(0,0,0),y.e.fromValues(0,0,1),y.e.fromValues(0,-1,0)],[y.e.fromValues(0,0,0),y.e.fromValues(0,0,-1),y.e.fromValues(0,-1,0)]];i.c.viewport(0,0,512,512);let c=i.c.createFramebuffer();i.c.bindFramebuffer(i.c.FRAMEBUFFER,c);for(let e=0;e<6;e++)y.b.lookAt(r,l[e][0],l[e][1],l[e][2]),y.b.multiply(s,o,r),this.cubePrg.style({equirectangularMap:0,vpMatrix:s,mMatrix:a}),i.c.framebufferTexture2D(i.c.FRAMEBUFFER,i.c.COLOR_ATTACHMENT0,i.c.TEXTURE_CUBE_MAP_POSITIVE_X+e,this.cubemapTexture,0),i.c.clear(i.c.COLOR_BUFFER_BIT|i.c.DEPTH_BUFFER_BIT),this.cube.bind(this.cubePrg,["position","texCoord"]),this.cube.draw();i.c.bindFramebuffer(i.c.FRAMEBUFFER,null),this.irradiancePrg.use();let m=new B(32);i.c.activeTexture(i.c.TEXTURE0),i.c.bindTexture(i.c.TEXTURE_CUBE_MAP,this.cubemapTexture);for(let e=0;e<6;e++)y.b.lookAt(r,l[e][0],l[e][1],l[e][2]),y.b.multiply(s,o,r),this.irradiancePrg.style({environmentMap:0,vpMatrix:s,mMatrix:a}),m.bind(e),i.c.clear(i.c.COLOR_BUFFER_BIT|i.c.DEPTH_BUFFER_BIT),this.cube.bind(this.irradiancePrg,["position","texCoord"]),this.cube.draw();m.unbind(),this.irradianceFbo=m}uniform(){let e=y.b.identity(y.b.create()),t=y.b.identity(y.b.create());this.tmpMatrix=y.b.identity(y.b.create());let n=[],o=[];y.e.transformQuat(n,[0,0,1],this.rotateQ),y.e.transformQuat(o,[0,1,0],this.rotateQ),this.eyeDirection=n,y.b.lookAt(e,n,[0,0,0],o),y.b.perspective(t,Object(i.d)(60),i.b.clientWidth/i.b.clientHeight,.1,100),y.b.multiply(this.tmpMatrix,t,e)}_setGUI(){this.addGUIParams({roughness:.2,metallic:6/7,lambertDiffuse:!0,orenNayarDiffuse:!1,map:"none"});let e=this.gui.addFolder("material param");e.add(this.params,"roughness",.05,1).step(.01),e.add(this.params,"metallic",0,6/7).step(.01),e.open();let t=this.gui.addFolder("diffuse model");t.add(this.params,"lambertDiffuse").listen().onChange(()=>{this.setChecked("lambertDiffuse")}),t.add(this.params,"orenNayarDiffuse").listen().onChange(()=>{this.setChecked("orenNayarDiffuse")}),t.open();let n=this.gui.addFolder("material map");n.add(this.params,"map",["none","plastic","wall","gold","grass","rusted_iron","wood"]).listen().onChange(()=>{this.setTexture()}),n.open()}setChecked(e){this.params.lambertDiffuse=!1,this.params.orenNayarDiffuse=!1,this.params[e]=!0}setTexture(){let e=this.params.map;"none"!==e&&(this.texture0=new D.a(i.c,i.c.RGBA).fromImage(getAssets[e+"Albedo"]),this.texture1=new D.a(i.c,i.c.RGBA).fromImage(getAssets[e+"Roughness"]),this.texture2=new D.a(i.c,i.c.RGBA).fromImage(getAssets[e+"Metallic"]),this.texture3=new D.a(i.c,i.c.RGBA).fromImage(getAssets[e+"Ao"]),this.texture4=new D.a(i.c,i.c.RGBA).fromImage(getAssets[e+"Normal"]))}render(){i.c.viewport(0,0,i.b.width,i.b.height),i.c.clearColor(.3,.3,.3,1),i.c.clearDepth(1),i.c.clear(i.c.COLOR_BUFFER_BIT|i.c.DEPTH_BUFFER_BIT);let e=y.b.identity(y.b.create()),t={vpMatrix:this.tmpMatrix,mMatrix:e,lightPositions:[-10,10,10,10,10,10,-10,-10,10,10,-10,10],lightColors:new Array(12).fill(300),camPos:this.eyeDirection,lambertDiffuse:this.params.lambertDiffuse,irradianceMap:0};"none"===this.params.map?(this.prg.use(),this.irradianceFbo.getTexture().bind(0),this.prg.style(Object(o.a)({},t,{albedo:[.5,0,0],roughness:this.params.roughness,metallic:this.params.metallic,ao:1})),this.sphere.bind(this.prg,["position","normal"])):(this.mapPrg.use(),this.texture0.bind(0),this.texture1.bind(1),this.texture2.bind(2),this.texture3.bind(3),this.texture4.bind(4),this.mapPrg.style(Object(o.a)({},t,{albedoMap:0,roughnessMap:1,metallicMap:2,aoMap:3,normalMap:4})),this.sphere.bind(this.mapPrg)),this.sphere.draw(),this.skyboxPrg.use(),i.c.activeTexture(i.c.TEXTURE0),i.c.bindTexture(i.c.TEXTURE_CUBE_MAP,this.cubemapTexture),this.skyboxPrg.style({environmentMap:0,vpMatrix:this.tmpMatrix,mMatrix:e}),this.cube.bind(this.skyboxPrg,["position"]),this.cube.draw()}}}}]);