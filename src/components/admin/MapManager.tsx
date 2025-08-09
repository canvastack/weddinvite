
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { 
  MapPinIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  HomeIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { Loader2, Navigation, Clock, Phone, Globe, MapPin } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  type: 'ceremony' | 'reception' | 'hotel' | 'parking' | 'other';
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description?: string;
  contact_phone?: string;
  website?: string;
  operating_hours?: string;
  capacity?: number;
  amenities?: string[];
  is_primary: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const initialLocations: Location[] = [
  {
    id: '1',
    name: 'Masjid Al-Ikhlas',
    type: 'ceremony',
    address: 'Jl. Raya Bekasi No. 123, Bekasi Timur',
    city: 'Bekasi',
    coordinates: { lat: -6.2088, lng: 107.0456 },
    description: 'Masjid yang indah untuk pelaksanaan akad nikah',
    contact_phone: '+62 812-3456-7890',
    operating_hours: '05:00 - 22:00',
    capacity: 500,
    amenities: ['Parking', 'AC', 'Sound System', 'Prayer Room'],
    is_primary: true,
    is_active: true,
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    name: 'Gedung Serbaguna',
    type: 'reception',
    address: 'Jl. Ahmad Yani No. 456, Jakarta Pusat',
    city: 'Jakarta',
    coordinates: { lat: -6.1751, lng: 106.8650 },
    description: 'Gedung elegan untuk resepsi pernikahan',
    contact_phone: '+62 813-7890-1234',
    website: 'https://gedungserbaguna.com',
    operating_hours: '08:00 - 23:00',
    capacity: 800,
    amenities: ['Parking', 'AC', 'Stage', 'Catering Kitchen', 'Photo Booth'],
    is_primary: true,
    is_active: true,
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-01-15T08:00:00Z'
  }
];

export const MapManager = () => {
  const [locations, setLocations] = useLocalStorage<Location[]>('wedding-locations', initialLocations);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);
  const { toast } = useToast();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    type: 'ceremony' as Location['type'],
    address: '',
    city: '',
    coordinates: { lat: -6.2088, lng: 106.8270 }, // Jakarta default
    description: '',
    contact_phone: '',
    website: '',
    operating_hours: '',
    capacity: '',
    amenities: [] as string[],
    is_primary: false,
    is_active: true
  });

  const locationTypes = [
    { value: 'ceremony', label: 'Ceremony', icon: HeartIcon, color: 'bg-red-100 text-red-800' },
    { value: 'reception', label: 'Reception', icon: BuildingOfficeIcon, color: 'bg-blue-100 text-blue-800' },
    { value: 'hotel', label: 'Hotel', icon: HomeIcon, color: 'bg-green-100 text-green-800' },
    { value: 'parking', label: 'Parking', icon: MapPinIcon, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'other', label: 'Other', icon: GlobeAltIcon, color: 'bg-gray-100 text-gray-800' }
  ];

  const commonAmenities = [
    'Parking', 'AC', 'Sound System', 'Stage', 'Photo Booth', 'Catering Kitchen',
    'Prayer Room', 'Bridal Room', 'Security', 'WiFi', 'Generator', 'Garden'
  ];

  // Geocoding function (mock implementation)
  const geocodeAddress = async (address: string) => {
    setIsGeocodingLoading(true);
    try {
      // Mock geocoding - in real app, use Google Maps Geocoding API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Return mock coordinates based on city
      const mockCoordinates = {
        'jakarta': { lat: -6.2088, lng: 106.8456 },
        'bekasi': { lat: -6.2088, lng: 107.0456 },
        'bandung': { lat: -6.9175, lng: 107.6191 },
        'surabaya': { lat: -7.2504, lng: 112.7688 }
      };

      const city = address.toLowerCase();
      for (const [key, coords] of Object.entries(mockCoordinates)) {
        if (city.includes(key)) {
          return coords;
        }
      }

      // Default Jakarta coordinates
      return { lat: -6.2088, lng: 106.8270 };
    } catch (error) {
      toast({
        title: "Geocoding Error",
        description: "Gagal mendapatkan koordinat lokasi",
        variant: "destructive",
      });
      return formData.coordinates;
    } finally {
      setIsGeocodingLoading(false);
    }
  };

  const handleGeocode = async () => {
    if (!formData.address) {
      toast({
        title: "Error",
        description: "Masukkan alamat terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    const coordinates = await geocodeAddress(formData.address);
    setFormData(prev => ({ ...prev, coordinates }));
    
    toast({
      title: "Geocoding Success",
      description: "Koordinat berhasil ditemukan",
    });
  };

  const createLocation = async () => {
    try {
      const newLocation: Location = {
        ...formData,
        id: Date.now().toString(),
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setLocations(prev => [newLocation, ...prev]);
      setIsCreateDialogOpen(false);
      resetForm();
      
      toast({
        title: "Location Created",
        description: `${newLocation.name} berhasil ditambahkan`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal menambahkan lokasi",
        variant: "destructive",
      });
    }
  };

  const updateLocation = async () => {
    if (!selectedLocation) return;

    try {
      const updatedLocation: Location = {
        ...selectedLocation,
        ...formData,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        updated_at: new Date().toISOString(),
      };

      setLocations(prev => prev.map(loc => 
        loc.id === selectedLocation.id ? updatedLocation : loc
      ));
      setIsEditDialogOpen(false);
      setSelectedLocation(null);
      resetForm();
      
      toast({
        title: "Location Updated",
        description: `${updatedLocation.name} berhasil diperbarui`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal memperbarui lokasi",
        variant: "destructive",
      });
    }
  };

  const deleteLocation = async (locationId: string) => {
    try {
      const location = locations.find(l => l.id === locationId);
      setLocations(prev => prev.filter(l => l.id !== locationId));
      
      toast({
        title: "Location Deleted",
        description: `${location?.name} berhasil dihapus`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal menghapus lokasi",
        variant: "destructive",
      });
    }
  };

  const toggleLocationStatus = async (locationId: string, currentStatus: boolean) => {
    try {
      setLocations(prev => prev.map(loc => 
        loc.id === locationId ? { ...loc, is_active: !currentStatus } : loc
      ));
      
      toast({
        title: "Status Updated",
        description: `Lokasi berhasil ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal mengubah status lokasi",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'ceremony',
      address: '',
      city: '',
      coordinates: { lat: -6.2088, lng: 106.8270 },
      description: '',
      contact_phone: '',
      website: '',
      operating_hours: '',
      capacity: '',
      amenities: [],
      is_primary: false,
      is_active: true
    });
  };

  const openEditDialog = (location: Location) => {
    setSelectedLocation(location);
    setFormData({
      name: location.name,
      type: location.type,
      address: location.address,
      city: location.city,
      coordinates: location.coordinates,
      description: location.description || '',
      contact_phone: location.contact_phone || '',
      website: location.website || '',
      operating_hours: location.operating_hours || '',
      capacity: location.capacity?.toString() || '',
      amenities: location.amenities || [],
      is_primary: location.is_primary,
      is_active: location.is_active
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (location: Location) => {
    setSelectedLocation(location);
    setIsViewDialogOpen(true);
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || location.type === filterType;
    return matchesSearch && matchesType;
  });

  const getLocationTypeInfo = (type: string) => {
    return locationTypes.find(t => t.value === type) || locationTypes[0];
  };

  const openGoogleMaps = (coordinates: { lat: number; lng: number }) => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Map & Location Manager</h1>
          <p className="text-muted-foreground">Manage wedding venues and important locations</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>Add a new venue or important location for the wedding</DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="contact">Contact & Hours</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Location Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Masjid Al-Ikhlas"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Location Type</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Location['type'] }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {locationTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter full address"
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="e.g., Jakarta"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Coordinates</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleGeocode}
                      disabled={isGeocodingLoading}
                      className="w-full"
                    >
                      {isGeocodingLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Getting Location...
                        </>
                      ) : (
                        <>
                          <Navigation className="h-4 w-4 mr-2" />
                          Get Coordinates
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the location"
                    rows={3}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input
                      id="phone"
                      value={formData.contact_phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
                      placeholder="+62 812-3456-7890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hours">Operating Hours</Label>
                    <Input
                      id="hours"
                      value={formData.operating_hours}
                      onChange={(e) => setFormData(prev => ({ ...prev, operating_hours: e.target.value }))}
                      placeholder="08:00 - 22:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                      placeholder="500"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-4">
                <div className="space-y-2">
                  <Label>Amenities</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {commonAmenities.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="rounded"
                        />
                        <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="primary"
                      checked={formData.is_primary}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_primary: checked }))}
                    />
                    <Label htmlFor="primary">Primary Location</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createLocation}>Create Location</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All Types</option>
              {locationTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Locations Grid */}
      <div className="grid gap-4">
        {filteredLocations.map((location) => {
          const typeInfo = getLocationTypeInfo(location.type);
          const IconComponent = typeInfo.icon;

          return (
            <Card key={location.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gray-100">
                      <IconComponent className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{location.name}</h3>
                        <Badge className={typeInfo.color}>
                          {typeInfo.label}
                        </Badge>
                        {location.is_primary && (
                          <Badge variant="default">Primary</Badge>
                        )}
                        {!location.is_active && (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{location.address}</span>
                        </div>
                        {location.contact_phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{location.contact_phone}</span>
                          </div>
                        )}
                        {location.operating_hours && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{location.operating_hours}</span>
                          </div>
                        )}
                        {location.capacity && (
                          <div className="text-sm">
                            <span className="font-medium">Capacity:</span> {location.capacity} people
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openGoogleMaps(location.coordinates)}
                    >
                      <Globe className="h-4 w-4" />
                    </Button>
                    <Switch
                      checked={location.is_active}
                      onCheckedChange={() => toggleLocationStatus(location.id, location.is_active)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewDialog(location)}
                    >
                      <GlobeAltIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(location)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteLocation(location.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredLocations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPinIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No locations found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first location.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapManager;
