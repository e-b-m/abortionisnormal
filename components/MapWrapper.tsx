// components/MapWrapper.tsx
'use client';

import { useState, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import type { LatLngLiteral } from 'leaflet';
import type { LeafletMapProps, StoryPin } from './LeafletMap';
import 'leaflet/dist/leaflet.css';

const Map = dynamic<LeafletMapProps>(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => <p>Loading map…</p>,
});

const roundCoordinate = (value: number, precision = 3) =>
  Number(value.toFixed(precision));

export default function MapWrapper() {
  const [pins, setPins] = useState<StoryPin[]>([]);
  const [draftPin, setDraftPin] = useState<LatLngLiteral | null>(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [focusedLocation, setFocusedLocation] = useState<LatLngLiteral | null>({
    lat: 51.5074,
    lng: -0.1278,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draftPin) {
      setStatus('Tap the map to choose where your note belongs.');
      return;
    }
    if (!note.trim()) {
      setStatus('Write a short story or feeling before saving.');
      return;
    }
    const newPin: StoryPin = {
      id: `pin-${Date.now()}`,
      lat: roundCoordinate(draftPin.lat),
      lng: roundCoordinate(draftPin.lng),
      note: note.trim(),
    };
    setPins((prev) => [...prev, newPin]);
    setNote('');
    setDraftPin(null);
    setStatus('Story added to the map. Thank you.');
  };

  const handleLocationJump = async () => {
    const query = searchTerm.trim();
    if (!query) {
      setStatus('Type a city, town, or landmark to jump there.');
      return;
    }
    try {
      setIsSearching(true);
      setStatus('Searching for that place...');
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query,
        )}&format=json&limit=1`,
        {
          headers: {
            'User-Agent':
              'abortion-is-normal/1.0 (https://abortion-is-normal.local)',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to search location');
      }
      const results: Array<{ lat: string; lon: string; display_name: string }> =
        await response.json();
      if (!results.length) {
        setStatus('No results found. Try another place or add more detail.');
        return;
      }
      const first = results[0];
      const coords = {
        lat: roundCoordinate(Number(first.lat)),
        lng: roundCoordinate(Number(first.lon)),
      };
      setFocusedLocation(coords);
      setDraftPin(coords);
      setStatus(`Centered on ${first.display_name}.`);
    } catch {
      setStatus('Could not reach the global search service right now.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleMapSelection = (coords: LatLngLiteral) => {
    const roundedCoords = {
      lat: roundCoordinate(coords.lat),
      lng: roundCoordinate(coords.lng),
    };
    setDraftPin(roundedCoords);
    setFocusedLocation(roundedCoords);
  };

  return (
    <div className="space-y-4">
      <div className="h-[60vh] overflow-hidden rounded-[32px] border border-white/30 bg-white/10 shadow-2xl backdrop-blur">
        <Map
          pins={pins}
          draftPin={draftPin}
          onSelectLocation={handleMapSelection}
          focusedLocation={focusedLocation}
        />
      </div>
      <div className="rounded-xl border border-rose-200 bg-white/80 p-4 shadow-md">
        <label className="flex flex-col gap-2 text-sm text-rose-700 sm:flex-row sm:items-center">
          <span>Jump anywhere in the world</span>
          <div className="flex w-full gap-2">
            <input
              className="w-full rounded-lg border border-rose-200 bg-white/90 p-2 text-sm text-rose-900 focus:border-rose-400 focus:outline-none"
              placeholder="e.g. Manila, Lagos, São Paulo"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button
              type="button"
              className="rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700 disabled:bg-rose-300"
              onClick={handleLocationJump}
              disabled={isSearching}
            >
              {isSearching ? 'Searching…' : 'Go'}
            </button>
          </div>
        </label>
      </div>
     <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-rose-200 bg-white/70 p-4 text-rose-800 shadow-md backdrop-blur"
      >
        <div className="text-sm">
          {draftPin ? (
            <p>
              Selected location:{' '}
              <span className="font-semibold">
                {draftPin.lat.toFixed(4)}, {draftPin.lng.toFixed(4)}
              </span>
            </p>
          ) : (
            <p>Tap anywhere on the map to choose where this story belongs.</p>
          )}
        </div>
        <textarea
          className="w-full rounded-lg border border-rose-200 bg-white/80 p-3 text-sm text-rose-900 placeholder-rose-300 focus:border-rose-400 focus:outline-none"
          rows={4}
          placeholder="Share a feeling, story, or note about abortion in this place…"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-rose-500">
            Notes are anonymous. Please keep them caring.
          </p>
          <button
            type="submit"
            className="rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700 disabled:bg-rose-300"
            disabled={!draftPin}
          >
            Pin your story
          </button>
        </div>
        {status && <p className="text-xs text-rose-600">{status}</p>}
      </form>
    </div>
  );
}
