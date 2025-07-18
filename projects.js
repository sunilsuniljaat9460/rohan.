document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");

  const revealProjects = () => {
    const triggerBottom = window.innerHeight * 0.85;

    projectCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerBottom) {
        card.classList.add("show");
      }
    });
  };

  // Initial reveal
  revealProjects();

  // Scroll event
  window.addEventListener("scroll", revealProjects);
});
