"use client";

// app/page.tsx

import Link from "next/link";
import { useCallback } from "react";
import MapWrapper from "../components/MapWrapper";
import CategoryFilter from "../components/CategoryFilter";
import SiteFooter from "../components/SiteFooter";

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
      <header className="border-b border-rose-200 bg-rose-50/60 px-2 py-2">
        <div className="flex flex-col items-center gap-3 text-sm text-rose-500">
          <div className="self-start translate-y-2">
            <CategoryFilter onSelect={handleCategorySelect} />
          </div>
          <h1
            className="text-center text-5xl font-semibold uppercase text-rose-600"
            style={{ fontFamily: "var(--font-queer-map)" }}
          >
            Open About Abortion
          </h1>
          <nav className="flex flex-wrap justify-center gap-3 text-[0.6rem] uppercase tracking-[0.35em] text-rose-600">
            <Link href="/about" className="hover:text-rose-800">
              About
            </Link>
            <Link href="/archiving-abortion" className="hover:text-rose-800">
              Archiving
            </Link>
            <Link href="/abortion-timeline" className="hover:text-rose-800">
              Timeline
            </Link>
            <Link href="/world-continents" className="hover:text-rose-800">
              Continents
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex flex-col gap-2 px-4 py-6 lg:flex-row lg:items-start">
        <div className="flex w-full flex-col gap-6">
          <section className="space-y-4">
            <p className="font-sans text-lg leading-tight text-rose-500">
              Inspired by Queering the Map, Open About Abortion makes the personal political tackling abortion stigma and misinformation directly. Explore the archives, read through the timeline and share your thoughts on the map. Educating, sharing and staying informed one bit of history at a time. Drop a pin, leave a note, and see how abortion care touches every part of the world.
            </p>
          </section>

          <section className="relative flex justify-center">
            <div className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
              <MapWrapper />
            </div>
          </section>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
