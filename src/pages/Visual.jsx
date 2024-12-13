import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navfirst from './Navfirst';

const Visual = () => {
  const [inputUrl, setInputUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputUrl) {
      alert('Please enter a valid URL.');
      return;
    }

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');

    if (!token) {
      alert('Please login to continue');
      navigate('/login');
      return;
    }

    if (userRole?.toLowerCase() === 'customer') {
      alert('Sorry, only sellers can access the visualization results. Please login as a seller to use this feature.');
      return;
    }

    console.log("sending data " + inputUrl);
    navigate('/load_visual', { 
      state: { 
        request_url: inputUrl,
        userRole: userRole?.toLowerCase(),
        userEmail,
        isLoggedIn: true 
      } 
    });
  };

  return (
    <>
      <Navfirst />
      <div className="min-h-[90vh] bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Visual Analytics Generator
              </h2>
              <p className="text-sm text-center text-gray-500 mb-4">
                Paste a data visualization URL for instant insights
              </p>
            </div>

            <div>
              <textarea
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter visualization URL here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-700 resize-none"
                rows={4}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={!inputUrl.trim()}
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Visualization
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Visual;