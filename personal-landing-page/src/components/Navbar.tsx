'use client';

import { useState, useEffect } from 'react';
import '../app/globals.css'

interface NavbarProps {
  theme?: string;
  toggleTheme: () => void;
  scrollToSection: (sectionId: string) => void;
}

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

export default function Navbar({ theme, toggleTheme, scrollToSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home-container');
  const [typingText, setTypingText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingSpeed = 185;
  const deletingSpeed = 85;
  const pauseDuration = 2000;

  useEffect(() => {
    const currentMessage = typingMessages[currentMessageIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting characters
      if (currentCharIndex > 0) {
        timeout = setTimeout(() => {
          setTypingText(currentMessage.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next message
        setIsDeleting(false);
        setCurrentMessageIndex((currentMessageIndex + 1) % typingMessages.length);
        timeout = setTimeout(() => {}, 500);
      }
    } else {
      // Typing characters
      if (currentCharIndex < currentMessage.length) {
        timeout = setTimeout(() => {
          setTypingText(currentMessage.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        }, typingSpeed);
      } else {
        // Finished typing, start deleting after pause
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentMessageIndex, isDeleting]);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home-container', 'about-container', 'projects-container', 'contact-container'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav id="navbar" className="navbar">
        <div className="navbar-title typing-container">
          Who&apos;s Mark?
          <span id="typingText" className="typing-text">{typingText}</span>
          <span className="typing-cursor">|</span>
        </div>

        <button
          id="menuToggle"
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div id="navLinks" className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
          <a
            href="#home-container"
            className={activeSection === 'home-container' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home-container');
            }}
          >
            Home
          </a>
          <a
            href="#about-container"
            className={activeSection === 'about-container' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about-container');
            }}
          >
            About
          </a>
          <a
            href="#projects-container"
            className={activeSection === 'projects-container' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('projects-container');
            }}
          >
            Personal Projects
          </a>
          <a
            href="#contact-container"
            className={activeSection === 'contact-container' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact-container');
            }}
          >
            Contacts
          </a>

          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className={`theme-toggle-icon sun-icon ${theme === 'light' ? 'active' : ''}`}>
              ☀️
            </span>
            <span className={`theme-toggle-icon moon-icon ${theme === 'dark' ? 'active' : ''}`}>
              🌙
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobileOverlay"
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
    </>
  );
}