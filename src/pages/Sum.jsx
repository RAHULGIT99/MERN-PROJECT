import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Navfirst from './Navfirst';

const Sum = () => {
  const [inputUrl, setInputUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const trimmedUrl = inputUrl.trim();

    if (!trimmedUrl) {
      alert('Please enter a valid product URL.');
      return;
    }

    try {
      // Validate URL format (optional but recommended)
      new URL(trimmedUrl);

      navigate('/load_sum', { 
        state: { 
          requestBody: { url: trimmedUrl } 
        } 
      });
    } catch (error) {
      alert('Please enter a valid URL format.');
    }
  };

  return (
    <>
    <Navfirst/>
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSubmit} 
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              Product URL Summarizer
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Paste a product URL to get an instant summary
            </p>
            
            <div>
              <textarea
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter product URL here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700 resize-none"
                rows={4}
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={!inputUrl.trim()}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Summary
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Sum;

