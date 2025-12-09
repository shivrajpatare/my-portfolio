const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01';
const fontSize = 12;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = Math.floor(Math.random() * -100);
}

const draw = () => {
    // Very light fade effect
    ctx.fillStyle = 'rgba(248, 249, 253, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';
    ctx.fillStyle = 'rgba(99, 102, 241, 0.15)'; // Very subtle color

    for (let i = 0; i < rainDrops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.99) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

setInterval(draw, 80); // Slower for subtlety
