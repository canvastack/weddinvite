
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { EnvelopeIcon, PaperAirplaneIcon, UsersIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'invitation' | 'reminder' | 'thank_you' | 'custom';
}

interface EmailCampaign {
  id: string;
  name: string;
  template: EmailTemplate;
  recipients: number;
  sent: number;
  status: 'draft' | 'sending' | 'sent' | 'failed';
  createdAt: string;
  sentAt?: string;
}

const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Undangan Pernikahan',
    subject: 'Undangan Pernikahan Dhika & Sari',
    content: 'Dengan penuh rasa syukur, kami mengundang Anda untuk hadir di hari bahagia kami...',
    type: 'invitation'
  },
  {
    id: '2', 
    name: 'Reminder RSVP',
    subject: 'Reminder: Konfirmasi Kehadiran',
    content: 'Halo! Jangan lupa untuk mengkonfirmasi kehadiran Anda di pernikahan kami...',
    type: 'reminder'
  },
  {
    id: '3',
    name: 'Terima Kasih',
    subject: 'Terima Kasih atas Kehadiran Anda',
    content: 'Terima kasih telah hadir dan memberikan doa terbaik untuk pernikahan kami...',
    type: 'thank_you'
  }
];

const mockCampaigns: EmailCampaign[] = [
  {
    id: '1',
    name: 'Undangan Utama',
    template: mockTemplates[0],
    recipients: 150,
    sent: 150,
    status: 'sent',
    createdAt: '2024-01-15',
    sentAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Reminder RSVP Batch 1',
    template: mockTemplates[1],
    recipients: 45,
    sent: 45,
    status: 'sent',
    createdAt: '2024-01-20',
    sentAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Thank You Message',
    template: mockTemplates[2],
    recipients: 120,
    sent: 0,
    status: 'draft',
    createdAt: '2024-01-25'
  }
];

export const EmailBlastManager = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'create'>('campaigns');
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    templateId: '',
    recipientGroup: 'all'
  });
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    content: '',
    type: 'custom' as EmailTemplate['type']
  });
  const { toast } = useToast();

  const handleSendCampaign = (campaignId: string) => {
    toast({
      title: "Email Campaign Terkirim!",
      description: "Email blast berhasil dikirim ke semua penerima.",
    });
  };

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Berhasil Dibuat!",
      description: "Campaign email baru telah dibuat dan siap dikirim.",
    });
    setNewCampaign({ name: '', templateId: '', recipientGroup: 'all' });
    setActiveTab('campaigns');
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template Tersimpan!",
      description: "Template email berhasil disimpan.",
    });
    setNewTemplate({ name: '', subject: '', content: '', type: 'custom' });
  };

  const getStatusBadge = (status: EmailCampaign['status']) => {
    const variants = {
      draft: { variant: 'secondary' as const, label: 'Draft', icon: ClockIcon },
      sending: { variant: 'default' as const, label: 'Mengirim', icon: PaperAirplaneIcon },
      sent: { variant: 'default' as const, label: 'Terkirim', icon: CheckCircleIcon },
      failed: { variant: 'destructive' as const, label: 'Gagal', icon: ClockIcon }
    };
    const config = variants[status];
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Email Blast Manager</h1>
          <p className="text-muted-foreground">Kelola kampanye email dan template undangan</p>
        </div>
        <EnvelopeIcon className="h-8 w-8 text-primary" />
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'campaigns' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </Button>
        <Button
          variant={activeTab === 'templates' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('templates')}
        >
          Templates
        </Button>
        <Button
          variant={activeTab === 'create' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('create')}
        >
          Buat Baru
        </Button>
      </div>

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <PaperAirplaneIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Total Campaigns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">195</p>
                    <p className="text-sm text-muted-foreground">Email Terkirim</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <UsersIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">150</p>
                    <p className="text-sm text-muted-foreground">Total Penerima</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Campaigns</CardTitle>
              <CardDescription>
                Kelola semua campaign email yang pernah dibuat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCampaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{campaign.name}</h3>
                        {getStatusBadge(campaign.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{campaign.template.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        Dibuat: {new Date(campaign.createdAt).toLocaleDateString('id-ID')}
                        {campaign.sentAt && ` • Dikirim: ${new Date(campaign.sentAt).toLocaleDateString('id-ID')}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{campaign.sent}/{campaign.recipients}</p>
                        <p className="text-xs text-muted-foreground">terkirim</p>
                      </div>
                      {campaign.status === 'draft' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleSendCampaign(campaign.id)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <PaperAirplaneIcon className="h-4 w-4 mr-1" />
                          Kirim
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>
              Kelola template email untuk berbagai keperluan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{template.name}</h3>
                        <Badge variant="outline">{template.type}</Badge>
                      </div>
                      <p className="text-sm font-medium">{template.subject}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {template.content}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Edit
                        </Button>
                        <Button size="sm" className="flex-1">
                          Gunakan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create New Tab */}
      {activeTab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Campaign */}
          <Card>
            <CardHeader>
              <CardTitle>Buat Campaign Baru</CardTitle>
              <CardDescription>
                Buat campaign email blast untuk mengirim undangan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Nama Campaign</Label>
                <Input
                  id="campaignName"
                  placeholder="Masukkan nama campaign"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Pilih Template</Label>
                <Select 
                  value={newCampaign.templateId} 
                  onValueChange={(value) => setNewCampaign(prev => ({ ...prev, templateId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih template email" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Grup Penerima</Label>
                <Select 
                  value={newCampaign.recipientGroup} 
                  onValueChange={(value) => setNewCampaign(prev => ({ ...prev, recipientGroup: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tamu (150 orang)</SelectItem>
                    <SelectItem value="confirmed">Yang Sudah Konfirmasi (85 orang)</SelectItem>
                    <SelectItem value="pending">Yang Belum Konfirmasi (65 orang)</SelectItem>
                    <SelectItem value="family">Keluarga (25 orang)</SelectItem>
                    <SelectItem value="friends">Teman (75 orang)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <Button 
                onClick={handleCreateCampaign} 
                className="w-full"
                disabled={!newCampaign.name || !newCampaign.templateId}
              >
                <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                Buat Campaign
              </Button>
            </CardContent>
          </Card>

          {/* Create Template */}
          <Card>
            <CardHeader>
              <CardTitle>Buat Template Baru</CardTitle>
              <CardDescription>
                Buat template email untuk digunakan dalam campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Nama Template</Label>
                <Input
                  id="templateName"
                  placeholder="Masukkan nama template"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateSubject">Subject Email</Label>
                <Input
                  id="templateSubject"
                  placeholder="Masukkan subject email"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Tipe Template</Label>
                <Select 
                  value={newTemplate.type} 
                  onValueChange={(value: EmailTemplate['type']) => setNewTemplate(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invitation">Undangan</SelectItem>
                    <SelectItem value="reminder">Pengingat</SelectItem>
                    <SelectItem value="thank_you">Terima Kasih</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateContent">Isi Email</Label>
                <Textarea
                  id="templateContent"
                  placeholder="Tulis isi email..."
                  rows={6}
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>

              <Button 
                onClick={handleSaveTemplate} 
                variant="outline" 
                className="w-full"
                disabled={!newTemplate.name || !newTemplate.subject || !newTemplate.content}
              >
                Simpan Template
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
