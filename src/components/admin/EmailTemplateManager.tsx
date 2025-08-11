
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'invitation' | 'reminder' | 'thank_you' | 'rsvp' | 'custom';
  isDefault: boolean;
  variables: string[];
  created_at: string;
  updated_at: string;
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Wedding Invitation',
    subject: 'Undangan Pernikahan - {{bride_name}} & {{groom_name}}',
    content: `Bismillahirrahmanirrahim

Assalamu'alaikum Warahmatullahi Wabarakatuh

Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

{{bride_name}} & {{groom_name}}

📅 Tanggal: {{wedding_date}}
🕐 Waktu: {{wedding_time}}
📍 Tempat: {{venue_name}}
    {{venue_address}}

Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Wassalamu'alaikum Warahmatullahi Wabarakatuh

Hormat kami,
{{bride_name}} & {{groom_name}}`,
    type: 'invitation',
    isDefault: true,
    variables: ['bride_name', 'groom_name', 'wedding_date', 'wedding_time', 'venue_name', 'venue_address'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'RSVP Reminder',
    subject: 'Pengingat RSVP - {{bride_name}} & {{groom_name}}',
    content: `Dear {{guest_name}},

Kami harap Anda dalam keadaan sehat dan bahagia.

Ini adalah pengingat bahwa batas waktu konfirmasi kehadiran untuk pernikahan kami adalah {{rsvp_deadline}}.

Mohon konfirmasi kehadiran Anda melalui link berikut:
{{rsvp_link}}

Terima kasih atas perhatian Anda.

Salam hangat,
{{bride_name}} & {{groom_name}}`,
    type: 'reminder',
    isDefault: true,
    variables: ['guest_name', 'bride_name', 'groom_name', 'rsvp_deadline', 'rsvp_link'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

const EmailTemplateManager = () => {
  const [templates, setTemplates] = useLocalStorage<EmailTemplate[]>('email-templates', defaultTemplates);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    type: 'custom' as const,
    isDefault: false,
    variables: [] as string[]
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'invitation':
        return <Badge variant="default">Undangan</Badge>;
      case 'reminder':
        return <Badge variant="secondary">Pengingat</Badge>;
      case 'thank_you':
        return <Badge variant="outline">Terima Kasih</Badge>;
      case 'rsvp':
        return <Badge variant="outline">RSVP</Badge>;
      default:
        return <Badge variant="outline">Custom</Badge>;
    }
  };

  const handleAdd = () => {
    setEditingTemplate(null);
    setFormData({
      name: '',
      subject: '',
      content: '',
      type: 'custom',
      isDefault: false,
      variables: []
    });
    setIsFormOpen(true);
  };

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      content: template.content,
      type: template.type,
      isDefault: template.isDefault,
      variables: template.variables
    });
    setIsFormOpen(true);
  };

  const handleView = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsDetailOpen(true);
  };

  const handleDelete = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template?.isDefault) {
      toast({
        title: "Tidak dapat menghapus",
        description: "Template default tidak dapat dihapus.",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm('Apakah Anda yakin ingin menghapus template ini?')) {
      setTemplates(prev => prev.filter(t => t.id !== templateId));
      toast({
        title: "Template dihapus",
        description: "Email template berhasil dihapus.",
      });
    }
  };

  const extractVariables = (content: string): string[] => {
    const matches = content.match(/\{\{([^}]+)\}\}/g) || [];
    return [...new Set(matches.map(match => match.replace(/[{}]/g, '')))];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const variables = extractVariables(formData.content + ' ' + formData.subject);
    
    if (editingTemplate) {
      setTemplates(prev => prev.map(t => 
        t.id === editingTemplate.id 
          ? { 
              ...t, 
              ...formData,
              variables,
              updated_at: new Date().toISOString() 
            }
          : t
      ));
      toast({
        title: "Template diperbarui",
        description: "Email template berhasil diperbarui.",
      });
    } else {
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        ...formData,
        variables,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setTemplates(prev => [...prev, newTemplate]);
      toast({
        title: "Template dibuat",
        description: "Email template baru berhasil dibuat.",
      });
    }
    
    setIsFormOpen(false);
    setEditingTemplate(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Templates</h2>
          <p className="text-muted-foreground">Kelola template email untuk berbagai keperluan</p>
        </div>
        <Button onClick={handleAdd}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Buat Template
        </Button>
      </div>

      {/* Templates List */}
      <div className="grid gap-4">
        {templates.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <DocumentTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Belum ada email template</p>
            </CardContent>
          </Card>
        ) : (
          templates.map((template) => (
            <Card key={template.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{template.name}</h3>
                      {getTypeBadge(template.type)}
                      {template.isDefault && (
                        <Badge variant="outline">Default</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      📧 {template.subject}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      <p>🔧 Variables: {template.variables.length > 0 ? template.variables.join(', ') : 'Tidak ada'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(template)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(template)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    {!template.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(template.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Template Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTemplate ? 'Edit Template' : 'Buat Template Baru'}
            </DialogTitle>
            <DialogDescription>
              {editingTemplate ? 'Perbarui template email' : 'Buat template email baru'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Template</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Wedding Invitation Template"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject Email</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Undangan Pernikahan - {{bride_name}} & {{groom_name}}"
                required
              />
              <p className="text-xs text-muted-foreground">
                Gunakan format {"{{variable_name}}"} untuk variabel dinamis
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten Template</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Tulis konten template Anda di sini..."
                rows={8}
                required
              />
              <p className="text-xs text-muted-foreground">
                Gunakan format {"{{variable_name}}"} untuk variabel dinamis seperti {"{{bride_name}}"}, {"{{groom_name}}"}, dll.
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Batal
              </Button>
              <Button type="submit">
                {editingTemplate ? 'Perbarui' : 'Buat'} Template
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Template Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview Template</DialogTitle>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">{selectedTemplate.name}</h3>
                <div className="flex gap-2">
                  {getTypeBadge(selectedTemplate.type)}
                  {selectedTemplate.isDefault && (
                    <Badge variant="outline">Default</Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Subject</Label>
                <div className="text-sm p-3 bg-muted/50 rounded-lg font-mono">
                  {selectedTemplate.subject}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Konten</Label>
                <div className="text-sm p-3 bg-muted/50 rounded-lg">
                  <pre className="whitespace-pre-wrap font-mono text-xs">
                    {selectedTemplate.content}
                  </pre>
                </div>
              </div>
              
              {selectedTemplate.variables.length > 0 && (
                <div className="space-y-2">
                  <Label>Variabel yang Tersedia</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((variable) => (
                      <Badge key={variable} variant="secondary">
                        {`{{${variable}}}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailTemplateManager;
