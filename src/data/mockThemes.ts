
export interface Theme {
  id: string;
  name: string;
  description: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  font_family: string;
  is_active: boolean;
  preview_image?: string;
  created_at: string;
  updated_at: string;
}

export const mockThemes: Theme[] = [
  {
    id: '1',
    name: 'Classic Gold Premium',
    description: 'Tema default dengan nuansa emas klasik dan efek premium yang elegan',
    primary_color: '#D4AF37',
    secondary_color: '#B8860B',
    accent_color: '#F5DEB3',
    background_color: '#FDFDF5',
    text_color: '#2C2C2C',
    font_family: 'Playfair Display',
    is_active: true,
    preview_image: '/themes/classic-gold.jpg',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    name: 'Romantic Rose Blush',
    description: 'Tema romantis dengan perpaduan pink lembut dan rose gold yang memukau',
    primary_color: '#E91E63',
    secondary_color: '#F48FB1',
    accent_color: '#F8BBD9',
    background_color: '#FFF5F8',
    text_color: '#424242',
    font_family: 'Dancing Script',
    is_active: false,
    preview_image: '/themes/romantic-pink.jpg',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  },
  {
    id: '3',
    name: 'Modern Minimalist Blue',
    description: 'Tema modern dengan desain minimalis dan sentuhan biru yang menenangkan',
    primary_color: '#2196F3',
    secondary_color: '#64B5F6',
    accent_color: '#BBDEFB',
    background_color: '#FAFAFA',
    text_color: '#212121',
    font_family: 'Inter',
    is_active: false,
    preview_image: '/themes/modern-blue.jpg',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  },
  {
    id: '4',
    name: 'Elegant Purple Luxe',
    description: 'Tema mewah dengan nuansa ungu yang elegan dan efek gradient yang menawan',
    primary_color: '#8E24AA',
    secondary_color: '#BA68C8',
    accent_color: '#E1BEE7',
    background_color: '#F8F5FF',
    text_color: '#2E2E2E',
    font_family: 'Merriweather',
    is_active: false,
    preview_image: '/themes/purple-luxe.jpg',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  }
];
