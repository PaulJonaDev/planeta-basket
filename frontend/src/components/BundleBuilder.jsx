import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import { DISCOUNT_TIERS_PREVIEW } from '../constants/discountTiers.js';

export default function BundleBuilder() {
  const [bracelets, setBracelets] = useState([]);
  const [selection, setSelection] = useState({}); // { [productId]: quantity }
  const { addProduct, openDrawer } = useCart();

  useEffect(() => {
    getProducts('pulseras')
      .then(setBracelets)
      .catch(() => setBracelets([]));
  }, []);

  const totalSelected = useMemo(
    () => Object.values(selection).reduce((acc, qty) => acc + qty, 0),
    [selection]
  );

  const currentTier = useMemo(
    () =>
      [...DISCOUNT_TIERS_PREVIEW]
        .sort((a, b) => b.minQuantity - a.minQuantity)
        .find((tier) => totalSelected >= tier.minQuantity),
    [totalSelected]
  );

  const nextTier = useMemo(
    () =>
      DISCOUNT_TIERS_PREVIEW.filter((tier) => tier.minQuantity > totalSelected).sort(
        (a, b) => a.minQuantity - b.minQuantity
      )[0],
    [totalSelected]
  );

  function changeQuantity(id, delta) {
    setSelection((prev) => {
      const nextQty = Math.max((prev[id] || 0) + delta, 0);
      const updated = { ...prev, [id]: nextQty };
      if (nextQty === 0) delete updated[id];
      return updated;
    });
  }

  function handleAddSelectionToCart() {
    bracelets.forEach((bracelet) => {
      const qty = selection[bracelet.id];
      if (qty > 0) addProduct(bracelet, qty);
    });
    setSelection({});
    openDrawer();
  }

  return (
    <section id="arma-tu-pack" className="bg-court-dark/60 py-12 border-y border-court-line">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-extrabold mb-2">Arma tu pack</h2>
        <p className="text-white/60 mb-6">
          Elige tus pulseras favoritas. Entre más agregues, más ahorras.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {bracelets.map((bracelet) => {
            const qty = selection[bracelet.id] || 0;
            return (
              <div key={bracelet.id} className="bg-court-black rounded-xl p-3 flex flex-col gap-2">
                <div className="aspect-square rounded-lg bg-black/40 flex items-center justify-center text-3xl">
                  🏀
                </div>
                <h3 className="text-sm font-bold leading-snug">{bracelet.name}</h3>
                <span className="text-gold font-extrabold text-sm">
                  ${bracelet.price.toLocaleString('es-CO')}
                </span>

                <div className="flex items-center justify-between mt-auto">
                  <button
                    onClick={() => changeQuantity(bracelet.id, -1)}
                    disabled={qty === 0}
                    aria-label={`Quitar una unidad de ${bracelet.name}`}
                    className="w-8 h-8 rounded-full bg-court-dark font-bold disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="font-bold">{qty}</span>
                  <button
                    onClick={() => changeQuantity(bracelet.id, 1)}
                    aria-label={`Agregar una unidad de ${bracelet.name}`}
                    className="w-8 h-8 rounded-full bg-primary font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-court-black rounded-xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-bold">
              {totalSelected} pulsera{totalSelected !== 1 ? 's' : ''} seleccionada
              {totalSelected !== 1 ? 's' : ''}
            </span>
            {currentTier && (
              <span className="text-gold font-extrabold">{currentTier.percent}% OFF</span>
            )}
          </div>

          {nextTier && (
            <p className="text-sm text-white/60">
              Agrega {nextTier.minQuantity - totalSelected} más y desbloquea {nextTier.percent}%
              OFF{nextTier.freeShipping ? ' + envío gratis' : ''}.
            </p>
          )}

          <button
            disabled={totalSelected === 0}
            onClick={handleAddSelectionToCart}
            className="bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-full transition-colors"
          >
            Agregar selección al carrito
          </button>
        </div>
      </div>
    </section>
  );
}
