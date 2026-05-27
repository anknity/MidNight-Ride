import React, { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Copy, Sparkles, MessageCircle, Car } from 'lucide-react';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommunityModal({ isOpen, onClose }: CommunityModalProps) {
  const [phone, setPhone] = useState('');
  const [optInCode, setOptInCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 8) {
      alert('Kindly provide a valid mobile number for WhatsApp dispatch notifications.');
      return;
    }

    startTransition(() => {
      setOptInCode('MIDNIGHT30');
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('MIDNIGHT30');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#FDF8E8] w-full max-w-md rounded-card overflow-hidden shadow-2xl border-4 border-brand-primary"
      >
        
        {/* Ribbon banner */}
        <div className="bg-[#C8553D] text-white py-4 px-6 flex justify-between items-center font-primary tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <MessageCircle size={18} />
            <span>MIDNIGHT REWARDS RADAR</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-brand-secondary p-1 transition-colors cursor-pointer"
            title="Close community panel"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 text-center space-y-4 text-xs">
          <AnimatePresence mode="wait">
            {!optInCode ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <CarIconWithRadar />

                <h3 className="font-primary text-xl md:text-2xl font-bold uppercase text-[#222] tracking-tight text-center">
                  Join the Order of Midnight Riders
                </h3>
                
                <p className="text-text-secondary leading-relaxed px-2 text-xs">
                  Register your phone number to receive sudden, local, deep 12:00 AM dispatch updates and safety fare discounts delivered quietly to your chat list.
                </p>

                <div className="bg-white border border-[#222]/15 rounded p-3 text-left space-y-2">
                  <label className="font-primary text-[10px] tracking-wider font-bold uppercase text-text-primary block">
                    WhatsApp Mobile Number *
                  </label>
                  <div className="flex gap-1">
                    <span className="bg-neutral-surface border border-neutral-surface-light p-2 text-xs font-bold font-primary rounded flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="bg-neutral-cream border border-[#222]/10 rounded p-2 text-xs flex-1 outline-none font-mono"
                    />
                  </div>
                  <span className="text-[9px] text-text-secondary italic block">
                    🛡️ Zero spam. We only transmit VIP passenger codes when cruisers are deployed.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2A6F66] text-white font-primary font-bold tracking-widest py-3 uppercase border-2 border-[#2A6F66] hover:bg-transparent hover:text-[#2A6F66] transition-colors cursor-pointer"
                >
                  TRANSMIT MY JOIN CODE
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5 py-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mx-auto">
                  <Check size={36} />
                </div>

                <h3 className="font-primary text-2xl font-bold uppercase text-[#222] tracking-tight text-center">
                  PASSENGER CODE UNLOCKED!
                </h3>

                <p className="text-text-secondary text-xs">
                  Your midnight commuter coupon was authorized. Copy it below and enter it in your dispatch billing view to save 30% on your next ride:
                </p>

                <div className="bg-white border-2 border-dashed border-brand-primary p-4 rounded-lg inline-flex items-center gap-3 justify-center mx-auto w-full">
                  <span className="font-mono text-xl font-bold tracking-wider text-brand-primary">
                    MIDNIGHT30
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 bg-neutral-surface rounded hover:bg-brand-secondary transition-colors cursor-pointer text-text-primary"
                    title="Copy Discount Code"
                  >
                    <Copy size={16} />
                  </button>
                </div>

                {copied && (
                  <span className="text-emerald-600 font-bold block text-[10px] uppercase">
                    Code Copied to Clipboard!
                  </span>
                )}

                <div className="border-t pt-4">
                  <button
                    onClick={onClose}
                    className="w-full bg-text-primary text-white font-primary font-bold tracking-widest py-2.5 uppercase text-xs cursor-pointer hover:bg-brand-primary"
                  >
                    Return to Dispatcher
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

function CarIconWithRadar() {
  return (
    <div className="relative inline-block w-16 h-16 bg-brand-secondary/40 rounded-full flex items-center justify-center mx-auto text-[#C8553D]">
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-0.5">
        <motion.span animate={{ y: [0, -8, 0], opacity: [0.1, 0.8, 0.1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-0.5 h-3 bg-[#C8553D] block" />
        <motion.span animate={{ y: [0, -10, 0], opacity: [0.1, 0.9, 0.1] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }} className="w-0.5 h-4 bg-[#C8553D] block" />
      </div>
      <Car className="w-8 h-8 animate-pulse" />
    </div>
  );
}
