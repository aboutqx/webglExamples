#version 300 es
precision highp float;
layout (location = 0) out vec4 FragColor;
layout (location = 1) out vec4 BrightColor;


in  vec3 vPosition;
in  vec3 vNormal;
in  vec2 vTexCoord;


struct Light {
    vec3 Position;
    vec3 Color;
};

uniform Light lights[5];
uniform vec3 baseColor;
uniform vec3 uCameraPos;
uniform float uAlpha;

void main()
{           
    vec3 normal = normalize(vNormal);
    // ambient
    vec3 ambient = 0.0 * baseColor;
    // lighting
    vec3 lighting = vec3(0.0);
    vec3 viewDir = normalize(uCameraPos - vPosition);
    for(int i = 0; i < 5; i++)
    {
        // diffuse
        vec3 lightDir = normalize(lights[i].Position - vPosition);
        float diff = max(dot(lightDir, normal), 0.0);
        vec3 result = lights[i].Color * diff * baseColor;      
        // attenuation (use quadratic as we have gamma correction)
        float distance = length(vPosition - lights[i].Position);
        result *= 1.0 / (distance * distance);
        lighting += result;
                
    }
    vec3 result = ambient + lighting;
    // check whether result is higher than some threshold, if so, output as bloom threshold color
    // tranform to grayscale
    float brightness = dot(result, vec3(0.2126, 0.7152, 0.0722));
    if(brightness > 1.0)
        BrightColor = vec4(result, uAlpha);
    else
        BrightColor = vec4(0.0, 0.0, 0.0, 1.0);
    FragColor = vec4(result, uAlpha);
}
