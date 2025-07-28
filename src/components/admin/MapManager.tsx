
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  MapPinIcon, 
  PlusIcon, 
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  TruckIcon,
  HomeIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { mockEvents } from '@/data/mockEvents';
import { mockDistanceCalculations } from '@/data/mockDistance';
import { mockGuests } from '@/data/mockGuests';
import { useToast } from '@/hooks/use-toast';

const MapManager = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenDialogOpen, setIsTokenDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if Mapbox token is available
    const token = localStorage.getItem('mapbox_token');
    if (token) {
      setMapboxToken(token);
    }
  }, []);

  const handleSaveToken = () => {
    if (mapboxToken) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setIsTokenDialogOpen(false);
      toast({
        title: "Token Mapbox Disimpan",
        description: "Token berhasil disimpan. Fitur peta sekarang dapat digunakan.",
      });
    }
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Manajemen Peta & Lokasi</h2>
          <p className="text-muted-foreground">Kelola lokasi acara dan estimasi perjalanan</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isTokenDialogOpen} onOpenChange={setIsTokenDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MapPinIcon className="h-4 w-4 mr-2" />
                Konfigurasi Mapbox
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Konfigurasi Mapbox Token</DialogTitle>
                <DialogDescription>
                  Masukkan token Mapbox untuk mengaktifkan fitur peta.
                  Dapatkan token di <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
                  <Input
                    id="mapbox-token"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    placeholder="pk.eyJ1IjoiYWRtaW4iLCJhIjoiY2..."
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsTokenDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button onClick={handleSaveToken}>
                    Simpan Token
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="premium">
            <PlusIcon className="h-4 w-4 mr-2" />
            Tambah Lokasi
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Container */}
        <Card className="elegant-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              Peta Lokasi Acara
            </CardTitle>
            <CardDescription>
              Lokasi acara pernikahan dan estimasi jarak
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

              <div 
                ref={mapContainer} 
                className="h-64 bg-muted rounded-lg flex items-center justify-center"
              >
                {mapboxToken ? (
                  <div className="text-center">
                    <MapPinIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Peta akan dimuat di sini
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Token Mapbox: Tersedia
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <MapPinIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Peta tidak tersedia
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsTokenDialogOpen(true)}
                    >
                      Konfigurasi Mapbox
                    </Button>
                  </div>
                )}
              </div>

              {selectedEvent && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  {(() => {
                    const event = mockEvents.find(e => e.id === selectedEvent);
                    return event ? (
                      <div>
                        <h3 className="font-medium mb-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          {event.venue_name}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.venue_address}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{event.venue_latitude}, {event.venue_longitude}</span>
                        </div>
                      </div>
                    ) : null;
                  })()}
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

      {/* Event Locations */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle>Lokasi Acara</CardTitle>
          <CardDescription>
            Daftar lokasi acara pernikahan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.venue_name}</p>
                  </div>
                  <Badge variant={event.event_type === 'akad' ? 'default' : 'secondary'}>
                    {event.event_type}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Alamat:</p>
                    <p>{event.venue_address}</p>
                    <p>{event.venue_city}, {event.venue_province}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Koordinat:</p>
                    <p>Lat: {event.venue_latitude}</p>
                    <p>Lng: {event.venue_longitude}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    Lihat di Peta
                  </Button>
                  <Button size="sm" variant="outline">
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                    Hitung Jarak
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
