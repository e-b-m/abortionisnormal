"use client";

import Image from "next/image";
import { useState } from "react";
import CategoryFilter from "../../components/CategoryFilter";
import SiteFooter from "../../components/SiteFooter";

type Continent = {
  name: string;
  subtitle: string;
  summary: string;
  focus: string;
  position: {
    top: string;
    left: string;
  };
  slug?: string;
  mask?: string;
  dimensions?: {
    width: number;
    height: number;
  };
};

const continents: Continent[] = [
  {
    name: "Africa",
    subtitle: "West, East, and Southern networks",
    summary:
      "Regional coalitions coordinate cross-border abortion funds, mobile clinics, and post-abortion care training despite patchwork laws.",
    focus:
      "Key hubs: South Africa (full service), Tunisia (first-trimester on request), Kenya (telemedicine pilots).",
    position: { top: "60%", left: "52%" },
    mask: "/continents/Africa.svg",
    dimensions: { width: 150, height: 200 },
  },
  {
    name: "Europe",
    slug: "europe",
    subtitle: "EU, Balkans & UK",
    summary:
      "Most Western European countries provide care on request, while Malta and Andorra still enforce total bans. UK telemedicine informs wider policy shifts.",
    focus:
      "England, Wales, and Scotland allow pills by post; France extends gestational limits; Poland faces new legal challenges.",
    position: { top: "28%", left: "64%" },
    mask: "/continents/Europe.svg",
    dimensions: { width: 130, height: 90 },
  },
  {
    name: "Asia",
    slug: "asia",
    subtitle: "Central, South & East",
    summary:
      "Access ranges from liberal Japan and India to restrictive Philippines. Grassroots telehealth and pharmacy access play huge roles.",
    focus:
      "India permits up to 24 weeks with board approval; South Korea decriminalised in 2021 but awaits full guidelines.",
    position: { top: "50%", left: "85%" },
    mask: "/continents/Asia.svg",
    dimensions: { width: 180, height: 130 },
  },
  {
    name: "Oceania",
    subtitle: "Pacific & Australia",
    summary:
      "Australia and New Zealand now allow abortion on request; Pacific Island nations rely on medevacs and international funds.",
    focus:
      "Abortion is fully legal across Australia (ACT first in 2002, WA last in 2023). PNG and Samoa restrict except to save life.",
    position: { top: "80%", left: "94%" },
    mask: "/continents/Oceania.svg",
    dimensions: { width: 130, height: 110 },
  },
  {
    name: "North America",
    slug: "north-america",
    subtitle: "Canada, U.S., Mexico & Caribbean",
    summary:
      "Mexico decriminalised nationally in 2023, while U.S. protections vary by state. Canada funds procedures across provinces.",
    focus:
      "Mexico City pioneered public clinics in 2007; U.S. shield laws help telemedicine cross state lines; Jamaica still criminalises.",
    position: { top: "25%", left: "16%" },
    mask: "/continents/NorthAmerica.svg",
    dimensions: { width: 170, height: 150 },
  },
  {
    name: "South America",
    slug: "south-america",
    subtitle: "Andean & Southern Cone",
    summary:
      "The Green Wave secured legal wins in Argentina (2020) and Colombia (2022). Brazil only permits in limited cases.",
    focus:
      "Argentina allows up to 14 weeks nationwide; Colombia permits up to 24 weeks; Chile debates expansion beyond risk exceptions.",
    position: { top: "70%", left: "24%" },
    mask: "/continents/SouthAmerica.svg",
    dimensions: { width: 130, height: 170 },
  },
];

export default function WorldContinentsPage() {
  const [active, setActive] = useState<Continent>(continents[0]);

  return (
    <main className="min-h-screen bg-pink-100 text-rose-900">
      <div className="px-6 pb-4 pt-6">
        <CategoryFilter />
      </div>
      <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 pb-16 font-sans">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-600">Global landscape</p>
          <h1
            className="text-4xl font-bold uppercase tracking-[0.3em] text-rose-800 sm:text-5xl"
            style={{ fontFamily: "var(--font-queer-map)" }}
          >
            Access across continents
          </h1>
          <p className="text-base text-rose-600 sm:text-lg">
            Click a region to learn how abortion access, telemedicine, and funding differ around the world.
          </p>
        </header>

        <div className="world-map-card">
          <div className="world-map-canvas" aria-label="Interactive world map">
            {continents.map((continent) => (
              <button
                key={continent.name}
                type="button"
                className={`continent-tile ${
                  continent.name === active.name ? "continent-tile--active" : ""
                }`}
                style={{
                  top: continent.position.top,
                  left: continent.position.left,
                }}
                data-continent={continent.slug}
                onClick={() => setActive(continent)}
              >
                <span className="continent-text">
                  <span className="continent-label">{continent.name}</span>
                </span>
                <span
                  className="continent-shape"
                  aria-hidden
                  style={{
                    width: continent.dimensions?.width ?? 130,
                    height: continent.dimensions?.height ?? 110,
                    WebkitMaskImage: continent.mask ? `url(${continent.mask})` : undefined,
                    maskImage: continent.mask ? `url(${continent.mask})` : undefined,
                  }}
                />
              </button>
            ))}
          </div>

          <article className="continent-panel">
            <p className="continent-panel__eyebrow">{active.subtitle}</p>
            <h2 className="continent-panel__title">{active.name}</h2>
            <p className="continent-panel__summary">{active.summary}</p>
            <div className="continent-panel__focus">
              <p className="font-semibold uppercase tracking-[0.2em] text-rose-700">
                Spotlight
              </p>
              <p className="text-sm text-rose-800">{active.focus}</p>
            </div>
          </article>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
