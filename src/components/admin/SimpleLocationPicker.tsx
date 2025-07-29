
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { MapPinIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

// Fix for default markers
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

const SimpleLocationPicker = ({ initialPosition, onLocationSelect, onClose }: SimpleLocationPickerProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [currentPosition, setCurrentPosition] = useState<[number, number] | null>(initialPosition || null);
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(initialPosition || null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Get user's current location
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          setCurrentPosition(userLocation);
          setSelectedPosition(userLocation);
          
          // Pan map to current location
          if (mapRef.current) {
            mapRef.current.setView(userLocation, 15);
            updateMarker(userLocation);
          }
          
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to Jakarta coordinates
          const fallbackLocation: [number, number] = [-6.2088, 106.8456];
          setCurrentPosition(fallbackLocation);
          setSelectedPosition(fallbackLocation);
          setIsGettingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      // Fallback to Jakarta coordinates
      const fallbackLocation: [number, number] = [-6.2088, 106.8456];
      setCurrentPosition(fallbackLocation);
      setSelectedPosition(fallbackLocation);
      setIsGettingLocation(false);
    }
  };

  const updateMarker = (position: [number, number]) => {
    if (!mapRef.current) return;

    // Remove existing marker
    if (markerRef.current) {
      mapRef.current.removeLayer(markerRef.current);
    }

    // Add new marker
    const marker = L.marker(position, { draggable: true })
      .addTo(mapRef.current)
      .on('dragend', function(e) {
        const marker = e.target;
        const newPosition = marker.getLatLng();
        const newPos: [number, number] = [newPosition.lat, newPosition.lng];
        setSelectedPosition(newPos);
      });

    markerRef.current = marker;
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!initialPosition && !currentPosition) {
      getCurrentLocation();
      return;
    }

    const position = initialPosition || currentPosition;
    if (!position) return;

    try {
      // Initialize map
      const map = L.map(mapContainerRef.current).setView(position, 15);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add click handler
      map.on('click', function(e) {
        const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
        setSelectedPosition(newPosition);
        updateMarker(newPosition);
      });

      mapRef.current = map;
      setIsMapReady(true);
      
      // Add initial marker
      updateMarker(position);

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Gagal memuat peta');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current = null;
      }
    };
  }, [currentPosition]);

  const handleConfirm = () => {
    if (selectedPosition) {
      onLocationSelect(selectedPosition[0], selectedPosition[1]);
    }
  };

  if (mapError) {
    return (
      <div className="h-96 w-full flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted">
        <div className="text-center p-6">
          <p className="text-muted-foreground mb-4">Peta tidak dapat dimuat</p>
          <p className="text-sm text-muted-foreground mb-4">{mapError}</p>
          <Button 
            onClick={() => setMapError(null)}
            variant="outline"
          >
            Coba lagi
          </Button>
        </div>
      </div>
    );
  }

  if (!currentPosition && !initialPosition) {
    return (
      <div className="h-96 w-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">
            {isGettingLocation ? 'Mendapatkan lokasi...' : 'Memuat peta...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Klik atau seret marker untuk memilih lokasi
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
        >
          <ArrowPathIcon className="h-4 w-4 mr-2" />
          Lokasi Saya
        </Button>
      </div>
      
      <div className="h-96 w-full rounded-lg overflow-hidden border relative">
        {!isMapReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Memuat peta...</p>
            </div>
          </div>
        )}
        <div
          ref={mapContainerRef}
          className="h-full w-full"
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      
      {selectedPosition && (
        <div className="p-3 bg-muted/50 rounded-lg text-sm">
          <p className="font-medium mb-1">Lokasi Terpilih:</p>
          <p className="text-muted-foreground">
            Lat: {selectedPosition[0].toFixed(6)}, Lng: {selectedPosition[1].toFixed(6)}
          </p>
        </div>
      )}
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button 
          onClick={handleConfirm}
          disabled={!selectedPosition}
          className="bg-primary hover:bg-primary/90"
        >
          <MapPinIcon className="h-4 w-4 mr-2" />
          Pilih Lokasi
        </Button>
      </div>
    </div>
  );
};

export default SimpleLocationPicker;
