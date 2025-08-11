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
      className="smoke-effect premium-hover rounded-full border border-primary/20 backdrop-blur-sm"
    >
      {isDarkMode ? (
        <SunIcon className="h-5 w-5 text-primary" />
      ) : (
        <MoonIcon className="h-5 w-5 text-primary" />
      )}
    </Button>
  );
};