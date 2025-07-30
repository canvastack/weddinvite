
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

// Default theme yang match dengan design premium
const defaultTheme: ThemeSettings = {
  id: 'default',
  name: 'Premium Wedding Design',
  primary_color: '#8B5CF6',
  secondary_color: '#A78BFA',
  accent_color: '#F59E0B',
  background_color: '#FFFFFF',
  text_color: '#1F2937',
  font_family: 'Inter',
  font_size: '16px',
  border_radius: '12px',
  shadow: '0 20px 40px rgba(139, 92, 246, 0.15)',
  is_active: true,
  is_default: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeSettings>(() => {
    // Always start with default theme untuk memastikan konsistensi
    return defaultTheme;
  });

  const applyTheme = (theme: ThemeSettings) => {
    const root = document.documentElement;
    
    // Apply theme variables dengan nilai yang benar
    root.style.setProperty('--theme-primary', theme.primary_color);
    root.style.setProperty('--theme-secondary', theme.secondary_color);
    root.style.setProperty('--theme-accent', theme.accent_color);
    root.style.setProperty('--theme-background', theme.background_color);
    root.style.setProperty('--theme-text', theme.text_color);
    root.style.setProperty('--theme-font-family', theme.font_family);
    root.style.setProperty('--theme-font-size', theme.font_size);
    root.style.setProperty('--theme-border-radius', theme.border_radius);
    root.style.setProperty('--theme-shadow', theme.shadow);

    // Set proper HSL values untuk primary colors
    const primaryHSL = '248 53% 58%'; // #8B5CF6
    const secondaryHSL = '246 32% 75%'; // #A78BFA
    const accentHSL = '43 96% 56%'; // #F59E0B
    const roseGoldHSL = '25 100% 80%';

    root.style.setProperty('--primary', primaryHSL);
    root.style.setProperty('--secondary', secondaryHSL);
    root.style.setProperty('--accent', accentHSL);
    root.style.setProperty('--rose-gold', roseGoldHSL);
    
    // Update gradients
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${theme.primary_color} 0%, ${theme.secondary_color} 100%)`);
    root.style.setProperty('--gradient-premium', `linear-gradient(135deg, ${theme.primary_color} 0%, hsl(${roseGoldHSL}) 50%, ${theme.accent_color} 100%)`);
    root.style.setProperty('--gradient-elegant', `linear-gradient(135deg, hsl(${roseGoldHSL}) 0%, ${theme.secondary_color} 100%)`);

    console.log('✅ Premium theme applied successfully:', theme.name);
  };

  const updateTheme = (theme: ThemeSettings) => {
    console.log('🎨 Updating theme to:', theme.name);
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('current_theme', JSON.stringify(theme));
  };

  const resetToDefault = () => {
    console.log('🔄 Resetting to premium default theme');
    setCurrentTheme(defaultTheme);
    applyTheme(defaultTheme);
    localStorage.setItem('current_theme', JSON.stringify(defaultTheme));
  };

  useEffect(() => {
    console.log('🚀 Applying initial premium theme:', currentTheme.name);
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
