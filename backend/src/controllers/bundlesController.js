import { loadJSON } from '../utils/loadData.js';

const bundles = loadJSON('bundles.json');

export function getAllBundles(req, res) {
  const { type } = req.query;
  const filtered = type ? bundles.filter((b) => b.type === type) : bundles;
  res.status(200).json(filtered);
}

export function getBundleById(req, res) {
  const bundle = bundles.find((b) => b.id === req.params.id);
  if (!bundle) {
    return res.status(404).json({ error: `Combo no encontrado: ${req.params.id}` });
  }
  res.status(200).json(bundle);
}
