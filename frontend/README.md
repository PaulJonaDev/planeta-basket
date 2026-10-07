# Planeta Basket — E-commerce

Tienda de accesorios de baloncesto (pulseras de silicona en alto relieve, medias,
mangas, cintas, cordones y llaveros) con lógica de combos y descuento progresivo
por volumen ("Arma tu Pack").

Stack: **React + Tailwind CSS** (frontend) y **Node.js + Express** (backend, API REST).

---

## 1. Estructura de carpetas

```
planeta-basket/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   ├── products.json        # Catálogo de productos individuales
│   │   │   ├── bundles.json         # Combos preconfigurados
│   │   │   └── discountRules.json   # Reglas de descuento por volumen + envío
│   │   ├── utils/
│   │   │   └── loadData.js          # Lector de los JSON de /data
│   │   ├── services/
│   │   │   └── discountEngine.js    # ÚNICA fuente de verdad del cálculo de precios
│   │   ├── controllers/
│   │   │   ├── productsController.js
│   │   │   ├── bundlesController.js
│   │   │   └── cartController.js
│   │   ├── routes/
│   │   │   ├── products.routes.js
│   │   │   ├── bundles.routes.js
│   │   │   └── cart.routes.js
│   │   ├── app.js                   # Configuración de Express (middlewares, rutas, errores)
│   │   └── server.js                # Punto de entrada (arranca el servidor)
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── HeroBanner.jsx
    │   │   ├── BundleBuilder.jsx    # Módulo "Arma tu Pack" / Pick & Mix
    │   │   ├── ProductGrid.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── BundleCard.jsx
    │   │   └── CartDrawer.jsx       # Carrito lateral con barra de envío gratis
    │   ├── context/
    │   │   └── CartContext.jsx      # Estado global del carrito (Context + reducer)
    │   ├── services/
    │   │   └── api.js               # Cliente HTTP hacia el backend
    │   ├── constants/
    │   │   └── discountTiers.js     # Solo para textos de progreso en la UI
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

---

## 2. Reglas de negocio clave (para que no se pierdan al leer solo el código)

- **El descuento por volumen ("Arma tu Pack") solo aplica sobre pulseras sueltas.**
  Un combo (Pack Mamba, Pack Answer, Pack King, Ready to Play) ya tiene su propio
  precio rebajado fijo y **no vuelve a descontarse**. Esto evita apilar descuentos
  sobre descuentos.
- **El descuento se calcula solo sobre el subtotal de esas pulseras sueltas**, nunca
  sobre el total del carrito, para no erosionar el margen de medias, mangas u otros
  productos que el cliente agregue.
- **El combo "Dúo de Cancha" no existe como registro en `bundles.json`.** Es,
  literalmente, el resultado del tier de 2 pulseras del motor de descuentos
  (15% OFF). Se decidió así para no duplicar la misma regla en dos lugares
  distintos (un bundle fijo de "2 pulseras cualquiera" y el tier de Pick & Mix
  serían la misma promesa comercial con dos fuentes de verdad). Si se prefiere
  como bundle fijo con dos SKUs específicos, se agrega en `bundles.json` igual
  que los "packs de leyendas".
- **Toda la lógica de precios vive en el backend** (`discountEngine.js`). El
  frontend solo muestra una tabla de descuentos (`discountTiers.js`) para
  mensajes de progreso ("agrega 1 más y desbloquea 20% OFF"), pero el precio
  final que se cobra siempre viene de `POST /api/cart/calculate`. Esto evita que
  alguien manipule el descuento desde las herramientas de desarrollador del
  navegador.
- **Envío gratis** se activa por dos caminos: (a) el tier de 5 pulseras lo incluye
  automáticamente, o (b) el subtotal después de descuento supera el umbral
  configurado en `discountRules.json` (`freeShippingThreshold`, hoy $150.000 COP).

---

## 3. API REST

| Método | Ruta                    | Descripción                                                |
|--------|-------------------------|-------------------------------------------------------------|
| GET    | `/api/health`           | Chequeo de salud del servicio                               |
| GET    | `/api/products`         | Lista productos (opcional `?category=pulseras`)             |
| GET    | `/api/products/:id`     | Un producto puntual                                          |
| GET    | `/api/bundles`          | Lista combos (opcional `?type=legend-pack`)                  |
| GET    | `/api/bundles/:id`      | Un combo puntual                                              |
| POST   | `/api/cart/calculate`   | Calcula subtotal, descuento por volumen, envío y total       |

**Body de `POST /api/cart/calculate`:**

```json
{
  "items": [
    { "type": "product", "id": "pul-mamba-24", "quantity": 3 },
    { "type": "bundle", "id": "combo-ready-to-play", "quantity": 1 }
  ]
}
```

**Respuesta:**

```json
{
  "items": [ /* ítems enriquecidos con nombre y subtotal de línea */ ],
  "subtotalBeforeDiscount": 90000,
  "braceletDiscount": { "quantity": 5, "percent": 35, "amount": 31500 },
  "discountTotal": 31500,
  "shipping": { "cost": 0, "free": true, "threshold": 150000, "amountToFreeShipping": 0 },
  "total": 58500
}
```

Estos ejemplos ya fueron probados de verdad contra el servidor corriendo
(1, 3 y 5 pulseras sueltas, combo + producto, e ítem inválido → error 400).

---

## 4. Instalación y ejecución

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev        # con recarga automática (nodemon)
# o: npm start      # sin recarga automática
```

El servidor queda escuchando en `http://localhost:4000` (o el `PORT` que definas
en `.env`).

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

La app queda en `http://localhost:5173`. `VITE_API_URL` en `.env` debe apuntar
al backend (por defecto `http://localhost:4000/api`).

Para producción: `npm run build` genera `dist/` (ya verificado que compila sin
errores) y `npm run preview` sirve ese build localmente.

---

## 5. Decisiones de diseño (UI)

- Paleta y mobile-first definidos por el brief: fondo `#0D0D0D` / `#121212`,
  acentos rojo `#E53E3E` y amarillo Lakers `#ECC94B`.
- Tipografía: **Anton** (estilo "camiseta deportiva") para titulares y el número
  gigante del hero; **Inter** para navegación, párrafos y botones. Se evitó el
  típico "eyebrow en mayúsculas + puntos medios" y el truco de "una sola palabra
  acentuada" en el titular — el titular completo usa la tipografía display como
  el momento visual, y el número "24" (pulsera Kobe, el producto estrella) es el
  elemento gráfico principal del hero, anclado en contenido real del catálogo.
- Los íconos de producto son un emoji de balón como placeholder (marcado con
  `TODO` en el código): no hay fotos reales de producto disponibles en este
  entregable.
