(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{145:function(e,t,n){var r={"./AdvancedLight/Bloom":[65,9,0,2,20],"./AdvancedLight/Bloom.js":[65,9,0,2,20],"./AdvancedLight/DeferredShading":[44,9,0,3,16],"./AdvancedLight/DeferredShading.js":[44,9,0,3,16],"./AdvancedLight/EnvironmentMap":[45,9,0,2,19],"./AdvancedLight/EnvironmentMap.js":[45,9,0,2,19],"./AdvancedLight/HeightMap":[46,7,23],"./AdvancedLight/HeightMap.js":[46,7,23],"./AdvancedLight/NormalMap":[47,9,0,17],"./AdvancedLight/NormalMap.js":[47,9,0,17],"./AdvancedLight/SSAO":[48,9,0,3,15],"./AdvancedLight/SSAO.js":[48,9,0,3,15],"./AdvancedLight/Shadow":[49,9,0,7],"./AdvancedLight/Shadow.js":[49,9,0,7],"./Assets":[27,9],"./Assets.js":[27,9],"./AssetsInit":[34,9],"./AssetsInit.js":[34,9],"./Light/Color":[50,9,0,14],"./Light/Color.js":[50,9,0,14],"./Light/LightCaster":[51,9,0,6],"./Light/LightCaster.js":[51,9,0,6],"./Light/Material":[52,9,0,12],"./Light/Material.js":[52,9,0,12],"./Light/Reflection":[53,9,0,18],"./Light/Reflection.js":[53,9,0,18],"./MouseMove":[29,9],"./MouseMove.js":[29,9],"./OpenGL/Gpgpu":[54,7,24],"./OpenGL/Gpgpu.js":[54,7,24],"./OpenGL/Mask":[64,9,0,13],"./OpenGL/Mask.js":[64,9,0,13],"./OpenGL/Mirror":[55,9,0,8],"./OpenGL/Mirror.js":[55,9,0,8],"./OpenGL/Mrt":[56,9,0,1,21],"./OpenGL/Mrt.js":[56,9,0,1,21],"./OpenGL/Text":[57,7,25],"./OpenGL/Text.js":[57,7,25],"./Pbr/IblDiffuse":[66,9,0,1,11],"./Pbr/IblDiffuse.js":[66,9,0,1,11],"./Pbr/Pbr":[58,9,0,10],"./Pbr/Pbr.js":[58,9,0,10],"./Pbr/PbrFlow":[59,9,0,1,9],"./Pbr/PbrFlow.js":[59,9,0,1,9],"./Pbr/PbrModel":[60,9,0,4],"./Pbr/PbrModel.js":[60,9,0,4],"./Pbr/gltf":[63,9,0,2,26],"./Pbr/gltf.js":[63,9,0,2,26],"./Pbr/iblFinal":[61,9,0,1,5],"./Pbr/iblFinal.js":[61,9,0,1,5],"./PipeLine":[5,9,0,22],"./PipeLine.js":[5,9,0,22],"./Scene":[38,9],"./Scene.js":[38,9],"./Settings":[62,9,27],"./Settings.js":[62,9,27],"./Torus":[6,9,28],"./Torus.js":[6,9,28],"./app":[39,9],"./app.js":[39,9]};function i(e){var t=r[e];return t?Promise.all(t.slice(2).map(n.e)).then(function(){var e=t[0];return n.t(e,t[1])}):Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}i.keys=function(){return Object.keys(r)},i.id=145,e.exports=i},29:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return o});var r=n(1);const i=function(e,t){const n=t||{};return e.touches?(n.x=e.touches[0].pageX,n.y=e.touches[0].pageY):(n.x=e.clientX,n.y=e.clientY),n};let s={};function o(e,t){let n=t.clientWidth,o=t.clientHeight;var a=1/Math.sqrt(n*n+o*o);i(e,s);let d=s.x-t.offsetLeft-.5*n,l=s.y-t.offsetTop-.5*o,c=r.c.create();var h=Math.sqrt(d*d+l*l),g=2*h*Math.PI*a;return 1!==h&&(d*=h=1/h,l*=h),r.c.setAxisAngle(c,[l,d,0],g),{q:c,mousePos:s}}},38:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(29);const s={reflection:"Light/Reflection",mask:"OpenGL/Mask",shadow:"AdvancedLight/Shadow",deferredshading:"AdvancedLight/DeferredShading",mrt:"OpenGL/Mrt",mirror:"OpenGL/Mirror",pbr:"Pbr/Pbr",ibldiffuse:"Pbr/IblDiffuse",iblfinal:"Pbr/iblFinal",ssao:"AdvancedLight/SSAO",normalmap:"AdvancedLight/NormalMap",pbrflow:"Pbr/PbrFlow",lightcaster:"Light/LightCaster",color:"Light/Color",material:"Light/Material",pbrmodel:"Pbr/PbrModel",envMap:"AdvancedLight/EnvironmentMap",gltf:"Pbr/gltf",bloom:"AdvancedLight/Bloom"};let o;let a=location.search.replace("?","");a?(e=>{n(145)(`./${s[e]}`).then(e=>{o=new e.default,r.b.addEventListener("mousemove",e=>{let t=Object(i.default)(e,r.b);o.rotateQ=t.q,o.mousePos=t.mousePos}),o.play()})})(a):function(){let e=document.querySelector(".list");for(let t in s){let n=document.createElement("a");n.innerHTML=t,n.setAttribute("href","?"+t),e.appendChild(n);let r=document.createElement("br");e.appendChild(r)}}()}}]);