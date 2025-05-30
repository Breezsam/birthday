document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const music = document.getElementById("bgMusic");
  const sections = document.getElementById("sections");
  const intro = document.querySelector(".intro");
  const panels = document.querySelectorAll(".panel");
  const slideshowImages = document.querySelectorAll(".slideshow img");
  const musicHint = document.getElementById("musicHint");

  // GSAP typewriter effect for intro text
  const typewriterText = document.querySelector(".typewriter");
  const fullText = typewriterText.textContent;
  typewriterText.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < fullText.length) {
      typewriterText.textContent += fullText.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    } else {
      // Add blinking cursor after typing
      typewriterText.style.borderRight = "3px solid white";
    }
  }
  typeWriter();

  // Function to start the celebration
  function startExperience() {
    // Play music with volume
    music.volume = 0.6;
    music.play().catch(() => {
      musicHint.classList.remove("hidden");
      console.log("Autoplay failed, user interaction needed.");
    });

    // Confetti bursts timed
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }, 500);

    // Hide intro section with fade
    gsap.to(intro, { opacity: 0, duration: 1, onComplete: () => intro.style.display = "none" });

    // Reveal sections
    sections.classList.remove("hidden");

    // Animate each panel sliding up and fading in
    gsap.fromTo(panels, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.5, ease: "power3.out" });

    // Animate slideshow images with scale and fade loop
    gsap.to(slideshowImages, {
      scale: 1.05,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: 0.3
    });
  }

  startBtn.addEventListener("click", startExperience);

  // Simple floating particle effect for subtle atmosphere
  const canvas = document.getElementById("particlesCanvas");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];
  let width, height;

  function initCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  initCanvas();
  window.addEventListener("resize", initCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particlesArray.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  // Create 80 particles
  for (let i = 0; i < 80; i++) {
    particlesArray.push(new Particle());
  }
  animateParticles();
});
