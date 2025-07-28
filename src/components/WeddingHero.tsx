import { Button } from '@/components/ui/button';
import { HeartIcon, CalendarIcon } from '@heroicons/react/24/outline';
import heroImage from '@/assets/wedding-hero.jpg';

export const WeddingHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Wedding Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60 dark:from-background/60 dark:via-background/40 dark:to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Floating Heart Icon */}
          <div className="floating mb-8">
            <HeartIcon className="h-16 w-16 text-primary mx-auto mb-6" />
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 fade-in-up">
            <span className="text-gradient">Dhika</span>
            <span className="block text-foreground my-4">&</span>
            <span className="text-gradient">Sari</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 fade-in-up delay-200 font-light">
            Merayakan Cinta yang Abadi
          </p>

          {/* Wedding Date */}
          <div className="elegant-card bg-card/80 backdrop-blur-sm rounded-2xl p-8 mb-12 inline-block fade-in-up delay-300">
            <div className="flex items-center justify-center gap-4 mb-4">
              <CalendarIcon className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-primary">Tanggal Pernikahan</span>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">
              15 Februari 2025
            </p>
            <p className="text-lg text-muted-foreground">
              Sabtu, 14:00 WIB
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up delay-400">
            <Button variant="premium" size="xl" className="min-w-48">
              Lihat Undangan
            </Button>
            <Button variant="elegant" size="xl" className="min-w-48">
              Konfirmasi Kehadiran
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 fade-in-up delay-500">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm font-medium">Scroll untuk melanjutkan</span>
              <div className="w-1 h-8 bg-primary/30 rounded-full">
                <div className="w-1 h-4 bg-primary rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};