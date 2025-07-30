
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="premium-hover rounded-full border-2 border-primary/30 backdrop-blur-premium bg-card/80 hover:border-primary/50 hover:bg-primary/10 hover:shadow-glow transition-all duration-300"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6 text-primary transition-transform duration-300 hover:rotate-12" />
      ) : (
        <SunIcon className="h-6 w-6 text-primary transition-transform duration-300 hover:rotate-12" />
      )}
    </Button>
  );
};
