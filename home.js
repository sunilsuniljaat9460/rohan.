// ========== Toggle Mobile Menu ==========
function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// ========== Scroll Reveal Animations ==========
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".project-card, .timeline-item, .skills-grid span, .about-content, .contact-info, .download-btn"
  );

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.9;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        el.classList.add("show");
      }
    });
  }

  // Initial check + scroll listener
  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  // Inject fade-in style
  const style = document.createElement("style");
  style.textContent = `
    .project-card, .timeline-item, .skills-grid span, .about-content, .contact-info, .download-btn {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease-out;
    }
    .project-card.show, .timeline-item.show, .skills-grid span.show, .about-content.show, .contact-info.show, .download-btn.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
});

// ========== Mouse Trail Canvas Background ==========
const canvas = document.getElementById("mouseCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle(x, y) {
  particles.push({
    x,
    y,
    radius: Math.random() * 3 + 1,
    alpha: 1
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
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
  for (let i = 0; i < 5; i++) {
    createParticle(e.clientX, e.clientY);
  }
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

drawParticles();
