#version 300 es
precision highp float;

out vec4 outColor;

in vec3 vPosition;
in vec2 vTexCoord;
in vec3 vNormal;
uniform sampler2D diffuseMap;
uniform sampler2D specularMap;
// uniform sampler2D normalMap;
// uniform sampler2D heightMap;
// uniform sampler2D bumpMap;

#ifdef HAS_EMISSIVEMAP
uniform sampler2D uEmissiveMap;
uniform vec3 uEmissiveFactor;
#endif

#ifdef HAS_AMBIENTMAP
uniform sampler2D uAmbientMap;
#endif

struct Light {
    vec3 Position;
    vec3 Color;

    float Linear;
    float Quadratic;
};
const int NR_LIGHTS = 32;
uniform Light lights[NR_LIGHTS];
uniform vec3 uCameraPos;

void main() {

    vec3 Diffuse = texture(diffuseMap, vTexCoord).rgb;
    float Specular = texture(specularMap, vTexCoord).r;

    // then calculate lighting as usual
    vec3 lighting  = Diffuse * .1; // hard-coded ambient component
    vec3 viewDir  = normalize(uCameraPos - vPosition);
    for(int i = 0; i < NR_LIGHTS; ++i)
    {
        // diffuse
        vec3 lightDir = normalize(lights[i].Position - vPosition);
        vec3 diffuse = max(dot(vNormal, lightDir), 0.0) * Diffuse * lights[i].Color;
        // specular
        vec3 halfwayDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(vNormal, halfwayDir), 0.0), 16.0);
        vec3 specular = lights[i].Color * spec * Specular;
        // attenuation
        float distance = length(lights[i].Position - vPosition);
        float attenuation = 1.0 / (1.0 + lights[i].Linear * distance + lights[i].Quadratic * distance * distance);
        diffuse *= attenuation;
        specular *= attenuation;
        lighting += diffuse + specular;
    }

    #ifdef HAS_AMBIENTMAP
        vec3 ambient = texture(uAmbientMap, vTexCoord).r* Diffuse;
        lighting += ambient;
    #endif

    #ifdef HAS_EMISSIVEMAP
        vec3 emissive = texture(uEmissiveMap, vTexCoord).rgb * uEmissiveFactor;
        lighting += emissive;
    #endif

    outColor = vec4(lighting,1.0);
}
