
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  EnvelopeIcon, 
  PaperAirplaneIcon, 
  EyeIcon,
  DocumentTextIcon,
  UsersIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { mockGuests } from '@/data/mockGuests';
import { mockEmailTemplates } from '@/data/mockEmailTemplates';
import { mockInvitations } from '@/data/mockInvitations';
import { useToast } from '@/hooks/use-toast';

const EmailBlastManager = () => {
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customSubject, setCustomSubject] = useState('');
  const [customContent, setCustomContent] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();

  const handleSelectGuest = (guestId: string, checked: boolean) => {
    if (checked) {
      setSelectedGuests([...selectedGuests, guestId]);
    } else {
      setSelectedGuests(selectedGuests.filter(id => id !== guestId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGuests(mockGuests.map(guest => guest.id));
    } else {
      setSelectedGuests([]);
    }
  };

  const handleSendEmail = () => {
    if (selectedGuests.length === 0) {
      toast({
        title: "Pilih Penerima",
        description: "Silakan pilih minimal satu tamu untuk menerima email.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTemplate && !customContent) {
      toast({
        title: "Pilih Template",
        description: "Silakan pilih template atau tulis konten email.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Email Berhasil Dikirim!",
      description: `Email telah dikirim ke ${selectedGuests.length} penerima.`,
    });

    // Reset form
    setSelectedGuests([]);
    setSelectedTemplate('');
    setCustomSubject('');
    setCustomContent('');
  };

  const previewTemplate = mockEmailTemplates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Email Blast Manager</h2>
          <p className="text-muted-foreground">Kirim undangan dan reminder ke tamu</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ChartBarIcon className="h-4 w-4 mr-2" />
            Laporan Email
          </Button>
          <Button variant="premium" onClick={handleSendEmail}>
            <PaperAirplaneIcon className="h-4 w-4 mr-2" />
            Kirim Email
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pilih Penerima */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Pilih Penerima
            </CardTitle>
            <CardDescription>
              {selectedGuests.length} dari {mockGuests.length} tamu dipilih
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="select-all"
                  checked={selectedGuests.length === mockGuests.length}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="font-medium">
                  Pilih Semua
                </Label>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mockGuests.map((guest) => (
                  <div key={guest.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                    <Checkbox 
                      id={guest.id}
                      checked={selectedGuests.includes(guest.id)}
                      onCheckedChange={(checked) => handleSelectGuest(guest.id, checked as boolean)}
                    />
                    <div className="flex-1 min-w-0">
                      <Label htmlFor={guest.id} className="text-sm font-medium cursor-pointer">
                        {guest.name}
                      </Label>
                      <p className="text-xs text-muted-foreground truncate">
                        {guest.email}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {guest.invitation_type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Template & Konten */}
        <Card className="elegant-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5" />
              Template & Konten Email
            </CardTitle>
            <CardDescription>
              Pilih template atau buat konten email kustom
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="template" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="template">Template</TabsTrigger>
                <TabsTrigger value="custom">Konten Kustom</TabsTrigger>
              </TabsList>
              
              <TabsContent value="template" className="space-y-4">
                <div className="space-y-2">
                  <Label>Pilih Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih template email" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEmailTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} - {template.template_type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTemplate && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2">Preview Template</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Subject: {previewTemplate?.subject}
                      </p>
                      <div className="text-sm max-h-32 overflow-y-auto">
                        <div dangerouslySetInnerHTML={{ 
                          __html: previewTemplate?.content.substring(0, 200) + '...' 
                        }} />
                      </div>
                    </div>
                    
                    <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <EyeIcon className="h-4 w-4 mr-2" />
                          Preview Lengkap
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Preview Email</DialogTitle>
                          <DialogDescription>
                            Subject: {previewTemplate?.subject}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          <div dangerouslySetInnerHTML={{ 
                            __html: previewTemplate?.content || '' 
                          }} />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="custom" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-subject">Subject Email</Label>
                  <Input
                    id="custom-subject"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    placeholder="Masukkan subject email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-content">Konten Email</Label>
                  <Textarea
                    id="custom-content"
                    value={customContent}
                    onChange={(e) => setCustomContent(e.target.value)}
                    placeholder="Tulis konten email di sini..."
                    rows={8}
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Tips: Gunakan variabel berikut dalam konten:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>{'{{guest_name}}'} - Nama tamu</li>
                    <li>{'{{invitation_link}}'} - Link undangan</li>
                    <li>{'{{event_date}}'} - Tanggal acara</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="elegant-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Email Terkirim</p>
                <p className="text-2xl font-bold">{mockInvitations.filter(i => i.status !== 'draft').length}</p>
              </div>
              <EnvelopeIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="elegant-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email Dibuka</p>
                <p className="text-2xl font-bold">{mockInvitations.filter(i => i.status === 'opened' || i.status === 'responded').length}</p>
              </div>
              <EyeIcon className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="elegant-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round((mockInvitations.filter(i => i.status === 'responded').length / mockInvitations.length) * 100)}%
                </p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailBlastManager;
