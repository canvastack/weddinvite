import React from 'react';
import { useThemeManager } from '@/hooks/useThemeManager';

interface ThemeWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children, className = '' }) => {
  const { currentTheme, isDefaultMode } = useThemeManager();

  // In default mode, render children without any theme modifications
  if (isDefaultMode || currentTheme.isDefault) {
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
        '--dynamic-primary': currentTheme.colors.primary,
        '--dynamic-primary-glow': currentTheme.colors.primaryGlow,
        '--dynamic-secondary': currentTheme.colors.secondary,
        '--dynamic-accent': currentTheme.colors.accent,
        '--dynamic-rose-gold': currentTheme.colors.roseGold,
        '--dynamic-background': currentTheme.colors.background,
        '--dynamic-card': currentTheme.colors.card,
        '--dynamic-text': currentTheme.colors.text,
        '--dynamic-muted': currentTheme.colors.muted,
        '--dynamic-border': currentTheme.colors.border,
        '--dynamic-font-family': currentTheme.typography.fontFamily,
        '--dynamic-font-size': currentTheme.typography.fontSize,
        '--dynamic-radius': currentTheme.layout.borderRadius,
        '--dynamic-spacing': currentTheme.layout.spacing,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};