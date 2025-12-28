'use client';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryNav from './components/CategoryNav';
import MenuItemCard from './components/MenuItemCard';
import PopularItemCard from './components/PopularItemCard';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import { menuItems, categories } from '../data/menuData';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter items by category and search
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get popular items
  const popularItems = menuItems.filter(item => item.popular);

  // Calculate cart item count
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Add item to cart
  const addToCart = (item) => {
    if (!item.available) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { 
          ...item, 
          quantity: 1,
          specialInstructions: ''
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      if (existingItem.quantity === 1) {
        return prevCart.filter(item => item.id !== itemId);
      } else {
        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // Update special instructions
  const updateInstructions = (itemId, instructions) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, specialInstructions: instructions }
          : item
      )
    );
  };

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Place order
  const placeOrder = () => {
    if (cart.length === 0) return;
    
    const orderDetails = {
      items: cart,
      total: cartTotal,
      tableNumber: 'T01',
      orderTime: new Date().toLocaleString()
    };
    
    console.log('Order placed:', orderDetails);
    alert(`Order placed successfully! Total: ETB ${cartTotal}\nYour order has been sent to the kitchen.`);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header
        isScrolled={isScrolled}
        cartItemCount={cartItemCount}
        onShowCart={() => setShowCart(true)}
        onShowSearch={() => setShowSearch(!showSearch)}
        showSearch={showSearch}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Hero Section */}
      <Hero />

      {/* Category Navigation */}
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Popular Items Section */}
      {activeCategory === 'All' && popularItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">Signature Dishes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our most beloved creations, crafted with passion and expertise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularItems.map(item => (
              <PopularItemCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      )}

      {/* Main Menu Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-light text-gray-900 mb-4">
            {activeCategory === 'All' ? 'Complete Menu' : activeCategory}
          </h2>
          <p className="text-gray-600">
            {filteredItems.length} items found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredItems.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-serif text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or select a different category</p>
          </div>
        )}
      </section>

      {/* Cart Sidebar */}
      <CartSidebar
        showCart={showCart}
        cart={cart}
        cartTotal={cartTotal}
        onClose={() => setShowCart(false)}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onUpdateInstructions={updateInstructions}
        onClearCart={clearCart}
        onPlaceOrder={placeOrder}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}