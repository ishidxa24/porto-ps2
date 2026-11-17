const TEBAL = [
  { z: -12, warna: "bg-[#050608]" },
  { z: -8, warna: "bg-[#08090C]" },
  { z: -4, warna: "bg-[#0C0D11]" },
];

export default function KartuMemori({
  label,
  judul,
  nama,
  judulClass = "font-display text-3xl",
  kartuRef,
  kilauRef,
}) {
  return (
    <div ref={kartuRef} className="kartu relative w-50 h-65 transform-3d">
      {TEBAL.map((t) => (
        <div
          key={t.z}
          className={`bentuk-kartu absolute inset-0 rounded-2xl ${t.warna}`}
          style={{ transform: `translateZ(${t.z}px)` }}
        />
      ))}

      <div className="bentuk-kartu absolute inset-0 rounded-2xl bg-casing border border-white/10">
        <span className="absolute left-4 top-4 font-display text-xs tracking-[0.2em] text-ice">
          AK
        </span>
        <span className="led absolute right-6 top-10 h-2 w-2 rounded-full bg-electric" />

        <div className="absolute inset-x-4 top-14 h-30 overflow-hidden rounded-md bg-snow px-3.5 pt-3 text-deep">
          <p className="text-[11px] tracking-[0.25em] text-fog">{label}</p>
          <p className={`${judulClass} leading-tight mt-1`}>{judul}</p>
          <p className="text-xs text-navy mt-1">{nama}</p>
          <div className="absolute inset-x-0 bottom-0 h-2.5 bg-electric" />
          <div className="absolute left-0 bottom-0 h-2.5 w-2/5 bg-select" />
        </div>

        <div className="absolute inset-x-8 bottom-5 flex flex-col gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className="h-0.75 rounded-full bg-white/10" />
          ))}
        </div>
      </div>

      <div
        ref={kilauRef}
        className="bentuk-kartu pointer-events-none absolute inset-0 rounded-2xl"
      />
    </div>
  );
}
