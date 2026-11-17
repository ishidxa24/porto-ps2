"use client";

import { useState } from "react";
import JudulSection from "./JudulSection";
import { kontak } from "../data/profil";

const tombolUtama =
  "rounded-lg bg-select px-4 py-2 text-sm font-semibold text-deep transition-colors hover:bg-select/90";
const tombolKedua =
  "rounded-lg border border-ice/40 px-4 py-2 text-sm font-semibold text-snow transition-colors hover:border-select hover:text-select";

export default function Contact() {
  const [tersalin, setTersalin] = useState(false);

  function salinEmail() {
    navigator.clipboard.writeText(kontak.email).then(() => {
      setTersalin(true);
      setTimeout(() => setTersalin(false), 2000);
    });
  }

  const daftarKontak = [
    {
      label: "Email",
      isi: kontak.email,
      aksi: (
        <>
          <a href={`mailto:${kontak.email}`} className={tombolUtama}>
            Kirim email
          </a>
          <button onClick={salinEmail} className={tombolKedua}>
            {tersalin ? "Tersalin" : "Salin"}
          </button>
        </>
      ),
    },
    {
      label: "GitHub",
      isi: kontak.github.replace("https://", ""),
      aksi: (
        <a href={kontak.github} target="_blank" rel="noopener noreferrer" className={tombolKedua}>
          Buka GitHub
        </a>
      ),
    },
    {
      label: "CV",
      isi: "CV Muh Adi Kusuma Wiranta (PDF)",
      aksi: (
        <a href={kontak.cv} download className={tombolKedua}>
          Unduh CV
        </a>
      ),
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden px-6 py-28 md:px-20">
      <div className="contact-kabut pointer-events-none absolute -top-40 left-1/2 h-150 w-250 -translate-x-1/2 rounded-full bg-fog/60 blur-[140px]" />

      <div className="relative">
        <JudulSection judul="Contact" />

        <ul className="grid gap-5 md:grid-cols-3">
          {daftarKontak.map((k) => (
            <li key={k.label} className="kontak-kartu flex flex-col rounded-xl border border-ice/20 bg-navy/70 p-7">
              <p className="text-sm text-select">{k.label}</p>
              <p className="kontak-isi mt-3 wrap-anywhere text-lg text-snow">{k.isi}</p>
              <div className="kontak-aksi mt-6 flex flex-wrap gap-3 pt-2 md:mt-auto">{k.aksi}</div>
            </li>
          ))}
        </ul>

        <p aria-live="polite" className="sr-only">
          {tersalin ? "Email tersalin ke clipboard" : ""}
        </p>
      </div>
    </section>
  );
}
