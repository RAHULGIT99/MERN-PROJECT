import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShoppingCart } from 'lucide-react';

const First = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500 opacity-10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in">
          Choose Your Role
        </h1>
        <div className="flex justify-center space-x-8">
          {/* Customer Button */}
          <button 
          onClick={() => handleNavigate('/')}
            className={`
              relative 
              w-64 
              h-72 
              bg-gray-800 
              text-white 
              rounded-xl 
              border-2 
              border-gray-700 
              overflow-hidden 
              transform 
              transition-all 
              duration-300 
              ${selectedRole === 'customer' ? 'scale-95 opacity-70' : 'hover:scale-105 hover:border-blue-500'}
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500
              group
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
              <User 
                className="w-24 h-24 mb-4 text-blue-400 group-hover:text-blue-300 transition-colors"
                strokeWidth={1.5}
              />
              <h2 className="text-2xl font-semibold mb-2">Customer</h2>
              <p className="text-gray-300 text-sm text-center">
                Browse products, make purchases, and track orders
              </p>
            </div>
          </button>

          {/* Seller Button */}
          <button 
          onClick={() => handleNavigate('/seller')}
            className={`
              relative 
              w-64 
              h-72 
              bg-gray-800 
              text-white 
              rounded-xl 
              border-2 
              border-gray-700 
              overflow-hidden 
              transform 
              transition-all 
              duration-300 
              ${selectedRole === 'seller' ? 'scale-95 opacity-70' : 'hover:scale-105 hover:border-green-500'}
              focus:outline-none 
              focus:ring-2 
              focus:ring-green-500
              group
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
              <ShoppingCart 
                className="w-24 h-24 mb-4 text-green-400 group-hover:text-green-300 transition-colors"
                strokeWidth={1.5}
              />
              <h2 className="text-2xl font-semibold mb-2">Seller</h2>
              <p className="text-gray-300 text-sm text-center">
                List products, manage inventory, and track sales
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default First;