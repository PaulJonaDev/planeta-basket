import { loadJSON } from '../utils/loadData.js';
import { computeCartTotals } from '../services/discountEngine.js';

const catalog = {
  products: loadJSON('products.json'),
  bundles: loadJSON('bundles.json'),
};

export function calculateCart(req, res) {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error:
        'El body debe incluir "items" como un arreglo no vacío: ' +
        '{ items: [{ type: "product"|"bundle", id, quantity }] }',
    });
  }

  try {
    const result = computeCartTotals(items, catalog);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
