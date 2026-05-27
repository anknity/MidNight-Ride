import React, { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, Flame, Check, QrCode, ShieldCheck, MapPin } from 'lucide-react';
import { ScheduledRide } from '../types';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReservation: (res: ScheduledRide) => void;
}

const RIDE_OPTIONS_MAP = [
  { id: 'sedan', label: 'Premium Sedan', type: 'Silent Premium Sedan' as const, seats: 4, reserved: false },
  { id: 'limo', label: 'Classic Limousine', type: 'Luxury Classic Limousine' as const, seats: 4, reserved: false },
  { id: 'suv', label: 'Cruiser SUV', type: 'Nocturnal Cruiser SUV' as const, seats: 6, reserved: false },
  { id: 'tuktuk', label: 'Retro TukTuk', type: 'City Retro TukTuk' as const, seats: 2, reserved: true }
];

export default function TableReservationModal({ isOpen, onClose, onAddReservation }: TableReservationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '23:30 (Midnight Run)',
    guestsCount: 1,
    specialRequests: ''
  });

  const [selectedRideClass, setSelectedRideClass] = useState<string | null>('sedan');
  const [ticketResult, setTicketResult] = useState<ScheduledRide | null>(null);

  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const currentVehicleObj = RIDE_OPTIONS_MAP.find(r => r.id === selectedRideClass);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your name and phone number to schedule your ride.");
      return;
    }

    const newRide: ScheduledRide = {
      id: `RIDE-${Math.floor(1000 + Math.random() * 9000)}`,
      passengerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      pickupDate: formData.date,
      timeSlot: formData.timeSlot,
      passengerCount: formData.guestsCount,
      vehicleType: currentVehicleObj?.type || 'Silent Premium Sedan',
      notes: formData.specialRequests,
      createdAt: new Date().toLocaleString()
    };

    onAddReservation(newRide);
    
    startTransition(() => {
      setTicketResult(newRide);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#FDF8E8] w-full max-w-3xl rounded-card overflow-hidden shadow-2xl border-4 border-brand-primary"
      >
        
        {/* Header Ribbon */}
        <div className="bg-brand-primary text-white py-4 px-6 flex justify-between items-center font-primary tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>SCHEDULE MIDNIGHT CHAUFFEUR RIDE</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-brand-secondary p-1 transition-colors cursor-pointer"
            title="Close dispatcher scheduler"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!ticketResult ? (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Side: Vehicle Selection & Grid Layout */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="bg-white border-2 border-brand-primary/10 rounded-lg p-4">
                    <span className="font-primary text-xs font-bold tracking-widest text-[#222] block mb-2 uppercase text-center border-b pb-1">
                      ACTIVE CHASSIS MAP
                    </span>
                    <p className="text-[10px] text-text-secondary text-center mb-3">
                      Select your midnight vehicle platform:
                    </p>

                    <div className="grid grid-cols-2 gap-2 justify-center">
                      {RIDE_OPTIONS_MAP.map(ride => {
                        const isSelected = selectedRideClass === ride.id;
                        const isReserved = ride.reserved;
                        
                        return (
                          <button
                            key={ride.id}
                            type="button"
                            disabled={isReserved}
                            onClick={() => setSelectedRideClass(ride.id)}
                            className={`p-2.5 h-16 rounded text-[9px] font-bold font-primary uppercase flex flex-col justify-between items-center transition-all cursor-pointer ${
                              isReserved 
                                ? 'bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed'
                                : isSelected
                                  ? 'bg-[#C8553D] text-white border-2 border-[#C8553D]'
                                  : 'bg-neutral-surface text-[#222] border border-[#222]/15 hover:border-brand-primary'
                            }`}
                          >
                            <span className="truncate w-full text-center">{ride.label}</span>
                            <span className="text-[8px] opacity-80">{ride.seats} Seater Max</span>
                            <div className="w-2.5 h-2.5 rounded-full border border-black/15 bg-white flex items-center justify-center">
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex justify-center gap-4 text-[9px] font-bold uppercase tracking-wider mt-4 border-t pt-2">
                      <span className="flex items-center gap-1 text-text-secondary">
                        <span className="w-2.5 h-2.5 bg-neutral-surface border border-[#222]/15 rounded" /> Active
                      </span>
                      <span className="flex items-center gap-1 text-[#C8553D]">
                        <span className="w-2.5 h-2.5 bg-[#C8553D] rounded" /> Select
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <span className="w-2.5 h-2.5 bg-gray-200 border border-gray-300 rounded" /> Offline
                      </span>
                    </div>
                  </div>

                  <div className="bg-brand-secondary/40 border border-brand-secondary rounded p-3 text-xs text-text-primary">
                    <span className="font-primary font-bold uppercase block mb-0.5">Assigned Platform:</span>
                    <span className="font-bold">{currentVehicleObj?.type}</span> ({currentVehicleObj?.seats} seats max)
                    <p className="text-[10px] text-text-secondary mt-1 italic leading-relaxed">
                      Chauffeurs undergo mandatory late-night sobriety diagnostics & background validations.
                    </p>
                  </div>
                </div>

                {/* Right Side: Contact Information Inputs */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-primary text-xs font-bold tracking-widest text-[#222] uppercase block">Passenger Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-white border border-[#222]/20 rounded p-2 text-sm text-[#222] outline-none focus:border-brand-primary"
                        placeholder="e.g., Sarah Jenkins"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-primary text-xs font-bold tracking-widest text-[#222] uppercase block">WhatsApp/Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-white border border-[#222]/20 rounded p-2 text-sm text-[#222] outline-none focus:border-brand-primary"
                        placeholder="e.g., +91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-primary text-xs font-bold tracking-widest text-[#222] uppercase block">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full bg-white border border-[#222]/20 rounded p-2 text-sm text-[#222] outline-none focus:border-brand-primary"
                      placeholder="e.g., sarah@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-primary text-xs font-bold tracking-widest text-[#222] uppercase block flex items-center gap-1">
                        <Calendar size={12} /> Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                        className="w-full bg-white border border-[#222]/20 rounded p-2 text-xs text-[#222] outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-primary text-xs font-bold tracking-widest text-[#222] uppercase block flex items-center gap-1">
                        <Clock size={12} /> Pickup Time
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={e => setFormData(p => ({ ...p, timeSlot: e.target.value }))}
                        className="w-full bg-white border border-[#222]/20 rounded p-2 text-xs text-[#222] outline-none focus:border-brand-primary"
                      >
                        <option value="19:30 (Dinner Rush Hour)">19:30 (Dinner Rush Hour)</option>
                        <option value="21:30 (Late Night shift)">21:30 (Late Night shift)</option>
                        <option value="23:30 (Midnight Run)">23:30 (Midnight Run)</option>
                        <option value="01:30 (Insomniac Drift)">01:30 (Insomniac Drift)</option>
                        <option value="03:30 (Pre-Dawn Flight)">03:30 (Pre-Dawn Flight)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-primary text-xs font-bold tracking-widest text-[#222] uppercase block flex items-center gap-1">
                        <Users size={12} /> Passengers
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={currentVehicleObj?.seats || 4}
                        value={formData.guestsCount}
                        onChange={e => setFormData(p => ({ ...p, guestsCount: parseInt(e.target.value) || 1 }))}
                        className="w-full bg-white border border-[#222]/20 rounded p-2 text-xs text-[#222] outline-none focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-primary text-xs font-bold tracking-widest text-[#222] uppercase block">Pickup / Drop Address & Driver notes</label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={e => setFormData(p => ({ ...p, specialRequests: e.target.value }))}
                      rows={2}
                      className="w-full bg-white border border-[#222]/20 rounded p-2 text-xs text-[#222] outline-none focus:border-brand-primary"
                      placeholder="e.g., Pickup at Highbar Cafe, Drop at Sector 5 Office. Keep cabin warm..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full font-primary font-bold text-sm tracking-widest bg-text-primary text-white hover:bg-brand-primary hover:text-white border-2 border-text-primary py-3 transition-colors uppercase cursor-pointer block"
                  >
                    CONFIRM DISPATCH RESERVATION
                  </button>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-6"
              >
                {/* Vintage Ticket Layout */}
                <div className="bg-[#FFFFED] border-2 border-dashed border-brand-primary rounded-xl max-w-md w-full p-6 text-text-primary shadow-lg relative overflow-hidden">
                  
                  {/* Visual perforation circles */}
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FDF8E8]" />
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FDF8E8]" />

                  {/* Header stamp */}
                  <div className="text-center border-b-2 border-[#222] pb-4 mb-4">
                    <span className="font-primary text-[10px] font-bold tracking-widest text-brand-primary uppercase block">Official Dispatch Voucher</span>
                    <h3 className="font-primary text-2xl font-bold tracking-wider uppercase mb-1 flex items-center justify-center gap-2">
                      RESERVED CHAUFFEUR <Check className="text-emerald-600 inline-block w-6" />
                    </h3>
                    <p className="text-[10px] text-text-secondary">ESTABLISHED 2026 • SAFE NOCTURNAL TRANSIT</p>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3 font-secondary text-xs">
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-text-secondary uppercase text-[10px] font-bold">DISPATCH ID</span>
                      <span className="font-mono font-bold text-brand-primary">{ticketResult.id}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-text-secondary uppercase text-[10px] font-bold">RIDER NAME</span>
                      <span className="font-bold">{ticketResult.passengerName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-text-secondary uppercase text-[10px] font-bold">DATE & TIME</span>
                      <span className="font-bold text-text-primary">{ticketResult.pickupDate} at {ticketResult.timeSlot}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-text-secondary uppercase text-[10px] font-bold">VEHICLE TYPE</span>
                      <span className="font-bold truncate max-w-[200px]">{ticketResult.vehicleType}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-text-secondary uppercase text-[10px] font-bold">PASSENGERS COV</span>
                      <span className="font-bold text-text-primary">{ticketResult.passengerCount} {ticketResult.passengerCount === 1 ? 'Rider' : 'Passengers'}</span>
                    </div>
                    {ticketResult.notes ? (
                      <div className="text-center pt-2 bg-neutral-surface/20 rounded p-2 text-[10px] text-text-secondary">
                        <span className="font-bold uppercase block mb-1">DRIVING DIRECTIONS</span>
                        "{ticketResult.notes}"
                      </div>
                    ) : null}
                  </div>

                  {/* QR details & Barcode stamp */}
                  <div className="mt-6 pt-4 border-t-2 border-[#222] flex justify-between items-center bg-white p-3 rounded">
                    <div>
                      <span className="font-primary text-xs font-bold block uppercase text-text-primary">VEHICLE LOCKED</span>
                      <span className="text-[10px] text-text-secondary font-mono">Present code to driver</span>
                    </div>
                    <QrCode className="h-12 w-12 text-[#222]" />
                  </div>
                </div>

                <div className="mt-6 flex gap-3 text-sm">
                  <button
                    onClick={() => {
                      setTicketResult(null);
                      onClose();
                    }}
                    className="font-primary font-bold tracking-widest bg-text-primary text-white px-6 py-2 border-2 border-text-primary hover:bg-transparent hover:text-text-primary transition-colors uppercase cursor-pointer"
                  >
                    Got It! Close
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="font-primary font-bold tracking-widest bg-transparent text-text-primary px-6 py-2 border-2 border-text-primary hover:bg-text-primary hover:text-white transition-colors uppercase cursor-pointer"
                  >
                    Print Voucher
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
