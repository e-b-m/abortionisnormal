// components/LeafletMap.tsx
'use client'; 

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// This block fixes the issue where default Leaflet marker icons don't show up 
// in modern bundlers like Next.js.
type IconDefaultPrototype = L.Icon.Default & { _getIconUrl?: () => string };
const iconDefaultPrototype = L.Icon.Default.prototype as IconDefaultPrototype;
delete iconDefaultPrototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
  iconUrl: 'leaflet/images/marker-icon.png',
  shadowUrl: 'leaflet/images/marker-shadow.png',
});

export default function LeafletMap() {
  // Define the initial central position (e.g., San Francisco)
  const initialPosition: [number, number] = [37.7749, -122.4194]; 

  return (
    <MapContainer 
      center={initialPosition} 
      zoom={13} 
      scrollWheelZoom={false}
      // CRUCIAL: Map needs a size to be visible
      style={{ height: '80vh', width: '100%' }} 
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={initialPosition}>
        <Popup>
          This is your starting pin!
        </Popup>
      </Marker>
    </MapContainer>
  );
}
