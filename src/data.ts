import { RideOption, AmenityOption, CustomerReview } from './types';

export const INITIAL_RIDE_OPTIONS: RideOption[] = [
  // 1. BIKE-TAXI SERVICES (category: 'bike')
  {
    id: 'bike-taxi-safety',
    name: 'Safe-Shield Bike-Taxi (Women Match Preferred)',
    price: 45.00,
    description: 'Zip through traffic with highly vetted, background-verified riders. Includes full-face sanitised ISI helmet for women passengers, hairnets, real-time speed monitoring, and an ambient panic distress switch.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=400',
    category: 'bike',
    tags: ['Safe Transit', 'Vetted Rider', 'Women Preferred'],
    rating: 4.9
  },
  {
    id: 'bike-taxi-rapid',
    name: 'Midnight Express Bike-Taxi',
    price: 35.00,
    description: 'Ultra fast two-wheeler commute for night shift leaders. Fully equipped with reflective night-safety gear, verified pilot, and live location share link.',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400',
    category: 'bike',
    tags: ['Swift', 'GPS Tracked'],
    rating: 4.8
  },
  {
    id: 'bike-scooter-electric',
    name: 'Pink-Shield Electric Whisper Scooter',
    price: 25.00,
    description: 'Ultra-quiet eco-friendly electric scooter optimized for comfortable solo transit. Heavy-duty double-wishbone suspension, protective premium backrest, and active automated geolocation SMS broadcasting.',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=400',
    category: 'bike',
    tags: ['Eco Scooter', 'Women Pilot Preferred', 'Pink Shield'],
    rating: 4.9
  },
  {
    id: 'bike-touring-highway',
    name: 'Secure Highway Cruiser Pillion Ride',
    price: 95.00,
    description: 'Engineered for long-distance city bypass transits. Ride on heavy-duty touring cruisers with premium seating support, double shock absorbers, advanced first-aid kit, and direct central helpline telemetry.',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400',
    category: 'bike',
    tags: ['Highway Cruiser', 'Double Shock-Absorbers', '24/7 Patrol Match'],
    rating: 4.9
  },
  {
    id: 'bike-comfort-ortho',
    name: 'Comfort-Ergonomic Ortho Pillion Ride',
    price: 55.00,
    description: 'Features a deep, custom-contoured memory foam pillion seat and extra ergonomic side knee grab-shields. Includes sanitized visor hairnets, ISI safety gear, and speed locked at 40 km/h max for gentle commuting.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=400',
    category: 'bike',
    tags: ['Ortho Comfort', 'Safe Pilot', 'Calm Commute'],
    rating: 4.8
  },
  {
    id: 'bike-office-shuttle',
    name: 'Sector V Late Shift Safe Solo Bike',
    price: 40.00,
    description: 'Dedicated bike transit designed for IT and healthcare professionals. Continuously monitored via active audio/video remote escort, and verified by live-location shared family links.',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400',
    category: 'bike',
    tags: ['Professional Commute', 'Remote Monitoring', 'Location Sharing'],
    rating: 4.9
  },

  // 2. AUTO SERVICES (category: 'auto')
  {
    id: 'auto-pink-shield',
    name: 'Pink-Shield Premium Auto',
    price: 75.00,
    description: 'Electric three-wheel commuter auto prioritizing female safety. Fully enclosed cabin, optional verified female captain, live GPS tracking, and a loud external safety alarm with 24/7 security center connection.',
    image: 'https://images.unsplash.com/photo-1566008889975-f286f4553e20?auto=format&fit=crop&q=80&w=400',
    category: 'auto',
    tags: ['Pink Shield', 'Female Captain option', 'GPS Tracked'],
    rating: 4.9
  },
  {
    id: 'auto-city-classic',
    name: 'Classic Safe-Passage Auto',
    price: 60.00,
    description: 'Your reliable everyday night auto. Thoroughly verified pilot, transparent digital fare matching, sanitised seat covers, and nighttime emergency escort assist.',
    image: 'https://images.unsplash.com/photo-1566008889975-f286f4553e20?auto=format&fit=crop&q=80&w=450',
    category: 'auto',
    tags: ['Comfort', 'Everyday Ride'],
    rating: 4.7
  },

  // 3. CAB SERVICES (category: 'cab')
  {
    id: 'cab-queen-shield',
    name: 'Sovereign Queen Shield Cab',
    price: 190.00,
    description: 'Premium luxury sedan featuring complete high-strength polymer driver passenger partitions. Live audio/video streaming companion link, dual SOS buttons, sanitised air alignment, and verified elite executive drivers.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400',
    category: 'cab',
    tags: ['VIP Safety', 'Partition Cabin', 'Women Prioritized'],
    rating: 4.9
  },
  {
    id: 'cab-whisper-ev',
    name: 'Electric Whisper Silent-Guard Cab',
    price: 160.00,
    description: 'Ultra-silent luxury EV. Active sandalwood essential oil aromatherapy diffuser, dual steering safety indicators, verified driver partner, and instant geo-corridor location sharing.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=400',
    category: 'cab',
    tags: ['Sandalwood Mist', 'Zero Noise'],
    rating: 4.8
  }
];

