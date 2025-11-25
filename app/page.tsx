// app/page.tsx

import Link from "next/link";
import MapWrapper from "../components /MapWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-100 …">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row">
        <section className="space-y-8 lg:w-1/2">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-600">
            Abortion is Normal
          </p>
          <h1 className="text-5xl font-bold uppercase leading-tight tracking-wide text-rose-800 sm:text-6xl">
            Mapping abortion stories everywhere.
          </h1>
          <p className="font-sans text-lg text-rose-500">
            Inspired by Queering the Map, this open-source experiment makes the
            personal political. Drop a pin, leave a note, and see how abortion
            care touches every part of the world.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-rose-600 transition hover:bg-rose-100 hover:text-rose-700"
            >
              Learn more
            </Link>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-rose-50 transition hover:bg-white/10"
            >
              Contribute
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-lg">
              <p className="text-4xl font-semibold">+1</p>
              <p className="text-rose-200">stories added today</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-lg">
              <p className="text-4xl font-semibold">∞</p>
              <p className="text-rose-200">possible futures</p>
            </div>
          </div>
        </section>

        <section className="lg:w-1/2">
          <div className="overflow-hidden rounded-[40px] border border-white/30 bg-white/10 shadow-2xl backdrop-blur">
            <MapWrapper />
          </div>
          <p className="mt-4 text-sm text-rose-200">
            Click any point to read the story or add your own. All data is
            anonymous; we only store the note you leave.
          </p>
        </section>
      </div>
    </main>
  );
}
