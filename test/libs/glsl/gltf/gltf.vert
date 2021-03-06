#version 300 es
// gltf.vert
#define SHADER_NAME gltf_vert

precision highp float;
in vec3 position;

#ifdef HAS_UV
in vec2 texCoord;
#endif

#ifdef HAS_NORMALS
in vec3 normal;
in vec3 aTangent;
#endif

#ifdef HAS_COLOR
in vec3 color;
#endif

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;
uniform mat3 uModelViewMatrixInverse;


out vec3 vPosition;
out vec2 vTexCoord;
out vec3 vColor;

#ifdef HAS_NORMALS
out vec3 vNormal;
out vec3 vTangent;
#endif


void main(void) {
	vec4 tPosition = uModelMatrix * vec4(position, 1.0);
	vPosition     = tPosition.xyz / tPosition.w;

	#ifdef HAS_UV
	vTexCoord = vec2(texCoord.x, texCoord.y);
	#else
	vTexCoord = vec2(0.,0.);
	#endif

	#ifdef HAS_NORMALS
	vNormal       = normalize(vec3(uModelMatrix * vec4(normal, 0.0)));
	vTangent = normalize(vec3(uModelMatrix * vec4(aTangent, 0.0)));
	#endif

	#ifdef HAS_COLOR
	vColor = color;
	#endif
	gl_Position   = uProjectionMatrix * uViewMatrix * tPosition;
}
