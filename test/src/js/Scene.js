import {
  canvas
} from 'libs/GlTools'
import MouseMove from './MouseMove'

const importLists = {
  reflection: 'Light/Reflection',
  mask: 'OpenGL/Mask',
  shadow: 'advance_light/Shadow',
  mrt: 'OpenGL/Mrt',
  mirror: 'OpenGL/Mirror',
  pbr: 'Pbr/Pbr',
  ibldiffuse: 'Pbr/IblDiffuse',
  iblfinal: 'Pbr/iblFinal',
  ssao: 'advanced_light/SSAO',
  normalmap: 'advanced_light/NormalMap',
  pbrflow: 'Pbr/PbrFlow',
  lightcaster: 'Light/LightCaster',
  color: 'Light/Color',
  material: 'Light/Material',
  pbrmodel: 'Pbr/PbrModel'
}

let obj
const dynamicImport = (name) => {
  import(`./${importLists[name]}`).then((foo) => {

    obj = new foo.default()

    canvas.addEventListener('mousemove', (e) => {
      obj.rotateQ = MouseMove(e, canvas)
    })
    obj.play()
  })
}

let name = location.search.replace('?', '').toLocaleLowerCase()
dynamicImport(name)



