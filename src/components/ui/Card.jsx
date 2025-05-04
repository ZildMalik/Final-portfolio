import React from 'react';
import '../../styles/components/card.css';

const Card = ({ 
  children, 
  variant = 'default',
  isHoverable = false,
  className = '',
  ...props 
}) => {
  const cardClasses = `
    card 
    card--${variant} 
    ${isHoverable ? 'card--hoverable' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses.trim()} {...props}>
      {children}
    </div>
  );
};

export default Card;