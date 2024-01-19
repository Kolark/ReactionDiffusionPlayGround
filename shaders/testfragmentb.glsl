uniform sampler2D bufferTex; 
uniform float time;
uniform vec2 res;
uniform vec3 test2;
void main() {
    vec2 vUv = gl_FragCoord.xy / res;
    vec4 col = texture(bufferTex, vUv);
    gl_FragColor = vec4(col.r,col.g,col.b , 1.);
    // gl_FragColor = vec4(test2.r,test2.g,test2.b, 1.);
}