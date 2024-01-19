uniform sampler2D bufferTex; 
uniform vec2 res;
uniform float time;
    
void main() {
    vec2 vUv = gl_FragCoord.xy / res;
    float y = round((sin(vUv.x*55. + sin(time*10.)*5.)*cos(vUv.y*55. + cos(time*10.)) + 1.)*(0.5 + sin(time*15.)*0.01));
    gl_FragColor = vec4(y,y,0.5, 1.11);
}