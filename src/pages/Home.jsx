import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Scale, BarChart2, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-center">
        <img 
          src="/image.png"
          alt="Logo" 
          className="h-24 w-24 mr-6"
        />
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Existing Summarization Card */}
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="p-6">
            <div className="flex flex-row items-center space-x-4 pb-2">
              <div className="rounded-full bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors duration-300">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Summarization</h2>
            </div>
            <div className="mt-4">
              <p className="text-gray-600 mb-4">
                Instantly convert long-form content into clear, concise summaries using
                advanced AI algorithms.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  Natural language processing
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  Key points extraction
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  Multi-language support
                </div>
              </div>
              <div className="flex gap-4">
                <Link to="/summarize">
                  <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    Try Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        {/* Existing Product Comparison Card */}
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="p-6">
            <div className="flex flex-row items-center space-x-4 pb-2">
              <div className="rounded-full bg-purple-100 p-3 group-hover:bg-purple-200 transition-colors duration-300">
                <Scale className="h-6 w-6 text-purple-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Product Comparison</h2>
            </div>
            <div className="mt-4">
              <p className="text-gray-600 mb-4">
                Compare products side-by-side with detailed analysis of features,
                pricing, and user reviews.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                  Feature matching
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                  Price analysis
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                  User feedback integration
                </div>
              </div>
              <div className="flex gap-4">
                <Link to="/compare">
                  <button className="flex items-center justify-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300">
                    Compare Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        {/* New Visual Analytics Card */}
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
          <div className="p-6">
            <div className="flex flex-row items-center space-x-4 pb-2">
              <div className="rounded-full bg-emerald-100 p-3 group-hover:bg-emerald-200 transition-colors duration-300">
                <BarChart2 className="h-6 w-6 text-emerald-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Visual Analytics</h2>
            </div>
            <div className="mt-4">
              <p className="text-gray-600 mb-4">
                Transform complex data into intuitive visual insights with advanced
                graphical representations and interactive dashboards.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></div>
                  Interactive data visualization
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></div>
                  Real-time trend analysis
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></div>
                  Customizable reporting
                </div>
              </div>
              <div className="flex gap-4">
                <Link to="/visual">
                  <button className="flex items-center justify-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300">
                    Explore Analytics
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;