import { useState, useEffect } from 'react';
// @ts-ignore
import logoImg from '../images/logo perfect bg.png';

export default function Navbar() {
  const [transparentLogo, setTransparentLogo] = useState<string>(logoImg);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'py-2 sm:py-3 bg-[#0E0503]/90 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg' 
        : 'pt-4 pb-2 sm:pt-5 sm:pb-3 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative flex items-center justify-between">
        
        {/* LEFT TAB: HOME */}
        <div className="flex items-center">
          <a 
            href="#home" 
            className="text-xs font-barlow uppercase tracking-[0.2em] text-[#EAB308] font-bold hover:text-gold-300 transition-colors relative group py-1 drop-shadow-md"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        {/* CENTER: OFFICIAL BRAND LOGO IMAGE (100% Transparent PNG without white background box) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-center">
          <a href="#home" className="flex items-center justify-center group py-1 hover:scale-105 transition-transform duration-300">
            <img 
              src={transparentLogo} 
              alt="Perfect Chocolate Official Brand Logo" 
              className={`w-auto object-contain transition-all duration-500 select-none ${
                isScrolled ? 'h-10 sm:h-12 lg:h-14' : 'h-14 sm:h-16 lg:h-18'
              }`}
            />
          </a>
        </div>

        {/* RIGHT TAB: ABOUT US */}
        <div className="flex items-center">
          <a 
            href="#story" 
            className="text-xs font-barlow uppercase tracking-[0.2em] text-[#EAB308] font-bold hover:text-gold-300 transition-colors relative group py-1 drop-shadow-md"
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
          </a>
        </div>

      </div>
    </header>
  );
}
