import { nama } from "../data/profil";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-6 text-sm text-ice sm:flex-row md:px-20">
      <a href="#menu" className="hover:text-select">
        <kbd className="mr-2 rounded border border-ice/50 bg-navy/80 px-2 py-0.5 text-xs text-snow">↑</kbd>
        Kembali ke menu utama
      </a>
      <p>© 2026 {nama}</p>
    </footer>
  );
}
