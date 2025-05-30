const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = "Pause Music ⏸️";
  } else {
    music.pause();
    musicToggle.textContent = "Play Music 🎵";
  }
});

function startExperience() {
  music.volume = 0.5;
  music.play().catch(() => {
    console.log("Autoplay failed, user interaction needed.");
  });
  musicToggle.textContent = "Pause Music ⏸️";

  // Confetti animation
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });

  // Reveal the birthday message sections with animation
  const sections = document.getElementById("sections");
  sections.classList.remove("hidden");
  gsap.from(".panel", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.5,
    ease: "power2.out"
  });

  // Hide the intro section
  document.querySelector(".intro").style.display = "none";
}
