'use client';

export default function MenuItemCard({ item, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200">
      {/* Item Image Area */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div className={`h-48 flex items-center justify-center ${
          item.available 
            ? 'bg-gradient-to-br from-red-50 to-orange-50' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200'
        }`}>
          <span className={`text-4xl ${!item.available && 'opacity-40'}`}>
            {item.image || '🍗'}
          </span>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-700">
            {item.category}
          </span>
        </div>
        
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
            item.available 
              ? 'bg-green-500/20 text-green-700' 
              : 'bg-gray-500/20 text-gray-700'
          }`}>
            {item.available ? 'Available' : 'Sold Out'}
          </span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        </div>
        
        {/* Price & Action */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div>
            <span className="text-xl font-bold text-gray-900">ETB {item.price.toFixed(2)}</span>
          </div>
          
          <button
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              item.available
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-md active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {item.available ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
}