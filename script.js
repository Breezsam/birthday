document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const startBtn = document.getElementById("startBtn");
  const sections = document.getElementById("sections");
  const intro = document.querySelector(".intro");

  // Music toggle button
  musicToggle.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicToggle.textContent = "Pause Music ⏸️";
    } else {
      music.pause();
      musicToggle.textContent = "Play Music 🎵";
    }
  });

  // Start Celebration button
  startBtn.addEventListener("click", () => {
    music.volume = 0.5;
    music.play().catch(() => {
      console.log("Autoplay blocked, user interaction needed.");
    });
    musicToggle.textContent = "Pause Music ⏸️";

    // Confetti animation
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });

    // Show birthday message sections with animation
    sections.classList.remove("hidden");
    gsap.from(".panel", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.5,
      ease: "power2.out",
    });

    // Hide intro section
    intro.style.display = "none";
  });
});
