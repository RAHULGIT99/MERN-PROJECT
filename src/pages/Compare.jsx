import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navfirst from './Navfirst';

const Compare = () => {
  const navigate = useNavigate();
  const [product1, setProduct1] = useState('');
  const [product2, setProduct2] = useState('');
  const [userQuery, setUserQuery] = useState('');

  const handleCompare = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token) {
      alert('Please login to continue');
      navigate('/login');
      return;
    }

    if (userRole?.toLowerCase() === 'seller') {
      alert('Sorry, only customers can access the comparison feature. Sellers can access the visual analytics feature.');
      // navigate('/');
      return;
    }

    // Create JSON object
    const requestBody = {
      url1: product1,
      url2: product2,
      spec: userQuery,
    };

    try {
      // Validate URL format for both URLs
      new URL(requestBody.url1);
      new URL(requestBody.url2);
  
      // Navigate with the full requestBody in state
      navigate('/load_com', { 
        state: { requestBody } 
      });
    } catch (error) {
      // Identify invalid input and provide specific feedback
      if (!product1 || !product2) {
        alert('Both URLs are required.');
      } else {
        alert('Please enter valid URL formats for the products.');
      }
    }
  };

  return (
    <>
      <Navfirst/>
      <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-[80vw] max-h-[70vh] bg-white shadow-xl rounded-xl border border-blue-100 p-6 space-y-5">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-2">Product Compare</h2>
            <p className="text-sm text-gray-500">Enter product details to compare</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product 1</label>
              <input
                type="text"
                placeholder="Enter first product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={product1}
                onChange={(e) => setProduct1(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product 2</label>
              <input
                type="text"
                placeholder="Enter second product name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={product2}
                onChange={(e) => setProduct2(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comparison Focus</label>
              <input
                type="text"
                placeholder="What do you want to compare?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleCompare}
              disabled={!product1 || !product2}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
            >
              Compare Products
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;