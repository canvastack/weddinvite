import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
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
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={cn(
        "fixed bottom-8 right-8 z-50 transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <Button
        onClick={scrollToTop}
        variant="premium"
        size="icon"
        className="h-12 w-12 rounded-full shadow-glow hover:shadow-premium transition-all duration-300 group"
      >
        <ChevronUpIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </Button>
    </div>
  );
};