"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useEffect, useRef } from "react";
import KartuMemori from "./KartuMemori";
import { namaPendek, peran, daftarSection } from "../data/profil";

gsap.registerPlugin(useGSAP);

const CFG = {
  tinggiItem: 56,
  geserDurasi: 0.45,
  putarKartu: 25,
  putarDurasi: 0.8,
  apungTinggi: 10,
  apungDurasi: 3,
  ledDurasi: 0.7,
};

export default function MenuUtama() {
  const [pilih, setPilih] = useState(0);
  const wadah = useRef(null);
  const indikator = useRef(null);
  const kartu = useRef(null);

  const itemAktif = daftarSection[pilih];

  useGSAP(
    () => {
      gsap.to(".apung", {
        y: -CFG.apungTinggi,
        duration: CFG.apungDurasi,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".led", {
        opacity: 0.2,
        duration: CFG.ledDurasi,
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: wadah },
  );

  useGSAP(
    () => {
      gsap.to(indikator.current, {
        y: pilih * CFG.tinggiItem,
        duration: CFG.geserDurasi,
        ease: "power3.out",
      });

      const arah = pilih % 2 === 0 ? 1 : -1;
      gsap.fromTo(
        kartu.current,
        { rotationY: arah * CFG.putarKartu },
        { rotationY: 0, duration: CFG.putarDurasi, ease: "back.out(1.7)" },
      );
    },
    { dependencies: [pilih], scope: wadah },
  );

  useEffect(() => {
    function tekanTombol(e) {
      if (document.getElementById("bootscreen")) return;
      if (window.scrollY > window.innerHeight / 2) return;

      const jumlah = daftarSection.length;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setPilih((p) => (p + 1) % jumlah);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setPilih((p) => (p - 1 + jumlah) % jumlah);
      }
      if (e.key === "Enter" && !e.target.closest("a, button, input, textarea")) {
        document.getElementById(daftarSection[pilih].id).scrollIntoView({ behavior: "smooth" });
      }
    }

    window.addEventListener("keydown", tekanTombol);
    return () => window.removeEventListener("keydown", tekanTombol);
  }, [pilih]);

  return (
    <section
      id="menu"
      ref={wadah}
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden px-6 md:px-20"
    >
      <div className="pointer-events-none absolute -right-40 bottom-0 h-125 w-200 rounded-full bg-fog/60 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 -bottom-40 h-100 w-150 rounded-full bg-navy/80 blur-[120px]" />

      <div className="relative grid flex-1 items-center gap-12 py-16 md:grid-cols-2">
        <div className="menu-kiri">
          <h1 className="menu-nama font-display text-4xl md:text-6xl">{namaPendek}</h1>
          <p className="menu-peran mt-4 mb-10 text-lg text-ice">{peran}</p>

          <nav aria-label="Menu utama">
            <ul className="relative max-w-md">
              <li
                ref={indikator}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-14 rounded-lg border border-select bg-select/10"
              />
              {daftarSection.map((item, i) => (
                <li key={item.id} className="menu-item">
                  <a
                    href={`#${item.id}`}
                    onMouseEnter={() => setPilih(i)}
                    onFocus={() => setPilih(i)}
                    aria-current={pilih === i ? "true" : undefined}
                    className="relative flex h-14 items-center gap-4 px-4 outline-none"
                  >
                    <span
                      className={`text-xl transition-all duration-300 ${
                        pilih === i ? "translate-x-2 text-select" : "text-snow"
                      }`}
                    >
                      {item.judul}
                    </span>
                    <span
                      className={`text-sm text-ice transition-opacity duration-300 ${
                        pilih === i ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.info}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="menu-kanan flex flex-col items-center">
          <div className="menu-putar perspective-[900px] scale-110 md:scale-125">
            <div className="apung transform-3d">
              <KartuMemori
                label="PORTOFOLIO"
                judul={itemAktif.judul}
                nama="Adi Kusuma"
                judulClass="text-xl font-semibold whitespace-nowrap"
                kartuRef={kartu}
              />
            </div>
          </div>
          <p aria-live="polite" className="mt-14 min-h-12 max-w-xs text-center text-ice">
            {itemAktif.deskripsi}
          </p>
        </div>
      </div>

      <div className="relative hidden gap-8 pb-8 text-sm text-ice md:flex">
        <span>
          <kbd className="mr-2 rounded border border-ice/50 bg-navy/80 px-2 py-0.5 text-xs text-snow">↑↓</kbd>
          Pilih
        </span>
        <span>
          <kbd className="mr-2 rounded border border-ice/50 bg-navy/80 px-2 py-0.5 text-xs text-snow">Enter</kbd>
          Buka
        </span>
        <span>
          <kbd className="mr-2 rounded border border-ice/50 bg-navy/80 px-2 py-0.5 text-xs text-snow">Scroll</kbd>
          Jelajahi semua
        </span>
      </div>
    </section>
  );
}
