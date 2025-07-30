
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

// Premium wedding design default theme yang indah
const defaultTheme: ThemeSettings = {
  id: 'default',
  name: 'Premium Wedding Design',
  primary_color: '#D4AF37', // Premium gold
  secondary_color: '#E6C866', // Light gold
  accent_color: '#CD7F32', // Rose gold bronze
  background_color: '#FFFEF7', // Warm white
  text_color: '#2C1810', // Dark brown
  font_family: 'Inter',
  font_size: '16px',
  border_radius: '12px',
  shadow: '0 20px 40px rgba(212, 175, 55, 0.15)',
  is_active: true,
  is_default: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeSettings>(() => {
    return defaultTheme;
  });

  const applyTheme = (theme: ThemeSettings) => {
    const root = document.documentElement;
    
    // Convert hex to HSL for premium theme system
    const hexToHsl = (hex: string): string => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (!result) return '45 95% 58%'; // fallback to premium gold
      
      const r = parseInt(result[1], 16) / 255;
      const g = parseInt(result[2], 16) / 255;
      const b = parseInt(result[3], 16) / 255;
      
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
      
      h = Math.round(h * 360);
      s = Math.round(s * 100);
      l = Math.round(l * 100);
      
      return `${h} ${s}% ${l}%`;
    };

    // Apply premium colors with proper HSL values
    const primaryHSL = hexToHsl(theme.primary_color);
    const secondaryHSL = hexToHsl(theme.secondary_color);
    const accentHSL = hexToHsl(theme.accent_color);
    const backgroundHSL = hexToHsl(theme.background_color);
    const textHSL = hexToHsl(theme.text_color);
    
    // Premium wedding color scheme
    root.style.setProperty('--primary', primaryHSL);
    root.style.setProperty('--primary-foreground', '0 0% 100%');
    root.style.setProperty('--secondary', secondaryHSL);
    root.style.setProperty('--secondary-foreground', textHSL);
    root.style.setProperty('--accent', accentHSL);
    root.style.setProperty('--accent-foreground', '0 0% 100%');
    root.style.setProperty('--background', backgroundHSL);
    root.style.setProperty('--foreground', textHSL);
    root.style.setProperty('--card', backgroundHSL);
    root.style.setProperty('--card-foreground', textHSL);
    root.style.setProperty('--popover', backgroundHSL);
    root.style.setProperty('--popover-foreground', textHSL);
    root.style.setProperty('--muted', '45 10% 95%');
    root.style.setProperty('--muted-foreground', '45 5% 50%');
    root.style.setProperty('--border', '45 15% 90%');
    root.style.setProperty('--input', '45 15% 92%');
    root.style.setProperty('--ring', primaryHSL);
    
    // Premium rose gold accent
    root.style.setProperty('--rose-gold', '25 75% 65%');
    
    // Premium gradients
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, hsl(${primaryHSL}) 0%, hsl(${secondaryHSL}) 100%)`);
    root.style.setProperty('--gradient-premium', `linear-gradient(135deg, hsl(${primaryHSL}) 0%, hsl(25 75% 65%) 50%, hsl(${accentHSL}) 100%)`);
    root.style.setProperty('--gradient-elegant', `linear-gradient(135deg, hsl(25 75% 65%) 0%, hsl(${secondaryHSL}) 100%)`);
    root.style.setProperty('--gradient-glow', `linear-gradient(135deg, hsl(${primaryHSL} / 0.3) 0%, hsl(25 75% 65% / 0.3) 100%)`);

    console.log('✨ Premium wedding theme applied successfully:', theme.name);
  };

  const updateTheme = (theme: ThemeSettings) => {
    console.log('🎨 Updating to premium theme:', theme.name);
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('current_theme', JSON.stringify(theme));
  };

  const resetToDefault = () => {
    console.log('🔄 Resetting to premium default wedding theme');
    setCurrentTheme(defaultTheme);
    applyTheme(defaultTheme);
    localStorage.setItem('current_theme', JSON.stringify(defaultTheme));
  };

  useEffect(() => {
    console.log('🚀 Applying premium wedding theme:', currentTheme.name);
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
