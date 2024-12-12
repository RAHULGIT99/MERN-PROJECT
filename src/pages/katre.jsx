import React, { useState } from 'react';
import { ChevronLeft, CreditCard, X } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Main = () => {
  const [showOffers, setShowOffers] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  // Mock data for demonstration
  const priceComparisonData = [
    { platform: 'Amazon', price: 500, title: 'Product A', offers: ['10% cashback'] },
    { platform: 'Flipkart', price: 450, title: 'Product B', offers: [] },
    { platform: 'Myntra', price: 480, title: 'Product C', offers: ['5% off'] },
  ];

  // Modal for showing bank offers
  const renderBankOffersModal = () => {
    if (!showOffers || !selectedPlatform) return null;

    const selectedItem = priceComparisonData.find(
      (item) => item.platform === selectedPlatform
    );

    if (!selectedItem || !selectedItem.offers || selectedItem.offers.length === 0) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowOffers(false)}
          />
          <div className="bg-white p-6 rounded-lg z-60 relative w-96 border">
            <button
              onClick={() => setShowOffers(false)}
              className="absolute top-2 right-2"
            >
              <X className="text-gray-600" />
            </button>
            <h2 className="text-xl font-bold mb-4">
              No Offers Available for {selectedPlatform}
            </h2>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setShowOffers(false)}
        />
        <div className="bg-white p-6 rounded-lg z-60 relative w-96 border">
          <button
            onClick={() => setShowOffers(false)}
            className="absolute top-2 right-2"
          >
            <X className="text-gray-600" />
          </button>
          <h2 className="text-xl font-bold mb-4">Offers - {selectedPlatform}</h2>
          <ul>
            {selectedItem.offers.map((offer, index) => (
              <li key={index} className="mb-2">
                {offer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Render Price Comparator Modal
  const renderPriceComparator = () => (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
            <button
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setShowOffers(false)}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back</span>
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowOffers(false)}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Price Comparator</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Price Comparison Chart</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={priceComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="platform" />
                      <YAxis />
                      <RechartsTooltip
                        formatter={(value, name) => [
                          `₹${value}`,
                          name === 'price' ? 'Price' : name,
                        ]}
                      />
                      <Legend />
                      <Bar dataKey="price" fill="#8884d8" name="Product Price" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
                  <h3 className="font-semibold mb-4">Detailed Price Breakdown</h3>
                  <table className="w-full text-left table-auto">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-3">Platform</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Product Title</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceComparisonData.map((item, index) => (
                        <tr
                          key={index}
                          className="cursor-pointer hover:bg-gray-100 transition"
                        >
                          <td className="p-3">{item.platform}</td>
                          <td className="p-3">₹{item.price.toFixed(2)}</td>
                          <td className="p-3 line-clamp-2">{item.title}</td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                setSelectedPlatform(item.platform);
                                setShowOffers(true);
                              }}
                              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition flex items-center"
                            >
                              <CreditCard className="mr-2" size={16} /> Offers
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {renderPriceComparator()}
      {renderBankOffersModal()}
    </div>
  );
};

export default Main;
