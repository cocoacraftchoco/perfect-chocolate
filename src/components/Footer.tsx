import { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, ShieldCheck, Sparkles, Heart } from 'lucide-react';
// @ts-ignore
import logoImg from '../images/logo perfect bg.png';

export default function Footer() {
  const [transparentLogo, setTransparentLogo] = useState<string>(logoImg);

  useEffect(() => {
    // Process Official Logo (Preserve inner white text "- CHOCOLATE -" while removing outer checkerboard background)
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
    <footer className="relative bg-[#1D0E08] text-[#F8EFE4] overflow-hidden pt-16 pb-12 font-body border-t border-[#D4AF37]/20">
      
      {/* Ambient Gold Radial Glow Backlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#8A4E33]/15 rounded-full filter blur-[100px] pointer-events-none" />

      {/* FOOTER CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* COLUMN 1: BIG LOGO WITH BADGES UNDER IT (LEFT) + DESCRIPTION (RIGHT) */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
            
            {/* Big Brand Logo & Badges Directly Under Logo */}
            <div className="shrink-0 flex flex-col items-center sm:items-start gap-2">
              <a href="#home" className="group hover:scale-105 transition-transform duration-300">
                <img 
                  src={transparentLogo} 
                  alt="Perfect Chocolate Official Brand Logo" 
                  className="h-28 sm:h-36 lg:h-44 w-auto object-contain select-none"
                />
              </a>

              {/* Quality Badges Directly Under Logo */}
              <div className="flex flex-row items-center justify-center sm:justify-start gap-4 text-xs text-[#EAB308] font-barlow pt-1">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> 100% Organic Cacao</span>
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#D4AF37]" /> 24K Edible Gold</span>
              </div>
            </div>

            {/* Right-side Description & Tagline */}
            <div className="space-y-3 flex-1">
              <p className="font-southing text-[#EAB308] text-2xl sm:text-3xl tracking-wide opacity-95">
                premium quality guaranteed
              </p>

              <p className="text-xs sm:text-sm text-[#D8C2B0] font-sans font-light leading-relaxed">
                Established in 2026, Perfect Chocolate Co. is dedicated to crafting artisanal single-origin chocolates, combining traditional European bean-to-bar mastery with Dubai's finest luxury ingredients.
              </p>
            </div>

          </div>

          {/* COLUMN 2: Factory Contact Info */}
          <div className="md:col-span-3 lg:col-span-3 space-y-5">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#EAB308] tracking-wide border-b border-[#D4AF37]/30 pb-2">
              FACTORY
            </h3>

            <div className="space-y-4 text-xs sm:text-sm font-barlow">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#3D1E15] border border-[#D4AF37]/40 text-[#EAB308] shrink-0 mt-0.5 shadow-md">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#EAB308] font-bold">PHONE</div>
                  <div className="text-[#F8EFE4] font-mono">+1 (800) 555-2626</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#3D1E15] border border-[#D4AF37]/40 text-[#EAB308] shrink-0 mt-0.5 shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#EAB308] font-bold">OUR LOCATION:</div>
                  <div className="text-[#D8C2B0] leading-snug">
                    742 Imperial Avenue, Bldg No. 4, Grand Cocoa Estate, NY 10022
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#3D1E15] border border-[#D4AF37]/40 text-[#EAB308] shrink-0 mt-0.5 shadow-md">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#EAB308] font-bold">EMAIL:</div>
                  <a href="mailto:factory@perfectchocolate.com" className="text-[#F8EFE4] hover:text-[#EAB308] transition-colors">
                    factory@perfectchocolate.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: About / Atelier Contact Info */}
          <div className="md:col-span-3 lg:col-span-3 space-y-5">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#EAB308] tracking-wide border-b border-[#D4AF37]/30 pb-2">
              ABOUT
            </h3>

            <div className="space-y-4 text-xs sm:text-sm font-barlow">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#3D1E15] border border-[#D4AF37]/40 text-[#EAB308] shrink-0 mt-0.5 shadow-md">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#EAB308] font-bold">PHONE</div>
                  <div className="text-[#F8EFE4] font-mono">+1 (800) 888-4949</div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#3D1E15] border border-[#D4AF37]/40 text-[#EAB308] shrink-0 mt-0.5 shadow-md">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#EAB308] font-bold">OUR LOCATION:</div>
                  <div className="text-[#D8C2B0] leading-snug">
                    Queen Zain Alsharaf Street, Fifth Avenue Atelier, Manhattan, NY
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#3D1E15] border border-[#D4AF37]/40 text-[#EAB308] shrink-0 mt-0.5 shadow-md">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-[#EAB308] font-bold">EMAIL:</div>
                  <a href="mailto:info@perfectchocolate.com" className="text-[#F8EFE4] hover:text-[#EAB308] transition-colors">
                    info@perfectchocolate.com
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* COPYRIGHT BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D8C2B0] font-barlow gap-4">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Perfect Chocolate Co. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#EAB308] fill-current inline" />
          </div>
          <div className="flex space-x-6 text-[#D8C2B0]">
            <a href="#privacy" className="hover:text-[#EAB308] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#EAB308] transition-colors">Terms & Conditions</a>
            <a href="#coldchain" className="hover:text-[#EAB308] transition-colors">Cold-Chain Express</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
