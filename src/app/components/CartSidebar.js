'use client';

export default function CartSidebar({ 
  showCart, 
  cart, 
  cartTotal, 
  onClose, 
  onAddToCart, 
  onRemoveFromCart, 
  onUpdateInstructions, 
  onClearCart, 
  onPlaceOrder 
}) {
  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl slide-in">
        <div className="h-full flex flex-col">
          {/* Cart Header - Matches Header Design */}
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3L4 9V21H20V9L12 3Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 13L12 16L15 13" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V21" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
                  <p className="text-sm text-gray-600 -mt-0.5">Kuku Chicken</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-center mb-6 max-w-xs">
                Add delicious chicken dishes to get started!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:shadow-md transition-all duration-200"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-4">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">ETB {item.price.toFixed(2)} each</p>
                      </div>
                      
                      {/* Quantity Controls - Matches Header Style */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="font-semibold text-gray-900 w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => onAddToCart(item)}
                          className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center hover:shadow-sm transition-all duration-200"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Special Requests
                      </label>
                      <textarea
                        value={item.specialInstructions || ''}
                        onChange={(e) => onUpdateInstructions(item.id, e.target.value)}
                        placeholder="Any special preparation requests?"
                        rows="2"
                        className="w-full px-3 text-black py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Item Total */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Item Total</span>
                      <span className="font-semibold text-gray-900">
                        ETB {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-100 p-5 space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>ETB {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span>ETB 0.00</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center text-lg font-semibold pt-3 border-t border-gray-200">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-gray-900">ETB {cartTotal.toFixed(2)}</span>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={onPlaceOrder}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 rounded-lg hover:shadow-md transition-all duration-200 font-semibold text-base"
                >
                  Place Order • ETB {cartTotal.toFixed(2)}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onClearCart}
                    className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                  >
                    Clear Cart
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium text-sm"
                  >
                    Add More Items
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}