import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Pulseras', href: '#pulseras' },
  { label: 'Arma tu pack', href: '#arma-tu-pack' },
  { label: 'Combos', href: '#combos' },
];

export default function Header() {
  const { totalItems, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-court-black/95 backdrop-blur border-b border-court-line">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
       
        <a href="#inicio" className="flex items-center gap-2.5">
          <img 
            src={logo} 
            alt="PlanetaBasket" 
            className="h-10 w-auto md:h-11 object-contain"
          />
          <span className="font-display text-xl tracking-wide hidden sm:inline">
            PLANETA <span className="text-gold">BASKET</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-gold transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openDrawer}
            aria-label="Abrir carrito"
            className="relative p-2 rounded-full hover:bg-court-dark transition-colors"
          >
            <span aria-hidden="true">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-full hover:bg-court-dark transition-colors"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden flex flex-col px-4 pb-3 text-sm font-semibold">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-court-line last:border-b-0 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}