import { useState } from 'react';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  cacao: string;
  tag: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Royal 70% Dark Gold Reserve',
    subtitle: 'Single Origin Ecuador Cacao & 24K Edible Gold Leaf',
    price: 1499,
    cacao: '70% Cacao',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviews: 142,
    description: 'Silky smooth dark chocolate crafted from top-grade Ecuadorian cacao beans, finished with hand-applied 24-karat gold leaf flakes.'
  },
  {
    id: 'prod-2',
    name: 'Dubai Pistachio & Knafeh Velvet',
    subtitle: 'Roasted Pistachio Cream & Crispy Knafeh Threads',
    price: 1799,
    cacao: '55% Milk Cacao',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 98,
    description: 'Decadent milk chocolate shell filled with lush pistachio cream, toasted knafeh pastry crunch, and a hint of cardamom.'
  },
  {
    id: 'prod-3',
    name: 'Bourbon Vanilla Sea Salt Truffles',
    subtitle: 'Madagascar Vanilla Bean & Himalayan Pink Salt',
    price: 1999,
    cacao: '80% Dark Cacao',
    tag: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviews: 76,
    description: 'Rich dark ganache rolled in roasted cocoa powder with organic bourbon vanilla and crystalline sea salt.'
  },
  {
    id: 'prod-4',
    name: 'Caramelized Roasted Hazelnut Slab',
    subtitle: 'Piedmont Hazelnuts & Smoked Salt Caramel',
    price: 1699,
    cacao: '65% Dark Cacao',
    tag: 'Signature',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 64,
    description: 'Slow-roasted Italian hazelnuts folded into smooth dark chocolate, drizzled with golden salted caramel.'
  }
];

interface FeaturedCollectionProps {
  onAddToCart: (product: Product) => void;
}

export default function FeaturedCollection({ onAddToCart }: FeaturedCollectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="dark-cocoa" className="py-20 lg:py-28 bg-[#1D0E08] relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="type-large-title text-gold-400 text-3xl sm:text-4xl block">
            The Masterpiece Series
          </span>
          <h2 className="type-h3-64 text-cream-100 font-bold tracking-tight">
            Artisanal Chocolate Creations
          </h2>
          <p className="type-large-body-18 font-light text-cocoa-200">
            Each bar is single-origin, hand-molded by our master chocolatiers, and encased in luxury velvet gold foil.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="cocoa-glass-panel rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between border border-gold-500/20 hover:border-gold-500/50 shadow-2xl"
            >
              {/* Product Image Container */}
              <div className="relative h-64 overflow-hidden bg-cocoa-950">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />

                {/* Floating Tag */}
                <span className="absolute top-3 left-3 bg-cocoa-950/90 text-gold-300 text-[10px] uppercase font-barlow tracking-widest px-2.5 py-1 rounded-full border border-gold-500/40 backdrop-blur-md">
                  {prod.tag}
                </span>

                <span className="absolute top-3 right-3 bg-gold-500/20 text-gold-300 text-[10px] font-mono font-semibold px-2 py-0.5 rounded border border-gold-500/30 backdrop-blur-md">
                  {prod.cacao}
                </span>

                {/* Quick View Overlay Button */}
                <div className="absolute inset-0 bg-cocoa-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="p-3 bg-cocoa-900/90 text-gold-300 rounded-full hover:bg-gold-500 hover:text-cocoa-950 transition-colors shadow-lg border border-gold-500/40"
                    title="Quick Inspection"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleAdd(prod)}
                    className="p-3 bg-gold-500 text-cocoa-950 rounded-full hover:bg-gold-400 transition-colors shadow-gold-glow"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-gold-400 text-xs mb-1.5">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span className="font-semibold">{prod.rating}</span>
                    <span className="text-cocoa-400">({prod.reviews} reviews)</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-cream-100 group-hover:text-gold-300 transition-colors line-clamp-1">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-cocoa-300 font-body line-clamp-2 mt-1 font-light">
                    {prod.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-cocoa-800/60">
                  <div className="text-xl font-bold font-heading text-gold-metallic">
                    ₹{prod.price.toLocaleString('en-IN')}
                  </div>

                  <button
                    onClick={() => handleAdd(prod)}
                    className={`px-4 py-2 rounded-xl text-xs font-barlow tracking-wider uppercase font-semibold transition-all duration-300 flex items-center gap-1.5 ${addedIds[prod.id]
                        ? 'bg-emerald-600 text-white'
                        : 'bg-cocoa-800/80 text-gold-300 hover:bg-gold-500 hover:text-cocoa-950 border border-gold-500/30 shadow-md'
                      }`}
                  >
                    {addedIds[prod.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa-950/80 backdrop-blur-md animate-fadeIn">
          <div className="cocoa-glass-panel max-w-lg w-full rounded-2xl overflow-hidden border border-gold-500/40 p-6 space-y-4 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-cocoa-300 hover:text-gold-400 text-lg font-bold"
            >
              ✕
            </button>
            <div className="h-56 rounded-xl overflow-hidden">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-2">
              <span className="text-gold-400 text-xs font-mono">{selectedProduct.cacao}</span>
              <h3 className="type-h3-64 text-cream-100">{selectedProduct.name}</h3>
              <p className="text-cocoa-200 text-sm">{selectedProduct.description}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-cocoa-800">
              <span className="text-2xl font-heading text-gold-metallic">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
              <button
                onClick={() => { handleAdd(selectedProduct); setSelectedProduct(null); }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-cocoa-950 font-bold uppercase text-xs tracking-wider"
              >
                Add to Luxury Order
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
