
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
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/data/mockThemes';

export const ThemeManager = () => {
  const { currentTheme, themes, setTheme, updateTheme, resetToDefault } = useTheme();
  const [editingTheme, setEditingTheme] = useState<Theme>(currentTheme);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSaveTheme = () => {
    const updatedTheme = {
      ...editingTheme,
      updated_at: new Date().toISOString()
    };
    
    updateTheme(updatedTheme);
    setTheme(updatedTheme.id);
    setIsEditing(false);
    
    toast({
      title: "Theme berhasil disimpan",
      description: "Pengaturan theme telah diterapkan ke website.",
    });
  };

  const handleResetTheme = () => {
    resetToDefault();
    setEditingTheme(themes[0]);
    setIsEditing(false);
    
    toast({
      title: "Theme direset",
      description: "Theme dikembalikan ke pengaturan default.",
    });
  };

  const handleThemeSelect = (theme: Theme) => {
    setEditingTheme(theme);
    setTheme(theme.id);
    setIsEditing(false);
  };

  const handleThemeChange = (field: keyof Theme, value: string) => {
    setEditingTheme(prev => ({
      ...prev,
      [field]: value
    }));
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Design Management</h2>
          <p className="text-muted-foreground">Kelola tema dan tampilan website pernikahan</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetTheme}>
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Reset ke Default
          </Button>
          <Button variant="premium" onClick={handleSaveTheme} disabled={!isEditing}>
            <BookmarkIcon className="h-4 w-4 mr-2" />
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
              Pilih theme yang ingin diterapkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                    currentTheme.id === theme.id 
                      ? 'border-primary bg-primary/5 shadow-premium' 
                      : 'hover:bg-muted/50 hover:border-primary/20'
                  }`}
                  onClick={() => handleThemeSelect(theme)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold">{theme.name}</h3>
                    {theme.is_active && (
                      <Badge variant="default">Aktif</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{theme.description}</p>
                  <div className="flex gap-2">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: theme.primary_color }}
                      title="Primary Color"
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: theme.secondary_color }}
                      title="Secondary Color"
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: theme.accent_color }}
                      title="Accent Color"
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: theme.background_color }}
                      title="Background Color"
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
              Customize Theme: {editingTheme.name}
            </CardTitle>
            <CardDescription>
              Sesuaikan warna, font, dan elemen visual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors">Warna & Gradasi</TabsTrigger>
                <TabsTrigger value="typography">Tipografi</TabsTrigger>
                <TabsTrigger value="effects">Efek & Animasi</TabsTrigger>
              </TabsList>
              
              <TabsContent value="colors" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primary_color">Warna Primer (Primary)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary_color"
                        type="color"
                        value={editingTheme.primary_color}
                        onChange={(e) => handleThemeChange('primary_color', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={editingTheme.primary_color}
                        onChange={(e) => handleThemeChange('primary_color', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Digunakan untuk tombol utama, link, dan aksen</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary_color">Warna Sekunder (Secondary)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary_color"
                        type="color"
                        value={editingTheme.secondary_color}
                        onChange={(e) => handleThemeChange('secondary_color', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={editingTheme.secondary_color}
                        onChange={(e) => handleThemeChange('secondary_color', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Warna pendukung untuk elemen sekunder</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accent_color">Warna Aksen (Rose Gold)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accent_color"
                        type="color"
                        value={editingTheme.accent_color}
                        onChange={(e) => handleThemeChange('accent_color', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={editingTheme.accent_color}
                        onChange={(e) => handleThemeChange('accent_color', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Warna untuk efek khusus dan gradasi</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="background_color">Warna Background</Label>
                    <div className="flex gap-2">
                      <Input
                        id="background_color"
                        type="color"
                        value={editingTheme.background_color}
                        onChange={(e) => handleThemeChange('background_color', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={editingTheme.background_color}
                        onChange={(e) => handleThemeChange('background_color', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Latar belakang utama website</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text_color">Warna Teks</Label>
                    <div className="flex gap-2">
                      <Input
                        id="text_color"
                        type="color"
                        value={editingTheme.text_color}
                        onChange={(e) => handleThemeChange('text_color', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={editingTheme.text_color}
                        onChange={(e) => handleThemeChange('text_color', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Warna teks utama</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="typography" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="font_family">Font Family</Label>
                    <Select value={editingTheme.font_family} onValueChange={(value) => handleThemeChange('font_family', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Playfair Display">Playfair Display (Elegant)</SelectItem>
                        <SelectItem value="Dancing Script">Dancing Script (Romantic)</SelectItem>
                        <SelectItem value="Roboto">Roboto (Modern)</SelectItem>
                        <SelectItem value="Merriweather">Merriweather (Classic)</SelectItem>
                        <SelectItem value="Inter">Inter (Clean)</SelectItem>
                        <SelectItem value="Poppins">Poppins (Friendly)</SelectItem>
                        <SelectItem value="Open Sans">Open Sans (Readable)</SelectItem>
                        <SelectItem value="Lato">Lato (Professional)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="effects" className="space-y-4">
                <div className="space-y-4">
                  <div className="bg-muted/20 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Efek Visual Aktif</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <span>Gradient Premium Effects</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-rose-gold rounded-full" />
                        <span>Elegant Shadows</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded-full" />
                        <span>Hover Animations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-full" />
                        <span>Floating Elements</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Semua efek visual (gradasi, hover, animasi floating, smoke effect, glow effect) 
                    akan otomatis menyesuaikan dengan warna theme yang dipilih.
                  </p>
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
            Preview real-time dari theme yang sedang diedit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="p-8 rounded-2xl border-2 transition-all duration-300"
            style={{
              backgroundColor: editingTheme.background_color,
              color: editingTheme.text_color,
              fontFamily: editingTheme.font_family,
              borderColor: editingTheme.primary_color + '30'
            }}
          >
            <div className="text-center space-y-6">
              <h2 
                className="text-4xl font-bold mb-2"
                style={{ 
                  background: `linear-gradient(135deg, ${editingTheme.primary_color}, ${editingTheme.accent_color})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Dhika & Sari
              </h2>
              <p className="text-lg mb-6" style={{ color: editingTheme.text_color + 'CC' }}>
                Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dalam acara pernikahan kami.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: editingTheme.primary_color,
                    color: editingTheme.background_color,
                    boxShadow: `0 4px 15px ${editingTheme.primary_color}40`
                  }}
                >
                  Primary Button
                </button>
                <button 
                  className="px-8 py-3 rounded-lg border-2 font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    borderColor: editingTheme.secondary_color,
                    color: editingTheme.secondary_color,
                    backgroundColor: 'transparent'
                  }}
                >
                  Secondary Button
                </button>
                <button 
                  className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${editingTheme.accent_color}, ${editingTheme.primary_color})`,
                    color: editingTheme.background_color,
                    boxShadow: `0 4px 15px ${editingTheme.accent_color}40`
                  }}
                >
                  Gradient Button
                </button>
              </div>
              
              <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: editingTheme.primary_color + '10' }}>
                <h3 className="text-xl font-semibold mb-2" style={{ color: editingTheme.primary_color }}>
                  Card Component Preview
                </h3>
                <p style={{ color: editingTheme.text_color + 'DD' }}>
                  Ini adalah contoh card dengan theme yang sedang dipilih
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
