uniform sampler2D bufferTex; 
uniform vec2 res;
uniform float time;
uniform float diffusionA;
uniform float diffusionB;
uniform float f;
uniform float k;
uniform float delta;
uniform vec3 test;

float GetLaplacianR(sampler2D tex,vec2 pos, vec2 res){
        float laplacian =   0.2*texture(tex, (pos-vec2(0., 1.))/res.xy).r +
                            0.2*texture(tex, (pos-vec2(0., -1.))/res.xy).r +
            			 	0.2*texture(tex, (pos+vec2(1., 0.))/res.xy).r +
            			 	0.2*texture(tex, (pos+vec2(-1., 0.))/res.xy).r +
                            
                            0.05*texture(tex, (pos-vec2(1., 1.))/res.xy).r +
            			 	0.05*texture(tex, (pos+vec2(1., -1.))/res.xy).r +
            			 	0.05*texture(tex, (pos+vec2(-1., 1.))/res.xy).r +
                            0.05*texture(tex, (pos-vec2(-1., -1.))/res.xy).r +
                            
                            -1.*texture(tex, pos/res.xy).r;
                            
                            return laplacian;
}

float GetLaplacianG(sampler2D tex,vec2 pos, vec2 res){
        float laplacian =   0.2*texture(tex, (pos-vec2(0., 1.))/res.xy).g +
                            0.2*texture(tex, (pos-vec2(0., -1.))/res.xy).g +
            			 	0.2*texture(tex, (pos+vec2(1., 0.))/res.xy).g +
            			 	0.2*texture(tex, (pos+vec2(-1., 0.))/res.xy).g +
                            
                            0.05*texture(tex, (pos-vec2(1., 1.))/res.xy).g +
            			 	0.05*texture(tex, (pos+vec2(1., -1.))/res.xy).g +
            			 	0.05*texture(tex, (pos+vec2(-1., 1.))/res.xy).g +
                            0.05*texture(tex, (pos-vec2(-1., -1.))/res.xy).g +
                            
                            -1.*texture(tex, pos/res.xy).g;
                            
                            return laplacian;
}

void main() {
    vec2 vUv = gl_FragCoord.xy / res;
    vec4 col = texture(bufferTex,vUv);

    vec2 ab = col.rg;

    float reaction = ab.r*ab.g*ab.g;

    float laplacianA = GetLaplacianR(bufferTex, gl_FragCoord.xy, res);
    float feed = f*(1.-ab.r);
    float newA = ab.r + (diffusionA * laplacianA - reaction + feed)*delta;


    float laplacianB = GetLaplacianG(bufferTex, gl_FragCoord.xy, res);
    float kill = (f+k)*ab.g;
    float newB = ab.g + (diffusionB * laplacianB + reaction - kill)*delta;


    // gl_FragColor = vec4(newA, newB, 0.0, 1);
    // gl_FragColor = vec4(1., 0., 0.0, 1);
    gl_FragColor = vec4(ab.r + 0.01, ab.g, 1., 1);
    // gl_FragColor = vec4(ab.r, ab.g, 0.0, 1);
    // gl_FragColor = vec4(vUv.x, vUv.y,0., 1);
}