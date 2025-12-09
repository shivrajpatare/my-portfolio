import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 6;
camera.position.y = 0.5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
container.appendChild(renderer.domElement);

// Post-Processing (BLOOM)
const renderScene = new RenderPass(scene, camera);

const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // Strength (Bloom intensity)
    0.4, // Radius
    0.85 // Threshold
);
bloomPass.strength = 1.0;
bloomPass.radius = 0.5;
bloomPass.threshold = 0.6; // Only bright things glow

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// Object: The "Neural Core" (Glass Torus Knot)
const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 150, 20);

// Physical Material (Glass-like with Neon emission)
const material = new THREE.MeshPhysicalMaterial({
    color: 0x222222,       // Dark base
    roughness: 0.1,        // Very smooth
    metalness: 0.1,        // Slight metal
    transmission: 0.2,     // Glass-like (if transmission > 0)
    thickness: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    emissive: 0x00f2ff,    // Cyan Glow
    emissiveIntensity: 0.5 // Base Glow
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Particles (Starfield)
const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20; // Spread wide
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMat = new THREE.PointsMaterial({
    size: 0.03,
    color: 0x7000ff, // Purple stars
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

// Point Lights (Neon colors)
const light1 = new THREE.PointLight(0x00f2ff, 2, 10);
light1.position.set(2, 2, 2);
scene.add(light1);

const light2 = new THREE.PointLight(0x7000ff, 2, 10);
light2.position.set(-2, -2, 2);
scene.add(light2);

// Interaction
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

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Smooth rotation
    torus.rotation.y += 0.005;
    torus.rotation.x += 0.002;
    torus.rotation.y += 0.05 * (targetX - torus.rotation.y);
    torus.rotation.x += 0.05 * (targetY - torus.rotation.x);

    // Pulsing Glow
    material.emissiveIntensity = 0.5 + Math.sin(elapsedTime * 2) * 0.3;

    // Parallax
    particles.rotation.y = -mouseX * 0.0001;
    particles.rotation.x = -mouseY * 0.0001;

    // Render with Bloom
    composer.render();
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});

animate();
