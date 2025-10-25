'use client';

import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about-container" className="section about-section">
      <div className="about-container">
        <div className="content-grid">
          <div className="about-content">
            <h1 className="main-title">
              I&apos;m <span className="highlight">Mark Emel A. Silla</span>
              <span className="wave">👋</span>
            </h1>

            <p className="description">
              A passionate <strong>Student</strong> aspiring to become a{' '}
              <strong>Web Developer</strong> and <strong>Tech Enthusiast</strong>{' '}
              crafting clean, modern, and user-friendly digital experiences that make a difference.
            </p>

            <p className="journey-text">
              My journey in tech started with curiosity about how websites work. Now, I&apos;m continuously
              learning HTML, CSS, JavaScript, and exploring modern frameworks to bring ideas to life.
            </p>

            <p className="journey-text">
              When I&apos;m not coding, I enjoy exploring design trends, solving logical problems,
              and keeping up with the latest innovations in technology.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <strong>BSIT Student</strong>
                <span>At Gordon College Olongapo City</span>
              </div>
              <div className="info-card">
                <strong>Learning</strong>
                <span>Web Technologies</span>
              </div>
              <div className="info-card">
                <strong>Building</strong>
                <span>Personal Projects</span>
              </div>
              <div className="info-card">
                <strong>Location</strong>
                <span>Philippines</span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-png">
              <Image
                src="/Marko.jpg"
                alt="Mark's Profile Picture"
                width={250}
                height={250}
              />
            </div>
            <p className="greeting">MY SKILLS</p>
            <div className="skill-badges">
              <div className="skill-badge">🌐 Web Development</div>
              <div className="skill-badge">⚛️ React, Express.js, Node.js</div>
              <div className="skill-badge">⚡ Fast Learner</div>
              <div className="skill-badge">HTML/CSS</div>
              <div className="skill-badge">JavaScript</div>
              <div className="skill-badge">Responsive Design</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
