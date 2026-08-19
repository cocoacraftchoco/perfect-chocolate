import { useState } from 'react';
import { X, Sparkles, Check, Gift, Type } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudioModal({ isOpen, onClose }: StudioModalProps) {
  const [boxSize, setBoxSize] = useState<'6' | '12' | '24'>('12');
  const [engravingText, setEngravingText] = useState('For My Beloved');
  const [ribbonColor, setRibbonColor] = useState('#D4AF37'); // Gold ribbon
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([
    'Ecuador 70% Dark',
    'Dubai Pistachio Knafeh',
    'Bourbon Truffle'
  ]);

  if (!isOpen) return null;

  const handleCreateCustomBox = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#FFF1C5', '#4E2616']
    });
    alert(`✨ Custom Perfect Chocolate Box (${boxSize} Pieces) Created!\nEngraving: "${engravingText}"\nAdded to your cart!`);
    onClose();
  };

  const flavorOptions = [
    'Ecuador 70% Dark',
    'Dubai Pistachio Knafeh',
    'Bourbon Truffle',
    'Hazelnut Gold Crust',
    'Raspberry Ruby Cocoa',
    'Cardamom Sea Salt Caramel'
  ];

  const toggleFlavor = (flavor: string) => {
    if (selectedFlavors.includes(flavor)) {
      setSelectedFlavors(selectedFlavors.filter(f => f !== flavor));
    } else {
      if (selectedFlavors.length < Number(boxSize)) {
        setSelectedFlavors([...selectedFlavors, flavor]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="cocoa-glass-panel max-w-2xl w-full rounded-2xl overflow-hidden border border-gold-500/40 p-6 sm:p-8 space-y-6 relative shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-cocoa-300 hover:text-gold-400 p-2 transition-colors rounded-full hover:bg-cocoa-800/40"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-gold-400 font-barlow tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Studio</span>
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-cream-100">
            3D Custom Box Craftsman
          </h2>
          <p className="text-xs sm:text-sm text-cocoa-300 font-light">
            Design your bespoke gift hamper, select flavors, and add custom 24K gold calligraphic engraving.
          </p>
        </div>

        {/* Studio Box Preview Banner */}
        <div className="bg-gradient-to-r from-cocoa-900 via-cocoa-800 to-cocoa-900 border border-gold-500/30 rounded-xl p-6 text-center space-y-3 relative overflow-hidden">
          <div className="text-gold-metallic font-southing text-3xl sm:text-4xl">
            {engravingText || "Your Name Engraved Here"}
          </div>
          <div className="text-xs font-barlow text-gold-300 uppercase tracking-widest flex items-center justify-center gap-2">
            <Gift className="w-4 h-4 text-gold-400" />
            <span>{boxSize}-Piece Imperial Gold Velvet Box</span>
          </div>
        </div>

        {/* Configuration Tabs */}
        <div className="space-y-4">
          
          {/* Step 1: Select Box Size */}
          <div>
            <label className="block text-xs font-barlow uppercase text-cocoa-300 mb-2">
              1. Choose Box Size
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['6', '12', '24'] as const).map(size => (
                <button
                  key={size}
                  onClick={() => setBoxSize(size)}
                  className={`py-3 rounded-xl border text-center transition-all ${
                    boxSize === size
                      ? 'bg-gold-500 text-cocoa-950 border-gold-400 font-bold shadow-gold-glow'
                      : 'bg-cocoa-900/60 border-cocoa-800 text-cream-200 hover:border-gold-500/40'
                  }`}
                >
                  <div className="text-base font-heading">{size} Pieces</div>
                  <div className="text-[10px] opacity-80">₹{size === '6' ? '2,499' : size === '12' ? '4,499' : '7,999'}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Calligraphic Gold Engraving */}
          <div>
            <label className="block text-xs font-barlow uppercase text-cocoa-300 mb-1 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-gold-400" />
              <span>2. Custom Gold Foil Engraving Text</span>
            </label>
            <input 
              type="text"
              maxLength={30}
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              placeholder="e.g. Happy Anniversary, Sarah"
              className="w-full bg-cocoa-950 border border-gold-500/30 rounded-xl px-4 py-3 text-gold-300 font-southing text-xl focus:outline-none focus:border-gold-400"
            />
          </div>

          {/* Step 3: Select Flavors */}
          <div>
            <label className="block text-xs font-barlow uppercase text-cocoa-300 mb-2">
              3. Pick Assorted Flavors ({selectedFlavors.length} selected)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
              {flavorOptions.map(flavor => {
                const isSelected = selectedFlavors.includes(flavor);
                return (
                  <button
                    key={flavor}
                    onClick={() => toggleFlavor(flavor)}
                    className={`p-2 rounded-lg text-left text-xs border transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-cocoa-800 border-gold-500 text-gold-300'
                        : 'bg-cocoa-950/60 border-cocoa-800/80 text-cocoa-300 hover:border-cocoa-700'
                    }`}
                  >
                    <span className="line-clamp-1">{flavor}</span>
                    {isSelected && <Check className="w-3 h-3 text-gold-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="pt-2">
          <button 
            onClick={handleCreateCustomBox}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-cocoa-950 font-bold font-barlow uppercase tracking-widest text-sm shadow-gold-glow hover:scale-[1.02] transition-transform"
          >
            Craft Custom Box & Add to Order
          </button>
        </div>

      </div>
    </div>
  );
}
