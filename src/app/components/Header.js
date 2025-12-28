'use client';

export default function Header({ 
  isScrolled, 
  cartItemCount, 
  onShowCart, 
  onShowSearch, 
  showSearch,
  searchTerm,
  onSearchChange 
}) {
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-red-50/95 backdrop-blur-md shadow-lg' : 'bg-red-500'
    }`}>
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-3">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-300 ${
              isScrolled ? 'text-red-600' : 'text-white'
            }`}>
              Kuku Chicken
            </h1>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Button - Mobile/Desktop */}
            <button
              onClick={onShowSearch}
              className={`p-2 sm:p-3 transition-all duration-300 rounded-full ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-red-100' 
                  : 'text-white hover:bg-red-600'
              }`}
              aria-label="Search"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart Button */}
            <button
              onClick={onShowCart}
              className={`relative flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-red-600 hover:bg-red-50'
              }`}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                  isScrolled ? 'bg-yellow-500' : 'bg-yellow-500'
                }`}>
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar - Responsive */}
        {showSearch && (
          <div className="mt-3 sm:mt-4 fade-in">
            <input
              type="text"
              placeholder="Search chicken dishes, sides..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base text-black bg-white border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
              autoFocus
            />
          </div>
        )}
      </div>
    </header>
  );
}