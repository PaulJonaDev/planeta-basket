import { loadJSON } from '../utils/loadData.js';

const discountRules = loadJSON('discountRules.json');

function round(value) {
  return Math.round(value);
}

function findCatalogItem(type, id, catalog) {
  const list = type === 'bundle' ? catalog.bundles : catalog.products;
  return list.find((entry) => entry.id === id);
}

// Se ordenan de mayor a menor "minQuantity" para quedarnos con el tier
// más alto que la cantidad de pulseras sueltas alcanza a cubrir.
function findBraceletTier(quantity) {
  return (
    [...discountRules.tiers]
      .sort((a, b) => b.minQuantity - a.minQuantity)
      .find((tier) => quantity >= tier.minQuantity) || null
  );
}

/**
 * Calcula subtotal, descuento por volumen de pulseras y envío para un carrito.
 *
 * Reglas de negocio clave (documentadas aquí porque son el corazón del CRO
 * del sitio, no detalles de implementación):
 *
 * 1. El descuento progresivo ("Arma tu Pack") SOLO aplica sobre pulseras
 *    compradas sueltas (type: "product", category: "pulseras"). Los combos
 *    (packs de leyendas, Ready to Play) ya tienen su propio precio rebajado
 *    fijo y no vuelven a descontarse aquí, para no apilar descuentos.
 * 2. El descuento se calcula solo sobre el subtotal de esas pulseras sueltas,
 *    nunca sobre el total del carrito, para no erosionar el margen de
 *    medias, mangas u otros productos que el cliente agregue.
 * 3. El combo "Dúo de Cancha" (2 pulseras) no existe como bundle en
 *    bundles.json a propósito: es exactamente el resultado del tier de 2
 *    pulseras de este motor. Documentado también en el README.
 */
export function computeCartTotals(items, catalog) {
  const enrichedItems = items.map(({ type, id, quantity }) => {
    if (type !== 'product' && type !== 'bundle') {
      throw new Error(`Tipo de ítem inválido: "${type}". Usa "product" o "bundle".`);
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Cantidad inválida para el ítem "${id}".`);
    }

    const catalogItem = findCatalogItem(type, id, catalog);
    if (!catalogItem) {
      throw new Error(
        `No se encontró el ${type === 'bundle' ? 'combo' : 'producto'} con id "${id}".`
      );
    }

    return {
      type,
      id,
      name: catalogItem.name,
      category: catalogItem.category || null,
      unitPrice: catalogItem.price,
      quantity,
      lineTotal: catalogItem.price * quantity,
    };
  });

  const subtotalBeforeDiscount = round(
    enrichedItems.reduce((acc, item) => acc + item.lineTotal, 0)
  );

  const looseBracelets = enrichedItems.filter(
    (item) => item.type === 'product' && item.category === discountRules.braceletCategory
  );
  const looseBraceletQty = looseBracelets.reduce((acc, item) => acc + item.quantity, 0);
  const looseBraceletSubtotal = looseBracelets.reduce((acc, item) => acc + item.lineTotal, 0);

  const tier = findBraceletTier(looseBraceletQty);
  const braceletDiscountAmount = tier
    ? round((looseBraceletSubtotal * tier.discountPercent) / 100)
    : 0;

  const discountTotal = braceletDiscountAmount;
  const totalAfterDiscount = subtotalBeforeDiscount - discountTotal;

  const qualifiesByTier = Boolean(tier?.freeShipping);
  const qualifiesByAmount = totalAfterDiscount >= discountRules.freeShippingThreshold;
  const freeShipping = qualifiesByTier || qualifiesByAmount;

  const shippingCost = freeShipping ? 0 : discountRules.standardShippingCost;
  const amountToFreeShipping = freeShipping
    ? 0
    : round(discountRules.freeShippingThreshold - totalAfterDiscount);

  const total = round(totalAfterDiscount + shippingCost);

  return {
    items: enrichedItems,
    subtotalBeforeDiscount,
    braceletDiscount: tier
      ? {
          quantity: looseBraceletQty,
          percent: tier.discountPercent,
          amount: braceletDiscountAmount,
        }
      : null,
    discountTotal,
    shipping: {
      cost: shippingCost,
      free: freeShipping,
      threshold: discountRules.freeShippingThreshold,
      amountToFreeShipping,
    },
    total,
  };
}
