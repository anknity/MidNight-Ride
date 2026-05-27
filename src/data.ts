import { RideOption, AmenityOption, CustomerReview } from './types';

export const INITIAL_RIDE_OPTIONS: RideOption[] = [
  {
    id: 'classic-sedan',
    name: 'Midnight Sovereign Sedan',
    price: 15.50,
    description: 'Signature smooth air-ride sedan with premium Nappa leather, dim cabin lanterns, soft lo-fi background beats, and a guaranteed silent, peaceful trip.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400', // Unsplash Sedan
    category: 'standard',
    tags: ['Best Seller', 'Smooth Glide'],
    rating: 4.9
  },
  {
    id: 'volcano-express',
    name: 'Volcano Express Intercity',
    price: 18.50,
    description: 'Swift, high-performance urban charger with custom firm suspension, warm sporty lighting, premium safety systems, and express transit routing.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400', // Unsplash Sporty sedan
    category: 'premium',
    tags: ['Swift', 'Custom Choice'],
    rating: 4.8
  },
  {
    id: 'eco-ev',
    name: 'Creamy Whisper Electric',
    price: 15.00,
    description: 'Ultra-quiet zero-emission luxury EV from Kyoto Motor Corp. Features pure organic sandalwood aromatherapy, active noise cancellation, and solar roofs.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=400', // Unsplash EV SUV
    category: 'standard',
    tags: ['Eco-Friendly', 'Silent'],
    rating: 4.7
  },
  {
    id: 'city-tuktuk',
    name: 'City Lantern Retro TukTuk',
    price: 14.50,
    description: 'Authentic open-air three-wheel retro rickshaw illuminated by traditional paper lanterns. Enjoy fresh midnight breezes, local sights, and warm nostalgia.',
    image: 'https://images.unsplash.com/photo-1566008889975-f286f4553e20?auto=format&fit=crop&q=80&w=400', // Unsplash TukTuk
    category: 'standard',
    tags: ['Nostalgic', 'Scenic'],
    rating: 4.6
  },
  {
    id: 'sovereign-kit',
    name: 'Midnight Chauffeur Day-Kit',
    price: 45.00,
    description: 'Elite 4-hour dedicated booking. Includes a courteous, uniform-clad professional driver, premium amenities basket, and unlimited stops within city perimeter limits.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=400', // Chauffeur car
    category: 'hourly',
    tags: ['Premium Service', 'Unlimited Stops'],
    rating: 4.9
  },
  {
    id: 'explorer-suv',
    name: 'Nocturnal Cruiser Premium SUV',
    price: 65.00,
    description: 'Warming, heavy-duty AWD cruiser with comfortable heated massage recliners, mini-beverage fridge, dual-climate zones, and massive baggage capacity.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400', // SUV
    category: 'premium',
    tags: ['All Terrain', 'Spacious SUV'],
    rating: 4.8
  },
  // Sides (Onboard Add-ons)
  {
    id: 'pillow-pack',
    name: 'Orthopedic Cozy Pillow & Thermal Blanket',
    price: 7.50,
    description: 'Soft, sanitised memory foam travel pillow and a heavy organic double-layered thermal cotton blanket for premium sleeping comfort.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=300',
    category: 'side',
    rating: 4.7
  },
  {
    id: 'beverage-pack',
    name: 'Premium Japanese Soda & Candy Combo',
    price: 8.50,
    description: 'An iced bottle of natural mineral water, glass of craft highball soda (non-alcoholic), roasted sea salts, and traditional ginger drops.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=300',
    category: 'side',
    tags: ['New'],
    rating: 4.9
  },
  // Beverages (Onboard Drinks)
  {
    id: 'glass-matcha',
    name: 'Midnight Matcha Iced Energy Shot',
    price: 4.50,
    description: 'Hand-whisked Kyoto Uji matcha latte with cold-pressed oat milk to gently restore your midnight drive energy.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=300',
    category: 'beverage',
    tags: ['Organic'],
    rating: 4.8
  },
  {
    id: 'ramune-pop',
    name: 'Classic Ramune Sparkle Soda',
    price: 3.50,
    description: 'Earthy, sparkling pop soda containing the authentic glass marble seal. Kept perfectly iced in the console cooler.',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=300',
    category: 'beverage',
    rating: 4.5
  }
];

