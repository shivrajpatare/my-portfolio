// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Simple fade-in animations
gsap.from('.hero-content > *', {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.15,
    ease: "power2.out",
    delay: 0.2
});

// Section fade-ins
const sections = document.querySelectorAll('.section:not(#hero)');
sections.forEach(section => {
    gsap.from(section.children, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
