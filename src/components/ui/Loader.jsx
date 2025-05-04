import React from 'react';
import '../../styles/components/loader.css';

const Loader = ({ size = 'medium', className = '', ...props }) => {
  const loaderClasses = `
    loader
    loader--${size}
    ${className}
  `;

  return (
    <div className={loaderClasses.trim()} {...props}>
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;