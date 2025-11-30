"use client";

import { useState } from "react";

const sections = [
  { label: "About the project", href: "/about" },
  { label: "Information", href: "/information" },
  { label: "Archiving abortion", href: "/archiving-abortion" },
  { label: "Abortion timeline", href: "/abortion-timeline" },
];

export default function CategoryFilter({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (href: string, label: string) => {
    setSelected(label);
    onSelect(label);
    window.location.href = href;
  };

  return (
    <div className="pointer-events-auto flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-transparent transition focus:outline-none"
        aria-label="Toggle site menu"
      >
        {/* Pixel cursor built with an inline SVG so it always looks crisp */}
        <svg
          viewBox="0 0 24 24"
          className="h-12 w-12 fill-white stroke-black"
          style={{ filter: "drop-shadow(0 0 12px rgba(255,105,180,0.9))" }}
          role="presentation"
          aria-hidden
        >
          <path
            d="M5 3v17l4-4 3 7 3-1.3-3-7.6H18z"
            strokeWidth={2}
            strokeLinejoin="miter"
          />
        </svg>
      </button>
      {menuOpen && (
        <div
          className="inline-flex w-max flex-col rounded-[2rem] border border-rose-200 bg-pink-100 text-sm text-rose-600 shadow-[15px_20px_30px_rgba(225,29,72,0.25)]"
          role="menu"
        >
          {sections.map((section, index) => (
            <button
              key={section.href}
              type="button"
              role="menuitem"
              className={`w-full px-5 py-2.5 text-left text-base font-semibold text-rose-600 transition hover:bg-rose-50 ${
                selected === section.label ? "bg-rose-100/80 text-rose-700" : ""
              } ${index === 0 ? "rounded-t-[2rem]" : ""} ${
                index === sections.length - 1 ? "rounded-b-[2rem]" : ""
              }`}
              onClick={() => {
                handleChange(section.href, section.label);
                setMenuOpen(false);
              }}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
