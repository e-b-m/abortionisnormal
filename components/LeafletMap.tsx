// components/LeafletMap.tsx
'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngLiteral } from 'leaflet';

export type StoryPin = {
  id: string;
  lat: number;
  lng: number;
  note: string;
};

export type LeafletMapProps = {
  pins: StoryPin[];
  draftPin: LatLngLiteral | null;
  onSelectLocation: (coords: LatLngLiteral) => void;
};

const pastelIcon = L.icon({
  iconUrl: '/leaflet/pin-pastel.svg',
  iconRetinaUrl: '/leaflet/pin-pastel.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 38],
  popupAnchor: [0, -30],
  tooltipAnchor: [0, -30],
});

function MapClickHandler({
  onSelectLocation,
}: {
  onSelectLocation: (coords: LatLngLiteral) => void;
}) {
  useMapEvents({
    click(e) {
      onSelectLocation(e.latlng);
    },
  });
  return null;
}

export default function LeafletMap({
  pins,
  draftPin,
  onSelectLocation,
}: LeafletMapProps) {
  const initialPosition: [number, number] = [51.5074, -0.1278];

  return (
    <MapContainer
      center={initialPosition}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '80vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MapClickHandler onSelectLocation={onSelectLocation} />
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          position={[pin.lat, pin.lng]}
          icon={pastelIcon}
        >
          <Popup>{pin.note}</Popup>
        </Marker>
      ))}
      {draftPin && (
        <Marker position={[draftPin.lat, draftPin.lng]} icon={pastelIcon}>
          <Popup>Selected spot for your next story</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
