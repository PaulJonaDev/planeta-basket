export default function HeroBanner() {
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-court-line">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -right-10 -top-10 font-display text-[16rem] sm:text-[20rem] leading-none text-gold/10"
      >
        24
      </span>

      <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-20 flex flex-col gap-5 text-center md:text-left md:max-w-xl">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-wide">
          Pulseras que llevan el número de tu leyenda favorita
        </h1>

        <p className="text-white/70">
          Silicona en alto relieve, trenzados de cordón y combos con descuento progresivo:
          entre más pulseras armes, más bajas el precio.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <a
            href="#pulseras"
            className="bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            Ver pulseras
          </a>
          <a
            href="#arma-tu-pack"
            className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-court-black font-bold px-6 py-3 rounded-full transition-colors"
          >
            Arma tu pack
          </a>
        </div>
      </div>
    </section>
  );
}
