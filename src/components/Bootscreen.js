"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useEffect, useRef } from "react";
import KartuMemori from "./KartuMemori";

gsap.registerPlugin(useGSAP);

const CFG = {
  logoDurasi: 1.5,
  logoSkalaAwal: 0.8,
  kedipDurasi: 0.8,
  kedipRedup: 0.3,
  kedipJeda: 1.5,
  keluarDurasi: 0.3,
  haloDurasi: 2,
  subjudulDurasi: 1.2,
  subjudulJeda: 0.6,
  kabutDurasi: 14,
  kabutGeser: 100,
  kabutSkala: 0.05,
  jumlahPartikel: 30,
  kelipDurasi: 1.5,

  kartuMasukDurasi: 1.6,
  kartuPutarAwal: -160,
  apungTinggi: 12,
  apungAyun: 15,
  apungDurasi: 3,
  miringMaks: 30,
  miringRespon: 0.6,
  ledDurasi: 0.7,

  pudarDurasi: 0.4,
  luruskanDurasi: 0.4,
  zoomSkala: 10,
  zoomDurasi: 1,
  kontenSkalaAwal: 1.15,
  kontenDurasi: 1,
};

const KABUT = [
  { kiri: "-7%", atas: "9%", lebar: 600, tinggi: 300, warna: "bg-navy/80" },
  { kiri: "70%", atas: "20%", lebar: 500, tinggi: 400, warna: "bg-electric/18" },
  { kiri: "20.8%", atas: "69%", lebar: 700, tinggi: 380, warna: "bg-electric/38" },
  { kiri: "47%", atas: "57%", lebar: 1000, tinggi: 600, warna: "bg-fog/70" },
  { kiri: "-13.8%", atas: "46%", lebar: 900, tinggi: 520, warna: "bg-fog/90" },
];

