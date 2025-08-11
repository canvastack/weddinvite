
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  EnvelopeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  templateId?: string;
  recipients: string[];
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  scheduledDate?: string;
  sentDate?: string;
  openRate?: number;
  clickRate?: number;
  created_at: string;
  updated_at: string;
}

const defaultCampaigns: EmailCampaign[] = [
  {
    id: '1',
    name: 'Save the Date',
    subject: 'Save the Date - Wedding Invitation',
    content: 'Dear friends, we are excited to share that we will be getting married on...',
    recipients: ['all_guests'],
    status: 'sent',
    sentDate: '2024-01-15',
    openRate: 85,
    clickRate: 42,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

const EmailCampaignManager = () => {
  const [campaigns, setCampaigns] = useLocalStorage<EmailCampaign[]>('email-campaigns', defaultCampaigns);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<EmailCampaign | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    templateId: '',
    recipients: ['all_guests'],
    status: 'draft' as const,
    scheduledDate: ''
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="default">Terkirim</Badge>;
      case 'scheduled':
        return <Badge variant="secondary">Terjadwal</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'failed':
        return <Badge variant="destructive">Gagal</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAdd = () => {
    setEditingCampaign(null);
    setFormData({
      name: '',
      subject: '',
      content: '',
      templateId: '',
      recipients: ['all_guests'],
      status: 'draft',
      scheduledDate: ''
    });
    setIsFormOpen(true);
  };

  const handleEdit = (campaign: EmailCampaign) => {
    setEditingCampaign(campaign);
    setFormData({
      name: campaign.name,
      subject: campaign.subject,
      content: campaign.content,
      templateId: campaign.templateId || '',
      recipients: campaign.recipients,
      status: campaign.status,
      scheduledDate: campaign.scheduledDate || ''
    });
    setIsFormOpen(true);
  };

  const handleView = (campaign: EmailCampaign) => {
    setSelectedCampaign(campaign);
    setIsDetailOpen(true);
  };

  const handleDelete = (campaignId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus campaign ini?')) {
      setCampaigns(prev => prev.filter(c => c.id !== campaignId));
      toast({
        title: "Campaign dihapus",
        description: "Email campaign berhasil dihapus.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCampaign) {
      setCampaigns(prev => prev.map(c => 
        c.id === editingCampaign.id 
          ? { 
              ...c, 
              ...formData, 
              updated_at: new Date().toISOString() 
            }
          : c
      ));
      toast({
        title: "Campaign diperbarui",
        description: "Email campaign berhasil diperbarui.",
      });
    } else {
      const newCampaign: EmailCampaign = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setCampaigns(prev => [...prev, newCampaign]);
      toast({
        title: "Campaign dibuat",
        description: "Email campaign baru berhasil dibuat.",
      });
    }
    
    setIsFormOpen(false);
    setEditingCampaign(null);
  };

  const handleSendCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => 
      c.id === campaignId 
        ? { 
            ...c, 
            status: 'sent' as const, 
            sentDate: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        : c
    ));
    toast({
      title: "Campaign terkirim",
      description: "Email campaign berhasil dikirim ke semua penerima.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Campaigns</h2>
          <p className="text-muted-foreground">Kelola kampanye email untuk undangan pernikahan</p>
        </div>
        <Button onClick={handleAdd}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Buat Campaign
        </Button>
      </div>

      {/* Campaigns List */}
      <div className="grid gap-4">
        {campaigns.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <EnvelopeIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Belum ada email campaign</p>
            </CardContent>
          </Card>
        ) : (
          campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{campaign.name}</h3>
                      {getStatusBadge(campaign.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      📧 {campaign.subject}
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>👥 {campaign.recipients.length} penerima</p>
                      {campaign.sentDate && <p>📅 Terkirim: {new Date(campaign.sentDate).toLocaleDateString()}</p>}
                      {campaign.scheduledDate && <p>⏰ Terjadwal: {new Date(campaign.scheduledDate).toLocaleDateString()}</p>}
                      {campaign.openRate && <p>📊 Open Rate: {campaign.openRate}%</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(campaign)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(campaign)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    {campaign.status === 'draft' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendCampaign(campaign.id)}
                      >
                        <EnvelopeIcon className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(campaign.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Campaign Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCampaign ? 'Edit Campaign' : 'Buat Campaign Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingCampaign ? 'Perbarui detail campaign' : 'Buat email campaign baru untuk undangan'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Campaign</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Save the Date Campaign"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject Email</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Save the Date - Wedding Invitation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten Email</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Tulis konten email Anda di sini..."
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Terjadwal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === 'scheduled' && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Tanggal Kirim</Label>
                  <Input
                    id="scheduledDate"
                    type="datetime-local"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Batal
              </Button>
              <Button type="submit">
                {editingCampaign ? 'Perbarui' : 'Buat'} Campaign
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Campaign Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Campaign</DialogTitle>
          </DialogHeader>
          
          {selectedCampaign && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">{selectedCampaign.name}</h3>
                {getStatusBadge(selectedCampaign.status)}
              </div>
              
              <div className="space-y-2">
                <Label>Subject</Label>
                <p className="text-sm">{selectedCampaign.subject}</p>
              </div>
              
              <div className="space-y-2">
                <Label>Konten</Label>
                <div className="text-sm p-3 bg-muted/50 rounded-lg">
                  <pre className="whitespace-pre-wrap">{selectedCampaign.content}</pre>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label>Penerima</Label>
                  <p>{selectedCampaign.recipients.length} orang</p>
                </div>
                {selectedCampaign.openRate && (
                  <div>
                    <Label>Open Rate</Label>
                    <p>{selectedCampaign.openRate}%</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailCampaignManager;
