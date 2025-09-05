document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  fetch("components/navbar.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("navbar-container").innerHTML = html;

      // Setup navigation after navbar is loaded
      setupNavigation();

      // Setup typing effect after navbar is in DOM
      const typingTextElement = document.getElementById("typingText");
      if (typingTextElement) {
        setTimeout(() => typeWriter(typingTextElement), 1000);
      } else {
        console.error("typingText element not found!");
      }
    });

  // Load all sections
  fetch("sections/home.html")
    .then((res) => res.text())
    .then((html) => (document.getElementById("home-container").innerHTML = html));

  fetch("sections/about.html")
    .then((res) => res.text())
    .then((html) => (document.getElementById("about-container").innerHTML = html));

  fetch("sections/projects.html")
    .then((res) => res.text())
    .then((html) => (document.getElementById("projects-container").innerHTML = html));
});

// Typing effect config
const typingMessages = [
  "Student at Gordon College Olongapo City",
  "His program is BSIT (Bachelor of Science in Information Technology)",
  "Handsome",
  "Kindhearted ",
  "Aspiring to become a Web Developer ",
  "Curious Learner",
  "Creative Thinker",
  "Problem Solver",
  "I love you Sir"
];

let currentMessageIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 150;
const deletingSpeed = 75;
const pauseDuration = 2000;

function typeWriter(typingTextElement) {
  const currentMessage = typingMessages[currentMessageIndex];

  if (isDeleting) {
    typingTextElement.textContent = currentMessage.substring(0, currentCharIndex - 1);
    currentCharIndex--;

    if (currentCharIndex === 0) {
      isDeleting = false;
      currentMessageIndex = (currentMessageIndex + 1) % typingMessages.length;
      setTimeout(() => typeWriter(typingTextElement), 500);
    } else {
      setTimeout(() => typeWriter(typingTextElement), deletingSpeed);
    }
  } else {
    typingTextElement.textContent = currentMessage.substring(0, currentCharIndex + 1);
    currentCharIndex++;

    if (currentCharIndex === currentMessage.length) {
      isDeleting = true;
      setTimeout(() => typeWriter(typingTextElement), pauseDuration);
    } else {
      setTimeout(() => typeWriter(typingTextElement), typingSpeed);
    }
  }
}

// Navigation functionality
function setupNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-links a");

  // Menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    if (mobileOverlay) {
      mobileOverlay.addEventListener("click", closeMobileMenu);
    }

    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains("nav-active")) {
        closeMobileMenu();
      }
    });

    navLinks.addEventListener("click", (e) => e.stopPropagation());
  }

  // Navigation links smooth scroll
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      closeMobileMenu();
    });
  });

  // Navbar scroll style
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  const mobileOverlay = document.getElementById("mobileOverlay");

  if (!navLinks) return;

  const isActive = navLinks.classList.contains("nav-active");
  if (!isActive) {
    navLinks.classList.add("nav-active");
    if (menuToggle) menuToggle.classList.add("active");
    if (mobileOverlay) mobileOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  const mobileOverlay = document.getElementById("mobileOverlay");

  if (navLinks && navLinks.classList.contains("nav-active")) {
    navLinks.classList.remove("nav-active");
    if (menuToggle) menuToggle.classList.remove("active");
    if (mobileOverlay) mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});
