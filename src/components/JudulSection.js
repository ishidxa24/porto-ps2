export default function JudulSection({ judul, keterangan, tengah = false }) {
  return (
    <header className={`mb-12 ${tengah ? "text-center" : ""}`}>
      <p className="anim-muncul text-sm text-ice">
        <a href="#menu" className="hover:text-select">
          Menu utama
        </a>{" "}
        / {judul}
      </p>
      <h2 className="anim-judul mt-3 font-display text-4xl md:text-5xl">{judul}</h2>
      {keterangan && <p className="anim-muncul mt-4 text-ice">{keterangan}</p>}
    </header>
  );
}
