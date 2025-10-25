'use client';

import Image from 'next/image';

interface HomeSectionProps {
  greeting: string;
  emoji: string;
  scrollToSection: (sectionId: string) => void;
}

export default function HomeSection({ greeting, emoji, scrollToSection }: HomeSectionProps) {
  return (
    <section id="home-container" className="section home-section">
      <div className="hero-container">
        <div className="hero-content">
          <p className="greeting">
            <span id="greetingHeading">{greeting}</span>
            <span id="avatar">{emoji}</span>
          </p>

          <h1 className="main-title">
            I&apos;m <span className="highlight">Mark Emel A. Silla</span>
            <span className="wave">👋</span>
          </h1>

          <p className="subtitle">
            A passionate Student aspiring to become a{' '}
            <strong>Web Developer</strong> and <strong>Tech Enthusiast</strong>{' '}
            crafting clean, modern, and user-friendly digital experiences that make a difference.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <a
              href="#projects-container"
              className="btn primary-btn"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects-container');
              }}
            >
              <span>🚀</span> View My Projects
            </a>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <p className="greeting">My Socials :</p>
            <a
              href="https://github.com/MarkSilla"
              target="_blank"
              className="social-link"
              title="GitHub"
              rel="noopener noreferrer"
            >
              <Image src="/github-mark.png" alt="Github" width={24} height={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/mark-emel-silla-bb6850334"
              target="_blank"
              className="social-link"
              title="LinkedIn"
              rel="noopener noreferrer"
            >
              <Image src="/LI-In-Bug.png" alt="LinkedIn" width={24} height={24} />
            </a>
            <a
              href="https://x.com/EmelSilla62695"
              target="_blank"
              className="social-link"
              title="Twitter"
              rel="noopener noreferrer"
            >
              <Image src="/logo-white.png" alt="Twitter" width={24} height={24} />
            </a>
            <a
              href="https://www.facebook.com/markemel.silla.3"
              target="_blank"
              className="social-link"
              title="Facebook"
              rel="noopener noreferrer"
            >
              <Image src="/Facebook_Logo.png" alt="Facebook" width={24} height={24} />
            </a>
            <a
              href="https://www.instagram.com/mrksilya"
              target="_blank"
              className="social-link"
              title="Instagram"
              rel="noopener noreferrer"
            >
              <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
            </a>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">BSIT Student</span>
              <span className="stat-label">At Gordon College Olongapo City</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Learning</span>
              <span className="stat-label">Web Technologies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Building</span>
              <span className="stat-label">Personal Projects</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hero-image">
          <div className="profile-container">
            <div className="profile-bg"></div>
            <Image
              src="/mark.jpg"
              alt="Mark's Profile Picture"
              className="profile-image"
              width={300}
              height={300}
              priority
            />

            {/* Floating Elements */}
            <div className="floating-elements">
              <div className="floating-element">💻 Web Development</div>
              <div className="floating-element">🚀 Problem Solver</div>
              <div className="floating-element">⚡ Fast Learner</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
