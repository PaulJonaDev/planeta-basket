import express from 'express';
import cors from 'cors';

import productsRouter from './routes/products.routes.js';
import bundlesRouter from './routes/bundles.routes.js';
import cartRouter from './routes/cart.routes.js';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'planeta-basket-api' });
});

app.use('/api/products', productsRouter);
app.use('/api/bundles', bundlesRouter);
app.use('/api/cart', cartRouter);

// 404 para rutas no definidas
app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// Manejador de errores centralizado
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;
