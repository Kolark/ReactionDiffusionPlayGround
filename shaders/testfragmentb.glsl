uniform sampler2D bufferTex; 
uniform float time;
uniform vec2 res;
uniform vec3 test2;
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

void main() {
    vec2 vUv = gl_FragCoord.xy / res;
    vec4 col = texture(bufferTex, vUv);
    float step_x = 1.0/res.x;
    float step_y = 1.0/res.y;

    vec4 col2 = texture(bufferTex, vUv + vec2(2.*sin(time*100.)*step_x, 2.*cos(time*100.)*step_y));

    vec3 hsb = rgb2hsb(col.gbr);
    hsb.g = col2.r;
    hsb.b = step(1. - col2.r, 1.);
    vec3 rgb = hsb2rgb(hsb);
    gl_FragColor = vec4(rgb.r,rgb.g,rgb.b, 1.);
}