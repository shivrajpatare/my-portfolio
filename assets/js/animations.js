// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Hero Glitch Animation
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    gsap.from(glitchText, {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power4.out",
        delay: 0.3
    });
}

// Eyebrow Animation
gsap.from('.eyebrow', {
    duration: 1,
    x: -50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.1
});

// Bio Statement Animation
gsap.from('.bio-statement', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.6
});

// Hero Actions Animation
gsap.from('.hero-actions .btn-neon', {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: "back.out(1.7)",
    delay: 0.9
});

// Section Titles Animation
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Skill Cards Stagger Animation
const skillCards = document.querySelectorAll('.skill-category');
if (skillCards.length > 0) {
    gsap.from(skillCards, {
        scrollTrigger: {
            trigger: "#skills",
            start: "top 70%"
        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.4)"
    });
}

// Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length > 0) {
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%"
            },
            y: 100,
            opacity: 0,
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 1,
            ease: "power3.out"
        });
    });
}

// Research Card Animation
const researchCard = document.querySelector('.research-card');
if (researchCard) {
    gsap.from(researchCard, {
        scrollTrigger: {
            trigger: researchCard,
            start: "top 75%"
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.5)"
    });
}

// Contact Section Animation
const contactCards = document.querySelectorAll('.contact-grid > *');
if (contactCards.length > 0) {
    gsap.from(contactCards, {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 70%"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });
}

// Magnetic Button Effect
const buttons = document.querySelectorAll('.btn-neon, .btn-link');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
        });
    });
});

// Parallax Effect for Glass Cards
const glassCards = document.querySelectorAll('.glass-card');
glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// Skill Tags Hover Animation
const tags = document.querySelectorAll('.tag, .tech-tag');
tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        gsap.to(tag, {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(2)"
        });
    });

    tag.addEventListener('mouseleave', () => {
        gsap.to(tag, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: "power3.inOut"
            });
        }
    });
});
