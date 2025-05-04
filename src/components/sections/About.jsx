import { useEffect, useRef } from 'react';
import SectionHeading from '../ui/SectionHeading';
import '../../styles/sections/about.css';

const About = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skills-section')) {
              const skillBars = entry.target.querySelectorAll('.skill-progress');
              skillBars.forEach((bar) => {
                const level = bar.getAttribute('data-level');
                setTimeout(() => {
                  bar.style.width = `${level}%`;
                }, 300);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "fas fa-palette",
      skills: [
        { name: 'React', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 75 },
      ]
    },
    {
      title: "Backend Development",
      icon: "fas fa-server",
      skills: [
        { name: 'Mysql', level: 80 },
        { name: 'Json-server', level: 50 },
        { name: 'Php', level: 70 },
      ]
    },
    {
      title: "Design & UX",
      icon: "fas fa-pencil-ruler",
      skills: [
        { name: 'UI/UX Design', level: 70 },
        { name: 'Responsive Design', level: 90 },
        { name: 'Figma', level: 65 },
        { name: 'Canva', level: 60 },
      ]
    },
    {
      title: "DevOps & Tools",
      icon: "fas fa-tools",
      skills: [
        { name: 'Git', level: 85 },
      ]
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <SectionHeading 
          title="About Me" 
          subtitle="Get to know me and my skills"
        />
        
        <div className="about-content" ref={aboutRef}>
          <div className="about-image">
            <div className="about-image-wrapper">
              <img 
                src="/aboutme-profile.jpg" 
                alt="Zild Abule" 
                className="about-profile-img"
              />
              <div className="about-experience">
                <span className="about-experience-number">IT</span>
                <span className="about-experience-text">Major</span>
              </div>
            </div>
          </div>
          
          <div className="about-text">
            <h3>Who am I?</h3>
            <p>
              I’m Zild John Lloyd M. Abule, a curious mind with a passion for coding, gaming, and adventure.
            </p>
            <p>
            Whether I’m writing lines of code, dominating mobile games, shooting hoops, or doing long rides, I’m always chasing the next challenge and experience. 
            </p>
            <p>
            I’m currently a IT student at Western Mindanao State University, blending creativity with technology in everything I do. 
            Join me as I share my journey, interests, and discoveries—one post at a time!
            </p>
            
            <div className="about-details">
              <div className="about-detail">
                <span className="about-detail-label">Name:</span>
                <span className="about-detail-value">Zild Abule</span>
              </div>
              <div className="about-detail">
                <span className="about-detail-label">Email:</span>
                <span className="about-detail-value">abule443@gmail.com</span>
              </div>
              <div className="about-detail">
                <span className="about-detail-label">Location:</span>
                <span className="about-detail-value">Zamboanga, Philippines</span>
              </div>
              <div className="about-detail">
                <span className="about-detail-label">Status:</span>
                <span className="about-detail-value">Available for Projects</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="skills-section" ref={skillsRef}>
          <h3 className="skills-title">My Skills & Expertise</h3>
          <div className="skills-overview">
            <div className="skill-summary">
              <h4>Overall Proficiency</h4>
              <div className="summary-stat">
                <span className="summary-number">80%</span>
                <span className="summary-label">Average Skill Level</span>
              </div>
            </div>
            <div className="skill-summary">
              <h4>Strongest Area</h4>
              <div className="summary-stat">
                <span className="summary-number">Frontend</span>
                <span className="summary-label">Primary Focus</span>
              </div>
            </div>
          </div>
          
          <div className="skills-categories">
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex} className="skill-category">
                <div className="category-header">
                  <i className={category.icon}></i>
                  <h4>{category.title}</h4>
                </div>
                <div className="skills-grid">
                  {category.skills.map((skill, skillIndex) => (
                    <div className="skill-item" key={skillIndex}>
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          data-level={skill.level}
                          style={{ 
                            '--skill-level': `${skill.level}%`,
                            '--skill-color': getSkillColor(skill.level)
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="skills-note">
            <p>Skill levels are based on professional experience and project involvement. I'm constantly learning and improving!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to determine skill bar color based on level
const getSkillColor = (level) => {
  if (level >= 90) return 'var(--color-orange)';
  if (level >= 80) return '#ff8834';
  if (level >= 70) return '#ffa600';
  if (level >= 60) return '#ffc107';
  return '#ffdb58';
};

export default About;