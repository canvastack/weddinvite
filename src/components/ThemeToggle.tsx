import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { useThemeManager } from '@/hooks/useThemeManager';

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useThemeManager();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="smoke-effect premium-hover rounded-full border border-primary/20 backdrop-blur-sm relative overflow-hidden group"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-rose-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      {isDarkMode ? (
        <SunIcon className="h-5 w-5 text-primary relative z-10 group-hover:scale-110 transition-transform" />
      ) : (
        <MoonIcon className="h-5 w-5 text-primary relative z-10 group-hover:scale-110 transition-transform" />
      )}
    </Button>
  );
};