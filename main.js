// CLOUD STRIFE FROM FINAL FANTASY VII ASSET: https://models.spriters-resource.com/pc_computer/finalfantasy7/asset/321485/
// I used https://imagetostl.com/convert/file/dae/to/obj to convert the .dae file to a .obj file.


import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 50;
    camera.position.y = 20;

    const scene = new THREE.Scene();

    const boxWidth = 20;
    const boxHeight = 20;
    const boxDepth = 20;
    const sphereRadius = 5;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 10, 10);
    const cylGeometry = new THREE.CylinderGeometry(sphereRadius, sphereRadius, boxHeight, 10, 10);


    // Add a light
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // SKYBOX
    // yes i did just use the cubemap image files from the tutorial site, they just fit together so perfectly...
    {
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            'skybox/pos-x.jpg',
            'skybox/neg-x.jpg',
            'skybox/pos-y.jpg',
            'skybox/neg-y.jpg',
            'skybox/pos-z.jpg',
            'skybox/neg-z.jpg',
        ]);
        scene.background = texture;
    }


    function makeCube(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        cube.position.z = -30;

        return cube;
    }

    // Texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load('wall.jpg');
    texture.colorSpace = THREE.SRGBColorSpace;


    function makeTexturedCube(geometry, texture, x) {
        const material = new THREE.MeshPhongMaterial({ map: texture });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        cube.position.z = -30;

        return cube;
    }

    function makeSphere(geometry, color, x, y, z) {
        const material = new THREE.MeshPhongMaterial({ color });

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        sphere.position.x = x;
        sphere.position.y = y;
        sphere.position.z = z;

        return sphere;
    }

    function makeCylinder(geometry, color, x, y, z) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cyl = new THREE.Mesh(geometry, material);
        scene.add(cyl);

        cyl.position.x = x;
        cyl.position.y = y;
        cyl.position.z = z;

        return cyl;
    }

    // SHAPES
    // 20 primitive shapes - i was going to move them in different positions
    // but the way they rotate with each other is mesmerizing, so i kept it as is :)
    // (i know how lazy this is, i'm sorry... finals week is ruthless this quarter)
    const cubes = [
        makeTexturedCube(geometry, texture, 0),
        makeCube(geometry, 0x8844aa, -40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
        makeCube(geometry, 0xaa8844, 40),
    ];

    // other shapes that aren't cubes
    makeSphere(sphereGeometry, 0x00ff00, 0, 0, 10);
    makeCylinder(cylGeometry, 0xeeeeee, 0, -10, 0);


    // OBJ LOADING
    {
        const mtlLoader = new MTLLoader();
        mtlLoader.load('Cloud/Cloud.mtl', (mtl) => {
            mtl.preload();
            objLoader.setMaterials(mtl);
        });
        const objLoader = new OBJLoader();
        objLoader.load('Cloud/Cloud.obj', (root) => {
            root.traverse((child) => {
                if (child.isMesh) {
                    child.material.transparent = true;
                }
            });
            scene.add(root);
        });

    }




    function render(time) {
        time *= 0.001; // convert time from milliseconds to seconds

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        // We then render the scene and request another animation frame to continue our loop.
        requestAnimationFrame(render);
    }

    // Outside the loop we call requestAnimationFrame one time to start the loop.
    requestAnimationFrame(render);
}

main();
