import { useEffect, useRef } from 'react';
import SectionHeading from '../ui/SectionHeading';
import ExperienceCard from '../features/ExperienceCard';
import EducationCard from '../features/EducationCard';
import CertificateCard from '../features/CertificateCard';
import experiences from '../../data/experiences';
import { education } from '../../data/education';
import { certificates } from '../../data/education';
import '../../styles/sections/experiences.css';

const Experiences = () => {
  const experiencesRef = useRef(null);
  const educationRef = useRef(null);
  const certificatesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (experiencesRef.current) {
      observer.observe(experiencesRef.current);
    }
    if (educationRef.current) {
      observer.observe(educationRef.current);
    }
    if (certificatesRef.current) {
      observer.observe(certificatesRef.current);
    }

    return () => {
      if (experiencesRef.current) {
        observer.unobserve(experiencesRef.current);
      }
      if (educationRef.current) {
        observer.unobserve(educationRef.current);
      }
      if (certificatesRef.current) {
        observer.unobserve(certificatesRef.current);
      }
    };
  }, []);

  return (
    <section id="experiences" className="experiences">
      <div className="container">
        <SectionHeading 
          title="Professional Journey" 
          subtitle="My experience, education, and certifications"
          centered
        />
        
        <div className="experience-section">
          <h3 className="experience-section-title">Experience</h3>
          <div className="experiences-timeline" ref={experiencesRef}>
            {experiences.map((experience, index) => (
              <ExperienceCard 
                key={index}
                experience={experience}
                position={index % 2 === 0 ? 'left' : 'right'}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="experience-section">
          <h3 className="experience-section-title">Education</h3>
          <div className="experiences-timeline" ref={educationRef}>
            {education.map((edu, index) => (
              <EducationCard 
                key={index}
                education={edu}
                position={index % 2 === 0 ? 'left' : 'right'}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="experience-section">
          <h3 className="experience-section-title">Certifications</h3>
          <div className="certificates-grid" ref={certificatesRef}>
            {certificates.map((certificate, index) => (
              <CertificateCard 
                key={index}
                certificate={certificate}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;