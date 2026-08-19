import { useState, useEffect } from 'react';
// @ts-ignore
import meltingChocolateImg from '../images/melting_chocolate_brandname.png';

// High resolution transparent cacao leaf asset
const leafImg = 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80';


export default function AboutUs() {
  const [transparentImg, setTransparentImg] = useState<string>(meltingChocolateImg);
  const [transparentLeaf, setTransparentLeaf] = useState<string>(leafImg);

  useEffect(() => {
    // Process Melting Chocolate Bar Image (Remove Black background)
    const img = new Image();
    img.src = meltingChocolateImg;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const maxColor = Math.max(r, g, b);
        if (maxColor < 32) {
          if (maxColor < 15) {
            data[i + 3] = 0; // 100% Transparent
          } else {
            data[i + 3] = Math.floor(((maxColor - 15) / 17) * 255);
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setTransparentImg(canvas.toDataURL('image/png'));
    };

    // Process Cacao Leaf Image (Remove White / Checkerboard background)
    const lImg = new Image();
    lImg.src = leafImg;
    lImg.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = lImg.width;
      canvas.height = lImg.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(lImg, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const isGreenLeaf = (g > r + 10 && g > b + 10) || (g > 60 && r < 120 && b < 100);
        const minColor = Math.min(r, g, b);
        const maxColor = Math.max(r, g, b);
        const colorDiff = maxColor - minColor;

        if (!isGreenLeaf && (minColor > 145 || colorDiff < 25)) {
          data[i + 3] = 0; // 100% Transparent
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setTransparentLeaf(canvas.toDataURL('image/png'));
    };
  }, []);

  return (
    <section id="story" className="relative bg-[#FAF4EA] text-[#2C140E] overflow-hidden">

      {/* MAIN SECTION CONTENT */}
      <div className="pt-6 sm:pt-10 pb-16 sm:pb-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-start relative">

          {/* LEFT SIDE: Floating Transparent Melting Chocolate Masterpiece */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-start justify-center pt-4 sm:pt-8 lg:pt-12">

            {/* Premium Transparent Melting Chocolate Bar Floating Art */}
            <div className="relative z-30 transform -rotate-3 origin-bottom scale-105 sm:scale-110 hover:rotate-0 transition-transform duration-500 max-w-sm sm:max-w-md lg:max-w-lg translate-x-3 sm:translate-x-6 lg:translate-x-9 lg:translate-y-6">
              <img
                src={transparentImg}
                alt="Perfect Chocolate Artisanal Bar"
                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(40,15,10,0.4)] transform hover:scale-105 transition-transform duration-700 select-none"
              />
            </div>

          </div>

          {/* RIGHT SIDE: Dark Chocolate Box Card with Melt Dripping Liquid Bottom */}
          <div className="lg:col-span-7 relative z-10 lg:-ml-6 mt-4 lg:mt-0">

            {/* Dark Chocolate Box Container */}
            <div className="bg-[#1D0E08] text-[#FAF6EE] pt-5 pb-8 pr-6 sm:pt-7 sm:pb-12 sm:pr-10 lg:pt-8 lg:pb-14 lg:pr-12 pl-16 sm:pl-32 lg:pl-44 rounded-t-3xl shadow-2xl relative z-10 border-t border-l border-r border-[#5A2E20] space-y-4 overflow-visible">

              {/* REALISTIC FLOATING COCOA LEAF CUTOUT AT TOP RIGHT CORNER (100% Transparent PNG) */}
              <div className="absolute -top-10 -right-4 sm:-top-14 sm:-right-8 z-30 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none transform rotate-12 hover:rotate-6 transition-transform duration-700 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.55)]">
                <img 
                  src={transparentLeaf} 
                  alt="Transparent Cacao Leaf Cutout" 
                  className="w-full h-full object-contain select-none"
                />
              </div>

              {/* Big Calligraphic Cursive Title: About Us */}
              <div className="-mt-1 sm:-mt-2">
                <h2 className="font-southing text-5xl sm:text-6xl lg:text-7xl text-[#EAB308] tracking-wide font-normal select-none drop-shadow-md">
                  About Us
                </h2>
              </div>

              {/* 3 Same Consistent Elegant Fancy Serif Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-[#F8EFE4] font-serif font-medium leading-relaxed tracking-wide">
                {/* Paragraph 1 */}
                <p>
                  Perfect Chocolate is a premium chocolate brand dedicated to creating delicious, beautifully crafted chocolates made with quality ingredients and a passion for exceptional taste.
                </p>

                {/* Paragraph 2 */}
                <p>
                  From everyday indulgence to special celebrations and gifting, we create chocolates that bring people together and make every moment a little sweeter.
                </p>

                {/* Paragraph 3 */}
                <p>
                  Our focus is on quality, creativity, freshness, and consistency, ensuring that every Perfect Chocolate delivers a rich and memorable experience.
                </p>
              </div>

              {/* Tagline Highlight */}
              <div className="pt-1">
                <p className="text-gold-300 font-serif italic text-base sm:text-lg border-l-2 border-[#D4AF37]/60 pl-3 py-0.5">
                  Perfect Chocolate — crafted with passion, made to be remembered.
                </p>
              </div>

              {/* Golden Yellow Calligraphic "Read More" Button */}
              <div className="pt-3 flex justify-start pl-0">
                <button className="px-9 py-3 sm:px-11 sm:py-3.5 rounded-xl bg-[#EAB308] hover:bg-[#D9A306] text-[#2C140E] font-southing text-3xl sm:text-4xl font-normal tracking-wide shadow-[0_8px_20px_rgba(234,179,8,0.35)] hover:shadow-[0_12px_28px_rgba(234,179,8,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 group">
                  <span>Read More</span>
                </button>
              </div>

            </div>

            {/* ORGANIC RANDOM CURVED MELTED CHOCOLATE DRIPPING SVG EDGE */}
            <div className="w-full overflow-hidden leading-none relative -mt-1 z-20 pointer-events-none filter drop-shadow-[0_14px_22px_rgba(30,10,5,0.38)]">
              <svg
                viewBox="0 0 1000 240"
                preserveAspectRatio="none"
                className="w-full h-28 sm:h-40 lg:h-52 text-[#1D0E08] fill-current block"
              >
                <path d="M0 0 L1000 0 L1000 30
                         C965 30, 945 90, 915 90 C885 90, 865 30, 820 30
                         C770 30, 730 85, 680 85 C630 85, 600 25, 580 25
                         C570 25, 565 175, 550 180 C538 185, 528 30, 495 30
                         C475 30, 480 155, 450 160 C420 165, 408 35, 370 35
                         C355 35, 350 115, 335 115 C320 115, 308 30, 275 30
                         C255 30, 240 60, 215 60 C190 60, 180 25, 155 25
                         C135 25, 145 200, 110 205 C75 210, 70 30, 45 30
                         C35 30, 30 110, 20 110 C10 110, 5 30, 0 30 Z" />
              </svg>
            </div>

          </div>

        </div>

      </div>

      {/* FLOATING QUICK CONTACT WIDGET (ONLY OFFICIAL WHATSAPP LOGO BUTTON) */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/971505565885"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 group"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          {/* Official WhatsApp Logo SVG */}
          <svg className="w-8 h-8 sm:w-9 sm:h-9 fill-current drop-shadow-sm" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.76.459 3.478 1.333 4.992l-1.417 5.176 5.297-1.389c1.46.797 3.109 1.217 4.777 1.218h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.668-1.038-5.176-2.925-7.063s-4.395-2.924-7.068-2.924zm5.834 14.502c-.247.694-1.229 1.293-1.99 1.368-.521.052-1.202.093-3.488-.853-2.926-1.209-4.808-4.186-4.954-4.38-.146-.194-1.189-1.583-1.189-3.02 0-1.437.752-2.144 1.018-2.436.265-.292.578-.365.772-.365.194 0 .387.001.556.009.178.008.419-.068.656.5.247.597.842 2.057.915 2.204.073.146.121.317.024.511-.097.194-.146.317-.291.486-.146.17-.307.38-.438.51-.146.146-.299.305-.129.597.17.292.757 1.249 1.624 2.022 1.115.993 2.056 1.301 2.348 1.447.292.146.462.122.632-.073.17-.194.729-.851.923-1.143.194-.292.388-.243.656-.146.268.097 1.699.802 1.99 1.447.292.645.292 1.042.045 1.736z" />
          </svg>
        </a>
      </div>

    </section>
  );
}
