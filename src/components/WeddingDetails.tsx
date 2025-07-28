import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon, MapPinIcon, CameraIcon } from '@heroicons/react/24/outline';

export const WeddingDetails = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <CalendarIcon className="h-12 w-12 text-primary mx-auto mb-6 floating" />
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Detail Acara
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mari bergabung dalam momen bahagia kami
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Akad Nikah */}
          <div className="elegant-card bg-card rounded-3xl p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-premium rounded-full mx-auto mb-6 flex items-center justify-center">
                <CalendarIcon className="h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                Akad Nikah
              </h3>
              <p className="text-muted-foreground">Ijab Qabul</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                <CalendarIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-primary">15 Februari 2025</p>
                  <p className="text-sm text-muted-foreground">Sabtu</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                <ClockIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-primary">08:00 - 10:00 WIB</p>
                  <p className="text-sm text-muted-foreground">Pagi Hari</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-primary">Masjid Al-Ikhlas</p>
                  <p className="text-sm text-muted-foreground">
                    Jl. Melati No. 123, Jakarta Selatan<br />
                    Jakarta 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button variant="gold" className="flex-1 smoke-effect">
                <MapPinIcon className="h-4 w-4 mr-2" />
                Lihat Lokasi
              </Button>
              <Button variant="outline" className="smoke-effect">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Resepsi */}
          <div className="elegant-card bg-card rounded-3xl p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-elegant rounded-full mx-auto mb-6 flex items-center justify-center">
                <CameraIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                Resepsi
              </h3>
              <p className="text-muted-foreground">Walimatul Ursy</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                <CalendarIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-primary">15 Februari 2025</p>
                  <p className="text-sm text-muted-foreground">Sabtu</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                <ClockIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-primary">18:00 - 22:00 WIB</p>
                  <p className="text-sm text-muted-foreground">Malam Hari</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
                <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-primary">The Grand Ballroom</p>
                  <p className="text-sm text-muted-foreground">
                    Hotel Premium Jakarta<br />
                    Jl. Sudirman No. 45, Jakarta Pusat<br />
                    Jakarta 10110
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button variant="gold" className="flex-1 smoke-effect">
                <MapPinIcon className="h-4 w-4 mr-2" />
                Lihat Lokasi
              </Button>
              <Button variant="outline" className="smoke-effect">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="elegant-card bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-6">
              Informasi Tambahan
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-primary mb-3">Dress Code</h4>
                <p className="text-muted-foreground mb-4">
                  Kami mengundang Anda untuk mengenakan pakaian formal atau semi-formal 
                  dengan nuansa warna cream, gold, atau earth tone.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-3">Protokol Kesehatan</h4>
                <p className="text-muted-foreground mb-4">
                  Demi kenyamanan bersama, kami menerapkan protokol kesehatan yang ketat 
                  sesuai dengan ketentuan yang berlaku.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Button variant="premium" size="lg" className="smoke-effect">
                Download E-Invitation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};