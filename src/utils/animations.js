/**
 * Animation utility functions for components
 */

/**
 * Get staggered animation delay based on index
 * @param {number} index - Element index
 * @param {number} baseDelay - Base delay in seconds
 * @returns {string} CSS delay value
 */
export const getStaggeredDelay = (index, baseDelay = 0.1) => {
    return `${index * baseDelay}s`;
  };
  
  /**
   * Get CSS variables for animations
   * @param {Object} options - Animation options
   * @returns {Object} CSS variables object
   */
  export const getAnimationVars = (options = {}) => {
    const {
      delay = 0,
      duration = 0.5,
      distance = 30,
      direction = 'up'
    } = options;
    
    let transform = '';
    
    switch (direction) {
      case 'up':
        transform = `translateY(${distance}px)`;
        break;
      case 'down':
        transform = `translateY(-${distance}px)`;
        break;
      case 'left':
        transform = `translateX(${distance}px)`;
        break;
      case 'right':
        transform = `translateX(-${distance}px)`;
        break;
      default:
        transform = `translateY(${distance}px)`;
    }
    
    return {
      '--animation-delay': `${delay}s`,
      '--animation-duration': `${duration}s`,
      '--transform-from': transform
    };
  };