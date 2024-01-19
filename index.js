import * as THREE from 'three';
import fragment from './shaders/fragment.glsl'
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


        //Camera
        this.camera = new THREE.PerspectiveCamera( 70, this.width/this.height, 0.01, 2000 );
        this.camera.position.z = 5;

        this.camera.fov = 2*Math.atan( (this.height/2)/600 )* (180/Math.PI);

        this.renderer = new THREE.WebGLRenderer( { 
            antialias: true,
            alpha: true
        } );

        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
        this.renderer.setClearColor(0x1, 1); 
        this.container.appendChild( this.renderer.domElement );

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );

        this.resize()
        this.setupResize();

        this.addBuffers();
        this.addObjects();
        this.render();
    }

    setupResize(){
        window.addEventListener('resize',this.resize.bind(this));
    }

    resize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize( this.width,this.height );
    }

    addObjects(){
        
        // this.geometry = new THREE.SphereGeometry(5,10,10);
        // this.material = new THREE.ShaderMaterial({
        //     uniforms:{
        //         time: {value:0},
        //     },
        //     side: THREE.DoubleSide,
        //     fragmentShader: fragment,
        //     vertexShader: vertex,
        //     // wireframe: true
        // });
        // this.mesh = new THREE.Mesh( this.geometry, this.material);
        // this.scene.add( this.mesh );
    }

    addBuffers(){

        this.bufferScene = new THREE.Scene();
        this.textureA = new THREE.WebGLRenderTarget( this.width, this.height, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter});
        this.textureB = new THREE.WebGLRenderTarget( this.width, this.height, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter});

        this.materialA = new THREE.ShaderMaterial( {
            uniforms: {
                bufferTex: { type: "t", value: this.textureA.texture },
                res : {type: 'v2',value:new THREE.Vector2(this.width,this.height)},
                time: {type:"f",value: 0}
                }, 
            fragmentShader: fshader
        });

        this.materialB = new THREE.ShaderMaterial( {
            uniforms: {
                bufferTex: { type: "t", value: this.textureB.texture },
                res : {type: 'v2',value:new THREE.Vector2(this.width,this.height)},
                time: {type:"f",value:0}
            }, 
            fragmentShader: gshader
        } );

        this.geometry = new THREE.PlaneGeometry(5, 5, 10, 10 );
        
        this.bufferObject = new THREE.Mesh(this.geometry, this.materialA );
        this.bufferScene.add(this.bufferObject);

        this.mesh = new THREE.Mesh( this.geometry, this.materialB);
        this.scene.add( this.mesh );
    }

    render(){

        requestAnimationFrame(this.render.bind(this));
        // this.renderer.render(this.scene, this.camera);

        this.renderer.setRenderTarget(this.textureB);
        this.renderer.clear();
        this.renderer.render(this.bufferScene, this.camera);

        this.time += 0.0005;
        this.materialA.uniforms.time.value = this.time;
        this.materialB.uniforms.time.value = this.time;

        this.renderer.setRenderTarget(null);
        this.renderer.render( this.scene, this.camera );
    }
}

new Sketch({
    dom: document.getElementById('container')
});





