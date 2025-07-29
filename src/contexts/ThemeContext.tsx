
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ThemeSettings {
  id: string;
  name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  font_family: string;
  font_size: string;
  border_radius: string;
  shadow: string;
  is_active: boolean;
}

interface ThemeContextType {
  currentTheme: ThemeSettings;
  updateTheme: (theme: ThemeSettings) => void;
  applyTheme: (theme: ThemeSettings) => void;
}

const defaultTheme: ThemeSettings = {
  id: '1',
  name: 'Classic Elegant',
  primary_color: '#8B5CF6',
  secondary_color: '#A78BFA',
  accent_color: '#F59E0B',
  background_color: '#FFFFFF',
  text_color: '#1F2937',
  font_family: 'Inter',
  font_size: '16px',
  border_radius: '8px',
  shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  is_active: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeSettings>(() => {
    const savedTheme = localStorage.getItem('current_theme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  const applyTheme = (theme: ThemeSettings) => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--theme-primary', theme.primary_color);
    root.style.setProperty('--theme-secondary', theme.secondary_color);
    root.style.setProperty('--theme-accent', theme.accent_color);
    root.style.setProperty('--theme-background', theme.background_color);
    root.style.setProperty('--theme-text', theme.text_color);
    root.style.setProperty('--theme-font-family', theme.font_family);
    root.style.setProperty('--theme-font-size', theme.font_size);
    root.style.setProperty('--theme-border-radius', theme.border_radius);
    root.style.setProperty('--theme-shadow', theme.shadow);
  };

  const updateTheme = (theme: ThemeSettings) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('current_theme', JSON.stringify(theme));
  };

  useEffect(() => {
    applyTheme(currentTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, updateTheme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
