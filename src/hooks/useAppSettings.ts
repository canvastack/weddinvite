
import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from './use-toast';

export interface AppSettings {
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    timezone: string;
    language: string;
    maintenanceMode: boolean;
  };
  wedding: {
    coupleNames: string;
    brideName: string;
    groomName: string;
    weddingDate: string;
    venue: string;
    rsvpDeadline: string;
    maxGuestsPerInvite: number;
    allowPlusOnes: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    rsvpNotifications: boolean;
    reminderEmails: boolean;
    adminAlerts: boolean;
    emailTemplate: string;
  };
  security: {
    requireEmailVerification: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    allowGuestRegistration: boolean;
  };
  appearance: {
    theme: string;
    primaryColor: string;
    logoUrl: string;
    customCSS: string;
  };
}

const defaultSettings: AppSettings = {
  general: {
    siteName: 'Wedding Management System',
    siteDescription: 'Sistem manajemen pernikahan yang modern dan elegan',
    contactEmail: 'admin@wedding.com',
    timezone: 'Asia/Jakarta',
    language: 'id',
    maintenanceMode: false,
  },
  wedding: {
    coupleNames: 'Bride & Groom',
    brideName: 'Bride',
    groomName: 'Groom',
    weddingDate: '2024-06-15',
    venue: 'Grand Ballroom',
    rsvpDeadline: '2024-06-01',
    maxGuestsPerInvite: 4,
    allowPlusOnes: true,
  },
  notifications: {
    emailNotifications: true,
    rsvpNotifications: true,
    reminderEmails: true,
    adminAlerts: true,
    emailTemplate: 'default',
  },
  security: {
    requireEmailVerification: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    allowGuestRegistration: false,
  },
  appearance: {
    theme: 'elegant',
    primaryColor: '#6366f1',
    logoUrl: '',
    customCSS: '',
  },
};

export const useAppSettings = () => {
  const [settings, setSettings] = useLocalStorage<AppSettings>('app-settings', defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const updateSetting = useCallback((section: keyof AppSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  }, [setSettings]);

  const saveSettings = useCallback(async () => {
    setIsSaving(true);
    
    try {
      // Apply theme changes
      if (settings.appearance.theme) {
        document.documentElement.setAttribute('data-theme', settings.appearance.theme);
      }
      
      // Apply primary color
      if (settings.appearance.primaryColor) {
        document.documentElement.style.setProperty('--primary', settings.appearance.primaryColor);
      }
      
      // Apply custom CSS
      let customStyleElement = document.getElementById('custom-css');
      if (!customStyleElement) {
        customStyleElement = document.createElement('style');
        customStyleElement.id = 'custom-css';
        document.head.appendChild(customStyleElement);
      }
      customStyleElement.textContent = settings.appearance.customCSS || '';
      
      // Apply language settings
      document.documentElement.lang = settings.general.language;
      
      // Apply maintenance mode
      if (settings.general.maintenanceMode) {
        localStorage.setItem('maintenance-mode', 'true');
      } else {
        localStorage.removeItem('maintenance-mode');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasChanges(false);
      toast({
        title: "Pengaturan Disimpan",
        description: "Semua pengaturan berhasil disimpan dan diterapkan.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan pengaturan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [settings, toast]);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    setHasChanges(true);
    toast({
      title: "Pengaturan Direset",
      description: "Semua pengaturan telah dikembalikan ke nilai default.",
    });
  }, [setSettings, toast]);

  const testEmailConfiguration = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate email test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (settings.notifications.emailNotifications) {
        toast({
          title: "Email Test Berhasil",
          description: "Konfigurasi email berhasil diuji.",
        });
        return { success: true, message: "Email berhasil dikirim" };
      } else {
        throw new Error("Email notifications disabled");
      }
    } catch (error) {
      toast({
        title: "Email Test Gagal",
        description: "Gagal mengirim email test. Periksa konfigurasi.",
        variant: "destructive",
      });
      return { success: false, message: "Gagal mengirim email" };
    } finally {
      setIsLoading(false);
    }
  }, [settings.notifications.emailNotifications, toast]);

  // Apply settings on load
  useEffect(() => {
    if (settings.appearance.theme) {
      document.documentElement.setAttribute('data-theme', settings.appearance.theme);
    }
    
    if (settings.appearance.primaryColor) {
      document.documentElement.style.setProperty('--primary', settings.appearance.primaryColor);
    }
    
    document.documentElement.lang = settings.general.language;
  }, [settings]);

  return {
    settings,
    isLoading,
    isSaving,
    hasChanges,
    updateSetting,
    saveSettings,
    resetSettings,
    testEmailConfiguration
  };
};
