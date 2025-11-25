// components/LeafletMap.tsx
'use client'; 

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function LeafletMap() {
  // Define the initial central position (e.g., San Francisco)
  const initialPosition: [number, number] = [37.7749, -122.4194]; 
  const pastelIcon = L.icon({
    iconUrl: '/leaflet/pin-pastel.svg',
    iconRetinaUrl: '/leaflet/pin-pastel.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 38],
    popupAnchor: [0, -30],
    tooltipAnchor: [0, -30],
  });

  return (
    <MapContainer 
      center={initialPosition} 
      zoom={13} 
      scrollWheelZoom={false}
      // CRUCIAL: Map needs a size to be visible
      style={{ height: '80vh', width: '100%' }} 
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker position={initialPosition} icon={pastelIcon}>
        <Popup>
          This is your starting pin!
        </Popup>
      </Marker>
    </MapContainer>
  );
}
