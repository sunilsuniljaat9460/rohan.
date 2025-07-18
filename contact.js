document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Reset previous borders
    [nameInput, emailInput, messageInput].forEach(input => input.style.borderColor = "#ccc");

    if (name && email && message) {
      alert(`✅ Thank you, ${name}! Your message has been sent.`);
      form.reset();
    } else {
      alert("⚠️ Please fill in all fields.");

      if (!name) nameInput.style.borderColor = "red";
      if (!email) emailInput.style.borderColor = "red";
      if (!message) messageInput.style.borderColor = "red";
    }
  });
});
