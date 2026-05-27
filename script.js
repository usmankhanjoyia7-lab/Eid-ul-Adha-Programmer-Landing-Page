/* ============================================
   DESIGN PHILOSOPHY: Digital Sufi Experience
   Advanced Effects & Interactive Elements
   ============================================ */

// ============================================
// INITIALIZATION & DOM ELEMENTS
// ============================================

const cursor = document.querySelector('.cursor');
const cursorGlow = document.querySelector('.cursor-glow');
const loadingScreen = document.getElementById('loadingScreen');
const scrollProgress = document.getElementById('scrollProgress');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const soundToggle = document.getElementById('soundToggle');
const starsCanvas = document.getElementById('starsCanvas');
const particlesCanvas = document.getElementById('particlesCanvas');
const fireworksCanvas = document.getElementById('fireworksCanvas');
const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');
const terminalBody = document.getElementById('terminalBody');
const tiltCards = document.querySelectorAll('.tilt-card');
const skillBadges = document.querySelectorAll('.skill-badge');

let soundEnabled = true;

// ============================================
// CUSTOM CURSOR
// ============================================

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';

    cursorGlow.style.left = (x - 15) + 'px';
    cursorGlow.style.top = (y - 15) + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(1.5)';
    cursorGlow.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorGlow.style.transform = 'scale(1)';
});

// ============================================
// LOADING SCREEN
// ============================================

window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';

    // Update navbar background on scroll
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 0 20px rgba(251, 191, 36, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// NAVIGATION ACTIVE LINK
// ============================================

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SOUND TOGGLE
// ============================================

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.style.opacity = soundEnabled ? '1' : '0.5';
    soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
});

// ============================================
// STARS CANVAS
// ============================================

const starsCtx = starsCanvas.getContext('2d');
let stars = [];

function resizeStarsCanvas() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    generateStars();
}

function generateStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random() * 0.5 + 0.5,
            twinkleSpeed: Math.random() * 0.02 + 0.01
        });
    }
}

function animateStars() {
    starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    
    stars.forEach((star) => {
        star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));

        starsCtx.fillStyle = `rgba(251, 191, 36, ${star.opacity})`;
        starsCtx.beginPath();
        starsCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starsCtx.fill();
    });

    requestAnimationFrame(animateStars);
}

resizeStarsCanvas();
animateStars();

window.addEventListener('resize', resizeStarsCanvas);

// ============================================
// PARTICLES CANVAS
// ============================================

const particlesCtx = particlesCanvas.getContext('2d');
let particles = [];

function resizeParticlesCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y) {
        this.x = x || Math.random() * particlesCanvas.width;
        this.y = y || Math.random() * particlesCanvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = ['rgba(251, 191, 36,', 'rgba(6, 182, 212,', 'rgba(16, 185, 129,'][Math.floor(Math.random() * 3)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.005;

        if (this.x < 0) this.x = particlesCanvas.width;
        if (this.x > particlesCanvas.width) this.x = 0;
        if (this.y < 0) this.y = particlesCanvas.height;
        if (this.y > particlesCanvas.height) this.y = 0;
    }

    draw() {
        particlesCtx.fillStyle = this.color + this.opacity + ')';
        particlesCtx.beginPath();
        particlesCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        particlesCtx.fill();
    }
}

