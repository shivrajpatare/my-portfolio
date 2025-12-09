// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
gsap.from('#hero .glitch-text', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    delay: 0.5
});

gsap.from('#hero .subtitle', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.8
});

// Section Reveal Config
const sections = document.querySelectorAll('.section:not(#hero)');

sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%", // When top of section hits 80% viewport
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Card Stagger Animation
const skillCards = document.querySelectorAll('#skills .card');
if (skillCards.length > 0) {
    gsap.from(skillCards, {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 75%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // 0.2s delay between each
        ease: "back.out(1.7)"
    });
}
