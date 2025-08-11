import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeConfig } from '@/hooks/useThemeManager';
import { HeartIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface ThemePreviewProps {
  theme: ThemeConfig;
  isDarkMode: boolean;
  className?: string;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, isDarkMode, className }) => {
  const colors = isDarkMode && theme.darkMode.enabled ? theme.darkMode.colors : theme.colors;

  return (
    <div 
      className={`p-8 rounded-lg border space-y-6 transition-all duration-300 ${className}`}
      style={{
        backgroundColor: `hsl(${colors.background})`,
        borderColor: `hsl(${colors.border})`,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize,
        borderRadius: theme.layout.borderRadius,
      }}
    >
      {/* Hero Section Preview */}
      <div className="text-center space-y-4">
        <div className="relative">
          <HeartIcon 
            className="h-12 w-12 mx-auto mb-4"
            style={{ color: `hsl(${theme.colors.primary})` }}
          />
        </div>
        
        <h1 
          className="text-4xl font-bold"
          style={{ 
            background: `linear-gradient(135deg, hsl(${theme.colors.primary}), hsl(${theme.colors.primaryGlow}))`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: theme.typography.headingFont
          }}
        >
          Dhika & Sari
        </h1>
        
        <p style={{ 
          color: `hsl(${colors.muted})`,
          lineHeight: theme.typography.lineHeight
        }}>
          Merayakan Cinta yang Abadi
        </p>
      </div>

      {/* Info Cards Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className="p-4 rounded-lg border transition-all duration-300"
          style={{
            backgroundColor: `hsl(${colors.card})`,
            borderColor: `hsl(${colors.border})`,
            borderRadius: theme.layout.borderRadius,
            boxShadow: theme.effects.shadowStyle === 'premium' 
              ? `0 10px 20px -5px hsl(${theme.colors.primary} / 0.2)` 
              : theme.effects.shadowStyle === 'soft'
              ? `0 4px 6px -1px hsl(${theme.colors.primary} / 0.1)`
              : 'none'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="p-2 rounded-full"
              style={{ backgroundColor: `hsl(${theme.colors.primary} / 0.1)` }}
            >
              <CalendarIcon 
                className="h-5 w-5"
                style={{ color: `hsl(${theme.colors.primary})` }}
              />
            </div>
            <div>
              <p 
                className="font-semibold"
                style={{ color: `hsl(${colors.text})` }}
              >
                Tanggal Pernikahan
              </p>
              <p 
                className="text-sm"
                style={{ color: `hsl(${colors.muted})` }}
              >
                Save the Date
              </p>
            </div>
          </div>
          <p 
            className="text-lg font-bold"
            style={{ color: `hsl(${theme.colors.primary})` }}
          >
            15 Februari 2025
          </p>
        </div>

        <div 
          className="p-4 rounded-lg border transition-all duration-300"
          style={{
            backgroundColor: `hsl(${colors.card})`,
            borderColor: `hsl(${colors.border})`,
            borderRadius: theme.layout.borderRadius,
            boxShadow: theme.effects.shadowStyle === 'premium' 
              ? `0 10px 20px -5px hsl(${theme.colors.roseGold} / 0.2)` 
              : theme.effects.shadowStyle === 'soft'
              ? `0 4px 6px -1px hsl(${theme.colors.roseGold} / 0.1)`
              : 'none'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="p-2 rounded-full"
              style={{ backgroundColor: `hsl(${theme.colors.roseGold} / 0.1)` }}
            >
              <MapPinIcon 
                className="h-5 w-5"
                style={{ color: `hsl(${theme.colors.roseGold})` }}
              />
            </div>
            <div>
              <p 
                className="font-semibold"
                style={{ color: `hsl(${colors.text})` }}
              >
                Lokasi Acara
              </p>
              <p 
                className="text-sm"
                style={{ color: `hsl(${colors.muted})` }}
              >
                Wedding Venue
              </p>
            </div>
          </div>
          <p 
            className="text-lg font-bold"
            style={{ color: `hsl(${theme.colors.roseGold})` }}
          >
            Gedung Serbaguna
          </p>
        </div>
      </div>

      {/* Button Preview */}
      <div className="flex gap-4 justify-center">
        <button 
          className="px-6 py-3 font-medium transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: `hsl(${theme.colors.primary})`,
            color: `hsl(${colors.background})`,
            borderRadius: theme.layout.borderRadius,
            boxShadow: theme.effects.shadowStyle === 'premium' 
              ? `0 10px 20px -5px hsl(${theme.colors.primary} / 0.4)`
              : 'none',
            fontWeight: theme.typography.fontWeight.medium
          }}
        >
          Primary Button
        </button>
        <button 
          className="px-6 py-3 font-medium border transition-all duration-300 hover:scale-105"
          style={{
            borderColor: `hsl(${theme.colors.roseGold})`,
            color: `hsl(${theme.colors.roseGold})`,
            borderRadius: theme.layout.borderRadius,
            backgroundColor: 'transparent',
            fontWeight: theme.typography.fontWeight.medium
          }}
        >
          Secondary Button
        </button>
      </div>

      {/* Typography Preview */}
      <div className="space-y-3">
        <h2 
          className="text-2xl font-bold"
          style={{ 
            color: `hsl(${colors.text})`,
            fontFamily: theme.typography.headingFont
          }}
        >
          Typography Preview
        </h2>
        <p style={{ 
          color: `hsl(${colors.text})`,
          lineHeight: theme.typography.lineHeight
        }}>
          This is how regular text will appear with the selected typography settings. 
          The font family is {theme.typography.fontFamily} with a size of {theme.typography.fontSize}.
        </p>
        <p style={{ 
          color: `hsl(${colors.muted})`,
          fontSize: '0.875rem'
        }}>
          This is muted text that provides secondary information.
        </p>
      </div>
    </div>
  );
};

export default ThemePreview;