import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// Setup
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 7;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Subtle bloom
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.4, // Very subtle
    0.3,
    0.9
);

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// Simple sphere with subtle material
const geometry = new THREE.SphereGeometry(1.2, 32, 32);
const material = new THREE.MeshPhysicalMaterial({
    color: 0x6366f1,
    metalness: 0.3,
    roughness: 0.4,
    transmission: 0.1,
    opacity: 0.8,
    transparent: true
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Soft lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const light1 = new THREE.PointLight(0x6366f1, 1, 10);
light1.position.set(2, 2, 2);
scene.add(light1);

// Animation
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Gentle rotation
    sphere.rotation.y = elapsedTime * 0.1;
    sphere.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

    // Breathing scale
    const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.05;
    sphere.scale.set(scale, scale, scale);

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
