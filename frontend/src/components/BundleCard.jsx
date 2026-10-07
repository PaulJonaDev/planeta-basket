export default function BundleCard({ bundle, onAdd }) {
  const savings = bundle.originalPrice - bundle.price;

  return (
    <div className="bg-court-dark rounded-xl overflow-hidden flex flex-col border border-gold/30">
      <span className="h-1 w-full bg-gold" aria-hidden="true" />

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-primary">Pack de leyenda</span>
          {savings > 0 && (
            <span className="text-xs font-bold text-gold">
              Ahorras ${savings.toLocaleString('es-CO')}
            </span>
          )}
        </div>

        <h3 className="font-extrabold text-lg leading-snug">{bundle.name}</h3>
        <p className="text-sm text-white/60">{bundle.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {bundle.originalPrice > bundle.price && (
              <span className="text-xs text-white/40 line-through">
                ${bundle.originalPrice.toLocaleString('es-CO')}
              </span>
            )}
            <span className="font-extrabold text-gold text-lg">
              ${bundle.price.toLocaleString('es-CO')}
            </span>
          </div>
          <button
            onClick={() => onAdd(bundle)}
            className="bg-primary hover:bg-primary-hover text-white text-sm font-bold px-3 py-2 rounded-full transition-colors"
          >
            Agregar pack
          </button>
        </div>
      </div>
    </div>
  );
}
