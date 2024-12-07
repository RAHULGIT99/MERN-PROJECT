// import React, { useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { X, ChevronLeft, CreditCard } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const Sumresult = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [selectedPlatform, setSelectedPlatform] = useState(null);
//   const [showBankOffers, setShowBankOffers] = useState(false);

//   const platformImages = {
//     amazon: "ecom/amazon.webp",
//     flipkart: "ecom/flipkart.webp",
//     myntra: "ecom/myntra.jpg",
//   };

//   const additionalSections = [
//     { id: "aggregate", title: "Aggregate Summary" },
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

//   const receivedMessage = location.state?.result || "No message received";
//   const parsedData = isValidJSON(receivedMessage)
//     ? JSON.parse(receivedMessage)?.results || []
//     : [];

//   const priceComparisonData = useMemo(() => 
//     parsedData.map(item => ({
//       platform: item.platform?.toUpperCase() || 'UNKNOWN',
//       price: parseFloat(item.priceTitle?.[0] || 0),
//       title: item.priceTitle?.[1] || 'No Title'
//     })).filter(item => item.price > 0)
//   , [parsedData]);

//   const bankOffers = {
//     AMAZON: [
//       "sample",
//       "10% Instant Discount on HDFC Bank Credit Cards",
//       "No Cost EMI on select Credit Cards",
//       "Special Cashback Offers"
//     ],
//     FLIPKART: [
//       "sample",
//       "5% Cashback on Axis Bank Credit Cards",
//       "Instant Discount with Citi Bank Cards",
//       "Zero Processing Fee on EMI"
//     ],
//     MYNTRA: [
//       "sample",
//       "Extra 10% Off with ICICI Bank Cards",
//       "Instant Discount on SBI Credit Cards",
//       "Special Weekend Offers"
//     ]
//   };

//   const defaultCards = [
//     { id: "amazon", platform: "amazon" },
//     { id: "flipkart", platform: "flipkart" },
//     { id: "myntra", platform: "myntra" },
//   ];

//   const renderCard = (data, isAdditional = false) => {
//     const { platform, title } = data;
//     const image = isAdditional ? null : platformImages[platform];
//     const platformData = parsedData.find(item => item.platform === platform);

//     const cardStyles = isAdditional 
//       ? "h-[250px] w-[400px]" 
//       : "h-[400px] w-[300px]";

