import { Navigation } from '@/components/Navigation';
import { WeddingHero } from '@/components/WeddingHero';
import { CoupleSection } from '@/components/CoupleSection';
import { WeddingDetails } from '@/components/WeddingDetails';
import { RSVPSection } from '@/components/RSVPSection';
import { Footer } from '@/components/Footer';
import { ThemeWrapper } from '@/components/ThemeWrapper';

const Index = () => {
  return (
    <ThemeWrapper className="min-h-screen">
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
    </ThemeWrapper>
  );
};

export default Index;
