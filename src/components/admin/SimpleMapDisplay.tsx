
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
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

interface SimpleMapDisplayProps {
  center: [number, number];
  locations: Location[];
  selectedEventId: string;
}

const SimpleMapDisplay = ({ center, locations, selectedEventId }: SimpleMapDisplayProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      // Initialize map
      const map = L.map(mapContainerRef.current).setView(center, 13);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapRef.current = map;
      setIsMapReady(true);
      setMapError(null);

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Gagal memuat peta');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map center when it changes
  useEffect(() => {
    if (mapRef.current && isMapReady) {
      mapRef.current.setView(center, 13);
    }
  }, [center, isMapReady]);

  // Update markers when locations change
  useEffect(() => {
    if (!mapRef.current || !isMapReady) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Filter locations
    const filteredLocations = locations.filter(
      location => location.id === selectedEventId || location.type !== 'venue'
    );

    // Add new markers
    filteredLocations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude])
        .addTo(mapRef.current!)
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: 600;">${location.name}</h3>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">${location.address}</p>
            ${location.description ? `<p style="margin: 0; font-size: 14px; color: #666;">${location.description}</p>` : ''}
          </div>
        `);
      
      markersRef.current.push(marker);
    });

  }, [locations, selectedEventId, isMapReady]);

  if (mapError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-muted">
        <div className="text-center p-6">
          <div className="mb-4 text-muted-foreground">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-muted-foreground mb-4">Peta tidak dapat dimuat</p>
          <p className="text-sm text-muted-foreground mb-4">{mapError}</p>
          <button 
            onClick={() => {
              setMapError(null);
              setIsMapReady(false);
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      {!isMapReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Memuat peta...</p>
          </div>
        </div>
      )}
      
      <div
        ref={mapContainerRef}
        className="h-full w-full rounded-lg"
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default SimpleMapDisplay;
