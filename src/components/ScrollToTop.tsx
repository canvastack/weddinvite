import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
    >
      <Button
        onClick={scrollToTop}
        variant="premium"
        size="icon"
        className="h-14 w-14 rounded-full shadow-glow hover:shadow-premium transition-all duration-300 group relative overflow-hidden"
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        <ChevronUpIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </Button>
    </div>
  );
};