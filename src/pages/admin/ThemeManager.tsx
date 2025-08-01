import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PaintBrushIcon, 
  SwatchIcon,
  EyeIcon,
  PlusIcon,
  BookmarkIcon,
  ArrowPathIcon,
  CogIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';
import { useTheme, Theme } from '@/context/ThemeContext';
import { restoreDefaultTheme, createCurrentStateBackup } from '@/data/defaultThemeBackup';

const ThemeManager = () => {
  const { 
    currentTheme, 
    themes, 
    isDefaultMode,
    setCurrentTheme, 
    updateTheme, 
    addTheme, 
    resetToDefault 
  } = useTheme();
  
  const [editingTheme, setEditingTheme] = useState<Theme>(currentTheme);
  const [isEditing, setIsEditing] = useState(false);
  const [backupCreated, setBackupCreated] = useState(false);
  const { toast } = useToast();

  const handleSaveTheme = () => {
    if (editingTheme.is_default) {
      toast({
        title: "Tidak dapat mengubah tema default",
        description: "Tema default tidak dapat diubah",
        variant: "destructive",
      });
      return;
    }

    // Create backup before applying theme
    if (!backupCreated) {
      createCurrentStateBackup();
      setBackupCreated(true);
    }

    updateTheme(editingTheme);
    setCurrentTheme(editingTheme);
    setIsEditing(false);
    
    toast({
      title: "Tema disimpan",
      description: "Tema telah disimpan dan diterapkan ke halaman utama",
    });
  };

  const handleRestoreDefault = () => {
    try {
      restoreDefaultTheme();
      resetToDefault();
      setBackupCreated(false);
      
      toast({
        title: "Tema dikembalikan",
        description: "Design telah dikembalikan ke default 100% seperti semula",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengembalikan tema default",
        variant: "destructive",
      });
    }
  };

  const handleCreateTheme = () => {
    const newTheme: Theme = {
      id: `custom-${Date.now()}`,
      name: 'Custom Theme',
      description: 'New custom theme',
      
      // Start with current theme colors
      primary_color: '45 95% 58%',
      primary_glow: '45 100% 68%',
      secondary_color: '350 15% 96%',
      accent_color: '45 85% 85%',
      rose_gold: '15 75% 65%',
      background_color: '350 20% 98%',
      card_color: '0 0% 100%',
      text_color: '345 15% 8%',
      muted_color: '345 8% 45%',
      border_color: '345 10% 90%',
      
      font_family: 'Inter',
      font_size: '16px',
      heading_font: 'Inter',
      
      border_radius: '1rem',
      spacing: '1.5rem',
      
      shadow_style: 'premium',
      gradient_style: 'premium',
      animation_speed: 'normal',
      blur_intensity: 'medium',
      
      button_style: 'premium',
      card_style: 'elegant',
      nav_style: 'floating',
      hero_style: 'animated',
      footer_style: 'gradient',
      
      is_active: false,
      is_default: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    addTheme(newTheme);
    setEditingTheme(newTheme);
    setIsEditing(true);
    
    toast({
      title: "New theme created",
      description: "New theme has been created and is ready to edit.",
    });
  };

  const handleThemeChange = (field: keyof Theme, value: string) => {
    setEditingTheme(prev => ({
      ...prev,
      [field]: value
    }));
    setIsEditing(true);
  };

  const handleThemeSelect = (theme: Theme) => {
    setEditingTheme(theme);
    setCurrentTheme(theme);
  };

  const colorPickers = [
    { key: 'primary_color', label: 'Primary Color', description: 'Main brand color' },
    { key: 'primary_glow', label: 'Primary Glow', description: 'Glow effect color' },
    { key: 'secondary_color', label: 'Secondary Color', description: 'Secondary brand color' },
    { key: 'accent_color', label: 'Accent Color', description: 'Accent highlights' },
    { key: 'rose_gold', label: 'Rose Gold', description: 'Special accent color' },
    { key: 'background_color', label: 'Background', description: 'Page background' },
    { key: 'card_color', label: 'Card Background', description: 'Card background color' },
    { key: 'text_color', label: 'Text Color', description: 'Primary text color' },
    { key: 'muted_color', label: 'Muted Text', description: 'Secondary text color' },
    { key: 'border_color', label: 'Border Color', description: 'Border and divider color' }
  ];

  const convertHslToHex = (hsl: string) => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v.replace('%', '')));
    const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l / 100 - c / 2;
    
    let r = 0, g = 0, b = 0;
    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const convertHexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const sum = max + min;
    
    let h = 0;
    if (diff !== 0) {
      if (max === r) h = ((g - b) / diff) % 6;
      else if (max === g) h = (b - r) / diff + 2;
      else h = (r - g) / diff + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    
    const l = Math.round((sum / 2) * 100);
    const s = diff === 0 ? 0 : Math.round((diff / (1 - Math.abs(2 * l / 100 - 1))) * 100);
    
    return `${h} ${s}% ${l}%`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Theme Management System</h1>
          <p className="text-muted-foreground">
            Comprehensive design management for the wedding invitation
          </p>
          <div className="mt-2">
            {isDefaultMode ? (
              <Badge variant="secondary" className="gap-2">
                <CogIcon className="h-4 w-4" />
                Default Mode (Protected)
              </Badge>
            ) : (
              <Badge variant="default" className="gap-2">
                <BeakerIcon className="h-4 w-4" />
                Custom Theme Active
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCreateTheme}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create New Theme
          </Button>
          <Button variant="outline" onClick={handleRestoreDefault}>
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Restore Default 100%
          </Button>
          {!editingTheme.is_default && (
            <Button variant="premium" onClick={handleSaveTheme}>
              <BookmarkIcon className="h-4 w-4 mr-2" />
              Save & Apply
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Selection */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SwatchIcon className="h-5 w-5" />
              Theme Selection
            </CardTitle>
            <CardDescription>
              Choose a theme to customize or use as-is
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    editingTheme.id === theme.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleThemeSelect(theme)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{theme.name}</h3>
                      <p className="text-sm text-muted-foreground">{theme.description}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {theme.is_default && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                      {theme.is_active && (
                        <Badge variant="default" className="text-xs">Active</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {['primary_color', 'secondary_color', 'accent_color', 'rose_gold'].map((colorKey) => (
                      <div 
                        key={colorKey}
                        className="w-4 h-4 rounded-full border border-border"
                        style={{ 
                          backgroundColor: `hsl(${theme[colorKey as keyof Theme]})` 
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Theme Editor */}
        <Card className="elegant-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PaintBrushIcon className="h-5 w-5" />
              Theme Editor: {editingTheme.name}
              {editingTheme.is_default && (
                <Badge variant="secondary">Read-only</Badge>
              )}
            </CardTitle>
            <CardDescription>
              {editingTheme.is_default 
                ? "Default theme is protected and cannot be modified"
                : "Customize colors, typography, and visual effects"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="effects">Effects</TabsTrigger>
              </TabsList>
              
              <TabsContent value="colors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {colorPickers.map(({ key, label, description }) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key}>{label}</Label>
                      <p className="text-xs text-muted-foreground">{description}</p>
                      <div className="flex gap-2">
                        <Input
                          id={key}
                          type="color"
                          value={convertHslToHex(editingTheme[key as keyof Theme] as string)}
                          onChange={(e) => handleThemeChange(key as keyof Theme, convertHexToHsl(e.target.value))}
                          className="w-16 h-10"
                          disabled={editingTheme.is_default}
                        />
                        <Input
                          value={editingTheme[key as keyof Theme] as string}
                          onChange={(e) => handleThemeChange(key as keyof Theme, e.target.value)}
                          className="flex-1"
                          placeholder="HSL format: 45 95% 58%"
                          disabled={editingTheme.is_default}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="typography" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="font_family">Font Family</Label>
                    <Select 
                      value={editingTheme.font_family} 
                      onValueChange={(value) => handleThemeChange('font_family', value)}
                      disabled={editingTheme.is_default}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                        <SelectItem value="Dancing Script">Dancing Script</SelectItem>
                        <SelectItem value="Merriweather">Merriweather</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="font_size">Font Size</Label>
                    <Select 
                      value={editingTheme.font_size} 
                      onValueChange={(value) => handleThemeChange('font_size', value)}
                      disabled={editingTheme.is_default}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="14px">14px</SelectItem>
                        <SelectItem value="15px">15px</SelectItem>
                        <SelectItem value="16px">16px</SelectItem>
                        <SelectItem value="17px">17px</SelectItem>
                        <SelectItem value="18px">18px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heading_font">Heading Font</Label>
                    <Select 
                      value={editingTheme.heading_font} 
                      onValueChange={(value) => handleThemeChange('heading_font', value)}
                      disabled={editingTheme.is_default}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select heading font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                        <SelectItem value="Dancing Script">Dancing Script</SelectItem>
                        <SelectItem value="Merriweather">Merriweather</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="layout" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="border_radius">Border Radius</Label>
                    <Select 
                      value={editingTheme.border_radius} 
                      onValueChange={(value) => handleThemeChange('border_radius', value)}
                      disabled={editingTheme.is_default}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.25rem">Small (0.25rem)</SelectItem>
                        <SelectItem value="0.5rem">Medium (0.5rem)</SelectItem>
                        <SelectItem value="1rem">Large (1rem)</SelectItem>
                        <SelectItem value="1.5rem">Extra Large (1.5rem)</SelectItem>
                        <SelectItem value="2rem">Maximum (2rem)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="spacing">Spacing Scale</Label>
                    <Select 
                      value={editingTheme.spacing} 
                      onValueChange={(value) => handleThemeChange('spacing', value)}
                      disabled={editingTheme.is_default}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select spacing" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1rem">Compact (1rem)</SelectItem>
                        <SelectItem value="1.5rem">Normal (1.5rem)</SelectItem>
                        <SelectItem value="2rem">Spacious (2rem)</SelectItem>
                        <SelectItem value="2.5rem">Luxurious (2.5rem)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="effects" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shadow_style">Shadow Style</Label>
                    <Select 
                      value={editingTheme.shadow_style} 
                      onValueChange={(value) => handleThemeChange('shadow_style', value)}
                      disabled={editingTheme.is_default}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select shadow" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="soft">Soft</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="dramatic">Dramatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="animation_speed">Animation Speed</Label>
                    <Select 
                      value={editingTheme.animation_speed} 
                      onValueChange={(value) => handleThemeChange('animation_speed', value)}
                      disabled={editingTheme.is_default}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select speed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="fast">Fast</SelectItem>
                        <SelectItem value="instant">Instant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <EyeIcon className="h-5 w-5" />
            Live Preview: {editingTheme.name}
          </CardTitle>
          <CardDescription>
            Preview how the theme looks with current settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="p-8 rounded-lg border space-y-6"
            style={{
              backgroundColor: `hsl(${editingTheme.background_color})`,
              borderColor: `hsl(${editingTheme.border_color})`,
              fontFamily: editingTheme.font_family,
              fontSize: editingTheme.font_size,
              borderRadius: editingTheme.border_radius,
            }}
          >
            {/* Hero Preview */}
            <div className="text-center space-y-4">
              <h1 
                className="text-4xl font-bold"
                style={{ 
                  background: `linear-gradient(135deg, hsl(${editingTheme.primary_color}), hsl(${editingTheme.primary_glow}))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: editingTheme.heading_font
                }}
              >
                Dhika & Sari
              </h1>
              <p style={{ color: `hsl(${editingTheme.muted_color})` }}>
                15 Februari 2025
              </p>
            </div>

            {/* Card Preview */}
            <div 
              className="p-6 rounded-lg"
              style={{
                backgroundColor: `hsl(${editingTheme.card_color})`,
                borderRadius: editingTheme.border_radius,
                border: `1px solid hsl(${editingTheme.border_color})`,
                boxShadow: editingTheme.shadow_style === 'premium' 
                  ? `0 20px 40px -12px hsl(${editingTheme.primary_color} / 0.3)` 
                  : editingTheme.shadow_style === 'soft'
                  ? `0 4px 6px -1px hsl(${editingTheme.primary_color} / 0.1)`
                  : 'none'
              }}
            >
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ color: `hsl(${editingTheme.text_color})` }}
              >
                Wedding Details
              </h3>
              <p style={{ color: `hsl(${editingTheme.muted_color})` }}>
                Join us in celebrating our special day filled with love, joy, and eternal commitment.
              </p>
            </div>

            {/* Button Preview */}
            <div className="flex gap-4 justify-center">
              <button 
                className="px-6 py-3 rounded font-medium transition-all"
                style={{
                  backgroundColor: `hsl(${editingTheme.primary_color})`,
                  color: `hsl(${editingTheme.background_color})`,
                  borderRadius: editingTheme.border_radius,
                }}
              >
                Primary Button
              </button>
              <button 
                className="px-6 py-3 rounded font-medium border transition-all"
                style={{
                  borderColor: `hsl(${editingTheme.rose_gold})`,
                  color: `hsl(${editingTheme.rose_gold})`,
                  borderRadius: editingTheme.border_radius,
                  backgroundColor: 'transparent'
                }}
              >
                Secondary Button
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeManager;