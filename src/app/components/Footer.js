'use client';

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Kuku Chicken</h3>
          <p className="text-red-100 mb-8 max-w-md mx-auto">
            Crispy, juicy, and always delicious. Your satisfaction is our priority.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-8">
            <div className="text-center">
              <div className="text-lg font-semibold">📍 Location</div>
              <div className="text-red-100 text-sm">Addis Ababa</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold">📞 Phone</div>
              <div className="text-red-100 text-sm">+251 911 234 567</div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold">🕒 Hours</div>
              <div className="text-red-100 text-sm">Daily 10AM - 10PM</div>
            </div>
          </div>
          
          <div className="border-t border-red-500 pt-8">
            <p className="text-red-200 text-sm">
              &copy; {new Date().getFullYear()} Kuku Chicken. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}