export default function Bootscreen() {
  const [tampil, setTampil] = useState(true);
  const wadah = useRef(null);
  const kartu = useRef(null);
  const kilau = useRef(null);
  const keluar = useRef(false);

  useGSAP(
    () => {
      gsap.to(".kabut", {
        x: `random(-${CFG.kabutGeser}, ${CFG.kabutGeser})`,
        y: `random(-${CFG.kabutGeser}, ${CFG.kabutGeser})`,
        scale: `random(${1 - CFG.kabutSkala}, ${1 + CFG.kabutSkala})`,
        duration: CFG.kabutDurasi,
        delay: "random(0, 3)",
        repeat: -1,
        repeatRefresh: true,
        ease: "sine.inOut",
      });

      gsap.to(".partikel", {
        opacity: 0.15,
        duration: CFG.kelipDurasi,
        delay: "random(0, 3)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.from(".halo", {
        opacity: 0,
        scale: 0.5,
        duration: CFG.haloDurasi,
        ease: "power2.out",
      });

      gsap.set(".apung", { rotationY: -CFG.apungAyun });

      const masuk = gsap.timeline();
      masuk.from(".panggung", {
        opacity: 0,
        duration: CFG.kartuMasukDurasi * 0.6,
      });
      masuk.from(
        ".apung",
        {
          rotationY: CFG.kartuPutarAwal,
          y: 80,
          duration: CFG.kartuMasukDurasi,
          ease: "power3.out",
        },
        "<",
      );
      masuk.to(".apung", {
        rotationY: CFG.apungAyun,
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
        ease: "sine.inOut",
      });

      const putarX = gsap.quickTo(kartu.current, "rotationX", {
        duration: CFG.miringRespon,
        ease: "power3.out",
      });
      const putarY = gsap.quickTo(kartu.current, "rotationY", {
        duration: CFG.miringRespon,
        ease: "power3.out",
      });

      function gerakMouse(e) {
        if (keluar.current) return;

        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        putarY(x * CFG.miringMaks);
        putarX(-y * CFG.miringMaks);

        kilau.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(169,196,255,0.25), transparent 55%)`;
      }

      window.addEventListener("mousemove", gerakMouse);

      gsap.from(".logo", {
        opacity: 0,
        scale: CFG.logoSkalaAwal,
        duration: CFG.logoDurasi,
      });

      gsap.from(".subjudul", {
        opacity: 0,
        letterSpacing: "1.2em",
        duration: CFG.subjudulDurasi,
        delay: CFG.subjudulJeda,
        ease: "power3.out",
      });

      gsap.to(".petunjuk", {
        opacity: CFG.kedipRedup,
        duration: CFG.kedipDurasi,
        repeat: -1,
        yoyo: true,
        delay: CFG.kedipJeda,
      });

      return () => window.removeEventListener("mousemove", gerakMouse);
    },
    { scope: wadah },
  );

  function tutup() {
    if (keluar.current) return;
    keluar.current = true;

    const konten = document.getElementById("konten");
    gsap.killTweensOf(".apung");
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setTampil(false);
        window.dispatchEvent(new Event("halaman-siap"));
      },
    });

    tl.to([".logo", ".subjudul", ".petunjuk", ".halo"], {
      opacity: 0,
      duration: CFG.pudarDurasi,
    });
    tl.to(".apung", { rotationY: 0, y: 0, duration: CFG.luruskanDurasi, ease: "power2.out" }, "<");
    tl.to(kartu.current, { rotationX: 0, rotationY: 0, duration: CFG.luruskanDurasi, ease: "power2.out" }, "<");

    tl.to(".panggung", {
      scale: CFG.zoomSkala,
      duration: CFG.zoomDurasi,
      ease: "power3.in",
    });

    tl.to(wadah.current, { opacity: 0, duration: CFG.keluarDurasi }, `-=${CFG.keluarDurasi}`);

    if (konten) tl.fromTo(
      konten,
      {
        scale: CFG.kontenSkalaAwal,
        opacity: 0,
        transformOrigin: `50% ${window.innerHeight / 2}px`,
      },
      {
        scale: 1,
        opacity: 1,
        duration: CFG.kontenDurasi,
        ease: "power3.out",
        clearProps: "all",
      },
      "<",
    );
  }

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);

    document.body.style.overflow = "hidden";

    function tekanTombol(e) {
      if (e.key === "Enter") tutup();
    }
    window.addEventListener("keydown", tekanTombol);
    return () => {
      window.removeEventListener("keydown", tekanTombol);
      document.body.style.overflow = "";
    };
  }, []);

  if (!tampil) return null;

  return (
    <div
      ref={wadah}
      onClick={tutup}
      id="bootscreen"
      className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center bg-void"
    >
      {KABUT.map((k, i) => (
        <div
          key={i}
          className={`kabut absolute rounded-full blur-[120px] will-change-transform ${k.warna}`}
          style={{ left: k.kiri, top: k.atas, width: k.lebar, height: k.tinggi }}
        />
      ))}

      {Array.from({ length: CFG.jumlahPartikel }).map((_, i) => (
        <span
          key={i}
          className="partikel absolute w-0.5 h-0.5 rounded-full bg-ice"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
        />
      ))}

      <div className="halo absolute w-72 h-72 rounded-full bg-electric/40 blur-3xl" />

      <div className="panggung relative mb-10 perspective-[900px]">
        <div className="apung transform-3d cursor-pointer">
          <KartuMemori
            label="PORTOFOLIO"
            judul="S2B6"
            nama="Adi Kusuma"
            kartuRef={kartu}
            kilauRef={kilau}
          />
        </div>
      </div>

      <h1 className="logo font-display text-7xl relative">AK</h1>
      <p className="subjudul relative text-sm text-ice tracking-[0.4em] mb-10">memory card</p>
      <p className="petunjuk text-ice relative">
        Tekan{" "}
        <kbd className="mx-1 rounded border border-ice/50 bg-navy/80 px-2 py-0.5 text-xs font-semibold text-snow">
          Enter
        </kbd>{" "}
        untuk mulai
      </p>

      <div className="scanline pointer-events-none absolute inset-0" />
    </div>
  );
}