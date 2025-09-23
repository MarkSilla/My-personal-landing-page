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
    })
    .catch((error) => {
      console.error("Error loading navbar:", error);
    });

  // Load all sections with error handling
  const loadSection = (url, containerId) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        return res.text();
      })
      .then((html) => {
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = html;
        }
      })
      .catch((error) => {
        console.error(`Error loading ${url}:`, error);
      });
  };

  loadSection("sections/home.html", "home-container");
  loadSection("sections/about.html", "about-container");
  loadSection("sections/projects.html", "projects-container");
  loadSection("sections/contact.html", "contact-container");
});

// Typing effect config
const typingMessages = [
  "Student",
  "BSIT",
  "Handsome",
  "Kindhearted",
  "Aspiring",
  "Curious",
  "Creative",
  "Solver",
  "Loving"
];

let currentMessageIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingTimeout = null;
const typingSpeed = 185;
const deletingSpeed = 85;
const pauseDuration = 2000;

function typeWriter(typingTextElement) {
  if (!typingTextElement) return;

  const currentMessage = typingMessages[currentMessageIndex];

  if (isDeleting) {
    typingTextElement.textContent = currentMessage.substring(0, currentCharIndex - 1);
    currentCharIndex--;

    if (currentCharIndex === 0) {
      isDeleting = false;
      currentMessageIndex = (currentMessageIndex + 1) % typingMessages.length;
      typingTimeout = setTimeout(() => typeWriter(typingTextElement), 500);
    } else {
      typingTimeout = setTimeout(() => typeWriter(typingTextElement), deletingSpeed);
    }
  } else {
    typingTextElement.textContent = currentMessage.substring(0, currentCharIndex + 1);
    currentCharIndex++;

    if (currentCharIndex === currentMessage.length) {
      isDeleting = true;
      typingTimeout = setTimeout(() => typeWriter(typingTextElement), pauseDuration);
    } else {
      typingTimeout = setTimeout(() => typeWriter(typingTextElement), typingSpeed);
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

  console.log("Setting up navigation:", { menuToggle, navLinks, mobileOverlay }); // Debug log

  // Menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Touch event for better mobile responsiveness
    menuToggle.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });

    if (mobileOverlay) {
      mobileOverlay.addEventListener("click", closeMobileMenu);
      mobileOverlay.addEventListener("touchstart", closeMobileMenu);
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (navbar && !navbar.contains(e.target) && navLinks.classList.contains("nav-active")) {
        closeMobileMenu();
      }
    });

    // Prevent menu from closing when clicking inside
    if (navLinks) {
      navLinks.addEventListener("click", (e) => e.stopPropagation());
    }
  } else {
    console.error("Menu elements not found:", { menuToggle, navLinks });
  }

  // Navigation links smooth scroll
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Remove active class from all links
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Get navbar height for offset
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }

      // Always close mobile menu on link click for mobile devices
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // Navbar scroll style with throttling
  let scrollTimeout = null;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
      scrollTimeout = null;
    }, 10);
  });

  // Handle active link based on scroll position
  const handleActiveSection = () => {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    // Update active nav link
    links.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  // Throttled scroll handler for active sections
  let activeScrollTimeout = null;
  window.addEventListener("scroll", () => {
    if (activeScrollTimeout) return;
    
    activeScrollTimeout = setTimeout(() => {
      handleActiveSection();
      activeScrollTimeout = null;
    }, 100);
  });
}

function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");
  const mobileOverlay = document.getElementById("mobileOverlay");

  if (!navLinks) {
    console.error("navLinks element not found");
    return;
  }

  const isActive = navLinks.classList.contains("nav-active");
  
  if (!isActive) {
    // Open menu
    navLinks.classList.add("nav-active");
    if (menuToggle) menuToggle.classList.add("active");
    if (mobileOverlay) mobileOverlay.classList.add("active");
    
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    
    console.log("Mobile menu opened"); // Debug log
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
    
    // Restore scrolling
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    
    console.log("Mobile menu closed"); // Debug log
  }
}

// Enhanced resize handler
let resizeTimeout = null;
window.addEventListener("resize", () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  }, 100);
});

// Handle orientation change on mobile
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  }, 500);
});

// Handle escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMobileMenu();
  }
});

// Clean up on page unload
window.addEventListener("beforeunload", () => {
  if (typingTimeout) clearTimeout(typingTimeout);
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
});