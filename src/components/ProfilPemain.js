import Image from "next/image";
import JudulSection from "./JudulSection";
import { perkenalan, lembarKarakter } from "../data/profil";

const POJOK = [
  "left-3 top-3 border-l-2 border-t-2",
  "right-3 top-3 border-r-2 border-t-2",
  "left-3 bottom-3 border-l-2 border-b-2",
  "right-3 bottom-3 border-r-2 border-b-2",
];

export default function ProfilPemain() {
  return (
    <section id="profil" className="scroll-mt-16 bg-deep px-6 py-24 md:px-20">
      <JudulSection judul="Profil Pemain" />

      <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16">
        <div className="profil-foto relative mx-auto aspect-4/5 w-full max-w-sm overflow-hidden rounded-xl border border-ice/30 bg-linear-to-b from-electric to-navy">
          <Image
            src="/foto.jpg"
            alt="Foto Muh Adi Kusuma Wiranta"
            fill
            sizes="(min-width: 768px) 384px, 100vw"
            className="profil-gambar scale-115 object-cover object-top"
            priority={false}
          />
          {POJOK.map((p) => (
            <span key={p} className={`profil-pojok absolute h-7 w-7 border-select ${p}`} />
          ))}
          <span className="profil-label absolute bottom-7 left-7 rounded bg-navy/90 px-3 py-1 text-sm text-select">
            Pemain 1
          </span>
        </div>

        <div>
          <p className="profil-teks text-lg leading-relaxed text-snow">{perkenalan[0]}</p>
          <p className="profil-teks mt-5 leading-relaxed text-ice">{perkenalan[1]}</p>

          <dl className="mt-10">
            {lembarKarakter.map(([label, isi]) => (
              <div key={label} className="profil-baris grid grid-cols-[8rem_1fr] gap-4 border-b border-white/10 py-4">
                <dt className="text-sm text-ice">{label}</dt>
                <dd className="text-snow">{isi}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}