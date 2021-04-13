(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{100:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return u}));var o=n(2),r=n(43),a=n(48),c=n(1),l=n(0);function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){Object(o.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}class u extends r.a{constructor(){super()}init(){this.specularPrg=this.basicVert("#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\nout vec4 FragColor;\n\nuniform sampler2D \tuAoMap;\n\nuniform samplerCube uRadianceMap;\nuniform samplerCube uIrradianceMap;\n\nuniform vec3\t\tuBaseColor;\nuniform float\t\tuRoughness;\nuniform float\t\tuMetallic;\nuniform float\t\tuSpecular;\n\nuniform float\t\tuExposure;\nuniform float\t\tuGamma;\n\nuniform vec3\t\tuCameraPos;\nin vec3\t\tvNormal;\nin vec3\t\tvPosition;\nin vec2     vTexCoord;\n#define saturate(x) clamp(x, 0.0, 1.0)\n#define PI 3.1415926535897932384626433832795\n\n// Filmic tonemapping from\n// http://filmicgames.com/archives/75\n\nconst float A = 0.15;\nconst float B = 0.50;\nconst float C = 0.10;\nconst float D = 0.20;\nconst float E = 0.02;\nconst float F = 0.30;\n\nvec3 Uncharted2Tonemap( vec3 x )\n{\n\treturn ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;\n}\n\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile\nvec3 EnvBRDFApprox( vec3 SpecularColor, float Roughness, float NoV )\n{\n\tconst vec4 c0 = vec4( -1, -0.0275, -0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, -0.04 );\n\tvec4 r = Roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( -9.28 * NoV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn SpecularColor * AB.x + AB.y;\n}\n\n// http://the-witness.net/news/2012/02/seamless-cube-map-filtering/\nvec3 fix_cube_lookup( vec3 v, float cube_size, float lod ) {\n\tfloat M = max(max(abs(v.x), abs(v.y)), abs(v.z));\n\tfloat scale = 1.0 - exp2(lod) / cube_size;\n\tif (abs(v.x) != M) v.x *= scale;\n\tif (abs(v.y) != M) v.y *= scale;\n\tif (abs(v.z) != M) v.z *= scale;\n\treturn v;\n}\n\nvec3 correctGamma(vec3 color, float g) {\n\treturn pow(color, vec3(1.0/g));\n}\n\nvoid main() {\n\n\tfloat roughness4   = pow(uRoughness, 4.0);\n\n\tvec3 N \t\t\t\t= normalize( vNormal );\n\tvec3 V \t\t\t\t= normalize( uCameraPos - vPosition);\n\n\tvec3 I = normalize(vPosition - uCameraPos);\n\tvec3 R = reflect(I, normalize(vNormal));\n\tvec3 reflectColor = texture(uRadianceMap, R).rgb;\n\n\t// deduce the diffuse and specular color from the baseColor and how metallic the material is\n\tvec3 diffuseColor\t= uBaseColor - uBaseColor * uMetallic;\n\tvec3 specularColor\t= mix( vec3( 0.08 * uSpecular ), uBaseColor, uMetallic );\n\n\t\n\tvec3 color;\n\t\n\t// sample the pre-filtered cubemap at the corresponding mipmap level\n\tfloat numMips\t\t= 6.0;\n\tfloat mip\t\t\t= numMips - 1.0 + log2(uRoughness);\n\tvec3 lookup\t\t\t= -reflect( V, N );\n\tlookup\t\t\t\t= fix_cube_lookup( lookup, 512.0, mip );\n\tvec3 radiance\t\t= pow( texture( uRadianceMap, lookup, mip ).rgb, vec3( 2.2 ) );\n\tvec3 irradiance\t\t= pow( texture( uIrradianceMap, N ).rgb, vec3( 2.2 ) );\n\t\n\t// get the approximate reflectance\n\tfloat NoV\t\t\t= saturate( dot( N, V ) );\n\tvec3 reflectance\t= EnvBRDFApprox( specularColor, roughness4, NoV );\n\t\n\t// combine the specular IBL and the BRDF\n    vec3 diffuse  \t\t= diffuseColor * irradiance;\n    vec3 specular \t\t= radiance * reflectance;\n\tcolor\t\t\t\t= diffuse + specular;\n\t\n\n\tvec3 ao \t\t\t= texture(uAoMap, vTexCoord).rgb;\n\tcolor \t\t\t\t*= ao;\n\n\t// color += reflectColor;\n\n\t// color\t\t\t= mix(color, reflectColor, .5);\n\t// apply the tone-mapping\n\tcolor\t\t\t\t= Uncharted2Tonemap( color * uExposure );\n\t// white balance\n\tcolor\t\t\t\t= color * ( 1.0 / Uncharted2Tonemap( vec3( 20.0 ) ) );\n\t\n\t// gamma correction\n\tcolor\t\t\t\t= pow( color, vec3( 1.0 / uGamma ) );\n\n\t// output the fragment color\n    FragColor\t\t= vec4( color, 1.0 );\n\n}"),this.refractPrg=this.basicVert("#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\nout vec4 FragColor;\n\nuniform sampler2D \tuAoMap;\n\nuniform samplerCube uRadianceMap;\nuniform samplerCube uIrradianceMap;\n\nuniform vec3\t\tuBaseColor;\nuniform float\t\tuRoughness;\nuniform float\t\tuMetallic;\nuniform float\t\tuSpecular;\n\nuniform float\t\tuExposure;\nuniform float\t\tuGamma;\nuniform float \t\tuRefractionRate;\n\nuniform vec3\t\tuCameraPos;\nin vec3\t\tvNormal;\nin vec3\t\tvPosition;\nin vec2     vTexCoord;\n#define saturate(x) clamp(x, 0.0, 1.0)\n#define PI 3.1415926535897932384626433832795\n\n// Filmic tonemapping from\n// http://filmicgames.com/archives/75\n\nconst float A = 0.15;\nconst float B = 0.50;\nconst float C = 0.10;\nconst float D = 0.20;\nconst float E = 0.02;\nconst float F = 0.30;\n\nvec3 Uncharted2Tonemap( vec3 x )\n{\n\treturn ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;\n}\n\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile\nvec3 EnvBRDFApprox( vec3 SpecularColor, float Roughness, float NoV )\n{\n\tconst vec4 c0 = vec4( -1, -0.0275, -0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, -0.04 );\n\tvec4 r = Roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( -9.28 * NoV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn SpecularColor * AB.x + AB.y;\n}\n\n// http://the-witness.net/news/2012/02/seamless-cube-map-filtering/\nvec3 fix_cube_lookup( vec3 v, float cube_size, float lod ) {\n\tfloat M = max(max(abs(v.x), abs(v.y)), abs(v.z));\n\tfloat scale = 1.0 - exp2(lod) / cube_size;\n\tif (abs(v.x) != M) v.x *= scale;\n\tif (abs(v.y) != M) v.y *= scale;\n\tif (abs(v.z) != M) v.z *= scale;\n\treturn v;\n}\n\nvec3 correctGamma(vec3 color, float g) {\n\treturn pow(color, vec3(1.0/g));\n}\n\nvoid main() {\n\n\tvec3 N \t\t\t\t= normalize( vNormal );\n\tvec3 V \t\t\t\t= normalize( uCameraPos - vPosition );\n\n\tfloat ratio = 1.00 / uRefractionRate;\n    vec3 I = normalize(vPosition - uCameraPos);\n    vec3 R = refract(I, N, ratio);\n    vec3 refractColor = texture(uRadianceMap, R).rgb;\n\t\n\t// deduce the diffuse and specular color from the baseColor and how metallic the material is\n\tvec3 diffuseColor\t= uBaseColor - uBaseColor * uMetallic;\n\tvec3 specularColor\t= mix( vec3( 0.08 * uSpecular ), uBaseColor, uMetallic );\n\tfloat roughness4   = pow(uRoughness, 4.0);\n\n\t//\trefraction\n\n\t\n\tvec3 color;\n\t\n\t// sample the pre-filtered cubemap at the corresponding mipmap level\n\tfloat numMips\t\t= 6.0;\n\tfloat mip\t\t\t= numMips - 1.0 + log2(uRoughness);\n\tvec3 lookup\t\t\t= -reflect( V, N );\n\tlookup\t\t\t\t= fix_cube_lookup( lookup, 512.0, mip );\n\tvec3 radiance\t\t= pow( texture( uRadianceMap, lookup, mip ).rgb, vec3( 2.2 ) );\n\tvec3 irradiance\t\t= pow( texture( uIrradianceMap, N ).rgb, vec3( 2.2 ) );\n\t\n\t// get the approximate reflectance\n\tfloat NoV\t\t\t= saturate( dot( N, V ) );\n\tvec3 reflectance\t= EnvBRDFApprox( specularColor, roughness4, NoV );\n\t\n\t// combine the specular IBL and the BRDF\n    vec3 diffuse  \t\t= diffuseColor * irradiance;\n    vec3 specular \t\t= radiance * reflectance;\n\tcolor\t\t\t\t= diffuse + specular;\n\t\n\n\tvec3 ao \t\t\t= texture(uAoMap, vTexCoord).rgb;\n\tcolor \t\t\t\t*= ao;\n\n\tcolor += refractColor;\n\n\t// apply the tone-mapping\n\tcolor\t\t\t\t= Uncharted2Tonemap( color * uExposure );\n\t// white balance\n\tcolor\t\t\t\t= color * ( 1.0 / Uncharted2Tonemap( vec3( 20.0 ) ) );\n\t\n\t// gamma correction\n\tcolor\t\t\t\t= pow( color, vec3( 1.0 / uGamma ) );\n\n\t// output the fragment color\n    FragColor\t\t= vec4( color, 1.0 );\n\n}"),this.frenellPrg=this.basicVert("#version 300 es\nprecision highp float;\n#define GLSLIFY 1\n\nout vec4 FragColor;\n\nuniform sampler2D \tuAoMap;\n\nuniform samplerCube uRadianceMap;\nuniform samplerCube uIrradianceMap;\n\nuniform vec3\t\tuBaseColor;\nuniform float\t\tuRoughness;\nuniform float\t\tuMetallic;\nuniform float\t\tuSpecular;\n\nuniform float\t\tuExposure;\nuniform float\t\tuGamma;\n\nuniform float       fresnelBias;\nuniform float       fresnelScale;\nuniform float       fresnelPower;\nuniform vec3        etaRatio;\n\nuniform vec3\t\tuCameraPos;\nin vec3\t\tvNormal;\nin vec3\t\tvPosition;\nin vec2     vTexCoord;\n#define saturate(x) clamp(x, 0.0, 1.0)\n#define PI 3.1415926535897932384626433832795\n\n// Filmic tonemapping from\n// http://filmicgames.com/archives/75\n\nconst float A = 0.15;\nconst float B = 0.50;\nconst float C = 0.10;\nconst float D = 0.20;\nconst float E = 0.02;\nconst float F = 0.30;\n\nvec3 Uncharted2Tonemap( vec3 x )\n{\n\treturn ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;\n}\n\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile\nvec3 EnvBRDFApprox( vec3 SpecularColor, float Roughness, float NoV )\n{\n\tconst vec4 c0 = vec4( -1, -0.0275, -0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, -0.04 );\n\tvec4 r = Roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( -9.28 * NoV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn SpecularColor * AB.x + AB.y;\n}\n\n// http://the-witness.net/news/2012/02/seamless-cube-map-filtering/\nvec3 fix_cube_lookup( vec3 v, float cube_size, float lod ) {\n\tfloat M = max(max(abs(v.x), abs(v.y)), abs(v.z));\n\tfloat scale = 1.0 - exp2(lod) / cube_size;\n\tif (abs(v.x) != M) v.x *= scale;\n\tif (abs(v.y) != M) v.y *= scale;\n\tif (abs(v.z) != M) v.z *= scale;\n\treturn v;\n}\n\nvec3 correctGamma(vec3 color, float g) {\n\treturn pow(color, vec3(1.0/g));\n}\n\nvec3 caculateEnv(vec3 I, vec3 N) {\n    vec3 R = reflect(I, N);\n    \n    vec3 TRed   = refract(I, N, etaRatio.x);\n    vec3 TGreen = refract(I, N, etaRatio.y);\n    vec3 TBlue  = refract(I, N, etaRatio.z);\n\n     // Compute the reflection factor\n\n    float reflectionFactor = fresnelBias + fresnelScale * pow(1. + dot(I, N), fresnelPower);\n    vec3 reflectedColor = texture(uRadianceMap, R).rgb;\n\treflectedColor = vec3(0., 0., 0.);\n\n    // Compute the refracted environment color\n\n    vec3 refractedColor;\n\n    refractedColor.r = texture(uRadianceMap, TRed).r;\n    refractedColor.g = texture(uRadianceMap, TGreen).g;\n    refractedColor.b = texture(uRadianceMap, TBlue).b;\n\n    vec3 envColor = mix(refractedColor, reflectedColor, vec3(reflectionFactor));\n    return envColor;\n}\n\nvoid main() {\n\n\tfloat roughness4   = pow(uRoughness, 4.0);\n\n\tvec3 N \t\t\t\t= normalize( vNormal );\n\tvec3 V \t\t\t\t= normalize( uCameraPos - vPosition);\n\n    vec3 I = normalize(vPosition - uCameraPos);\n\n    vec3 envColor = caculateEnv(I, N);\n\n    // deduce the diffuse and specular color from the baseColor and how metallic the material is\n\tvec3 diffuseColor\t= uBaseColor - uBaseColor * uMetallic;\n\tvec3 specularColor\t= mix( vec3( 0.08 * uSpecular ), uBaseColor, uMetallic );\n\t\n\tvec3 color;\n\t\n\t// sample the pre-filtered cubemap at the corresponding mipmap level\n\tfloat numMips\t\t= 6.0;\n\tfloat mip\t\t\t= numMips - 1.0 + log2(uRoughness);\n\tvec3 lookup\t\t\t= -reflect( V, N );\n\tlookup\t\t\t\t= fix_cube_lookup( lookup, 512.0, mip );\n\tvec3 radiance\t\t= pow( texture( uRadianceMap, lookup, mip ).rgb, vec3( 2.2 ) );\n\tvec3 irradiance\t\t= pow( texture( uIrradianceMap, N ).rgb, vec3( 2.2 ) );\n\t\n\t// get the approximate reflectance\n\tfloat NoV\t\t\t= saturate( dot( N, V ) );\n\tvec3 reflectance\t= EnvBRDFApprox( specularColor, roughness4, NoV );\n\t\n\t// combine the specular IBL and the BRDF\n    vec3 diffuse  \t\t= diffuseColor * irradiance;\n    vec3 specular \t\t= radiance * reflectance;\n\tcolor\t\t\t\t= diffuse + specular;\n\t\n\n\tvec3 ao \t\t\t= texture(uAoMap, vTexCoord).rgb;\n\tcolor \t\t\t\t*= ao;\n\n\tcolor += envColor;\n\n\t// apply the tone-mapping\n\tcolor\t\t\t\t= Uncharted2Tonemap( color * uExposure );\n\t// white balance\n\tcolor\t\t\t\t= color * ( 1.0 / Uncharted2Tonemap( vec3( 20.0 ) ) );\n\t\n\t// gamma correction\n\tcolor\t\t\t\t= pow( color, vec3( 1.0 / uGamma ) );\n\n\t// output the fragment color\n    FragColor\t\t= vec4( color, 1.0 );\n\n}\n")}attrib(){this.skybox=new a.a(40,getAssets.rad)}prepare(){this.venus=getAssets.venus,this.orbital.radius=19,this.orbital.target=[0,5,0],window.params={metallic:1,roughness:0,specular:1,gamma:2.2,exposure:1,color:[.1,.1,.1]},this.textureIrr=getAssets.irr,this.textureRad=getAssets.rad,this.addPbrParams(window.params)}uniform(){const{metallic:t,specular:e,roughness:n,color:o,gamma:r,exposure:a}=this.params;this.customUniforms={uRadianceMap:this.textureRad,uIrradianceMap:this.textureIrr,uAoMap:getAssets.aoVenus,uGamma:r,uExposure:a,uRoughness:n,uMetallic:t,uSpecular:e,uBaseColor:o.map(t=>t/255)}}render(){l.a.clear(),this.skybox.draw();const t=c.b.create();c.b.translate(t,t,[-6,0,0]),this.specularPrg.use(),this.specularPrg.style(i({mMatrix:t},this.customUniforms)),l.a.draw(this.venus),c.b.identity(t),c.b.translate(t,t,[0,0,0]),this.refractPrg.use(),this.refractPrg.style(i({mMatrix:t,uRefractionRate:1.53},this.customUniforms)),l.a.draw(this.venus),c.b.identity(t),c.b.translate(t,t,[6,0,0]),this.frenellPrg.use(),this.frenellPrg.style(i(i({mMatrix:t},this.customUniforms),{},{etaRatio:[.65,.67,.69],fresnelPower:.8,fresnelBias:.1,fresnelScale:.9})),l.a.draw(this.venus)}}},44:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n(0);class r{constructor(t,e){this._mesh=t,this._shader=e}draw(t){this._shader.bind(),this._shader.style(t),o.a.draw(this._mesh)}get mesh(){return this._mesh}get shader(){return this._shader}}},48:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var o=n(13),r=n(15),a=n(42),c=n(44);class l extends c.a{constructor(t,e){const n=new r.a(o.g,o.f);super(a.a.skybox(t),n),this.skyMap=e}draw(t){t&&(this.skyMap=t),super.draw({uGamma:2.2,uExposure:5,tex:this.skyMap})}}}}]);