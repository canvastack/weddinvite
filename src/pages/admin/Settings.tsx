
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  CogIcon, 
  ShieldCheckIcon,
  BellIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  KeyIcon,
  CircleStackIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';
import { AppSettings, settingsAPI } from '@/data/mockSettings';
import { mockBackups } from '@/data/mockBackups';
import { timezones } from '@/data/mockTimezones';

const Settings = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsAPI.getSettings();
      setSettings(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat pengaturan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingChange = (key: string, value: any) => {
    if (!settings) return;
    setSettings(prev => prev ? ({
      ...prev,
      [key]: value
    }) : null);
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setIsSaving(true);
    try {
      await settingsAPI.saveSettings(settings);
      toast({
        title: "Pengaturan disimpan",
        description: "Semua pengaturan berhasil disimpan.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan pengaturan",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestEmail = async () => {
    setIsTestingEmail(true);
    try {
      const result = await settingsAPI.testEmailConfiguration();
      toast({
        title: result.success ? "Test Email Berhasil" : "Test Email Gagal",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menjalankan test email",
        variant: "destructive",
      });
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const result = await settingsAPI.exportData();
      if (result.success) {
        toast({
          title: "Export Berhasil",
          description: "Data berhasil diexport. File akan diunduh secara otomatis.",
        });
        // Simulate file download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `wedding_data_export_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
      }
    } catch (error) {
      toast({
        title: "Export Gagal",
        description: "Terjadi kesalahan saat mengexport data",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleBackupNow = async () => {
    setIsBackingUp(true);
    try {
      const result = await settingsAPI.createBackup();
      if (result.success) {
        toast({
          title: "Backup Berhasil",
          description: `Backup manual berhasil dibuat dengan ID: ${result.backupId}`,
        });
      }
    } catch (error) {
      toast({
        title: "Backup Gagal",
        description: "Terjadi kesalahan saat membuat backup",
        variant: "destructive",
      });
    } finally {
      setIsBackingUp(false);
    }
  };

  if (isLoading || !settings) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Pengaturan</h1>
          <p className="text-muted-foreground">Konfigurasi sistem dan pengaturan aplikasi</p>
        </div>
        <Button 
          variant="premium" 
          onClick={handleSaveSettings}
          disabled={isSaving}
        >
          {isSaving ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="elegant-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GlobeAltIcon className="h-5 w-5" />
                Pengaturan Umum
              </CardTitle>
              <CardDescription>
                Konfigurasi dasar website dan aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Nama Website</Label>
                  <Input
                    id="site_name"
                    value={settings.site_name}
                    onChange={(e) => handleSettingChange('site_name', e.target.value)}
                    placeholder="Nama website"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site_url">URL Website</Label>
                  <Input
                    id="site_url"
                    value={settings.site_url}
                    onChange={(e) => handleSettingChange('site_url', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site_description">Deskripsi Website</Label>
                <Textarea
                  id="site_description"
                  value={settings.site_description}
                  onChange={(e) => handleSettingChange('site_description', e.target.value)}
                  placeholder="Deskripsi website untuk SEO"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select 
                  value={settings.timezone} 
                  onValueChange={(value) => handleSettingChange('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <Card className="elegant-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5" />
                Pengaturan Email
              </CardTitle>
              <CardDescription>
                Konfigurasi SMTP dan pengaturan email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_host">SMTP Host</Label>
                  <Input
                    id="smtp_host"
                    value={settings.smtp_host}
                    onChange={(e) => handleSettingChange('smtp_host', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp_port">SMTP Port</Label>
                  <Input
                    id="smtp_port"
                    value={settings.smtp_port}
                    onChange={(e) => handleSettingChange('smtp_port', e.target.value)}
                    placeholder="587"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_username">SMTP Username</Label>
                  <Input
                    id="smtp_username"
                    value={settings.smtp_username}
                    onChange={(e) => handleSettingChange('smtp_username', e.target.value)}
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp_password">SMTP Password</Label>
                  <Input
                    id="smtp_password"
                    type="password"
                    value={settings.smtp_password}
                    onChange={(e) => handleSettingChange('smtp_password', e.target.value)}
                    placeholder="App password"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email_from_name">From Name</Label>
                  <Input
                    id="email_from_name"
                    value={settings.email_from_name}
                    onChange={(e) => handleSettingChange('email_from_name', e.target.value)}
                    placeholder="Wedding Invitation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email_from_address">From Address</Label>
                  <Input
                    id="email_from_address"
                    value={settings.email_from_address}
                    onChange={(e) => handleSettingChange('email_from_address', e.target.value)}
                    placeholder="noreply@example.com"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleTestEmail} 
                  variant="outline"
                  disabled={isTestingEmail}
                >
                  {isTestingEmail ? 'Testing...' : 'Test Email Configuration'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="elegant-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellIcon className="h-5 w-5" />
                Pengaturan Notifikasi
              </CardTitle>
              <CardDescription>
                Atur notifikasi yang akan diterima
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Terima notifikasi melalui email
                    </p>
                  </div>
                  <Switch
                    checked={settings.email_notifications}
                    onCheckedChange={(checked) => handleSettingChange('email_notifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>RSVP Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifikasi saat ada response RSVP baru
                    </p>
                  </div>
                  <Switch
                    checked={settings.rsvp_notifications}
                    onCheckedChange={(checked) => handleSettingChange('rsvp_notifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Guest Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifikasi aktivitas tamu
                    </p>
                  </div>
                  <Switch
                    checked={settings.guest_notifications}
                    onCheckedChange={(checked) => handleSettingChange('guest_notifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Reminder</Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim reminder otomatis ke tamu
                    </p>
                  </div>
                  <Switch
                    checked={settings.auto_reminder}
                    onCheckedChange={(checked) => handleSettingChange('auto_reminder', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="elegant-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5" />
                Pengaturan Keamanan
              </CardTitle>
              <CardDescription>
                Konfigurasi keamanan dan autentikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan 2FA untuk keamanan ekstra
                  </p>
                </div>
                <Switch
                  checked={settings.two_factor_auth}
                  onCheckedChange={(checked) => handleSettingChange('two_factor_auth', checked)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password_expiry">Password Expiry (hari)</Label>
                  <Input
                    id="password_expiry"
                    type="number"
                    value={settings.password_expiry}
                    onChange={(e) => handleSettingChange('password_expiry', parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_login_attempts">Max Login Attempts</Label>
                  <Input
                    id="max_login_attempts"
                    type="number"
                    value={settings.max_login_attempts}
                    onChange={(e) => handleSettingChange('max_login_attempts', parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session_timeout">Session Timeout (menit)</Label>
                <Input
                  id="session_timeout"
                  type="number"
                  value={settings.session_timeout}
                  onChange={(e) => handleSettingChange('session_timeout', parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card className="elegant-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyIcon className="h-5 w-5" />
                Pengaturan API
              </CardTitle>
              <CardDescription>
                Konfigurasi API keys dan integrasi eksternal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="google_maps_api">Google Maps API Key</Label>
                <Input
                  id="google_maps_api"
                  type="password"
                  value={settings.google_maps_api}
                  onChange={(e) => handleSettingChange('google_maps_api', e.target.value)}
                  placeholder="AIzaSyD..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recaptcha_site_key">reCAPTCHA Site Key</Label>
                  <Input
                    id="recaptcha_site_key"
                    value={settings.recaptcha_site_key}
                    onChange={(e) => handleSettingChange('recaptcha_site_key', e.target.value)}
                    placeholder="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recaptcha_secret_key">reCAPTCHA Secret Key</Label>
                  <Input
                    id="recaptcha_secret_key"
                    type="password"
                    value={settings.recaptcha_secret_key}
                    onChange={(e) => handleSettingChange('recaptcha_secret_key', e.target.value)}
                    placeholder="6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card className="elegant-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircleStackIcon className="h-5 w-5" />
                Pengaturan Backup
              </CardTitle>
              <CardDescription>
                Konfigurasi backup dan restore data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Backup otomatis secara berkala
                  </p>
                </div>
                <Switch
                  checked={settings.auto_backup}
                  onCheckedChange={(checked) => handleSettingChange('auto_backup', checked)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Select 
                    value={settings.backup_frequency} 
                    onValueChange={(value) => handleSettingChange('backup_frequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih frekuensi backup" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup_retention">Backup Retention (hari)</Label>
                  <Input
                    id="backup_retention"
                    type="number"
                    value={settings.backup_retention}
                    onChange={(e) => handleSettingChange('backup_retention', parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleBackupNow} 
                  variant="outline"
                  disabled={isBackingUp}
                >
                  {isBackingUp ? 'Creating Backup...' : 'Backup Sekarang'}
                </Button>
                <Button 
                  onClick={handleExportData} 
                  variant="outline"
                  disabled={isExporting}
                >
                  {isExporting ? 'Exporting...' : 'Export Data'}
                </Button>
              </div>

              {/* Backup History */}
              <div className="pt-6">
                <h3 className="font-medium mb-4">Riwayat Backup</h3>
                <div className="space-y-2">
                  {mockBackups.map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {backup.status === 'completed' ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : backup.status === 'in_progress' ? (
                            <ClockIcon className="h-5 w-5 text-yellow-500" />
                          ) : (
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{backup.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(backup.created_at).toLocaleDateString('id-ID')} - {backup.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={backup.type === 'auto' ? 'secondary' : 'outline'}>
                          {backup.type}
                        </Badge>
                        {backup.status === 'completed' && (
                          <Button size="sm" variant="ghost">
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
