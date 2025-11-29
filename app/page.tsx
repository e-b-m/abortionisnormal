// app/page.tsx

import Link from "next/link";
import MapWrapper from "../components/MapWrapper";

const navLinks = [
  { label: "Learn more", href: "/about" },
  { label: "Information", href: "/information" },
  { label: "Archiving abortion", href: "/archiving-abortion" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-100 text-rose-800">
      <div className="overflow-hidden border-b border-rose-200 bg-rose-600 text-white">
        <div className="animate-marquee whitespace-nowrap py-2 text-xs uppercase tracking-[0.6em]">
          Mapping abortion stories everywhere 🌹 Mapping abortion stories everywhere 🌹 Mapping abortion stories everywhere 🌹 Mapping abortion stories everywhere 🌹 Mapping abortion stories everywhere
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <aside className="bg-rose-600 text-white lg:w-64">
          <div className="flex items-center justify-between border-b border-white/20 px-6 py-4 lg:hidden">
            <span className="text-sm uppercase tracking-[0.4em]">Menu</span>
            <details className="relative">
              <summary className="cursor-pointer rounded-full border border-white/40 px-3 py-1 text-xs uppercase tracking-widest">
                Explore
              </summary>
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-rose-600/95 p-4 shadow-xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 py-2 text-xs tracking-[0.2em] text-white hover:text-rose-200"
                  >
                    <span aria-hidden>🌹</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
          </div>
          <div className="hidden h-full flex-col gap-4 px-6 py-10 lg:flex">
            <p className="text-xs uppercase tracking-[0.4em] text-rose-100">
              Navigate
            </p>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 rounded-[2rem] bg-white/10 px-4 py-3 text-xs font-semibold tracking-[0.1em] text-white transition hover:bg-white/20"
                >
                  <span aria-hidden>🌹</span>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-10 lg:flex-row lg:items-start">
          <section className="space-y-8 lg:w-1/2">
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-rose-600">
              Abortion is Normal
            </p>
            <h1
              className="text-5xl font-bold uppercase leading-tight tracking-wide text-rose-800 sm:text-6xl"
              style={{ fontFamily: "var(--font-queer-map)" }}
            >
              Mapping abortion stories everywhere.
            </h1>
            <p className="font-sans text-lg text-rose-500">
              Inspired by Queering the Map, this open-source experiment makes
              the personal political. Drop a pin, leave a note, and see how
              abortion care touches every part of the world.
            </p>

          </section>

          <section className="lg:w-1/2">
            <div className="overflow-hidden rounded-[40px] border border-white/30 bg-white/10 shadow-2xl backdrop-blur">
              <MapWrapper />
            </div>
            <p className="font-sans mt-4 text-sm text-rose-600">
              Click any point to read the story or add your own. All data is
              anonymous; we only store the note you leave.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
