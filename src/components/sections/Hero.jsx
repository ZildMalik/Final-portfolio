import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import '../../styles/sections/hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-hero');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-background"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-greeting">Hello, I'm</span>
          <h1 className="hero-title">
            Zild <span className="highlight">Abule</span>
          </h1>
          <p className="hero-subtitle">
            Full-Stack Developer & UI/UX Enthusiast
          </p>
          <p className="hero-description">
            I build exceptional and accessible digital experiences for the web.
          </p>
          <div className="hero-cta">
            <Button variant="primary" size="large">
              View My Work
            </Button>
            <Button variant="secondary" size="large">
              Contact Me
            </Button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-wrapper">
            <div className="hero-shape"></div>
            <img 
              src="/hero-profile.jpg" 
              alt="Abule Zild" 
              className="hero-profile-img"
            />
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <Link to="/#about" className="scroll-down-link">
          <span className="scroll-arrow"></span>
          <span className="scroll-text">Scroll Down</span>
        </Link>
      </div>
    </section>
  );
};

export default Hero;