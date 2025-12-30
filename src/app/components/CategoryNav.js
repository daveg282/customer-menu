'use client';

export default function CategoryNav({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Scrollable */}
        <div className="lg:hidden flex space-x-2 overflow-x-auto py-3 hide-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 font-medium text-sm border ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600 shadow-sm'
                  : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Desktop: Centered */}
        <div className="hidden lg:flex justify-center items-center py-4">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-5 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 font-medium text-sm border ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-600 shadow-sm'
                    : 'text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}