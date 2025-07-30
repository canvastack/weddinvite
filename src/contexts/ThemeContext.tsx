
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockThemes, Theme } from '@/data/mockThemes';

interface ThemeContextType {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (themeId: string) => void;
  updateTheme: (theme: Theme) => void;
  resetToDefault: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themes, setThemes] = useState<Theme[]>(mockThemes);
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    themes.find(t => t.is_active) || themes[0]
  );
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Apply theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Convert hex to HSL
    const hexToHsl = (hex: string) => {
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

    // Set theme variables
    root.style.setProperty('--primary', hexToHsl(currentTheme.primary_color));
    root.style.setProperty('--secondary', hexToHsl(currentTheme.secondary_color));
    root.style.setProperty('--accent', hexToHsl(currentTheme.accent_color));
    root.style.setProperty('--background', hexToHsl(currentTheme.background_color));
    root.style.setProperty('--foreground', hexToHsl(currentTheme.text_color));
    
    // Set additional theme variables for gradients and effects
    root.style.setProperty('--rose-gold', hexToHsl(currentTheme.accent_color));
    root.style.setProperty('--primary-glow', hexToHsl(currentTheme.primary_color));
    
    // Apply font family
    root.style.setProperty('--font-family', currentTheme.font_family);
    document.body.style.fontFamily = `${currentTheme.font_family}, system-ui, sans-serif`;
    
    // Apply dark mode class
    root.classList.toggle('dark', isDarkMode);
    
  }, [currentTheme, isDarkMode]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      // Update active status
      setThemes(themes.map(t => ({ ...t, is_active: t.id === themeId })));
    }
  };

  const updateTheme = (updatedTheme: Theme) => {
    setThemes(themes.map(t => t.id === updatedTheme.id ? updatedTheme : t));
    if (currentTheme.id === updatedTheme.id) {
      setCurrentTheme(updatedTheme);
    }
  };

  const resetToDefault = () => {
    const defaultTheme = mockThemes[0]; // Classic Gold as default
    setCurrentTheme(defaultTheme);
    setThemes(mockThemes);
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      themes,
      setTheme,
      updateTheme,
      resetToDefault,
      isDarkMode,
      toggleDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
