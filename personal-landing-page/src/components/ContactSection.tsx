'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (value.trim().length < 2) {
          newErrors.name = 'Please enter your full name (at least 2 characters)';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'Email address is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'message':
        if (value.trim().length < 10) {
          newErrors.message = 'Please enter your message (minimum 10 characters)';
        } else {
          delete newErrors.message;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const isValid = Object.keys(formData).every(key => {
      validateField(key, formData[key as keyof typeof formData]);
      return !errors[key as keyof typeof errors];
    });

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xpznqggg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setTimeout(() => setShowSuccess(false), 10000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-container" className="section contact-section">
      <div className="container">
        <div className="contact-header">
          <h1 className="main-title">
            <span className="highlight">GET IN TOUCH</span>
            <span className="wave"></span>
          </h1>
          <p>Let&apos;s connect and discuss how we can work together!</p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Contact Information</h2>

            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h3>Email</h3>
                <p>202311320@gordoncollege.edu.ph</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">🎓</div>
              <div className="info-content">
                <h3>Education</h3>
                <p>BSIT Student at Gordon College Olongapo City</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">💻</div>
              <div className="info-content">
                <h3>Focus</h3>
                <p>Web Development & Technology</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">🚀</div>
              <div className="info-content">
                <h3>Status</h3>
                <p>Available for projects and collaborations</p>
              </div>
            </div>

            <div className="social-links">
              <p className="greeting">My Socials :</p>
              <a
                href="https://github.com/MarkSilla"
                target="_blank"
                className="social-link white-icon"
                title="GitHub"
                rel="noopener noreferrer"
              >
                <Image src="/github-mark.png" alt="Github" width={24} height={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/mark-emel-silla-bb6850334"
                target="_blank"
                className="social-link colored-icon"
                title="LinkedIn"
                rel="noopener noreferrer"
              >
                <Image src="/LI-In-Bug.png" alt="LinkedIn" width={24} height={24} />
              </a>
              <a
                href="https://x.com/EmelSilla62695"
                target="_blank"
                className="social-link white-icon"
                title="Twitter"
                rel="noopener noreferrer"
              >
                <Image src="/logo-white.png" alt="Twitter" width={24} height={24} />
              </a>
              <a
                href="https://www.facebook.com/markemel.silla.3"
                target="_blank"
                className="social-link colored-icon"
                title="Facebook"
                rel="noopener noreferrer"
              >
                <Image src="/Facebook_Logo.png" alt="Facebook" width={24} height={24} />
              </a>
              <a
                href="https://www.instagram.com/mrksilya"
                target="_blank"
                className="social-link colored-icon"
                title="Instagram"
                rel="noopener noreferrer"
              >
                <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send me a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? 'error' : formData.name && !errors.name ? 'success' : ''}`}
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? 'error' : formData.email && !errors.email ? 'success' : ''}`}
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  className={`form-control ${errors.message ? 'error' : formData.message && !errors.message ? 'success' : ''}`}
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
                {errors.message && <div className="form-error">{errors.message}</div>}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading"></div>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>

            {showSuccess && (
              <div className="success-message show">
                Thank you for your message! I&apos;ll get back to you soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
