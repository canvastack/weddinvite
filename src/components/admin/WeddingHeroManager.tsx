
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useWeddingHero, WeddingHeroSettings } from '@/hooks/useWeddingHero';
import { Loader2, Save, Eye, EyeOff } from 'lucide-react';

export const WeddingHeroManager = () => {
  const { settings, isLoading, updateSettings } = useWeddingHero();
  const [formData, setFormData] = useState<Partial<WeddingHeroSettings>>(settings || {});
  const [isUpdating, setIsUpdating] = useState(false);

  // Update form data when settings load
  React.useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleInputChange = (field: keyof WeddingHeroSettings, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setIsUpdating(true);
    await updateSettings(formData);
    setIsUpdating(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading wedding hero settings...</span>
      </div>
    );
  }

  if (!settings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wedding Hero Settings</CardTitle>
          <CardDescription>No wedding hero settings found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wedding Hero Settings</CardTitle>
        <CardDescription>Manage the content displayed on the wedding hero section</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Names Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="groom_name">Groom Name</Label>
              <Input
                id="groom_name"
                value={formData.groom_name || ''}
                onChange={(e) => handleInputChange('groom_name', e.target.value)}
                placeholder="Enter groom's name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bride_name">Bride Name</Label>
              <Input
                id="bride_name"
                value={formData.bride_name || ''}
                onChange={(e) => handleInputChange('bride_name', e.target.value)}
                placeholder="Enter bride's name"
              />
            </div>
          </div>

          {/* Wedding Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wedding_date">Wedding Date</Label>
              <Input
                id="wedding_date"
                type="date"
                value={formData.wedding_date || ''}
                onChange={(e) => handleInputChange('wedding_date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wedding_time">Wedding Time</Label>
              <Input
                id="wedding_time"
                type="time"
                value={formData.wedding_time || ''}
                onChange={(e) => handleInputChange('wedding_time', e.target.value)}
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Input
              id="hero_subtitle"
              value={formData.hero_subtitle || ''}
              onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
              placeholder="e.g., Merayakan Cinta yang Abadi"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero_description">Hero Description</Label>
            <Textarea
              id="hero_description"
              value={formData.hero_description || ''}
              onChange={(e) => handleInputChange('hero_description', e.target.value)}
              placeholder="Enter hero description"
              rows={3}
            />
          </div>

          {/* Venue Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ceremony Venue</h3>
            <div className="space-y-2">
              <Label htmlFor="ceremony_venue_name">Venue Name</Label>
              <Input
                id="ceremony_venue_name"
                value={formData.ceremony_venue_name || ''}
                onChange={(e) => handleInputChange('ceremony_venue_name', e.target.value)}
                placeholder="Enter ceremony venue name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ceremony_venue_address">Venue Address</Label>
              <Textarea
                id="ceremony_venue_address"
                value={formData.ceremony_venue_address || ''}
                onChange={(e) => handleInputChange('ceremony_venue_address', e.target.value)}
                placeholder="Enter ceremony venue address"
                rows={2}
              />
            </div>
          </div>

          {/* Reception Venue (Optional) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Reception Venue (Optional)</h3>
            <div className="space-y-2">
              <Label htmlFor="reception_venue_name">Reception Venue Name</Label>
              <Input
                id="reception_venue_name"
                value={formData.reception_venue_name || ''}
                onChange={(e) => handleInputChange('reception_venue_name', e.target.value)}
                placeholder="Enter reception venue name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reception_venue_address">Reception Venue Address</Label>
              <Textarea
                id="reception_venue_address"
                value={formData.reception_venue_address || ''}
                onChange={(e) => handleInputChange('reception_venue_address', e.target.value)}
                placeholder="Enter reception venue address"
                rows={2}
              />
            </div>
          </div>

          {/* Background Image */}
          <div className="space-y-2">
            <Label htmlFor="hero_background_image">Background Image URL (Optional)</Label>
            <Input
              id="hero_background_image"
              type="url"
              value={formData.hero_background_image || ''}
              onChange={(e) => handleInputChange('hero_background_image', e.target.value)}
              placeholder="Enter background image URL"
            />
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="countdown_enabled"
                checked={formData.countdown_enabled || false}
                onCheckedChange={(checked) => handleInputChange('countdown_enabled', checked)}
              />
              <Label htmlFor="countdown_enabled">Enable Countdown</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active || false}
                onCheckedChange={(checked) => handleInputChange('is_active', checked)}
              />
              <Label htmlFor="is_active" className="flex items-center gap-2">
                {formData.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                Active
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
