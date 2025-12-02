"use client";

import Image from "next/image";
import { useState } from "react";

export default function CategoryFilter({
  onSelect,
}: {
  onSelect?: (value: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="pointer-events-auto flex flex-col gap-3">
      <button
        type="button"
        onClick={() => {
          setMenuOpen(false);
          window.location.href = "/";
        }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-transparent transition focus:outline-none"
        aria-label="Go to home"
      >
        <Image
          src="/icons/IconDesign.svg"
          alt="Navigation cursor"
          width={100}
          height={100}
          priority
        />
      </button>
    </div>
  );
}
