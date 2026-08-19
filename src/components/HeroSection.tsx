import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Flame, Gift, ArrowRight, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import ScatteredText, { TextLineConfig } from './ScatteredText';
// @ts-ignore
import hero1Img from '../images/hero1.jpg';
// @ts-ignore
import heroBannerImg from '../images/herosectionimage2.png';

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play timer for hero carousel slides
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handleNext = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? 1 : 0));

  // Heading Configurations for Slide 1
  const slide1HeadingLines: TextLineConfig[] = [
    {
      text: 'WELCOME TO',
      colorClass: 'text-white font-heading font-extrabold drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]',
      fontSizeClass: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl',
      trackingClass: 'tracking-[0.14em]',
    },
    {
      text: 'PERFECT CHOCOLATE',
      colorClass: 'text-gold-metallic font-heading font-bold drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]',
      fontSizeClass: 'text-3xl sm:text-5xl lg:text-6xl xl:text-7xl',
      trackingClass: 'tracking-[0.14em]',
    },
  ];

  return (
    <>
      {/* 100% FULL PAGE HERO CAROUSEL SECTION */}
      <section id="home" className="relative pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24 lg:pb-28 overflow-hidden min-h-[92vh] sm:min-h-screen flex flex-col justify-center bg-[#090302] select-none">
        
        {/* ========================================== */}
        {/* SLIDE 1: CINEMATIC SCATTERED -> ASSEMBLED HEADLINE SCENE */}
        {/* ========================================== */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-1200 ease-in-out ${
          currentSlide === 0 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
        }`}>
          {/* Original hero1.jpg Background Image Clean without heavy shadow overlays */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#090302]">
            <img 
              src={hero1Img} 
              alt="Perfect Chocolate Welcome Hero Background" 
              className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.02]"
            />
          </div>

          {/* SVG Motion Trails Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
              <path d="M150,200 L280,140 M420,120 L510,70 M750,380 L880,450 M220,480 L350,540" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Slide 1 Main Content Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex flex-col justify-between my-auto pt-8 pb-6 w-full">
            
            {/* Middle Main Morphing Scattered Heading */}
            <div className="max-w-5xl my-auto py-6 text-center lg:text-left">
              <ScatteredText
                key={`scattered-0-${currentSlide}`}
                lines={slide1HeadingLines}
                isActive={currentSlide === 0}
                baseDelay={0.5}
                duration={1.25}
              />
            </div>

            {/* Bottom Sub-text & CTA Button */}
            <div className="space-y-3 text-center lg:text-left">
              <motion.div
                key={`subtext-0-${currentSlide}`}
                initial={{ opacity: 0, y: 15 }}
                animate={currentSlide === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.8, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm font-barlow text-cream-200 tracking-widest uppercase font-medium drop-shadow-md"
              >
                AT PERFECT CHOCOLATE
              </motion.div>

              <motion.div
                key={`btn-0-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={currentSlide === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button 
                  onClick={onExploreClick || (() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }))}
                  className="px-8 py-3.5 rounded-none border border-white/40 bg-black/40 hover:bg-gold-500 hover:text-cocoa-950 hover:border-gold-400 text-white font-barlow text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center gap-3 group shadow-xl backdrop-blur-md mx-auto lg:mx-0"
                >
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>

        {/* ========================================== */}
        {/* SLIDE 2: MASTERPIECE HERO BANNER SCENE Clean without dark gradient overlays */}
        {/* ========================================== */}
        <div className={`absolute inset-0 w-full h-full transition-opacity duration-1200 ease-in-out ${
          currentSlide === 1 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
        }`}>
          {/* Background Image Clean without dark gradient overlays */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#090302]">
            <img 
              src={heroBannerImg} 
              alt="Perfect Chocolate Artisanal Hero Background" 
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
            />
          </div>

          {/* Slide 2 Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex flex-col justify-center my-auto pt-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 text-center lg:text-left space-y-4">
                <motion.div
                  key={`static-headline-1-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={currentSlide === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1 flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                  <div className="text-base sm:text-xl lg:text-2xl font-barlow font-bold text-gold-400 tracking-[0.3em] uppercase drop-shadow-md">
                    EVERY PIECE IS A
                  </div>
                  <div className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black text-gold-metallic tracking-[0.08em] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    MASTERPIECE
                  </div>
                  <div className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white tracking-[0.14em] uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    CHOCOLATE
                  </div>

                  {/* Golden Line Divider with Centered Heart (Matches Screenshot Exactly) */}
                  <div className="flex items-center gap-3 pt-3 pb-1 w-full max-w-md justify-center lg:justify-start">
                    <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
                    <Heart className="w-3.5 h-3.5 text-[#EAB308] fill-current shrink-0 drop-shadow-sm" />
                    <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
                  </div>
                </motion.div>

                <motion.div
                  key={`btn-1-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={currentSlide === 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="pt-4 flex justify-center lg:justify-start"
                >
                  <button 
                    onClick={onExploreClick || (() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }))}
                    className="px-8 py-3.5 rounded-none border border-gold-500/50 bg-black/50 hover:bg-gold-500 hover:text-cocoa-950 text-gold-300 font-barlow text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center gap-3 group shadow-xl backdrop-blur-md"
                  >
                    <span>EXPLORE OUR STORY</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </button>
                </motion.div>
              </div>

              <div className="hidden lg:block lg:col-span-4 pointer-events-none"></div>

            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* CAROUSEL CONTROLS */}
        {/* ========================================== */}
        
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-gold-500 hover:text-cocoa-950 text-gold-400 border border-gold-500/20 transition-all duration-300 backdrop-blur-md hidden sm:block"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-gold-500 hover:text-cocoa-950 text-gold-400 border border-gold-500/20 transition-all duration-300 backdrop-blur-md hidden sm:block"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? 'w-8 h-2.5 bg-gold-400 shadow-[0_0_10px_rgba(212,175,55,0.8)]' 
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </section>

      {/* FEATURE STRIP */}
      <div className="py-6 bg-[#090302] border-t border-b border-gold-500/20 font-barlow relative z-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gold-400">
            
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 justify-center md:justify-start border-r border-gold-500/10 last:border-r-0">
              <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gold-300">70% Dark Ecuador</div>
                <div className="text-[10px] uppercase tracking-widest text-cocoa-300">Single Origin</div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 justify-center md:justify-start border-r border-gold-500/10 last:border-r-0">
              <Sparkles className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gold-300">Edible 24K</div>
                <div className="text-[10px] uppercase tracking-widest text-cocoa-300">Gold Leaf Infusion</div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 justify-center md:justify-start border-r border-gold-500/10 last:border-r-0">
              <Flame className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gold-300">Hand-Roasted</div>
                <div className="text-[10px] uppercase tracking-widest text-cocoa-300">Grand Cru Beans</div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5 justify-center md:justify-start">
              <Gift className="w-5 h-5 text-gold-400 shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gold-300">Custom Luxury</div>
                <div className="text-[10px] uppercase tracking-widest text-cocoa-300">Velvet Packaging</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
