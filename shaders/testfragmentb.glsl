uniform sampler2D bufferTex; 
uniform float time;
uniform vec2 res;
uniform vec3 test2;
varying vec2 vUv;
void main() {
    vec2 vUv = gl_FragCoord.xy / res;
    vec4 col = texture(bufferTex, vUv);
    gl_FragColor = vec4(col.r, col.r, col.r, 1.);
}