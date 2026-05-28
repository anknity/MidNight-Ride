import { useState, useTransition } from 'react';
import Header from './components/Header';
import TableReservationModal from './components/TableReservationModal';
import CartSidebar from './components/CartSidebar';
import ReviewSection from './components/ReviewSection';
import CommunityModal from './components/CommunityModal';

import { INITIAL_RIDE_OPTIONS, INITIAL_REVIEWS, HUBS_LIST } from './data';
import { BookingItem, RideOption, CustomerReview, ScheduledRide } from './types';
import { 
  Car, Eye, Sparkles, Navigation, CalendarDays, MapPin, 
  HelpCircle, Printer, Heart, Star, Shield, ArrowUpRight, 
  ChevronRight, Compass, MessageSquareCode
} from 'lucide-react';

// ==================== INTERACTIVE WOMEN-SAFETY ALARM WIDGET SIMULATOR ====================
function SOSAlarmWidget() {
  const [sosState, setSosState] = useState<'idle' | 'triggering' | 'active'>('idle');
  const [countdown, setCountdown] = useState(5);
  const [timerId, setTimerId] = useState<any>(null);

  const startSOS = () => {
    setSosState('triggering');
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(interval);
          setSosState('active');
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    setTimerId(interval);
  };

  const cancelSOS = () => {
    if (timerId) clearInterval(timerId);
    setSosState('idle');
    setCountdown(5);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-2">
      {sosState === 'idle' && (
        <div className="space-y-3 flex flex-col items-center">
          <button 
            onClick={startSOS}
            className="w-24 h-24 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-primary font-bold text-lg flex items-center justify-center border-4 border-rose-300 shadow-md animate-pulse cursor-pointer uppercase transition-transform hover:scale-105 active:scale-95"
            title="Trigger SOS Alarm"
          >
            SOS
          </button>
          <span className="text-[11px] text-text-secondary leading-normal">
            Trigger check-in and location stream simulation.
          </span>
        </div>
      )}

      {sosState === 'triggering' && (
        <div className="space-y-4 flex flex-col items-center w-full animate-pulse">
          <div className="w-24 h-24 rounded-full bg-orange-500 text-white font-primary font-bold text-3xl flex flex-col items-center justify-center border-4 border-orange-200">
            <span>{countdown}</span>
            <span className="text-[8px] tracking-widest uppercase">Secs</span>
          </div>
          <div className="space-y-1 text-center">
            <span className="text-xs font-bold text-orange-600 uppercase block animate-bounce">Broadcasting Geolocation Coordinates...</span>
            <button 
              onClick={cancelSOS}
              className="text-[10px] font-semibold text-text-primary underline uppercase hover:text-rose-600"
            >
              Cancel Alert
            </button>
          </div>
        </div>
      )}

      {sosState === 'active' && (
        <div className="space-y-4 flex flex-col items-center w-full">
          <div className="w-24 h-24 rounded-full bg-rose-700 text-white font-primary font-bold text-xs flex flex-col items-center justify-center border-4 border-rose-300 animate-ping">
            <span className="font-extrabold uppercase">ACTIVE SOS</span>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center space-y-1.5 w-full">
            <span className="text-rose-600 font-bold block text-xs animate-pulse">🚨 EMERGENCY TELEMETRY LOCK ON!</span>
            <p className="text-[10px] text-text-secondary leading-snug">
              Continuous location SMS broadcast dispatched to custom contacts! Secure Sentinel Patrol cruiser en-route.
            </p>
            <button 
              onClick={cancelSOS}
              className="bg-rose-600 hover:bg-rose-700 text-white font-primary font-semibold text-[10px] py-1.5 px-4 uppercase rounded transition-colors cursor-pointer"
            >
              Clear Alarm State
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  // State elements
  const [rideOptions] = useState<RideOption[]>(INITIAL_RIDE_OPTIONS);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [cart, setCart] = useState<BookingItem[]>([]);
  const [reservations, setReservations] = useState<ScheduledRide[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bike' | 'auto' | 'cab'>('all');

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

        {/* ==================== INR / WOMEN-SAFETY SERVICE SELECTOR GRID (Image 1) ==================== */}
        <section id="services-selector" className="space-y-6 pt-4 animate-slideUp">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-brand-primary font-primary font-bold text-xs tracking-widest uppercase block mb-1">Interactive Booking Desk</span>
              <h2 className="font-primary text-3xl md:text-4xl text-text-primary uppercase font-bold tracking-tight">Our Core Offerings</h2>
              <p className="text-xs text-text-secondary leading-relaxed max-w-xl">
                Click any service block below to instantly load matching safe fleets down below, pre-equipped with our premium Pink Shield safety diagnostics and vetted captains.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold font-primary px-3 py-1.5 rounded-full tracking-wider uppercase shadow-xs w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping inline-block" />
              Pink Shield active: {HUBS_LIST.length} Kolkata Zones Protected
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'bike', title: 'Safe Bike-Taxi', desc: 'Secure, verified pilot with full ISI helmet support', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=400', badge: 'Women Priority Match', safety: 'GPS Tracked' },
              { id: 'bike', title: 'Midnight Express', desc: 'Express late-shift two-wheeler transit', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400', badge: 'Active Location Sharing', safety: 'Vetted Pilot' },
              { id: 'bike', title: 'Electric Scooter', desc: 'Ultra-quiet eco cruising with backup premium support', img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=400', badge: 'Eco Protective Shield', safety: 'Pink Shield' },
              { id: 'bike', title: 'Highway Cruiser', desc: 'Secure highway cruiser pillion for city bypass', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400', badge: 'Double Shock Cushioning', safety: '24/7 Patrol Guard' },
              { id: 'auto', title: 'Pink-Shield Auto', desc: 'Enclosed three-wheel commuter autos for family peace', img: 'https://images.unsplash.com/photo-1566008889975-f286f4553e20?auto=format&fit=crop&q=80&w=400', badge: 'Female Captain Option', safety: 'Panic Alarm' },
              { id: 'cab', title: 'Queen Cabin Cab', desc: 'Premium privacy car with physical partition screen', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400', badge: 'Dual SOS Remote Link', safety: 'VIP Escort' }
            ].map(srv => {
              const isActive = selectedCategory === srv.id;
              return (
                <div 
                  key={srv.title}
                  onClick={() => {
                    setSelectedCategory(srv.id as any);
                    handleScrollToSection('menu');
                  }}
                  className={`group relative h-48 rounded-2xl border p-5 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'bg-neutral-cream border-brand-primary shadow-md ring-2 ring-brand-primary/20' 
                      : 'bg-[#F9FAFB] hover:bg-white border-neutral-surface hover:border-brand-primary hover:shadow-lg'
                  }`}
                >
                  {/* Text on left */}
                  <div className="z-10 max-w-[65%] space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="bg-[#C8553D] text-[#FFF] text-[8px] font-bold tracking-widest px-1.5 py-0.5 rounded uppercase font-primary block">
                        {srv.safety}
                      </span>
                    </div>

                    <h3 className="font-primary text-2xl font-bold uppercase text-text-primary leading-[0.95] group-hover:text-brand-primary transition-colors pt-1">
                      {srv.title}
                    </h3>
                    <p className="text-[11px] text-text-secondary leading-snug font-medium pt-0.5">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Safety details badge at bottom */}
                  <div className="z-10 bg-[#FFF] border border-neutral-surface text-[9px] font-bold uppercase tracking-wider text-[#222] px-2.5 py-1 rounded-full w-fit">
                    🛡️ {srv.badge}
                  </div>

                  {/* Overlapping rounded image on right */}
                  <div className="absolute top-4 right-[-15px] w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-md z-0 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                    <img 
                      src={srv.img} 
                      className="w-full h-full object-cover" 
                      alt={srv.title}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================== ACTIVE WOMEN-SAFETY SOS COMMAND & PATROL UNIT PANEL ==================== */}
        <section id="sos-controller" className="bg-[#FFFDF4] border-4 border-brand-primary rounded-card p-6 md:p-8 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-[25%] bg-gradient-to-l from-brand-primary/5 to-transparent pointer-events-none pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#222] font-primary block leading-none">
                  🔐 SECURE PASSENGER PATROL CORRIDOR ACTIVE (WEST BENGAL & KOLKATA)
                </span>
              </div>

              <h2 className="font-primary text-2xl md:text-3xl font-bold uppercase text-text-primary leading-tight">
                24/7 Pink-Shield Sentinel Support
              </h2>
              
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed max-w-[95%]">
                Our operations guarantee double-layer verification. Should you feel concerned at any point during a late night travel, trigger the instant dispatch simulated SOS switch. Our Command Desk will immediately initiate continuous video/audio listening, lock your vehicle speed, and live-alert Kolkata central patrol grids.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-bold font-primary uppercase tracking-wider text-text-primary pt-1">
                <span className="flex items-center gap-1.5 bg-white border border-neutral-surface px-3 py-2 rounded">
                  ✅ 100% Verified Female Captain Matches Option
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-neutral-surface px-3 py-2 rounded">
                  ✅ Live-Time Audio Compartment Partitions
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-neutral-surface px-3 py-2 rounded">
                  ✅ Satellite Secured High Frequency GPS Track
                </span>
                <span className="flex items-center gap-1.5 bg-white border border-neutral-surface px-3 py-2 rounded">
                  ✅ Active Mobile Geolocation Auto-SMS Dispatch
                </span>
              </div>
            </div>

            {/* Interactive SOS Trigger Panel with Simulation */}
            <div className="bg-white border-2 border-brand-primary/20 rounded-xl p-5 flex flex-col items-center text-center space-y-4 shadow-sm relative">
              <span className="text-[9px] uppercase font-bold tracking-widest text-rose-600 block bg-rose-50 px-2.5 py-1 rounded">
                SIMULATOR EMERGENCY TRIGGER
              </span>

              {/* State controller for simulation */}
              <SOSAlarmWidget />
            </div>

          </div>
        </section>

        {/* ==================== WHAT WE OFFER PROMO SECTION (Image 2) ==================== */}
        <section id="offers-promotional" className="space-y-6 pt-4 animate-fadeIn">
          <div className="text-center max-w-xl mx-auto mb-4 font-primary text-text-primary">
            <span className="text-brand-primary font-primary font-bold text-xs tracking-widest uppercase block mb-1">PROMOTIONAL OFFERINGS</span>
            <h2 className="font-primary text-3xl md:text-4xl text-text-primary uppercase font-bold tracking-tight">WHAT WE OFFER</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Safe, affordable, and incredibly reliable transport services engineered for everyday late-night commutations and female-travel privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Quick Pickup',
                desc: 'Pickups within minutes that help you save time on every ride. A Pink-Shield safe auto, bike-taxi or premium cab cruiser is always nearby when you need to get moving.',
                img: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=400'
              },
              {
                title: 'Best Fares',
                desc: 'Affordable prices designed for everyday rides. Travel more files or commutes, spend less without compromising on premium comfort or live monitoring telemetry.',
                img: 'https://images.unsplash.com/photo-1511289081367-46c54b57c82c?auto=format&fit=crop&q=80&w=400'
              },
              {
                title: 'Never Too Far',
                desc: 'Present across 400+ cities and counting. Wherever you go, find a secure, reliable ride close by with active SOS corridors and vetted captain support.',
                img: 'https://images.unsplash.com/photo-1469037552275-d4d54ab65557?auto=format&fit=crop&q=80&w=400'
              }
            ].map((off, idx) => (
              <div 
                key={idx}
                className="bg-white border border-neutral-surface hover:border-brand-primary rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Visual Card image with subtle rounded frame inside */}
                <div className="h-44 w-full overflow-hidden relative">
                  <img 
                    src={off.img} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    alt={off.title}
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-primary text-lg font-bold uppercase text-text-primary">
                      {off.title}
                    </h3>
                    <p className="text-[11px] text-text-secondary leading-relaxed">
                      {off.desc}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setSelectedCategory('all');
                      handleScrollToSection('menu');
                    }}
                    className="text-[11px] font-bold font-primary uppercase tracking-wider text-[#C8553D] hover:text-[#222] transition-colors border-t pt-2 w-full text-left flex items-center justify-between"
                  >
                    <span>Request Fleet Match Now</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
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
                    src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=150" 
                    className="w-full h-full object-cover" 
                    alt="Sovereign Sedan"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-primary text-xs font-bold uppercase text-text-primary text-left">Safe Shield Bike</h4>
                    <span className="font-primary text-xs text-brand-primary font-bold ml-2">₹45.00</span>
                  </div>
                  <p className="text-[10px] text-text-secondary leading-normal text-left">ISI helmet for women, vetted rider. Click to add.</p>
                </div>
              </div>

              <div 
                onClick={() => handleAddSimpleItemToCart(rideOptions[2])}
                className="bg-neutral-surface rounded-card p-3.5 flex items-center gap-3.5 flex-1 cursor-pointer hover:bg-neutral-surface/80 hover:shadow-xs transition-all border border-neutral-surface/30"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1566008889975-f286f4553e20?auto=format&fit=crop&q=80&w=150" 
                    className="w-full h-full object-cover" 
                    alt="Kyoto EV"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-primary text-xs font-bold uppercase text-text-primary text-left">Pink Shield Auto</h4>
                    <span className="font-primary text-xs text-brand-primary font-bold ml-2">₹75.00</span>
                  </div>
                  <p className="text-[10px] text-text-secondary leading-normal text-left">Women preferred captain, panic siren & live track.</p>
                </div>
              </div>

              <div 
                onClick={() => handleAddSimpleItemToCart(rideOptions[4])}
                className="bg-neutral-surface rounded-card p-3.5 flex items-center gap-3.5 flex-1 cursor-pointer hover:bg-neutral-surface/80 hover:shadow-xs transition-all border border-neutral-surface/30"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=150" 
                    className="w-full h-full object-cover" 
                    alt="Volcano Sporty"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h4 className="font-primary text-xs font-bold uppercase text-text-primary text-left">Queen Shield Cab</h4>
                    <span className="font-primary text-xs text-brand-primary font-bold ml-2">₹190.00</span>
                  </div>
                  <p className="text-[10px] text-text-secondary leading-normal text-left">Polymer safety side partition screen, live SOS video link.</p>
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

        {/* Section 4: Dynamic Top Picks filter catalog grid */}
        <section id="menu-anchor" className="space-y-6 pt-5">
          <div className="bg-brand-primary text-white text-center py-3.5 rounded-t-card font-primary font-bold tracking-widest uppercase text-sm">
            Top Picks Just For You • Premium Dispatch Fleet
          </div>

          {/* Filter Categories tab links */}
          <div className="flex flex-wrap justify-center gap-2 bg-neutral-surface p-2 rounded-b-card border-x border-b border-neutral-surface/30">
            {([
              { id: 'all', label: 'All Services' },
              { id: 'bike', label: 'Bike-Taxis' },
              { id: 'auto', label: 'Autos' },
              { id: 'cab', label: 'Cabs' }
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
                        ₹{item.price.toFixed(2)}
                        {item.category === 'bike' || item.category === 'auto' || item.category === 'cab' ? <span className="text-xs font-normal text-gray-500"> / base rate</span> : null}
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
