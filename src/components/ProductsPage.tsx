import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
// @ts-ignore
import white2Img from '../images/white2.webp';

export interface CategorySubItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  pillImage: string;
  heroImage: string;
}

export interface CategoryGroup {
  id: 'white' | 'dark' | 'milk' | 'bar' | 'special_box';
  title: string;
  subtitle: string;
  coverDescription: string;
  coverHeroImage: string;
  items: CategorySubItem[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  // 1. WHITE CHOCOLATE (4 SUB-ITEMS)
  {
    id: 'white',
    title: 'White Chocolate',
    subtitle: 'Pure Cocoa Butter & Vanilla Caviar',
    coverDescription: 'Explore 4 exquisite varieties of white chocolate crafted from pure unrefined cocoa butter, real Tahitian vanilla, wild berries, and Sicilian pistachios.',
    coverHeroImage: white2Img,
    items: [
      {
        id: 'white-1',
        title: 'White Chocolate Truffles',
        subtitle: 'Tahitian Vanilla & White Cream Truffles',
        description: 'A selection of exquisitely delicious white chocolate truffles in different shapes, dozens of fillings and choices, lusciously thick cream which creates the sublime taste and wide range of nuts elegantly wrapped in exquisitely colored papers.',
        pillImage: white2Img,
        heroImage: white2Img,
      },
      {
        id: 'white-2',
        title: 'Vanilla Bean White Bar',
        subtitle: 'Pure Cocoa Butter & Madagascar Vanilla',
        description: 'Artisanal white chocolate bar crafted from pure unrefined cocoa butter, studded with real vanilla bean caviar and lightly salted roasted macadamia nuts.',
        pillImage: white2Img,
        heroImage: white2Img,
      },
      {
        id: 'white-3',
        title: 'Raspberry White Velvet',
        subtitle: 'Freeze-Dried Mountain Raspberries',
        description: 'Lush ivory white chocolate infused with tart freeze-dried mountain raspberries for a vibrant balance of rich creaminess and berry sweetness.',
        pillImage: white2Img,
        heroImage: white2Img,
      },
      {
        id: 'white-4',
        title: 'Pistachio White Praline',
        subtitle: 'Sicilian Pistachio Cream & Roasted Flakes',
        description: 'Creamy white chocolate shells filled with roasted Sicilian pistachio cream, toasted pastry crunch, and delicate white cocoa flakes.',
        pillImage: white2Img,
        heroImage: white2Img,
      }
    ]
  },

  // 2. DARK CHOCOLATE (4 SUB-ITEMS)
  {
    id: 'dark',
    title: 'Dark Chocolate',
    subtitle: '70% to 85% Single-Origin Grand Cru Cacao',
    coverDescription: 'Discover 4 master-tier dark chocolate creations made from top-grade Ecuadorian cacao beans with deep roasted plum and vanilla undertones.',
    coverHeroImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
    items: [
      {
        id: 'dark-1',
        title: 'Royal 70% Dark Gold Reserve',
        subtitle: 'Single-Origin Ecuador Cacao & 24K Gold Leaf',
        description: 'Silky smooth dark chocolate crafted from top-grade Ecuadorian cacao beans, finished with hand-applied 24-karat edible gold leaf flakes.',
        pillImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'dark-2',
        title: 'Bourbon Sea Salt Truffles',
        subtitle: 'Madagascar Vanilla & Himalayan Pink Salt',
        description: 'Rich 80% dark ganache rolled in roasted cocoa powder with organic bourbon vanilla and crystalline rose pink sea salt.',
        pillImage: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'dark-3',
        title: 'Midnight 85% Intense Dark',
        subtitle: 'Pure Single-Estate Organic Cacao Nibs',
        description: 'An intense, full-bodied dark chocolate for true cocoa purists, featuring earthy notes and slow-roasted organic cocoa nib crunch.',
        pillImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'dark-4',
        title: 'Dark Roasted Hazelnut Slab',
        subtitle: 'Piedmont Hazelnuts & Dark Cacao',
        description: 'Crunchy oven-roasted Italian hazelnuts embedded in rich 75% dark chocolate for an irresistible artisanal crunch in every slice.',
        pillImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1200&q=80',
      }
    ]
  },

  // 3. MILK CHOCOLATE (4 SUB-ITEMS)
  {
    id: 'milk',
    title: 'Milk Chocolate',
    subtitle: 'Velvety Swiss Milk & Pistachio Cream',
    coverDescription: 'Indulge in 4 creamy milk chocolate selections filled with roasted pistachio cream, golden butter caramel, and toasted hazelnuts.',
    coverHeroImage: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1200&q=80',
    items: [
      {
        id: 'milk-1',
        title: 'Dubai Pistachio & Knafeh Milk',
        subtitle: 'Crispy Knafeh Pastry & Pistachio Cream',
        description: 'Decadent milk chocolate shell filled with lush pistachio cream, toasted knafeh pastry crunch, and a hint of cardamom.',
        pillImage: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'milk-2',
        title: 'Belgian Caramel Milk Delight',
        subtitle: 'Slow-Cooked Golden Butter Caramel',
        description: 'Ultra-creamy Swiss style milk chocolate infused with slow-cooked salted butter caramel and vanilla pod infusion.',
        pillImage: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'milk-3',
        title: 'Creamy Hazelnut Milk Pralines',
        subtitle: 'Roasted Hazelnut Cream & Whole Milk',
        description: 'Velvety milk chocolate domes stuffed with creamy gianduja hazelnut filling and crunchy toasted hazelnut pieces.',
        pillImage: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'milk-4',
        title: 'Milk Honey & Almond Velvet',
        subtitle: 'Wildflower Honey & Roasted Almonds',
        description: 'Smooth milk chocolate infused with organic wildflower honey and crunchy golden almond croquant.',
        pillImage: 'https://images.unsplash.com/photo-1526080652727-5b77f74eacd2?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1200&q=80',
      }
    ]
  },

  // 4. CHOCOLATE BARS (4 SUB-ITEMS)
  {
    id: 'bar',
    title: 'Chocolate Bars',
    subtitle: 'Artisanal Slabs & Crunchy Inclusions',
    coverDescription: 'Explore 4 thick, snappy chocolate slabs folded with whole roasted nuts, sea salt crystals, and gold leaf accents.',
    coverHeroImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=1200&q=80',
    items: [
      {
        id: 'bar-1',
        title: 'Caramelized Hazelnut Dark Bar',
        subtitle: 'Piedmont Hazelnuts & Smoked Caramel',
        description: 'Slow-roasted Italian hazelnuts folded into smooth dark chocolate, drizzled with golden salted caramel.',
        pillImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'bar-2',
        title: 'Toasted Almond & Sea Salt Bar',
        subtitle: 'California Almonds & Himalayan Salt',
        description: 'Handcrafted dark chocolate slab studded with crunchy oven-roasted almonds and fine pink Himalayan sea salt.',
        pillImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'bar-3',
        title: 'Gold Foil Cocoa Artisanal Bar',
        subtitle: 'Single-Estate Cacao & Pure Cocoa Butter',
        description: 'Custom molded luxury cocoa bar wrapped in golden parchment foil with notes of roasted coffee and dark cherry.',
        pillImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'bar-4',
        title: 'White Vanilla Macadamia Bar',
        subtitle: 'Tahitian Vanilla & Macadamia Nuts',
        description: 'Creamy white chocolate bar studded with butter roasted macadamias and Madagascar vanilla caviar.',
        pillImage: 'https://images.unsplash.com/photo-1526080652727-5b77f74eacd2?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1200&q=80',
      }
    ]
  },

  // 5. SPECIAL GIFT BOXES (4 SUB-ITEMS)
  {
    id: 'special_box',
    title: 'Special Gift Boxes',
    subtitle: 'Luxury Keepsake Assortments & Velvet Chests',
    coverDescription: 'Unveil 4 luxury presentation gift chests filled with master-tier truffles, gold-dusted pralines, and signature bars.',
    coverHeroImage: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1200&q=80',
    items: [
      {
        id: 'box-1',
        title: 'Imperial Gold Luxury Gift Box',
        subtitle: '12-Piece Assorted Grand Cru Truffles',
        description: 'Our flagship velvet gift box featuring 12 handcrafted praline creations, finished with gold leaf accents and custom ribbon.',
        pillImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'box-2',
        title: 'Royal Velvet Collector Chest',
        subtitle: '16-Piece Hand-Dipped Ganache Chest',
        description: 'An exquisite wooden keepsake box holding 16 master-tier truffles including Pistachio Velvet, Sea Salt Caramel, and Gold Reserve Dark.',
        pillImage: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'box-3',
        title: 'Artisanal Masterpiece Tasting Chest',
        subtitle: '6 Signature Single-Origin Bars',
        description: 'A curated collection box featuring 6 of our most celebrated bean-to-bar chocolate slabs in an embossed presentation box.',
        pillImage: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'box-4',
        title: 'Celebration Truffle Assortment',
        subtitle: '24 Handcrafted Praline Treasures',
        description: 'The ultimate gift chest filled with 24 signature truffles ranging from white berry velvet to dark sea salt caramel.',
        pillImage: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
        heroImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=80',
      }
    ]
  }
];

interface ProductsPageProps {
  initialCategory?: string;
  onBackToHome: () => void;
  onAddToCart?: (product: any) => void;
}

export default function ProductsPage({ initialCategory = 'all', onBackToHome, onAddToCart }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const activeGroup = CATEGORY_GROUPS.find(grp => grp.id === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-[#2A130A] pt-20 sm:pt-24 pb-0 selection:bg-[#E5A800] selection:text-[#3B170B]">
      
      {/* TOP NAVIGATION HEADER */}
      <div className="bg-white border-b border-[#F0E6D8] py-4">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          
          {selectedCategory === 'all' ? (
            <button 
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-barlow tracking-widest uppercase text-[#C06C54] hover:text-[#2A130A] font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          ) : (
            <button 
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center gap-2 text-xs font-barlow tracking-widest uppercase text-[#C06C54] hover:text-[#2A130A] font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Categories</span>
            </button>
          )}

        </div>
      </div>

      {/* CASE 1: ALL PRODUCTS VIEW - SHOW 5 CATEGORY OVERVIEW CARDS */}
      {selectedCategory === 'all' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
          
          {/* PAGE HEADER */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-barlow tracking-[0.25em] uppercase text-[#C06C54] font-bold">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Perfect Chocolate Collections</span>
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2A130A] tracking-tight">
              All Chocolate Categories
            </h1>

            <p className="text-sm sm:text-base text-[#5A453B] font-sans font-normal max-w-xl mx-auto leading-relaxed">
              Select any category below to explore its 4 dedicated artisanal sub-varieties.
            </p>
          </div>

          {/* 5 CATEGORY OVERVIEW CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
            {CATEGORY_GROUPS.map((grp) => (
              <div
                key={grp.id}
                onClick={() => {
                  setSelectedCategory(grp.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#FAF7F2] rounded-3xl overflow-hidden group hover:-translate-y-2 transition-all duration-500 border border-[#E8DCC4] hover:border-[#C06C54] shadow-md hover:shadow-2xl flex flex-col justify-between cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-white">
                  <img
                    src={grp.coverHeroImage}
                    alt={grp.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <span className="absolute top-4 left-4 bg-white/90 text-[#C06C54] text-[11px] font-barlow font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    {grp.subtitle}
                  </span>

                  <h3 className="absolute bottom-4 left-4 right-4 text-3xl font-serif font-normal text-white drop-shadow-md">
                    {grp.title}
                  </h3>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-[#5A453B] line-clamp-3 leading-relaxed">
                    {grp.coverDescription}
                  </p>

                  <div className="pt-4 border-t border-[#E8DCC4] flex items-center justify-between text-[#C06C54] font-barlow font-bold text-xs uppercase tracking-wider group-hover:text-[#2A130A] transition-colors">
                    <span>Explore 4 Varieties</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* CASE 2: DEDICATED CATEGORY PAGE - SHOW 4 SUB-VARIETY EDITORIAL SECTIONS STACKED WITHOUT BOTTOM GAP */}
      {selectedCategory !== 'all' && activeGroup && (
        <div className="w-full pt-8 sm:pt-12">
          
          {/* CATEGORY TITLE BANNER */}
          <div className="text-center max-w-3xl mx-auto px-4 space-y-2 mb-16 sm:mb-20">
            <span className="text-xs font-barlow uppercase tracking-[0.25em] text-[#C06C54] font-bold">
              {activeGroup.subtitle}
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#C06C54] tracking-tight font-normal">
              {activeGroup.title}
            </h1>
          </div>

          {/* 4 STACKED SUB-VARIETY EDITORIAL SECTIONS */}
          <div className="w-full">
            {activeGroup.items.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={item.id} id={item.id} className="w-full">
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] bg-white">
                    
                    {/* LEFT TEXT + PILL ARTWORK COLUMN */}
                    <div className={`lg:col-span-7 flex flex-col sm:flex-row items-center gap-8 sm:gap-12 px-6 sm:px-12 lg:px-20 py-8 lg:py-0 justify-center bg-white ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}>
                      
                      {/* PILL-CURVED ARTWORK */}
                      <div className={`w-52 sm:w-64 h-80 sm:h-[440px] lg:h-[480px] rounded-t-[130px] rounded-b-[130px] overflow-hidden shadow-xl shrink-0 relative group ${
                        isEven ? 'order-1' : 'order-1 sm:order-2'
                      }`}>
                        <img 
                          src={item.pillImage} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                        />
                      </div>

                      {/* ELEGANT TYPOGRAPHY & DESCRIPTION */}
                      <div className={`space-y-4 text-center sm:text-left max-w-md ${
                        isEven ? 'order-2' : 'order-2 sm:order-1'
                      }`}>
                        <span className="text-xs font-barlow uppercase tracking-[0.2em] text-[#C06C54] font-bold block">
                          {item.subtitle}
                        </span>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#C06C54] tracking-tight font-normal leading-[1.08]">
                          {item.title}
                        </h2>

                        <p className="text-sm sm:text-base text-[#5A453B] font-sans font-normal leading-relaxed">
                          {item.description}
                        </p>

                        {onAddToCart && (
                          <div className="pt-2">
                            <button
                              onClick={() => onAddToCart({
                                id: item.id,
                                name: item.title,
                                price: 1499,
                                image: item.heroImage,
                                cacao: item.subtitle
                              })}
                              className="inline-flex items-center gap-2 bg-[#2A130A] hover:bg-[#C06C54] text-[#FAF6ED] px-6 py-3 rounded-full text-xs font-barlow font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>Add to Bag • ₹1,499</span>
                            </button>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* RIGHT FULL HEIGHT HERO PHOTO COLUMN */}
                    <div className={`lg:col-span-5 flex items-stretch ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}>
                      <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[620px] relative overflow-hidden">
                        <img 
                          src={item.heroImage} 
                          alt={item.title} 
                          className="w-full h-full object-cover select-none absolute inset-0"
                        />
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
