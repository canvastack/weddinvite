import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPinIcon, 
  PlusIcon, 
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  TruckIcon,
  HomeIcon,
  CogIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { mockEvents } from '@/data/mockEvents';
import { mockDistanceCalculations } from '@/data/mockDistance';
import { mockGuests } from '@/data/mockGuests';
import { useToast } from '@/hooks/use-toast';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: 'venue' | 'accommodation' | 'other';
  description?: string;
}

const MapManager = () => {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Convert events to locations
    const eventLocations: Location[] = mockEvents.map(event => ({
      id: event.id,
      name: event.venue_name,
      address: event.venue_address,
      latitude: event.venue_latitude,
      longitude: event.venue_longitude,
      type: 'venue' as const,
      description: event.title
    }));
    setLocations(eventLocations);
  }, []);

  const handleAddLocation = () => {
    setEditingLocation(null);
    setIsLocationDialogOpen(true);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setIsLocationDialogOpen(true);
  };

  const handleDeleteLocation = (locationId: string) => {
    setLocations(locations.filter(loc => loc.id !== locationId));
    toast({
      title: "Lokasi dihapus",
      description: "Lokasi berhasil dihapus dari sistem.",
    });
  };

  const handleSubmitLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const locationData: Location = {
      id: editingLocation?.id || Date.now().toString(),
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      latitude: parseFloat(formData.get('latitude') as string),
      longitude: parseFloat(formData.get('longitude') as string),
      type: formData.get('type') as 'venue' | 'accommodation' | 'other',
      description: formData.get('description') as string || undefined,
    };

    if (editingLocation) {
      setLocations(locations.map(loc => loc.id === editingLocation.id ? locationData : loc));
      toast({
        title: "Lokasi diperbarui",
        description: "Data lokasi berhasil diperbarui.",
      });
    } else {
      setLocations([...locations, locationData]);
      toast({
        title: "Lokasi ditambahkan",
        description: "Lokasi baru berhasil ditambahkan.",
      });
    }

    setIsLocationDialogOpen(false);
    setEditingLocation(null);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getDistanceData = () => {
    return mockDistanceCalculations.map(calc => {
      const guest = mockGuests.find(g => g.id === calc.guest_id);
      const event = mockEvents.find(e => e.id === calc.event_id);
      return {
        ...calc,
        guest_name: guest?.name || 'Unknown',
        event_name: event?.title || 'Unknown',
      };
    });
  };

  const distanceData = getDistanceData();
  const selectedEventData = mockEvents.find(e => e.id === selectedEvent);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Manajemen Peta & Lokasi</h2>
          <p className="text-muted-foreground">Kelola lokasi acara dan estimasi perjalanan - Powered by OpenStreetMap (100% Gratis)</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="premium" onClick={handleAddLocation}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Tambah Lokasi
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingLocation ? 'Edit Lokasi' : 'Tambah Lokasi Baru'}
                </DialogTitle>
                <DialogDescription>
                  {editingLocation ? 'Perbarui informasi lokasi' : 'Tambahkan lokasi baru ke peta'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitLocation} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lokasi</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingLocation?.name}
                    placeholder="Masukkan nama lokasi"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Textarea
                    id="address"
                    name="address"
                    defaultValue={editingLocation?.address}
                    placeholder="Masukkan alamat lengkap"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      name="latitude"
                      type="number"
                      step="any"
                      defaultValue={editingLocation?.latitude}
                      placeholder="-6.2088"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      name="longitude"
                      type="number"
                      step="any"
                      defaultValue={editingLocation?.longitude}
                      placeholder="106.8456"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Lokasi</Label>
                  <Select name="type" defaultValue={editingLocation?.type || 'venue'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venue">Venue Acara</SelectItem>
                      <SelectItem value="accommodation">Akomodasi</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingLocation?.description}
                    placeholder="Deskripsi lokasi (opsional)"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsLocationDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit" variant="premium">
                    {editingLocation ? 'Perbarui' : 'Tambah'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Container */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              Peta Lokasi Acara (OpenStreetMap)
            </CardTitle>
            <CardDescription>
              Lokasi acara pernikahan dan estimasi jarak - 100% Gratis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Pilih Acara</Label>
                <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih acara untuk ditampilkan" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEvents.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.title} - {event.venue_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="h-64 rounded-lg overflow-hidden">
                {selectedEventData ? (
                  <MapContainer
                    center={[selectedEventData.venue_latitude, selectedEventData.venue_longitude]}
                    zoom={13}
                    className="h-full w-full"
                    key={selectedEvent}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {locations
                      .filter(location => location.id === selectedEvent || location.type !== 'venue')
                      .map((location) => (
                        <Marker
                          key={location.id}
                          position={[location.latitude, location.longitude]}
                        >
                          <Popup>
                            <div>
                              <h3 className="font-medium">{location.name}</h3>
                              <p className="text-sm text-gray-600">{location.address}</p>
                              {location.description && (
                                <p className="text-sm text-gray-500 mt-1">{location.description}</p>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                  </MapContainer>
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Pilih acara untuk menampilkan peta</p>
                  </div>
                )}
              </div>

              {selectedEventData && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-medium mb-2">{selectedEventData.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {selectedEventData.venue_name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {selectedEventData.venue_address}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{selectedEventData.venue_latitude}, {selectedEventData.venue_longitude}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Distance Calculations */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              Estimasi Jarak & Waktu
            </CardTitle>
            <CardDescription>
              Perhitungan jarak dan waktu tempuh untuk tamu
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {distanceData.map((data) => (
                <div key={data.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{data.guest_name}</h3>
                      <p className="text-sm text-muted-foreground">ke {data.event_name}</p>
                    </div>
                    <Badge variant="outline">
                      {data.distance_km} km
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-muted/30 rounded">
                      <CogIcon className="h-4 w-4 mx-auto mb-1 text-green-600" />
                      <p className="text-xs font-medium">Motor</p>
                      <p className="text-xs text-muted-foreground">
                        {data.travel_time_minutes.motorcycle} min
                      </p>
                    </div>
                    
                    <div className="text-center p-2 bg-muted/30 rounded">
                      <HomeIcon className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                      <p className="text-xs font-medium">Mobil</p>
                      <p className="text-xs text-muted-foreground">
                        {data.travel_time_minutes.car} min
                      </p>
                    </div>
                    
                    <div className="text-center p-2 bg-muted/30 rounded">
                      <TruckIcon className="h-4 w-4 mx-auto mb-1 text-orange-600" />
                      <p className="text-xs font-medium">Umum</p>
                      <p className="text-xs text-muted-foreground">
                        {data.travel_time_minutes.public_transport} min
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locations Management */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle>Manajemen Lokasi</CardTitle>
          <CardDescription>
            Daftar semua lokasi yang tersimpan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {locations.map((location) => (
              <div key={location.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={location.type === 'venue' ? 'default' : 'secondary'}>
                      {location.type === 'venue' ? 'Venue' : location.type === 'accommodation' ? 'Akomodasi' : 'Lainnya'}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">Koordinat:</p>
                    <p>Lat: {location.latitude}, Lng: {location.longitude}</p>
                  </div>
                  {location.description && (
                    <div>
                      <p className="text-muted-foreground">Deskripsi:</p>
                      <p>{location.description}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditLocation(location)}
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDeleteLocation(location.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapManager;
