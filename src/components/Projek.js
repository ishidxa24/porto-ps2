"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useState, useRef } from "react";
import JudulSection from "./JudulSection";
import { kategoriProjek, daftarProjek } from "../data/projek";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Projek() {
  const [kategori, setKategori] = useState(kategoriProjek[0]);
  const [pilih, setPilih] = useState(0);
  const wadah = useRef(null);

  const isiRak = daftarProjek.filter((p) => p.kategori === kategori);
  const aktif = isiRak[pilih] ?? isiRak[0];
  const jumlah = isiRak.length;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".kaset",
        { y: 120, rotationX: -60, opacity: 0, transformPerspective: 800 },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: wadah.current, start: "top 75%", toggleActions: "restart none restart none" },
        },
      );
    },
    { dependencies: [kategori], scope: wadah, revertOnUpdate: true },
  );

  function gantiKategori(k) {
    setKategori(k);
    setPilih(0);
  }

  function geser(arah) {
    setPilih((p) => (p + arah + jumlah) % jumlah);
  }

  return (
    <section id="projek" ref={wadah} className="scroll-mt-16 overflow-hidden px-6 py-24 md:px-20">
      <JudulSection judul="Projek" keterangan="Proyek yang sudah saya selesaikan." />

      <div role="tablist" aria-label="Jenis projek" className="mb-6 flex flex-wrap gap-2">
        {kategoriProjek.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={kategori === k}
            onClick={() => gantiKategori(k)}
            className={`projek-tab rounded-md border px-4 py-2 text-sm transition-colors ${
              kategori === k
                ? "border-select bg-select/10 text-select"
                : "border-ice/20 bg-navy/60 text-snow hover:border-ice/50"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-x-[10%] bottom-0 h-40 rounded-[50%] bg-electric/25 blur-3xl" />

        <div className="relative flex snap-x items-end justify-start gap-4 overflow-x-auto px-2 pb-10 pt-6 sm:justify-center sm:gap-10">
          {isiRak.map((p, i) => {
            const terpilih = p.id === aktif.id;
            return (
              <div key={p.id} className="kaset shrink-0 snap-center">
                <button
                  onClick={() => setPilih(i)}
                  aria-pressed={terpilih}
                  aria-label={`Pilih proyek ${p.judul}`}
                  className={`relative w-36 overflow-hidden rounded-lg border bg-void text-left transition-all duration-500 sm:w-52 ${
                    terpilih
                      ? "-translate-y-4 border-select shadow-[0_0_40px_rgba(255,210,63,0.35)]"
                      : "border-ice/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-[11px] text-ice">
                    <span className="h-2 w-2 rounded-full border border-ice" aria-hidden="true" />
                    {p.kategori === "Desain Figma" ? "Desain Adi" : "Koleksi Adi"}
                  </span>
                  <span className="flex">
                    <span className="w-2 bg-white/5" aria-hidden="true" />
                    <span className={`relative flex aspect-3/4 flex-1 flex-col justify-end bg-linear-to-b p-4 ${p.warna}`}>
                      {p.sampul && (
                        <>
                          <Image src={p.sampul} alt="" fill sizes="208px" className="object-cover" />
                          <span className="absolute inset-0 bg-linear-to-t from-void via-void/40 to-transparent" />
                        </>
                      )}
                      <span className="relative text-[11px] text-select">{p.label}</span>
                      <span className="relative mt-1 font-display text-lg leading-tight text-snow sm:text-xl">
                        {p.judul}
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="rak-papan relative h-1.5 rounded-full bg-linear-to-r from-transparent via-ice/60 to-transparent" />
      </div>

      <div
        aria-live="polite"
        className="projek-detail mt-14 flex flex-col gap-8 rounded-xl border border-ice/20 bg-navy p-8 md:flex-row md:items-center md:justify-between"
      >
        <div className="max-w-3xl">
          <p className="text-sm text-select">{aktif.label}</p>
          <h3 className="mt-2 font-display text-2xl">{aktif.judul}</h3>
          <p className="mt-4 leading-relaxed text-ice">{aktif.deskripsi}</p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
          {aktif.link && (
            <a
              href={aktif.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-select px-6 py-3 font-semibold text-deep transition-transform hover:-translate-y-0.5"
            >
              {aktif.tombol}
            </a>
          )}
          {jumlah > 1 && (
            <div className="flex items-center gap-2 text-sm text-ice">
              <button
                onClick={() => geser(-1)}
                aria-label="Proyek sebelumnya"
                className="rounded border border-ice/40 px-2 py-0.5 hover:border-select hover:text-select"
              >
                ←
              </button>
              <button
                onClick={() => geser(1)}
                aria-label="Proyek berikutnya"
                className="rounded border border-ice/40 px-2 py-0.5 hover:border-select hover:text-select"
              >
                →
              </button>
              Ganti proyek
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
