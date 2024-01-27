import * as THREE from 'three';
import vertex from './shaders/vertex.glsl'
import fshader from './shaders/testfragmenta.glsl'
import gshader from './shaders/testfragmentb.glsl'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Sketch{
    constructor(options){
        this.time = 0;
        this.container = options.dom;
        this.scene = new THREE.Scene();
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.speed = 50;
        //Camera
        this.camera = new THREE.OrthographicCamera( this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, 1, 1000 );
        this.camera.position.z = 2;

        this.camera.fov = 2*Math.atan( (this.height/2)/600 )* (180/Math.PI);

        this.renderer = new THREE.WebGLRenderer( { 
            antialias: true,
            alpha: true
        } );

        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
        this.renderer.setClearColor(0x1, 1); 
        this.container.appendChild( this.renderer.domElement );

        this.resize()
        this.setupResize();
        this.addBuffers();
        this.render(0);
    }

    setupResize(){
        window.addEventListener('resize',this.resize.bind(this));
    }

    resize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize( this.width,this.height );
    }

    addBuffers(){

        this.bufferScene = new THREE.Scene();
        this.textureA = new THREE.WebGLRenderTarget( this.width, this.height, {minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType});
        this.textureB = new THREE.WebGLRenderTarget( this.width, this.height, {minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType});

        this.materialA = new THREE.ShaderMaterial( {
            uniforms: {
                bufferTex: { type: "t", value: this.textureA.texture },
                res : {type: 'v2',value:new THREE.Vector2(this.width,this.height)},
                time: {type:"f",value: 0},
                diffusionA: {type:"f",value: 1.},
                diffusionB: {type:"f",value: .5},
                f: {type:"f",value: 0.06100},
                k: {type:"f",value: 0.06264},
                delta: {type:"f",value: 1.},
                fun: {type:"f",value: 1.}
            }, 
            fragmentShader: fshader,
            vertexShader:vertex
        });
        
        this.materialB = new THREE.ShaderMaterial( {
            uniforms: {
                bufferTex: { type: "t", value: this.textureB.texture },
                // bufferTex: { type: "t", value: new THREE.TextureLoader().load("initState.jpg") },
                res : {type: 'v2',value:new THREE.Vector2(this.width,this.height)},
                time: {type:"f",value:0},
                a: {type:"v3",value: new THREE.Vector3(0,0,0)},
                b: {type:"v3",value: new THREE.Vector3(0,0,0)},
                c: {type:"v3",value: new THREE.Vector3(0,0,0)},
                d: {type:"v3",value: new THREE.Vector3(0,0,0)},
            }, 
            fragmentShader: gshader,
            vertexShader:vertex
        } );

        this.geometry = new THREE.PlaneGeometry(this.width, this.height, 10, 10 );
        
        this.bufferObject = new THREE.Mesh(this.geometry, this.materialA );
        this.bufferScene.add(this.bufferObject);

        this.mesh = new THREE.Mesh( this.geometry, this.materialB);
        this.scene.add( this.mesh );
    }

    SetA(r,g,b){ this.materialB.uniforms.a.value = new THREE.Vector3(r, g, b); }
    SetB(r,g,b){ this.materialB.uniforms.b.value = new THREE.Vector3(r, g, b); }
    SetC(r,g,b){ this.materialB.uniforms.c.value = new THREE.Vector3(r, g, b); }
    SetD(r,g,b){ this.materialB.uniforms.d.value = new THREE.Vector3(r, g, b); }

    reset(){
        this.time = 0;
        this.materialA.uniforms.time.value = this.time;
        this.materialB.uniforms.time.value = this.time;
    }

    render(time){
        requestAnimationFrame(this.render.bind(this));

        this.time += 0.0005;
        this.materialA.uniforms.time.value = this.time;
        this.materialB.uniforms.time.value = this.time;
        
        for(let i=0; i<this.speed; i++)
        {
        this.renderer.setRenderTarget(this.textureB);
        this.renderer.clear();
        this.renderer.render(this.bufferScene, this.camera);

        let t = this.textureA;
        this.textureA = this.textureB;
        this.textureB = t;
        this.materialA.uniforms.bufferTex.value = this.textureA.texture;
        this.materialB.uniforms.bufferTex.value = this.textureB.texture;
    }

        //Draw to screen
        this.renderer.setRenderTarget(null);
        this.renderer.render( this.scene, this.camera );
    }
}

