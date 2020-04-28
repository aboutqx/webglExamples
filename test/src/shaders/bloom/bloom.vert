#version 300 es
layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec2 texCoord;


out vec3 vPosition;
out vec3 Normal;
out vec2 vTexCoord;


uniform mat4 uProjectionMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uModelMatrix;

void main()
{
    vPosition = vec3(uModelMatrix * vec4(position, 1.0));   
    vTexCoord = texCoord;
        
    mat3 normalMatrix = transpose(inverse(mat3(uModelMatrix)));
    Normal = normalize(normalMatrix * normal);
    
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);
}