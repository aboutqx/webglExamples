#version 300 es
precision highp float;

// material parameters
uniform vec3 albedo;
uniform float metallic;
uniform float roughness;
uniform float ao;

uniform bool lambertDiffuse;
struct Light {
    int Type;
    vec3 Position;
    vec3 Direction;
    vec3 Color;

    float Linear;
    float Quadratic;
};
const int NR_LIGHTS = 4;

uniform Light lights[NR_LIGHTS];
uniform vec3 uCameraPos;
uniform float uGamma;
uniform float uExposure;

in vec3 vNormal;
in vec3 vPosition;
out vec4 FragColor;
#define saturate(x) clamp(x, 0.0, 1.0)
const float PI = 3.14159265359;
// ----------------------------------------------------------------------------
float DistributionGGX(vec3 N, vec3 H, float roughness)
{
    float a = roughness*roughness;
    float a2 = a*a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH*NdotH;

    float nom   = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return nom / max(denom, 0.001); // prevent divide by zero for roughness=0.0 and NdotH=1.0
}

float AnisotropicDis(float x, float y, vec3 N, vec3 wh)
{
    float ex = x;
    float ey = y;
    if(ex > 1000.) ex = 1000.;
    if(ey > 1000.) ey = 1000.;
    float cosTheta = max(dot(N, wh), 0.0);
    float d = 1. - cosTheta * cosTheta;
    if(d == 0.) return 0.;
    float e = (ex * wh.x * wh.x + ey * wh.y * wh.y) / d;
    float INV_TWOPI = .5 * PI;
    return sqrt((ex + 2.) * (ey + 2.)) * INV_TWOPI * pow(cosTheta, e);
}

// ----------------------------------------------------------------------------
float GeometrySchlickGGX(float NdotV, float roughness)
{
    float r = (roughness + 1.0);
    float k = (r*r) / 8.0;

    float nom   = NdotV;
    float denom = NdotV * (1.0 - k) + k;

    return nom / denom;
}
// ----------------------------------------------------------------------------
float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness)
{
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx2 = GeometrySchlickGGX(NdotV, roughness);
    float ggx1 = GeometrySchlickGGX(NdotL, roughness);

    return ggx1 * ggx2;
}
// ----------------------------------------------------------------------------
vec3 fresnelSchlick(float cosTheta, vec3 F0)
{
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

// OrenNayar diffuse
vec3 getDiffuse( vec3 diffuseColor, float roughness4, float NoV, float NoL, float VoH )
{
	float VoL = 2. * VoH - 1.;
	float c1 = 1. - 0.5 * roughness4 / (roughness4 + 0.33);
	float cosri = VoL - NoV * NoL;
	float c2 = 0.45 * roughness4 / (roughness4 + 0.09) * cosri * ( cosri >= 0. ? min( 1., NoL / NoV ) : NoL );
	return diffuseColor / PI * ( NoL * c1 + c2 );
}

// Filmic tonemapping from
// http://filmicgames.com/archives/75

const float A = 0.15;
const float B = 0.50;
const float C = 0.10;
const float D = 0.20;
const float E = 0.02;
const float F = 0.30;


vec3 Uncharted2Tonemap( vec3 x )
{
	return ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F))-E/F;
}

void main(void){
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uCameraPos - vPosition);

    vec3 F0 = vec3(0.04);
    F0      = mix(F0, albedo, metallic);

    // reflectance equation
    vec3 Lo = vec3(0.0);
    for(int i = 0; i < NR_LIGHTS; ++i)
    {
        // calculate per-light radiance
        vec3 L;
        if(lights[i].Type == 0) { // point light
            L = normalize(lights[i].Position - vPosition);
        } else {
            L = normalize(-lights[i].Direction);
        }
        
        vec3 H = normalize(V + L);

        // get all the usefull dot products and clamp them between 0 and 1 just to be safe
        float NoL				= saturate( dot( N, L ) );
        float NoV				= saturate( dot( N, V ) );
        float VoH				= saturate( dot( V, H ) );
        float NoH				= saturate( dot( N, H ) );

        vec3 radiance;
        if(lights[i].Type == 0) {
            float distance = length(lights[i].Position - vPosition);
            float attenuation = 1.0 / (1.0 + lights[i].Linear * distance + lights[i].Quadratic * distance * distance);
            radiance = lights[i].Color * attenuation;
        } else {
            radiance = lights[i].Color;
        }

        

        // Cook-Torrance BRDF
        float NDF = DistributionGGX(N, H, roughness);
        // float NDF = AnisotropicDis(20. ,1000., N, H);
        float G   = GeometrySmith(N, V, L, roughness);
        vec3 F    = fresnelSchlick(clamp(dot(H, V), 0.0, 1.0), F0); //反射百分比

        vec3 nominator    = NDF * G * F;
        float denominator = 4. * max(dot(N, V), 0.0) * max(dot(N, L), 0.0);
        vec3 specular = nominator / max(denominator, 0.001); // prevent divide by zero for NdotV=0.0 or NdotL=0.0

        // kS is equal to Fresnel
        vec3 kS = F;
        // for energy conservation, the diffuse and specular light can't
        // be above 1.0 (unless the surface emits light); to preserve this
        // relationship the diffuse component (kD) should equal 1.0 - kS.
        vec3 kD = vec3(1.0) - kS;
        // multiply kD by the inverse metalness such that only non-metals
        // have diffuse lighting, or a linear blend if partly metal (pure metals
        // have no diffuse light).
        kD *= 1.0 - metallic;

        // scale light by NdotL
        float NdotL = max(dot(N, L), 0.0);

        vec3 diffuse = lambertDiffuse ? albedo / PI : getDiffuse( albedo, roughness, NoV, NoL, VoH );
        // add to outgoing radiance Lo
        Lo += (kD * diffuse + specular) * radiance * NdotL;  // note that we already multiplied the BRDF by the Fresnel (kS) so we won't multiply by kS again
    }

    // ambient lighting (note that the next IBL tutorial will replace
    // this ambient lighting with environment lighting).
    vec3 ambient = vec3(0.03) * albedo * ao;

    vec3 color = ambient + Lo;

    // HDR tonemapping
	// apply the tone-mapping
	color				= Uncharted2Tonemap( color * uExposure );
	// white balance
	color				= color * ( 1.0 / Uncharted2Tonemap( vec3( 20.0 ) ) );

    // gamma correct
    color = pow(color, vec3(1.0/uGamma));

    FragColor = vec4(color, 1.0);

}
