const fshader = `
		uniform vec2 res;
		uniform sampler2D bufferTexture; 
		uniform sampler2D myTex;
		uniform float time;
    
		void main() {
			//vec2 uv = gl_FragCoord.xy / res;
		
			vec2 vUv = gl_FragCoord.xy / res;
        vec2 texel = 6. / res;
        
        vec3 uv = texture2D(bufferTexture, vUv).xyz;
        
        float gt = mod(time*vUv.x*vUv.y, 1.0*6.1415)*4.0;
        
        vec2 d1 = vec2(uv.x*vec2(texel.x*cos(gt*uv.z), texel.y*sin(gt*uv.y)));
        vec2 d2 = vec2(uv.y*vec2(texel.x*cos(gt*uv.x), texel.y*sin(gt*uv.y)));
        vec2 d3 = vec2(uv.z*vec2(texel.x*cos(gt*uv.y), texel.y*sin(gt*uv.y)));
        
        float bright = (uv.x+uv.y+uv.z)/1.9+1.1;
        
        float r = texture2D(bufferTexture, vUv+d1*bright).x;
        float g = texture2D(bufferTexture, vUv+d2*bright).y;
        float b = texture2D(bufferTexture, vUv+d3*bright).z;
        
        vec3 uvMix = mix(uv, vec3(r,g,b), 1.29);
        
        vec3 orig = texture2D(myTex, vUv).xyz;
        
        gl_FragColor = vec4(mix(uvMix, orig, 0.017), 1.11);
      
      
		 	//gl_FragColor = src / 0.5;// * sum;
		 }

`
    var scene;
    var camera;

    var renderer;
    var bufferScene;
    var textureA;
    var textureB;
    var bufferMaterial;
    var plane;
    var bufferObject;
    var finalMaterial;
    var quad;
    var image;
    var imageTexture;
        
    function sceneSetup(){
        scene = new THREE.Scene();
        var width = window.innerWidth;
        var height = window.innerHeight;
        camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
        camera.position.z = 2;

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );      
        document.body.appendChild( renderer.domElement );
    }

    function bufferTextureSetup()
    {
        //Create buffer scene
        bufferScene = new THREE.Scene();
        //Create 2 buffer textures
        textureA = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter});
        textureB = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter} );
        //Pass textureA to shader
      
      THREE.ImageUtils.crossOrigin = '';
      
        bufferMaterial = new THREE.ShaderMaterial( {
        uniforms: {
        bufferTexture: { type: "t", value: textureA.texture },
        "myTex" :    { type: "t", value: new THREE.TextureLoader().load("https://i.imgur.com/jlFgGpe.jpg") }, // ***THIS IS THE TEXTURE WE BLUR/MUNGE

        res : {type: 'v2',value:new THREE.Vector2(window.innerWidth,window.innerHeight)},
        time: {type:"f",value:Math.random()*Math.PI*2+Math.PI}
        }, 
        fragmentShader: fshader
        } );

        plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
        bufferObject = new THREE.Mesh( plane, bufferMaterial );
        bufferScene.add(bufferObject);

        //Draw textureB to screen 
        finalMaterial =  new THREE.MeshBasicMaterial({map: textureB});
        quad = new THREE.Mesh( plane, finalMaterial );
        scene.add(quad);
    }

		//Initialize the Threejs scene
		sceneSetup();
		bufferTextureSetup();


		function render() {

		  requestAnimationFrame( render );

      //Draw to textureB
      // renderer.render(bufferScene,camera,textureB,true);
      renderer.setRenderTarget(textureB);
      renderer.clear();
      renderer.render(bufferScene,camera);
    // var textureA = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    // var textureB = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    // renderer.setRenderTarget(textureA);
    // renderer.render(scene1, camera1);
    // renderer.setRenderTarget(textureB);
    // renderer.render(scene2, camera2);
      
		  //Swap textureA and B
		  var t = textureA;
		  textureA = textureB;
		  textureB = t;
		  quad.material.map = textureB.texture;
		  bufferMaterial.uniforms.bufferTexture.value = textureA.texture;

		  //Update time
		  bufferMaterial.uniforms.time.value += 0.01;

		  //Finally, draw to the screen
      renderer.setRenderTarget(null);

		  renderer.render( scene, camera );
		}

		render();


