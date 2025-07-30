
import { Button } from '@/components/ui/button';
import { HeartIcon, UserIcon, CameraIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export const CoupleSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-rose-gold/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <HeartIcon className="h-16 w-16 text-primary mx-auto mb-8 floating drop-shadow-lg" />
          <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
            Mempelai
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dua hati yang bersatu dalam cinta dan komitmen, siap membangun masa depan bersama
          </p>
          <div className="flex items-center justify-center mt-8">
            <div className="h-1 w-20 bg-gradient-premium rounded-full" />
            <HeartIcon className="h-6 w-6 text-rose-gold mx-4" />
            <div className="h-1 w-20 bg-gradient-elegant rounded-full" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
          {/* Groom */}
          <div className="group">
            <div className="elegant-card bg-card/95 backdrop-blur-sm rounded-3xl p-10 md:p-12 text-center border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              {/* Profile Image Placeholder with Advanced Styling */}
              <div className="relative mb-8 mx-auto w-40 h-40">
                <div className="absolute inset-0 bg-gradient-premium rounded-full animate-pulse opacity-20" />
                <div className="relative w-full h-full bg-gradient-premium rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-premium">
                  <UserIcon className="h-20 w-20 text-primary-foreground drop-shadow-lg" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">♂</span>
                </div>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-gradient mb-6 group-hover:scale-105 transition-transform duration-300">
                Dhika Pratama
              </h3>
              
              {/* Family Information */}
              <div className="bg-primary/5 rounded-2xl p-6 mb-8 group-hover:bg-primary/10 transition-colors">
                <p className="text-lg font-semibold text-primary mb-2">Putra dari</p>
                <p className="text-muted-foreground text-lg">
                  Bapak Suyanto & Ibu Siti Aminah
                </p>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 bg-muted/50 rounded-lg p-4 group-hover:bg-muted/70 transition-colors">
                  <BriefcaseIcon className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold">Software Engineer</p>
                    <p className="text-sm text-muted-foreground">PT. Tech Innovasi Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-muted/50 rounded-lg p-4 group-hover:bg-muted/70 transition-colors">
                  <AcademicCapIcon className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold">S1 Teknik Informatika</p>
                    <p className="text-sm text-muted-foreground">Universitas Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-muted/50 rounded-lg p-4 group-hover:bg-muted/70 transition-colors">
                  <CameraIcon className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold">Hobi</p>
                    <p className="text-sm text-muted-foreground">Fotografi & Traveling</p>
                  </div>
                </div>
              </div>

              <Button variant="premium" size="lg" className="w-full smoke-effect group-hover:shadow-glow transition-all duration-300">
                <UserIcon className="h-5 w-5 mr-2" />
                Lihat Profil Lengkap
              </Button>
            </div>
          </div>

          {/* Bride */}
          <div className="group">
            <div className="elegant-card bg-card/95 backdrop-blur-sm rounded-3xl p-10 md:p-12 text-center border border-rose-gold/10 hover:border-rose-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-gold/10">
              {/* Profile Image Placeholder with Advanced Styling */}
              <div className="relative mb-8 mx-auto w-40 h-40">
                <div className="absolute inset-0 bg-gradient-elegant rounded-full animate-pulse opacity-20" />
                <div className="relative w-full h-full bg-gradient-elegant rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-elegant">
                  <UserIcon className="h-20 w-20 text-white drop-shadow-lg" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">♀</span>
                </div>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-gradient mb-6 group-hover:scale-105 transition-transform duration-300">
                Sari Indah
              </h3>
              
              {/* Family Information */}
              <div className="bg-rose-gold/5 rounded-2xl p-6 mb-8 group-hover:bg-rose-gold/10 transition-colors">
                <p className="text-lg font-semibold text-rose-gold mb-2">Putri dari</p>
                <p className="text-muted-foreground text-lg">
                  Bapak Ahmad Wijaya & Ibu Rahayu
                </p>
              </div>

              {/* Personal Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 bg-muted/50 rounded-lg p-4 group-hover:bg-muted/70 transition-colors">
                  <BriefcaseIcon className="h-6 w-6 text-rose-gold flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold">Dokter Umum</p>
                    <p className="text-sm text-muted-foreground">RS. Harapan Bunda</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-muted/50 rounded-lg p-4 group-hover:bg-muted/70 transition-colors">
                  <AcademicCapIcon className="h-6 w-6 text-rose-gold flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold">S1 Kedokteran</p>
                    <p className="text-sm text-muted-foreground">Universitas Airlangga</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-muted/50 rounded-lg p-4 group-hover:bg-muted/70 transition-colors">
                  <HeartIcon className="h-6 w-6 text-rose-gold flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold">Hobi</p>
                    <p className="text-sm text-muted-foreground">Memasak & Berkebun</p>
                  </div>
                </div>
              </div>

              <Button variant="elegant" size="lg" className="w-full smoke-effect group-hover:shadow-glow transition-all duration-300">
                <UserIcon className="h-5 w-5 mr-2" />
                Lihat Profil Lengkap
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Love Story Section */}
        <div className="mt-24">
          <div className="elegant-card bg-card/90 backdrop-blur-md rounded-3xl p-12 md:p-16 max-w-5xl mx-auto border border-primary/10 hover:border-primary/20 transition-all duration-500 group">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <HeartIcon className="h-12 w-12 text-rose-gold mx-auto mb-6 floating" />
                <div className="absolute inset-0 h-12 w-12 mx-auto animate-ping opacity-30">
                  <HeartIcon className="h-12 w-12 text-rose-gold" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
                Kisah Cinta Kami
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">2019</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Pertemuan Pertama</h4>
                <p className="text-muted-foreground text-sm">Di kampus, takdir mempertemukan kami</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-gold/20 transition-colors">
                  <span className="text-2xl font-bold text-rose-gold">2021</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Jatuh Cinta</h4>
                <p className="text-muted-foreground text-sm">Persahabatan berubah menjadi cinta</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                  <span className="text-2xl font-bold text-foreground">2024</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Lamaran</h4>
                <p className="text-muted-foreground text-sm">Komitmen untuk selamanya</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              Pertemuan pertama kami di kampus pada tahun 2019 telah membawa kami menuju jalan yang indah ini. 
              Dari persahabatan yang tulus, berkembang menjadi cinta yang mendalam. Melalui suka dan duka, 
              kami semakin yakin bahwa Allah SWT telah mempertemukan kami untuk bersama selamanya.
            </p>
            
            <div className="text-center">
              <Button variant="gold" size="lg" className="smoke-effect group-hover:shadow-glow">
                <HeartIcon className="h-5 w-5 mr-2" />
                Baca Cerita Lengkap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
