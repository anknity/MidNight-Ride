import { useState, useTransition } from 'react';
import Header from './components/Header';
import BowlCustomizer from './components/BowlCustomizer';
import TableReservationModal from './components/TableReservationModal';
import CartSidebar from './components/CartSidebar';
import ReviewSection from './components/ReviewSection';
import CommunityModal from './components/CommunityModal';

import { INITIAL_RIDE_OPTIONS, INITIAL_REVIEWS } from './data';
import { BookingItem, RideOption, CustomerReview, ScheduledRide } from './types';
import { 
  Car, Eye, Sparkles, Navigation, CalendarDays, MapPin, 
  HelpCircle, Printer, Heart, Star, Shield, ArrowUpRight, 
  ChevronRight, Compass, MessageSquareCode
} from 'lucide-react';

export default function App() {
  // State elements
  const [rideOptions] = useState<RideOption[]>(INITIAL_RIDE_OPTIONS);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [cart, setCart] = useState<BookingItem[]>([]);
  const [reservations, setReservations] = useState<ScheduledRide[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'standard' | 'premium' | 'hourly' | 'side' | 'beverage'>('all');

  // Modal displays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  // Helper selectors
  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'menu') {
      document.getElementById('menu-anchor')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'locations') {
      document.getElementById('locations-anchor')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'contact') {
      document.getElementById('footer-anchor')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'customizer') {
      document.getElementById('customizer-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddSimpleItemToCart = (item: RideOption) => {
    setCart(prev => {
      const match = prev.find(c => c.rideOption.id === item.id && !c.customizations);
      if (match) {
        return prev.map(c => c.bookingId === match.bookingId ? { ...c, passengers: c.passengers + 1 } : c);
      }
      const newBookingItem: BookingItem = {
        bookingId: `${item.id}-${Date.now()}`,
        rideOption: item,
        passengers: 1
      };
      return [...prev, newBookingItem];
    });

    // Automatically trigger cart reveal to delight the passenger
    setIsCartOpen(true);
  };

  const handleAddCustomBowlToCart = (customBookingItem: BookingItem) => {
    setCart(prev => [...prev, customBookingItem]);
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (bookingId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.bookingId === bookingId) {
          const newQty = item.passengers + delta;
          return { ...item, passengers: newQty < 1 ? 1 : newQty };
        }
        return item;
      });
    });
  };

  const handleRemoveCartItem = (bookingId: string) => {
    setCart(prev => prev.filter(c => c.bookingId !== bookingId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleRegisterReview = (newRev: CustomerReview) => {
    setReviews(prev => [newRev, ...prev]);
  };

  const handleRegisterReservation = (newRes: ScheduledRide) => {
    setReservations(prev => [newRes, ...prev]);
  };

  const cartTotalQty = cart.reduce((sum, item) => sum + item.passengers, 0);

  // Filter menu items on search and category tab
  const filteredRideOptions = rideOptions.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-text-primary selection:bg-brand-secondary selection:text-text-primary">
      
      {/* Dynamic Nav Header */}
      <Header 
        cartCount={cartTotalQty} 
        onCartOpen={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
        onSearchToggle={(val) => {
          setSearchQuery(val);
          if (val) handleScrollToSection('menu');
        }}
      />

      {/* Main Container Area */}
      <main className="max-w-[1200px] mx-auto px-5 pt-5 pb-12 space-y-12">
        
        {/* Section 1: Hero presentation grid */}
        <section id="hero-section" className="animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4">
            
            {/* Left Column Box */}
            <div className="flex flex-col gap-4">
              {/* Main Callout Box */}
              <div className="bg-neutral-surface rounded-card p-8 md:p-12 flex flex-col justify-center h-full border border-neutral-surface/50">
                <span className="text-brand-primary font-primary font-bold text-sm tracking-widest uppercase mb-2">NOW DISPATCHING 24/7 MIDNIGHT COMMUTES</span>
                <h1 className="font-primary text-4xl md:text-5xl lg:text-[3.8rem] leading-[0.95] mb-5 text-text-primary uppercase font-bold">
                  The ultimate luxury safe return ride after dark.
                </h1>
                <p className="text-text-secondary text-xs md:text-sm leading-relaxed max-w-[90%] mb-8">
                  Sandalwood custom aromatherapy, quiet comfort partitions, and uniform-clad professional chauffeurs. Comforting the late-night professional and safe return seeker, dispatched instantly to your exact coordinates.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => handleScrollToSection('menu')}
                    className="font-primary font-bold text-xs tracking-wider px-8 py-3.5 border-2 border-text-primary bg-text-primary text-white hover:bg-transparent hover:text-text-primary transition-all uppercase cursor-pointer"
                  >
                    Request Live Dispatch
                  </button>
                  <button 
                    onClick={() => handleScrollToSection('customizer')}
                    className="font-primary font-bold text-xs tracking-wider px-8 py-3.5 border-2 border-text-primary bg-transparent text-text-primary hover:bg-text-primary hover:text-white transition-all uppercase cursor-pointer"
                  >
                    Custom Cabin Architect
                  </button>
                </div>
              </div>

              {/* Sub Interaction Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1: Hourly packs */}
                <div 
                  onClick={() => {
                    setSelectedCategory('hourly');
                    handleScrollToSection('menu');
                  }}
                  className="bg-brand-secondary rounded-card p-6 min-h-[190px] relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all border border-brand-secondary/40"
                >
                  <div className="flex justify-between items-start z-10">
                    <h3 className="font-primary text-2xl leading-[0.95] text-text-primary font-bold">HOURLY<br />PACKS</h3>
                    <div className="w-9 h-9 border-2 border-text-primary rounded-full flex items-center justify-center text-text-primary group-hover:bg-text-primary group-hover:text-white transition-all">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                  <span className="text-[10px] text-text-secondary z-10 uppercase font-bold">Reserve dedicated caddies • Click to view</span>
                  <img 
                    src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=300" 
                    className="absolute -bottom-5 -right-3 w-32 transform -rotate-12 transition-transform duration-500 group-hover:rotate-0 scale-105" 
                    alt="Hourly chauffeur"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Card 2: Schedule caddy */}
                <div 
                  onClick={() => setIsReservationOpen(true)}
                  className="bg-brand-primary rounded-card p-6 min-h-[190px] relative overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all border border-brand-primary/40 text-white"
                >
                  <div className="flex justify-between items-start z-10">
                    <h3 className="font-primary text-2xl leading-[0.90] font-bold">SCHEDULE<br />A RIDE</h3>
                    <div className="w-9 h-9 border-2 border-white rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-brand-primary transition-all">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                  <span className="text-[10px] text-brand-secondary/80 z-10 uppercase font-bold">Reserve executive cruisers or retro open-air tuktuks</span>
                  <img 
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=300" 
                    className="absolute -bottom-5 -right-3 w-32 transform -rotate-12 transition-transform duration-500 group-hover:rotate-0 scale-105" 
                    alt="Schedule ride"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Right Column Large Banner Image */}
            <div className="hidden lg:block rounded-card overflow-hidden relative border border-gray-100 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover select-none" 
                alt="Moist luxury car cockpit twilight night lights"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-5 right-5 bg-brand-primary text-white text-[10px] font-bold tracking-widest py-1.5 px-3 uppercase rounded">
                Active 24 Hours
              </div>
            </div>

          </div>
        </section>

        {/* Section 2: Fleet standards and logs */}
        <section className="space-y-4">
          
          {/* Dispatch pill block */}
          <div className="bg-neutral-surface rounded-card px-5 py-4 flex justify-between items-center text-brand-primary border border-neutral-surface-light">
            <span className="font-primary font-bold text-xs md:text-sm tracking-widest uppercase flex items-center gap-1.5">
              <Sparkles size={14} /> CERTIFIED SOVIET/JAPANESE ERGONOMICS & NOCTURNAL COMMUTE SAFETY
            </span>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                handleScrollToSection('menu');
              }}
              className="font-primary text-xs font-bold tracking-wider hover:underline uppercase transition-all"
            >
              See Fleet Specifications
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-4 items-stretch">
            
            {/* Left Block: Technical points */}
            <div className="grid grid-cols-2 gap-2.5 h-full">
              {/* Feature 1 */}
              <div className="bg-neutral-surface rounded-card p-4 flex flex-col justify-between h-full min-h-[150px] hover:scale-[1.01] transition-transform">
                <Compass className="text-brand-primary h-5 w-5 mb-2" />
                <div>
                  <h4 className="font-primary text-xs font-bold leading-tight mb-1 text-text-primary uppercase">Double-Wishbone<br />Velvet Air-Ride</h4>
                  <p className="text-[10px] text-text-secondary leading-tight">Advanced pneumatic shock absorption ensuring complete vibration immunity.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="bg-neutral-surface rounded-card p-4 flex flex-col justify-between h-full min-h-[150px] hover:scale-[1.01] transition-transform">
                <Shield className="text-brand-primary h-5 w-5 mb-2" />
                <div>
                  <h4 className="font-primary text-xs font-bold leading-tight mb-1 text-text-primary uppercase">Zero-Tolerance<br />Sobriety</h4>
                  <p className="text-[10px] text-text-secondary leading-tight">Biometric ignition locks requiring mandatory driver diagnostics every turn.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="bg-neutral-surface rounded-card p-4 flex flex-col justify-between h-full min-h-[150px] hover:scale-[1.01] transition-transform">
                <Heart className="text-brand-primary h-5 w-5 mb-2" />
                <div>
                  <h4 className="font-primary text-xs font-bold leading-tight mb-1 text-text-primary uppercase">Matcha &<br />Aroma Air</h4>
                  <p className="text-[10px] text-text-secondary leading-tight">Fresh organic Uji matcha energy shots and sandalwood mists onboard.</p>
                </div>
              </div>
              {/* Feature 4 */}
              <div className="bg-neutral-surface rounded-card p-4 flex flex-col justify-between h-full min-h-[150px] hover:scale-[1.01] transition-transform">
                <Sparkles className="text-brand-primary h-5 w-5 mb-2" />
                <div>
                  <h4 className="font-primary text-xs font-bold leading-tight mb-1 text-text-primary uppercase">Starlink Wi-Fi<br />& Chargers</h4>
                  <p className="text-[10px] text-text-secondary leading-tight">High-speed terminal networks and integrated cords for continuous connectivity.</p>
                </div>
              </div>
            </div>

            {/* Center Block: High precision illustration */}
            <div className="bg-brand-secondary rounded-card overflow-hidden relative min-h-[300px] h-full border border-brand-secondary shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800" 
                className="absolute inset-0 w-full h-full object-cover select-none saturate-90 brightness-95" 
                alt="Elite chauffeur driving luxury carriage night lights dashboard"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="text-[9px] uppercase font-bold text-brand-secondary block tracking-widest font-primary">Master Fleet Chauffeur</span>
                  <h3 className="font-primary text-lg font-bold uppercase">"Silence & the Glide"</h3>
                </div>
              </div>
            </div>

            {/* Right Block: Taxi ride list */}
            <div className="flex flex-col gap-2 h-full justify-between">
              <div 
                onClick={() => handleAddSimpleItemToCart(rideOptions[0])}
                className="bg-neutral-surface rounded-card p-3.5 flex items-center gap-3.5 flex-1 cursor-pointer hover:bg-neutral-surface/80 hover:shadow-xs transition-all border border-neutral-surface/30"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=150" 
                    className="w-full h-full object-cover" 
                    alt="Sovereign Sedan"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-primary text-xs font-bold uppercase text-text-primary">Sovereign Sedan</h4>
                    <span className="font-primary text-xs text-brand-primary font-bold ml-2">$15.50</span>
                  </div>
                  <p className="text-[10px] text-text-secondary leading-normal">Premium pneumatic air ride caddy caddie. Click to add.</p>
                </div>
              </div>

              <div 
                onClick={() => handleAddSimpleItemToCart(rideOptions[1])}
                className="bg-neutral-surface rounded-card p-3.5 flex items-center gap-3.5 flex-1 cursor-pointer hover:bg-neutral-surface/80 hover:shadow-xs transition-all border border-neutral-surface/30"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=150" 
                    className="w-full h-full object-cover" 
                    alt="Volcano Sporty"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-primary text-xs font-bold uppercase text-text-primary">Volcano Express</h4>
                    <span className="font-primary text-xs text-brand-primary font-bold ml-2">$18.50</span>
                  </div>
                  <p className="text-[10px] text-text-secondary leading-normal">Rapid transit intercity charger with sports setup.</p>
                </div>
              </div>

              <div 
                onClick={() => handleAddSimpleItemToCart(rideOptions[2])}
                className="bg-neutral-surface rounded-card p-3.5 flex items-center gap-3.5 flex-1 cursor-pointer hover:bg-neutral-surface/80 hover:shadow-xs transition-all border border-neutral-surface/30"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=150" 
                    className="w-full h-full object-cover" 
                    alt="Kyoto EV"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-primary text-xs font-bold uppercase text-text-primary">Electric Whisper</h4>
                    <span className="font-primary text-xs text-brand-primary font-bold ml-2">$15.00</span>
                  </div>
                  <p className="text-[10px] text-text-secondary leading-normal">Ultra quiet EV with active sandalwood diffuser.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Nostalgia Banner block */}
        <section className="bg-accent-teal rounded-card p-8 md:p-12 text-center relative overflow-hidden border border-accent-teal shadow-xs">
          <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-white/20 blur-xl" />
          <h2 className="font-primary text-xl md:text-3xl leading-snug text-text-primary uppercase font-bold relative z-10">
            Midnight Rides 
            <Car className="inline-block w-8 h-8 text-brand-primary mx-2 align-middle" /> 
            are premium, nostalgic, and quiet — a safe retreat where 
            <Star className="inline-block text-brand-secondary h-6 w-6 mx-1.5 align-middle fill-brand-secondary" /> 
            slow moments, soothing starlight roofs, and timeless comfort come alive.
          </h2>
        </section>

        {/* Live customizer workshop */}
        <section id="builder">
          <BowlCustomizer onAddCustomBowl={handleAddCustomBowlToCart} />
        </section>

        {/* Section 4: Dynamic Top Picks filter catalog grid */}
        <section id="menu-anchor" className="space-y-6 pt-5">
          <div className="bg-brand-primary text-white text-center py-3.5 rounded-t-card font-primary font-bold tracking-widest uppercase text-sm">
            Top Picks Just For You • Premium Dispatch Fleet
          </div>

          {/* Filter Categories tab links */}
          <div className="flex flex-wrap justify-center gap-2 bg-neutral-surface p-2 rounded-b-card border-x border-b border-neutral-surface/30">
            {([
              { id: 'all', label: 'All Fleet & Gear' },
              { id: 'standard', label: 'Cruiser Sedans' },
              { id: 'premium', label: 'Luxury Specials' },
              { id: 'hourly', label: 'Hourly Chauffeurs' },
              { id: 'side', label: 'Comfort Add-Ons' },
              { id: 'beverage', label: 'Onboard Drinks' }
            ] as const).map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`font-primary font-bold text-xs px-5 py-2 rounded-md uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-[#222] hover:bg-neutral-cream'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Catalog items grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRideOptions.length === 0 ? (
              <div className="col-span-3 text-center py-16 text-text-secondary italic">
                No fleet vehicles or packages matching your keyword. Try "Sovereign", "Whisper", "Matcha", or "Pillow".
              </div>
            ) : (
              filteredRideOptions.map(item => (
                <div 
                  key={item.id} 
                  className="bg-neutral-surface rounded-card p-6 flex flex-col relative group hover:shadow-md transition-shadow duration-300 border border-neutral-surface/40 hover:scale-[1.01] transition-transform animate-fadeIn"
                >
                  {/* Category labels */}
                  {item.tags?.map((tg, idx) => (
                    <span 
                      key={idx}
                      className={`absolute top-5 left-5 text-[9px] font-bold px-3 py-1 uppercase tracking-wider z-10 ${
                        tg.includes('Seller') || tg.includes('Premium') ? 'bg-brand-primary text-white' : 'bg-white text-text-primary border'
                      }`}
                    >
                      {tg}
                    </span>
                  ))}

                  {/* Vehicle Images */}
                  <div className="h-56 w-full rounded overflow-hidden mb-4 relative">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      alt={item.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-primary text-xl font-bold mb-2 text-text-primary uppercase leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-text-secondary text-xs leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#222]/10 flex justify-between items-center">
                      <span className="font-primary font-bold text-lg text-[#222]">
                        ${item.price.toFixed(2)}
                        {item.category === 'standard' || item.category === 'premium' ? <span className="text-xs font-normal text-gray-500"> / km rate</span> : null}
                      </span>
                      <button 
                        onClick={() => handleAddSimpleItemToCart(item)}
                        className="bg-transparent border-2 border-text-primary text-[#222] px-4 py-1.5 text-xs font-bold uppercase hover:bg-text-primary hover:text-white transition-colors cursor-pointer"
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Section 5: Takeout Promo full width row */}
        <section className="bg-neutral-surface/40 border border-neutral-surface rounded-card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-primary rounded-card p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
              <h2 className="font-primary text-4xl md:text-5xl leading-[0.9] font-bold mb-6 uppercase">The Midnight dispatch is Active</h2>
              <p className="text-xs md:text-sm font-secondary opacity-90 max-w-[85%] mb-8 leading-relaxed">
                Working late shift or wrapping up client dinners? Our luxury vehicle network is active until 3:00 AM with climate-controlled, aromatherapy cabins that shield you from city noise. Slurp in silence, commute in absolute peace.
              </p>
              
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  handleScrollToSection('menu');
                }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-primary font-bold text-xs uppercase tracking-wider bg-transparent hover:bg-white hover:text-brand-primary transition-colors w-fit cursor-pointer"
              >
                Request Dispatch Now
              </button>
              
              {/* Deco Circles */}
              <div className="absolute -bottom-10 right-5 flex select-none pointer-events-none">
                <div className="w-24 h-24 bg-brand-secondary/40 rounded-full -mr-8" />
                <div className="w-24 h-24 bg-brand-secondary/45 rounded-full" />
              </div>
            </div>
            
            <div className="h-[280px] md:h-auto overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=60" 
                className="w-full h-full object-cover" 
                alt="Chauffeur sedan rear seats clean visual"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Reviews section */}
        <section>
          <ReviewSection reviews={reviews} onAddReview={handleRegisterReview} />
        </section>

        {/* Section 6: Join Community alert banner */}
        <section className="bg-brand-primary rounded-card p-10 text-center text-white relative overflow-hidden flex flex-col items-center justify-center border border-brand-primary/50">
          <span className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-brand-secondary/40 rounded-full select-none" />
          <span className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[160px] h-[160px] bg-brand-secondary/40 rounded-full select-none" />

          <h2 className="relative z-10 font-primary text-2xl md:text-3xl mb-3 uppercase font-bold max-w-xl">
            Opt in for exclusive taxi vouchers and VIP caddy promotions
          </h2>
          <p className="relative z-10 text-xs md:text-sm opacity-90 mb-6 max-w-md">
            No spam. We only transmit VIP discount codes and holiday schedule operations.
          </p>
          <button 
            onClick={() => setIsCommunityOpen(true)}
            className="relative z-10 bg-[#FDF8E8] text-text-primary border-none px-8 py-3.5 rounded-full font-primary font-bold text-sm uppercase cursor-pointer hover:scale-105 transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <MessageSquareCode className="text-brand-primary h-5 w-5" /> Gain VIP Passenger status
          </button>
        </section>

        {/* Section 7: preparation guide dynamic steps row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-[#A8D0C8] rounded-card p-8 flex flex-col justify-center border border-accent-teal/60">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent-teal-dark mb-6 text-xl shadow-xs">
              <Car className="h-6 w-6 stroke-teal-800" />
            </div>
            <h2 className="text-accent-teal-dark font-primary text-2xl leading-tight mb-4 uppercase font-bold">
              The Safe Cabin<br />Commute Guide
            </h2>
            <div className="border-t border-black/10 pt-2 space-y-2 text-xs font-primary text-accent-teal-dark uppercase tracking-wider">
              <div className="border-b border-black/10 pb-2 flex items-center gap-2">
                <span className="font-mono text-sm">01</span> Board with zero friction or noise.
              </div>
              <div className="border-b border-black/10 pb-2 flex items-center gap-2">
                <span className="font-mono text-sm">02</span> Hook up your device to chargers.
              </div>
              <div className="pt-0 flex items-center gap-2">
                <span className="font-mono text-sm">03</span> Select quiet or starlight audio mode.
              </div>
            </div>
          </div>

          <div className="rounded-card overflow-hidden h-[260px] md:h-auto border border-gray-100 shadow-xs">
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-full object-cover" 
              alt="Luxury dark sport car taillight bokeh lights road view"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="bg-accent-teal-dark rounded-card p-8 flex flex-col justify-center items-center text-center relative overflow-hidden text-white border border-accent-teal-dark">
            <div className="absolute -top-5 -right-5 w-[100px] h-[100px] border-[20px] border-white/20 rounded-full select-none" />
            <Sparkles className="h-10 w-10 text-brand-secondary mb-4 animate-bounce" />
            <h2 className="relative z-10 font-primary text-xl md:text-2xl uppercase mb-6 leading-snug font-bold">
              Join our exclusive<br />VIP rewards program
            </h2>
            <button 
              onClick={() => setIsCommunityOpen(true)}
              className="relative z-10 bg-white text-text-primary px-6 py-3 rounded-full text-xs font-bold font-primary tracking-wider flex items-center gap-2 hover:bg-brand-secondary transition-all cursor-pointer uppercase shadow-sm"
            >
              Take Action Now <ChevronRight size={14} />
            </button>
          </div>

        </section>

        {/* Dispatch Terminals Display */}
        <section id="locations-anchor" className="space-y-4 pt-5">
          <div className="bg-neutral-surface rounded-card p-6 md:p-8 border border-neutral-surface">
            <div className="text-center mb-6">
              <span className="text-brand-primary text-xs uppercase tracking-widest font-primary block mb-1">STRATEGIC TERMINAL CENTERS</span>
              <h3 className="font-primary text-2xl font-bold uppercase text-text-primary">OUR PHYSICAL DISPATCH HUBS</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-white rounded p-5 space-y-2 border border-[#222]/10 shadow-xs animate-fadeIn">
                <div className="flex justify-between items-center pb-2 border-b border-[#222]/5">
                  <h4 className="font-primary text-base font-bold text-brand-primary uppercase">Kolkata Park Street Hub (Flagship)</h4>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded font-primary tracking-wider">ACTIVE INGRESS</span>
                </div>
                <p className="text-text-secondary">
                  <strong>Location:</strong> Shop 45, Park Street, Kolkata, West Bengal, 700016
                </p>
                <p className="text-text-secondary">
                  <strong>Active Hours:</strong> Mon - Sun: 5:00 PM - 3:00 AM
                </p>
                <p className="text-text-secondary">
                  <strong>Status:</strong> Instant dispatch • 12 active cruisers
                </p>
              </div>

              <div className="bg-white rounded p-5 space-y-2 border border-[#222]/10 shadow-xs animate-fadeIn">
                <div className="flex justify-between items-center pb-2 border-b border-[#222]/5">
                  <h4 className="font-primary text-base font-bold text-brand-primary uppercase">Salt Lake Sector V Tech Hub</h4>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded font-primary tracking-wider">ACTIVE INGRESS</span>
                </div>
                <p className="text-text-secondary">
                  <strong>Location:</strong> Block EP-GP, Salt Lake, Kolkata, West Bengal, 700091
                </p>
                <p className="text-text-secondary">
                  <strong>Active Hours:</strong> Mon - Sun: 6:00 PM - 2:00 AM
                </p>
                <p className="text-text-secondary">
                  <strong>Status:</strong> Instant dispatch • 8 electric whisper vehicles
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="footer-anchor" className="bg-[#4A3B32] text-gray-300 pt-16 pb-10 rounded-t-card">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center text-white font-primary text-4xl mb-10 pb-5 border-b border-white/10 uppercase tracking-widest font-bold">
            GET IN TOUCH
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 text-center md:text-left">
            
            {/* Address */}
            <div className="space-y-4">
              <p className="text-xs md:text-sm leading-relaxed">
                <strong className="text-white">Shop 45, Park Street Dispatch,</strong><br />
                Kolkata, West Bengal,<br />
                India, 700016
              </p>
              <div className="flex justify-center md:justify-start gap-4 text-white">
                <a href="#instagram" className="hover:text-brand-secondary transition-colors" title="Instagram Link"><Compass size={20} /></a>
                <a href="#twitter" className="hover:text-brand-secondary transition-colors" title="Twitter Link"><Navigation size={20} /></a>
              </div>
            </div>
            
            {/* Top Return */}
            <button 
              onClick={() => handleScrollToSection('home')}
              className="text-5xl text-white hover:text-brand-secondary transition-colors cursor-pointer"
              title="Return to top"
            >
              <Car className="h-12 w-12 text-brand-secondary animate-bounce max-w-[80px] mx-auto" />
            </button>

            {/* Links columns */}
            <ul className="flex gap-12 md:gap-16 text-right text-xs">
              <div className="space-y-2">
                <li onClick={() => handleScrollToSection('home')} className="hover:text-white cursor-pointer transition-colors">Our Standard</li>
                <li onClick={() => handleScrollToSection('menu')} className="hover:text-white cursor-pointer transition-colors">Fleet Fleet</li>
                <li onClick={() => setIsReservationOpen(true)} className="hover:text-white cursor-pointer transition-colors">Schedule dispatcher</li>
              </div>
              <div className="space-y-2">
                <li onClick={() => setIsCommunityOpen(true)} className="hover:text-white cursor-pointer transition-colors">Vouchers & Vibe</li>
                <li onClick={() => alert('Midnight Rides respects your late night security. Safe transit protocols are active.')} className="hover:text-white cursor-pointer transition-colors">FAQs & Policy</li>
              </div>
            </ul>

          </div>

          <div className="text-center text-[10px] text-gray-400 mt-12 pt-4 border-t border-white/5 font-primary tracking-wider uppercase">
            © 2026 MIDNIGHT RIDES • CERTIFIED LUXURY NOCTURNAL COMMUTE
          </div>
        </div>
      </footer>

      {/* Modals & side bars */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <TableReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)}
        onAddReservation={handleRegisterReservation}
      />

      <CommunityModal 
        isOpen={isCommunityOpen} 
        onClose={() => setIsCommunityOpen(false)}
      />

    </div>
  );
}
