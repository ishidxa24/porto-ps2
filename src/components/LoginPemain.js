"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef } from "react";
import KartuMemori from "./KartuMemori";

gsap.registerPlugin(useGSAP);

const CFG = {
  api: "https://dummyjson.com/user/login",
  akunUji: { username: "emilys", password: "emilyspass" },
  zoomSkala: 8,
  zoomDurasi: 0.9,
};

const kelasInput =
  "mt-2 w-full rounded-lg border border-ice/30 bg-void/60 px-4 py-3 text-snow outline-none transition-colors placeholder:text-ice/40 focus:border-select";

export default function LoginPemain({ onBerhasil }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lihatSandi, setLihatSandi] = useState(false);
  const [memuat, setMemuat] = useState(false);
  const [pesanError, setPesanError] = useState("");
  const wadah = useRef(null);

  useGSAP(
    () => {
      gsap.to(".led", { opacity: 0.2, duration: 0.7, repeat: -1, yoyo: true });
      gsap.to(".login-apung", { y: -10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.from(".login-baris", { y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" });
    },
    { scope: wadah },
  );

  function isiAkunUji() {
    setUsername(CFG.akunUji.username);
    setPassword(CFG.akunUji.password);
    setPesanError("");
  }

  async function masuk(e) {
    e.preventDefault();
    setPesanError("");

    if (!username || !password) {
      setPesanError("Isi username dan password dulu.");
      return;
    }

    setMemuat(true);

    try {
      const res = await fetch(CFG.api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setPesanError(
          data.message === "Invalid credentials"
            ? "Username atau password salah. Coba lagi."
            : `Login ditolak: ${data.message ?? res.status}`,
        );
        setMemuat(false);
        return;
      }

      gsap
        .timeline({ onComplete: () => onBerhasil(data) })
        .to(".login-form", { x: -40, opacity: 0, duration: 0.4 })
        .to(".login-kartu", { scale: CFG.zoomSkala, opacity: 0, duration: CFG.zoomDurasi, ease: "power3.in" }, "<0.1");
    } catch {
      setPesanError("Tidak bisa terhubung ke server. Cek koneksi internet, lalu coba lagi.");
      setMemuat(false);
    }
  }

  return (
    <section
      id="login"
      ref={wadah}
      className="relative flex min-h-svh items-center overflow-hidden bg-void px-6 py-16 md:px-20"
    >
      <div className="pointer-events-none absolute -right-40 bottom-0 h-125 w-200 rounded-full bg-fog/60 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-100 w-150 rounded-full bg-navy/80 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-14 md:grid-cols-2">
        <div className="login-kartu flex justify-center perspective-[900px]">
          <div className="login-apung transform-3d scale-110 md:scale-125">
            <KartuMemori label="LOGIN" judul={username || "Pemain ?"} nama="Masukkan data pemain" judulClass="text-xl font-semibold truncate" />
          </div>
        </div>

        <form onSubmit={masuk} noValidate className="login-form">
          <p className="login-baris text-sm text-ice">Memory Card Adi</p>
          <h1 className="login-baris mt-3 font-display text-3xl md:text-4xl">Masuk sebagai pemain</h1>
          <p className="login-baris mt-4 text-ice">Website ini baru bisa dibuka setelah login.</p>

          <label className="login-baris mt-8 block text-sm text-ice">
            Username
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="emilys"
              className={kelasInput}
            />
          </label>

          <label className="login-baris mt-5 block text-sm text-ice">
            Password
            <span className="relative block">
              <input
                type={lihatSandi ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`${kelasInput} pr-20`}
              />
              <button
                type="button"
                onClick={() => setLihatSandi((v) => !v)}
                className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-xs text-ice hover:text-select"
              >
                {lihatSandi ? "Sembunyikan" : "Lihat"}
              </button>
            </span>
          </label>

          <p aria-live="polite" className="login-baris mt-4 min-h-6 text-sm text-select">
            {pesanError}
          </p>

          <button
            type="submit"
            disabled={memuat}
            className="login-baris mt-2 w-full rounded-lg bg-select py-3 font-semibold text-deep transition-colors hover:bg-select/90 disabled:cursor-wait disabled:opacity-70"
          >
            {memuat ? "Membaca memory card…" : "Masuk"}
          </button>

          <div className="login-baris mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-ice/30 px-4 py-3 text-sm text-ice">
            <span>
              Akun uji: <span className="text-snow">emilys</span> / <span className="text-snow">emilyspass</span>
            </span>
            <button type="button" onClick={isiAkunUji} className="text-select hover:underline">
              Isi otomatis
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
