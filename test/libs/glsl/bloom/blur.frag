#version 300 es
precision highp float;
in vec2 vTexCoord;

uniform sampler2D image;

uniform bool horizontal;
uniform float texOffsetScale;
float weight[5] = float[] (0.2270270270, 0.1945945946, 0.1216216216, 0.0540540541, 0.0162162162);
out vec4 FragColor;
float lod =1.;

void main()
{             
    vec2 tex_offset = texOffsetScale * vec2(1.0/ float(textureSize(image, 0).x), 1.0/ float(textureSize(image, 0).y)); // gets size of single texel
    vec3 result = texture(image, vTexCoord, lod).rgb * weight[0];
    if(horizontal)
    {
        for(int i = 1; i < 5; ++i)
        {
        result += texture(image, vTexCoord + vec2(tex_offset.x * float(i), 0.0), lod).rgb * weight[i];
        result += texture(image, vTexCoord - vec2(tex_offset.x * float(i), 0.0), lod).rgb * weight[i];
        }
    }
    else
    {
        for(int i = 1; i < 5; ++i)
        {
            result += texture(image, vTexCoord + vec2(0.0, tex_offset.y * float(i)), lod).rgb * weight[i];
            result += texture(image, vTexCoord - vec2(0.0, tex_offset.y * float(i)), lod).rgb * weight[i];
        }
    }
    FragColor = vec4(result, 1.0);
}