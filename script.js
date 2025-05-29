function startExperience() {
  const music = document.getElementById("bgMusic");
  const sections = document.getElementById("sections");

  // Try to play music after user interaction
  music.volume = 0.5;
  music.play().catch(() => {
    console.log("Autoplay failed, user interaction needed.");
  });

  // Trigger confetti
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 }
  });

  // Reveal sections
  sections.classList.remove("hidden");

  // Animate each panel with GSAP
  gsap.from(".panel", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.5,
    ease: "power2.out"
  });

  // Hide intro
  document.querySelector(".intro").style.display = "none";
}
