const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリウゥクスツヌフムユュルグズブプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const alphabet = katakana + latin + nums + symbols;

const fontSize = 14;
const columns = canvas.width / fontSize;

const rainDrops = [];
const colors = ['#00f0ff', '#ff006e', '#b537f2', '#39ff14']; // Neon colors

for (let x = 0; x < columns; x++) {
    rainDrops[x] = Math.floor(Math.random() * -100);
}

const draw = () => {
    // Light background with fade effect
    ctx.fillStyle = 'rgba(250, 251, 255, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        // Random neon color for each character
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];

        // Add glow effect
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fillStyle = color;

        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset shadow for next iteration
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.98) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

setInterval(draw, 50);
