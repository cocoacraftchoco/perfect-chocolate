import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// High resolution bean-to-bar step illustrations
const rawStep1 = 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=500&q=80';
const rawStep2 = 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=500&q=80';
const rawStep3 = 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=500&q=80';
const rawStep4 = 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=500&q=80';
const rawStep5 = 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=500&q=80';


interface JourneyStep {
  id: number;
  stepNum: string;
  title: string;
  subtitle: string;
  description: string;
  rawImg: string;
}

const STEPS: JourneyStep[] = [
  {
    id: 1,
    stepNum: "01",
    title: "Harvesting & Origin",
    subtitle: "Hand-Picked Single-Origin",
    description: "Cocoa pods are carefully hand-picked at full ripeness from single-origin farms, preserving the natural terroir and unique flavor story of the soil.",
    rawImg: rawStep1
  },
  {
    id: 2,
    stepNum: "02",
    title: "Slow Roasting",
    subtitle: "Unlocking Layered Aromas",
    description: "When cocoa beans arrive at our factory, they undergo a slow roast to coax out rich, layered cocoa butter notes without burning their delicate character.",
    rawImg: rawStep2
  },
  {
    id: 3,
    stepNum: "03",
    title: "Stone Grinding & Conching",
    subtitle: "72-Hour Silky Transformation",
    description: "Ground under traditional stone grinders for hours, the cocoa nibs are slowly pulverized into a smooth, flowing paste with an ultra-rich melt.",
    rawImg: rawStep3
  },
  {
    id: 4,
    stepNum: "04",
    title: "Tempering & Crystal Snap",
    subtitle: "Precision Crystal Alignment",
    description: "By carefully cooling the chocolate in a precise rhythm, cocoa butter crystals are aligned just right—giving each bar its glossy finish and crisp snap.",
    rawImg: rawStep4
  },
  {
    id: 5,
    stepNum: "05",
    title: "Moulding & Gold Wrapping",
    subtitle: "Handcrafted Masterpiece",
    description: "Poured into custom molds and hand-wrapped with care in luxury gold foil and artist-illustrated wrappers, turning each bar into a piece of art.",
    rawImg: rawStep5
  }
];

export default function ChocolateJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [processedImgs, setProcessedImgs] = useState<string[]>([
    rawStep1, rawStep2, rawStep3, rawStep4, rawStep5
  ]);

  // Clean background of generated images on client side
  useEffect(() => {
    const rawList = [rawStep1, rawStep2, rawStep3, rawStep4, rawStep5];
    
    rawList.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
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

          // Strip white/light off-white background pixels
          if (r > 225 && g > 225 && b > 225) {
            data[i + 3] = 0; // 100% Transparent
          }
        }

        ctx.putImageData(imageData, 0, 0);
        const cleanDataUrl = canvas.toDataURL('image/png');
        setProcessedImgs(prev => {
          const updated = [...prev];
          updated[idx] = cleanDataUrl;
          return updated;
        });
      };
    });
  }, []);

  // Auto rotate steps every 5 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % STEPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = STEPS[activeStep];
  const currentImg = processedImgs[activeStep];

  // Calculate 5 angles around the circular orbit (in radians)
  // Top center is -90deg (-PI/2)
  const getCirclePosition = (index: number) => {
    const total = 5;
    const angle = ((index / total) * 2 * Math.PI) - (Math.PI / 2);
    // Radius in percentage or pixels
    const radiusX = 42; // % width radius
    const radiusY = 42; // % height radius
    
    const x = 50 + radiusX * Math.cos(angle);
    const y = 50 + radiusY * Math.sin(angle);
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <section id="journey" className="py-20 lg:py-28 bg-[#FFFDF9] text-[#2A130A] relative overflow-hidden select-none border-t border-b border-[#D4AF37]/30">
      
      {/* Ambient Warm Golden Radial Backlight Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/15 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-barlow tracking-[0.25em] uppercase text-[#B8860B] font-bold">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Bean-to-Bar Process</span>
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2A130A] tracking-tight">
            The Journey of Chocolate
          </h2>

          <p className="text-sm sm:text-base text-[#5C3E31] font-sans font-normal max-w-2xl mx-auto leading-relaxed">
            Every bar begins its journey with the bean. Explore our 5-step artisanal process from distant cacao farms to handcrafted gold foil luxury bars.
          </p>
        </div>

        {/* CIRCULAR WHEEL & CENTER FLOATING SPOTLIGHT CONTAINER */}
        <div className="relative max-w-4xl mx-auto min-h-[580px] sm:min-h-[640px] flex items-center justify-center">
          
          {/* ORBITAL BACKGROUND CIRCLE PATH */}
          <div className="absolute w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full border border-dashed border-[#D4AF37]/40 pointer-events-none animate-spin-slow" />
          
          {/* CURVED SVG CONNECTING CIRCLE */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1 1.5" />
          </svg>

          {/* 5 OUTER REALISTIC SYMBOL BADGES (Orbiting the wheel) */}
          {STEPS.map((step, idx) => {
            const pos = getCirclePosition(idx);
            const isActive = idx === activeStep;

            return (
              <div
                key={step.id}
                style={{ left: pos.left, top: pos.top }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group flex flex-col items-center"
              >
                {/* Outer Ring Round Button with Realistic Artwork Symbol inside */}
                <button
                  onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
                  className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center p-2 transition-all duration-500 transform outline-none focus:outline-none focus-visible:outline-none ring-0 ${
                    isActive 
                      ? 'bg-white border-2 border-[#D4AF37] scale-110 sm:scale-125 shadow-[0_10px_25px_rgba(212,175,55,0.4)] ring-4 ring-[#D4AF37]/30' 
                      : 'bg-white/90 border border-[#D4AF37]/40 hover:border-[#B8860B] hover:scale-110 shadow-md'
                  }`}
                  aria-label={`Select step ${step.stepNum}`}
                >
                  <img 
                    src={processedImgs[idx]} 
                    alt={step.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:scale-110 select-none pointer-events-none"
                  />
                </button>

                {/* Small Step Indicator Label under symbol */}
                <span 
                  onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
                  className={`mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-barlow font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-colors shadow-sm cursor-pointer select-none ${
                    isActive ? 'bg-[#2A130A] text-[#EAB308]' : 'bg-white text-[#5C3E31] border border-[#D4AF37]/40'
                  }`}
                >
                  Step {step.stepNum}
                </span>
              </div>
            );
          })}

          {/* CENTER FLOATING CONTENT (No Box Container, No Prev/Next or Auto Buttons) */}
          <div className="relative z-20 w-[270px] sm:w-[360px] lg:w-[420px] text-center space-y-3 transition-all duration-500 pointer-events-auto">
            
            {/* Active Realistic Artwork Large Floating Image */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full filter blur-2xl animate-pulse" />
              <img 
                key={current.id}
                src={currentImg} 
                alt={current.title} 
                className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(42,19,10,0.2)] relative z-10 transition-all duration-500 transform hover:scale-105 select-none"
              />
            </div>

            {/* Step Subtitle & Title */}
            <div className="space-y-1">
              <span className="text-[11px] font-barlow uppercase tracking-[0.2em] text-[#B8860B] block font-bold">
                {current.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A130A] tracking-wide">
                {current.title}
              </h3>
            </div>

            {/* Step Description */}
            <p className="text-xs sm:text-sm text-[#5C3E31] font-sans leading-relaxed font-normal max-w-md mx-auto">
              {current.description}
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
