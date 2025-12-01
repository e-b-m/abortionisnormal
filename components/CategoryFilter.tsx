"use client";

import Image from "next/image";
import { useState } from "react";

const sections = [
  { label: "About the project", href: "/about" },
  { label: "Information", href: "/information" },
  { label: "Archiving abortion", href: "/archiving-abortion" },
  { label: "Abortion timeline", href: "/abortion-timeline" },
  { label: "World continents", href: "/world-continents" },
];

export default function CategoryFilter({
  onSelect,
}: {
  onSelect?: (value: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (href: string, label: string) => {
    setSelected(label);
    onSelect?.(label);
    window.location.href = href;
  };

  return (
    <div className="pointer-events-auto flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-transparent transition focus:outline-none"
        aria-label="Toggle site menu"
      >
        <Image
          src="/icons/IconDesign.svg"
          alt="Navigation cursor"
          width={100}
          height={100}
          priority
        />
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
