import { useState, useEffect } from 'react';
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
  TrashIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';
import { useTheme, ThemeSettings } from '@/contexts/ThemeContext';

const ThemeEditor = () => {
  const { currentTheme, updateTheme, resetToDefault } = useTheme();
  const { toast } = useToast();
  
  const [themes, setThemes] = useState<ThemeSettings[]>(() => {
    const savedThemes = localStorage.getItem('theme_editor_themes');
    if (savedThemes) {
      try {
        const parsed = JSON.parse(savedThemes);
        // Pastikan default theme selalu ada
        const hasDefault = parsed.some((t: ThemeSettings) => t.id === 'default');
        if (!hasDefault) {
          return [
            {
              id: 'default',
              name: 'Default Wedding Design',
              primary_color: '#8B5CF6',
              secondary_color: '#A78BFA',
              accent_color: '#F59E0B',
              background_color: '#FFFFFF',
              text_color: '#1F2937',
              font_family: 'Inter',
              font_size: '16px',
              border_radius: '8px',
              shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              is_active: true,
              is_default: true,
            },
            ...parsed
          ];
        }
        return parsed;
      } catch {
        return getDefaultThemes();
      }
    }
    return getDefaultThemes();
  });

  function getDefaultThemes(): ThemeSettings[] {
    return [
      {
        id: 'default',
        name: 'Default Wedding Design',
        primary_color: '#8B5CF6',
        secondary_color: '#A78BFA',
        accent_color: '#F59E0B',
        background_color: '#FFFFFF',
        text_color: '#1F2937',
        font_family: 'Inter',
        font_size: '16px',
        border_radius: '8px',
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        is_active: true,
        is_default: true,
      },
      {
        id: '2',
        name: 'Modern Minimalist',
        primary_color: '#3B82F6',
        secondary_color: '#60A5FA',
        accent_color: '#10B981',
        background_color: '#F9FAFB',
        text_color: '#111827',
        font_family: 'Roboto',
        font_size: '14px',
        border_radius: '12px',
        shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        is_active: false,
      },
      {
        id: '3',
        name: 'Romantic Classic',
        primary_color: '#EC4899',
        secondary_color: '#F472B6',
        accent_color: '#DC2626',
        background_color: '#FDF2F8',
        text_color: '#1F2937',
        font_family: 'Playfair Display',
        font_size: '16px',
        border_radius: '6px',
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        is_active: false,
      }
    ];
  }

  const [activeTheme, setActiveTheme] = useState<ThemeSettings>(currentTheme);
  const [originalTheme, setOriginalTheme] = useState<ThemeSettings>(currentTheme);
  const [isEditing, setIsEditing] = useState(false);

  // Save themes to localStorage whenever themes change
  useEffect(() => {
    localStorage.setItem('theme_editor_themes', JSON.stringify(themes));
  }, [themes]);

  // Apply theme changes immediately for preview
  useEffect(() => {
    if (isEditing) {
      console.log('Applying preview theme:', activeTheme.name);
      updateTheme(activeTheme);
    }
  }, [activeTheme, isEditing, updateTheme]);

  const handleSaveTheme = () => {
    // Update the themes list
    const updatedThemes = themes.map(theme => ({
      ...theme,
      is_active: theme.id === activeTheme.id,
      ...(theme.id === activeTheme.id ? { 
        ...activeTheme, 
        updated_at: new Date().toISOString() 
      } : {})
    }));
    
    setThemes(updatedThemes);
    setOriginalTheme(activeTheme);
    setIsEditing(false);
    
    // Ensure the theme is applied
    updateTheme(activeTheme);
    
    toast({
      title: "Theme berhasil disimpan!",
      description: `Theme "${activeTheme.name}" telah diterapkan ke seluruh website.`,
    });

    console.log('Theme saved and applied:', activeTheme.name);
  };

  const handleResetToDefault = () => {
    const defaultTheme = themes.find(t => t.id === 'default');
    if (defaultTheme) {
      console.log('Resetting to default theme');
      setActiveTheme(defaultTheme);
      setOriginalTheme(defaultTheme);
      resetToDefault();
      setIsEditing(false);
      
      toast({
        title: "Theme direset ke default",
        description: "Theme berhasil dikembalikan ke design awal.",
      });
    }
  };

  const handleResetTheme = () => {
    console.log('Resetting theme to original:', originalTheme.name);
    setActiveTheme(originalTheme);
    updateTheme(originalTheme);
    setIsEditing(false);
    
    toast({
      title: "Theme direset",
      description: "Pengaturan theme dikembalikan ke kondisi semula.",
    });
  };

  const handleCreateTheme = () => {
    const newTheme: ThemeSettings = {
      id: Date.now().toString(),
      name: 'Custom Theme',
      primary_color: '#8B5CF6',
      secondary_color: '#A78BFA',
      accent_color: '#F59E0B',
      background_color: '#FFFFFF',
      text_color: '#1F2937',
      font_family: 'Inter',
      font_size: '16px',
      border_radius: '8px',
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      is_active: false,
    };
    
    setThemes([...themes, newTheme]);
    setActiveTheme(newTheme);
    setOriginalTheme(newTheme);
    setIsEditing(true);
    
    toast({
      title: "Theme baru dibuat",
      description: "Theme baru berhasil dibuat dan siap untuk diedit.",
    });
  };

  const handleDeleteTheme = (themeId: string) => {
    // Tidak bisa hapus default theme
    if (themeId === 'default') {
      toast({
        title: "Tidak dapat menghapus",
        description: "Default theme tidak dapat dihapus.",
        variant: "destructive",
      });
      return;
    }

    if (themes.length <= 2) { // Default + minimal 1 custom
      toast({
        title: "Tidak dapat menghapus",
        description: "Minimal harus ada satu theme custom selain default.",
        variant: "destructive",
      });
      return;
    }

    const updatedThemes = themes.filter(t => t.id !== themeId);
    setThemes(updatedThemes);
    
    if (activeTheme.id === themeId) {
      const defaultTheme = updatedThemes.find(t => t.id === 'default') || updatedThemes[0];
      setActiveTheme(defaultTheme);
      setOriginalTheme(defaultTheme);
      updateTheme(defaultTheme);
    }

    toast({
      title: "Theme dihapus",
      description: "Theme berhasil dihapus.",
    });
  };

  const handleThemeChange = (field: keyof ThemeSettings, value: string) => {
    // Tidak bisa edit default theme
    if (activeTheme.id === 'default') {
      toast({
        title: "Default theme tidak dapat diedit",
        description: "Buat theme baru untuk kustomisasi atau pilih theme lain.",
        variant: "destructive",
      });
      return;
    }

    console.log(`Changing ${field} to:`, value);
    const updatedTheme = {
      ...activeTheme,
      [field]: value
    };
    setActiveTheme(updatedTheme);
    setIsEditing(true);
  };

  const handleSelectTheme = (theme: ThemeSettings) => {
    console.log('Selecting theme:', theme.name);
    setActiveTheme(theme);
    setOriginalTheme(theme);
    updateTheme(theme);
    setIsEditing(false);
  };

  const hasChanges = JSON.stringify(activeTheme) !== JSON.stringify(originalTheme);
  const isDefaultTheme = activeTheme.id === 'default';

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Design Settings</h1>
          <p className="text-muted-foreground">Kustomisasi tampilan website pernikahan</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetToDefault}>
            <ShieldCheckIcon className="h-4 w-4 mr-2" />
            Reset ke Default
          </Button>
          <Button variant="outline" onClick={handleCreateTheme}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Buat Theme Baru
          </Button>
          <Button variant="outline" onClick={handleResetTheme} disabled={!hasChanges}>
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            variant="default" 
            onClick={handleSaveTheme} 
            disabled={!hasChanges || isDefaultTheme}
            className="bg-primary hover:bg-primary/90"
          >
            <BookmarkIcon className="h-4 w-4 mr-2" />
            {hasChanges && !isDefaultTheme ? 'Simpan & Terapkan' : 'Tersimpan'}
          </Button>
        </div>
      </div>

      {hasChanges && !isDefaultTheme && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Perhatian:</strong> Anda memiliki perubahan yang belum disimpan. 
            Klik "Simpan & Terapkan" untuk menyimpan perubahan secara permanen.
          </p>
        </div>
      )}

      {isDefaultTheme && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Info:</strong> Anda sedang menggunakan Default Wedding Design. 
            Theme ini tidak dapat diedit untuk menjaga konsistensi design. 
            Buat theme baru untuk kustomisasi.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Selection */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SwatchIcon className="h-5 w-5" />
              Pilih Design
            </CardTitle>
            <CardDescription>
              Pilih design yang ingin digunakan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    activeTheme.id === theme.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleSelectTheme(theme)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{theme.name}</h3>
                      {theme.is_default && (
                        <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {currentTheme.id === theme.id && (
                        <Badge variant="default">Aktif</Badge>
                      )}
                      {theme.is_default && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                      {!theme.is_default && themes.length > 2 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTheme(theme.id);
                          }}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: theme.primary_color }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: theme.secondary_color }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: theme.accent_color }}
                    />
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
              Editor Design: {activeTheme.name}
              {isDefaultTheme && <ShieldCheckIcon className="h-4 w-4 text-green-500" />}
            </CardTitle>
            <CardDescription>
              {isDefaultTheme 
                ? "Default design tidak dapat diedit. Buat theme baru untuk kustomisasi."
                : "Kustomisasi warna, font, dan gaya visual. Perubahan akan langsung terlihat sebagai preview!"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label htmlFor="theme_name">Nama Design</Label>
              <Input
                id="theme_name"
                value={activeTheme.name}
                onChange={(e) => handleThemeChange('name', e.target.value)}
                className="mt-2"
                disabled={isDefaultTheme}
              />
            </div>

            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors">Warna</TabsTrigger>
                <TabsTrigger value="typography">Tipografi</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>
              
              <TabsContent value="colors" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary_color">Warna Primer</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary_color"
                        type="color"
                        value={activeTheme.primary_color}
                        onChange={(e) => handleThemeChange('primary_color', e.target.value)}
                        className="w-16 h-10"
                        disabled={isDefaultTheme}
                      />
                      <Input
                        value={activeTheme.primary_color}
                        onChange={(e) => handleThemeChange('primary_color', e.target.value)}
                        className="flex-1"
                        disabled={isDefaultTheme}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary_color">Warna Sekunder</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary_color"
                        type="color"
                        value={activeTheme.secondary_color}
                        onChange={(e) => handleThemeChange('secondary_color', e.target.value)}
                        className="w-16 h-10"
                        disabled={isDefaultTheme}
                      />
                      <Input
                        value={activeTheme.secondary_color}
                        onChange={(e) => handleThemeChange('secondary_color', e.target.value)}
                        className="flex-1"
                        disabled={isDefaultTheme}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accent_color">Warna Aksen</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accent_color"
                        type="color"
                        value={activeTheme.accent_color}
                        onChange={(e) => handleThemeChange('accent_color', e.target.value)}
                        className="w-16 h-10"
                        disabled={isDefaultTheme}
                      />
                      <Input
                        value={activeTheme.accent_color}
                        onChange={(e) => handleThemeChange('accent_color', e.target.value)}
                        className="flex-1"
                        disabled={isDefaultTheme}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="background_color">Warna Background</Label>
                    <div className="flex gap-2">
                      <Input
                        id="background_color"
                        type="color"
                        value={activeTheme.background_color}
                        onChange={(e) => handleThemeChange('background_color', e.target.value)}
                        className="w-16 h-10"
                        disabled={isDefaultTheme}
                      />
                      <Input
                        value={activeTheme.background_color}
                        onChange={(e) => handleThemeChange('background_color', e.target.value)}
                        className="flex-1"
                        disabled={isDefaultTheme}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text_color">Warna Teks</Label>
                    <div className="flex gap-2">
                      <Input
                        id="text_color"
                        type="color"
                        value={activeTheme.text_color}
                        onChange={(e) => handleThemeChange('text_color', e.target.value)}
                        className="w-16 h-10"
                        disabled={isDefaultTheme}
                      />
                      <Input
                        value={activeTheme.text_color}
                        onChange={(e) => handleThemeChange('text_color', e.target.value)}
                        className="flex-1"
                        disabled={isDefaultTheme}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="typography" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="font_family">Font Family</Label>
                    <Select 
                      value={activeTheme.font_family} 
                      onValueChange={(value) => handleThemeChange('font_family', value)}
                      disabled={isDefaultTheme}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                        <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="font_size">Font Size</Label>
                    <Select 
                      value={activeTheme.font_size} 
                      onValueChange={(value) => handleThemeChange('font_size', value)}
                      disabled={isDefaultTheme}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih ukuran font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12px">12px (Kecil)</SelectItem>
                        <SelectItem value="14px">14px (Normal)</SelectItem>
                        <SelectItem value="16px">16px (Medium)</SelectItem>
                        <SelectItem value="18px">18px (Besar)</SelectItem>
                        <SelectItem value="20px">20px (Ekstra Besar)</SelectItem>
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
                      value={activeTheme.border_radius} 
                      onValueChange={(value) => handleThemeChange('border_radius', value)}
                      disabled={isDefaultTheme}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih border radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0px">0px (Square)</SelectItem>
                        <SelectItem value="4px">4px (Sedikit)</SelectItem>
                        <SelectItem value="8px">8px (Normal)</SelectItem>
                        <SelectItem value="12px">12px (Sedang)</SelectItem>
                        <SelectItem value="16px">16px (Besar)</SelectItem>
                        <SelectItem value="20px">20px (Ekstra Besar)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shadow">Shadow</Label>
                    <Select 
                      value={activeTheme.shadow} 
                      onValueChange={(value) => handleThemeChange('shadow', value)}
                      disabled={isDefaultTheme}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih shadow" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None (Tanpa Bayangan)</SelectItem>
                        <SelectItem value="0 1px 2px 0 rgb(0 0 0 / 0.05)">Small (Kecil)</SelectItem>
                        <SelectItem value="0 4px 6px -1px rgb(0 0 0 / 0.1)">Medium (Normal)</SelectItem>
                        <SelectItem value="0 10px 15px -3px rgb(0 0 0 / 0.1)">Large (Besar)</SelectItem>
                        <SelectItem value="0 20px 25px -5px rgb(0 0 0 / 0.1)">Extra Large (Ekstra Besar)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Live Preview */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <EyeIcon className="h-5 w-5" />
            Live Preview
          </CardTitle>
          <CardDescription>
            Preview design yang sedang dipilih. {hasChanges && !isDefaultTheme ? 'Simpan untuk menerapkan perubahan secara permanen.' : 'Design saat ini telah diterapkan.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="p-6 rounded-lg border transition-all duration-300"
            style={{
              backgroundColor: activeTheme.background_color,
              color: activeTheme.text_color,
              fontFamily: activeTheme.font_family,
              fontSize: activeTheme.font_size,
              borderRadius: activeTheme.border_radius,
              boxShadow: activeTheme.shadow
            }}
          >
            <h2 
              className="text-2xl font-bold mb-4 transition-colors duration-300"
              style={{ color: activeTheme.primary_color }}
            >
              Dhika & Sari
            </h2>
            <p className="mb-4">
              Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dalam acara pernikahan kami.
            </p>
            <div className="flex flex-wrap gap-2">
              <button 
                className="px-4 py-2 text-white font-medium transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: activeTheme.primary_color,
                  borderRadius: activeTheme.border_radius,
                  boxShadow: activeTheme.shadow
                }}
              >
                Primary Button
              </button>
              <button 
                className="px-4 py-2 border font-medium transition-all duration-300 hover:opacity-90"
                style={{
                  borderColor: activeTheme.secondary_color,
                  color: activeTheme.secondary_color,
                  borderRadius: activeTheme.border_radius
                }}
              >
                Secondary Button
              </button>
              <button 
                className="px-4 py-2 text-white font-medium transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: activeTheme.accent_color,
                  borderRadius: activeTheme.border_radius
                }}
              >
                Accent Button
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeEditor;
