import * as THREE from 'three';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;

    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // Add a light
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);


    function makeCube(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    // Texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load( 'wall.jpg' );
    texture.colorSpace = THREE.SRGBColorSpace;


    function makeTexturedCube(geometry, texture, x) {
        const material = new THREE.MeshBasicMaterial({ map: texture });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeTexturedCube(geometry, texture, 0),
        makeCube(geometry, 0x8844aa, -2),
        makeCube(geometry, 0xaa8844, 2),
    ];


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
