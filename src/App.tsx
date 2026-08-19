import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import ChocolateJourney from './components/ChocolateJourney';
import FeaturedCollection from './components/FeaturedCollection';
import Testimonials from './components/Testimonials';
import StudioModal from './components/StudioModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  cacao: string;
}

export default function App() {
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initial cart sample items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'prod-1',
      name: 'Royal 70% Dark Gold Reserve',
      price: 1499,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
      cacao: '70% Cacao'
    },
    {
      id: 'prod-2',
      name: 'Dubai Pistachio & Knafeh Velvet',
      price: 1799,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
      cacao: '55% Milk Cacao'
    }
  ]);

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          cacao: product.cacao,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQty = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  return (
    <div className="min-h-screen bg-[#1C0D07] text-[#FAF6ED] font-body flex flex-col selection:bg-gold-500 selection:text-cocoa-950">
      {/* Minimal Navigation Header */}
      <Navbar />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreClick={() => {
            const section = document.getElementById('story');
            section?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* About Us Section */}
        <AboutUs />

        {/* 5-Step Bean to Bar Artisanal Journey Section */}
        <ChocolateJourney />

        {/* Featured Products Showcase */}
        <FeaturedCollection onAddToCart={handleAddToCart} />

        {/* Testimonials Section (Theobroma Styled with 2 Chocolates) */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive 3D Studio Modal */}
      <StudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQty={handleUpdateQty}
      />
    </div>
  );
}
