
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  CogIcon, 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon,
  GlobeAltIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';
import { Save, AlertCircle, Check, X } from 'lucide-react';

interface AppSettings {
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

const Settings = () => {
  const [settings, setSettings] = useLocalStorage<AppSettings>('app-settings', defaultSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const updateSetting = (section: keyof AppSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasChanges(false);
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    setHasChanges(true);
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Unsaved changes
            </Badge>
          )}
          <Button 
            variant="outline" 
            onClick={resetSettings}
          >
            Reset to Default
          </Button>
          <Button 
            onClick={saveSettings}
            disabled={!hasChanges || isLoading}
          >
            {isLoading ? (
              <Save className="h-4 w-4 mr-2 animate-pulse" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <CogIcon className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="wedding" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            Wedding
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellIcon className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldCheckIcon className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <PaintBrushIcon className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic application configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                    placeholder="Enter site name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => updateSetting('general', 'contactEmail', e.target.value)}
                    placeholder="admin@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.general.siteDescription}
                  onChange={(e) => updateSetting('general', 'siteDescription', e.target.value)}
                  placeholder="Brief description of your website"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={settings.general.timezone} 
                    onValueChange={(value) => updateSetting('general', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Jakarta">Asia/Jakarta (WIB)</SelectItem>
                      <SelectItem value="Asia/Makassar">Asia/Makassar (WITA)</SelectItem>
                      <SelectItem value="Asia/Jayapura">Asia/Jayapura (WIT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={settings.general.language} 
                    onValueChange={(value) => updateSetting('general', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable maintenance mode to temporarily disable the site
                  </p>
                </div>
                <Switch
                  checked={settings.general.maintenanceMode}
                  onCheckedChange={(checked) => updateSetting('general', 'maintenanceMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wedding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wedding Settings</CardTitle>
              <CardDescription>Configure wedding-specific options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="coupleNames">Couple Names</Label>
                  <Input
                    id="coupleNames"
                    value={settings.wedding.coupleNames}
                    onChange={(e) => updateSetting('wedding', 'coupleNames', e.target.value)}
                    placeholder="Bride & Groom"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={settings.wedding.venue}
                    onChange={(e) => updateSetting('wedding', 'venue', e.target.value)}
                    placeholder="Wedding venue name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weddingDate">Wedding Date</Label>
                  <Input
                    id="weddingDate"
                    type="date"
                    value={settings.wedding.weddingDate}
                    onChange={(e) => updateSetting('wedding', 'weddingDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rsvpDeadline">RSVP Deadline</Label>
                  <Input
                    id="rsvpDeadline"
                    type="date"
                    value={settings.wedding.rsvpDeadline}
                    onChange={(e) => updateSetting('wedding', 'rsvpDeadline', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxGuests">Max Guests Per Invite</Label>
                <Input
                  id="maxGuests"
                  type="number"
                  min="1"
                  max="10"
                  value={settings.wedding.maxGuestsPerInvite}
                  onChange={(e) => updateSetting('wedding', 'maxGuestsPerInvite', parseInt(e.target.value))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Plus Ones</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow guests to bring additional people
                  </p>
                </div>
                <Switch
                  checked={settings.wedding.allowPlusOnes}
                  onCheckedChange={(checked) => updateSetting('wedding', 'allowPlusOnes', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and alert preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive general email notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>RSVP Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when guests RSVP
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.rsvpNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'rsvpNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reminder Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Send reminder emails to guests
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.reminderEmails}
                    onCheckedChange={(checked) => updateSetting('notifications', 'reminderEmails', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Admin Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive system alerts and warnings
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.adminAlerts}
                    onCheckedChange={(checked) => updateSetting('notifications', 'adminAlerts', checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailTemplate">Email Template</Label>
                <Select 
                  value={settings.notifications.emailTemplate} 
                  onValueChange={(value) => updateSetting('notifications', 'emailTemplate', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Template</SelectItem>
                    <SelectItem value="elegant">Elegant Template</SelectItem>
                    <SelectItem value="minimal">Minimal Template</SelectItem>
                    <SelectItem value="modern">Modern Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and authentication options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Users must verify their email address
                  </p>
                </div>
                <Switch
                  checked={settings.security.requireEmailVerification}
                  onCheckedChange={(checked) => updateSetting('security', 'requireEmailVerification', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Guest Registration</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow guests to create their own accounts
                  </p>
                </div>
                <Switch
                  checked={settings.security.allowGuestRegistration}
                  onCheckedChange={(checked) => updateSetting('security', 'allowGuestRegistration', checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="1440"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    min="3"
                    max="10"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select 
                    value={settings.appearance.theme} 
                    onValueChange={(value) => updateSetting('appearance', 'theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elegant">Elegant</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => updateSetting('appearance', 'primaryColor', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  value={settings.appearance.logoUrl}
                  onChange={(e) => updateSetting('appearance', 'logoUrl', e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  value={settings.appearance.customCSS}
                  onChange={(e) => updateSetting('appearance', 'customCSS', e.target.value)}
                  placeholder="/* Add your custom CSS here */"
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
