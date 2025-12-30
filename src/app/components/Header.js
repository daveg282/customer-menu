'use client';

import { useState, useEffect } from 'react';

export default function Header({ 
  isScrolled, 
  cartItemCount, 
  onShowCart, 
  onShowSearch, 
  showSearch,
  searchTerm,
  onSearchChange 
}) {
  const [cartBounce, setCartBounce] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bounce animation when cart count changes
  useEffect(() => {
    if (cartItemCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-md py-2' 
        : 'bg-gradient-to-r from-red-600 to-red-700 py-3'
    }`}>
      {/* Subtle top accent line */}
      <div className={`absolute top-0 left-0 w-full h-0.5 transition-all duration-500 ${
        isScrolled ? 'bg-gradient-to-r from-red-400 to-red-300' : 'bg-gradient-to-r from-yellow-400 to-yellow-300'
      }`} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Clean Logo Section - Properly Aligned */}
          <div className="flex items-center gap-3 group cursor-pointer">
            {/* Clean Chicken Icon */}
            <div className={`relative p-2 rounded-xl transition-all duration-300 group-hover:scale-105 ${
              isScrolled 
                ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-sm' 
                : 'bg-gradient-to-br from-white/90 to-yellow-50/90 shadow-sm'
            }`}>
              <svg className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-red-600'
              }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3L4 9V21H20V9L12 3Z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 13L12 16L15 13" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16V21" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {/* Subtle accent */}
              <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
                isScrolled ? 'bg-yellow-400' : 'bg-yellow-300'
              }`} />
            </div>
            
            {/* Logo Text - Professional Typography */}
            <div className="flex flex-col leading-tight">
              <h1 className={`text-xl sm:text-2xl font-bold tracking-tight transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-900' 
                  : 'text-white'
              }`}>
                Kuku
                <span className={`font-black ml-0.5 ${isScrolled ? 'text-red-600' : 'text-yellow-300'}`}>.</span>
                Chicken
              </h1>
              <p className={`text-xs font-medium tracking-wide transition-all duration-300 -mt-0.5 ${
                isScrolled ? 'text-gray-600' : 'text-red-100'
              }`}>
                Premium & Fresh
              </p>
            </div>
          </div>

          {/* Action Buttons - Clean & Aligned */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button - Clean Design */}
            <button
              onClick={onShowSearch}
              className={`relative p-2 sm:p-2.5 rounded-lg transition-all duration-300 hover:scale-105 ${
                showSearch 
                  ? 'bg-red-500 text-white' 
                  : isScrolled 
                    ? 'text-gray-600 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/20'
              }`}
              aria-label="Search"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart Button - Clean & Professional */}
            <button
              onClick={onShowCart}
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 
                rounded-lg transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-md'
                  : 'bg-white text-red-600 hover:shadow-md'
              } ${cartBounce ? 'animate-bounce' : ''}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              
              <span className="text-sm font-semibold hidden sm:inline">
                {cartItemCount > 0 ? `$${(cartItemCount * 12.99).toFixed(2)}` : 'Cart'}
              </span>
              
              {cartItemCount > 0 && (
                <span className={`absolute -top-1.5 -right-1.5 rounded-full w-4 h-4 
                  flex items-center justify-center text-xs font-bold ${
                  isScrolled
                    ? 'bg-yellow-400 text-red-900'
                    : 'bg-red-500 text-white'
                } ${cartBounce ? 'scale-125' : ''}`}>
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar - Clean & Professional */}
        {showSearch && (
          <div className="mt-3 mb-1 animate-slideDown">
            <div className="relative">
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white text-gray-900 rounded-lg border border-gray-200 
                  focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent
                  placeholder-gray-500 shadow-sm"
                autoFocus
              />
              
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}