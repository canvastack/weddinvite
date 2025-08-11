
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGeolocation } from '@/hooks/useGeolocation';
import { MapPinIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface SimpleLocationPickerProps {
  initialPosition?: [number, number];
  onLocationSelect: (lat: number, lng: number) => void;
  onClose: () => void;
}

const LocationMarker = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
};

const SimpleLocationPicker = ({ initialPosition, onLocationSelect, onClose }: SimpleLocationPickerProps) => {
  const { getCurrentPosition, loading: geoLoading, error: geoError } = useGeolocation();
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(
    initialPosition || null
  );
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    initialPosition || [-6.2088, 106.8456] // Jakarta as fallback
  );
  const [isLoadingUserLocation, setIsLoadingUserLocation] = useState(false);

  useEffect(() => {
    // Auto-get user location on mount if no initial position
    if (!initialPosition) {
      handleGetUserLocation();
    }
  }, []);

  const handleGetUserLocation = async () => {
    setIsLoadingUserLocation(true);
    try {
      const position = await getCurrentPosition();
      if (position) {
        const newCenter: [number, number] = [position.latitude, position.longitude];
        setMapCenter(newCenter);
        setSelectedPosition(newCenter);
        onLocationSelect(position.latitude, position.longitude);
      }
    } catch (error) {
      console.error('Error getting user location:', error);
    } finally {
      setIsLoadingUserLocation(false);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    const newPosition: [number, number] = [lat, lng];
    setSelectedPosition(newPosition);
    onLocationSelect(lat, lng);
  };

  const handleConfirmSelection = () => {
    if (selectedPosition) {
      onLocationSelect(selectedPosition[0], selectedPosition[1]);
      onClose();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Pilih Lokasi</h3>
          <p className="text-sm text-muted-foreground">
            Klik pada peta untuk memilih lokasi atau gunakan lokasi Anda saat ini
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGetUserLocation}
            disabled={isLoadingUserLocation}
          >
            {isLoadingUserLocation ? (
              <ArrowPathIcon className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <MapPinIcon className="h-4 w-4 mr-2" />
            )}
            Lokasi Saya
          </Button>
        </div>
      </div>

      {geoError && (
        <Badge variant="secondary" className="w-full justify-center">
          {geoError} - Menggunakan lokasi Jakarta sebagai fallback
        </Badge>
      )}

      <div className="h-96 w-full border rounded-lg overflow-hidden">
        <MapContainer
          center={mapCenter}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          key={`${mapCenter[0]}-${mapCenter[1]}`} // Force re-render when center changes
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onLocationSelect={handleLocationSelect} />
          {selectedPosition && (
            <Marker position={selectedPosition} />
          )}
        </MapContainer>
      </div>

      {selectedPosition && (
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium">Lokasi Terpilih:</p>
          <p className="text-sm text-muted-foreground">
            Latitude: {selectedPosition[0].toFixed(6)}, Longitude: {selectedPosition[1].toFixed(6)}
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button 
          onClick={handleConfirmSelection}
          disabled={!selectedPosition}
        >
          Pilih Lokasi
        </Button>
      </div>
    </div>
  );
};

export default SimpleLocationPicker;
