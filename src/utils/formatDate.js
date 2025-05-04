/**
 * Format a date string or Date object into different formats
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {Object} Formatted date parts
 */
export const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    
    // Return object with different date formats
    return {
      // Numeric day (1-31)
      day: date.getDate(),
      
      // Month name (January, February, etc.)
      month: date.toLocaleString('default', { month: 'short' }),
      
      // Month name (Jan, Feb, etc.)
      monthShort: date.toLocaleString('default', { month: 'short' }),
      
      // Full year (2023)
      year: date.getFullYear(),
      
      // Formatted date (e.g., "Oct 15, 2023")
      formatted: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      
      // ISO format (2023-10-15)
      iso: date.toISOString().split('T')[0],
      
      // Time ago (e.g., "2 days ago")
      timeAgo: getTimeAgo(date)
    };
  };
  
  /**
   * Get relative time description (e.g., "2 days ago")
   * @param {Date} date - Date to compare with current date
   * @returns {string} Relative time description
   */
  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? '1 day ago' : `${interval} days ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
    
    return 'Just now';
  };
  