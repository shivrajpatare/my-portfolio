// Custom Neon Cursor
const cursor = document.getElementById('custom-cursor');
const cursorTrail = document.getElementById('cursor-trail');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let trailX = 0;
let trailY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor follow
function animateCursor() {
    // Cursor follows mouse with slight delay
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    // Trail follows cursor with more delay
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
const interactiveElements = document.querySelectorAll('a, button, .glass-card, .tag');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.borderColor = '#ff006e';
        cursor.style.borderWidth = '3px';
        cursorTrail.style.width = '12px';
        cursorTrail.style.height = '12px';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = '#00f0ff';
        cursor.style.borderWidth = '2px';
        cursorTrail.style.width = '8px';
        cursorTrail.style.height = '8px';
    });
});

// Hide default cursor on interactive elements
document.body.style.cursor = 'none';
interactiveElements.forEach(el => {
    el.style.cursor = 'none';
});
