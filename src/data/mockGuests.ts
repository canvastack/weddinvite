
export interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  invitation_type: 'akad' | 'resepsi' | 'both';
  guest_count: number;
  attendance_status: 'pending' | 'attending' | 'not_attending' | 'maybe';
  message?: string;
  invited_by: string;
  rsvp_date?: string;
  created_at: string;
  updated_at: string;
}

export const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    email: 'budi@example.com',
    phone: '+62812345678',
    address: 'Jl. Merdeka No. 123',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    postal_code: '10110',
    invitation_type: 'both',
    guest_count: 2,
    attendance_status: 'attending',
    message: 'Selamat untuk kalian berdua! Semoga bahagia selalu.',
    invited_by: '1',
    rsvp_date: '2024-01-20T10:30:00Z',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    email: 'siti@example.com',
    phone: '+62813456789',
    address: 'Jl. Sudirman No. 456',
    city: 'Bandung',
    province: 'Jawa Barat',
    postal_code: '40123',
    invitation_type: 'resepsi',
    guest_count: 1,
    attendance_status: 'attending',
    message: 'Barakallahu lakuma, semoga menjadi keluarga yang sakinah mawaddah warahmah.',
    invited_by: '2',
    rsvp_date: '2024-01-22T14:15:00Z',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-22T14:15:00Z'
  },
  {
    id: '3',
    name: 'Ahmad Fauzi',
    email: 'ahmad@example.com',
    phone: '+62814567890',
    address: 'Jl. Diponegoro No. 789',
    city: 'Surabaya',
    province: 'Jawa Timur',
    postal_code: '60123',
    invitation_type: 'both',
    guest_count: 3,
    attendance_status: 'not_attending',
    message: 'Maaf tidak bisa hadir, tapi doa terbaik selalu untuk kalian.',
    invited_by: '1',
    rsvp_date: '2024-01-18T09:45:00Z',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-18T09:45:00Z'
  },
  {
    id: '4',
    name: 'Dewi Kartika',
    email: 'dewi@example.com',
    phone: '+62815678901',
    address: 'Jl. Gajah Mada No. 321',
    city: 'Yogyakarta',
    province: 'DI Yogyakarta',
    postal_code: '55123',
    invitation_type: 'akad',
    guest_count: 2,
    attendance_status: 'maybe',
    message: 'Akan berusaha hadir, semoga dimudahkan.',
    invited_by: '3',
    rsvp_date: '2024-01-25T16:20:00Z',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-25T16:20:00Z'
  },
  {
    id: '5',
    name: 'Rudi Hermawan',
    email: 'rudi@example.com',
    phone: '+62816789012',
    address: 'Jl. Pahlawan No. 654',
    city: 'Medan',
    province: 'Sumatera Utara',
    postal_code: '20123',
    invitation_type: 'both',
    guest_count: 4,
    attendance_status: 'pending',
    invited_by: '2',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  }
];
