import * as THREE from 'three';
import vertex from './shaders/vertex.glsl'
import colorPickerShader from './shaders/colorPicker.glsl'
export default class ColorPicker{
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

        this.materialA = new THREE.ShaderMaterial( {
            uniforms: {
                a: {type:"v3",value: new THREE.Vector3(0,0,0)},
                b: {type:"v3",value: new THREE.Vector3(0,0,0)},
                c: {type:"v3",value: new THREE.Vector3(0,0,0)},
                d: {type:"v3",value: new THREE.Vector3(0,0,0)},
            }, 
            fragmentShader: colorPickerShader,
            vertexShader:vertex
        });
        
        this.geometry = new THREE.PlaneGeometry(this.width, this.height, 10, 10 );
        this.mesh = new THREE.Mesh( this.geometry, this.materialA);
        this.scene.add( this.mesh );
    }

    SetA(r,g,b){ this.materialA.uniforms.a.value = new THREE.Vector3(r, g, b); }
    SetB(r,g,b){ this.materialA.uniforms.b.value = new THREE.Vector3(r, g, b); }
    SetC(r,g,b){ this.materialA.uniforms.c.value = new THREE.Vector3(r, g, b); }
    SetD(r,g,b){ this.materialA.uniforms.d.value = new THREE.Vector3(r, g, b); }

    render(time){
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render( this.scene, this.camera );
    }
}

