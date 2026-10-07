import { CartProvider } from './context/CartContext.jsx';
import Header from './components/Header.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import BundleBuilder from './components/BundleBuilder.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import CartDrawer from './components/CartDrawer.jsx';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-court-black text-white font-sans">
        <Header />
        <main>
          <HeroBanner />
          <BundleBuilder />
          <ProductGrid />
        </main>
        <CartDrawer />
      </div>
    </CartProvider>
  );
}