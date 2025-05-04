import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for detecting when an element is visible in the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {Function} callback - Optional callback function to run when intersection changes
 */
export const useIntersectionObserver = (options = {}, callback) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
      
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }

      if (callback) {
        callback(entry);
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    });

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options, hasIntersected, callback]);

  return { elementRef, isIntersecting, hasIntersected };
};
