import React from 'react';
import '../../styles/components/section-heading.css';

const SectionHeading = ({ 
  title, 
  subtitle,
  centered = false,
  className = '',
  ...props 
}) => {
  const headingClasses = `
    section-heading 
    ${centered ? 'section-heading--centered' : ''}
    ${className}
  `;

  return (
    <div className={headingClasses.trim()} {...props}>
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;