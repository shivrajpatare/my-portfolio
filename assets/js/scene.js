import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 8;
camera.position.y = 0.5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
container.appendChild(renderer.domElement);

// Post-Processing (BLOOM)
const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.8, // Strength
    0.6, // Radius
    0.7  // Threshold
);

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// Holographic Material
const holoMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.3,
    thickness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.4
});

// Main Geometry - Icosahedron
const geometry = new THREE.IcosahedronGeometry(1.5, 1);
const mesh = new THREE.Mesh(geometry, holoMaterial);
scene.add(mesh);

// Wireframe Overlay
const wireframeGeo = new THREE.IcosahedronGeometry(1.52, 1);
const wireframeMat = new THREE.MeshBasicMaterial({
    color: 0xff006e,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const wireframe = new THREE.Mesh(wireframeGeo, wireframeMat);
scene.add(wireframe);

// Neon Particles
const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

const neonColors = [
    new THREE.Color(0x00f0ff), // Cyan
    new THREE.Color(0xff006e), // Pink
    new THREE.Color(0xb537f2), // Purple
    new THREE.Color(0x39ff14)  // Lime
];

for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 25;
    posArray[i + 1] = (Math.random() - 0.5) * 25;
    posArray[i + 2] = (Math.random() - 0.5) * 25;

    const color = neonColors[Math.floor(Math.random() * neonColors.length)];
    colorArray[i] = color.r;
    colorArray[i + 1] = color.g;
    colorArray[i + 2] = color.b;
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particlesMat = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Neon Point Lights
const light1 = new THREE.PointLight(0x00f0ff, 3, 15);
light1.position.set(3, 3, 3);
scene.add(light1);

const light2 = new THREE.PointLight(0xff006e, 3, 15);
light2.position.set(-3, -3, 3);
scene.add(light2);

const light3 = new THREE.PointLight(0xb537f2, 2, 12);
light3.position.set(0, 3, -3);
scene.add(light3);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Animation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    targetX = mouseX * 0.0008;
    targetY = mouseY * 0.0008;

    // Smooth rotation
    mesh.rotation.y += 0.003;
    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.03 * (targetX - mesh.rotation.y);
    mesh.rotation.x += 0.03 * (targetY - mesh.rotation.x);

    // Sync wireframe
    wireframe.rotation.copy(mesh.rotation);

    // Color shifting
    const hue = (Math.sin(elapsedTime * 0.5) + 1) * 0.5;
    holoMaterial.emissive.setHSL(hue, 1, 0.5);

    // Pulsing glow
    holoMaterial.emissiveIntensity = 0.4 + Math.sin(elapsedTime * 2) * 0.2;

    // Rotate particles
    particles.rotation.y = elapsedTime * 0.05;
    particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

    // Animate lights
    light1.position.x = Math.sin(elapsedTime * 0.7) * 4;
    light1.position.z = Math.cos(elapsedTime * 0.7) * 4;

    light2.position.x = Math.cos(elapsedTime * 0.5) * 4;
    light2.position.z = Math.sin(elapsedTime * 0.5) * 4;

    // Render with Bloom
    composer.render();
}

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

animate();
