const styles = getComputedStyle(document.documentElement);
const canvas = document.getElementById("glitch");
const ctx = canvas.getContext("2d");

const isMobile = checkMobile()

const screenScale = Math.min(
  window.innerWidth / 1920,
  window.innerHeight / 1080
);

const PARTICLES = isMobile ? 8 : Math.floor(30 * screenScale);
const MAX_TRAIL = isMobile ? 30 : Math.floor(120 * screenScale);
const BASE_SIZE = isMobile ? 25 : 40;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let trail = [];
let colors = [];
const glitchClasses = [
  "glitch-rgb"
];

if (!isMobile) {
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function drawGlitchParticles() {
  const isLight = document.body.classList.contains("light");



  for (let i = 0; i < PARTICLES; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    const color = colors[Math.floor(Math.random() * colors.length)];

    ctx.fillStyle = color;
    ctx.globalAlpha = isLight ? 0.8 : 0.15;

    ctx.fillRect(x, y, Math.random() * 120, 2);
  }

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
}

function drawTrail() {
  for (let i = 0; i < trail.length; i++) {
    const p = trail[i];
    
    if (Math.random() > 0.95) {
        p.x += (Math.random() - 0.5) * 50;
    }

    const size = BASE_SIZE * p.life;

    const randOffset = (range = 10) => (Math.random() - 0.5) * range;

    ctx.fillStyle = colors[0];
    ctx.globalAlpha = 0.2;

    ctx.fillRect(
      p.x + 15 - size / 2 + randOffset(),
      p.y + 5 - size / 2 + randOffset(),
      size*0.5,
      size*0.5
    );

    ctx.fillStyle = colors[1];
    ctx.globalAlpha = 0.15;

    ctx.fillRect(
      p.x + 15 - size / 2 + randOffset(20),
      p.y + 5  - size / 2 + randOffset(20),
      size * 0.8,
      size * 0.8
    );

    ctx.fillStyle = colors[2];
    ctx.globalAlpha = 0.15;

    ctx.fillRect(
      p.x + 15 - size / 2 + randOffset(20),
      p.y + 5  - size / 2 + randOffset(20),
      size * 0.6,
      size * 0.6
    );

    if (Math.random() > 0.7) {
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.globalAlpha = 0.25;

      const h = Math.random() * 6;

      ctx.fillRect(
        p.x + 15 - size / 2 + randOffset(),
        p.y + 5 - size / 2 + randOffset(),
        size,
        h
      );
    }

    p.life -= 0.02;
  }

  ctx.globalAlpha = 1;
  trail = trail.filter(p => p.life > 0);
}

function randomGlitch() {
  const elements = document.querySelectorAll(".links a, .gallery img, .info p, .info h1");
  if (elements.length === 0) return;

  const el = elements[Math.floor(Math.random() * elements.length)];
  if (el.tagName === "IMG") {
    glitchImage(el);
  } else {
    const effect = glitchClasses[Math.floor(Math.random() * glitchClasses.length)];
    el.classList.add(effect);

    setTimeout(() => {
      el.classList.remove(effect);
    }, 150 + Math.random() * 200);
  }

}

function glitchImage(el) {
  el.style.filter = `
    contrast(1.5)
    saturate(1.5)
    hue-rotate(${Math.random() * 40 - 20}deg)
  `;

  setTimeout(() => {
    el.style.filter = "";
  }, 150 + Math.random() * 200);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!isMobile) {
    trail.push({ x: mouse.x, y: mouse.y, life: 1 });
  }

  if (trail.length > MAX_TRAIL) {
    trail.shift();
  }

  if (Math.random() >= 0.995) randomGlitch();
  drawGlitchParticles();
  drawTrail();

  requestAnimationFrame(animate);
}

function loadColors() {
  colors = [
    styles.getPropertyValue('--accent1').trim(),
    styles.getPropertyValue('--accent2').trim(),
    styles.getPropertyValue('--accent3').trim()
  ];
}

function checkMobile() {
  return ('ontouchstart' in window) ||  (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
};

loadColors();
animate();