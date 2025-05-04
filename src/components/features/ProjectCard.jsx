import { useEffect, useRef } from 'react';
import Button from '../ui/Button';
import '../../styles/components/project-card.css';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Add delay based on index for staggered animation
            entry.target.style.transitionDelay = `${(index % 4) * 0.15}s`;
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
    <div className="project-card" ref={cardRef}>
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <div className="project-overlay">
          <div className="project-links">
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="small">Live Demo</Button>
            </a>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="small">GitHub</Button>
            </a>
          </div>
        </div>
      </div>
      <div className="project-content">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.technologies.map((tech, techIndex) => (
            <span key={techIndex} className="project-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;