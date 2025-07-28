
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
  UsersIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  EyeIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { mockGuests, Guest } from '@/data/mockGuests';
import { useToast } from '@/hooks/use-toast';

const GuestManagement = () => {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { toast } = useToast();

  const handleAddGuest = () => {
    setEditingGuest(null);
    setIsDialogOpen(true);
  };

  const handleEditGuest = (guest: Guest) => {
    setEditingGuest(guest);
    setIsDialogOpen(true);
  };

  const handleDeleteGuest = (guestId: string) => {
    setGuests(guests.filter(guest => guest.id !== guestId));
    toast({
      title: "Tamu dihapus",
      description: "Data tamu berhasil dihapus dari sistem.",
    });
  };

  const handleSubmitGuest = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const guestData: Guest = {
      id: editingGuest?.id || Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string || undefined,
      phone: formData.get('phone') as string || undefined,
      address: formData.get('address') as string || undefined,
      city: formData.get('city') as string || undefined,
      province: formData.get('province') as string || undefined,
      postal_code: formData.get('postal_code') as string || undefined,
      invitation_type: formData.get('invitation_type') as 'akad' | 'resepsi' | 'both',
      guest_count: parseInt(formData.get('guest_count') as string) || 1,
      attendance_status: formData.get('attendance_status') as 'pending' | 'attending' | 'not_attending' | 'maybe',
      message: formData.get('message') as string || undefined,
      invited_by: '1', // Default admin
      rsvp_date: editingGuest?.rsvp_date,
      created_at: editingGuest?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (editingGuest) {
      setGuests(guests.map(guest => guest.id === editingGuest.id ? guestData : guest));
      toast({
        title: "Tamu diperbarui",
        description: "Data tamu berhasil diperbarui.",
      });
    } else {
      setGuests([...guests, guestData]);
      toast({
        title: "Tamu ditambahkan",
        description: "Tamu baru berhasil ditambahkan.",
      });
    }

    setIsDialogOpen(false);
    setEditingGuest(null);
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.phone?.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || guest.attendance_status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'attending': return 'default';
      case 'not_attending': return 'destructive';
      case 'maybe': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'attending': return 'Hadir';
      case 'not_attending': return 'Tidak Hadir';
      case 'maybe': return 'Mungkin';
      default: return 'Pending';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Manajemen Tamu</h1>
          <p className="text-muted-foreground">Kelola daftar tamu undangan pernikahan</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="premium" onClick={handleAddGuest} className="smoke-effect">
              <PlusIcon className="h-4 w-4 mr-2" />
              Tambah Tamu
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingGuest ? 'Edit Tamu' : 'Tambah Tamu Baru'}
              </DialogTitle>
              <DialogDescription>
                {editingGuest ? 'Perbarui informasi tamu' : 'Tambahkan tamu baru ke daftar undangan'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitGuest} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingGuest?.name}
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={editingGuest?.email}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={editingGuest?.phone}
                    placeholder="+62 812-3456-7890"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guest_count">Jumlah Tamu *</Label>
                  <Select name="guest_count" defaultValue={editingGuest?.guest_count.toString() || '1'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jumlah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Orang</SelectItem>
                      <SelectItem value="2">2 Orang</SelectItem>
                      <SelectItem value="3">3 Orang</SelectItem>
                      <SelectItem value="4">4 Orang</SelectItem>
                      <SelectItem value="5">5+ Orang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  name="address"
                  defaultValue={editingGuest?.address}
                  placeholder="Masukkan alamat lengkap"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Kota</Label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={editingGuest?.city}
                    placeholder="Nama kota"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Provinsi</Label>
                  <Input
                    id="province"
                    name="province"
                    defaultValue={editingGuest?.province}
                    placeholder="Nama provinsi"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invitation_type">Undangan *</Label>
                  <Select name="invitation_type" defaultValue={editingGuest?.invitation_type || 'both'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis undangan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="akad">Akad Nikah</SelectItem>
                      <SelectItem value="resepsi">Resepsi</SelectItem>
                      <SelectItem value="both">Akad & Resepsi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendance_status">Status Kehadiran</Label>
                  <Select name="attendance_status" defaultValue={editingGuest?.attendance_status || 'pending'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="attending">Hadir</SelectItem>
                      <SelectItem value="not_attending">Tidak Hadir</SelectItem>
                      <SelectItem value="maybe">Mungkin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Pesan</Label>
                <Textarea
                  id="message"
                  name="message"
                  defaultValue={editingGuest?.message}
                  placeholder="Pesan atau catatan dari tamu"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" variant="premium">
                  {editingGuest ? 'Perbarui' : 'Tambah'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="elegant-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari nama, email, atau nomor telepon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="attending">Hadir</SelectItem>
                  <SelectItem value="not_attending">Tidak Hadir</SelectItem>
                  <SelectItem value="maybe">Mungkin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest List */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5" />
            Daftar Tamu ({filteredGuests.length})
          </CardTitle>
          <CardDescription>
            Kelola informasi tamu undangan pernikahan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGuests.length === 0 ? (
              <div className="text-center py-8">
                <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Tidak ada tamu yang ditemukan</p>
              </div>
            ) : (
              filteredGuests.map((guest) => (
                <div key={guest.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium">{guest.name}</h3>
                          <Badge variant={getStatusBadgeVariant(guest.attendance_status)}>
                            {getStatusText(guest.attendance_status)}
                          </Badge>
                          <Badge variant="outline">
                            {guest.invitation_type === 'both' ? 'Akad & Resepsi' :
                             guest.invitation_type === 'akad' ? 'Akad' : 'Resepsi'}
                          </Badge>
                          <Badge variant="secondary">
                            {guest.guest_count} orang
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {guest.email && (
                            <div className="flex items-center gap-1">
                              <EnvelopeIcon className="h-4 w-4" />
                              <span>{guest.email}</span>
                            </div>
                          )}
                          {guest.phone && (
                            <div className="flex items-center gap-1">
                              <PhoneIcon className="h-4 w-4" />
                              <span>{guest.phone}</span>
                            </div>
                          )}
                          {guest.city && (
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="h-4 w-4" />
                              <span>{guest.city}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditGuest(guest)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteGuest(guest.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <TrashIcon className="h-4 w-4" />
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

export default GuestManagement;
