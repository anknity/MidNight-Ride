import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Plus, Check } from 'lucide-react';
import { CustomerReview } from '../types';

interface ReviewSectionProps {
  reviews: CustomerReview[];
  onAddReview: (review: CustomerReview) => void;
}

export default function ReviewSection({ reviews, onAddReview }: ReviewSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: '',
    tag: 'Midnight Traveler'
  });
  const [submittedReviewMessage, setSubmittedReviewMessage] = useState(false);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleStarClick = (rt: number) => {
    setNewReview(prev => ({ ...prev, rating: rt }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      alert('Kindly provide both a name and a short chronicle message.');
      return;
    }

    const reviewObj: CustomerReview = {
      id: `rev-custom-${Date.now()}`,
      name: newReview.name,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(newReview.name)}`,
      comment: newReview.comment,
      rating: newReview.rating,
      tag: newReview.tag
    };

    onAddReview(reviewObj);
    setNewReview({ name: '', rating: 5, comment: '', tag: 'Midnight Traveler' });
    setSubmittedReviewMessage(true);
    setShowSubmitForm(false);
    setTimeout(() => {
      setSubmittedReviewMessage(false);
    }, 3000);
  };

  const displayReview = reviews[currentIndex];

  return (
    <div className="bg-neutral-surface border border-neutral-surface-light rounded-card p-6 md:p-10 mb-8 max-w-[1200px] mx-auto">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-brand-primary font-primary font-bold text-sm tracking-widest uppercase block mb-2">Our Passengers</span>
        <h2 className="font-primary text-3xl md:text-4xl text-text-primary uppercase mb-3">CABIN CHRONICLES & LOGBOOKS</h2>
        <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
          Nostalgic testimonies, silent night commutes, and safe returns shared by our beloved community of night shift leaders and midnight dreamers.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto bg-white border border-[#222]/10 rounded-xl p-8 shadow-sm">
        
        {/* Carousel controls */}
        <button 
          onClick={handlePrev}
          className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8 bg-brand-secondary hover:bg-brand-primary text-white rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          aria-label="Previous Chronicle"
        >
          <ChevronLeft size={16} />
        </button>

        <button 
          onClick={handleNext}
          className="absolute top-1/2 right-3 -translate-y-1/2 w-8 h-8 bg-brand-secondary hover:bg-brand-primary text-white rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          aria-label="Next Chronicle"
        >
          <ChevronRight size={16} />
        </button>

        {/* Dynamic sliding review info */}
        <AnimatePresence mode="wait">
          {displayReview && (
            <motion.div 
              key={displayReview.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="flex flex-col items-center text-center px-4"
            >
              <img 
                src={displayReview.avatar} 
                alt={displayReview.name}
                className="w-14 h-14 rounded-full object-cover mb-4 border-2 border-brand-primary shadow-sm"
                referrerPolicy="no-referrer"
              />
              <h5 className="font-primary text-base font-bold text-text-primary uppercase mb-0.5">{displayReview.name}</h5>
              <span className="text-[10px] text-brand-primary font-bold tracking-wider uppercase bg-brand-primary/5 px-2.5 py-0.5 rounded-full mb-3 block font-primary">
                {displayReview.tag || 'Passenger Log'}
              </span>
              <p className="text-sm text-text-secondary italic mb-4 max-w-md leading-relaxed">
                "{displayReview.comment}"
              </p>
              
              <div className="flex gap-1 text-brand-secondary text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4.5 h-4.5 ${
                      i < Math.floor(displayReview.rating) 
                        ? 'fill-brand-secondary text-brand-secondary' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <div className="text-center mt-6 font-primary">
        <button 
          onClick={() => setShowSubmitForm(!showSubmitForm)}
          className="font-primary font-bold text-xs tracking-wider border-2 border-text-primary px-6 py-2.5 rounded-full hover:bg-text-primary hover:text-white transition-colors uppercase cursor-pointer"
        >
          {showSubmitForm ? 'Close writer' : 'Write a Ride Chronicle'}
        </button>
      </div>

      <AnimatePresence>
        {showSubmitForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-6"
          >
            <form onSubmit={handleSubmit} className="bg-white border border-[#222]/10 rounded-xl p-6 md:p-8 max-w-md mx-auto space-y-4 shadow-sm text-xs">
              <span className="font-primary text-xs font-bold tracking-widest text-[#222] uppercase block text-center border-b pb-1.5">
                SHARE YOUR SERVICE EVALUATION
              </span>

              <div className="space-y-1">
                <label className="font-primary text-[10px] tracking-wider font-bold uppercase block text-text-primary">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={e => setNewReview(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-neutral-cream border border-[#222]/15 rounded p-2 text-xs outline-none focus:border-brand-primary"
                  placeholder="e.g. Liam Tanaka"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-primary text-[10px] tracking-wider font-bold uppercase block text-text-primary">Traveler Profile</label>
                  <select
                    value={newReview.tag}
                    onChange={e => setNewReview(p => ({ ...p, tag: e.target.value }))}
                    className="w-full bg-neutral-cream border border-[#222]/15 rounded p-2 text-xs outline-none focus:border-brand-primary"
                  >
                    <option value="Midnight Traveler">Midnight Traveler</option>
                    <option value="Safe Return Seeker">Safe Return Seeker</option>
                    <option value="Business Executive">Business Executive</option>
                    <option value="Nocturnal Explorer">Nocturnal Explorer</option>
                  </select>
                </div>

                <div className="space-y-1 col-span-1">
                  <label className="font-primary text-[10px] tracking-wider font-bold uppercase block text-text-primary">Comfort score</label>
                  <div className="flex gap-1 py-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const starValue = i + 1;
                      return (
                        <Star
                          key={i}
                          onClick={() => handleStarClick(starValue)}
                          className={`w-5 h-5 cursor-pointer transition-transform hover:scale-110 ${
                            starValue <= newReview.rating 
                              ? 'fill-brand-secondary text-brand-secondary' 
                              : 'text-gray-300'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-primary text-[10px] tracking-wider font-bold uppercase block text-text-primary">Cabin Memoir & Driver Feedback</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.comment}
                  onChange={e => setNewReview(p => ({ ...p, comment: e.target.value }))}
                  className="w-full bg-neutral-cream border border-[#222]/15 rounded p-2 text-xs outline-none focus:border-brand-primary resize-none font-sans"
                  placeholder="Tell us about the suspension comfort, aromatherapy, lo-fi beats, or driver courtesy..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C8553D] text-white font-primary font-bold tracking-widest py-2.5 uppercase border-2 border-[#C8553D] hover:bg-transparent hover:text-[#C8553D] transition-colors cursor-pointer"
              >
                SUBMIT VEHICLE CHRONICLE
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {submittedReviewMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-center text-xs font-bold rounded p-3 max-w-md mx-auto mt-4 animate-bounce font-primary">
          <Check className="inline-block mr-1 w-4 h-4" /> Thank you! Your late-night story was appended dynamically.
        </div>
      )}
    </div>
  );
}
