
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  CalendarIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  MapPinIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { mockEvents } from '@/data/mockEvents';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  event_type: 'akad' | 'resepsi';
  venue_name: string;
  venue_address: string;
  venue_city: string;
  venue_province: string;
  venue_latitude: number;
  venue_longitude: number;
  event_date: string;
  start_time: string;
  end_time: string;
  description?: string;
  dress_code?: string;
  contact_person?: string;
  contact_phone?: string;
  created_at: string;
  updated_at: string;
}

const EventManagement = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Acara dihapus",
      description: "Data acara berhasil dihapus dari sistem.",
    });
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const eventData: Event = {
      id: editingEvent?.id || Date.now().toString(),
      title: formData.get('title') as string,
      event_type: formData.get('event_type') as 'akad' | 'resepsi',
      venue_name: formData.get('venue_name') as string,
      venue_address: formData.get('venue_address') as string,
      venue_city: formData.get('venue_city') as string,
      venue_province: formData.get('venue_province') as string,
      venue_latitude: parseFloat(formData.get('venue_latitude') as string),
      venue_longitude: parseFloat(formData.get('venue_longitude') as string),
      event_date: formData.get('event_date') as string,
      start_time: formData.get('start_time') as string,
      end_time: formData.get('end_time') as string,
      description: formData.get('description') as string || undefined,
      dress_code: formData.get('dress_code') as string || undefined,
      contact_person: formData.get('contact_person') as string || undefined,
      contact_phone: formData.get('contact_phone') as string || undefined,
      created_at: editingEvent?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (editingEvent) {
      setEvents(events.map(event => event.id === editingEvent.id ? eventData : event));
      toast({
        title: "Acara diperbarui",
        description: "Data acara berhasil diperbarui.",
      });
    } else {
      setEvents([...events, eventData]);
      toast({
        title: "Acara ditambahkan",
        description: "Acara baru berhasil ditambahkan.",
      });
    }

    setIsDialogOpen(false);
    setEditingEvent(null);
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.venue_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Manajemen Acara</h1>
          <p className="text-muted-foreground">Kelola acara pernikahan dan detail pelaksanaannya</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="premium" onClick={handleAddEvent}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Tambah Acara
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? 'Edit Acara' : 'Tambah Acara Baru'}
              </DialogTitle>
              <DialogDescription>
                {editingEvent ? 'Perbarui informasi acara' : 'Tambahkan acara baru ke jadwal pernikahan'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Acara *</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingEvent?.title}
                    placeholder="Akad Nikah / Resepsi"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event_type">Tipe Acara *</Label>
                  <Select name="event_type" defaultValue={editingEvent?.event_type || 'akad'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe acara" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="akad">Akad Nikah</SelectItem>
                      <SelectItem value="resepsi">Resepsi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue_name">Nama Venue *</Label>
                <Input
                  id="venue_name"
                  name="venue_name"
                  defaultValue={editingEvent?.venue_name}
                  placeholder="Masjid / Gedung / Rumah"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue_address">Alamat Venue *</Label>
                <Textarea
                  id="venue_address"
                  name="venue_address"
                  defaultValue={editingEvent?.venue_address}
                  placeholder="Alamat lengkap venue"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venue_city">Kota *</Label>
                  <Input
                    id="venue_city"
                    name="venue_city"
                    defaultValue={editingEvent?.venue_city}
                    placeholder="Nama kota"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue_province">Provinsi *</Label>
                  <Input
                    id="venue_province"
                    name="venue_province"
                    defaultValue={editingEvent?.venue_province}
                    placeholder="Nama provinsi"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="venue_latitude">Latitude *</Label>
                  <Input
                    id="venue_latitude"
                    name="venue_latitude"
                    type="number"
                    step="any"
                    defaultValue={editingEvent?.venue_latitude}
                    placeholder="-6.2088"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue_longitude">Longitude *</Label>
                  <Input
                    id="venue_longitude"
                    name="venue_longitude"
                    type="number"
                    step="any"
                    defaultValue={editingEvent?.venue_longitude}
                    placeholder="106.8456"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event_date">Tanggal Acara *</Label>
                  <Input
                    id="event_date"
                    name="event_date"
                    type="date"
                    defaultValue={editingEvent?.event_date}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_time">Waktu Mulai *</Label>
                  <Input
                    id="start_time"
                    name="start_time"
                    type="time"
                    defaultValue={editingEvent?.start_time}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_time">Waktu Selesai *</Label>
                  <Input
                    id="end_time"
                    name="end_time"
                    type="time"
                    defaultValue={editingEvent?.end_time}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingEvent?.description}
                  placeholder="Deskripsi acara"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dress_code">Dress Code</Label>
                  <Input
                    id="dress_code"
                    name="dress_code"
                    defaultValue={editingEvent?.dress_code}
                    placeholder="Formal / Semi Formal / Casual"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_person">Contact Person</Label>
                  <Input
                    id="contact_person"
                    name="contact_person"
                    defaultValue={editingEvent?.contact_person}
                    placeholder="Nama contact person"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone">Nomor Telepon Contact</Label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  defaultValue={editingEvent?.contact_phone}
                  placeholder="+62 812-3456-7890"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" variant="premium">
                  {editingEvent ? 'Perbarui' : 'Tambah'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="elegant-card">
        <CardContent className="p-4">
          <Input
            placeholder="Cari nama acara atau venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Event List */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Daftar Acara ({filteredEvents.length})
          </CardTitle>
          <CardDescription>
            Kelola semua acara pernikahan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Tidak ada acara yang ditemukan</p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div key={event.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-lg">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.venue_name}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={event.event_type === 'akad' ? 'default' : 'secondary'}>
                        {event.event_type === 'akad' ? 'Akad Nikah' : 'Resepsi'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Lokasi:</span>
                      </div>
                      <p className="ml-6">{event.venue_address}</p>
                      <p className="ml-6 text-muted-foreground">{event.venue_city}, {event.venue_province}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Waktu:</span>
                      </div>
                      <p className="ml-6">{new Date(event.event_date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                      <p className="ml-6 text-muted-foreground">{event.start_time} - {event.end_time}</p>
                    </div>
                  </div>

                  {event.description && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Detail
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditEvent(event)}
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Hapus
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventManagement;
