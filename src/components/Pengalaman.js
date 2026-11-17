"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import JudulSection from "./JudulSection";
import { daftarPengalaman } from "../data/pengalaman";

function IkonKartu() {
  return (
    <span className="relative block h-5 w-4 rounded-sm border-2 border-snow" aria-hidden="true">
      <span className="absolute inset-x-0.5 bottom-0.5 h-1.5 rounded-[1px] bg-snow" />
    </span>
  );
}

export default function Pengalaman() {
  const [pilih, setPilih] = useState(0);
  const aktif = daftarPengalaman[pilih];
  const jendela = useRef(null);

  function bukaSertifikat() {
    jendela.current.showModal();
  }

  function tutupSertifikat() {
    jendela.current.close();
  }

  function klikLatar(e) {
    if (e.target === jendela.current) tutupSertifikat();
  }

  return (
    <section id="pengalaman" className="scroll-mt-16 bg-deep px-6 py-24 md:px-20">
      <JudulSection
        judul="Pengalaman"
        keterangan={`${daftarPengalaman.length} data tersimpan. Yang terbaru di paling atas.`}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <ul className="space-y-3">
          {daftarPengalaman.map((p, i) => {
            const terpilih = i === pilih;
            return (
              <li key={p.id} className="slot">
                <button
                  onClick={() => setPilih(i)}
                  onMouseEnter={() => setPilih(i)}
                  aria-pressed={terpilih}
                  className={`flex w-full items-center gap-4 rounded-lg border p-3 text-left transition-colors ${
                    terpilih ? "border-select bg-white/5" : "border-ice/20 bg-navy hover:border-ice/50"
                  }`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-linear-to-br from-electric to-navy">
                    <IkonKartu />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-semibold ${terpilih ? "text-select" : "text-snow"}`}>{p.judul}</span>
                    <span className="block text-xs text-ice">{p.waktu}</span>
                  </span>
                  <span className="shrink-0 text-xs text-ice">{p.durasi}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-live="polite" className="slot-detail self-start rounded-xl border border-ice/20 bg-navy p-8">
          <div className="flex items-center gap-5">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-linear-to-br from-select to-electric">
              <IkonKartu />
            </span>
            <div>
              <h3 className="font-display text-xl md:text-2xl">{aktif.judul}</h3>
              <p className="mt-1 text-sm text-ice">Disimpan {aktif.waktu}</p>
            </div>
          </div>

          <dl className="mt-8">
            {aktif.detail.map(([label, isi]) => (
              <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-white/10 py-3">
                <dt className="text-sm text-ice">{label}</dt>
                <dd className={label === "Hasil" ? "text-select" : "text-snow"}>{isi}</dd>
              </div>
            ))}
          </dl>

          {aktif.catatan && <p className="mt-6 text-sm leading-relaxed text-ice">{aktif.catatan}</p>}

          {aktif.sertifikat.length > 0 && (
            <button
              onClick={bukaSertifikat}
              className="mt-6 rounded-lg border border-select px-5 py-2.5 text-sm font-semibold text-select transition-colors hover:bg-select hover:text-deep"
            >
              Lihat sertifikat
            </button>
          )}
        </div>
      </div>

      <dialog
        ref={jendela}
        onClick={klikLatar}
        aria-label={`Sertifikat ${aktif.judul}`}
        className="m-auto max-h-[90vh] w-[min(92vw,960px)] overflow-y-auto rounded-xl border border-ice/30 bg-deep p-0 text-snow backdrop:bg-void/85 backdrop:backdrop-blur-sm"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-deep px-5 py-3">
          <p className="font-semibold">Sertifikat: {aktif.judul}</p>
          <button
            onClick={tutupSertifikat}
            className="rounded border border-ice/40 px-3 py-1 text-sm hover:border-select hover:text-select"
          >
            Tutup
          </button>
        </div>
        <div className="space-y-4 p-4">
          {aktif.sertifikat.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              width={s.lebar}
              height={s.tinggi}
              alt={`Sertifikat ${aktif.judul}, halaman ${i + 1}`}
              sizes="(min-width: 1000px) 928px, 90vw"
              className="h-auto w-full rounded-md"
            />
          ))}
        </div>
      </dialog>
    </section>
  );
}
