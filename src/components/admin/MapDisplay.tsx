
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
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

interface MapDisplayProps {
  center: [number, number];
  locations: Location[];
  selectedEventId: string;
}

// Error boundary component for the map
const MapErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Map error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Peta tidak dapat dimuat</p>
          <button 
            onClick={() => setHasError(false)}
            className="text-primary hover:underline text-sm"
          >
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const MapDisplay = ({ center, locations, selectedEventId }: MapDisplayProps) => {
  const mapRef = useRef<any>(null);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    // Force re-render of map component when selectedEventId changes
    setMapKey(prev => prev + 1);
  }, [selectedEventId]);

  useEffect(() => {
    // Force map to invalidate size when it's displayed
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, [selectedEventId, mapKey]);

  const filteredLocations = locations.filter(
    location => location.id === selectedEventId || location.type !== 'venue'
  );

  console.log('MapDisplay render:', { center, selectedEventId, locationsCount: filteredLocations.length });

  return (
    <MapErrorBoundary>
      <MapContainer
        key={mapKey}
        center={center}
        zoom={13}
        className="h-full w-full"
        ref={mapRef}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredLocations.map((location) => (
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
    </MapErrorBoundary>
  );
};

export default MapDisplay;
