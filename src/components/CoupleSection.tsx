import { Button } from '@/components/ui/button';
import { HeartIcon, UserIcon } from '@heroicons/react/24/outline';

export const CoupleSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <HeartIcon className="h-12 w-12 text-primary mx-auto mb-6 floating" />
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Mempelai
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dua hati yang bersatu dalam cinta dan komitmen
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Groom */}
          <div className="elegant-card bg-card rounded-3xl p-8 md:p-12 text-center">
            <div className="w-32 h-32 bg-gradient-premium rounded-full mx-auto mb-8 flex items-center justify-center">
              <UserIcon className="h-16 w-16 text-primary-foreground" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Dhika Pratama
            </h3>
            <div className="space-y-3 text-muted-foreground mb-8">
              <p className="text-lg">
                Putra dari Bapak Suyanto & Ibu Siti Aminah
              </p>
              <p>
                Software Engineer yang passionate dalam teknologi dan inovasi. 
                Memiliki hobi fotografi dan traveling.
              </p>
            </div>
            <Button variant="gold" className="smoke-effect">
              Lihat Profil
            </Button>
          </div>

          {/* Bride */}
          <div className="elegant-card bg-card rounded-3xl p-8 md:p-12 text-center">
            <div className="w-32 h-32 bg-gradient-elegant rounded-full mx-auto mb-8 flex items-center justify-center">
              <UserIcon className="h-16 w-16 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Sari Indah
            </h3>
            <div className="space-y-3 text-muted-foreground mb-8">
              <p className="text-lg">
                Putri dari Bapak Ahmad Wijaya & Ibu Rahayu
              </p>
              <p>
                Dokter yang berdedikasi untuk kesehatan masyarakat. 
                Hobi memasak dan berkebun di waktu luang.
              </p>
            </div>
            <Button variant="gold" className="smoke-effect">
              Lihat Profil
            </Button>
          </div>
        </div>

        {/* Love Story */}
        <div className="mt-20 text-center">
          <div className="elegant-card bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <HeartIcon className="h-10 w-10 text-rose-gold mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-gradient mb-6">
              Kisah Cinta Kami
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Pertemuan pertama kami di kampus pada tahun 2019 telah membawa kami 
              menuju jalan yang indah ini. Dari persahabatan yang tulus, berkembang 
              menjadi cinta yang mendalam, dan kini kami siap melangkah bersama 
              menuju masa depan yang penuh berkah.
            </p>
            <Button variant="elegant" size="lg" className="smoke-effect">
              Baca Cerita Lengkap
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};