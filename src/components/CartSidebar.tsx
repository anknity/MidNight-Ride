import React, { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, Info, Receipt, Navigation, Route, MapPin, Sparkles, Car } from 'lucide-react';
import { BookingItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: BookingItem[];
  onUpdateQty: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

const DISPATCH_STEPS = [
  { label: 'SIMULATING DISPATCH', desc: 'Running late-night driver health & sobriety diagnostics...' },
  { label: 'LOCKING CHAUFFEUR', desc: 'Matching route requirements with near-station elite pilots...' },
  { label: 'CABIN SANITISATION', desc: 'Warming climate, activating sandalwood essential oil diffuser...' },
  { label: 'PILOT EN-ROUTE', desc: 'Chauffeur initiating engine and programming organic lo-fi beats...' },
  { label: 'LIVE MONITORING', desc: 'Your Sovereign cruiser is glided on-course. Estimated arrival: 4 mins.' }
];

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}: CartSidebarProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; pct: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  // Dispatch live simulation state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activePrepStep, setActivePrepStep] = useState(0);

  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  // Calculators
  const itemsSubtotal = cartItems.reduce((sum, item) => sum + item.rideOption.price * item.passengers, 0);
  const dispatchFee = deliveryMethod === 'delivery' ? 25.00 : 0;
  
  let discountAmount = 0;
  if (appliedDiscount) {
    discountAmount = itemsSubtotal * (appliedDiscount.pct / 100);
  }

  const grandTotal = itemsSubtotal + dispatchFee - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = discountCode.trim().toUpperCase();
    if (code === 'MIDNIGHT30') {
      setAppliedDiscount({ code: 'MIDNIGHT30', pct: 30 });
      setDiscountCode('');
    } else if (code === 'UMAMI10') {
      setAppliedDiscount({ code: 'UMAMI10', pct: 10 });
      setDiscountCode('');
    } else {
      setPromoError('Unknown code. Try "MIDNIGHT30" found in community rewards!');
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    if (deliveryMethod === 'delivery' && !address.trim()) {
      alert('Kindly supply a precise pickup address for dispatch!');
      return;
    }

    setOrderPlaced(true);
    setActivePrepStep(0);

    const interval = setInterval(() => {
      setActivePrepStep(prev => {
        if (prev >= DISPATCH_STEPS.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dim backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Pane drawer container */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-[#FDF8E8] h-full shadow-2xl flex flex-col z-10 border-l-4 border-brand-primary"
      >
        
        {/* Header Drawer Section */}
        <div className="bg-brand-primary text-white p-4 flex justify-between items-center font-primary tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Navigation className="animate-spin" size={18} />
            <span>DISPATCH RADAR</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-brand-secondary p-1 transition-colors cursor-pointer"
            title="Close dispatcher"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence mode="wait">
            {!orderPlaced ? (
              <motion.div 
                key="cart-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Cab booking list */}
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 px-4 space-y-4">
                    <Car className="h-16 w-16 mx-auto text-brand-primary/40 animate-pulse" />
                    <h3 className="font-primary text-xl text-text-primary uppercase">No Active Bookings locked</h3>
                    <p className="text-xs text-text-secondary">
                      Go craft a custom ride with premium starlit roofs and heated seats, or book one of our vintage flagship cruiser caddies!
                    </p>
                    <button
                      onClick={onClose}
                      className="bg-brand-primary text-white border-2 border-brand-primary px-6 py-2 text-xs font-primary font-bold uppercase hover:bg-transparent hover:text-brand-primary transition-colors cursor-pointer"
                    >
                      Browse Fleet
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {cartItems.map((item) => (
                      <div 
                        key={item.bookingId}
                        className="bg-white border border-[#222]/10 rounded-lg p-3 flex gap-3 items-start hover:shadow-sm transition-shadow"
                      >
                        {/* Thumbnail */}
                        <img 
                          src={item.rideOption.image} 
                          alt={item.rideOption.name}
                          className="w-14 h-14 object-cover rounded bg-neutral-surface flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        {/* Details */}
                        <div className="flex-1 space-y-1">
                          <h4 className="font-primary text-xs font-bold uppercase text-text-primary leading-tight">
                            {item.rideOption.name}
                          </h4>
                          {item.customizations ? (
                            <p className="text-[9px] text-text-secondary leading-normal">
                              Suspension: {item.customizations.vehicleClass.split(' (')[0]}, Transit: {item.customizations.speedMode} • Cabin styling: {item.customizations.driverVibe.split(' (')[0]}
                            </p>
                          ) : (
                            <p className="text-[9px] text-text-secondary truncate max-w-[180px]">
                              {item.rideOption.description}
                            </p>
                          )}
                          <div className="text-xs font-bold text-brand-primary">
                            ₹{(item.rideOption.price * item.passengers).toFixed(2)}
                          </div>
                        </div>

                        {/* Qty operations */}
                        <div className="flex flex-col items-center justify-between gap-1.5 self-stretch">
                          <button 
                            onClick={() => onRemoveItem(item.bookingId)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Cancel booking element"
                          >
                            <Trash2 size={13} />
                          </button>
                          
                          <div className="flex items-center gap-1.5 bg-neutral-surface rounded px-1.5 py-0.5">
                            <button 
                              onClick={() => onUpdateQty(item.bookingId, -1)}
                              className="text-text-primary hover:text-brand-primary p-0.5"
                              title="Fewer passengers"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="font-primary text-[10px] font-bold min-w-4 text-center">{item.passengers}</span>
                            <button 
                              onClick={() => onUpdateQty(item.bookingId, 1)}
                              className="text-text-primary hover:text-brand-primary p-0.5"
                              title="Add passenger"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cartItems.length > 0 && (
                  <>
                    {/* Method tabs */}
                    <div className="bg-white border border-[#222]/10 rounded-lg p-2.5 space-y-2.5">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('delivery')}
                          className={`flex-1 font-primary font-bold text-xs py-2 rounded uppercase flex items-center justify-center gap-1.5 cursor-pointer ${
                            deliveryMethod === 'delivery' 
                              ? 'bg-[#C8553D] text-white' 
                              : 'bg-neutral-surface text-[#222]'
                          }`}
                        >
                          <Route size={14} /> Dispatch To Me
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('pickup')}
                          className={`flex-1 font-primary font-bold text-xs py-2 rounded uppercase flex items-center justify-center gap-1.5 cursor-pointer ${
                            deliveryMethod === 'pickup' 
                              ? 'bg-[#C8553D] text-white' 
                              : 'bg-neutral-surface text-[#222]'
                          }`}
                        >
                          <MapPin size={14} /> Hub Boarding
                        </button>
                      </div>

                      {deliveryMethod === 'delivery' ? (
                        <div className="space-y-1 animate-fadeIn">
                          <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider block font-primary">Enter Precise Pickup Address</span>
                          <input 
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-neutral-cream border border-[#222]/15 rounded p-2 text-xs outline-none focus:border-brand-primary"
                            placeholder="e.g. Park Street Lounge, Gate #3, Kolkata"
                          />
                        </div>
                      ) : (
                        <p className="text-[10px] text-text-secondary leading-normal text-center bg-yellow-50 p-2 rounded">
                          🚗 Immediate dispatch available. Boarding ready within 5 minutes at Park Street Hub!
                        </p>
                      )}
                    </div>

                    {/* Coupons and code apply form */}
                    <form onSubmit={handleApplyPromo} className="bg-white border border-[#222]/10 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider block font-primary">Midnight Fare coupons</span>
                        <span className="text-[8px] bg-red-100 text-red-700 px-1 font-bold rounded">MIDNIGHT30</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="Try MIDNIGHT30 for 30% off!"
                          className="bg-neutral-cream border border-[#222]/15 rounded p-2 text-xs flex-1 outline-none"
                        />
                        <button 
                          type="submit"
                          className="bg-text-primary text-white font-primary font-bold text-xs uppercase px-4 rounded cursor-pointer hover:bg-[#C8553D]"
                        >
                          Apply
                        </button>
                      </div>
                      {appliedDiscount && (
                        <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <Sparkles size={11} /> Saved {appliedDiscount.pct}% on midnight fare using {appliedDiscount.code}!
                        </div>
                      )}
                      {promoError && (
                        <div className="text-[10px] text-rose-600 italic font-primary">
                          {promoError}
                        </div>
                      )}
                    </form>

                    {/* Bill Receipt breakdown */}
                    <div className="bg-white border border-dashed border-brand-primary rounded-lg p-4 space-y-2.5 font-secondary text-xs">
                      <span className="font-primary text-[10px] tracking-widest text-[#222] uppercase block font-bold border-b pb-1">
                        FARE RECEIPT DETAILS
                      </span>
                      <div className="flex justify-between">
                        <span>Base Fare Subtotal:</span>
                        <span className="font-mono">₹{itemsSubtotal.toFixed(2)}</span>
                      </div>
                      {deliveryMethod === 'delivery' && (
                        <div className="flex justify-between">
                          <span>Nightly Dispatch Surcharge:</span>
                           <span className="font-mono">₹{dispatchFee.toFixed(2)}</span>
                        </div>
                      )}
                      {appliedDiscount && (
                        <div className="flex justify-between text-emerald-600">
                          <span>VIP Fare Credit Discount:</span>
                          <span className="font-mono">-₹{discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-sm border-t pt-2 text-[#222]">
                        <span>Estimated Total:</span>
                        <span className="font-primary text-brand-primary font-bold text-base">₹{grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      className="w-full bg-[#C8553D] text-white text-center font-primary font-bold tracking-widest py-3 border-2 border-[#C8553D] hover:bg-transparent hover:text-[#C8553D] transition-colors uppercase cursor-pointer"
                    >
                      REQUEST MIDNIGHT DISPATCH
                    </button>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="tracker"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 py-6"
              >
                {/* Simulated live process tracker */}
                <div className="bg-white border-2 border-brand-primary p-6 rounded-lg text-center space-y-4 shadow-md">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#222] font-primary block">LIVE DISPATCH TELEMETRY</span>
                  
                  {/* Rotating compass / car graphic */}
                  <div className="relative inline-block w-24 h-24 mb-2">
                    <motion.div 
                      animate={{ scale: [1, 1.08, 1], rotate: [0, 360] }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                      className="w-24 h-24 rounded-full bg-neutral-surface flex items-center justify-center border-4 border-[#C8553D]"
                    >
                      <Car className="h-12 w-12 text-[#C8553D]" />
                    </motion.div>
                    
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1 opacity-70">
                      <motion.span animate={{ y: [0, -15, 0], opacity: [0.1, 0.8, 0.1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-5 bg-[#C8553D] blur-[1px] block" />
                      <motion.span animate={{ y: [0, -20, 0], opacity: [0.1, 0.9, 0.1] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }} className="w-1 h-6 bg-[#C8553D] blur-[1px] block" />
                    </span>
                  </div>

                  <h3 className="font-primary text-xl font-bold text-brand-primary uppercase tracking-tight">
                    {DISPATCH_STEPS[activePrepStep].label}
                  </h3>
                  <p className="text-xs text-text-secondary italic font-primary">
                    {DISPATCH_STEPS[activePrepStep].desc}
                  </p>

                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      key={activePrepStep}
                      initial={{ width: `${(activePrepStep / DISPATCH_STEPS.length) * 100}%` }}
                      animate={{ width: `${((activePrepStep + 1)/ DISPATCH_STEPS.length) * 100}%` }}
                      transition={{ duration: 4.5, ease: 'linear' }}
                      className="h-full bg-brand-primary"
                    />
                  </div>
                </div>

                {/* Vertical timeline details */}
                <div className="space-y-4 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                  {DISPATCH_STEPS.map((s, idx) => {
                    const isDone = idx < activePrepStep;
                    const isActive = idx === activePrepStep;
                    
                    return (
                      <div key={idx} className="relative">
                        <span className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] font-bold ${
                          isDone 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : isActive 
                              ? 'bg-[#C8553D] border-[#C8553D] text-white' 
                              : 'bg-white border-gray-300 text-gray-500'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </span>
                        <div>
                          <span className={`font-primary text-xs font-bold uppercase transition-colors block ${
                            isActive ? 'text-[#C8553D]' : isDone ? 'text-emerald-700' : 'text-gray-400'
                          }`}>
                            {s.label}
                          </span>
                          <p className="text-[10px] text-text-secondary leading-snug">{s.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {activePrepStep === DISPATCH_STEPS.length - 1 && (
                  <button
                    onClick={() => {
                      onClearCart();
                      setOrderPlaced(false);
                      onClose();
                    }}
                    className="w-full bg-emerald-600 border-2 border-emerald-600 text-white font-primary font-bold tracking-widest py-3 uppercase hover:bg-transparent hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    Cab Arrived! Lock Screen
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
