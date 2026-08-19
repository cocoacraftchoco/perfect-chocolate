import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// @ts-ignore
import leftImg from '../images/testomonials_left.png';
// @ts-ignore
import rightImg from '../images/testomonials_right.png';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "I love all Perfect Chocolate products but the chocolate overload brownie has been my all-time favourite and truly justifies its name with its rich chocolate sweetness. Perfect Chocolate is truly one of our favourite places!",
    author: "Meenakshi Verma",
    location: "Pune"
  },
  {
    id: 2,
    quote: "The Dubai Pistachio & Knafeh Velvet bar is an absolute dream! The crunchiness of knafeh mixed with rich cocoa creates an unforgettable flavor profile.",
    author: "Ananya Roy",
    location: "Mumbai"
  },
  {
    id: 3,
    quote: "Handcrafted perfection in every bite. The 70% Dark Gold Reserve is my go-to luxury gift for family and friends. Highly recommended!",
    author: "Rohan Sharma",
    location: "Delhi"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cleanLeftImg, setCleanLeftImg] = useState<string>(leftImg);
  const [cleanRightImg, setCleanRightImg] = useState<string>(rightImg);

  useEffect(() => {
    // Canvas processing: Erase all white/cream square box background pixels from Left Truffle
    const lImg = new Image();
    lImg.src = leftImg;
    lImg.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = lImg.width;
      canvas.height = lImg.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(lImg, 0, 0);
      const imgData = ctx.getImageData(0, 0, lImg.width, lImg.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 200 && g > 195 && b > 185) {
          data[i + 3] = 0; // 100% Transparent
        }
      }
      ctx.putImageData(imgData, 0, 0);
      setCleanLeftImg(canvas.toDataURL('image/png'));
    };

    // Canvas processing: Erase all white/cream square box background pixels from Right Chocolate Piece
    const rImg = new Image();
    rImg.src = rightImg;
    rImg.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = rImg.width;
      canvas.height = rImg.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(rImg, 0, 0);
      const imgData = ctx.getImageData(0, 0, rImg.width, rImg.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 200 && g > 195 && b > 185) {
          data[i + 3] = 0; // 100% Transparent
        }
      }
      ctx.putImageData(imgData, 0, 0);
      setCleanRightImg(canvas.toDataURL('image/png'));
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="bg-[#FAF6ED] text-[#33180D] py-16 sm:py-20 px-4 relative overflow-hidden select-none border-t border-b border-[#E8DCC4]">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading matching screenshot */}
        <div className="text-center mb-8 sm:mb-12 space-y-2">
          <h2 className="text-4xl sm:text-5xl font-serif font-medium text-[#C28A2B] tracking-wide">
            Testimonials
          </h2>
          
          {/* Subtle light teal/blue 4 diamond dots pattern from screenshot */}
          <div className="flex items-center justify-center gap-2 pt-1 text-[#8ECAE6] text-xs sm:text-sm">
            <span>◆</span>
            <span>◆</span>
            <span>◆</span>
            <span>◆</span>
          </div>
        </div>

        {/* Testimonial Content Wrapper */}
        <div className="relative min-h-[260px] sm:min-h-[220px] flex items-center justify-center">
          
          {/* LEFT FLOATING GOLD DRIZZLED TRUFFLE (Shifted EVEN HIGHER UP) */}
          <div className="absolute -left-2 sm:-left-4 lg:-left-8 -top-12 sm:-top-16 lg:-top-20 z-20 w-28 sm:w-36 lg:w-44 pointer-events-none transform -rotate-6 transition-transform duration-700 hover:rotate-0">
            <img 
              src={cleanLeftImg} 
              alt="Gold Drizzled Chocolate Truffle" 
              className="w-full h-auto object-contain filter drop-shadow-[0_16px_28px_rgba(60,30,15,0.35)] select-none animate-float-slow"
            />
          </div>

          {/* RIGHT FLOATING CHOCOLATE PIECE (Shifted FURTHER RIGHT & DOWN) */}
          <div className="absolute -right-4 sm:-right-8 lg:-right-12 top-[65%] sm:top-[60%] z-20 w-28 sm:w-36 lg:w-44 pointer-events-none transform rotate-6 transition-transform duration-700 hover:rotate-0">
            <img 
              src={cleanRightImg} 
              alt="Chocolate Piece" 
              className="w-full h-auto object-contain filter drop-shadow-[0_16px_28px_rgba(60,30,15,0.35)] select-none animate-float-slow"
            />
          </div>

          {/* MAIN TESTIMONIAL CAROUSEL CONTAINER (Wider max-w-5xl so quote spans 2-3 lines) */}
          <div className="max-w-4xl lg:max-w-5xl mx-auto px-10 sm:px-20 lg:px-24 text-center space-y-4 relative z-10">
            
            {/* Outlined Gold Opening Quotes Icon “ */}
            <div className="flex justify-center mb-1">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#C28A2B]/80 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                <path d="M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4v6zm0 0c0 3.5-2.5 5-5 5.5M20 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4v6zm0 0c0 3.5-2.5 5-5 5.5" />
              </svg>
            </div>

            {/* Testimonial Quote Text - Spanning 2-3 lines cleanly */}
            <p className="text-base sm:text-lg lg:text-xl text-[#4A2619] font-sans font-normal leading-relaxed tracking-wide min-h-[75px] flex items-center justify-center transition-all duration-500 max-w-3xl mx-auto">
              "{current.quote}"
            </p>

            {/* Author Name and Location */}
            <div className="pt-1">
              <h4 className="text-base sm:text-lg font-bold font-sans text-[#C28A2B] tracking-wide">
                {current.author}, {current.location}
              </h4>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between absolute -left-2 -right-2 sm:left-4 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <button
                onClick={handlePrev}
                className="pointer-events-auto p-1.5 text-[#C28A2B] hover:text-[#8C6016] transition-colors rounded-full hover:bg-gold-500/10 focus:outline-none"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              <button
                onClick={handleNext}
                className="pointer-events-auto p-1.5 text-[#C28A2B] hover:text-[#8C6016] transition-colors rounded-full hover:bg-gold-500/10 focus:outline-none"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center items-center gap-2 pt-3">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? 'w-6 bg-[#C28A2B]'
                      : 'w-2 bg-[#C28A2B]/30 hover:bg-[#C28A2B]/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
