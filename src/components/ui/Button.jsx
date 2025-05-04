import React from 'react';
import '../../styles/components/button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  isFullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) => {
  const buttonClasses = `
    button 
    button--${variant} 
    button--${size} 
    ${isFullWidth ? 'button--full-width' : ''}
    ${className}
  `;

  return (
    <button
      className={buttonClasses.trim()}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;