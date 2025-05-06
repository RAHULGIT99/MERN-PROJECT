import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const platformImages = {
  amazon: './ecom/amazon.webp',
  flipkart: './ecom/flipkart.webp',
  reliance: './ecom/reliancedi.png',
  croma: './ecom/croma.png',
  vijaysales: './ecom/vijay.png',
  unknown: './ecom/default.webp'
};

const Sumresult = () => {
  const location = useLocation();
  const receivedMessage = location.state?.result || null;
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  let products = [];
  if (receivedMessage && typeof receivedMessage === 'object' && receivedMessage.results) {
    products = receivedMessage.results;
  }

  const handleCardClick = (platform) => {
    setSelectedPlatform(platform);
  };

  const closeCard = () => {
    setSelectedPlatform(null);
  };

  const getProductsForPlatform = (platform) => {
    return products.filter((product) => product.platform?.toLowerCase() === platform);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.keys(platformImages)
          .filter((key) => key !== 'unknown')
          .map((platformKey) => (
            <div
              key={platformKey}
              className="relative rounded-md shadow-md cursor-pointer bg-white"
              onClick={() => handleCardClick(platformKey)}
            >
              <div className="p-4 flex flex-col items-center">
                <img
                  src={platformImages[platformKey]}
                  alt={platformKey.toUpperCase()}
                  className="w-full h-24 object-contain"
                />
                <div className="mt-2 font-semibold">{platformKey.toUpperCase()}</div>
              </div>
            </div>
          ))}
      </div>

      {selectedPlatform && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-md shadow-xl p-6 relative max-w-lg w-full m-4">
            <button
              onClick={closeCard}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4">{selectedPlatform.toUpperCase()} - Details</h3>
            {getProductsForPlatform(selectedPlatform).length > 0 ? (
              getProductsForPlatform(selectedPlatform).map((product, index) => (
                <div key={index} className="mb-6 p-4 border rounded">
                  <p>
                    <span className="font-bold">Price :</span> ₹{product.price || 'No data received'}
                    
                  </p>
                  
                  <p>
                  <br/>
                    <span className="font-bold">Summarized Review :</span>{' '}
                    <br/>
                    <br/>
                    {product.reviews || 'No data received'}
                  </p>

                  {product.sentiment && (
                    <p>
                      <br/>
                      <span className="font-bold">Sentiment :</span>{' '}
                      {product.sentiment
                        .filter((s) => s.label === 'positive')
                        .map((s) => `${s.label} (${(s.score * 100).toFixed(1)}%)`)
                        .join(', ') || 'No positive sentiment found'}
                    </p>
                  )}

                  <div className="mt-4">
                    <a
                      href={product.link || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-lg"
                    >
                      View Product
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No results found for {selectedPlatform.toUpperCase()}.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sumresult;