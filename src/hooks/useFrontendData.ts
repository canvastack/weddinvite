
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useAppSettings } from './useAppSettings';

export interface FrontendData {
  heroSection: {
    isVisible: boolean;
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    showCountdown: boolean;
  };
  coupleSection: {
    isVisible: boolean;
    brideName: string;
    groomName: string;
    brideDescription: string;
    groomDescription: string;
    brideImage: string;
    groomImage: string;
    loveStory: string;
    meetingDate: string;
  };
  eventSection: {
    isVisible: boolean;
    events: Array<{
      id: string;
      title: string;
      date: string;
      time: string;
      venue: string;
      address: string;
      type: 'akad' | 'resepsi';
      description?: string;
      latitude?: number;
      longitude?: number;
    }>;
  };
  rsvpSection: {
    isVisible: boolean;
    isEnabled: boolean;
    deadline: string;
    message: string;
    maxGuests: number;
    allowPlusOnes: boolean;
  };
  gallerySection: {
    isVisible: boolean;
    images: string[];
    title: string;
    description: string;
  };
  importantInfoSection: {
    isVisible: boolean;
    title: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  helpSection: {
    isVisible: boolean;
    title: string;
    description: string;
    contactPhone: string;
    contactEmail: string;
    contactPerson: string;
  };
  thankYouSection: {
    isVisible: boolean;
    title: string;
    message: string;
    brideName: string;
    groomName: string;
    socialMedia: {
      instagram: string;
      facebook: string;
      twitter: string;
    };
  };
  footerSection: {
    isVisible: boolean;
    copyrightText: string;
    designerCredit: string;
    additionalLinks: Array<{
      id: string;
      title: string;
      url: string;
    }>;
  };
}

const defaultFrontendData: FrontendData = {
  heroSection: {
    isVisible: true,
    title: 'Wedding Invitation',
    subtitle: 'Merayakan Cinta yang Abadi',
    description: 'Dengan penuh rasa syukur kepada Allah SWT, kami mengundang Anda untuk menjadi saksi dalam ikatan suci pernikahan kami',
    backgroundImage: '/assets/wedding-hero.jpg',
    showCountdown: true,
  },
  coupleSection: {
    isVisible: true,
    brideName: 'Bride',
    groomName: 'Groom',
    brideDescription: 'Putri dari Bapak & Ibu',
    groomDescription: 'Putra dari Bapak & Ibu',
    brideImage: '',
    groomImage: '',
    loveStory: 'Kisah cinta kami dimulai...',
    meetingDate: '2020-01-15',
  },
  eventSection: {
    isVisible: true,
    events: [
      {
        id: '1',
        title: 'Akad Nikah',
        date: '2024-06-15',
        time: '08:00',
        venue: 'Masjid Istiqlal',
        address: 'Jl. Taman Wijaya Kusuma, Jakarta Pusat',
        type: 'akad',
        description: 'Prosesi akad nikah akan dilaksanakan di Masjid Istiqlal',
      },
      {
        id: '2',
        title: 'Resepsi',
        date: '2024-06-15',
        time: '19:00',
        venue: 'Grand Ballroom Hotel',
        address: 'Jl. Asia Afrika No.8, Jakarta Pusat',
        type: 'resepsi',
        description: 'Acara resepsi pernikahan untuk keluarga dan sahabat',
      },
    ],
  },
  rsvpSection: {
    isVisible: true,
    isEnabled: true,
    deadline: '2024-06-01',
    message: 'Mohon konfirmasi kehadiran Anda sebelum tanggal yang ditentukan',
    maxGuests: 4,
    allowPlusOnes: true,
  },
  gallerySection: {
    isVisible: true,
    images: [],
    title: 'Galeri Foto',
    description: 'Momen-momen indah perjalanan cinta kami',
  },
  importantInfoSection: {
    isVisible: true,
    title: 'Informasi Penting',
    items: [
      {
        id: '1',
        title: 'Dress Code',
        description: 'Formal/Semi Formal',
        icon: '👗',
      },
      {
        id: '2',
        title: 'Parkir',
        description: 'Tersedia parkir gratis',
        icon: '🚗',
      },
      {
        id: '3',
        title: 'Protokol Kesehatan',
        description: 'Harap mematuhi protokol kesehatan',
        icon: '😷',
      },
    ],
  },
  helpSection: {
    isVisible: true,
    title: 'Butuh Bantuan?',
    description: 'Jika ada pertanyaan, jangan ragu untuk menghubungi kami',
    contactPhone: '+62 812-3456-7890',
    contactEmail: 'wedding@example.com',
    contactPerson: 'Wedding Organizer',
  },
  thankYouSection: {
    isVisible: true,
    title: 'Terima Kasih',
    message: 'Terima kasih atas doa dan restu Anda. Kehadiran Anda sangat berarti bagi kami.',
    brideName: 'Bride',
    groomName: 'Groom',
    socialMedia: {
      instagram: '@weddingcouple',
      facebook: 'Wedding Couple',
      twitter: '@weddingcouple',
    },
  },
  footerSection: {
    isVisible: true,
    copyrightText: '© 2024 Wedding Management System. All rights reserved.',
    designerCredit: 'Designed with ❤️ by Wedding Team',
    additionalLinks: [
      {
        id: '1',
        title: 'Privacy Policy',
        url: '/privacy',
      },
      {
        id: '2',
        title: 'Terms of Service',
        url: '/terms',
      },
    ],
  },
};

export const useFrontendData = () => {
  const [frontendData, setFrontendData] = useLocalStorage<FrontendData>('frontend-data', defaultFrontendData);
  const { settings } = useAppSettings();

  // Sync with settings changes
  useEffect(() => {
    if (settings.wedding.brideName !== frontendData.coupleSection.brideName ||
        settings.wedding.groomName !== frontendData.coupleSection.groomName) {
      setFrontendData(prev => ({
        ...prev,
        coupleSection: {
          ...prev.coupleSection,
          brideName: settings.wedding.brideName,
          groomName: settings.wedding.groomName,
        },
        heroSection: {
          ...prev.heroSection,
          title: `${settings.wedding.brideName} & ${settings.wedding.groomName}`,
        },
        thankYouSection: {
          ...prev.thankYouSection,
          brideName: settings.wedding.brideName,
          groomName: settings.wedding.groomName,
        },
      }));
    }

    if (settings.wedding.rsvpDeadline !== frontendData.rsvpSection.deadline) {
      setFrontendData(prev => ({
        ...prev,
        rsvpSection: {
          ...prev.rsvpSection,
          deadline: settings.wedding.rsvpDeadline,
          maxGuests: settings.wedding.maxGuestsPerInvite,
          allowPlusOnes: settings.wedding.allowPlusOnes,
        },
      }));
    }
  }, [settings, frontendData, setFrontendData]);

  const updateSection = (section: keyof FrontendData, data: any) => {
    setFrontendData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const toggleSectionVisibility = (section: keyof FrontendData) => {
    setFrontendData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        isVisible: !prev[section].isVisible,
      },
    }));
  };

  const addEventToSection = (event: any) => {
    setFrontendData(prev => ({
      ...prev,
      eventSection: {
        ...prev.eventSection,
        events: [...prev.eventSection.events, event],
      },
    }));
  };

  const removeEventFromSection = (eventId: string) => {
    setFrontendData(prev => ({
      ...prev,
      eventSection: {
        ...prev.eventSection,
        events: prev.eventSection.events.filter(e => e.id !== eventId),
      },
    }));
  };

  const updateEventInSection = (eventId: string, eventData: any) => {
    setFrontendData(prev => ({
      ...prev,
      eventSection: {
        ...prev.eventSection,
        events: prev.eventSection.events.map(e => 
          e.id === eventId ? { ...e, ...eventData } : e
        ),
      },
    }));
  };

  return {
    frontendData,
    updateSection,
    toggleSectionVisibility,
    addEventToSection,
    removeEventFromSection,
    updateEventInSection,
    setFrontendData,
  };
};
