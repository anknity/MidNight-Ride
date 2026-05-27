import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CABIN_FORMULAS, RETRO_SEAT_OPTIONS, AMENITY_OPTIONS } from '../data';
import { CustomRideState, RideOption, BookingItem } from '../types';
import { Flame, Check, Plus, Shield, Navigation, Car, Heart } from 'lucide-react';

interface BowlCustomizerProps {
  onAddCustomBowl: (cartItem: BookingItem) => void;
}

export default function BowlCustomizer({ onAddCustomBowl }: BowlCustomizerProps) {
  const [rideState, setRideState] = useState<CustomRideState>({
    vehicleClass: CABIN_FORMULAS[0].name,
    driverVibe: RETRO_SEAT_OPTIONS[0].name,
    speedMode: 'Standard Safe',
    amenities: ['topping-chashu', 'topping-ajitama', 'topping-nori']
  });

  const [isPending, startTransition] = useTransition();
  const [justAdded, setJustAdded] = useState(false);

  const basePrice = 13.50;

  // Calculate pricing
  const chosenFormulaObj = CABIN_FORMULAS.find(c => c.name === rideState.vehicleClass);
  const suspensionExtra = chosenFormulaObj?.extra || 0;

  const amenitiesPrice = rideState.amenities.reduce((sum, id) => {
    const amenity = AMENITY_OPTIONS.find(a => a.id === id);
    return sum + (amenity?.price || 0);
  }, 0);

  const totalPrice = basePrice + suspensionExtra + amenitiesPrice;

  const handleToggleAmenity = (id: string) => {
    setRideState(prev => {
      const isSelected = prev.amenities.includes(id);
      const newAmenities = isSelected 
        ? prev.amenities.filter(a => a !== id)
        : [...prev.amenities, id];
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleAddToCart = () => {
    const customRide: RideOption = {
      id: `custom-ride-${Date.now()}`,
      name: `Custom Premium Ride (${rideState.speedMode} Mode)`,
      price: totalPrice,
      description: `Cabin Profile: ${rideState.vehicleClass}, Seat style: ${rideState.driverVibe}. Included Upgrades: ${rideState.amenities.map(id => AMENITY_OPTIONS.find(a => a.id === id)?.name.split(' (')[0]).join(', ') || 'none'}.`,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400',
      category: 'premium'
    };

    const newBookingItem: BookingItem = {
      bookingId: `custom-ride-item-${Date.now()}`,
      rideOption: customRide,
      passengers: 1,
      customizations: {
        vehicleClass: rideState.vehicleClass,
        driverVibe: rideState.driverVibe,
        speedMode: rideState.speedMode,
        amenities: rideState.amenities,
        priceAdjustment: suspensionExtra + amenitiesPrice
      }
    };

    onAddCustomBowl(newBookingItem);
    
    startTransition(() => {
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    });
  };

  const getCabinColorClass = () => {
    if (rideState.vehicleClass.includes('Air-ride')) return 'bg-amber-100/70 border-amber-300';
    if (rideState.vehicleClass.includes('Leaf-Spring')) return 'bg-[#C8553D]/10 border-[#C8553D]/30';
    if (rideState.vehicleClass.includes('Track Damper')) return 'bg-amber-50 border-yellow-200';
    return 'bg-emerald-50/50 border-emerald-200';
  };

  return (
    <div id="customizer-section" className="bg-neutral-surface/60 border border-neutral-surface rounded-card p-6 md:p-10 mb-8">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-brand-primary font-primary font-bold text-sm tracking-widest uppercase block mb-2">Nocturnal Workshop</span>
        <h2 className="font-primary text-3xl md:text-4xl text-text-primary uppercase mb-3 text-center tracking-tight">CRAFT YOUR CUSTOM MIDNIGHT RIDE</h2>
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
          Design your premium cabin suspension setting, fine seating selection, route pacing, and custom luxury amenities engineered specifically for safe, peaceful returns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Visualizers & States */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white border-2 border-text-primary/10 rounded-card p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[300px]">
            
            {/* Ambient Background Glow based on Speed Scale */}
            {rideState.speedMode === 'Eco Slow Cruise' && <div className="absolute inset-0 bg-yellow-50/10 opacity-10 transition-colors duration-500" />}
            {rideState.speedMode === 'Standard Safe' && <div className="absolute inset-0 bg-orange-50/40 opacity-40 transition-colors duration-500" />}
            {rideState.speedMode === 'Express Expresswise' && <div className="absolute inset-0 bg-[#C8553D]/5 opacity-30 transition-colors duration-500" />}
            {rideState.speedMode === 'Volcano Sprint' && <div className="absolute inset-0 bg-red-500/10 glow-ambient transition-colors duration-500" />}

            {/* Steaming Presentation */}
            <div className="relative mb-6">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 opacity-70">
                <motion.div 
                  animate={{ y: [-1, -8, -1], opacity: [0.1, 0.8, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2.2 }}
                  className="w-1.5 h-6 bg-brand-primary/20 rounded-full blur-[2px]"
                />
                <motion.div 
                  animate={{ y: [-1, -12, -1], opacity: [0.1, 0.9, 0.1] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                  className="w-1.5 h-8 bg-brand-primary/15 rounded-full blur-[2px]"
                />
              </div>

              {/* Ride Compass Plate */}
              <div className={`w-44 h-44 rounded-full border-8 flex items-center justify-center transition-all duration-500 ${getCabinColorClass()}`}>
                <div className="text-center px-4">
                  <Car className="h-16 w-16 mx-auto text-brand-primary mb-2 animate-pulse" />
                  <span className="font-primary text-[10px] tracking-widest text-[#222] uppercase block">Cabin Type</span>
                  <span className="font-primary text-xs font-bold text-brand-primary truncate max-w-[125px] block">
                    {rideState.vehicleClass.split(' (')[0]}
                  </span>
                </div>
              </div>

              {/* Speed Mode Indicator Badge */}
              <span className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white uppercase flex items-center gap-1 ${
                rideState.speedMode === 'Volcano Sprint' ? 'bg-red-600 animate-bounce' : 'bg-[#C8553D]'
              }`}>
                <Flame className="w-3 h-3 fill-white" /> {rideState.speedMode}
              </span>
            </div>

            {/* Amenities list */}
            <div className="text-center w-full">
              <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase block mb-2">CUSTOM UPGRADES SELECTED</span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {rideState.amenities.length === 0 ? (
                  <span className="text-xs text-text-secondary italic">Standard bare-cabin configuration... pure, light, focus!</span>
                ) : (
                  rideState.amenities.map(id => {
                    const amenity = AMENITY_OPTIONS.find(a => a.id === id);
                    return (
                      <span key={id} className="bg-neutral-surface border border-neutral-surface-light text-text-primary px-2.5 py-1 rounded-full text-[10px] font-medium uppercase font-primary">
                        + {amenity?.name.split(' (')[0]}
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-text-primary text-white rounded-card p-5 flex justify-between items-center shadow-card">
            <div>
              <span className="text-[10px] text-[#A8D0C8] font-bold uppercase tracking-wider block font-primary">Service Estimate</span>
              <span className="font-primary text-2xl font-bold text-brand-secondary">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={justAdded}
              className={`font-primary font-bold text-xs tracking-wider px-6 py-3 border-2 border-brand-secondary rounded-md uppercase flex items-center gap-2 transition-all cursor-pointer ${
                justAdded 
                  ? 'bg-emerald-600 border-emerald-500 text-white animate-pulse' 
                  : 'bg-brand-secondary text-text-primary hover:bg-transparent hover:text-brand-secondary'
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={16} /> Ride Scheduled!
                </>
              ) : (
                <>
                  <Navigation size={16} /> Confirm custom Ride
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Customizer Selector Fields */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Cabin Suspension */}
          <div className="space-y-2">
            <span className="font-primary text-xs font-bold tracking-widest text-text-primary uppercase block">1. Choose Cabin Suspension Formula</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CABIN_FORMULAS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setRideState(prev => ({ ...prev, vehicleClass: opt.name }))}
                  className={`p-3.5 text-left border rounded-lg transition-all flex justify-between items-center cursor-pointer ${
                    rideState.vehicleClass === opt.name
                      ? 'border-brand-primary bg-brand-primary/5 shadow-sm'
                      : 'border-neutral-surface bg-white hover:border-text-primary/20'
                  }`}
                >
                  <div className="max-w-[75%]">
                    <span className="font-primary text-xs font-bold text-text-primary block">{opt.name.split(' (')[0]}</span>
                    <span className="text-[10px] text-text-secondary font-secondary block leading-snug">
                      {opt.name.includes('Air-ride') ? 'Double-wishbone velvet pneumatic glide.' : opt.name.includes('Leaf-Spring') ? 'Traditional rigid, responsive steel.' : opt.name.includes('Track Damper') ? 'Stiff, high-feedback precision.' : 'Sensation-free electric magnetic glide.'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {opt.extra > 0 && <span className="text-[10px] bg-brand-secondary text-text-primary font-bold px-1.5 py-0.5 rounded">+${opt.extra.toFixed(2)}</span>}
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      rideState.vehicleClass === opt.name ? 'border-brand-primary bg-brand-primary' : 'border-gray-300'
                    }`}>
                      {rideState.vehicleClass === opt.name && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Seat selection */}
          <div className="space-y-2">
            <span className="font-primary text-xs font-bold tracking-widest text-text-primary uppercase block">2. Select Premium Seat Upholstery</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {RETRO_SEAT_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setRideState(prev => ({ ...prev, driverVibe: opt.name }))}
                  className={`p-3 text-left border rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                    rideState.driverVibe === opt.name
                      ? 'border-brand-primary bg-brand-primary/5 shadow-sm'
                      : 'border-neutral-surface bg-white hover:border-text-primary/20'
                  }`}
                >
                  <div>
                    <span className="font-primary text-xs font-bold block">{opt.name.split(' (')[0]}</span>
                    <span className="text-[9px] text-text-secondary block font-secondary">Hand-stitched finish</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    rideState.driverVibe === opt.name ? 'border-brand-primary bg-brand-primary' : 'border-gray-300'
                  }`}>
                    {rideState.driverVibe === opt.name && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Speed settings / Spiciness */}
          <div className="space-y-2">
            <span className="font-primary text-xs font-bold tracking-widest text-text-primary uppercase block">3. Adjust Route Transit Intensity</span>
            <div className="grid grid-cols-4 gap-2">
              {(['Eco Slow Cruise', 'Standard Safe', 'Express Expresswise', 'Volcano Sprint'] as const).map(lev => (
                <button
                  key={lev}
                  onClick={() => setRideState(prev => ({ ...prev, speedMode: lev }))}
                  className={`py-2 text-center border rounded-lg transition-all font-primary text-xs tracking-wider cursor-pointer font-bold ${
                    rideState.speedMode === lev
                      ? lev === 'Volcano Sprint' 
                        ? 'border-red-600 bg-red-600 text-white shadow-md animate-pulse font-bold' 
                        : 'border-[#C8553D] bg-[#C8553D] text-white shadow-sm'
                      : 'border-neutral-surface bg-white text-text-primary hover:border-text-primary/20'
                  }`}
                >
                  {lev.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities checklist / Toppings */}
          <div className="space-y-2">
            <span className="font-primary text-xs font-bold tracking-widest text-text-primary uppercase block">4. Upgrade With Premium Cabin Options</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {AMENITY_OPTIONS.map(top => {
                const isSelected = rideState.amenities.includes(top.id);
                return (
                  <button
                    key={top.id}
                    onClick={() => handleToggleAmenity(top.id)}
                    className={`p-2.5 text-left border rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-accent-teal-dark bg-accent-teal/15 animate-[pulse_3s_infinite]'
                        : 'border-neutral-surface bg-white hover:border-text-primary/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-accent-teal-dark border-accent-teal-dark text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-primary text-xs font-medium text-text-primary">{top.name}</span>
                    </div>
                    <span className="font-primary text-xs text-brand-primary font-bold">+${top.price.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
