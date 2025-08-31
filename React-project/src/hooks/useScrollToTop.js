import { useEffect } from 'react';
import { useLocation } from 'react-router';

// Hook to scroll to top on route change
export const useScrollToTop = (smooth = false) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, smooth]);
};

// Manual scroll to top function
export const scrollToTop = (smooth = false) => {
  if (smooth) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo(0, 0);
  }
};

// Hook to scroll to specific element
export const useScrollToElement = (elementId, smooth = true) => {
  const scrollToElement = () => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto',
        block: 'start'
      });
    }
  };

  return scrollToElement;
};

export default useScrollToTop;
