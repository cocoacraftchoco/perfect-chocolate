import { useState, useEffect } from 'react';
// @ts-ignore
import meltingChocolateImg from '../images/melting_chocolate_brandname.png';
// @ts-ignore
import aboutBgImg from '../images/about_bg.webp';

export default function AboutUs() {
  const [transparentImg, setTransparentImg] = useState<string>(meltingChocolateImg);

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
      const imgData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r < 30 && g < 30 && b < 30) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setTransparentImg(canvas.toDataURL('image/png'));
    };
  }, []);

  return (
    <section id="story" className="bg-[#FAF6EE] pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 relative overflow-visible select-none border-t border-b border-[#E8DCC4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-0 lg:gap-0">
          
          {/* LEFT COLUMN: Melting Chocolate Bar Graphic */}
          <div className="lg:col-span-5 relative z-30 flex justify-center lg:justify-start lg:-translate-x-2 xl:translate-x-0 -translate-y-4 sm:-translate-y-6 lg:-translate-y-8">
            <div className="w-96 sm:w-[520px] lg:w-[680px] xl:w-[740px] transition-transform duration-700 hover:scale-105 filter drop-shadow-[0_28px_50px_rgba(20,5,0,0.6)]">
              <img 
                src={transparentImg} 
                alt="Perfect Chocolate Handcrafted Bar with Splash" 
                className="w-full h-auto object-contain select-none transform lg:scale-120 xl:scale-125 origin-left"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: About Us Card Overlaying Content on top of about_bg.webp */}
          <div className="lg:col-span-7 relative z-10 lg:-ml-12 mt-4 lg:mt-0">

            {/* Container Card with about_bg.webp Background Image */}
            <div className="relative text-[#FAF6EE] pt-6 pb-24 sm:pt-8 sm:pb-28 lg:pt-10 lg:pb-36 pr-6 sm:pr-10 lg:pr-12 pl-16 sm:pl-32 lg:pl-44 z-10 overflow-visible">
              
              {/* Background Image Asset: about_bg.webp */}
              <img 
                src={aboutBgImg} 
                alt="About Us Card Background" 
                className="absolute inset-0 w-full h-full object-fill object-top z-0 pointer-events-none rounded-3xl filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.4)]"
              />

              {/* Text Content Container Overlay */}
              <div className="relative z-10 space-y-4">
                {/* Big Calligraphic Cursive Title: About Us */}
                <div className="-mt-1 sm:-mt-2">
                  <h2 className="font-southing text-5xl sm:text-6xl lg:text-7xl text-[#EAB308] tracking-wide font-normal select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    About Us
                  </h2>
                </div>

                {/* 3 Same Consistent Elegant Fancy Serif Italic Paragraphs */}
                <div className="space-y-4 text-base sm:text-lg lg:text-xl text-[#F8EFE4] font-serif italic font-medium leading-relaxed tracking-wide drop-shadow-md">
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
                  <p className="text-[#EAB308] font-serif italic text-base sm:text-lg lg:text-xl border-l-2 border-[#D4AF37]/60 pl-3 py-0.5 drop-shadow-md">
                    Perfect Chocolate — crafted with passion, made to be remembered.
                  </p>
                </div>

                {/* Golden Leaf-Shaped "Read More" Button */}
                <div className="pt-3 pb-2 flex justify-start pl-0">
                  <button 
                    onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-2 sm:px-10 sm:py-2.5 bg-[#E5A800] hover:bg-[#D49800] text-[#3B170B] font-serif italic text-xl sm:text-2xl font-normal tracking-wide rounded-tl-[32px] rounded-br-[32px] rounded-tr-none rounded-bl-none shadow-[0_6px_18px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_25px_rgba(229,168,0,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center cursor-pointer"
                  >
                    <span>Read More</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FLOATING QUICK CONTACT WIDGET (WITH PRE-FILLED CUSTOMIZED WHATSAPP MESSAGE) */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/919106467043?text=Hello%20Perfect%20Chocolate!%20I%20would%20like%20to%20get%20more%20information%20about%20your%20handcrafted%20chocolates."
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 group"
          title="Chat on WhatsApp (+91 91064 67043)"
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
