'use client';

import { FormEvent, useState } from "react";
import Link from "next/link";

type ArchiveItem = {
  title: string;
  type: "Photo" | "Essay" | "Link" | "Artifact";
  description: string;
  meta: string;
  href?: string;
};

const initialItems: ArchiveItem[] = [
  {
    title: "1967 Abortion Act leaflet",
    type: "Artifact",
    description:
      "Pamphlet circulated by the Abortion Law Reform Association summarising the proposed legislation and community organising tactics.",
    meta: "London · 1966",
    href: "https://www.museumofcontraceptionandabortion.org/",
  },
  {
    title: "DIY health zine",
    type: "Essay",
    description:
      "A queer collective’s notes on traveling from Belfast to Liverpool for care before decriminalisation.",
    meta: "Belfast & Liverpool · 2015",
  },
  {
    title: "Mifepristone packaging",
    type: "Photo",
    description:
      "NHS-issued abortion pills photographed to preserve everyday abortion artefacts.",
    meta: "Manchester · 2020",
  },
  {
    title: "Abortion storytelling podcast",
    type: "Link",
    description:
      "Mini-series capturing Black British abortion narratives and the mutual aid webs that supported each story.",
    meta: "UK · ongoing",
    href: "https://example.com/podcast",
  },
];

const archiveTypes: ArchiveItem["type"][] = [
  "Photo",
  "Essay",
  "Link",
  "Artifact",
];

const emptyForm = {
  title: "",
  type: "Photo" as ArchiveItem["type"],
  description: "",
  meta: "",
  href: "",
};

export default function ArchivingAbortionPage() {
  const [items, setItems] = useState<ArchiveItem[]>(initialItems);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.meta.trim()) {
      setStatus("Please add a title, short description, and context.");
      return;
    }
    const newItem: ArchiveItem = {
      title: form.title.trim(),
      type: form.type,
      description: form.description.trim(),
      meta: form.meta.trim(),
      href: form.href.trim() || undefined,
    };
    setItems((prev) => [newItem, ...prev]);
    setForm(emptyForm);
    setStatus("Thank you — your entry now appears in the archive below.");
  };

  return (
    <main className="min-h-screen bg-pink-100 text-rose-900">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-12 font-sans">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-600">
            Archiving Abortion
          </p>
          <h1
            className="text-5xl font-bold uppercase tracking-widest text-rose-800"
            style={{ fontFamily: "var(--font-queer-map)" }}
          >
            A living database of care work
          </h1>
          <p className="text-lg text-rose-600">
            Inspired by projects like muvs.org, this page preserves the
            ephemera, photographs, oral histories, and links that tell the story
            of abortion access in the UK and beyond. Add media directly below —
            no GitHub account required.
          </p>
        </header>

        <section className="rounded-[32px] border border-rose-200 bg-white/90 p-8 shadow-2xl backdrop-blur">
          <h2 className="text-3xl font-semibold uppercase tracking-wide text-rose-800">
            Add to the archive
          </h2>
          <p className="mt-2 text-sm text-rose-600">
            Entries save in this browser session for now. We&apos;ll ship a
            proper database soon, but you can already prototype stories and
            collections right here.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <label className="flex flex-col text-sm text-rose-700">
              Title
              <input
                className="mt-1 rounded-lg border border-rose-200 bg-white p-3 text-rose-900 focus:border-rose-400 focus:outline-none"
                value={form.title}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="e.g. Belfast care collective diary"
              />
            </label>
            <label className="flex flex-col text-sm text-rose-700">
              Type
              <select
                className="mt-1 rounded-lg border border-rose-200 bg-white p-3 text-rose-900 focus:border-rose-400 focus:outline-none"
                value={form.type}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    type: event.target.value as ArchiveItem["type"],
                  }))
                }
              >
                {archiveTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="md:col-span-2 flex flex-col text-sm text-rose-700">
              Description
              <textarea
                className="mt-1 rounded-lg border border-rose-200 bg-white p-3 text-rose-900 focus:border-rose-400 focus:outline-none"
                rows={4}
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                placeholder="What is it? Who created it? Why does it matter?"
              />
            </label>
            <label className="flex flex-col text-sm text-rose-700">
              Context (date, place, people)
              <input
                className="mt-1 rounded-lg border border-rose-200 bg-white p-3 text-rose-900 focus:border-rose-400 focus:outline-none"
                value={form.meta}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, meta: event.target.value }))
                }
                placeholder="e.g. London · 1970, anonymous midwives"
              />
            </label>
            <label className="flex flex-col text-sm text-rose-700">
              Optional link
              <input
                className="mt-1 rounded-lg border border-rose-200 bg-white p-3 text-rose-900 focus:border-rose-400 focus:outline-none"
                value={form.href}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, href: event.target.value }))
                }
                placeholder="https://…"
              />
            </label>
            <div className="md:col-span-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-rose-500">
                Please avoid sharing identifying info without consent.
              </p>
              <button
                type="submit"
                className="rounded-full bg-rose-600 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700"
              >
                Publish entry
              </button>
            </div>
            {status && (
              <p className="md:col-span-2 text-xs text-rose-600">{status}</p>
            )}
          </form>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={`${item.title}-${item.meta}`}
              className="rounded-3xl border border-rose-200 bg-white p-6 shadow-lg"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.3em] text-rose-500">
                <span>{item.type}</span>
                <span>{item.meta}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-rose-800">
                {item.title}
              </h2>
              <p className="mt-3 text-rose-700">{item.description}</p>
              {item.href && (
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-rose-600 underline decoration-rose-300 underline-offset-4"
                >
                  View resource
                </Link>
              )}
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-lg">
          <h3
            className="text-3xl font-semibold uppercase tracking-wide text-rose-800"
            style={{ fontFamily: "var(--font-queer-map)" }}
          >
            Need more tools?
          </h3>
          <p className="mt-3 text-rose-600">
            Export entries into a spreadsheet, add metadata fields, or connect a
            proper CMS when you&apos;re ready. For now, copy/paste this list or
            remix it however you like.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/information"
              className="rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700"
            >
              Resource index
            </Link>
            <Link
              href="/"
              className="rounded-full border border-rose-300 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-rose-700 transition hover:bg-rose-50"
            >
              Back to map
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
