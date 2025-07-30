
import { Button } from '@/components/ui/button';
import { HeartIcon, UserIcon, CameraIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export const CoupleSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/15 rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-gold/15 rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <HeartIcon className="h-20 w-20 text-primary mx-auto mb-10 floating drop-shadow-2xl" />
          <h2 className="section-title mb-8">
            Mempelai
          </h2>
          <p className="section-subtitle mb-10">
            Dua hati yang bersatu dalam cinta dan komitmen, siap membangun masa depan bersama dalam berkah Allah SWT
          </p>
          <div className="flex items-center justify-center mt-10">
            <div className="h-2 w-24 bg-gradient-premium rounded-full shadow-glow" />
            <HeartIcon className="h-8 w-8 text-rose-gold mx-6 floating" />
            <div className="h-2 w-24 bg-gradient-elegant rounded-full shadow-glow" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center max-w-8xl mx-auto">
          {/* Groom - Premium Design */}
          <div className="group">
            <div className="premium-card bg-card/98 backdrop-blur-premium rounded-3xl p-12 md:p-16 text-center border-2 border-primary/15 hover:border-primary/40 hover:shadow-premium group-hover:scale-[1.02]">
              {/* Enhanced Profile Image */}
              <div className="relative mb-10 mx-auto w-48 h-48">
                <div className="absolute inset-0 bg-gradient-premium rounded-full animate-pulse opacity-30" />
                <div className="relative w-full h-full bg-gradient-premium rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-premium">
                  <UserIcon className="h-24 w-24 text-white drop-shadow-2xl" />
                </div>
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-rose-gold rounded-full flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">♂</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20" />
              </div>

              <h3 className="text-5xl md:text-6xl font-bold text-gradient mb-8 group-hover:scale-105 transition-transform duration-500">
                Dhika Pratama
              </h3>
              
              {/* Family Information */}
              <div className="bg-primary/10 rounded-3xl p-8 mb-10 group-hover:bg-primary/15 transition-all duration-300 border border-primary/20">
                <p className="text-xl font-bold text-primary mb-3">Putra dari</p>
                <p className="text-muted-foreground text-xl font-medium">
                  Bapak Suyanto & Ibu Siti Aminah
                </p>
              </div>

              {/* Enhanced Personal Information */}
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-6 bg-muted/60 rounded-2xl p-6 group-hover:bg-muted/80 transition-all duration-300 hover:scale-105">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <BriefcaseIcon className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">Software Engineer</p>
                    <p className="text-muted-foreground">PT. Tech Innovasi Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 bg-muted/60 rounded-2xl p-6 group-hover:bg-muted/80 transition-all duration-300 hover:scale-105">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <AcademicCapIcon className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">S1 Teknik Informatika</p>
                    <p className="text-muted-foreground">Universitas Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 bg-muted/60 rounded-2xl p-6 group-hover:bg-muted/80 transition-all duration-300 hover:scale-105">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <CameraIcon className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">Hobi</p>
                    <p className="text-muted-foreground">Fotografi & Traveling</p>
                  </div>
                </div>
              </div>

              <Button 
                size="xl" 
                className="w-full h-14 text-lg font-semibold bg-gradient-premium hover:shadow-glow transition-all duration-500 group-hover:scale-105"
              >
                <UserIcon className="h-6 w-6 mr-3" />
                Lihat Profil Lengkap
              </Button>
            </div>
          </div>

          {/* Bride - Premium Design */}
          <div className="group">
            <div className="premium-card bg-card/98 backdrop-blur-premium rounded-3xl p-12 md:p-16 text-center border-2 border-rose-gold/15 hover:border-rose-gold/40 hover:shadow-premium group-hover:scale-[1.02]">
              {/* Enhanced Profile Image */}
              <div className="relative mb-10 mx-auto w-48 h-48">
                <div className="absolute inset-0 bg-gradient-elegant rounded-full animate-pulse opacity-30" />
                <div className="relative w-full h-full bg-gradient-elegant rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-premium">
                  <UserIcon className="h-24 w-24 text-white drop-shadow-2xl" />
                </div>
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">♀</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-rose-gold/20 animate-ping opacity-20" />
              </div>

              <h3 className="text-5xl md:text-6xl font-bold text-gradient mb-8 group-hover:scale-105 transition-transform duration-500">
                Sari Indah
              </h3>
              
              {/* Family Information */}
              <div className="bg-rose-gold/10 rounded-3xl p-8 mb-10 group-hover:bg-rose-gold/15 transition-all duration-300 border border-rose-gold/20">
                <p className="text-xl font-bold text-rose-gold mb-3">Putri dari</p>
                <p className="text-muted-foreground text-xl font-medium">
                  Bapak Ahmad Wijaya & Ibu Rahayu
                </p>
              </div>

              {/* Enhanced Personal Information */}
              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-6 bg-muted/60 rounded-2xl p-6 group-hover:bg-muted/80 transition-all duration-300 hover:scale-105">
                  <div className="p-3 bg-rose-gold/20 rounded-full">
                    <BriefcaseIcon className="h-7 w-7 text-rose-gold flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">Dokter Umum</p>
                    <p className="text-muted-foreground">RS. Harapan Bunda</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 bg-muted/60 rounded-2xl p-6 group-hover:bg-muted/80 transition-all duration-300 hover:scale-105">
                  <div className="p-3 bg-rose-gold/20 rounded-full">
                    <AcademicCapIcon className="h-7 w-7 text-rose-gold flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">S1 Kedokteran</p>
                    <p className="text-muted-foreground">Universitas Airlangga</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 bg-muted/60 rounded-2xl p-6 group-hover:bg-muted/80 transition-all duration-300 hover:scale-105">
                  <div className="p-3 bg-rose-gold/20 rounded-full">
                    <HeartIcon className="h-7 w-7 text-rose-gold flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">Hobi</p>
                    <p className="text-muted-foreground">Memasak & Berkebun</p>
                  </div>
                </div>
              </div>

              <Button 
                size="xl" 
                className="w-full h-14 text-lg font-semibold bg-gradient-elegant hover:shadow-glow transition-all duration-500 group-hover:scale-105"
              >
                <UserIcon className="h-6 w-6 mr-3" />
                Lihat Profil Lengkap
              </Button>
            </div>
          </div>
        </div>

        {/* Premium Love Story Section */}
        <div className="mt-32">
          <div className="premium-card bg-card/95 backdrop-blur-premium rounded-3xl p-16 md:p-20 max-w-6xl mx-auto border-2 border-primary/15 hover:border-primary/30 hover:shadow-premium group">
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <HeartIcon className="h-16 w-16 text-rose-gold mx-auto mb-8 floating drop-shadow-2xl" />
                <div className="absolute inset-0 h-16 w-16 mx-auto animate-ping opacity-20">
                  <HeartIcon className="h-16 w-16 text-rose-gold" />
                </div>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gradient mb-8">
                Kisah Cinta Kami
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 mb-12">
              <div className="text-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/25 transition-all duration-300 hover:scale-110">
                  <span className="text-3xl font-bold text-primary">2019</span>
                </div>
                <h4 className="font-bold text-xl mb-4">Pertemuan Pertama</h4>
                <p className="text-muted-foreground">Di kampus, takdir mempertemukan kami</p>
              </div>
              <div className="text-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-rose-gold/15 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-gold/25 transition-all duration-300 hover:scale-110">
                  <span className="text-3xl font-bold text-rose-gold">2021</span>
                </div>
                <h4 className="font-bold text-xl mb-4">Jatuh Cinta</h4>
                <p className="text-muted-foreground">Persahabatan berubah menjadi cinta</p>
              </div>
              <div className="text-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-accent/25 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/35 transition-all duration-300 hover:scale-110">
                  <span className="text-3xl font-bold text-foreground">2024</span>
                </div>
                <h4 className="font-bold text-xl mb-4">Lamaran</h4>
                <p className="text-muted-foreground">Komitmen untuk selamanya</p>
              </div>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed mb-10 text-center max-w-4xl mx-auto">
              Pertemuan pertama kami di kampus pada tahun 2019 telah membawa kami menuju jalan yang indah ini. 
              Dari persahabatan yang tulus, berkembang menjadi cinta yang mendalam. Melalui suka dan duka, 
              kami semakin yakin bahwa Allah SWT telah mempertemukan kami untuk bersama selamanya.
            </p>
            
            <div className="text-center">
              <Button 
                size="xl" 
                className="h-14 px-10 text-lg font-semibold bg-gradient-glow hover:shadow-premium transition-all duration-500 group-hover:scale-105"
              >
                <HeartIcon className="h-6 w-6 mr-3" />
                Baca Cerita Lengkap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
