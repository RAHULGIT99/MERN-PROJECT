import React from 'react';

const platforms = [
  { name: "Amazon", logo: "https://via.placeholder.com/150", url: "#" },
  { name: "Flipkart", logo: "https://via.placeholder.com/150", url: "#" },
  { name: "Platform 3", logo: "https://via.placeholder.com/150", url: "#" },
  { name: "Platform 4", logo: "https://via.placeholder.com/150", url: "#" },
  { name: "Platform 5", logo: "https://via.placeholder.com/150", url: "#" },
];

const ComparePrices = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Compare Prices</h1>
        <p className="text-gray-600 mt-2">Find the best deals for your favorite products across multiple platforms.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {platforms.map((platform, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <img
              src={platform.logo}
              alt={platform.name}
              className="w-24 h-24 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{platform.name}</h2>
            <p className="text-gray-600 mt-2">Check out the best offers for this product on {platform.name}.</p>
            <button
              onClick={() => window.open(platform.url, "_blank")}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              View Offers
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparePrices;
