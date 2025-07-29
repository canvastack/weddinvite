
import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon, MapPinIcon, CameraIcon, HeartIcon } from '@heroicons/react/24/outline';

export const WeddingDetails = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-rose-gold/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <CalendarIcon className="h-12 w-12 text-primary mx-auto mb-6 floating" />
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Timeline Acara
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mari bergabung dalam momen bahagia kami
          </p>
          <div className="flex items-center justify-center mt-8">
            <div className="h-1 w-20 bg-gradient-premium rounded-full" />
            <HeartIcon className="h-6 w-6 text-rose-gold mx-4" />
            <div className="h-1 w-20 bg-gradient-elegant rounded-full" />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-rose-gold to-primary rounded-full shimmer"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Akad Nikah */}
              <div className="relative flex items-center fade-in-up">
                <div className="flex-1 pr-8">
                  <div className="elegant-card bg-card/95 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-500 group">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-premium rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <CalendarIcon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gradient mb-1">Akad Nikah</h3>
                        <p className="text-muted-foreground">Ijab Qabul</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-lg">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        <span className="font-semibold">15 Februari 2025 - Sabtu</span>
                      </div>
                      <div className="flex items-center gap-3 text-lg">
                        <ClockIcon className="h-5 w-5 text-primary" />
                        <span>08:00 - 10:00 WIB</span>
                      </div>
                      <div className="flex items-start gap-3 text-lg">
                        <MapPinIcon className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="font-semibold">Masjid Al-Ikhlas</p>
                          <p className="text-muted-foreground text-sm">Jl. Melati No. 123, Jakarta Selatan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-glow floating z-10"></div>
                
                <div className="flex-1 pl-8"></div>
              </div>

              {/* Resepsi */}
              <div className="relative flex items-center fade-in-up delay-200">
                <div className="flex-1 pr-8"></div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-rose-gold rounded-full border-4 border-background shadow-elegant floating animation-delay-2000 z-10"></div>
                
                <div className="flex-1 pl-8">
                  <div className="elegant-card bg-card/95 backdrop-blur-sm rounded-3xl p-8 border border-rose-gold/20 hover:border-rose-gold/40 transition-all duration-500 group">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-elegant rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <CameraIcon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gradient mb-1">Resepsi</h3>
                        <p className="text-muted-foreground">Walimatul Ursy</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-lg">
                        <CalendarIcon className="h-5 w-5 text-rose-gold" />
                        <span className="font-semibold">15 Februari 2025 - Sabtu</span>
                      </div>
                      <div className="flex items-center gap-3 text-lg">
                        <ClockIcon className="h-5 w-5 text-rose-gold" />
                        <span>18:00 - 22:00 WIB</span>
                      </div>
                      <div className="flex items-start gap-3 text-lg">
                        <MapPinIcon className="h-5 w-5 text-rose-gold mt-1" />
                        <div>
                          <p className="font-semibold">The Grand Ballroom</p>
                          <p className="text-muted-foreground text-sm">Hotel Premium Jakarta, Jl. Sudirman No. 45</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Session */}
              <div className="relative flex items-center fade-in-up delay-400">
                <div className="flex-1 pr-8">
                  <div className="elegant-card bg-card/95 backdrop-blur-sm rounded-3xl p-8 border border-accent/20 hover:border-accent/40 transition-all duration-500 group">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <CameraIcon className="h-8 w-8 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gradient mb-1">Sesi Foto</h3>
                        <p className="text-muted-foreground">Dokumentasi Kebahagiaan</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-lg">
                        <ClockIcon className="h-5 w-5 text-foreground" />
                        <span>Tersedia sepanjang acara</span>
                      </div>
                      <div className="flex items-start gap-3 text-lg">
                        <HeartIcon className="h-5 w-5 text-foreground mt-1" />
                        <div>
                          <p className="font-semibold">Professional Photography</p>
                          <p className="text-muted-foreground text-sm">Dokumentasi oleh fotografer profesional</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent rounded-full border-4 border-background shadow-lg floating animation-delay-4000 z-10"></div>
                
                <div className="flex-1 pl-8"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-x-4 fade-in-up delay-600">
          <Button variant="premium" size="lg" className="smoke-effect shadow-glow">
            <MapPinIcon className="h-5 w-5 mr-2" />
            Lihat Lokasi Akad
          </Button>
          <Button variant="elegant" size="lg" className="smoke-effect shadow-glow">
            <MapPinIcon className="h-5 w-5 mr-2" />
            Lihat Lokasi Resepsi
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-16 fade-in-up delay-800">
          <div className="elegant-card bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-4xl mx-auto border border-primary/10">
            <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-8 text-center">
              Informasi Penting
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-primary text-lg mb-3 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Dress Code
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Kami mengundang Anda untuk mengenakan pakaian formal atau semi-formal 
                  dengan nuansa warna cream, gold, atau earth tone yang elegan.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-primary text-lg mb-3 flex items-center">
                  <HeartIcon className="h-5 w-5 mr-2" />
                  Protokol Kesehatan
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Demi kenyamanan bersama, kami menerapkan protokol kesehatan yang ketat 
                  sesuai dengan ketentuan yang berlaku saat ini.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button variant="gold" size="xl" className="smoke-effect shadow-glow">
                <CameraIcon className="h-5 w-5 mr-2" />
                Download E-Invitation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
