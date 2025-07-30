
import { Button } from '@/components/ui/button';
import { HeartIcon, CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import heroImage from '@/assets/wedding-hero.jpg';

export const WeddingHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-rose-gold/25 to-accent/30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tl from-background/70 via-transparent to-primary/40 opacity-90" />
        
        {/* Animated blob shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/40 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-blob" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-gold/50 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/40 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-blob animation-delay-4000" />
          <div className="absolute -top-48 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" />
        </div>
        
        {/* Hero image with enhanced overlay */}
        <img 
          src={heroImage} 
          alt="Wedding Hero Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background/70 dark:from-background/80 dark:via-background/40 dark:to-background/90" />
      </div>

      {/* Premium Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Floating Heart Icon */}
          <div className="floating mb-16">
            <div className="relative">
              <HeartIcon className="h-24 w-24 text-primary mx-auto mb-8 drop-shadow-2xl filter" />
              <div className="absolute inset-0 h-24 w-24 mx-auto animate-ping opacity-30">
                <HeartIcon className="h-24 w-24 text-rose-gold" />
              </div>
              <div className="absolute inset-0 h-24 w-24 mx-auto">
                <div className="w-full h-full rounded-full bg-primary/20 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Premium Main Heading */}
          <div className="mb-16">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold mb-12 fade-in-up">
              <span className="text-gradient block mb-6 hover:scale-105 transition-transform duration-500 text-shadow-premium">
                Dhika
              </span>
              <div className="flex items-center justify-center my-10">
                <div className="h-2 w-20 bg-gradient-premium rounded-full mx-6 shadow-glow" />
                <HeartIcon className="h-10 w-10 text-rose-gold floating drop-shadow-xl" />
                <div className="h-2 w-20 bg-gradient-premium rounded-full mx-6 shadow-glow" />
              </div>
              <span className="text-gradient block hover:scale-105 transition-transform duration-500 text-shadow-premium">
                Sari
              </span>
            </h1>
          </div>

          {/* Enhanced Premium Subtitle */}
          <div className="mb-16 fade-in-up delay-200">
            <p className="text-3xl md:text-4xl text-muted-foreground mb-6 font-light leading-relaxed">
              Merayakan Cinta yang Abadi
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-4xl mx-auto leading-relaxed font-light">
              Dengan penuh rasa syukur kepada Allah SWT, kami mengundang Anda untuk menjadi saksi 
              dalam ikatan suci pernikahan kami
            </p>
          </div>

          {/* Premium Wedding Information Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 fade-in-up delay-300">
            {/* Enhanced Date & Time Card */}
            <div className="premium-card bg-card/95 backdrop-blur-premium rounded-3xl p-10 border-2 border-primary/20 group hover:border-primary/50 hover:shadow-premium">
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="p-4 rounded-full bg-primary/15 group-hover:bg-primary/25 transition-all duration-300 group-hover:scale-110">
                  <CalendarIcon className="h-10 w-10 text-primary" />
                </div>
                <div className="text-left">
                  <span className="text-lg font-bold text-primary block">Tanggal Pernikahan</span>
                  <span className="text-sm text-muted-foreground">Save the Date</span>
                </div>
              </div>
              <p className="text-4xl md:text-5xl font-bold text-gradient mb-4 group-hover:scale-105 transition-transform duration-300">
                15 Februari 2025
              </p>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <ClockIcon className="h-6 w-6" />
                <span className="text-xl font-medium">Sabtu, 14:00 WIB</span>
              </div>
            </div>

            {/* Enhanced Location Card */}
            <div className="premium-card bg-card/95 backdrop-blur-premium rounded-3xl p-10 border-2 border-rose-gold/20 group hover:border-rose-gold/50 hover:shadow-premium">
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="p-4 rounded-full bg-rose-gold/15 group-hover:bg-rose-gold/25 transition-all duration-300 group-hover:scale-110">
                  <MapPinIcon className="h-10 w-10 text-rose-gold" />
                </div>
                <div className="text-left">
                  <span className="text-lg font-bold text-rose-gold block">Lokasi Acara</span>
                  <span className="text-sm text-muted-foreground">Wedding Venue</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-rose-gold mb-4 group-hover:scale-105 transition-transform duration-300">
                Gedung Serbaguna
              </p>
              <p className="text-muted-foreground text-lg">
                Jl. Merdeka No. 123, Jakarta Pusat
              </p>
            </div>
          </div>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center fade-in-up delay-400 mb-20">
            <Button 
              size="xl" 
              className="min-w-64 h-16 text-lg font-semibold bg-gradient-premium hover:shadow-glow transition-all duration-500 group relative overflow-hidden border-0"
            >
              <span className="relative z-10 flex items-center gap-4">
                <HeartIcon className="h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
                Lihat Undangan Lengkap
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-rose-gold/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="min-w-64 h-16 text-lg font-semibold border-2 border-primary/30 hover:border-primary hover:shadow-glow group relative overflow-hidden backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center gap-4">
                <CalendarIcon className="h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
                Konfirmasi Kehadiran
              </span>
            </Button>
          </div>

          {/* Premium Wedding Countdown */}
          <div className="premium-card bg-card/90 backdrop-blur-premium rounded-3xl p-10 max-w-3xl mx-auto mb-16 fade-in-up delay-500 border-2 border-primary/10 hover:border-primary/30">
            <h3 className="text-2xl font-bold text-gradient mb-8">Menuju Hari Bahagia</h3>
            <div className="grid grid-cols-4 gap-6 text-center">
              <div className="bg-primary/15 rounded-2xl p-6 hover:bg-primary/20 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-primary mb-2">45</div>
                <div className="text-sm text-muted-foreground font-medium">Hari</div>
              </div>
              <div className="bg-rose-gold/15 rounded-2xl p-6 hover:bg-rose-gold/20 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-rose-gold mb-2">12</div>
                <div className="text-sm text-muted-foreground font-medium">Jam</div>
              </div>
              <div className="bg-accent/20 rounded-2xl p-6 hover:bg-accent/25 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-foreground mb-2">30</div>
                <div className="text-sm text-muted-foreground font-medium">Menit</div>
              </div>
              <div className="bg-secondary/30 rounded-2xl p-6 hover:bg-secondary/35 transition-all duration-300 hover:scale-105">
                <div className="text-3xl font-bold text-foreground mb-2">15</div>
                <div className="text-sm text-muted-foreground font-medium">Detik</div>
              </div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 fade-in-up delay-600">
            <div className="flex flex-col items-center gap-4 text-muted-foreground group cursor-pointer hover:text-primary transition-colors">
              <span className="text-lg font-medium group-hover:text-primary transition-colors">
                Scroll untuk melanjutkan
              </span>
              <div className="relative">
                <div className="w-2 h-16 bg-primary/40 rounded-full group-hover:bg-primary/60 transition-colors">
                  <div className="w-2 h-8 bg-primary rounded-full animate-bounce" />
                </div>
                <div className="absolute inset-0 w-2 h-16 bg-primary/20 rounded-full animate-pulse group-hover:bg-primary/30 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-24 left-24 opacity-40">
        <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
      </div>
      <div className="absolute top-48 right-36 opacity-40">
        <div className="w-4 h-4 bg-rose-gold rounded-full animate-pulse" />
      </div>
      <div className="absolute bottom-48 left-36 opacity-40">
        <div className="w-3 h-3 bg-accent rounded-full animate-bounce" />
      </div>
      <div className="absolute top-1/3 right-24 opacity-30">
        <div className="w-2 h-2 bg-secondary rounded-full animate-ping animation-delay-2000" />
      </div>
    </section>
  );
};
