document.addEventListener("DOMContentLoaded", () => {
  const aboutElements = document.querySelectorAll(
    ".about-content, .skills-grid span, .download-btn"
  );

  const revealAbout = () => {
    const triggerPoint = window.innerHeight * 0.85;

    aboutElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerPoint) {
        el.classList.add("show");
      }
    });
  };

  revealAbout(); // Run on page load
  window.addEventListener("scroll", revealAbout);
});
