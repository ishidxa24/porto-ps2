"use client";

import { useState, useEffect } from "react";
import { usePemain } from "./Gerbang";
import { kontak } from "../data/profil";

const CFG = {
  jedaJam: 1000,
};

export default function SystemBar() {
  const [waktu, setWaktu] = useState(null);
  const { pemain, keluar } = usePemain() ?? {};

  useEffect(() => {
    const id = setInterval(() => setWaktu(new Date()), CFG.jedaJam);
    return () => clearInterval(id);
  }, []);

  const tanggal = waktu
    ? waktu.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const jam = waktu
    ? waktu.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    : "--.--";

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-void/70 px-6 py-3 backdrop-blur md:px-10">
      <p className="flex items-center gap-3 font-display text-sm text-snow">
        <span className="h-3 w-2.5 rounded-xs bg-select" aria-hidden="true" />
        Memory Card Adi
      </p>

      <div className="flex items-center gap-4 text-sm text-ice md:gap-6">
        <span className="hidden tabular-nums sm:inline">
          {tanggal} <span className="ml-2">{jam}</span>
        </span>
        {pemain && (
          <span className="hidden md:inline">
            Pemain: <span className="text-select">{pemain.firstName}</span>
          </span>
        )}
        <a
          href={kontak.cv}
          download
          className="rounded-md border border-ice/40 px-4 py-2 text-snow transition-colors hover:border-select hover:text-select focus-visible:outline-2 focus-visible:outline-select"
        >
          Unduh CV
        </a>
        {keluar && (
          <button
            onClick={keluar}
            className="rounded-md px-3 py-2 text-ice transition-colors hover:text-select focus-visible:outline-2 focus-visible:outline-select"
          >
            Keluar
          </button>
        )}
      </div>
    </header>
  );
}
