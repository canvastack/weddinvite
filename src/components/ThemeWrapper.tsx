import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children, className = '' }) => {
  const { currentTheme, isDefaultMode } = useTheme();

  // In default mode, render children without any theme modifications
  if (isDefaultMode || currentTheme.is_default) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  // For managed themes, apply theme-specific classes and styles
  return (
    <div 
      className={`${className} theme-${currentTheme.id}`}
      style={{
        '--dynamic-primary': currentTheme.primary_color,
        '--dynamic-primary-glow': currentTheme.primary_glow,
        '--dynamic-secondary': currentTheme.secondary_color,
        '--dynamic-accent': currentTheme.accent_color,
        '--dynamic-rose-gold': currentTheme.rose_gold,
        '--dynamic-background': currentTheme.background_color,
        '--dynamic-card': currentTheme.card_color,
        '--dynamic-text': currentTheme.text_color,
        '--dynamic-muted': currentTheme.muted_color,
        '--dynamic-border': currentTheme.border_color,
        '--dynamic-font-family': currentTheme.font_family,
        '--dynamic-font-size': currentTheme.font_size,
        '--dynamic-radius': currentTheme.border_radius,
        '--dynamic-spacing': currentTheme.spacing,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};