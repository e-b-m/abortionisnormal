'use client';
/* eslint-disable @next/next/no-img-element */

import { DragEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import CategoryFilter from "../../components/CategoryFilter";
import SiteFooter from "../../components/SiteFooter";

type MediaPreview = {
  name: string;
  url: string;
  type: string;
};

type ArchiveItem = {
  id?: string | number;
  title: string;
  type: "Photo" | "Essay" | "Link" | "Artifact";
  description: string;
  meta: string;
  href?: string;
  media?: MediaPreview[];
};

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
  const [items, setItems] = useState<ArchiveItem[]>([]);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [status, setStatus] = useState<string | null>(null);
  const [previews, setPreviews] = useState<MediaPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingMedia, setExistingMedia] = useState<MediaPreview[]>([]);
  const [removedMedia, setRemovedMedia] = useState<string[]>([]);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const response = await fetch("/api/archive");
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error || "Failed to load entries");
        }
        setItems(payload.entries);
        setFetchError(null);
      } catch (error) {
        setFetchError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    loadEntries();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.meta.trim()) {
      setStatus("Please add a title, short description, and context.");
      return;
    }
    try {
      setIsSaving(true);
      setStatus("Publishing entry...");
      const response = await fetch("/api/archive", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId ?? undefined,
          title: form.title,
          type: form.type,
          description: form.description,
          meta: form.meta,
          href: form.href,
          media: previews,
          removeMediaKeys: removedMedia,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Unable to save entry.");
      }
      setItems(payload.entries);
      setForm(emptyForm);
      setPreviews([]);
      setExistingMedia([]);
      setRemovedMedia([]);
      setEditingId(null);
      setStatus(
        editingId
          ? "Entry updated successfully."
          : "Thank you — your entry is now public.",
      );
    } catch (error) {
      setStatus((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files || []);
    if (!files.length) {
      setStatus("Drop images, PDFs, or audio files to catalogue them here.");
      return;
    }
    try {
      const assets = await Promise.all(
        files.map(
          (file) =>
            new Promise<MediaPreview>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () =>
                resolve({
                  name: file.name,
                  url: reader.result as string,
                  type: file.type,
                });
              reader.onerror = () =>
                reject(new Error(`Failed to read ${file.name}`));
              reader.readAsDataURL(file);
            }),
        ),
      );
      setPreviews((prev) => [...assets, ...prev]);
      setStatus(
        `Queued ${assets.length} file${
          assets.length > 1 ? "s" : ""
        } — add metadata below.`,
      );
    } catch {
      setStatus("Could not read one of the files. Try again?");
    }
  };

  const handleEdit = (entry: ArchiveItem) => {
    setEditingId(entry.id ? String(entry.id) : null);
    setForm({
      title: entry.title,
      type: entry.type,
      description: entry.description,
      meta: entry.meta,
      href: entry.href ?? "",
    });
    setExistingMedia(entry.media ?? []);
    setPreviews([]);
    setRemovedMedia([]);
    setStatus(`Editing “${entry.title}”. Upload new files or adjust details.`);
  };

  const handleDelete = async (entry: ArchiveItem) => {
    if (!entry.id) return;
    if (!window.confirm(`Delete “${entry.title}”? This cannot be undone.`)) {
      return;
    }
    try {
      setStatus(`Deleting “${entry.title}”...`);
      const response = await fetch("/api/archive", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entry.id }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Unable to delete entry");
      }
      setItems(payload.entries);
      if (editingId && entry.id === editingId) {
        setForm(emptyForm);
        setEditingId(null);
        setExistingMedia([]);
        setPreviews([]);
        setRemovedMedia([]);
      }
      setStatus("Entry removed.");
    } catch (error) {
      setStatus((error as Error).message);
    }
  };

  const handleRemoveExistingMedia = (url: string) => {
    setRemovedMedia((prev) =>
      prev.includes(url) ? prev.filter((entry) => entry !== url) : [...prev, url],
    );
  };

  const isEditing = Boolean(editingId);

  return (
    <main className="min-h-screen bg-pink-100 text-rose-900">
      <div className="px-6 pb-4">
        <CategoryFilter />
      </div>
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

        <section className="space-y-6 rounded-[32px] border border-rose-200 bg-white/90 p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-semibold uppercase tracking-wide text-rose-800">
              {isEditing ? "Edit archive entry" : "Add to the archive"}
            </h2>
            {isEditing && (
              <button
                type="button"
                className="rounded-full border border-rose-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-rose-600 hover:bg-rose-50"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                  setExistingMedia([]);
                  setPreviews([]);
                  setRemovedMedia([]);
                  setStatus(null);
                }}
              >
                Cancel edit
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-rose-600">
            Entries save in this browser session for now. We&apos;ll ship a
            proper database soon, but you can already prototype stories and
            collections right here.
          </p>
          <div
            className="rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/60 p-6 text-center text-rose-700 transition hover:border-rose-400"
            onDragOver={(event) => event.preventDefault()}
            onDragEnter={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-rose-500">
              Drag & Drop
            </p>
            <p className="mt-2 text-sm">
              Drop scans, zines, flyers, or photos (images, PDFs, audio). We keep
              the filenames locally for now so you can catalogue them with notes.
            </p>
            {(existingMedia.length > 0 || previews.length > 0) && (
              <ul className="mt-4 space-y-1 text-left text-xs text-rose-600">
                {[...existingMedia, ...previews].map((preview, index) => (
                  <li
                    key={`${preview.name}-${index}`}
                    className="rounded-lg border border-rose-100 bg-white/70 px-3 py-2"
                  >
                    {preview.name}
                  </li>
                ))}
              </ul>
            )}
            {existingMedia.some((preview) => preview.type.startsWith("image/")) && (
              <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                {existingMedia
                  .filter((preview) => preview.type.startsWith("image/"))
                  .map((preview) => (
                    <figure
                      key={`${preview.url}-existing`}
                      className={`overflow-hidden rounded-xl border border-rose-100 bg-white/80 p-2 shadow-sm ${removedMedia.includes(preview.url) ? "opacity-40" : ""}`}
                    >
                      <img
                        src={preview.url}
                        alt={preview.name}
                        className="h-32 w-full rounded-lg object-cover"
                      />
                      <figcaption className="mt-1 flex items-center justify-between text-[0.65rem] text-rose-500">
                        <span>{preview.name}</span>
                        <button
                          type="button"
                          className="text-rose-600 underline"
                          onClick={() => handleRemoveExistingMedia(preview.url)}
                        >
                          {removedMedia.includes(preview.url) ? "Undo" : "Remove"}
                        </button>
                      </figcaption>
                    </figure>
                  ))}
              </div>
            )}
            {previews.some((preview) => preview.type.startsWith("image/")) && (
              <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                {previews
                  .filter((preview) => preview.type.startsWith("image/"))
                  .map((preview) => (
                    <figure
                      key={preview.url}
                      className="overflow-hidden rounded-xl border border-rose-100 bg-white/80 p-2 shadow-sm"
                    >
                      <img
                        src={preview.url}
                        alt={preview.name}
                        className="h-32 w-full rounded-lg object-cover"
                      />
                      <figcaption className="mt-1 text-[0.65rem] text-rose-500">
                        {preview.name}
                      </figcaption>
                    </figure>
                  ))}
              </div>
            )}
          </div>
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
                className="rounded-full bg-rose-600 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-rose-700 disabled:bg-rose-300"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Publish entry"}
              </button>
            </div>
            {status && (
              <p className="md:col-span-2 text-xs text-rose-600">{status}</p>
            )}
          </form>
        </section>

        {fetchError && (
          <p className="text-sm text-rose-600">{fetchError}</p>
        )}
        {isLoading ? (
          <p className="text-sm text-rose-500">Loading archive entries...</p>
        ) : (
          <section className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.id ?? `${item.title}-${item.meta}`}
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
              {item.media && item.media.length > 0 && (
                <div className="mt-4 space-y-3">
                  {item.media.some((media) =>
                    media.type.startsWith("image/"),
                  ) && (
                    <div className="grid grid-cols-2 gap-3 text-left">
                      {item.media
                        .filter((media) => media.type.startsWith("image/"))
                        .map((media) => (
                          <figure
                            key={`${item.title}-${media.name}`}
                            className="overflow-hidden rounded-xl border border-rose-100 bg-white/80 p-2 shadow-sm"
                          >
                            <img
                              src={media.url}
                              alt={media.name}
                              className="h-32 w-full rounded-lg object-cover"
                            />
                            <figcaption className="mt-1 text-[0.65rem] text-rose-500">
                              {media.name}
                            </figcaption>
                          </figure>
                        ))}
                    </div>
                  )}
                  {item.media.some(
                    (media) => !media.type.startsWith("image/"),
                  ) && (
                    <ul className="text-xs text-rose-500">
                      {item.media
                        .filter((media) => !media.type.startsWith("image/"))
                        .map((media) => (
                          <li key={`${item.title}-${media.name}`}>
                            {media.name} ({media.type || "file"})
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              )}
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
              {item.id && (
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    className="rounded-full border border-rose-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-rose-600 hover:bg-rose-50"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-rose-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-rose-600 hover:bg-rose-50"
                    onClick={() => handleDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </article>
          ))}
        </section>
        )}

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
      <SiteFooter />
    </main>
  );
}
