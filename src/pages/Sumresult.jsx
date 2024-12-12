import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { X, ChevronLeft, CreditCard } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Sumresult = () => {
  const location = useLocation();
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [showOffers, setShowOffers] = useState(false);

  // Colors for sentiment analysis
  const SENTIMENT_COLORS = {
    Positive: '#4ade80',
    Neutral: '#94a3b8',
    Negative: '#f87171'
  };

  // Platform images
  const platformImages = {
    amazon: "ecom/amazon.webp",
    flipkart: "ecom/flipkart.webp",
    myntra: "ecom/myntra.jpg",
    vijaysales: "ecom/vijay.png",
    reliance: "ecom/reliancedi.png",
    sangeetha: "ecom/sangee.png",
    croma: "ecom/croma.png",
    unknown: "ecom/default.webp"
  };

  // Additional sections
  const additionalSections = [
    { id: "price", title: "Price Comparator" }
  ];

  // Utility function to validate JSON
  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  // Parsing received message
  const receivedMessage = location.state?.result || "No message received";
  const parsedData = isValidJSON(receivedMessage)
    ? JSON.parse(receivedMessage)?.results || []
    : [];

  // Memoized price comparison data
  const priceComparisonData = useMemo(() =>
    parsedData.map(item => ({
      platform: item.platform?.toUpperCase() || 'UNKNOWN',
      price: parseFloat(item.price || 0),
      title: item.title || 'No Title',
      image: item.image || 'No Image Available',
      link: item.link || 'No Link Available',
      reviews: item.reviews || [],
      offers: item.offers?.flat() || [],
      offersImages: item.offers_images || []
    })).filter(item => item.price > 0)
  , [parsedData]);

  // ProductCard Component
  const ProductCard = ({ data }) => {
    const platformImage = platformImages[data.platform?.toLowerCase()] || platformImages.unknown;
    
    const getSentimentScore = () => {
      return data.reviews?.[0]?.score ? data.reviews[0].score * 100 : null;
    };

    const sentimentScore = getSentimentScore();

    const sentimentData = data.reviews?.map((review) => {
      if (!review || !review.label || review.score == null) {
        return { name: 'Unknown', value: 0 };
      }

      const formattedLabel = review.label.charAt(0).toUpperCase() + review.label.slice(1);
      const score = Number((review.score * 100).toFixed(1));

      return {
        name: formattedLabel,
        value: score
      };
    }) || [];

    const isExpanded = expandedCard === data;
    const validPrice = !isNaN(data.price) && data.price > 0 ? data.price : 0;
    
    return (
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[400px] w-[300px]"
        onClick={() => setExpandedCard(isExpanded ? null : data)}
      >
        {!isExpanded && (
          <div className="h-1/2 w-full flex justify-center items-center bg-gray-100">
            <img
              src={platformImage} 
              alt={data.platform || "Unknown Platform"}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{data.platform}</h3>
          <p className="text-sm text-gray-700 mb-2 line-clamp-2">{data.title}</p>
          <p className="text-lg font-bold text-gray-900 mb-3">
            ₹{validPrice.toFixed(2)}
          </p>
        </div>
      </div>
    );
  };

  // Offers Component
  const Offers = ({ data }) => {
    if (!data.offers || data.offers.length === 0) {
      console.log("Offers Component: No data or empty offers");
      return <p className="text-xs text-gray-500">No offers available.</p>;
    }
  
    console.log("Offers Component Data:", data);
    return (
      <ul className="space-y-2">
        {data.offers.map((offer, index) => (
          <li key={index} className="text-xs text-gray-700">
            • {offer}
          </li>
        ))}
      </ul>
    );
  };

  // Render Expanded View
  const renderExpandedView = (data) => {
    const safeData = data || {};
    const price = safeData.price ?? 0;
    const platform = safeData.platform ?? 'UNKNOWN';
    const title = safeData.title ?? 'No Title';
    const image = safeData.image || "/api/placeholder/400/400";
    const link = safeData.link || "#";
    const reviews = safeData.reviews || [];
    const offers = safeData.offers || [];
    const offersImages = safeData.offersImages || [];

    // Process reviews for sentiment analysis
    const sentimentData = reviews.length > 0 
      ? Object.entries(
          reviews.reduce((acc, review) => {
            const sentiment = review.sentiment || 'Neutral';
            acc[sentiment] = (acc[sentiment] || 0) + 1;
            return acc;
          }, {})
        ).map(([label, count]) => ({
          name: label.charAt(0).toUpperCase() + label.slice(1),
          value: ((count / reviews.length) * 100).toFixed(1)
        }))
      : [];

    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header with Back and Close buttons */}
            <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
              <button
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setExpandedCard(null)}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back</span>
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setExpandedCard(null)}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  {/* Left Column - Image and Sentiment Analysis */}
                  <div className="md:w-1/3">
                    <img
                      src={image}
                      alt={title}
                      className="w-full rounded-lg shadow-md object-cover"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/400";
                      }}
                    />
                    
                    {sentimentData.length > 0 && (
                      <div className="mt-10 p-2 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-3">Review Sentiment</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={sentimentData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {sentimentData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={SENTIMENT_COLORS[entry.name] || '#2196F3'} 
                                  />
                                ))}
                              </Pie>
                              <RechartsTooltip 
                                formatter={(value) => `${value}%`}
                              />
                              <Legend 
                                verticalAlign="bottom" 
                                height={36} 
                                content={(props) => {
                                  const { payload } = props;
                                  return (
                                    <ul style={{ 
                                      display: 'flex', 
                                      justifyContent: 'center', 
                                      padding: 0 
                                    }}>
                                      {payload.map((entry, index) => (
                                        <li 
                                          key={`item-${index}`} 
                                          style={{ 
                                            margin: '0 10px', 
                                            listStyleType: 'none', 
                                            fontSize: '14px' 
                                          }}
                                        >
                                          <span style={{ 
                                            color: entry.color, 
                                            fontWeight: 'bold' 
                                          }}>
                                            {entry.value}
                                          </span>: {entry.payload.value}%
                                        </li>
                                      ))}
                                    </ul>
                                  );
                                }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Right Column - Product Details */}
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    
                    {/* Price and Platform Link */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-2xl font-bold">₹{Number(price).toFixed(2)}</span>
                      <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        View on {platform}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  //mno proble,,

  // Render Bank Offers Modal
  const renderBankOffersModal = () => {
    if (!showOffers || !selectedPlatform) return null;
  
    const selectedItem = priceComparisonData.find(
      item => item.platform === selectedPlatform
    );
    console.log("Selected Platform:", selectedPlatform);
    console.log("Selected Item:", selectedItem);
  
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
          <h2 className="text-xl font-bold mb-4">
            Offers - {selectedPlatform}
          </h2>
          <Offers data={selectedItem} />
        </div>
      </div>
    );
  };




  // Render Price Comparator Modal
  const renderPriceComparator = () => {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
              <button
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setExpandedCard(null)}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back</span>
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setExpandedCard(null)}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Price Comparator</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Price Comparison Chart */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Price Comparison Chart</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={priceComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="platform" />
                        <YAxis />
                        <RechartsTooltip 
                          formatter={(value, name) => [`₹${value}`, name === 'price' ? 'Price' : name]}
                        />
                        <Legend />
                        <Bar dataKey="price" fill="#8884d8" name="Product Price" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Detailed Price Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
                    <h3 className="font-semibold mb-4">Detailed Price Breakdown</h3>
                    <table className="w-full text-left table-auto">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-3">Platform</th>
                          <th className="p-3">Price</th>
                          <th className="p-3">Product Title</th>
                          <th className="p-3">Actions</th> {/* Buy Now, Bank Offers */}
                        </tr>
                      </thead>
                      <tbody>
                        {priceComparisonData.map((item, index) => (
                          <tr key={index} 
                            className="cursor-pointer hover:bg-gray-100 transition"
                          >
                            <td className="p-3">{item.platform}</td>
                            <td className="p-3">₹{item.price.toFixed(2)}</td>
                            <td className="p-3 line-clamp-2">{item.title}</td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                {/* Button to show offers */}
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedPlatform(item.platform);  // Set the selected platform
                                    setShowOffers(true);  // Toggle to show the offers for the clicked item
                                  }}
                                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition flex items-center"
                                >
                                  <CreditCard className="mr-2" size={16} /> Offers
                                </button>
                              </div>
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
  };

  return (
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-10 mb-6">
              {parsedData.map((data, index) => (
                <ProductCard key={index} data={data} />
              ))}
            </div>
            <div className="flex justify-center gap-6">
              {additionalSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[250px] w-[400px]"
                  onClick={() => setExpandedCard({ id: section.id, title: section.title })}
                >
                  <div className="p-4">
                    <h3 className="text-center font-bold">{section.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            {expandedCard && (
              expandedCard.id === "price" ? 
                renderPriceComparator() : 
                renderExpandedView(expandedCard)
            )}
            {renderBankOffersModal()}
          </div>
        </div>
      );
    };

export default Sumresult;



























// import React, { useState, useMemo } from 'react';
// import { useLocation } from 'react-router-dom';
// import { X, ChevronLeft, CreditCard } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// const Sumresult = () => {
//   const location = useLocation();
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [selectedPlatform, setSelectedPlatform] = useState(null);
//   const [showOffers, setShowOffers] = useState(false);


//   //colous..
//   const SENTIMENT_COLORS = {
//     Positive: '#4ade80',
//     Neutral: '#94a3b8',
//     Negative: '#f87171'
//   };

//   const platformImages = {
//     amazon: "ecom/amazon.webp",
//     flipkart: "ecom/flipkart.webp",
//     myntra: "ecom/myntra.jpg",
//     vijaysales: "ecom/vijay.png",
//     reliance: "ecom/reliancedi.png",
//     sangeetha: "ecom/sangee.png",
//     croma: "ecom/croma.png",
//     unknown: "ecom/default.webp"
//   };

//   const additionalSections = [
//     { id: "price", title: "Price Comparator" }
//   ];

//   const isValidJSON = (str) => {
//     try {
//       JSON.parse(str);
//       return true;
//     } catch {
//       return false;
//     }
//   };
//   //until this neede resources

//   //mess
//   const receivedMessage = location.state?.result || "No message received";
//   const parsedData = isValidJSON(receivedMessage)
//     ? JSON.parse(receivedMessage)?.results || []
//     : [];

//   const priceComparisonData = useMemo(() => 
//     parsedData.map(item => ({
//       platform: item.platform?.toUpperCase() || 'UNKNOWN',
//       price: parseFloat(item.price || 0),
//       title: item.title || 'No Title',
//       image: item.image || 'No Image Available',
//       link: item.link || 'No Link Available',
//       reviews: item.reviews || [],
//       offers: item.offers?.flat() || [],
//       offersImages: item.offers_images || []
//     })).filter(item => item.price > 0)
//   , [parsedData]);


// const ProductCard = ({ data }) => {
//   const platformImage = platformImages[data.platform?.toLowerCase()] || platformImages.unknown;
  
//   const getSentimentScore = () => {
//     return data.reviews?.[0]?.score ? data.reviews[0].score * 100 : null;
//   };

//   const sentimentScore = getSentimentScore();

//   const sentimentData = data.reviews?.map((review) => {
//     if (!review || !review.label || review.score == null) {
//       return { name: 'Unknown', value: 0 };
//     }

//     const formattedLabel = review.label.charAt(0).toUpperCase() + review.label.slice(1);
//     const score = Number((review.score * 100).toFixed(1));

//     return {
//       name: formattedLabel,
//       value: score
//     };
//   }) || [];

//   const isExpanded = expandedCard === data;
//   const validPrice = !isNaN(data.price) && data.price > 0 ? data.price : 0;
  
//   return (
//     <div
//       className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[400px] w-[300px]"
//       onClick={() => setExpandedCard(isExpanded ? null : data)}
//     >
//       {!isExpanded && (
//         <div className="h-1/2 w-full flex justify-center items-center bg-gray-100">
//           <img
//             src={platformImage} 
//             alt={data.platform || "Unknown Platform"}
//             className="w-full h-48 object-cover"
//           />
//         </div>
//       )}

//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-2">{data.platform}</h3>
//         <p className="text-sm text-gray-700 mb-2 line-clamp-2">{data.title}</p>
//         <p className="text-lg font-bold text-gray-900 mb-3">
//           ₹{validPrice.toFixed(2)}
//         </p>
//       </div>
//     </div>
//   );
// };
  
//   const renderExpandedView = (data) => {
//     // Ensure data is not undefined and provide default values
//     const safeData = data || {};
//     const price = safeData.price ?? 0;
//     const platform = safeData.platform ?? 'UNKNOWN';
//     const title = safeData.title ?? 'No Title';
//     const image = safeData.image || "/api/placeholder/400/400";
//     const link = safeData.link || "#";
//     const reviews = safeData.reviews || [];
//     const offers = safeData.offers || [];
//     const offersImages = safeData.offersImages || [];
  
//     // Process reviews for sentiment analysis
//     const sentimentData = reviews.length > 0 
//       ? Object.entries(
//           reviews.reduce((acc, review) => {
//             const sentiment = review.sentiment || 'Neutral';
//             acc[sentiment] = (acc[sentiment] || 0) + 1;
//             return acc;
//           }, {})
//         ).map(([label, count]) => ({
//           name: label.charAt(0).toUpperCase() + label.slice(1),
//           value: ((count / reviews.length) * 100).toFixed(1)
//         }))
//       : [];
  
//     return (
//       <div className="fixed inset-0 z-50 overflow-hidden">
//         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//         <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
//           <div className="h-full flex flex-col">
//             {/* Header with Back and Close buttons */}
//             <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
//               <button
//                 className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//                 onClick={() => setExpandedCard(null)}
//               >
//                 <ChevronLeft className="w-5 h-5 mr-2" />
//                 <span className="font-medium">Back</span>
//               </button>
//               <button
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 onClick={() => setExpandedCard(null)}
//               >
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
            
//             <div className="flex-1 overflow-auto p-6">
//               <div className="max-w-4xl mx-auto">
//                 <div className="flex flex-col md:flex-row gap-8 mb-8">
//                   {/* Left Column - Image and Sentiment Analysis */}
//                   <div className="md:w-1/3">
//                     <img
//                       src={image}
//                       alt={title}
//                       className="w-full rounded-lg shadow-md object-cover"
//                       onError={(e) => {
//                         e.target.src = "/api/placeholder/400/400";
//                       }}
//                     />
                    
//                     {sentimentData.length > 0 && (
//                       <div className="mt-10 p-2 bg-gray-50 rounded-lg">
//                         <h4 className="font-semibold mb-3">Review Sentiment</h4>
//                         <div className="h-64">
//                           <ResponsiveContainer width="100%" height="100%">
//                             <PieChart>
//                               <Pie
//                                 data={sentimentData}
//                                 cx="50%"
//                                 cy="50%"
//                                 innerRadius={60}
//                                 outerRadius={80}
//                                 paddingAngle={2}
//                                 dataKey="value"
//                               >
//                                 {sentimentData.map((entry, index) => (
//                                   <Cell 
//                                     key={index} 
//                                     fill={SENTIMENT_COLORS[entry.name] || '#2196F3'} 
//                                   />
//                                 ))}
//                               </Pie>
//                               <RechartsTooltip 
//                                 formatter={(value) => `${value}%`}
//                               />
//                               <Legend 
//                                 verticalAlign="bottom" 
//                                 height={36} 
//                                 content={(props) => {
//                                   const { payload } = props;
//                                   return (
//                                     <ul style={{ 
//                                       display: 'flex', 
//                                       justifyContent: 'center', 
//                                       padding: 0 
//                                     }}>
//                                       {payload.map((entry, index) => (
//                                         <li 
//                                           key={`item-${index}`} 
//                                           style={{ 
//                                             margin: '0 10px', 
//                                             listStyleType: 'none', 
//                                             fontSize: '14px' 
//                                           }}
//                                         >
//                                           <span style={{ 
//                                             color: entry.color, 
//                                             fontWeight: 'bold' 
//                                           }}>
//                                             {entry.value}
//                                           </span>: {entry.payload.value}%
//                                         </li>
//                                       ))}
//                                     </ul>
//                                   );
//                                 }}
//                               />
//                             </PieChart>
//                           </ResponsiveContainer>
//                         </div>
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Right Column - Product Details */}
//                   <div className="md:w-2/3">
//                     <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    
//                     {/* Price and Platform Link */}
//                     <div className="flex items-center gap-4 mb-6">
//                       <span className="text-2xl font-bold">₹{Number(price).toFixed(2)}</span>
//                       <a 
//                         href={link} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                       >
//                         View on {platform}
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const Offers = ({ data }) => {
//     if (!data.offers || data.offers.length === 0) {
//       console.log("Offers Component: No data or empty offers");
//       return <p>No offers available.</p>;
//     }
  
//     console.log("Offers Component Data:", data);
//     return (
//       <ul>
//         {data.offers.map((offer, index) => (
//           <li key={index}>{offer}</li>
//         ))}
//       </ul>
//     );
//   };
  

//  const renderPriceComparator = () => {
//         return (
//       <div className="fixed inset-0 z-50 overflow-hidden">
//         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//         <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
//           <div className="h-full flex flex-col">
//             <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
//               <button
//                 className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//                 onClick={() => setExpandedCard(null)}
//               >
//                 <ChevronLeft className="w-5 h-5 mr-2" />
//                 <span className="font-medium">Back</span>
//               </button>
//               <button
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 onClick={() => setExpandedCard(null)}
//               >
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//             <div className="flex-1 overflow-auto p-6">
//               <div className="max-w-6xl mx-auto">
//                 <h2 className="text-2xl font-bold mb-6">Price Comparator</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h3 className="font-semibold mb-4">Price Comparison Chart</h3>
//                     <ResponsiveContainer width="100%" height={300}>
//                       <BarChart data={priceComparisonData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="platform" />
//                         <YAxis />
//                         <RechartsTooltip 
//                           formatter={(value, name) => [`₹${value}`, name === 'price' ? 'Price' : name]}
//                         />
//                         <Legend />
//                         <Bar dataKey="price" fill="#8884d8" name="Product Price" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
                  
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <h3 className="font-semibold mb-4">Detailed Price Breakdown</h3>
//                     <table className="w-full text-left table-auto">
//                       <thead>
//                         <tr className="bg-gray-200">
//                           <th className="p-3">Platform</th>
//                           <th className="p-3">Price</th>
//                           <th className="p-3">Product Title</th>
//                           <th className="p-3">Actions</th>   {/*buy now ,bank offers */}
//                         </tr>
//                       </thead>
//                       <tbody>
//                       {priceComparisonData.map((item, index) => (
//                           <div key={index} className="price-comparator-item">
//                             <h3>{item.platform}</h3>
//                             <p>{item.title}</p>
//                             {/* Add more content as needed */}
                            
//                             {/* Button to show offers */}
//                             <button 
//                               onClick={() => {
//                                 setSelectedPlatform(item.platform);  // Set the selected platform
//                                 setShowOffers(true);  // Toggle to show the offers for the clicked item
//                               }}
//                               className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//                             >
//                               <CreditCard className="mr-2" size={16} /> Offers
//                             </button>

//                             {/* Render offers for the selected platform */}
//                             {showOffers && selectedPlatform === item.platform && (
//                               <Offers data={item} />    //{/* Pass the selected item data to the Offers component */}
//                             )}
//                           </div>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderBankOffersModal = () => {
//     if (!showOffers || !selectedPlatform) return null;
  
//     const selectedItem = priceComparisonData.find(
//       item => item.platform === selectedPlatform
//     );
//     console.log("Selected Platform:", selectedPlatform);
//     // console.log("Bank Offers:", bankOffers[selectedPlatform]);
  
//     if (!selectedItem || !selectedItem.offers || selectedItem.offers.length === 0) {
//       return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div
//             className="absolute inset-0 bg-black opacity-50"
//             onClick={() => setShowOffers(false)}
//           />
//           <div className="bg-white p-6 rounded-lg z-60 relative w-96">
//             <button
//               onClick={() => setShowOffers(false)}
//               className="absolute top-2 right-2"
//             >
//               <X className="text-gray-600" />
//             </button>
//             <h2 className="text-xl font-bold mb-4">
//               No Offers Available for {selectedPlatform}
//             </h2>
//           </div>
//         </div>
//       );
//     }
  
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center">
//         <div
//           className="absolute inset-0 bg-black opacity-50"
//           onClick={() => setShowOffers(false)}
//         />
//         <div className="bg-white p-6 rounded-lg z-60 relative w-96">
//           <button
//             onClick={() => setShowOffers(false)}
//             className="absolute top-2 right-2"
//           >
//             <X className="text-gray-600" />
//           </button>
//           <h2 className="text-xl font-bold mb-4">
//             Offers - {selectedPlatform}
//           </h2>
//           <Offers data={selectedItem} />
//         </div>
//       </div>
//     );
//   };


// return (
//   <div className="min-h-screen bg-gray-100 p-8">
//     <div className="max-w-7xl mx-auto">
//       <div className="flex flex-wrap justify-center gap-10 mb-6">
//         <div className="flex flex-wrap justify-center gap-10">
//           {parsedData.map((data, index) => (
//             <ProductCard key={index} data={data} />
//           ))}
//         </div>
//       </div>

//             {/* //Modals and Expanded Views */}
//       {expandedCard && (
//         expandedCard.id === "price"
//           ? renderPriceComparator()
//           : renderExpandedView(expandedCard)
//       )}
//       {renderBankOffersModal()}
//     </div>
//   </div>

// );
// };

// export default Sumresult;

// / const ProductCard = ({ data }) => {
  //   // Determine the platform image
  //   const platformImage =
  //     platformImages[data.platform?.toLowerCase()] || platformImages.unknown;
    
  //   const getSentimentScore = () => {
  //   // Check if the first review exists and has a valid score.
  //   if (!data.reviews?.[0]?.score) return null;
  //   return data.reviews[0].score * 100;
  // };
  
  // // Get the sentiment score safely
  // const sentimentScore = getSentimentScore();
  
  // // Safely map the reviews to sentimentData
  // const sentimentData =
  //   data.reviews?.map((review) => {
  //     // Ensure review.label and review.score are valid before processing
  //     if (!review || !review.label || review.score == null) {
  //       // Return default values if review data is missing or malformed //for the sentiment values to be null
  //       return { name: 'Unknown', value: 0 };
  //     }
  
  //     // Format the label and calculate the score as percentage
  //     const formattedLabel = review.label.charAt(0).toUpperCase() + review.label.slice(1);
  //     const score = Number((review.score * 100).toFixed(1));
  
  
  //     return {
  //       name: formattedLabel,
  //       value: score
  //     };
  //   }) || [];
  //     const isExpanded = expandedCard === data;
    
  //   const validPrice = !isNaN(data.price) && data.price > 0 ? data.price : 0;
    
  //     return (
  //       <div
  //         className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[400px] w-[300px]"
  //         onClick={() => setExpandedCard(isExpanded ? null : data)}
  //       >
  //         {/* Collapsed State */}
  //         {!isExpanded && (
  //           <div className="h-1/2 w-full flex justify-center items-center bg-gray-100">
  //             <img
  //                 src={platformImages[data.platform?.toLowerCase()] || platformImages.unknown} 
  //                 alt={data.platform || "Unknown Platform"}
  //                 className="w-full h-48 object-cover"
  //               />
  //           </div>
  //         )}
    
  //         {/* Expanded State */}
  //         {/* {data && renderExpandedView(data, setExpandedCard)} */}
  //         {/* Card Content */}
  //         <div className="p-4">
  //           <h3 className="font-bold text-lg mb-2">{data.platform}</h3>
  //           <p className="text-sm text-gray-700 mb-2 line-clamp-2">{data.title}</p>
  //           <p className="text-lg font-bold text-gray-900 mb-3">
  //             ₹{validPrice.toFixed(2)} {/* Ensure price is valid before displaying */}
  //           </p>
  //           {/* {data.offers?.length > 0 && (
  //             <p className="text-xs text-green-700 font-medium">
  //               Offers Available: {data.offers.join(", ")}
  //             </p>
  //           )} */}
  //           {/*  offers */}
  
  //         </div>
  //       </div>
  //     );
  //   };
  

// /   return (
  //     <div className="min-h-screen bg-gray-100 p-8">
  //       <div className="max-w-7xl mx-auto">
  //         <div className="flex flex-wrap justify-center gap-10 mb-6">
  //           {/* {parsedData.map((data, index) => (
  //             <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[400px] w-[300px]">
  //               <img
  //                 src={platformImages[data.platform?.toLowerCase()] || platformImages.unknown} 
  //                 alt={data.platform || "Unknown Platform"}
  //                 className="w-full h-48 object-cover"
  //               />
  //               <div className="p-4">
  //                 <h3 className="font-bold text-lg mb-2">{data.platform}</h3>
  //                 <p className="text-sm text-gray-700 mb-2 line-clamp-2">{data.title}</p>
  //                 <p className="text-lg font-bold text-gray-900 mb-3">
  //                   ₹{parseFloat(data.price || 0).toFixed(2)}
  //                 </p>
  //               </div>
  //             </div>
  //           ))} */}
  
  //     <div>
  //       {parsedData.map((data, index) => (
  //         <ProductCard key={index} data={data} />
  //       ))}
  //     </div>
  //         </div>
  //         <div className="flex justify-center gap-6">
  //           {/* {additionalSections.map((section) => (
  //             <div
  //               key={section.id}
  //               className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[250px] w-[400px]"
  //               onClick={() => setExpandedCard({ id: section.id, title: section.title })}
  //             >
  //               <div className="p-4">
  //                 <h3 className="text-center font-bold">{section.title}</h3>
  //               </div>
  //             </div>
  //           ))} */}
  //         {/* </div>
  //           {expandedCard && expandedCard.id === "price" && renderPriceComparator()}
  //           {renderBankOffersModal()}
  
  //       </div> */}
  //       {expandedCard && (
  //   expandedCard.id === "price" ? 
  //     renderPriceComparator() : 
  //     renderExpandedView(expandedCard)
  // )}
  //          </div>
  //          </div> 
  //      </div>
  //   );
  // };
  
  // export default Sumresult;
  
//   const renderPriceComparator = () => {
//     return (
//       <div className="fixed inset-0 z-50 overflow-hidden">
//         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//         <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
//           <div className="h-full flex flex-col">
//             <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
//               <button
//                 className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//                 onClick={() => setExpandedCard(null)}
//               >
//                 <ChevronLeft className="w-5 h-5 mr-2" />
//                 <span className="font-medium">Back</span>
//               </button>
//               <button
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 onClick={() => setExpandedCard(null)}
//               >
//              <X className="w-5 h-5 text-gray-600" />
//            </button>
//          </div>

//          <div className="flex-1 overflow-auto p-6">
//            <div className="max-w-4xl mx-auto">
//              <h2 className="text-2xl font-bold mb-6">Price Comparator</h2>
//              <ResponsiveContainer width="100%" height={400}>
//                <BarChart data={priceComparisonData}>
//                  <CartesianGrid strokeDasharray="3 3" />
//                  <XAxis dataKey="platform" />
//                  <YAxis />
//                  <RechartsTooltip />
//                  <Legend />
//                  <Bar dataKey="price" fill="#8884d8" />
//                </BarChart>
//              </ResponsiveContainer>
//            </div>
//          </div>
//        </div>
//      </div>
//    </div>
  
//   );
// };