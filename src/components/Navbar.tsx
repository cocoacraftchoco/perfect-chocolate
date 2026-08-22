import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
// @ts-ignore
import logoImg from '../images/logo perfect bg.png';

interface NavbarProps {
  onSelectCategory: (catId: string) => void;
  onNavigateHome: (sectionId?: string) => void;
}

export default function Navbar({ onSelectCategory, onNavigateHome }: NavbarProps) {
  const [transparentLogo, setTransparentLogo] = useState<string>(logoImg);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    const processImage = () => {
      if (!img.width || !img.height) return;
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;

      // Flood-fill outer background ONLY from 4 borders to preserve inner white text "- CHOCOLATE -"
      const visited = new Uint8Array(w * h);
      const queue = new Int32Array(w * h * 2);
      let qHead = 0;
      let qTail = 0;

      for (let x = 0; x < w; x++) {
        queue[qTail++] = x; queue[qTail++] = 0;
        queue[qTail++] = x; queue[qTail++] = h - 1;
      }
      for (let y = 0; y < h; y++) {
        queue[qTail++] = 0; queue[qTail++] = y;
        queue[qTail++] = w - 1; queue[qTail++] = y;
      }

      while (qHead < qTail) {
        const x = queue[qHead++];
        const y = queue[qHead++];

        if (x < 0 || x >= w || y < 0 || y >= h) continue;
        const idx = y * w + x;
        if (visited[idx]) continue;
        visited[idx] = 1;

        const p = idx * 4;
        const r = data[p];
        const g = data[p + 1];
        const b = data[p + 2];

        const minColor = Math.min(r, g, b);
        const maxColor = Math.max(r, g, b);
        const colorDiff = maxColor - minColor;

        // Check if pixel is outer white or checkerboard background
        if ((minColor > 140 && colorDiff < 35) || (r > 180 && g > 180 && b > 180)) {
          data[p + 3] = 0; // Make outer background transparent

          if (x > 0) { queue[qTail++] = x - 1; queue[qTail++] = y; }
          if (x < w - 1) { queue[qTail++] = x + 1; queue[qTail++] = y; }
          if (y > 0) { queue[qTail++] = x; queue[qTail++] = y - 1; }
          if (y < h - 1) { queue[qTail++] = x; queue[qTail++] = y + 1; }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setTransparentLogo(canvas.toDataURL('image/png'));
    };

    img.onload = processImage;
    img.src = logoImg;
    if (img.complete) {
      processImage();
    }
  }, []);

  const dropdownCategories = [
    { id: 'all', label: 'All Products' },
    { id: 'dark', label: 'Dark Chocolate' },
    { id: 'white', label: 'White Chocolate' },
    { id: 'milk', label: 'Milk Chocolate' },
    { id: 'bar', label: 'Chocolate Bars' },
    { id: 'special_box', label: 'Special Box' },
  ];

  const handleCategoryClick = (catId: string) => {
    setIsDropdownOpen(false);
    onSelectCategory(catId);
  };

  return (
    <>
      {/* ONLY TOP GAP ABOVE NAVBAR (TOP-0 TO TOP-4) GETS BLURRED WHEN CONTENT GOES ABOVE NAVBAR */}
      <div className="fixed top-0 left-0 right-0 h-4 z-40 backdrop-blur-md pointer-events-none transition-all duration-300" />

      {/* FLOATING BROWN CAPSULE NAVBAR */}
      <header className="fixed top-4 left-0 right-0 z-50 px-[2%] lg:px-[10%] pointer-events-none transition-all duration-300">
        <div className="w-full bg-[#2A130A]/95 border border-[#D4AF37]/50 rounded-full shadow-[0_14px_40px_rgba(0,0,0,0.75)] py-3.5 sm:py-4 px-6 sm:px-12 relative flex items-center justify-between pointer-events-auto">
          
          {/* LEFT NAVIGATION LINKS: HOME, ABOUT US, PRODUCTS WITH DROPDOWN */}
          <div className="flex items-center space-x-5 sm:space-x-10">
            <button 
              onClick={() => onNavigateHome('home')}
              className="text-sm font-barlow uppercase tracking-[0.2em] text-[#EAB308] font-bold hover:text-white transition-colors relative group py-1 cursor-pointer bg-transparent border-none"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </button>

            <button 
              onClick={() => onNavigateHome('story')}
              className="text-sm font-barlow uppercase tracking-[0.2em] text-[#EAB308] font-bold hover:text-white transition-colors relative group py-1 cursor-pointer bg-transparent border-none"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </button>

            {/* PRODUCTS DROPDOWN WRAPPER WITH CONTINUOUS HOVER AREA */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="text-sm font-barlow uppercase tracking-[0.2em] text-[#EAB308] font-bold hover:text-white transition-colors relative group py-1 flex items-center gap-1.5 cursor-pointer bg-transparent border-none"
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 text-[#EAB308] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </button>

              {/* HIGH-CONTRAST DROPDOWN MENU */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-[100] animate-fadeIn">
                  <div className="w-60 bg-[#180B06] border-2 border-[#D4AF37]/60 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] py-2.5 px-2">
                    {dropdownCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-serif italic text-[#F8EFE4] hover:text-[#180B06] hover:bg-[#EAB308] font-medium transition-all duration-200 flex items-center justify-between group cursor-pointer"
                      >
                        <span>{cat.label}</span>
                        <span className="text-xs font-sans opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CENTER: OFFICIAL BRAND LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-center">
            <button 
              onClick={() => onNavigateHome('home')} 
              className="flex items-center justify-center group py-1 hover:scale-105 transition-transform duration-300 cursor-pointer bg-transparent border-none"
            >
              <img 
                src={transparentLogo} 
                alt="Perfect Chocolate Official Brand Logo" 
                className="h-12 sm:h-14 lg:h-16 w-auto object-contain transition-all duration-500 select-none"
              />
            </button>
          </div>

          {/* RIGHT NAVIGATION LINK: CONTACT US */}
          <div className="flex items-center">
            <button 
              onClick={() => onNavigateHome('contact')}
              className="text-sm font-barlow uppercase tracking-[0.2em] text-[#EAB308] font-bold hover:text-white transition-colors relative group py-1 cursor-pointer bg-transparent border-none"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </button>
          </div>

        </div>
      </header>
    </>
  );
}
