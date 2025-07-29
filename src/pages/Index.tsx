
import { Navigation } from '@/components/Navigation';
import { WeddingHero } from '@/components/WeddingHero';
import { CoupleSection } from '@/components/CoupleSection';
import { WeddingDetails } from '@/components/WeddingDetails';
import { RSVPSection } from '@/components/RSVPSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen transition-all duration-300 theme-bg theme-text">
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
