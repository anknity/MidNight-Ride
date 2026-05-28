export interface RideOption {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'standard' | 'premium' | 'hourly' | 'outstation' | 'side' | 'beverage' | 'bike' | 'auto' | 'cab' | 'parcel' | 'travel' | 'metro';
  tags?: string[];
  rating?: number;
}

export interface AmenityOption {
  id: string;
  name: string;
  price: number;
}

export interface CustomRideState {
  vehicleClass: string;
  driverVibe: string;
  speedMode: 'Eco Slow Cruise' | 'Standard Safe' | 'Express Expresswise' | 'Volcano Sprint';
  amenities: string[]; // amenity ids
}

export interface BookingItem {
  bookingId: string;
  rideOption: RideOption;
  passengers: number; // replacing quantity
  customizations?: {
    vehicleClass: string;
    driverVibe: string;
    speedMode: string;
    amenities: string[];
    priceAdjustment: number;
  };
}

export interface ScheduledRide {
  id: string;
  passengerName: string;
  email: string;
  phone: string;
  pickupDate: string;
  timeSlot: string;
  passengerCount: number;
  vehicleType: 'Silent Premium Sedan' | 'Safe-Shield Bike-Taxi (Verified Pilot)' | 'Pink-Shield Premium Auto (Female Pilot Match)' | 'Sovereign Queen Shield Cab (Internal Partition)' | 'Express Safe Metro Feeder (Patrolled Group)';
  notes?: string;
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  comment: string;
  rating: number;
  tag?: string;
}
