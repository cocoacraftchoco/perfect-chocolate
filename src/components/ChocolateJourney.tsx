import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// @ts-ignore
import step1Img from '../images/step1.png';
// @ts-ignore - Isolated roasted cocoa beans PNG cutout
import step2Img from 'C:/Users/DELL/.gemini/antigravity/brain/ce6fe00e-1fe3-4a8a-b532-08fb1661970a/step2_roasted_beans_cutout_1787142087422.png';
// @ts-ignore - Isolated conching liquid chocolate swirl PNG cutout
import step3Img from 'C:/Users/DELL/.gemini/antigravity/brain/ce6fe00e-1fe3-4a8a-b532-08fb1661970a/step3_conching_swirl_cutout_1787142470838.png';
// @ts-ignore - Isolated broken chocolate bar snap PNG cutout
import step4Img from 'C:/Users/DELL/.gemini/antigravity/brain/ce6fe00e-1fe3-4a8a-b532-08fb1661970a/step4_tempering_bar_cutout_1787142721415.png';
// @ts-ignore
import step5Img from '../images/step5.png';

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
    rawImg: step1Img
  },
  {
    id: 2,
    stepNum: "02",
    title: "Slow Roasting",
    subtitle: "Unlocking Layered Aromas",
    description: "When cocoa beans arrive at our factory, they undergo a slow roast to coax out rich, layered cocoa butter notes without burning their delicate character.",
    rawImg: step2Img
  },
  {
    id: 3,
    stepNum: "03",
    title: "Stone Grinding & Conching",
    subtitle: "72-Hour Silky Transformation",
    description: "Ground under traditional stone grinders for hours, the cocoa nibs are slowly pulverized into a smooth, flowing paste with an ultra-rich melt.",
    rawImg: step3Img
  },
  {
    id: 4,
    stepNum: "04",
    title: "Tempering & Crystal Snap",
    subtitle: "Precision Crystal Alignment",
    description: "By carefully cooling the chocolate in a precise rhythm, cocoa butter crystals are aligned just right—giving each bar its glossy finish and crisp snap.",
    rawImg: step4Img
  },
  {
    id: 5,
    stepNum: "05",
    title: "Moulding & Gold Wrapping",
    subtitle: "Handcrafted Masterpiece",
    description: "Poured into custom molds and hand-wrapped with care in luxury gold foil and artist-illustrated wrappers, turning each bar into a piece of art.",
    rawImg: step5Img
  }
];

export default function ChocolateJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const [cleanImages, setCleanImages] = useState<Record<number, string>>({});

  const current = STEPS[activeStep];

  useEffect(() => {
    STEPS.forEach((step, idx) => {
      const img = new Image();
      img.src = step.rawImg;
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

          // 1. Erase White / Off-White / Cream background pixels (Step 01 white box)
          const isWhite = r > 215 && g > 215 && b > 215;

          // 2. Erase Grey / Light-Grey Checkerboard pattern pixels (Step 05 fake PNG pattern)
          const isNeutralGrey = Math.abs(r - g) < 14 && Math.abs(g - b) < 14;
          const isCheckerboard = isNeutralGrey && r > 165 && g > 165 && b > 165;

          if (isWhite || isCheckerboard) {
            data[i + 3] = 0; // 100% Transparent
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const transparentUrl = canvas.toDataURL('image/png');
        setCleanImages((prev) => ({ ...prev, [idx]: transparentUrl }));
      };
    });
  }, []);

  // Calculate 5 angles around the circular orbit (in radians)
  // Top center is -90deg (-PI/2)
  const getCirclePosition = (index: number) => {
    const total = 5;
    const angle = ((index / total) * 2 * Math.PI) - (Math.PI / 2);
    const radiusX = 42; // % width radius
    const radiusY = 42; // % height radius

    const x = 50 + radiusX * Math.cos(angle);
    const y = 50 + radiusY * Math.sin(angle);
    return { left: `${x}%`, top: `${y}%` };
  };

  const centerImageSrc = cleanImages[activeStep] || current.rawImg;

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

        {/* CIRCULAR WHEEL & CENTER SPOTLIGHT CONTAINER */}
        <div className="relative max-w-4xl mx-auto min-h-[580px] sm:min-h-[640px] flex items-center justify-center">

          {/* ORBITAL BACKGROUND CIRCLE PATH */}
          <div className="absolute w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full border border-dashed border-[#D4AF37]/40 pointer-events-none animate-spin-slow" />

          {/* CURVED SVG CONNECTING CIRCLE */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#D4AF37" strokeWidth="0.4" strokeDasharray="1 1.5" />
          </svg>

          {/* 5 OUTER CIRCULAR STEP BADGES */}
          {STEPS.map((step, idx) => {
            const pos = getCirclePosition(idx);
            const isActive = idx === activeStep;
            const stepSrc = cleanImages[idx] || step.rawImg;

            return (
              <div
                key={step.id}
                style={{ left: pos.left, top: pos.top }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group flex flex-col items-center"
              >
                <button
                  onClick={() => setActiveStep(idx)}
                  className={`w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center transition-all duration-500 transform outline-none bg-transparent border-none ${
                    isActive ? 'scale-125' : 'hover:scale-110 opacity-85 hover:opacity-100'
                  }`}
                  aria-label={`Select step ${step.stepNum}`}
                >
                  <img
                    src={stepSrc}
                    alt={step.title}
                    className={`w-full h-full object-contain transition-all duration-300 select-none pointer-events-none ${
                      isActive
                        ? 'filter drop-shadow-[0_8px_20px_rgba(212,175,55,0.75)] scale-110'
                        : 'filter drop-shadow-[0_4px_10px_rgba(42,19,10,0.25)]'
                    }`}
                  />
                </button>

                <span
                  onClick={() => setActiveStep(idx)}
                  className={`mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-barlow font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-colors shadow-sm cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#2A130A] text-[#EAB308]'
                      : 'bg-white text-[#5C3E31] border border-[#D4AF37]/40'
                  }`}
                >
                  Step {step.stepNum}
                </span>
              </div>
            );
          })}

          {/* CENTER SPOTLIGHT (PURE FLOATING PNG CUTOUT) */}
          <div className="relative z-20 w-[270px] sm:w-[360px] lg:w-[420px] text-center space-y-3 transition-all duration-500 pointer-events-auto">

            {/* Active Process Floating Artwork Spotlight */}
            <div className="w-36 h-36 sm:w-52 sm:h-52 mx-auto relative flex items-center justify-center my-2">
              <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full filter blur-2xl animate-pulse pointer-events-none" />
              <img
                key={current.id}
                src={centerImageSrc}
                alt={current.title}
                className="w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(60,30,15,0.25)] relative z-10 transition-all duration-500 transform hover:scale-105 select-none"
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
