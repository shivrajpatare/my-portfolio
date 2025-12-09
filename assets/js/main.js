document.addEventListener('DOMContentLoaded', () => {
    // Console Signature
    console.log("%c SHIVRAJ PATARE | AI/ML ENGINEER ", "background: #000; color: #00ff88; font-weight: bold; padding: 10px; font-size: 16px;");

    // Initialize Security Logic
    initSecurity();
});

function initSecurity() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const status = document.getElementById('form-status');

            // 1. Prompt Injection Protection
            // Reject common LLM interaction patterns or suspicious formatting
            const injectionPatterns = [
                /ignore previous instructions/i,
                /system prompt/i,
                /new instructions/i,
                /you are a/i,
                /write a code/i
            ];

            if (injectionPatterns.some(pattern => pattern.test(message))) {
                status.textContent = "SECURITY ALERT: Intrusion detected. Prompt patterns blocked.";
                status.style.color = "red";
                return;
            }

            // 2. Client-Side Sanitization
            // (In a real backend, this would happen on server too)
            const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            // Simulation of sending
            status.textContent = "Encrypting transmission...";
            status.style.color = "var(--accent-color)";

            setTimeout(() => {
                status.textContent = "Transmission Sent. (Simulated)";
                form.reset();
            }, 1000);
        });
    }
}
