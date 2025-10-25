'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HomeSection from '../components/HomeSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [greeting, setGreeting] = useState('Hello there!');
  const [emoji, setEmoji] = useState('👋');
  const [mounted, setMounted] = useState(false);

  // Initialize theme and greeting after mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize greeting based on time
    const hour = new Date().getHours();
    let greetingText, emojiText;

    if (hour >= 5 && hour < 12) {
      greetingText = "Good Morning!";
      emojiText = "🌅";
    } else if (hour >= 12 && hour < 17) {
      greetingText = "Good Afternoon!";
      emojiText = "☀️";
    } else if (hour >= 17 && hour < 21) {
      greetingText = "Good Evening!";
      emojiText = "🌇";
    } else {
      greetingText = "Good Evening!";
      emojiText = "🌙";
    }

    setGreeting(greetingText);
    setEmoji(emojiText);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
      />

      <main className="content">
        <HomeSection greeting={greeting} emoji={emoji} scrollToSection={scrollToSection} />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}