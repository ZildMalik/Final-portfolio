import { useEffect, useRef } from 'react';
import '../../styles/components/education-card.css';

const EducationCard = ({ education, position, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
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
      className={`education-card education-card--${position}`} 
      ref={cardRef}
    >
      <div className="education-card__content">
        <span className="education-period">{education.period}</span>
        <h3 className="education-degree">{education.degree}</h3>
        <h4 className="education-school">{education.school}</h4>
        <p className="education-description">{education.description}</p>
        
        {education.achievements && (
          <div className="education-achievements">
            <h5>Key Achievements:</h5>
            <ul>
              {education.achievements.map((achievement, achieveIndex) => (
                <li key={achieveIndex}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="education-dot"></div>
    </div>
  );
};

export default EducationCard;