//     return (
//       <div
//         key={platform || title}
//         className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${cardStyles}`}
//         onClick={() => {
//           if (platform) {
//             setExpandedCard(platformData || data);
//           } else {
//             if (title === "Price Comparator") {
//               setExpandedCard({ id: "price", title: "Price Comparator" });
//             }
//           }
//         }}
//       >
//         {!isAdditional && (
//           <div className="h-1/2 w-full flex justify-center items-center overflow-hidden bg-gray-200">
//             <img
//               src={image}
//               alt={`${platform} logo`}
//               className="w-24 h-24 object-cover rounded-md"
//               onError={(e) => {
//                 e.target.src = "/api/placeholder/400/400";
//                 e.target.alt = "Image not found";
//               }}
//             />
//           </div>
//         )}
//         <div className="p-4 flex-1">
//           <div className="text-center font-bold mb-2">
//             {platform ? platform.toUpperCase() : title}
//           </div>
//           {platform && platformData?.priceTitle && (
//             <div>
//               <div className="text-sm text-gray-700 truncate">
//                 {platformData.priceTitle[1] || "No Title"}
//               </div>
//               <div className="text-base font-semibold text-gray-900">
//                 ₹{platformData.priceTitle[0] || "No Price"}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const renderPriceComparator = () => (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-xl font-bold mb-4">Price Comparator</h2>
//       <div className="grid grid-cols-3 gap-4 mb-4">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={priceComparisonData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="platform" />
//             <YAxis />
//             <Tooltip 
//               formatter={(value, name) => [`₹${value}`, name === 'price' ? 'Price' : name]}
//             />
//             <Legend />
//             <Bar dataKey="price" fill="#8884d8" name="Product Price" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//       <table className="w-full text-left table-auto">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3">Platform</th>
//             <th className="p-3">Price</th>
//             <th className="p-3">Product Title</th>
//             <th className="p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {priceComparisonData.map((item, index) => (
//             <tr key={index} className="border-b">
//               <td className="p-3">{item.platform}</td>
//               <td className="p-3">₹{item.price}</td>
//               <td className="p-3 truncate max-w-[200px]">{item.title}</td>
//               <td className="p-3">
//                 <button 
//                   onClick={() => {
//                     setSelectedPlatform(item.platform);
//                     setShowBankOffers(true);
//                   }} 
//                   className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition flex items-center"
//                 >
//                   <CreditCard className="mr-2" size={16} /> Offers
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderBankOffersModal = () => {
//     if (!showBankOffers || !selectedPlatform) return null;

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center">
//         <div 
//           className="absolute inset-0 bg-black opacity-50"
//           onClick={() => setShowBankOffers(false)}
//         />
//         <div className="bg-white p-6 rounded-lg z-60 relative w-96">
//           <button 
//             onClick={() => setShowBankOffers(false)} 
//             className="absolute top-2 right-2"
//           >
//             <X className="text-gray-600" />
//           </button>
//           <h2 className="text-xl font-bold mb-4">
//             Bank Offers - {selectedPlatform}
//           </h2>
//           <ul className="space-y-2">
//             {bankOffers[selectedPlatform]?.map((offer, index) => (
//               <li key={index} className="bg-gray-100 p-3 rounded">
//                 {offer}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   };

//   const ExpandedOverlay = ({ card, onClose }) => {
//     const { platform, title, priceTitle, review } = card;
//     const image = platform ? platformImages[platform] : null;
//     const noResultMessage = "No result available";

//     return (
//       <div className="fixed inset-0 z-50 overflow-hidden">
//         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//         <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
//           <div className="h-full flex flex-col">
//             <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
//               <button
//                 className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//                 onClick={onClose}
//               >
//                 <ChevronLeft className="w-5 h-5 mr-2" />
//                 <span className="font-medium">Back</span>
//               </button>
//               <button
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 onClick={onClose}
//               >
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//             <div className="flex-1 overflow-auto">
//               {title === "Price Comparator" ? (
//                 renderPriceComparator()
//               ) : (
//                 <div className="p-6">
//                   <h2 className="text-2xl font-bold mb-6">
//                     {platform ? platform.toUpperCase() : title}
//                   </h2>
//                   <div className="flex flex-col md:flex-row gap-8 mb-8">
//                     {image && (
//                       <div className="relative group">
//                         <img
//                           src={image}
//                           alt={`${platform} logo`}
//                           className="w-48 h-48 object-cover rounded-lg shadow-md"
//                         />
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       {priceTitle && priceTitle.length > 0 ? (
//                         <>
//                           <h3 className="text-xl font-semibold">{priceTitle[1]}</h3>
//                           <p className="text-lg font-bold text-gray-800 mb-4">
//                             Price: ₹{priceTitle[0]}
//                           </p>
//                           <p className="text-gray-600 leading-relaxed">{review}</p>
//                         </>
//                       ) : (
//                         <p className="text-center text-red-500 font-bold">
//                           {noResultMessage}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const combinedCards = [
//     ...defaultCards.map((defaultCard) =>
//       parsedData.find((item) => item.platform === defaultCard.platform) || {
//         platform: defaultCard.platform,
//       }
//     ),
//     ...additionalSections.map(section => ({
//       id: section.id,
//       title: section.title
//     }))
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-center gap-6 mb-6">
//           {combinedCards.slice(0, 3).map((card) => renderCard(card))}
//         </div>
//         <div className="flex justify-center gap-6">
//           {combinedCards.slice(3).map((card) => renderCard(card, true))}
//         </div>
//         {expandedCard && (
//           <ExpandedOverlay 
//             card={expandedCard} 
//             onClose={() => setExpandedCard(null)} 
//           />
//         )}
//         {renderBankOffersModal()}
//       </div>
//     </div>
//   );
// };

// export default Sumresult;

import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, CreditCard, ThumbsUp, ThumbsDown, Gauge } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Sumresult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [showBankOffers, setShowBankOffers] = useState(false);

  const SENTIMENT_COLORS = {
    Positive: '#4ade80',
    Neutral: '#94a3b8',
    Negative: '#f87171'
  };

  const platformImages = {
    amazon: "ecom/amazon.webp",
    flipkart: "ecom/flipkart.webp",
    myntra: "ecom/myntra.jpg",
  };

  const additionalSections = [
    // { id: "aggregate", title: "Aggregate Summary" },
    { id: "price", title: "Price Comparator" }
  ];

  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  const receivedMessage = location.state?.result || "No message received";
  const parsedData = isValidJSON(receivedMessage)
    ? JSON.parse(receivedMessage)?.results || []
    : [];

  const priceComparisonData = useMemo(() => 
    parsedData.map(item => ({
      platform: item.platform?.toUpperCase() || 'UNKNOWN',
      price: parseFloat(item.priceTitle?.[0] || 0),
      title: item.priceTitle?.[1] || 'No Title'
    })).filter(item => item.price > 0)
  , [parsedData]);

  const bankOffers = {
    AMAZON: [
      "10% Instant Discount on HDFC Bank Credit Cards",
      "No Cost EMI on select Credit Cards",
      "Special Cashback Offers"
    ],
    FLIPKART: [
      "5% Cashback on Axis Bank Credit Cards",
      "Instant Discount with Citi Bank Cards",
      "Zero Processing Fee on EMI"
    ],
    MYNTRA: [
      "Extra 10% Off with ICICI Bank Cards",
      "Instant Discount on SBI Credit Cards",
      "Special Weekend Offers"
    ]
  };

  const ProductCard = ({ data }) => {
    const getSentimentScore = () => {
      if (!data.sentiment?.[0]?.[0]) return null;
      return data.sentiment[0][0].score * 100;
    };
  
    const sentimentScore = getSentimentScore();
    const sentimentData =
      data.sentiment?.[0]?.map((item) => ({
        name: item.label.charAt(0).toUpperCase() + item.label.slice(1),
        value: Number((item.score * 100).toFixed(1)),
      })) || [];
  
    const isExpanded = expandedCard === data;
  
    return (
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[400px] w-[300px]"
        onClick={() => setExpandedCard(isExpanded ? null : data)} // Toggle card expansion
      >
        {/* Collapsed State */}
        {!isExpanded && (
          <div className="h-1/2 w-full flex justify-center items-center bg-gray-100">
            <img
              src={platformImages[data.platform?.toLowerCase()] || "/api/placeholder/400/400"}
              alt={data.platform}
              className="w-48 h-48 object-contain"
              onError={(e) => (e.target.src = "/api/placeholder/400/400")}
            />
          </div>
        )}
  
        {/* Expanded State */}
        {isExpanded && sentimentScore && (
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={index} fill={SENTIMENT_COLORS[entry.name]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
  
        {/* Card Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{data.platform.toUpperCase()}</h3>
          <p className="text-sm text-gray-700 mb-2 line-clamp-2">{data.priceTitle?.[1]}</p>
          <p className="text-lg font-bold text-gray-900 mb-3">₹{data.priceTitle?.[0]}</p>
        </div>
      </div>
    );
  };
  

  const renderPriceComparator = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Price Comparator</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
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
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Platform</th>
            <th className="p-3">Price</th>
            <th className="p-3">Product Title</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {priceComparisonData.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{item.platform}</td>
              <td className="p-3">₹{item.price}</td>
              <td className="p-3 truncate max-w-[200px]">{item.title}</td>
              <td className="p-3">
                <button 
                  onClick={() => {
                    setSelectedPlatform(item.platform);
                    setShowBankOffers(true);
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
  );

  const renderExpandedView = (data) => {
    const sentimentData = data.sentiment?.[0]?.map(item => ({
      name: item.label.charAt(0).toUpperCase() + item.label.slice(1),
      value: Number((item.score * 100).toFixed(1))
    })) || [];

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
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <img
                      src={data.priceTitle?.[3] || "/api/placeholder/400/400"}
                      alt={data.platform}
                      className="w-full rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/400/400";
                      }}
                    />
                    
                    {sentimentData.length > 0 && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-3">Sentiment Analysis</h4>
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
                                label={({ name, value }) => `${name}: ${value}%`}
                                labelLine={true}
                              >
                                {sentimentData.map((entry, index) => (
                                  <Cell key={index} fill={SENTIMENT_COLORS[entry.name]} />
                                ))}
                              </Pie>
                              <RechartsTooltip 
                                formatter={(value) => `${value}%`}
                              />
                              <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">{data.priceTitle?.[1]}</h2>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-2xl font-bold">₹{data.priceTitle?.[0]}</span>
                      <a 
                        href={data.priceTitle?.[2]} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        View on {data.platform.toUpperCase()}
                      </a>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold mb-3">Review Summary</h3>
                      <p className="text-gray-700 leading-relaxed">{data.review}</p>
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

  const renderBankOffersModal = () => {
    if (!showBankOffers || !selectedPlatform) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setShowBankOffers(false)}
        />
        <div className="bg-white p-6 rounded-lg z-60 relative w-96">
          <button 
            onClick={() => setShowBankOffers(false)} 
            className="absolute top-2 right-2"
          >
            <X className="text-gray-600" />
          </button>
          <h2 className="text-xl font-bold mb-4">
            Bank Offers - {selectedPlatform}
          </h2>
          <ul className="space-y-2">
            {bankOffers[selectedPlatform]?.map((offer, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded">
                {offer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
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

// export default Sumresult;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { MessageCircle, X } from 'lucide-react';
// import axios from 'axios';

// const Compres = () => {
//   const { state } = useLocation(); // Get the state from the previous page
//   const [isOpen, setIsOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [response, setResponse] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [previousResponses, setPreviousResponses] = useState([]);

//   const receivedMessage = location.state?.result || "No message received";
//   const parsedData = isValidJSON(receivedMessage)
//     ? JSON.parse(receivedMessage)?.results || []
//     : [];

//   useEffect(() => {
//     if (state?.result) {
//       setResponse(state.result); // Set the fetched data in the response state
//     }
//   }, [state]);

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="relative">
//       {/* Product Comparison Result Card */}
//       <div className="absolute inset-x-0 top-1/4 mx-auto w-2/3 bg-white p-8 rounded-lg border border-gray-300 shadow-lg">
//         <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
//           Product Comparison Result
//         </h3>

//         <div className="text-gray-700 leading-relaxed space-y-4">
//           <p>
//             <strong>Summary of Strengths:</strong> Premium design, excellent camera, smooth display, powerful processor, fast charging, solid build quality, and good value.
//           </p>
//           <p>
//             <strong>Weaknesses:</strong> Battery life in high-performance mode and overheating.
//           </p>
//           <p>
//             There is no information to differentiate between the two phones based on the summaries and specifications. Therefore, it's not possible to determine which phone is "best."
//           </p>
//           <p>
//             More detailed and specific reviews would be required for a better comparison.
//           </p>
//         </div>
//       </div>

//       {/* Chatbot Toggle and Modal */}
//       <div className="fixed bottom-6 right-6 z-50">
//         {/* Floating Toggle Button */}
//         <button
//           onClick={toggleChatbot}
//           className="bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-110"
//         >
//           {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
//         </button>

//         {/* Chatbot Modal */}
//         {isOpen && (
//           <div className="absolute bottom-20 right-0 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 transition-all duration-300 ease-in-out">
//             {/* Chatbot Query Section */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 setQuery(""); // Clear input after submission
//               }}
//               className="space-y-4"
//             >
//               <div>
//                 <label
//                   htmlFor="query"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Your Question
//                 </label>
//                 <input
//                   type="text"
//                   id="query"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="What would you like to know?"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
//               >
//                 {isLoading ? "Searching..." : "Ask"}
//               </button>
//             </form>

//             {/* Scrollable Response History */}
//             <div className="mt-4 max-h-64 overflow-y-auto space-y-3">
//               {/* Current Response */}
//               {response && (
//                 <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
//                   <h3 className="text-sm font-semibold text-blue-700 mb-2">
//                     Latest Response:
//                   </h3>
//                   <p className="text-gray-800 text-sm">{response}</p>
//                 </div>
//               )}

//               {/* Previous Responses */}
//               {previousResponses.slice(0, 5).map((prevResponse, index) => (
//                 <div
//                   key={index}
//                   className="p-3 bg-gray-50 rounded-md border border-gray-200"
//                 >
//                   <h4 className="text-xs font-medium text-gray-600 mb-1">
//                     Q: {prevResponse.query}
//                   </h4>
//                   <p className="text-gray-800 text-sm">
//                     {prevResponse.response}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Compres;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Load_visual = () => {
  const [displayText, setDisplayText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // To get the URL from the previous page
  const facts = [
    "India's eCommerce market is expected to reach $200 billion by 2026.",
    "Around 70% of eCommerce transactions in India are made through mobile phones.",
    "India has over 900 million internet users, making it one of the largest markets for eCommerce.",
    "The number of online shoppers in India reached around 150 million in 2023.",
    "Fashion and apparel is the largest category in Indian eCommerce, followed by electronics and groceries.",
    "Digital payments, including UPI and wallets, are rapidly growing in India, making online shopping more accessible.",
    "Flipkart and Amazon dominate the Indian eCommerce market, followed by Myntra, Snapdeal, and BigBasket.",
    "Tier 2 and Tier 3 cities are increasingly adopting eCommerce, contributing to the market's growth.",
    "The Digital India initiative has boosted cashless transactions and increased online shopping adoption.",
    "By 2025, rural India is expected to contribute 30-35% of the total online shoppers in India.",
  ];

  useEffect(() => {
    // Extract the URL passed from the previous page
    const request_url = location.state?.requestBody;

    if (!request_url) {
      setError('No URL received from the previous page.');
      return;
    }

    const selectedFact = facts[Math.floor(Math.random() * facts.length)];
    const textLength = selectedFact.length;
    const timePerChar = 10000 / textLength; // Distribute 10 seconds across all characters

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= textLength) {
        setDisplayText(selectedFact.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, timePerChar);

    // Start a timer to track elapsed time for the fetch
    let elapsedTime = 0;
    const maxWaitTime = 240000; // 60 seconds timeout

    const timeoutId = setInterval(() => {
      elapsedTime += 1000; // Increment time by 1 second
      if (elapsedTime >= maxWaitTime) {
        setError('Failed to fetch data within 240 seconds.');
        clearInterval(timeoutId);
      }
    }, 1000); // Check every second

    const fetchData = async () => {
      try {
        // Send the user input URL in the correct format
        const response = await fetch('http://127.0.0.1:5000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ request_url: request_url }), // Sending user input as URL
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data) {
          clearInterval(timeoutId); // Clear the timeout when response is received
          navigate('/sumresult', { state: { result: JSON.stringify(data) } }); // Navigate with the result
        } else {
          throw new Error('No valid data received from server.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
        console.error('Error fetching data:', err);
        clearInterval(timeoutId); // Clear the timeout if there's an error
      }
    };

    fetchData();

    return () => {
      clearInterval(intervalId); // Clean up the text display interval
      clearInterval(timeoutId); // Clean up the timeout interval
    };
  }, [location.state?.url, navigate]); // Use the URL passed from the previous page

  const generateCubes = () => {
    const cubes = [];
    for (let h = 1; h <= 3; h++) {
      for (let w = 1; w <= 3; w++) {
        for (let l = 1; l <= 3; l++) {
          cubes.push({ h, w, l });
        }
      }
    }
    return cubes;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="w-full max-w-lg p-8 text-center">
        <div className="relative h-64 mb-6">
          <div className="container">
            <style jsx>{`
              .container {
                position: relative;
                height: 100px;
                width: 86px;
                transform: scale(0.5);
                transform-origin: center center;
                margin: 100px auto;
              }

              .cube {
                position: absolute;
                width: 86px;
                height: 100px;
              }

              .face {
                height: 50px;
                width: 50px;
                position: absolute;
                transform-origin: 0 0;
              }

              .right {
                background: #E79C10;
                transform: rotate(-30deg) skewX(-30deg) translate(49px, 65px) scaleY(0.86);
              }

              .left {
                background: #D53A33;
                transform: rotate(90deg) skewX(-30deg) scaleY(0.86) translate(25px, -50px);
              }

              .top {
                background: #1d9099;
                transform: rotate(210deg) skew(-30deg) translate(-75px, -22px) scaleY(0.86);
                z-index: 2;
              }

              ${generateCubes().map(({ h, w, l }) => `
                .h${h}.w${w}.l${l} {
                  z-index: -${h};
                  animation: h${h}w${w}l${l} 3s ease infinite;
                }

                @keyframes h${h}w${w}l${l} {
                  0% {
                    transform: translate(${(w * -50 - 50) + (l * 50 + 50)}%, ${(h * 50 - 200) + (w * 25 - 25) + (l * 25 + 25)}%);
                  }
                  14% {
                    transform: translate(${(w * -50 - 50) + (l * 100 - 50)}%, ${(h * 50 - 200) + (w * 25 - 25) + (l * 50 - 25)}%);
                  }
                  28% {
                    transform: translate(${(w * -100 + 50) + (l * 100 - 50)}%, ${(h * 50 - 200) + (w * 50 - 75) + (l * 50 - 25)}%);
                  }
                  43% {
                    transform: translate(${(w * -100 - 100) + (l * 100 + 100)}%, ${(h * 100 - 400) + (w * 50 - 50) + (l * 50 + 50)}%);
                  }
                  57% {
                    transform: translate(${(w * -100 - 100) + (l * 50 + 200)}%, ${(h * 100 - 400) + (w * 50 - 50) + (l * 25 + 100)}%);
                  }
                  71% {
                    transform: translate(${(w * -50 - 200) + (l * 50 + 200)}%, ${(h * 100 - 375) + (w * 25 - 25) + (l * 25 + 100)}%);
                  }
                  85%, 100% {
                    transform: translate(${(w * -50 - 50) + (l * 50 + 50)}%, ${(h * 50 - 200) + (w * 25 - 25) + (l * 25 + 25)}%);
                  }
                }
              `).join('\n')}

              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }

              .cursor {
                display: inline-block;
                width: 2px;
                height: 1em;
                background-color: white;
                margin-left: 2px;
                animation: blink 1s step-end infinite;
                vertical-align: middle;
              }
            `}</style>

            {generateCubes().map(({ h, w, l }, index) => (
              <div key={index} className={`cube h${h} w${w} l${l}`}>
                <div className="face top"></div>
                <div className="face left"></div>
                <div className="face right"></div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Did you know?</h2>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 transform transition-all hover:scale-105">
          <p className="text-base text-white/90 italic font-light leading-relaxed">
            {displayText}
            <span className="cursor"></span>
          </p>
          <p className="mt-3 text-sm text-white/60"></p>
        </div>

        {error && (
          <div className="error-text mt-4 text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Load_visual;

