import { X, ShoppingBag, Trash2, ShieldCheck, ArrowRight } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  cacao: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemoveItem, onUpdateQty }: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Overlay Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-cocoa-950/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#180B06] border-l border-gold-500/30 text-cream-100 shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-cocoa-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="font-heading font-bold text-xl text-gold-metallic">
                Your Luxury Bag ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-cocoa-300 hover:text-gold-400 rounded-full hover:bg-cocoa-800/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4 divide-y divide-cocoa-800/60">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-cocoa-500 mx-auto opacity-50" />
                <p className="text-cocoa-300 font-body">Your luxury bag is currently empty.</p>
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-cocoa-800 text-gold-300 text-xs font-barlow tracking-widest uppercase hover:bg-gold-500 hover:text-cocoa-950 transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-gold-500/30 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-gold-400 font-mono">{item.cacao}</span>
                    <h4 className="font-heading text-sm font-bold text-cream-100 truncate">{item.name}</h4>
                    <div className="text-gold-300 text-sm font-bold mt-0.5">₹{item.price.toLocaleString('en-IN')}</div>
                    
                    {/* Qty Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-cocoa-700 rounded-lg overflow-hidden text-xs">
                        <button 
                          onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 hover:bg-cocoa-800 text-cocoa-200"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 bg-cocoa-900 text-gold-300 font-mono font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-cocoa-800 text-cocoa-200"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-cocoa-400 hover:text-red-400 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-cocoa-950 border-t border-cocoa-800 space-y-4">
              <div className="flex items-center justify-between text-xs text-cocoa-300 font-barlow">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Temperature Controlled Express Delivery
                </span>
                <span className="text-emerald-400 uppercase font-semibold">FREE</span>
              </div>
              
              <div className="flex items-center justify-between font-heading text-lg text-cream-100 border-t border-cocoa-800/80 pt-3">
                <span>Subtotal</span>
                <span className="text-gold-metallic font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <button 
                onClick={() => alert(`✨ Proceeding to Luxury Express Checkout for ₹${subtotal.toLocaleString('en-IN')}`)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-cocoa-950 font-bold font-barlow tracking-widest uppercase text-sm shadow-gold-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <span>Proceed to Gold Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
