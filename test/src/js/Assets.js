const Assets = {
    addCustom: function(folder, mName) {
        const files = Array.prototype.slice.call(arguments, 1)
        const folderName = folder.includes('/') ? folder.split('/')[1] : (folder == 'models' ? mName.split('.')[0] : folder)
        
        this[folderName] = {}
        
        files.forEach(v => {
            const suffix = v.split('.')[1]
            const url = `./assets/${folder}/${v}`
            const name = v.split('.')[0]
            
            switch(suffix) {
                case 'gltf':
                case 'obj':
                case 'mtl':
                    this[folderName][name] = { url, type: 'text' }
                    break;
                case 'hdr':
                case 'dds':
                    this[folderName][name] = { url, type: 'binary' }
                    break;
                default:
                    this[folderName][name] = url
                    break;
            }

        })
    },

    addCubemap: function(folder, mName, suffix) {

    },
    materialMaps: {
        cubeDiffuse: './assets/cubeDiffuse.png',
        cubeSpecular: './assets/cubeSpecular.png',
        cubeEmission: './assets/cubeEmission.jpg'
    },
    ballMaps: {
        goldAlbedo: './assets/pbr/gold/albedo.png',
        goldMetallic: './assets/pbr/gold/metallic.png',
        goldAo: './assets/pbr/gold/ao.png',
        goldNormal: './assets/pbr/gold/normal.png',
        goldRoughness: './assets/pbr/gold/roughness.png',

        grassAlbedo: './assets/pbr/grass/albedo.png',
        grassMetallic: './assets/pbr/grass/metallic.png',
        grassAo: './assets/pbr/grass/ao.png',
        grassNormal: './assets/pbr/grass/normal.png',
        grassRoughness: './assets/pbr/grass/roughness.png',

        plasticAlbedo: './assets/pbr/plastic/albedo.png',
        plasticMetallic: './assets/pbr/plastic/metallic.png',
        plasticAo: './assets/pbr/plastic/ao.png',
        plasticNormal: './assets/pbr/plastic/normal.png',
        plasticRoughness: './assets/pbr/plastic/roughness.png',

        wallAlbedo: './assets/pbr/wall/albedo.png',
        wallMetallic: './assets/pbr/wall/metallic.png',
        wallAo: './assets/pbr/wall/ao.png',
        wallNormal: './assets/pbr/wall/normal.png',
        wallRoughness: './assets/pbr/wall/roughness.png',

        rusted_ironAlbedo: './assets/pbr/rusted_iron/albedo.png',
        rusted_ironMetallic: './assets/pbr/rusted_iron/metallic.png',
        rusted_ironAo: './assets/pbr/rusted_iron/ao.png',
        rusted_ironNormal: './assets/pbr/rusted_iron/normal.png',
        rusted_ironRoughness: './assets/pbr/rusted_iron/roughness.png',

        woodAlbedo: './assets/pbr/wood/albedo.png',
        woodMetallic: './assets/pbr/wood/metallic.png',
        woodAo: './assets/pbr/wood/ao.png',
        woodNormal: './assets/pbr/wood/normal.png',
        woodRoughness: './assets/pbr/wood/roughness.png'
    },
    hdrSkybox: {
        // equirectangular: { url: './assets/hdr/pisa_latlong_256.hdr', type: 'binary' }
        equirectangular: { url: './assets/hdr/newport_loft.hdr', type: 'binary' }
    },
    iblMaps: {
        outputiemPosX: { url: './assets/pbrflow/output_iem_posx.hdr', type: 'binary' },
        outputiemPosY: { url: './assets/pbrflow/output_iem_posy.hdr', type: 'binary' },
        outputiemPosZ: { url: './assets/pbrflow/output_iem_posz.hdr', type: 'binary' },
        outputiemNegX: { url: './assets/pbrflow/output_iem_negx.hdr', type: 'binary' },
        outputiemNegY: { url: './assets/pbrflow/output_iem_negy.hdr', type: 'binary' },
        outputiemNegZ: { url: './assets/pbrflow/output_iem_negz.hdr', type: 'binary' },
        radiance: { url: './assets/pbrflow/output_radiance.dds', type: 'binary' },
    },
    orb: {
        orb: { url: './assets/models/lte_orb/testObj.obj', type: 'text' }
    },
    nanosuit: {
        nanosuit: { url: './assets/models/nanosuit/nanosuit.obj', type: 'text' },
        nanosuitMTL: { url: './assets/models/nanosuit/nanosuit.mtl', type: 'text' }
    },
    brickwall: {
        brickwall: { url: './assets/brickwall.jpg' },
        brickwallNormal: { url: './assets/brickwall_normal.jpg' }
    },
    bricks2: {
        bricks2: { url: './assets/bricks2.jpg' },
        bricks2Normal: { url: './assets/bricks2_normal.jpg' },
        bricks2Disp: { url: './assets/bricks2_disp.jpg' },
    },
    toyBox: {
        toyBox: { url: './assets/toy_box.png' },
        toyBoxNormal: { url: './assets/toy_box_normal.png' },
        toyBoxDisp: { url: './assets/toy_box_disp.png' },
    },
    dimSkybox: {
        dimskyboxPosX: { url: './assets/skybox/dim_skybox_posx.hdr', type: 'binary' },
        dimskyboxPosY: { url: './assets/skybox/dim_skybox_posy.hdr', type: 'binary' },
        dimskyboxPosZ: { url: './assets/skybox/dim_skybox_posz.hdr', type: 'binary' },
        dimskyboxNegX: { url: './assets/skybox/dim_skybox_negx.hdr', type: 'binary' },
        dimskyboxNegY: { url: './assets/skybox/dim_skybox_negy.hdr', type: 'binary' },
        dimskyboxNegZ: { url: './assets/skybox/dim_skybox_negz.hdr', type: 'binary' },
    },
    skybox: {
        outputskyboxPosX: { url: './assets/skybox/output_skybox_posx.hdr', type: 'binary' },
        outputskyboxPosY: { url: './assets/skybox/output_skybox_posy.hdr', type: 'binary' },
        outputskyboxPosZ: { url: './assets/skybox/output_skybox_posz.hdr', type: 'binary' },
        outputskyboxNegX: { url: './assets/skybox/output_skybox_negx.hdr', type: 'binary' },
        outputskyboxNegY: { url: './assets/skybox/output_skybox_negy.hdr', type: 'binary' },
        outputskyboxNegZ: { url: './assets/skybox/output_skybox_negz.hdr', type: 'binary' },
    },
    skyboxLake: {
        skyboxlakePosX: { url: './assets/skybox/skybox_lake_posx.jpg' },
        skyboxlakePosY: { url: './assets/skybox/skybox_lake_posy.jpg' },
        skyboxlakePosZ: { url: './assets/skybox/skybox_lake_posz.jpg' },
        skyboxlakeNegX: { url: './assets/skybox/skybox_lake_negx.jpg' },
        skyboxlakeNegY: { url: './assets/skybox/skybox_lake_negy.jpg' },
        skyboxlakeNegZ: { url: './assets/skybox/skybox_lake_negz.jpg' },
    },
    statue: {
        statue: { url: './assets/models/statue/statue.obj', type: 'text' },
        statueAo: { url: './assets/models/statue/statueAo.png' },
        statueTexture: { url: './assets/models/statue/texture.jpg' }
    },
    gltf: {
        albedo: { "url": "assets/img/albedo.jpg", "type": "image" },
        ao: { "url": "assets/img/ao.jpg", "type": "image" },
        brdfLUT: { "url": "assets/img/brdfLUT.png", "type": "image" },
        metalGloss: { "url": "assets/img/metalGloss.jpg", "type": "image" },
        normal: { "url": "assets/img/normal.jpg", "type": "image" },
        pisa_irradiance: { "url": "assets/img/pisa_irradiance.dds", "type": "binary" },
        pisa_radiance: { "url": "assets/img/pisa_radiance.dds", "type": "binary" },
        studio10_irradiance: { "url": "assets/img/studio10_irradiance.dds", "type": "binary" },
        studio10_radiance: { "url": "assets/img/studio10_radiance.dds", "type": "binary" },
        studio11_irradiance: { "url": "assets/img/studio11_irradiance.dds", "type": "binary" },
        studio11_radiance: { "url": "assets/img/studio11_radiance.dds", "type": "binary" },
        studio12_irradiance: { "url": "assets/img/studio12_irradiance.dds", "type": "binary" },
        studio12_radiance: { "url": "assets/img/studio12_radiance.dds", "type": "binary" },
        studio1_irradiance: { "url": "assets/img/studio1_irradiance.dds", "type": "binary" },
        studio1_radiance: { "url": "assets/img/studio1_radiance.dds", "type": "binary" },
        studio2_irradiance: { "url": "assets/img/studio2_irradiance.dds", "type": "binary" },
        studio2_radiance: { "url": "assets/img/studio2_radiance.dds", "type": "binary" },
        studio3_irradiance: { "url": "assets/img/studio3_irradiance.dds", "type": "binary" },
        studio3_radiance: { "url": "assets/img/studio3_radiance.dds", "type": "binary" },
        studio4_irradiance: { "url": "assets/img/studio4_irradiance.dds", "type": "binary" },
        studio4_radiance: { "url": "assets/img/studio4_radiance.dds", "type": "binary" },
        studio5_irradiance: { "url": "assets/img/studio5_irradiance.dds", "type": "binary" },
        studio5_radiance: { "url": "assets/img/studio5_radiance.dds", "type": "binary" },
        studio6_irradiance: { "url": "assets/img/studio6_irradiance.dds", "type": "binary" },
        studio6_radiance: { "url": "assets/img/studio6_radiance.dds", "type": "binary" },
        studio7_irradiance: { "url": "assets/img/studio7_irradiance.dds", "type": "binary" },
        studio7_radiance: { "url": "assets/img/studio7_radiance.dds", "type": "binary" },
        studio8_irradiance: { "url": "assets/img/studio8_irradiance.dds", "type": "binary" },
        studio8_radiance: { "url": "assets/img/studio8_radiance.dds", "type": "binary" },
        studio9_irradiance: { "url": "assets/img/studio9_irradiance.dds", "type": "binary" },
        studio9_radiance: { "url": "assets/img/studio9_radiance.dds", "type": "binary" },
        vatican_irradiance: { "url": "assets/img/vatican_irradiance.dds", "type": "binary" },
        vatican_radiance: { "url": "assets/img/vatican_radiance.dds", "type": "binary" }
    },
    refraction: {
        irrPosX: { url: './assets/pbrflow/refraction/irr_posx.hdr', type: 'binary' },
        irrPosY: { url: './assets/pbrflow/refraction/irr_posy.hdr', type: 'binary' },
        irrPosZ: { url: './assets/pbrflow/refraction/irr_posz.hdr', type: 'binary' },
        irrNegX: { url: './assets/pbrflow/refraction/irr_negx.hdr', type: 'binary' },
        irrNegY: { url: './assets/pbrflow/refraction/irr_negy.hdr', type: 'binary' },
        irrNegZ: { url: './assets/pbrflow/refraction/irr_negz.hdr', type: 'binary' },
        radPosX: { url: './assets/pbrflow/refraction/rad_posx.hdr', type: 'binary' },
        radPosY: { url: './assets/pbrflow/refraction/rad_posy.hdr', type: 'binary' },
        radPosZ: { url: './assets/pbrflow/refraction/rad_posz.hdr', type: 'binary' },
        radNegX: { url: './assets/pbrflow/refraction/rad_negx.hdr', type: 'binary' },
        radNegY: { url: './assets/pbrflow/refraction/rad_negy.hdr', type: 'binary' },
        radNegZ: { url: './assets/pbrflow/refraction/rad_negz.hdr', type: 'binary' },
    },
    mountain: {
        irrPosX: { url: './assets/pbrflow/mountain/irr_posx.hdr', type: 'binary' },
        irrPosY: { url: './assets/pbrflow/mountain/irr_posy.hdr', type: 'binary' },
        irrPosZ: { url: './assets/pbrflow/mountain/irr_posz.hdr', type: 'binary' },
        irrNegX: { url: './assets/pbrflow/mountain/irr_negx.hdr', type: 'binary' },
        irrNegY: { url: './assets/pbrflow/mountain/irr_negy.hdr', type: 'binary' },
        irrNegZ: { url: './assets/pbrflow/mountain/irr_negz.hdr', type: 'binary' },
        radiance: { url: './assets/pbrflow/mountain/studio_radiance.dds', type: 'binary' },

    }
}

