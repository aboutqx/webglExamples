#version 300 es
precision highp float;
out float FragColor;
in vec2 vTexCoord;

uniform sampler2D gPositionDepth;
uniform sampler2D gNormal;
uniform sampler2D texNoise;

uniform vec3 samples[64];
uniform mat4 uProjectionMatrix;

int kernelSize = 64;
float radius = 0.5;
float bias = 0.025;
// 屏幕的平铺噪声纹理会根据屏幕分辨率除以噪声大小的值来决定
const vec2 noiseScale = vec2(960.0/4.0, 640.0/4.0);

void main() {
    vec3 fragPos = texture(gPositionDepth, vTexCoord).xyz;
    vec3 normal = texture(gNormal, vTexCoord).rgb;
    vec3 randomVec = texture(texNoise, vTexCoord * noiseScale).xyz;

    // Gramm-Schmidt正交化
    vec3 tangent = normalize(randomVec - normal * dot(randomVec, normal));
    vec3 bitangent = cross(normal, tangent);
    mat3 TBN = mat3(tangent, bitangent, normal);

    float occlusion = 0.0;
    for(int i = 0; i < kernelSize; ++i)
    {
        // 获取样本位置
        vec3 sample1 = TBN * samples[i]; // 切线->观察空间
        sample1 = fragPos + sample1 * radius;

        vec4 offset = vec4(sample1, 1.0);
        offset = uProjectionMatrix * offset; // 观察->裁剪空间
        offset.xyz /= offset.w; // 透视划分
        offset.xyz = offset.xyz * 0.5 + 0.5; // 变换到0.0 - 1.0的值域

        float sampleDepth = texture(gPositionDepth, offset.xy).z;
        float rangeCheck = smoothstep(0.0, 1.0, radius / abs(fragPos.z - sampleDepth));
        occlusion += (sampleDepth >= sample1.z ? 1.0 : 0.0) * rangeCheck;

    }
    occlusion = 1.0 - (occlusion / float(kernelSize));
    FragColor = occlusion;
}
