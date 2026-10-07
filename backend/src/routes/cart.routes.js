import { Router } from 'express';
import { calculateCart } from '../controllers/cartController.js';

const router = Router();

// POST /api/cart/calculate -> subtotal, descuento por volumen y envío
router.post('/calculate', calculateCart);

export default router;
