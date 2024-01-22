import * as THREE from 'three';

const configs = {
    the_fool : {
        f : new THREE.Vector2(0.03451,0.06100),
        k : new THREE.Vector2(0.06070,0.06264),

        feedMask : "heart.jpg",
        colorMask : "heart.jpg",
        dA : 1.,
        dB : 0.5,
        
        a1 : new THREE.Vector3(0.5,0.5,0.5),
        b1 : new THREE.Vector3(0.5,0.5,0.5),
        c1 : new THREE.Vector3(1.0,1.0,1.0),
        d1 : new THREE.Vector3(0.00, 0.10, 0.20),

        a2 : new THREE.Vector3(0.5,0.5,0.5),
        b2 : new THREE.Vector3(0.5,0.5,0.5),
        c2 : new THREE.Vector3(1.0,1.0,1.0),
        d2 : new THREE.Vector3(0.3,0.20,0.20),
    },

}

export default configs;