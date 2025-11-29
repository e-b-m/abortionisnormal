// components/LeafletMap.tsx
'use client';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngLiteral, LeafletMouseEvent } from 'leaflet';
import { useEffect, useState } from 'react';

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
  focusedLocation: LatLngLiteral | null;
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
    click(e: LeafletMouseEvent) {
      onSelectLocation(e.latlng);
    },
  });
  return null;
}

function FlyToLocation({ coords }: { coords: LatLngLiteral | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 11, { duration: 1.2 });
    }
  }, [coords, map]);
  return null;
}

export default function LeafletMap({
  pins,
  draftPin,
  onSelectLocation,
  focusedLocation,
}: LeafletMapProps) {
  const [showAttribution, setShowAttribution] = useState(false);
  const initialPosition: [number, number] = [51.5074, -0.1278];
  const customTileUrl = process.env.NEXT_PUBLIC_TILE_URL;
  const customTileAttribution = process.env.NEXT_PUBLIC_TILE_ATTRIBUTION;
  const tileUrl =
    customTileUrl ??
    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  const tileAttribution =
    customTileAttribution ??
    'Map tiles by <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <div className="relative">
      <MapContainer
        center={initialPosition}
        zoom={13}
        scrollWheelZoom={false}
        attributionControl={false}
        style={{ height: '90vh', width: '100%' }}
      >
        <TileLayer attribution={tileAttribution} url={tileUrl} />
        <MapClickHandler onSelectLocation={onSelectLocation} />
        <FlyToLocation coords={focusedLocation} />
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
      <div className="pointer-events-none absolute bottom-4 right-4 z-[1000] flex flex-col items-end gap-2">
        {showAttribution && (
          <div className="pointer-events-auto rounded-2xl border border-white/30 bg-rose-900/90 px-4 py-3 text-xs text-rose-50 shadow-lg">
            <p>
              Map data © <a className="underline" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors
            </p>
            <p>
              {mapboxToken ? (
                <>
                  Style by <a className="underline" href="https://www.mapbox.com/" target="_blank" rel="noreferrer">Mapbox</a>
                </>
              ) : (
                <>
                  Tiles © <a className="underline" href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>
                </>
              )}
            </p>
          </div>
        )}
        <button
          type="button"
          className="pointer-events-auto rounded-full bg-rose-50/90 px-3 py-1 text-sm font-semibold text-rose-700 shadow"
          onClick={() => setShowAttribution((prev) => !prev)}
        >
          i
        </button>
      </div>
    </div>
  );
}
