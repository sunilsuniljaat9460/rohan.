// ========== Toggle Mobile Menu ==========
function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// ========== Scroll Reveal Animation ==========
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".project-card, .timeline-item, .skills-grid span, .about-content, .contact-info, .download-btn"
  );

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.9;

    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add("show");
      }
    });
  }

  // Throttled scroll for better performance
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(revealOnScroll, 100);
  });

  // Initial check
  revealOnScroll();

  // Inject animation styles
  const style = document.createElement("style");
  style.textContent = `
    .project-card, .timeline-item, .skills-grid span, .about-content, .contact-info, .download-btn {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease-out;
    }
    .show {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
});

// ========== Canvas Mouse Trail ==========
const canvas = document.getElementById("mouseCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle(x, y) {
  if (particles.length > 300) particles.shift(); // Limit total particles
  particles.push({ x, y, radius: Math.random() * 3 + 1, alpha: 1 });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
    ctx.fill();
    p.alpha -= 0.01;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(drawParticles);
}

canvas.addEventListener("mousemove", e => {
  for (let i = 0; i < 5; i++) createParticle(e.clientX, e.clientY);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

drawParticles();

// ========== SVG Arc Bars ==========
const svg = document.getElementById("arc-svg");
const colors = ["#ff4da6", "#9933ff", "#4d88ff", "#00c3ff", "#00ffcc"];
const totalBars = 70;
const radius = 300;
const barLength = 30;
const barWidth = 8;
const bars = [];

for (let i = 0; i < totalBars; i++) {
  const angle = (Math.PI * i) / (totalBars * 1.5);
  const x = Math.cos(angle) * radius + 100;
  const y = Math.sin(angle) * radius + 300;

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  const rotate = `rotate(${angle * (180 / Math.PI)} ${x} ${y})`;

  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", barLength);
  rect.setAttribute("height", barWidth);
  rect.setAttribute("rx", 4);
  rect.setAttribute("fill", colors[i % colors.length]);
  rect.setAttribute("transform", rotate);
  rect.dataset.baseTransform = rotate;

  svg.appendChild(rect);
  bars.push(rect);
}

document.addEventListener("mousemove", (e) => {
  bars.forEach((bar, index) => {
    const scale = 1 + Math.sin((e.clientX + index * 10) / 200) * 0.2;
    bar.setAttribute("transform", `${bar.dataset.baseTransform} scale(${scale})`);
  });
});
