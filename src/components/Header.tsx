import React, { useState } from 'react';
import { ShoppingBag, Search, Car, Menu as MenuIcon, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  onScrollToSection: (sectionId: string) => void;
  onSearchToggle: (val: string) => void;
}

export default function Header({ cartCount, onCartOpen, onScrollToSection, onSearchToggle }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchVal(val);
    onSearchToggle(val);
  };

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-surface/40 shadow-sm transition-all animate-slideDown">
      <div className="max-w-[1200px] mx-auto px-5 py-4 flex justify-between items-center">
        
        {/* Navigation - Left */}
        <div className="hidden md:flex gap-8 items-center">
          <button 
            onClick={() => handleNavClick('home')}
            className="font-primary font-medium text-sm tracking-widest text-text-primary hover:text-brand-primary cursor-pointer transition-colors"
          >
            HOME
          </button>
          <button 
            onClick={() => handleNavClick('menu')}
            className="font-primary font-medium text-sm tracking-widest text-text-primary hover:text-brand-primary cursor-pointer transition-colors"
          >
            RIDES & GEAR
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-primary hover:text-brand-primary transition-colors p-1"
            title="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Logo - Center */}
        <button 
          onClick={() => handleNavClick('home')}
          className="font-primary font-bold text-xl md:text-2xl tracking-wider text-text-primary flex items-center gap-2 hover:opacity-90 cursor-pointer"
        >
          MIDNIGHT RIDES <Car className="text-brand-primary h-6 w-6 animate-pulse" />
        </button>

        {/* Navigation & Actions - Right */}
        <div className="flex items-center gap-6 md:gap-10">
          <div className="hidden md:flex gap-8">
            <button 
              onClick={() => handleNavClick('locations')}
              className="font-primary font-medium text-sm tracking-widest text-text-primary hover:text-brand-primary cursor-pointer transition-colors"
            >
              DISPATCH HUBS
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="font-primary font-medium text-sm tracking-widest text-text-primary hover:text-brand-primary cursor-pointer transition-colors"
            >
              CONTACT
            </button>
          </div>

          <div className="flex items-center gap-4 text-base relative">
            {showSearchInput ? (
              <div className="absolute right-12 z-20 flex items-center bg-white border border-neutral-surface rounded-md px-2 py-1 shadow-sm w-48 transition-all">
                <input
                  type="text"
                  placeholder="Search vehicles, add-ons..."
                  value={searchVal}
                  onChange={handleSearchChange}
                  className="text-xs text-text-primary outline-none w-full"
                  autoFocus
                />
                <button 
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchVal('');
                    onSearchToggle('');
                  }}
                  className="text-text-secondary hover:text-brand-primary"
                >
                  <X size={14} />
                </button>
              </div>
            ) : null}

            <Search 
              size={20}
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="cursor-pointer text-text-primary hover:text-brand-primary transition-colors h-5 w-5" 
            />
            
            <button 
              onClick={onCartOpen}
              className="relative cursor-pointer text-text-primary hover:text-brand-primary transition-colors p-1"
              id="header-cart-btn"
              aria-label="View Booking Radar"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-cream border-t border-neutral-surface/50 px-5 py-4 space-y-4 shadow-inner flex flex-col">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-left font-primary font-semibold text-lg hover:text-brand-primary"
          >
            HOME
          </button>
          <button 
            onClick={() => handleNavClick('menu')}
            className="text-left font-primary font-semibold text-lg hover:text-brand-primary"
          >
            RIDES & GEAR
          </button>
          <button 
            onClick={() => handleNavClick('locations')}
            className="text-left font-primary font-semibold text-lg hover:text-brand-primary"
          >
            DISPATCH HUBS
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className="text-left font-primary font-semibold text-lg hover:text-brand-primary"
          >
            CONTACT
          </button>
        </div>
      )}
    </header>
  );
}
