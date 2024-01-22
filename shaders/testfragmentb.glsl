uniform sampler2D bufferTex; 
uniform sampler2D colorMask; 
uniform float time;
uniform vec2 res;

uniform vec3 a1;
uniform vec3 b1;
uniform vec3 c1;
uniform vec3 d1;

uniform vec3 a2;
uniform vec3 b2;
uniform vec3 c2;
uniform vec3 d2;

varying vec2 vUv;

#define TWO_PI 6.28318530718
vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
    vec2 vUv = gl_FragCoord.xy / res;
    vec4 col = texture(bufferTex, vUv);
    float step_x = 1.0/res.x;
    float step_y = 1.0/res.y;

    vec2 offset = vec2(2.*sin(time*100.)*step_x, 2.*cos(time*100.)*step_y);
    vec4 gs = texture(bufferTex, vUv);

    vec3 gradient1 = palette(1.-gs.r, a1, b1, c1, d1);
    vec3 gradient2 = palette(1.-gs.r, a2, b2, c2, d2);
    float colMask = texture(colorMask, vUv).r;

    ///
    vec4 col2 = texture(bufferTex, vUv + vec2(2.*step_x, 2.*step_y));

    vec3 mixedColors = mix(gradient1,gradient2,colMask);
    vec3 hsb = rgb2hsb(mixedColors);
    hsb.b = fract(col2.r*4.);
    // hsb.g = step(1. - col2.r, 1.);
    vec3 rgb = hsb2rgb(hsb);


    gl_FragColor = vec4(rgb, 1.);
}