function animateParticles() {
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    particles = particles.filter(p => p.opacity > 0);

    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

resizeParticlesCanvas();
animateParticles();

// Generate particles on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.8) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

window.addEventListener('resize', resizeParticlesCanvas);

// ============================================
// MOUSE-FOLLOW LIGHT GLOW
// ============================================

const mouseGlow = document.createElement('div');
mouseGlow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(251, 191, 36, 0.15), transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 2;
    filter: blur(40px);
`;
document.body.appendChild(mouseGlow);

document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = (e.clientX - 200) + 'px';
    mouseGlow.style.top = (e.clientY - 200) + 'px';
});

// ============================================
// 3D TILT CARDS
// ============================================

tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ============================================
// FIREWORKS EFFECT
// ============================================

const fireworksCtx = fireworksCanvas.getContext('2d');
let fireworks = [];

function resizeFireworksCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        const colors = ['#fbbf24', '#06b6d4', '#10b981', '#a855f7'];
        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = Math.random() * 5 + 3;
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }

    update() {
        this.particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= 0.02;
        });
    }

    draw() {
        this.particles.forEach((p) => {
            if (p.life > 0) {
                fireworksCtx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
                fireworksCtx.beginPath();
                fireworksCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                fireworksCtx.fill();
            }
        });
    }

    isAlive() {
        return this.particles.some(p => p.life > 0);
    }
}

function animateFireworks() {
    fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    fireworks = fireworks.filter(fw => fw.isAlive());

    fireworks.forEach((fw) => {
        fw.update();
        fw.draw();
    });

    if (fireworks.length > 0) {
        requestAnimationFrame(animateFireworks);
    }
}

resizeFireworksCanvas();

// Trigger fireworks on click
document.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
        fireworks.push(new Firework(e.clientX, e.clientY));
        if (fireworks.length === 1) {
            animateFireworks();
        }
    }
});

window.addEventListener('resize', resizeFireworksCanvas);

// ============================================
// TYPEWRITER EFFECT
// ============================================

function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ============================================
// TERMINAL SIMULATION
// ============================================

const terminalCommands = [
    { cmd: '$ npm run blessings', delay: 500 },
    { cmd: '> loading happiness...', delay: 1500 },
    { cmd: '> connecting hearts...', delay: 2500 },
    { cmd: '> spreading joy...', delay: 3500 },
    { cmd: '> Eid Mubarak.exe launched', delay: 4500 },
    { cmd: '✨ Success! May your day be blessed ✨', delay: 5500 }
];

function initializeTerminal() {
    terminalBody.innerHTML = '';
    terminalCommands.forEach((item) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.className = 'terminal-line';
            if (item.cmd.startsWith('$')) {
                p.innerHTML = `<span class="prompt">$</span> ${item.cmd.substring(2)}`;
            } else if (item.cmd.startsWith('>')) {
                p.innerHTML = `<span class="prompt">></span> ${item.cmd.substring(2)}`;
            } else {
                p.textContent = item.cmd;
            }
            terminalBody.appendChild(p);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, item.delay);
    });
}

// Initialize terminal when section comes into view
const terminalSection = document.getElementById('terminal');
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            initializeTerminal();
            terminalObserver.unobserve(terminalSection);
        }
    });
});

terminalObserver.observe(terminalSection);

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SKILL BADGES ANIMATION ON SCROLL
// ============================================

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
});

skillBadges.forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.animationDelay = (index * 0.1) + 's';
    skillsObserver.observe(badge);
});

// ============================================
// PARALLAX EFFECT
// ============================================

const parallaxElements = document.querySelectorAll('[class*="parallax"]');

window.addEventListener('scroll', () => {
    parallaxElements.forEach((element) => {
        const scrollPosition = window.scrollY;
        const elementOffset = element.offsetTop;
        const distance = scrollPosition - elementOffset;
        const parallaxValue = distance * 0.5;

        element.style.transform = `translateY(${parallaxValue}px)`;
    });
});

// ============================================
// HOVER SOUND EFFECTS
// ============================================

function playHoverSound() {
    if (!soundEnabled) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 600 + Math.random() * 200;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add hover sound to interactive elements
document.querySelectorAll('button, .nav-link, .greeting-card, .skill-badge').forEach((element) => {
    element.addEventListener('mouseenter', playHoverSound);
});

// ============================================
// FLOATING ANIMATION FOR ELEMENTS
// ============================================

function addFloatingAnimation(element, duration = 3) {
    element.style.animation = `float ${duration}s ease-in-out infinite`;
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const revealElements = document.querySelectorAll('.about-card, .message-content, .greeting-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

revealElements.forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

// ============================================
// MOON ROTATION ANIMATION
// ============================================

const moon = document.getElementById('moon');
if (moon) {
    let moonRotation = 0;
    setInterval(() => {
        moonRotation += 0.5;
        moon.style.transform = `rotate(${moonRotation}deg)`;
    }, 50);
}

// ============================================
// FLOATING ARABIC TYPOGRAPHY
// ============================================

function createFloatingText(text, x, y) {
    const floatingText = document.createElement('div');
    floatingText.textContent = text;
    floatingText.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-family: 'Cairo', sans-serif;
        font-size: 1.5rem;
        color: rgba(251, 191, 36, 0.6);
        pointer-events: none;
        z-index: 100;
        animation: floatUp 3s ease-out forwards;
    `;
    document.body.appendChild(floatingText);

    setTimeout(() => floatingText.remove(), 3000);
}

// Add floating text on certain interactions
document.addEventListener('click', (e) => {
    if (Math.random() > 0.7) {
        const texts = ['✨', '🌙', '💫', '🎆', '✨'];
        createFloatingText(texts[Math.floor(Math.random() * texts.length)], e.clientX, e.clientY);
    }
});

// ============================================
// ANIMATED ISLAMIC SVG PATTERNS
// ============================================

function createIslamicPattern() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '200');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.style.cssText = `
        position: fixed;
        opacity: 0.05;
        pointer-events: none;
        z-index: 1;
    `;

    // Create a simple geometric pattern
    for (let i = 0; i < 5; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', 100);
        circle.setAttribute('cy', 100);
        circle.setAttribute('r', 30 + i * 20);
        circle.setAttribute('fill', 'none');
        circle.setAttribute('stroke', '#fbbf24');
        circle.setAttribute('stroke-width', '1');
        svg.appendChild(circle);
    }

    return svg;
}

// Add patterns to background
for (let i = 0; i < 3; i++) {
    const pattern = createIslamicPattern();
    pattern.style.left = Math.random() * 100 + '%';
    pattern.style.top = Math.random() * 100 + '%';
    document.body.appendChild(pattern);
}

// ============================================
// DYNAMIC STARS ENHANCEMENT
// ============================================

function addDynamicStar() {
    const star = {
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.01
    };
    stars.push(star);
    if (stars.length > 250) stars.shift();
}

// Add new stars periodically
setInterval(addDynamicStar, 2000);

// ============================================
// REALISTIC SHADOWS
// ============================================

function updateShadows() {
    const cards = document.querySelectorAll('.greeting-card, .about-card, .message-content');
    cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const shadowIntensity = Math.max(0, 1 - rect.top / window.innerHeight);
        card.style.boxShadow = `
            0 ${20 * shadowIntensity}px ${40 * shadowIntensity}px rgba(251, 191, 36, ${0.1 * shadowIntensity}),
            0 ${10 * shadowIntensity}px ${20 * shadowIntensity}px rgba(0, 0, 0, ${0.2 * shadowIntensity})
        `;
    });
}

window.addEventListener('scroll', updateShadows);
updateShadows();

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateShadows();
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// INITIALIZATION COMPLETE
// ============================================

console.log('🌙 Eid Mubarak Experience Loaded');
console.log('✨ All effects initialized');
console.log('💫 May your day be blessed');
