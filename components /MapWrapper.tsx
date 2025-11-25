// components/MapWrapper.tsx
'use client';
import dynamic from 'next/dynamic';
// Removed: import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // CRUCIAL for map styling

// Dynamically import the LeafletMap component.
const Map = dynamic(
  () => import('./LeafletMap'), 
  { 
    ssr: false, 
    loading: () => <p>Loading map...</p>, // Good practice!
  }
);

// We define a simple wrapper component to export
export default function MapWrapper() {
  return <Map />;
}
