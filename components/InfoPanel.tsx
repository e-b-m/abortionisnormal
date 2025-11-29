"use client";

import { useState } from "react";

const tabs = [
  {
    id: "about",
    label: "About",
    content:
      "This archive maps abortion stories across geographies. It is built by and for those who believe personal histories are political data and every note matters.",
  },
  {
    id: "support",
    label: "Support Us",
    content:
      "You can fuel this work by sharing the project, contributing code, translating the interface, or funding grassroots abortion funds and mutual aid groups.",
  },
  {
    id: "moderation",
    label: "Moderation",
    content:
      "We moderate with a harm-reduction lens. Entries revealing private data, celebrating violence, or targeting marginalized people are removed quickly after community reports.",
  },
  {
    id: "press",
    label: "Press",
    content:
      "For interviews or collaborations, contact the team with your deadline and focus. We keep a press kit and high-res assets ready for organizers and journalists.",
  },
];

const bottomLinks = [
  "FAQs",
  "Privacy Policy",
  "Terms of Use",
  "Contact",
];

export default function InfoPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [active, setActive] = useState("about");
  if (!open) return null;

  const activeContent =
    tabs.find((tab) => tab.id === active)?.content ?? tabs[0].content;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-pink-200 text-black">
      <div className="grid grid-cols-3 grid-rows-2 border-b border-black">
        <button
          className="row-span-2 border-r border-black px-4 text-left text-sm font-semibold uppercase tracking-[0.4em]"
          onClick={onClose}
        >
          ✕ Close
        </button>
        <button
          onClick={() => setActive("about")}
          className={`border-b border-r border-black px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.4em] ${active === "about" ? "bg-pink-300" : ""}`}
        >
          About
        </button>
        <button
          onClick={() => setActive("support")}
          className={`border-b border-black px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.4em] ${active === "support" ? "bg-pink-300" : ""}`}
        >
          Support Us
        </button>
        <button
          onClick={() => setActive("moderation")}
          className={`border-r border-black px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.4em] ${active === "moderation" ? "bg-pink-300" : ""}`}
        >
          Moderation
        </button>
        <button
          onClick={() => setActive("press")}
          className={`border-black px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.4em] ${active === "press" ? "bg-pink-300" : ""}`}
        >
          Press
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-8 text-base leading-relaxed">
        {activeContent}
      </div>
      <div className="grid grid-cols-2 gap-4 border-t border-black bg-pink-300 px-6 py-4 text-sm uppercase tracking-[0.3em] sm:grid-cols-4">
        {bottomLinks.map((label) => (
          <button
            key={label}
            className="rounded-full border border-black px-3 py-2 transition hover:bg-white"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
