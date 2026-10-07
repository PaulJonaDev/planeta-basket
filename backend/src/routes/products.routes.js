import { Router } from 'express';
import { getAllProducts, getProductById } from '../controllers/productsController.js';

const router = Router();

// GET /api/products              -> todos los productos (o ?category=pulseras)
// GET /api/products/:id          -> un producto puntual
router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;
