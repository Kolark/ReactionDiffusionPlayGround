uniform float time;
varying vec2 vUv;
void main()	{

    gl_FragColor = vec4(vUv.x,vUv.y*sin(time),cos(time)*sin(time*0.2) + 0.5,1.);

}