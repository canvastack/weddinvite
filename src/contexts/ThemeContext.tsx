
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
  is_default?: boolean;
}

interface ThemeContextType {
  currentTheme: ThemeSettings;
  updateTheme: (theme: ThemeSettings) => void;
  applyTheme: (theme: ThemeSettings) => void;
  resetToDefault: () => void;
}

// Default theme yang match dengan design awal
const defaultTheme: ThemeSettings = {
  id: 'default',
  name: 'Default Wedding Design',
  primary_color: '#8B5CF6', // Sesuai dengan design awal
  secondary_color: '#A78BFA',
  accent_color: '#F59E0B',
  background_color: '#FFFFFF',
  text_color: '#1F2937',
  font_family: 'Inter',
  font_size: '16px',
  border_radius: '8px',
  shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  is_active: true,
  is_default: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to convert hex to HSL
const hexToHsl = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeSettings>(() => {
    const savedTheme = localStorage.getItem('current_theme');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch {
        return defaultTheme;
      }
    }
    return defaultTheme;
  });

  const applyTheme = (theme: ThemeSettings) => {
    // Hanya apply theme custom variables, jangan override sistem design
    const root = document.documentElement;
    
    // Hanya set custom theme variables tanpa mengubah sistem design
    root.style.setProperty('--theme-primary', theme.primary_color);
    root.style.setProperty('--theme-secondary', theme.secondary_color);
    root.style.setProperty('--theme-accent', theme.accent_color);
    root.style.setProperty('--theme-background', theme.background_color);
    root.style.setProperty('--theme-text', theme.text_color);
    root.style.setProperty('--theme-font-family', theme.font_family);
    root.style.setProperty('--theme-font-size', theme.font_size);
    root.style.setProperty('--theme-border-radius', theme.border_radius);
    root.style.setProperty('--theme-shadow', theme.shadow);

    // Jangan override sistem design variables, hanya untuk preview
    console.log('Theme applied:', theme.name, theme);
  };

  const updateTheme = (theme: ThemeSettings) => {
    console.log('Updating theme to:', theme.name);
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('current_theme', JSON.stringify(theme));
  };

  const resetToDefault = () => {
    console.log('Resetting to default theme');
    setCurrentTheme(defaultTheme);
    applyTheme(defaultTheme);
    localStorage.setItem('current_theme', JSON.stringify(defaultTheme));
  };

  useEffect(() => {
    console.log('Applying initial theme:', currentTheme.name);
    applyTheme(currentTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, updateTheme, applyTheme, resetToDefault }}>
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