Assets.addCustom('water', 'terrain.jpg', 'dudvMap.png', 'normalMap.png', 'matchingNormalMap.png')
Assets.addCustom('grass', 'grass.png', 'grass1.png', 'grass2.png', 'grass3.png', 'grass4.png')
Assets.addCustom('animate/horse', 'horse.gltf')
Assets.addCustom('models/terrain', 'aoTerrain.jpg', 'terrain.obj')
Assets.addCustom('models/venus', 'aoVenus.jpg', 'venus.obj')
Assets.addCustom('models',  'petal.obj')

const mapAssets = {
    Reflection: { ...Assets.statue, ...Assets.venus },
    LightCaster: { ...Assets.materialMaps },
    Material: { ...Assets.nanosuit, ...Assets.petal },
    NormalMapping: { ...Assets.brickwall },
    HeightMapping: { ...Assets.bricks2 },
    ReliefMapping: { ...Assets.toyBox },
    Pbr: { ...Assets.ballMaps,  ...Assets.orb},
    Ibldiffuse: { ...Assets.hdrSkybox },
    iblfinal: { ...Assets.hdrSkybox },
    DeferredShading: { ...Assets.nanosuit },
    Ssao: { ...Assets.nanosuit },
    EnvMapping: { ...Assets.venus, ...Assets.statue, ...Assets.refraction },
    Gltf: { ...Assets.skybox, ...Assets.gltf },
    Bloom: { ...Assets.statue, ...Assets.venus },
    Water: { ...Assets.water, ...Assets.dimSkybox, },
    Grass: { ...Assets.grass, ...Assets.horse, ...Assets.gltf },
    Mountain: { ...Assets.gltf, ...Assets.terrain, ...Assets.mountain },
    FrustumCulling: { ...Assets.statue },
    Petal: { ...Assets.petal }
}
export default mapAssets
