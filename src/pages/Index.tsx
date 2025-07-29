
import { useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { WeddingHero } from '@/components/WeddingHero';
import { CoupleSection } from '@/components/CoupleSection';
import { WeddingDetails } from '@/components/WeddingDetails';
import { RSVPSection } from '@/components/RSVPSection';
import { Footer } from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const { currentTheme } = useTheme();

  // Apply theme styles to the body and main elements
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme variables as CSS custom properties
    root.style.setProperty('--theme-primary', currentTheme.primary_color);
    root.style.setProperty('--theme-secondary', currentTheme.secondary_color);
    root.style.setProperty('--theme-accent', currentTheme.accent_color);
    root.style.setProperty('--theme-background', currentTheme.background_color);
    root.style.setProperty('--theme-text', currentTheme.text_color);
    root.style.setProperty('--theme-font-family', currentTheme.font_family);
    root.style.setProperty('--theme-font-size', currentTheme.font_size);
    root.style.setProperty('--theme-border-radius', currentTheme.border_radius);
    root.style.setProperty('--theme-shadow', currentTheme.shadow);
    
    // Apply to document body
    document.body.style.fontFamily = currentTheme.font_family;
    document.body.style.fontSize = currentTheme.font_size;
    document.body.style.backgroundColor = currentTheme.background_color;
    document.body.style.color = currentTheme.text_color;
  }, [currentTheme]);

  return (
    <div 
      className="min-h-screen transition-all duration-300"
      style={{
        fontFamily: currentTheme.font_family,
        fontSize: currentTheme.font_size,
        backgroundColor: currentTheme.background_color,
        color: currentTheme.text_color
      }}
    >
      <Navigation />
      
      <main>
        <div id="hero">
          <WeddingHero />
        </div>
        
        <div id="couple">
          <CoupleSection />
        </div>
        
        <div id="details">
          <WeddingDetails />
        </div>
        
        <div id="rsvp">
          <RSVPSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
