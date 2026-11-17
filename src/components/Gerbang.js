"use client";

import gsap from "gsap";
import { createContext, useContext, useEffect, useState } from "react";
import LoginPemain from "./LoginPemain";

const CFG = {
  api: "https://dummyjson.com",
  kunciToken: "token-pemain",
  masukDurasi: 1,
  masukSkalaAwal: 1.15,
};

const PemainContext = createContext(null);

export function usePemain() {
  return useContext(PemainContext);
}

export default function Gerbang({ children }) {
  const [status, setStatus] = useState("cek");
  const [pemain, setPemain] = useState(null);
  const [baruMasuk, setBaruMasuk] = useState(false);

  useEffect(() => {
    async function cekToken() {
      const token = localStorage.getItem(CFG.kunciToken);
      if (!token) {
        setStatus("keluar");
        return;
      }

      try {
        const res = await fetch(`${CFG.api}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Ditolak server: ${res.status}`);
        setPemain(await res.json());
        setStatus("masuk");
      } catch {
        localStorage.removeItem(CFG.kunciToken);
        setStatus("keluar");
      }
    }

    cekToken();
  }, []);

  useEffect(() => {
    if (status !== "masuk" || !baruMasuk) return;

    window.scrollTo(0, 0);
    gsap.fromTo(
      "#konten",
      { scale: CFG.masukSkalaAwal, opacity: 0, transformOrigin: `50% ${window.innerHeight / 2}px` },
      {
        scale: 1,
        opacity: 1,
        duration: CFG.masukDurasi,
        ease: "power3.out",
        clearProps: "all",
        onComplete: () => window.dispatchEvent(new Event("halaman-siap")),
      },
    );
  }, [status, baruMasuk]);

  function berhasilMasuk(data) {
    localStorage.setItem(CFG.kunciToken, data.accessToken);
    setPemain(data);
    setBaruMasuk(true);
    setStatus("masuk");
  }

  function keluar() {
    localStorage.removeItem(CFG.kunciToken);
    setPemain(null);
    setBaruMasuk(false);
    setStatus("keluar");
    window.scrollTo(0, 0);
  }

  if (status === "cek") return null;
  if (status === "keluar") return <LoginPemain onBerhasil={berhasilMasuk} />;

  return <PemainContext value={{ pemain, keluar }}>{children}</PemainContext>;
}
