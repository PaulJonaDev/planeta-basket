import { loadJSON } from '../utils/loadData.js';

const products = loadJSON('products.json');

export function getAllProducts(req, res) {
  const { category } = req.query;
  const filtered = category ? products.filter((p) => p.category === category) : products;
  res.status(200).json(filtered);
}

export function getProductById(req, res) {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: `Producto no encontrado: ${req.params.id}` });
  }
  res.status(200).json(product);
}
