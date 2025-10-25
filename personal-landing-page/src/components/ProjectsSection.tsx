'use client';

import Image from 'next/image';

export default function ProjectsSection() {
  return (
    <section id="projects-container" className="section projects-section">
      <div className="projects-container">
        <h1 className="main-title">
          <span className="highlight">MY PERSONAL PROJECTS</span>
          <span className="wave"></span>
        </h1>
        <p className="section-subtitle">
          Here are some of the projects I&apos;ve worked on while learning and exploring web development.
        </p>

        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card">
            <Image
              src="/ecotrack.png"
              alt="EcoTrack App"
              className="project-image"
              width={400}
              height={200}
              style={{ width: 'auto', height: 'auto' }}
            />
            <div className="project-info">
              <h3>🌱 EcoTrack <strong>(In Development)</strong></h3>
              <p>
                An innovative waste management and environmental monitoring web app designed to help users track,
                manage, and reduce their ecological footprint. Currently under development using{' '}
                <strong>MERN Stack</strong> (MongoDB, Express.js, React, Node.js).
                <strong>(IN DEVELOPMENT)</strong>
              </p>
              <a
                href="https://github.com/MarkSilla/EcoTrack"
                target="_blank"
                className="project-link"
                rel="noopener noreferrer"
              >
                View GitHub
              </a>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card">
            <Image
              src="/checkease.png"
              alt="checkese Website"
              className="project-image"
              width={400}
              height={200}
              style={{ width: 'auto', height: 'auto' }}
            />
            <div className="project-info">
              <h3>📋 CheckEase</h3>
              <p>
                A web-based attendance management system developed exclusively for{' '}
                <strong>Gordon College</strong>. Built with <strong>Vue.js</strong> for the frontend and{' '}
                <strong>Laravel</strong> for the backend. The system simplified and digitized student attendance tracking.{' '}
                <strong>NOT DEPLOYED</strong>
              </p>
              <a
                href="https://github.com/MarkSilla/CheckEaseNew.git"
                target="_blank"
                className="project-link"
                rel="noopener noreferrer"
              >
                View GitHub
              </a>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card">
            <Image
              src="/GC.png"
              alt="UniformExpress App"
              className="project-image"
              width={400}
              height={200}
              style={{ width: 'auto', height: 'auto' }}
              loading="eager"
            />
            <div className="project-info">
              <h3>🧥 UniformExpress</h3>
              <p>
                A full-stack web application built using the <strong>MERN Stack</strong> (MongoDB, Express.js, React, Node.js).
                Designed exclusively for <strong>Gordon College</strong>, this system streamlines uniform ordering and inventory
                management for students and faculty. <strong>(DEPLOYED)</strong>
              </p>
              <a
                href="https://uniform-xpress-frontend.vercel.app/"
                target="_blank"
                className="project-link"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
