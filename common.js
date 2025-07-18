// common.js

// Mobile Menu Toggle
function toggleMenu() {
  document.getElementById("nav")?.classList.toggle("active");
}

// Smooth Scroll for anchor links (fallback to JS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Optional: Global Mouse Effect Canvas
const canvas = document.getElementById("mouseCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function createParticle(x, y) {
    const colors = ["#ff4da6", "#4d88ff", "#9933ff"];
    particles.push({
      x,
      y,
      radius: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      alpha: 1,
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.alpha > 0);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= 0.01;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("mousemove", (e) => {
    for (let i = 0; i < 3; i++) {
      createParticle(e.clientX, e.clientY);
    }
  });

  animateParticles();
}
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav a");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.nav a[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  }, {
    threshold: 0.6, // 60% of section visible
  });

  sections.forEach(section => observer.observe(section));
});
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
});

fadeElements.forEach(el => observer.observe(el));
