
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
  SaveIcon,
  RefreshCwIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';

interface Theme {
  id: string;
  name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  font_family: string;
  font_size: string;
  border_radius: string;
  shadow: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const ThemeEditor = () => {
  const [themes, setThemes] = useState<Theme[]>([
    {
      id: '1',
      name: 'Classic Elegant',
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
      created_at: '2024-01-15T08:00:00Z',
      updated_at: '2024-01-15T08:00:00Z'
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
      created_at: '2024-01-15T08:00:00Z',
      updated_at: '2024-01-15T08:00:00Z'
    }
  ]);

  const [activeTheme, setActiveTheme] = useState<Theme>(themes.find(t => t.is_active) || themes[0]);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSaveTheme = () => {
    const updatedThemes = themes.map(theme => ({
      ...theme,
      is_active: theme.id === activeTheme.id,
      ...(theme.id === activeTheme.id ? { ...activeTheme, updated_at: new Date().toISOString() } : {})
    }));
    
    setThemes(updatedThemes);
    setIsEditing(false);
    toast({
      title: "Theme disimpan",
      description: "Pengaturan theme berhasil disimpan dan diterapkan.",
    });
  };

  const handleResetTheme = () => {
    const originalTheme = themes.find(t => t.id === activeTheme.id);
    if (originalTheme) {
      setActiveTheme(originalTheme);
      toast({
        title: "Theme direset",
        description: "Pengaturan theme dikembalikan ke kondisi semula.",
      });
    }
  };

  const handleCreateTheme = () => {
    const newTheme: Theme = {
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setThemes([...themes, newTheme]);
    setActiveTheme(newTheme);
    setIsEditing(true);
    toast({
      title: "Theme baru dibuat",
      description: "Theme baru berhasil dibuat dan siap untuk diedit.",
    });
  };

  const handleThemeChange = (field: keyof Theme, value: string) => {
    setActiveTheme(prev => ({
      ...prev,
      [field]: value
    }));
    setIsEditing(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Theme Editor</h1>
          <p className="text-muted-foreground">Kustomisasi tampilan website pernikahan</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCreateTheme}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Buat Theme Baru
          </Button>
          <Button variant="outline" onClick={handleResetTheme}>
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button variant="premium" onClick={handleSaveTheme}>
            <SaveIcon className="h-4 w-4 mr-2" />
            Simpan & Terapkan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Selection */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SwatchIcon className="h-5 w-5" />
              Pilih Theme
            </CardTitle>
            <CardDescription>
              Pilih theme yang ingin diedit
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
                  onClick={() => setActiveTheme(theme)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{theme.name}</h3>
                    {theme.is_active && (
                      <Badge variant="default">Aktif</Badge>
                    )}
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
              Editor Theme: {activeTheme.name}
            </CardTitle>
            <CardDescription>
              Kustomisasi warna, font, dan gaya visual
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      />
                      <Input
                        value={activeTheme.primary_color}
                        onChange={(e) => handleThemeChange('primary_color', e.target.value)}
                        className="flex-1"
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
                      />
                      <Input
                        value={activeTheme.secondary_color}
                        onChange={(e) => handleThemeChange('secondary_color', e.target.value)}
                        className="flex-1"
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
                      />
                      <Input
                        value={activeTheme.accent_color}
                        onChange={(e) => handleThemeChange('accent_color', e.target.value)}
                        className="flex-1"
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
                      />
                      <Input
                        value={activeTheme.background_color}
                        onChange={(e) => handleThemeChange('background_color', e.target.value)}
                        className="flex-1"
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
                      />
                      <Input
                        value={activeTheme.text_color}
                        onChange={(e) => handleThemeChange('text_color', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="typography" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="font_family">Font Family</Label>
                    <Select value={activeTheme.font_family} onValueChange={(value) => handleThemeChange('font_family', value)}>
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
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="font_size">Font Size</Label>
                    <Select value={activeTheme.font_size} onValueChange={(value) => handleThemeChange('font_size', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih ukuran font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12px">12px</SelectItem>
                        <SelectItem value="14px">14px</SelectItem>
                        <SelectItem value="16px">16px</SelectItem>
                        <SelectItem value="18px">18px</SelectItem>
                        <SelectItem value="20px">20px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="layout" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="border_radius">Border Radius</Label>
                    <Select value={activeTheme.border_radius} onValueChange={(value) => handleThemeChange('border_radius', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih border radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0px">0px (Square)</SelectItem>
                        <SelectItem value="4px">4px</SelectItem>
                        <SelectItem value="8px">8px</SelectItem>
                        <SelectItem value="12px">12px</SelectItem>
                        <SelectItem value="16px">16px</SelectItem>
                        <SelectItem value="20px">20px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shadow">Shadow</Label>
                    <Select value={activeTheme.shadow} onValueChange={(value) => handleThemeChange('shadow', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih shadow" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="0 1px 2px 0 rgb(0 0 0 / 0.05)">Small</SelectItem>
                        <SelectItem value="0 4px 6px -1px rgb(0 0 0 / 0.1)">Medium</SelectItem>
                        <SelectItem value="0 10px 15px -3px rgb(0 0 0 / 0.1)">Large</SelectItem>
                        <SelectItem value="0 20px 25px -5px rgb(0 0 0 / 0.1)">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <EyeIcon className="h-5 w-5" />
            Preview Theme
          </CardTitle>
          <CardDescription>
            Lihat preview theme yang sedang diedit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="p-6 rounded-lg border"
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
              className="text-2xl font-bold mb-4"
              style={{ color: activeTheme.primary_color }}
            >
              Dhika & Sari
            </h2>
            <p className="mb-4">
              Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dalam acara pernikahan kami.
            </p>
            <div className="flex gap-2">
              <div 
                className="px-4 py-2 rounded text-white font-medium"
                style={{
                  backgroundColor: activeTheme.primary_color,
                  borderRadius: activeTheme.border_radius
                }}
              >
                Primary Button
              </div>
              <div 
                className="px-4 py-2 rounded border font-medium"
                style={{
                  borderColor: activeTheme.secondary_color,
                  color: activeTheme.secondary_color,
                  borderRadius: activeTheme.border_radius
                }}
              >
                Secondary Button
              </div>
              <div 
                className="px-4 py-2 rounded text-white font-medium"
                style={{
                  backgroundColor: activeTheme.accent_color,
                  borderRadius: activeTheme.border_radius
                }}
              >
                Accent Button
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeEditor;
