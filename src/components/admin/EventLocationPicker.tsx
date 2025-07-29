
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPinIcon } from '@heroicons/react/24/outline';
import SimpleLocationPicker from './SimpleLocationPicker';

interface EventLocationPickerProps {
  latitude?: number;
  longitude?: number;
  onLocationChange: (lat: number, lng: number) => void;
}

const EventLocationPicker = ({ latitude, longitude, onLocationChange }: EventLocationPickerProps) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: latitude || 0, lng: longitude || 0 });

  const handleLocationSelect = (lat: number, lng: number) => {
    setCoordinates({ lat, lng });
    onLocationChange(lat, lng);
    setIsPickerOpen(false);
  };

  const handleManualInput = (field: 'lat' | 'lng', value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const newCoords = { ...coordinates, [field]: numValue };
      setCoordinates(newCoords);
      onLocationChange(newCoords.lat, newCoords.lng);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            value={coordinates.lat}
            onChange={(e) => handleManualInput('lat', e.target.value)}
            placeholder="Latitude"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            value={coordinates.lng}
            onChange={(e) => handleManualInput('lng', e.target.value)}
            placeholder="Longitude"
          />
        </div>
      </div>

      <Dialog open={isPickerOpen} onOpenChange={setIsPickerOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <MapPinIcon className="h-4 w-4 mr-2" />
            Pilih di Peta
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pilih Lokasi Acara</DialogTitle>
            <DialogDescription>
              Klik pada peta untuk memilih lokasi acara
            </DialogDescription>
          </DialogHeader>
          
          <SimpleLocationPicker
            initialPosition={coordinates.lat && coordinates.lng ? [coordinates.lat, coordinates.lng] : undefined}
            onLocationSelect={handleLocationSelect}
            onClose={() => setIsPickerOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventLocationPicker;
