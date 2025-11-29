"use client";

// app/page.tsx

import { useCallback } from "react";
import MapWrapper from "../components/MapWrapper";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const handleCategorySelect = useCallback((category: string) => {
    console.info(`Selected category: ${category}`);
  }, []);

  return (
    <main className="min-h-screen bg-pink-100 text-rose-800">
      <div className="overflow-hidden border-b border-rose-200 bg-rose-600 text-white">
        <div className="animate-marquee whitespace-nowrap py-2 text-xs uppercase tracking-[0.6em]">
          Mapping abortion stories everywhere 🌹 Mapping abortion stories everywhere 🌹 Mapping abortion stories everywhere 🌹 Mapping abortion stories everywhere 🌹 Mapping abortion stories everywhere
        </div>
      </div>
      <div className="flex flex-col gap-2 px-6 py-10 lg:flex-row lg:items-start">
        <aside className="lg:w-56 lg:-mt-4">
          <CategoryFilter onSelect={handleCategorySelect} />
        </aside>
        <div className="flex w-full flex-col gap-10">
          <section className="space-y-6">
            <div className="space-y-4 rounded-3xl bg-rose-50/80 p-6 shadow-xl">
              <p className="font-sans text-xs uppercase tracking-[0.4em] text-rose-600">
                Open about abortion
              </p>
              <h1
                className="w-full text-left text-5xl font-bold uppercase leading-tight tracking-[0.3em] text-rose-800 sm:text-6xl"
                style={{ fontFamily: "var(--font-queer-map)" }}
              >
                Mapping abortion stories,
                <br />
                everywhere
              </h1>
            </div>
            <p className="font-sans text-lg text-rose-500">
              Inspired by Queering the Map, this open-source experiment makes
              the personal political. Drop a pin, leave a note, and see how
              abortion care touches every part of the world.
            </p>
          </section>

          <section className="relative flex justify-center">
            <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
              <MapWrapper />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
