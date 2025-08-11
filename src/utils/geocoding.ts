
// Simple reverse geocoding using Nominatim (OpenStreetMap's geocoding service)
export const reverseGeocode = async (lat: number, lng: number): Promise<{
  name: string;
  address: string;
} | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=id,en`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding failed');
    }
    
    const data = await response.json();
    
    if (data && data.address) {
      const address = data.address;
      
      // Extract meaningful name (priority: amenity, building, house_number + road, road, suburb)
      const name = address.amenity || 
                  address.building || 
                  (address.house_number && address.road ? `${address.house_number} ${address.road}` : address.road) ||
                  address.suburb ||
                  address.village ||
                  address.city ||
                  'Lokasi Terpilih';
      
      // Build full address
      const addressParts = [];
      if (address.house_number && address.road) {
        addressParts.push(`${address.house_number} ${address.road}`);
      } else if (address.road) {
        addressParts.push(address.road);
      }
      
      if (address.suburb) addressParts.push(address.suburb);
      if (address.city || address.town || address.village) {
        addressParts.push(address.city || address.town || address.village);
      }
      if (address.state) addressParts.push(address.state);
      if (address.country) addressParts.push(address.country);
      
      const fullAddress = addressParts.join(', ') || data.display_name || 'Alamat tidak ditemukan';
      
      return {
        name: name,
        address: fullAddress
      };
    }
    
    return null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};
