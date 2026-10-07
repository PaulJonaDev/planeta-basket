import React from 'react';
import { PRODUCTS } from '../constants/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductGrid() {
  const { addToCart } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 uppercase tracking-wider">
        Colección <span className="text-red-500">NBA Wristbands</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {PRODUCTS.map((product) => (
          <div 
            key={product.id} 
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between hover:border-red-500 transition-all duration-300 group shadow-lg"
          >
            <div className="w-full h-44 bg-neutral-950 rounded-lg flex items-center justify-center p-2 mb-4 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-white font-bold text-base md:text-lg leading-snug my-1">
                  {product.name}
                </h3>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-red-500 font-extrabold text-lg md:text-xl">
                  ${product.price.toLocaleString('es-CO')}
                </span>
                <button 
                  onClick={() => addToCart(product)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-lg text-sm transition-colors active:scale-95"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}