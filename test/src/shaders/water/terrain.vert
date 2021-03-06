#version 300 es
// basic.vert

#define SHADER_NAME BASIC_VERTEX

precision highp float;
in vec3 position;
in vec2 texCoord;
in vec3 normal;

uniform mat4 mMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float waterRadius;
uniform float terrainHeight;

out vec2 vTexCoord;
out vec3 vNormal;

float rand(float _x) {
    return fract(sin(_x)*1e4);
}
float rand (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main(void) {
    vec3 Position;
    if(distance(position, vec3(0,0,0)) > (waterRadius + rand(position.xz) * 10.))
        Position = vec3(position.x, rand(position.xz) * terrainHeight, position.z);
    else 
        Position = vec3(position.x, -.1, position.z);
    gl_Position = uProjectionMatrix * uViewMatrix * mMatrix * vec4(Position, 1.0);
    vTexCoord = texCoord;
    vNormal = normal;
}