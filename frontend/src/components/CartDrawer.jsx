import React from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function CartDrawer() {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    updateQuantity, 
    removeFromCart, 
    subtotal 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-neutral-900 text-white h-full flex flex-col justify-between p-6 shadow-2xl border-l border-neutral-800">
        
        {/* Header Carrito */}
        <div className="flex justify-between items-center pb-4 border-b border-neutral-800">
          <h2 className="text-xl font-bold uppercase tracking-wide">Tu Carrito Planeta Basket</h2>
          <button 
            onClick={toggleCart} 
            className="text-neutral-400 hover:text-white font-bold text-xl"
          >
            ✕
          </button>
        </div>

        {/* Lista de Ítems */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-neutral-400 py-10">Tu carrito está vacío 🏀</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <p className="text-red-500 font-semibold text-xs">${item.price.toLocaleString('es-CO')}</p>
                  
                  {/* Botones de Cantidad */}
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="bg-neutral-800 px-2 rounded text-sm hover:bg-neutral-700"
                    >-</button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="bg-neutral-800 px-2 rounded text-sm hover:bg-neutral-700"
                    >+</button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-neutral-500 hover:text-red-500 text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer y Checkout */}
        <div className="pt-4 border-t border-neutral-800">
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Subtotal:</span>
            <span className="text-red-500">${subtotal.toLocaleString('es-CO')}</span>
          </div>
          <button 
            disabled={cartItems.length === 0}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-3 rounded-xl uppercase tracking-wider transition-colors"
          >
            Proceder al Pago
          </button>
        </div>

      </div>
    </div>
  );
}