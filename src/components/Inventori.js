"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useRef } from "react";
import JudulSection from "./JudulSection";
import { kategoriInventori, daftarItem, jumlahSlot } from "../data/inventori";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Inventori() {
  const [kategori, setKategori] = useState("Front-End");
  const isiKategori = daftarItem.filter((item) => item.kategori === kategori);
  const [pilihId, setPilihId] = useState("js");

  const itemAktif = isiKategori.find((item) => item.id === pilihId) ?? isiKategori[0];
  const jumlahKosong = Math.max(0, jumlahSlot - isiKategori.length);

  const wadah = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".inv-slot",
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.25,
          ease: "back.out(1.7)",
          stagger: { each: 0.05, from: "center", grid: "auto" },
          scrollTrigger: { trigger: wadah.current, start: "top 75%", toggleActions: "restart none restart none" },
        },
      );
    },
    { dependencies: [kategori], scope: wadah, revertOnUpdate: true },
  );

  function gantiKategori(k) {
    setKategori(k);
    const pertama = daftarItem.find((item) => item.kategori === k);
    if (pertama) setPilihId(pertama.id);
  }

  return (
    <section id="inventori" ref={wadah} className="scroll-mt-16 px-6 py-24 md:px-20">
      <JudulSection judul="Inventori" />

      <div role="tablist" aria-label="Kategori inventori" className="mb-10 flex flex-wrap gap-2">
        {kategoriInventori.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={kategori === k}
            onClick={() => gantiKategori(k)}
            className={`inv-tab rounded-md border px-4 py-2 text-sm transition-colors ${
              kategori === k
                ? "border-select bg-select/10 text-select"
                : "border-ice/20 bg-navy/60 text-snow hover:border-ice/50"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {isiKategori.map((item) => {
            const aktif = item.id === itemAktif?.id;
            return (
              <button
                key={item.id}
                onClick={() => setPilihId(item.id)}
                onMouseEnter={() => setPilihId(item.id)}
                aria-pressed={aktif}
                className={`inv-slot flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border p-2 transition-colors ${
                  aktif ? "border-select bg-select/10" : "border-ice/20 bg-navy hover:border-ice/50"
                }`}
              >
                <span className={`font-display text-xl ${aktif ? "text-select" : "text-snow"}`}>{item.singkat}</span>
                <span className="text-center text-xs text-ice">{item.nama}</span>
              </button>
            );
          })}
          {Array.from({ length: jumlahKosong }).map((_, i) => (
            <div key={i} aria-hidden="true" className="inv-slot aspect-square rounded-lg border border-dashed border-white/15" />
          ))}
        </div>

        {itemAktif && (
          <div aria-live="polite" className="inv-detail rounded-xl border border-ice/20 bg-navy p-8">
            <p className="font-display text-5xl text-select">{itemAktif.singkat}</p>
            <h3 className="mt-6 font-display text-2xl">{itemAktif.nama}</h3>
            <p className="mt-4 leading-relaxed text-ice">{itemAktif.deskripsi}</p>
            <p className="mt-6 text-sm text-ice">Dipakai di</p>
            <ul className="mt-2 space-y-1">
              {itemAktif.dipakai.map((d) => (
                <li key={d} className="text-snow">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-10 text-sm text-ice">Slot kosong akan terisi seiring saya terus belajar.</p>
    </section>
  );
}
