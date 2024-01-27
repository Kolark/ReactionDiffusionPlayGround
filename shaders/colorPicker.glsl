uniform vec3 a;
uniform vec3 b;
uniform vec3 c;
uniform vec3 d;
varying vec2 vUv;

//Taken from https://iquilezles.org/articles/palettes/
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
    vec3 col = palette(vUv.x,vec3(a.r, 0.0, 0.0), vec3(b.r, 0.0, 0.0),vec3(c.r, 0.0, 0.0),vec3(d.r, 0.0, 0.0));

    if(vUv.y> (1./4.)) col = palette(vUv.x ,vec3(0.0, a.g, 0.0), vec3(0.0, b.g, 0.0),vec3(0.0, c.g, 0.0),vec3(0.0, d.g, 0.0));
    if(vUv.y> (2./4.)) col = palette(vUv.x ,vec3(0.0, 0.0, a.b), vec3(0.0, 0.0, b.b),vec3(0.0, 0.0, c.b),vec3(0.0, 0.0, d.b));
    if(vUv.y> (3./4.)) col = palette(vUv.x ,a,b,c,d);
    gl_FragColor = vec4(col, 1.);
}