export const AMENITY_OPTIONS: AmenityOption[] = [
  { id: 'topping-chashu', name: 'Verified Guard Active Remote Escort Monitoring', price: 40.00 },
  { id: 'topping-ajitama', name: 'Polymer High-Strength Partition Screen', price: 30.00 },
  { id: 'topping-tofu', name: 'Kyoto Sandalwood Aromatherapy Cabin Mist', price: 20.00 },
  { id: 'topping-bamboo', name: 'Lavender-infused Thermal Wet-Wipes Kit', price: 10.00 },
  { id: 'topping-nori', name: 'Ambient Starry-Night Fiberoptic Roof', price: 15.00 },
  { id: 'topping-corn', name: 'Super Fast Multi-device Charger Cable Desk', price: 5.00 },
  { id: 'topping-shiitake', name: 'High-speed Secure Starlink Cabin Wi-Fi', price: 25.00 },
  { id: 'topping-oil', name: 'Dynamic One-Touch SOS Emergency Panic Key', price: 15.00 }
];

export const CABIN_FORMULAS = [
  { id: 'broth-tonkotsu', name: 'Pink-Shield Soft Air-ride Velvet Suspension', extra: 0 },
  { id: 'broth-miso', name: 'Traditional Shock-absorbing Rigid Suspension (Extra Firm)', extra: 15.00 },
  { id: 'broth-shoyu', name: 'Firm Safe-Drive Urban Track Damper (Precise & Fast)', extra: 0 },
  { id: 'broth-vegan', name: 'Ultra-Silent Electric Dual-Motor Cruise (Whisper Protective)', extra: 20.00 }
];

export const RETRO_SEAT_OPTIONS = [
  { id: 'noodle-straight', name: 'Top-grain Black Nappa Leather with Protection Partition' },
  { id: 'noodle-wavy', name: 'Custom Ribbed Pink Velvet Cushioned Comfort Seats' },
  { id: 'noodle-glutenfree', name: 'Antibacterial Clean Eco-Vegan Fabric' }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Aditi Roy Chowdhury',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    comment: 'Being a tech professional commuting back from Sector V at 1:30 AM, safety is my absolute list of requirements. The Pink Shield Auto Rickshaw and the verified female driver option have changed my life. Absolute peace of mind!',
    rating: 5,
    tag: 'Verified Female Passenger'
  },
  {
    id: 'rev-2',
    name: 'Sarah Joseph',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    comment: 'Whenever my daughters travel back late at night near Park Street, I book them the Queen Shield Cab. The live video monitoring stream link sent directly to my phone is extremely reassuring. Excellent service!',
    rating: 5,
    tag: 'Concerned Parent'
  },
  {
    id: 'rev-3',
    name: 'Priyanka Sen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    comment: 'Quiet, premium air-ride, beautiful sandalwood aromatherapy, and a polite background driver. It feels like a safe sanctuary after a hectic hospital double-shift.',
    rating: 4.9,
    tag: 'Nocturnal Commuter'
  }
];

export const HUBS_LIST = [
  {
    name: 'Kolkata Park Street safe Boarding Hub (Flagship)',
    address: 'Shop 45, Park Street, Kolkata, West Bengal, 700016',
    hours: 'Mon - Sun: 5:00 PM - 3:00 AM',
    phone: '+91 33 4567 8901',
    seats: 'Instant dispatch • 12 active cruisers • Female-only safe waiting lounge'
  },
  {
    name: 'Salt Lake Sector V Tech Corridor Point',
    address: 'Block EP-GP, Salt Lake, Kolkata, West Bengal, 700091',
    hours: 'Mon - Sun: 6:00 PM - 2:00 AM',
    phone: '+91 33 9876 5432',
    seats: 'Instant dispatch • 8 electric whisper vehicles • SOS Patrol backup station'
  }
];
