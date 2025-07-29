
import { HeartIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-rose-gold/20 to-accent/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,theme(colors.primary/20),transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,theme(colors.rose-gold/20),transparent_50%)] animate-pulse animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,theme(colors.accent/20),transparent_50%)] animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Moving Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-[slide-gradient_8s_ease-in-out_infinite]"></div>
      
      <div className="relative bg-gradient-to-t from-card/95 via-card/90 to-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 gap-8 mb-12">
            {/* Couple Information */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="mb-6">
                <HeartIcon className="h-16 w-16 text-primary mx-auto lg:mx-0 mb-4 floating" />
                <h3 className="text-4xl font-bold text-gradient mb-2">
                  Dhika & Sari
                </h3>
                <p className="text-xl text-muted-foreground mb-4">
                  15 Februari 2025
                </p>
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="h-1 w-16 bg-gradient-premium rounded-full" />
                  <HeartIcon className="h-4 w-4 text-rose-gold mx-3" />
                  <div className="h-1 w-16 bg-gradient-elegant rounded-full" />
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                Dengan penuh sukacita, kami mengundang Anda untuk menjadi saksi dalam 
                perjalanan cinta kami yang akan diabadikan dalam ikatan suci pernikahan.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold text-primary mb-6 flex items-center justify-center lg:justify-start">
                <MapPinIcon className="h-5 w-5 mr-2" />
                Navigasi Cepat
              </h4>
              <div className="space-y-3">
                <a href="#hero" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover-glow">
                  Beranda
                </a>
                <a href="#couple" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover-glow">
                  Mempelai
                </a>
                <a href="#details" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover-glow">
                  Detail Acara
                </a>
                <a href="#rsvp" className="block text-muted-foreground hover:text-primary transition-colors duration-300 hover-glow">
                  RSVP
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-center lg:text-left">
              <h4 className="text-lg font-semibold text-primary mb-6 flex items-center justify-center lg:justify-start">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                Hubungi Kami
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group">
                  <PhoneIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>+62 812-3456-7890</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group">
                  <EnvelopeIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>wedding@dhikasari.com</span>
                </div>
                <div className="flex items-start justify-center lg:justify-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group">
                  <MapPinIcon className="h-5 w-5 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <p>Jakarta, Indonesia</p>
                    <p className="text-sm">Event Organizer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thank You Section */}
          <div className="elegant-card bg-card/60 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-primary/10 hover:border-primary/20 transition-all duration-500">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-gradient mb-4">
                Terima Kasih Atas Doa & Restu Anda
              </h4>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
                Kehadiran dan doa restu dari keluarga serta sahabat tercinta merupakan 
                karunia terindah bagi kami. Semoga Allah SWT senantiasa melimpahkan 
                rahmat dan berkah-Nya kepada kita semua. Barakallahu lana wa lakum.
              </p>
              
              {/* Social Actions */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="premium" size="sm" className="smoke-effect">
                  📱 WhatsApp
                </Button>
                <Button variant="elegant" size="sm" className="smoke-effect">
                  ✉️ Email
                </Button>
                <Button variant="gold" size="sm" className="smoke-effect">
                  📍 Share Lokasi
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  © 2025 Dhika & Sari Wedding Invitation
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Designed with ❤️ using Lovable & Premium Design System
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-xs text-muted-foreground">
                  <p>Made with ❤️ & 🎨</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs hover-glow">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm" className="text-xs hover-glow">
                  Terms of Service
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
