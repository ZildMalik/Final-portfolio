import { useEffect, useRef } from 'react';
import '../../styles/components/experience-card.css';

const ExperienceCard = ({ experience, position, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add delay based on index for staggered animation
            entry.target.style.transitionDelay = `${index * 0.2}s`;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      className={`experience-card experience-card--${position}`} 
      ref={cardRef}
    >
      <div className="experience-card__content">
        <span className="experience-date">{experience.period}</span>
        <h3 className="experience-title">{experience.title}</h3>
        <h4 className="experience-company">{experience.company}</h4>
        <p className="experience-description">{experience.description}</p>
        
        {experience.skills && (
          <div className="experience-skills">
            {experience.skills.map((skill, skillIndex) => (
              <span key={skillIndex} className="experience-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="experience-dot"></div>
    </div>
  );
};

export default ExperienceCard;