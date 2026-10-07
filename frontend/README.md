# 🏀 Planeta Basket - E-Commerce

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite Badge"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge"/>
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge"/>
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express Badge"/>
</p>

Plataforma e-commerce optimizada para la comercialización de accesorios de baloncesto (pulseras de silicona en alto relieve de leyendas NBA, pulseras trenzadas tipo cordón, mangas de compresión y medias). Diseñada bajo una estrategia de **Conversion Rate Optimization (CRO)** basada en compras por volumen (*Pick & Mix*) y combos de alto valor percibido.

---

## 🚀 Características Clave

- 🛒 **Carrito Lateral Deslizable (Cart Drawer):** Estado global gestionado mediante React Context API con actualización interactiva de cantidades y cálculo automático de subtotal.
- 📦 **Módulo de Descuentos Progresivos ("Pick & Mix"):** Algoritmo de incentivo por volumen (15% OFF en 2 unidades, 20% OFF en 3 unidades y 35% OFF + Envío Gratis en 5 unidades).
- 🎨 **Estética Urbana Dark Mode:** Interfaz optimizada *Mobile-First* con paleta de colores de alto contraste inspirada en la cultura *streetball* y NBA.
- ⚡ **Carga Ultrarrápida:** Arquitectura frontend construida sobre Vite y assets estáticos optimizados.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Uso en el Proyecto |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | Componentización modular de la interfaz y renderizado optimizado |
| **Estilos** | Tailwind CSS | Sistema de diseño responsivo y maquetación de componentes |
| **Estado Global** | React Context API | Persistencia y gestión centralizada del carrito de compras |
| **Backend** | Node.js + Express | API REST para gestión del catálogo y cálculo de reglas de negocio |
| **Control de Versiones** | Git / GitHub | Control de ramas y despliegue del código fuente |

---

## 📂 Estructura del Proyecto

```text
planeta-basket/
├── backend/                  # Servidor de API REST (Node.js + Express)
│   ├── controllers/          # Lógica de controladores de la API
│   ├── routes/               # Enrutamiento de endpoints
│   └── server.js             # Punto de entrada del servidor
│
└── frontend/                 # Aplicación Cliente (React + Vite)
    ├── public/               # Assets estáticos y fotos de productos (/nba_bull.png, etc.)
    ├── src/
    │   ├── components/       # Componentes de la interfaz
    │   │   ├── Header.jsx
    │   │   ├── HeroBanner.jsx
    │   │   ├── BundleBuilder.jsx
    │   │   ├── ProductGrid.jsx
    │   │   └── CartDrawer.jsx
    │   ├── constants/        # Archivos de datos estáticos
    │   │   └── products.js
    │   ├── context/          # Estado global del carrito
    │   │   └── CartContext.jsx
    │   ├── App.jsx           # Componente principal
    │   └── main.jsx          # Renderizado inicial de React
    ├── package.json
    └── vite.config.js