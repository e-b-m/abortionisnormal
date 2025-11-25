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

export default function MapWrapper() {
  const [pins, setPins] = useState<StoryPin[]>([]);
  const [draftPin, setDraftPin] = useState<LatLngLiteral | null>(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<string | null>(null);

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
      lat: draftPin.lat,
      lng: draftPin.lng,
      note: note.trim(),
    };
    setPins((prev) => [...prev, newPin]);
    setNote('');
    setDraftPin(null);
    setStatus('Story added to the map. Thank you.');
  };

  return (
    <div className="space-y-4">
      <Map pins={pins} draftPin={draftPin} onSelectLocation={setDraftPin} />
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
