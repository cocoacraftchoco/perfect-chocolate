import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import TaglineBanner from './components/TaglineBanner';
import ChocolateJourney from './components/ChocolateJourney';
import FeaturedCollection from './components/FeaturedCollection';
import Testimonials from './components/Testimonials';
import StudioModal from './components/StudioModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  cacao: string;
}

export default function App() {
  const [view, setView] = useState<'home' | 'products'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
          price: product.price || 1499,
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

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = (sectionId?: string) => {
    setView('home');
    if (sectionId) {
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#1C0D07] text-[#FAF6ED] font-body flex flex-col selection:bg-gold-500 selection:text-cocoa-950">
      {/* Navigation Header */}
      <Navbar 
        onSelectCategory={handleSelectCategory}
        onNavigateHome={handleNavigateHome}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {view === 'products' ? (
          <ProductsPage 
            initialCategory={selectedCategory}
            onBackToHome={() => handleNavigateHome('home')}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <>
            {/* Hero Section */}
            <HeroSection
              onExploreClick={() => {
                const section = document.getElementById('story');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* About Us Section */}
            <AboutUs />

            {/* Tagline Banner Section */}
            <TaglineBanner />

            {/* 5-Step Bean to Bar Artisanal Journey Section */}
            <ChocolateJourney />

            {/* Featured Products Showcase */}
            <FeaturedCollection onAddToCart={handleAddToCart} />

            {/* Testimonials Section */}
            <Testimonials />
          </>
        )}
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
