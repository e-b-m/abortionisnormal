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
  const [quickStory, setQuickStory] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [focusedLocation, setFocusedLocation] = useState<LatLngLiteral | null>({
    lat: 51.5074,
    lng: -0.1278,
  });

  const addStoryToMap = (text: string) => {
    if (!draftPin) {
      setStatus('Tap the map to choose where your note belongs.');
      return;
    }
    if (!text.trim()) {
      setStatus('Write a short story or feeling before saving.');
      return;
    }

    const newPin: StoryPin = {
      id: `pin-${Date.now()}`,
      lat: roundCoordinate(draftPin.lat),
      lng: roundCoordinate(draftPin.lng),
      note: text.trim(),
    };
    setPins((prev) => [...prev, newPin]);
    setNote('');
    setQuickStory('');
    setDraftPin(null);
    setStatus('Story added to the map. Thank you.');
    setShowSteps(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addStoryToMap(note);
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
    setShowSteps(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative h-[60vh] flex-1 overflow-hidden rounded-[32px]">
          <Map
            pins={pins}
            draftPin={draftPin}
            onSelectLocation={handleMapSelection}
            focusedLocation={focusedLocation}
          />
        </div>
        <div className="flex flex-col items-center gap-3 sm:w-auto">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-2xl font-bold text-white shadow-lg transition hover:bg-rose-700"
            onClick={() => setShowSteps((prev) => !prev)}
            aria-label="Toggle story instructions"
          >
            +
          </button>
          {showSteps && (
            <div className="w-64 rounded-2xl border border-rose-200 bg-white/95 p-4 text-sm text-rose-700 shadow-xl">
              <p className="font-semibold">
                1. Find the location of your story with the map and click to add a pin.
              </p>
              <p className="mt-2">2. Share your story in this space.</p>
              <textarea
                className="mt-3 w-full rounded-lg border border-rose-200 bg-white/90 p-2 text-xs text-rose-800 focus:border-rose-400 focus:outline-none"
                rows={3}
                placeholder="Share your story here…"
                value={quickStory}
                onChange={(event) => setQuickStory(event.target.value)}
              />
              <button
                type="button"
                className="mt-3 w-full rounded-full bg-rose-600 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700 disabled:bg-rose-300"
                disabled={!draftPin || !quickStory.trim()}
                onClick={() => addStoryToMap(quickStory)}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <label className="flex flex-col gap-2 text-sm text-rose-500 sm:flex-row sm:items-center">
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
      {status && (
        <p className="text-xs text-rose-600">
          {status}
        </p>
      )}
    </div>
  );
}
