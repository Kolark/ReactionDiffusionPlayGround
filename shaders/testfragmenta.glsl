uniform sampler2D bufferTex; 
uniform vec2 res;
uniform float time;
uniform float diffusionA;
uniform float diffusionB;
uniform float f;
uniform float k;
uniform float delta;
varying vec2 vUv;


vec2 GetLaplacian(sampler2D tex){
    vec2 texel = 1./res;
    float step_x = 1.0/res.x;
    float step_y = 1.0/res.y;
        vec2 laplacian =    0.2 * texture(tex, vUv + vec2(-step_x, 0.0)).rg +
                            0.2 * texture(tex, vUv + vec2(step_x, 0.0)).rg +
            			 	0.2 * texture(tex, vUv + vec2(0.0, step_y)).rg +
            			 	0.2 * texture(tex, vUv + vec2(0.0, -step_y)).rg +
                            
                            0.05 * texture(tex, vUv + vec2(step_x, step_y)).rg +
            			 	0.05 * texture(tex, vUv + vec2(-step_x, step_y)).rg +
            			 	0.05 * texture(tex, vUv + vec2(step_x, -step_y)).rg +
                            0.05 * texture(tex, vUv + vec2(-step_x, -step_y)).rg +
                            
                            -1.*texture(tex, vUv).rg;
                            
                            return laplacian;
}

void main() {
    if(time < 0.0006) {
        float t = step(distance(vUv,vec2(0.5)),0.2);
        gl_FragColor = vec4(t, 0.25f, 0.0, 1);
        return;
    }


    vec4 col = texture(bufferTex,vUv);

    vec2 ab = col.rg;
    float c = col.b;
    float reaction = ab.r * ab.g * ab.g;

    vec2 laplacian = GetLaplacian(bufferTex);
    float feed = f * (1.0 - ab.r);
    float newA = ab.r + ((diffusionA * laplacian.r) - reaction + feed)*delta;
    //float newA = ab.r + diffusionA * laplacian.r;

    float kill = (f+k)*ab.g;
    float newB = ab.g + ((diffusionB * laplacian.g) + reaction - kill)*delta;
    //float newB = ab.g + diffusionB * laplacian.g;
   
    gl_FragColor = vec4(newA, newB, c, 1.);
    // gl_FragColor = vec4(vUv.x, vUv.y, 0.1, 1.);
}