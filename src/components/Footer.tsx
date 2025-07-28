import { HeartIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-muted/30 to-background py-16">
      <div className="container mx-auto px-6">
        <div className="text-center">
          {/* Logo & Names */}
          <div className="mb-8">
            <HeartIcon className="h-12 w-12 text-primary mx-auto mb-4 floating" />
            <h3 className="text-3xl font-bold text-gradient mb-2">
              Dhika & Sari
            </h3>
            <p className="text-lg text-muted-foreground">
              15 Februari 2025
            </p>
          </div>

          {/* Thank You Message */}
          <div className="elegant-card bg-card/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <h4 className="text-xl font-semibold text-gradient mb-4">
              Terima Kasih
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Atas doa, restu, dan kehadiran Anda di hari bahagia kami. 
              Semoga Allah SWT senantiasa melimpahkan rahmat dan berkah-Nya 
              kepada kita semua.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button variant="outline" size="sm" className="smoke-effect">
              📱 +62 812-3456-7890
            </Button>
            <Button variant="outline" size="sm" className="smoke-effect">
              ✉️ wedding@dhikasari.com
            </Button>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              © 2025 Dhika & Sari Wedding. Made with ❤️ using Lovable
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};