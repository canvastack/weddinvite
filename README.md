
# Wedding Invitation Management System

Sistem manajemen undangan pernikahan digital yang komprehensif dengan fitur modern dan antarmuka yang elegan.

## 🌟 Fitur Utama

### 📱 Undangan Digital
- **Desain Responsif**: Tampilan yang sempurna di semua perangkat
- **Tema Kustom**: Sistem tema yang dapat disesuaikan dengan drag-and-drop
- **Animasi Modern**: Efek visual yang menarik dan profesional
- **Multi-bahasa**: Dukungan bahasa Indonesia

### 👥 Manajemen Tamu
- **Database Tamu**: Kelola informasi tamu dengan lengkap
- **Kategori Undangan**: Akad nikah, resepsi, atau keduanya
- **Status Kehadiran**: Tracking konfirmasi kehadiran real-time
- **Import/Export**: Fitur impor dan ekspor data tamu

### 📧 Email Blast System
- **Template Email**: Template yang dapat dikustomisasi
- **Pengiriman Massal**: Kirim undangan ke banyak tamu sekaligus
- **Tracking Email**: Monitor status pengiriman dan pembukaan email
- **Reminder Otomatis**: Pengingat otomatis untuk tamu

### 🗺️ Sistem Peta & Navigasi
- **Integrasi Mapbox**: Peta interaktif untuk lokasi acara
- **Estimasi Jarak**: Perhitungan jarak dari lokasi tamu ke venue
- **Waktu Tempuh**: Estimasi waktu perjalanan untuk berbagai kendaraan:
  - Sepeda motor
  - Mobil
  - Transportasi umum
- **Navigasi GPS**: Link langsung ke aplikasi navigasi

### 🎨 Admin Panel
- **Dashboard Komprehensif**: Ringkasan statistik dan analytics
- **Manajemen Tema**: Editor tema dengan drag-and-drop
- **Pengelolaan Konten**: Edit konten undangan secara real-time
- **Laporan & Analytics**: Laporan kehadiran dan statistik tamu

## 🚀 Teknologi

### Frontend
- **React 18** - Framework UI modern
- **TypeScript** - Type safety dan developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Komponen UI yang konsisten
- **Vite** - Build tool yang cepat
- **React Hook Form** - Form handling yang efisien
- **React Query** - State management dan data fetching

### Backend (Supabase Ready)
- **PostgreSQL** - Database relasional yang powerful
- **Authentication** - Sistem auth yang aman
- **Real-time** - Update data secara real-time
- **Edge Functions** - Serverless functions
- **Storage** - File dan media storage

### Mapping & Navigation
- **Mapbox GL JS** - Peta interaktif
- **Geolocation API** - Deteksi lokasi otomatis
- **Routing API** - Perhitungan rute optimal

## 📋 Persyaratan Sistem

### Development
- Node.js 18+ 
- npm atau yarn
- Git

### Production
- Supabase account (untuk backend)
- Mapbox account (untuk fitur peta)
- SMTP server (untuk email)

## 🛠️ Instalasi

### 1. Clone Repository
```bash
git clone <repository-url>
cd wedding-invitation-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
```

Edit file `.env` dengan konfigurasi:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Mapbox Configuration
VITE_MAPBOX_TOKEN=your_mapbox_token

# Email Configuration
VITE_EMAIL_FROM=noreply@yourdomain.com
VITE_EMAIL_FROM_NAME=Your Wedding Name
```

### 4. Setup Database
```bash
# Import SQL schema ke database PostgreSQL
psql -U username -d database_name -f database/schema.sql
```

### 5. Run Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 📊 Database Schema

### Tabel Utama
- `users` - Manajemen pengguna dan admin
- `wedding_events` - Data acara pernikahan
- `guests` - Database tamu undangan
- `invitations` - Tracking undangan yang dikirim
- `email_templates` - Template email
- `themes` - Tema dan styling
- `distance_calculations` - Cache perhitungan jarak
- `email_logs` - Log pengiriman email
- `settings` - Konfigurasi aplikasi

### Mock Data
Mock data tersedia untuk testing:
- `src/data/mockUsers.ts` - Data pengguna
- `src/data/mockGuests.ts` - Data tamu
- `src/data/mockInvitations.ts` - Data undangan
- `src/data/mockEvents.ts` - Data acara
- `src/data/mockEmailTemplates.ts` - Template email
- `src/data/mockThemes.ts` - Tema aplikasi
- `src/data/mockDistance.ts` - Data jarak dan waktu tempuh

## 🎨 Kustomisasi Tema

### Sistem Tema
- **Warna**: Primary, secondary, accent, background, text
- **Font**: Pilihan font yang beragam
- **Layout**: Kustomisasi tata letak komponen
- **Animasi**: Kontrol efek visual

### Cara Menggunakan
1. Buka admin panel
2. Pilih menu "Tema"
3. Gunakan drag-and-drop editor
4. Preview real-time
5. Simpan dan aktifkan tema

## 📧 Konfigurasi Email

### SMTP Setup
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_ENCRYPTION=tls
```

### Template Email
- **Undangan Utama**: Template undangan lengkap
- **Reminder**: Pengingat untuk tamu
- **Thank You**: Ucapan terima kasih

## 🗺️ Konfigurasi Peta

### Mapbox Setup
1. Daftar di [Mapbox](https://mapbox.com)
2. Dapatkan access token
3. Tambahkan ke environment variables
4. Konfigurasi style map sesuai kebutuhan

### Fitur Peta
- **Marker Custom**: Penanda lokasi acara
- **Routing**: Rute optimal dari lokasi tamu
- **Geocoding**: Konversi alamat ke koordinat
- **Clustering**: Grup marker untuk performa

## 📱 Deployment

### Production Build
```bash
npm run build
```

### Deploy ke Vercel
```bash
npm i -g vercel
vercel --prod
```

### Deploy ke Netlify
```bash
npm run build
# Upload folder dist ke Netlify
```

## 📈 Analytics & Reporting

### Metrics yang Dilacak
- **Kehadiran**: Statistik konfirmasi tamu
- **Email**: Rate pembukaan dan response
- **Geografis**: Sebaran lokasi tamu
- **Timeline**: Tren konfirmasi kehadiran

### Dashboard Admin
- **Real-time Updates**: Data terbaru secara langsung
- **Visual Charts**: Grafik interaktif
- **Export Data**: Download laporan dalam format CSV/PDF

## 🔐 Keamanan

### Authentication
- **JWT Tokens**: Secure token-based auth
- **Role-based Access**: Admin dan user roles
- **Password Hashing**: Bcrypt encryption

### Data Protection
- **SQL Injection**: Parameterized queries
- **XSS Prevention**: Content sanitization
- **CORS**: Configured cross-origin requests

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📞 Support

- **Email**: support@yourwedding.com
- **Documentation**: [Link ke dokumentasi]
- **Issues**: [GitHub Issues]

## 📄 Lisensi

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🎉 Acknowledgments

- [Shadcn/UI](https://ui.shadcn.com) untuk komponen UI
- [Tailwind CSS](https://tailwindcss.com) untuk styling
- [Mapbox](https://mapbox.com) untuk fitur peta
- [Heroicons](https://heroicons.com) untuk ikon

---

**Dibuat dengan ❤️ untuk momen spesial Anda**
