import { useEffect, useRef } from 'react';
import '../../styles/components/certificate-card.css';

const CertificateCard = ({ certificate, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.style.transitionDelay = `${index * 0.15}s`;
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
    <div className="certificate-card" ref={cardRef}>
      <div className="certificate-card__content">
        <div className="certificate-header">
          <h3 className="certificate-title">{certificate.title}</h3>
          <span className="certificate-date">{certificate.date}</span>
        </div>
        
        <h4 className="certificate-issuer">{certificate.issuer}</h4>
        <p className="certificate-description">{certificate.description}</p>
        
        {certificate.skills && (
          <div className="certificate-skills">
            {certificate.skills.map((skill, skillIndex) => (
              <span key={skillIndex} className="certificate-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        )}
        
        <div className="certificate-footer">
          <span className="certificate-id">ID: {certificate.credentialId}</span>
          {certificate.link && (
            <a 
              href={certificate.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="certificate-link"
            >
              Verify Credential
              <i className="fas fa-external-link-alt"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;