import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Flame, Gift, ArrowRight } from 'lucide-react';
import ScatteredText, { TextLineConfig } from './ScatteredText';
// @ts-ignore
import hero1Img from '../images/hero1.jpg';

interface HeroSectionProps {
  onExploreClick?: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  // Heading Configurations for Hero Section
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
      {/* 100% FULL PAGE HERO SECTION */}
      <section id="home" className="relative pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24 lg:pb-28 overflow-hidden min-h-[92vh] sm:min-h-screen flex flex-col justify-center bg-[#090302] select-none">
        
        {/* Background Image */}
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

        {/* Hero Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex flex-col justify-between my-auto pt-8 pb-6 w-full">
          
          {/* Middle Main Morphing Scattered Heading */}
          <div className="max-w-5xl my-auto py-6 text-center lg:text-left">
            <ScatteredText
              key="scattered-hero-main"
              lines={slide1HeadingLines}
              isActive={true}
              baseDelay={0.5}
              duration={1.25}
            />
          </div>

          {/* Bottom Sub-text & CTA Button */}
          <div className="space-y-3 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm font-barlow text-cream-200 tracking-widest uppercase font-medium drop-shadow-md"
            >
              AT PERFECT CHOCOLATE
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
