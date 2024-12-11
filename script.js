const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let hue = 0;
let heartScale = 8; // Počáteční velikost srdce
let scaleDirection = 0.05; // Rychlost změny měřítka

// Funkce pro vykreslení srdíčka pomocí parametrických rovnic
function drawHeart(x, y, size, alpha) {
    ctx.beginPath();
    for (let t = 0; t <= Math.PI * 2; t += 0.01) {
        const xPos = size * 16 * Math.sin(t) ** 3;
        const yPos = -size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(x + xPos, y + yPos);
    }
    ctx.closePath();
    ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${alpha})`;
    ctx.stroke();
}

// Funkce pro vytvoření částic (čar v srdíčku)
function createParticle() {
    const particle = {
        x: canvas.width / 2 + Math.random() * 20 - 10, // Jemný náhodný pohyb
        y: canvas.height / 2 + Math.random() * 20 - 10,
        size: heartScale, // Velikost dle měřítka
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        alpha: 1,
    };
    particles.push(particle);
}

// Animace částic a měřítka
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Animace měřítka srdce
    heartScale += scaleDirection;
    if (heartScale > 10 || heartScale < 7) {
        scaleDirection *= -1; // Změna směru zvětšování a zmenšování
    }

    particles.forEach((particle, index) => {
        drawHeart(particle.x, particle.y, particle.size, particle.alpha);

        particle.alpha -= 0.02;
        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        }
    });

    hue += 2; // Mění barvu duhově
    createParticle();
    requestAnimationFrame(animateParticles);
}

// Spuštění animace
animateParticles();
