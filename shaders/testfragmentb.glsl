uniform sampler2D bufferTex; 
uniform float time;
uniform vec2 res;
void main() {
    vec2 vUv = gl_FragCoord.xy / res;
    vec4 col = texture(bufferTex,vUv);
    float y = round((sin(vUv.x*50. + 25.)*cos(vUv.y*50.+25.) + 1.)*(0.5 + sin(time*15. + 50.)*0.01));
    gl_FragColor = vec4(col.x,y,fract(col.x*10.+y), 1.11);
}