export const AMENITY_OPTIONS: AmenityOption[] = [
  { id: 'topping-chashu', name: 'Premium Plush Heated Massage Seats', price: 2.50 },
  { id: 'topping-ajitama', name: 'Acoustic Soundproofing Partition Screen', price: 1.50 },
  { id: 'topping-tofu', name: 'Kyoto Sandalwood Aromatherapy Diffuser', price: 1.50 },
  { id: 'topping-bamboo', name: 'Lavender-infused Thermal Wet Wipes', price: 1.00 },
  { id: 'topping-nori', name: 'Ambient Starry-Night Fiberoptic Roof', price: 1.00 },
  { id: 'topping-corn', name: 'Multi-device Lightning Fast Charger Cables', price: 0.50 },
  { id: 'topping-shiitake', name: 'High-speed encrypted Starlink Wi-Fi', price: 1.50 },
  { id: 'topping-oil', name: 'Midnight Gourmet Mint & Pastry Basket', price: 1.00 }
];

export const CABIN_FORMULAS = [
  { id: 'broth-tonkotsu', name: 'Velvet Acoustic Suspension Air-ride (Rich & Soft)', extra: 0 },
  { id: 'broth-miso', name: 'Vintage Leaf-Spring Classic Suspension (Nostalgic & Chewy)', extra: 0.50 },
  { id: 'broth-shoyu', name: 'Firm Sporty Urban Track Damper (Precise & Rapid)', extra: 0 },
  { id: 'broth-vegan', name: 'Silent Electric Dual-Motor Cruise (Whisper Smooth)', extra: 0.50 }
];

export const RETRO_SEAT_OPTIONS = [
  { id: 'noodle-straight', name: 'Top-grain Black Nappa Leather (Hakata Preferred)' },
  { id: 'noodle-wavy', name: 'Retro Corduroy Ribbed Fabric (Cozy & Cozy)' },
  { id: 'noodle-glutenfree', name: 'Eco-friendly Recycled Ocean Vegan Fabric' }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    comment: 'The ride is pure liquid gold! I\'ve never had a taxi ride this quiet, polite, and atmospheric outside of Kyoto. The 12 AM silent cabin option made my long airport commute incredibly comforting.',
    rating: 5,
    tag: 'Verified Passenger'
  },
  {
    id: 'rev-2',
    name: 'Mike Tavern',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    comment: 'Perfect for late-night returns from coding sprints. The Volcano Express route mapping is rapid, getting me home 15 minutes quicker than other services. Fully recommended for night shift professionals!',
    rating: 5,
    tag: 'Midnight Rider'
  },
  {
    id: 'rev-3',
    name: 'Anita Sharma',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    comment: 'I absolutely love the electric whisper options! Standard cabs smell synthetic and rattle endlessly, but Midnight Rides provides clean, aromatherapy air, organic green tea, and complete quiet.',
    rating: 4.8,
    tag: 'Safe Retreat seeker'
  }
];

export const HUBS_LIST = [
  {
    name: 'Kolkata Park Street Dispatch Hub (Flagship)',
    address: 'Shop 45, Park Street, Kolkata, West Bengal, 700016',
    hours: 'Mon - Sun: 5:00 PM - 3:00 AM',
    phone: '+91 33 4567 8901',
    seats: 'Instant dispatch • 12 active cruisers'
  },
  {
    name: 'Salt Lake Sector V Tech Hub',
    address: 'Block EP-GP, Salt Lake, Kolkata, West Bengal, 700091',
    hours: 'Mon - Sun: 6:00 PM - 2:00 AM',
    phone: '+91 33 9876 5432',
    seats: 'Instant dispatch • 8 electric whisper vehicles'
  }
];
