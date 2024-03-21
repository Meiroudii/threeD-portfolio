import './style.css'
import moonImage from "./assets/moon.jpg";
import spaceImage from "./assets/space.jpg";
import avatarImage from "./assets/avatar.png";
import normalMapImage from "./assets/normal.jpg";

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Container
const scene = new THREE.Scene();

// (field of view, aspect ratio, view frustum
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera );


// Creating geometry, the {x, y ,z} points that makeup a shpae
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347} );
const torus = new THREE.Mesh( geometry, material);

// Add newly created torus into the scene
scene.add(torus)

// Scene Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, 1);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addOtherObjects() {
    // Creating geometry, the {x, y ,z} points that makeup a shpae
    const geometry2 = new THREE.TorusGeometry( 10, 3, 16, 100);
    const material2 = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true} );
    const torus2 = new THREE.Mesh( geometry2, material2);
}

function addCube() {
    const geometry = new THREE.BoxGeometry(0.25, 5, 5);
    const material = new THREE.MeshToonMaterial( { color: 0xccccc});
    const cube = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

    cube.position.set(x, y, z);
    scene.add(cube);
}

function addCubeRed() {
    const geometry = new THREE.BoxGeometry(0.25, 5, 5);
    const material = new THREE.MeshToonMaterial( { color: 0xdedede});
    const cube2 = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

    cube2.position.set(x, y, z);
    scene.add(cube2);
}
//Array(200).fill().forEach(addCubeRed);
// Populate random stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
    const star = new THREE.Mesh(geometry, material);

    // Randomize star locations
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);

// Load jpg image for teture
const spaceTexture = new THREE.TextureLoader().load(spaceImage);
scene.background = spaceTexture;

// Avatar
const meiroudiiTexture = new THREE.TextureLoader().load(avatarImage);
const meiroudii = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial( { map: meiroudiiTexture} )
);
scene.add(meiroudii);

// Moon Object
const moonTexture = new THREE.TextureLoader().load(moonImage);
const normalTexture = new THREE.TextureLoader().load(normalMapImage);
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial( {
        map: moonTexture,
        normalMap: normalTexture
    })
);
scene.add(moon);

function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.1;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.1;

    controls.update();

    renderer.render( scene, camera);
}

moon.position.z = 30;
moon.position.setX(-10);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    meiroudii.rotation.y += 0.01;
    meiroudii.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera

animate();
