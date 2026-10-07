import { Router } from 'express';
import { getAllBundles, getBundleById } from '../controllers/bundlesController.js';

const router = Router();

// GET /api/bundles                 -> todos los combos (o ?type=legend-pack)
// GET /api/bundles/:id              -> un combo puntual
router.get('/', getAllBundles);
router.get('/:id', getBundleById);

export default router;
