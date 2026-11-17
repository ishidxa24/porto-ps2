"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrollToPlugin);

const CFG = {
  mulai: "top 75%",
  ulang: "restart none restart none",
  judulDurasi: 0.9,
  judulJeda: 0.03,
  pojokDurasi: 0.5,
  barisJeda: 0.08,
  ketikJeda: 0.025,
  menuMiring: 25,
  kembaliDurasi: 1.2,
};

export default function AnimasiScroll() {
  useGSAP(() => {
    const hitungUlang = () => ScrollTrigger.refresh();
    window.addEventListener("halaman-siap", hitungUlang);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray(".anim-judul").forEach((judul) => {
        const pecah = SplitText.create(judul, { type: "chars", mask: "chars" });
        gsap.set(pecah.masks, { paddingTop: "0.15em", marginTop: "-0.15em", paddingBottom: "0.25em", marginBottom: "-0.25em" });
        gsap.from(pecah.chars, {
          yPercent: 110,
          duration: CFG.judulDurasi,
          stagger: CFG.judulJeda,
          ease: "power4.out",
          scrollTrigger: { trigger: judul, start: "top 85%", toggleActions: CFG.ulang },
        });
      });

      gsap.utils.toArray(".anim-muncul").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: CFG.ulang },
        });
      });

      const keluarMenu = { trigger: "#menu", start: "top top", end: "bottom top", scrub: true };
      gsap.to(".menu-kanan", { yPercent: -25, rotationX: CFG.menuMiring, transformPerspective: 900, opacity: 0.2, ease: "none", scrollTrigger: keluarMenu });
      gsap.to(".menu-kiri", { yPercent: -12, ease: "none", scrollTrigger: keluarMenu });

      const profil = gsap.timeline({ scrollTrigger: { trigger: "#profil", start: CFG.mulai, toggleActions: CFG.ulang } });
      profil
        .from(".profil-foto", { clipPath: "inset(100% 0% 0% 0%)", duration: 1, ease: "power3.inOut" })
        .from(".profil-pojok", { scale: 2.5, opacity: 0, duration: CFG.pojokDurasi, stagger: 0.08, ease: "back.out(2)" }, "-=0.3")
        .from(".profil-label", { x: -20, opacity: 0, duration: 0.4 }, "<")
        .from(".profil-teks", { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 }, 0.2)
        .from(".profil-baris", { opacity: 0, x: 30, duration: 0.5, stagger: CFG.barisJeda }, 0.5);

      gsap.fromTo(
        ".profil-gambar",
        { yPercent: -6 },
        { yPercent: 6, ease: "none", scrollTrigger: { trigger: "#profil", start: "top bottom", end: "bottom top", scrub: true } },
      );

      const inventori = gsap.timeline({ scrollTrigger: { trigger: "#inventori", start: CFG.mulai, toggleActions: CFG.ulang } });
      inventori
        .from(".inv-tab", { y: -12, opacity: 0, duration: 0.4, stagger: 0.06 })
        .from(".inv-detail", { x: 60, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.3);

      const pengalaman = gsap.timeline({ scrollTrigger: { trigger: "#pengalaman", start: CFG.mulai, toggleActions: CFG.ulang } });
      pengalaman
        .from(".slot", { x: -40, opacity: 0, duration: 0.6, stagger: CFG.barisJeda, ease: "power3.out" })
        .from(".slot-detail", { x: 60, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.2);

      const projek = gsap.timeline({ scrollTrigger: { trigger: "#projek", start: CFG.mulai, toggleActions: CFG.ulang } });
      projek
        .from(".projek-tab", { y: -12, opacity: 0, duration: 0.4, stagger: 0.06 })
        .from(".rak-papan", { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, "-=0.2")
        .from(".projek-detail", { y: 40, opacity: 0, duration: 0.6 }, "-=0.3");

      const contact = gsap.timeline({ scrollTrigger: { trigger: "#contact", start: CFG.mulai, toggleActions: CFG.ulang } });
      contact.from(".kontak-kartu", { y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" });

      gsap.utils.toArray(".kontak-isi").forEach((isi, i) => {
        const huruf = SplitText.create(isi, { type: "chars" });
        contact.from(huruf.chars, { opacity: 0, duration: 0.01, stagger: CFG.ketikJeda }, 0.4 + i * 0.15);
      });

      contact.from(".kontak-aksi", { y: 12, opacity: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" }, "-=0.4");

      function sambutMenu() {
        const sambut = gsap.timeline();
        sambut
          .fromTo(".menu-putar", { rotationY: -360 }, { rotationY: 0, transformPerspective: 900, duration: 1.1, ease: "power3.out" })
          .from(".menu-nama, .menu-peran", { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 }, 0)
          .from(".menu-item", { opacity: 0, x: -30, duration: 0.4, stagger: 0.07, ease: "power2.out" }, 0.15);

        document.querySelector('#menu a[aria-current="true"]')?.focus({ preventScroll: true });
      }

      function klikKeMenu(e) {
        const link = e.target.closest('a[href="#menu"]');
        if (!link) return;
        e.preventDefault();
        gsap.to(window, { scrollTo: 0, duration: CFG.kembaliDurasi, ease: "power3.inOut", onComplete: sambutMenu });
      }

      document.addEventListener("click", klikKeMenu);

      gsap.to(".contact-kabut", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: "#contact", start: "top bottom", end: "bottom top", scrub: true },
      });

      return () => document.removeEventListener("click", klikKeMenu);
    });

    return () => window.removeEventListener("halaman-siap", hitungUlang);
  });

  return null;
}
