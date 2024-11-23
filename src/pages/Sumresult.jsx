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



// import React, { useState } from 'react';
// import { X, ChevronLeft, ThumbsUp, ThumbsDown, Gauge } from 'lucide-react';
// import { Progress } from '@/components/ui/progress';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// const ProductCard = ({ data }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
  
//   const getSentimentScore = () => {
//     if (!data.sentiment?.[0]?.[0]) return null;
//     return data.sentiment[0][0].score * 100;
//   };

//   const sentimentScore = getSentimentScore();
  
//   // Format sentiment data for pie chart
//   const sentimentData = data.sentiment?.[0]?.map(item => ({
//     name: item.label.charAt(0).toUpperCase() + item.label.slice(1),
//     value: Number((item.score * 100).toFixed(1))
//   })) || [];

//   // Colors for pie chart segments
//   const COLORS = {
//     Positive: '#4ade80',
//     Neutral: '#94a3b8',
//     Negative: '#f87171'
//   };

//   const renderCollapsedView = () => (
//     <div 
//       className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[400px] w-[300px]"
//       onClick={() => setIsExpanded(true)}
//     >
//       <div className="h-1/2 w-full flex justify-center items-center bg-gray-100">
//         <img
//           src={data.priceTitle?.[3] || "/api/placeholder/400/400"}
//           alt={data.platform}
//           className="w-48 h-48 object-contain"
//           onError={(e) => {
//             e.target.src = "/api/placeholder/400/400";
//           }}
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-2">{data.platform.toUpperCase()}</h3>
//         <p className="text-sm text-gray-700 mb-2 line-clamp-2">{data.priceTitle?.[1]}</p>
//         <p className="text-lg font-bold text-gray-900 mb-3">₹{data.priceTitle?.[0]}</p>
        
//         {sentimentScore && (
//           <div className="h-24">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={sentimentData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={25}
//                   outerRadius={40}
//                   paddingAngle={2}
//                   dataKey="value"
//                 >
//                   {sentimentData.map((entry, index) => (
//                     <Cell key={index} fill={COLORS[entry.name]} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   formatter={(value) => `${value}%`}
//                   contentStyle={{ background: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderExpandedView = () => (
//     <div className="fixed inset-0 z-50 overflow-hidden">
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//       <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
//         <div className="h-full flex flex-col">
//           <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
//             <button
//               className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//               onClick={() => setIsExpanded(false)}
//             >
//               <ChevronLeft className="w-5 h-5 mr-2" />
//               <span className="font-medium">Back</span>
//             </button>
//             <button
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               onClick={() => setIsExpanded(false)}
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
          
//           <div className="flex-1 overflow-auto p-6">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex flex-col md:flex-row gap-8 mb-8">
//                 <div className="md:w-1/3">
//                   <img
//                     src={data.priceTitle?.[3] || "/api/placeholder/400/400"}
//                     alt={data.platform}
//                     className="w-full rounded-lg shadow-md"
//                     onError={(e) => {
//                       e.target.src = "/api/placeholder/400/400";
//                     }}
//                   />
                  
//                   {sentimentScore && (
//                     <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//                       <h4 className="font-semibold mb-3">Sentiment Analysis</h4>
//                       <div className="h-64">
//                         <ResponsiveContainer width="100%" height="100%">
//                           <PieChart>
//                             <Pie
//                               data={sentimentData}
//                               cx="50%"
//                               cy="50%"
//                               innerRadius={60}
//                               outerRadius={80}
//                               paddingAngle={2}
//                               dataKey="value"
//                               label={({ name, value }) => `${name}: ${value}%`}
//                               labelLine={true}
//                             >
//                               {sentimentData.map((entry, index) => (
//                                 <Cell key={index} fill={COLORS[entry.name]} />
//                               ))}
//                             </Pie>
//                             <Tooltip 
//                               formatter={(value) => `${value}%`}
//                               contentStyle={{ background: 'white', border: 'none', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
//                             />
//                             <Legend verticalAlign="bottom" height={36} />
//                           </PieChart>
//                         </ResponsiveContainer>
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="md:w-2/3">
//                   <h2 className="text-2xl font-bold mb-4">{data.priceTitle?.[1]}</h2>
//                   <div className="flex items-center gap-4 mb-6">
//                     <span className="text-2xl font-bold">₹{data.priceTitle?.[0]}</span>
//                     <a 
//                       href={data.priceTitle?.[2]} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                     >
//                       View on {data.platform.toUpperCase()}
//                     </a>
//                   </div>
                  
//                   <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                     <h3 className="font-semibold mb-3">Review Summary</h3>
//                     <p className="text-gray-700 leading-relaxed">{data.review}</p>
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2">
//                       <ThumbsUp className="text-green-500" />
//                       <span>Pros</span>
//                     </div>
//                     <ul className="list-disc list-inside text-gray-700">
//                       <li>Premium design</li>
//                       <li>Excellent camera quality</li>
//                       <li>Smooth 120Hz display</li>
//                       <li>Fast charging</li>
//                     </ul>
//                   </div>
                  
//                   <div className="flex items-center gap-4 mt-4">
//                     <div className="flex items-center gap-2">
//                       <ThumbsDown className="text-red-500" />
//                       <span>Cons</span>
//                     </div>
//                     <ul className="list-disc list-inside text-gray-700">
//                       <li>Inconsistent battery life</li>
//                       <li>Heating issues</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {renderCollapsedView()}
//       {isExpanded && renderExpandedView()}
//     </>
//   );
// };

// const ProductComparison = () => {
//   const sampleData = {
//     platform: 'amazon',
//     priceTitle: [
//       28999,
//       'OnePlus 11R 5G (Galactic Silver, 8GB RAM, 128GB Storage)',
//       'https://www.amazon.in/OnePlus-Galactic-Silver-128GB-Storage/dp/B0BSNQ2KXF',
//       'https://m.media-amazon.com/images/I/41etLpNZV6L._SX38_SY50_CR,0,0,38,50_.jpg'
//     ],
//     review: 'This cell phone receives overwhelmingly positive reviews for its premium design, excellent camera quality with lifelike colors, smooth 120Hz display, top-notch performance thanks to a powerful processor, and impressively fast charging. Users praise its flagship-level haptics and overall value for money. However, some drawbacks exist, including inconsistent battery life depending on usage (particularly in high-performance mode) and noticeable heating issues. Despite these minor shortcomings, most customers express overall satisfaction with the product.',
//     sentiment: [[
//       { label: 'positive', score: 0.9627411365509033 },
//       { label: 'neutral', score: 0.03125730901956558 },
//       { label: 'negative', score: 0.0060015348717570305 }
//     ]]
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-center gap-6">
//           <ProductCard data={sampleData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sumresult;



// import React, { useState, useMemo } from 'react';
// import { useLocation } from 'react-router-dom'; // Correct way to use location state
// import { X, ChevronLeft, CreditCard } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// const SENTIMENT_COLORS = {
//   Positive: '#4ade80',
//   Neutral: '#94a3b8',
//   Negative: '#f87171'
// };

// const PLATFORM_IMAGES = {
//   amazon: "/ecom/amazon.webp",
//   flipkart: "/ecom/flipkart.webp",
//   myntra: "/ecom/myntra.jpg"
// };

// const BANK_OFFERS = {
//   AMAZON: [
//     "10% Instant Discount on HDFC Bank Credit Cards",
//     "No Cost EMI on select Credit Cards",
//     "Special Cashback Offers"
//   ],
//   FLIPKART: [
//     "5% Cashback on Axis Bank Credit Cards",
//     "Instant Discount with Citi Bank Cards",
//     "Zero Processing Fee on EMI"
//   ],
//   MYNTRA: [
//     "Extra 10% Off with ICICI Bank Cards",
//     "Instant Discount on SBI Credit Cards",
//     "Special Weekend Offers"
//   ]
// };
// const ProductCard = ({ data, onClick, isExpanded }) => {
//   const sentimentData = data.sentiment?.[0]?.map(item => ({
//     name: item.label.charAt(0).toUpperCase() + item.label.slice(1),
//     value: Number((item.score * 100).toFixed(1))
//   })) || [];

//   return (
//     <div
//       className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[400px] w-[300px]"
//       onClick={onClick}
//     >
//       <div className="h-1/2 w-full flex justify-center items-center bg-gray-100">
//         <img
//           src={PLATFORM_IMAGES[data.platform?.toLowerCase()] || "/api/placeholder/400/400"}
//           alt={data.platform}
//           className="w-48 h-48 object-contain"
//           onError={(e) => {
//             e.target.src = "/api/placeholder/400/400";
//           }}
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-2">{data.platform?.toUpperCase()}</h3>
//         <p className="text-sm text-gray-700 mb-2 line-clamp-2">{data.priceTitle?.[1]}</p>
//         <p className="text-lg font-bold text-gray-900 mb-3">₹{data.priceTitle?.[0]}</p>

//         {/* Show pie chart only when the card is expanded */}
//         {isExpanded && sentimentData.length > 0 && (
//           <div className="h-24">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={sentimentData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={25}
//                   outerRadius={40}
//                   paddingAngle={2}
//                   dataKey="value"
//                 >
//                   {sentimentData.map((entry, index) => (
//                     <Cell key={index} fill={SENTIMENT_COLORS[entry.name]} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => `${value}%`} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const ExpandedView = ({ data, onClose }) => {
//   const platforms = Object.keys(data).filter(key => 
//     data[key]?.sentiment?.[0]?.length > 0
//   );

//   return (
//     <div className="fixed inset-0 z-50 overflow-hidden">
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//       <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
//         <div className="h-full flex flex-col">
//           <header className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
//             <button
//               className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
//               onClick={onClose}
//             >
//               <ChevronLeft className="w-5 h-5 mr-2" />
//               <span className="font-medium">Back</span>
//             </button>
//             <button
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               onClick={onClose}
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </header>

//           <div className="flex-1 overflow-auto p-6">
//             <div className="max-w-4xl mx-auto">
//               <div className="flex flex-col md:flex-row gap-8">
//                 <div className="md:w-1/3">
//                   <img
//                     src={data.priceTitle?.[3] || "/api/placeholder/400/400"}
//                     alt={data.platform}
//                     className="w-full rounded-lg shadow-md"
//                     onError={(e) => {
//                       e.target.src = "/api/placeholder/400/400";
//                     }}
//                   />
//                 </div>

//                 <div className="md:w-2/3">
//                   <h2 className="text-2xl font-bold mb-4">{data.priceTitle?.[1]}</h2>
//                   <div className="flex items-center gap-4 mb-6">
//                     <span className="text-2xl font-bold">₹{data.priceTitle?.[0]}</span>
//                     <a
//                       href={data.priceTitle?.[2]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                     >
//                       View on {data.platform?.toUpperCase()}
//                     </a>
//                   </div>

//                   <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                     <h3 className="font-semibold mb-3">Review Summary</h3>
//                     <p className="text-gray-700 leading-relaxed">{data.review}</p>
//                   </div>

//                   {platforms.map(platform => {
//                     const sentimentData = data[platform]?.sentiment?.[0]?.map(item => ({
//                       name: item.label.charAt(0).toUpperCase() + item.label.slice(1),
//                       value: Number((item.score * 100).toFixed(1))
//                     }));

//                     return sentimentData && (
//                       <div key={platform} className="mt-6 p-4 bg-gray-50 rounded-lg">
//                         <h4 className="font-semibold mb-3">Sentiment Analysis - {platform}</h4>
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
//                                 label={({ name, value }) => `${name}: ${value}%`}
//                                 labelLine={true}
//                               >
//                                 {sentimentData.map((entry, index) => (
//                                   <Cell key={index} fill={SENTIMENT_COLORS[entry.name]} />
//                                 ))}
//                               </Pie>
//                               <Tooltip formatter={(value) => `${value}%`} />
//                               <Legend verticalAlign="bottom" height={36} />
//                             </PieChart>
//                           </ResponsiveContainer>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PriceComparator = ({ data }) => (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h2 className="text-xl font-bold mb-4">Price Comparator</h2>
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="platform" />
//           <YAxis />
//           <Tooltip formatter={(value, name) => [`₹${value}`, 'Price']} />
//           <Legend />
//           <Bar dataKey="price" fill="#8884d8" name="Product Price" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//     <table className="w-full text-left table-auto">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="p-3">Platform</th>
//           <th className="p-3">Price</th>
//           <th className="p-3">Product Title</th>
//           <th className="p-3">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map(item => (
//           <tr key={item.platform}>
//             <td className="p-3">{item.platform}</td>
//             <td className="p-3">₹{item.price}</td>
//             <td className="p-3">{item.title}</td>
//             <td className="p-3">
//               <button
//                 onClick={() => item.onShowOffers(item.platform)}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//               >
//                 View Offers
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );

// const BankOffersModal = ({ platform, onClose }) => (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//     <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
//       <h3 className="text-xl font-semibold mb-4">Bank Offers for {platform}</h3>
//       <ul className="list-disc pl-6">
//         {BANK_OFFERS[platform]?.map((offer, index) => (
//           <li key={index} className="mb-2">
//             {offer}
//           </li>
//         )) || (
//           <li>No offers available.</li>
//         )}
//       </ul>
//       <button
//         onClick={onClose}
//         className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//       >
//         Close
//       </button>
//     </div>
//   </div>
// );

// const Sumresult = () => {
//   const location = useLocation(); // Correctly fetch location state
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [selectedPlatform, setSelectedPlatform] = useState(null);
//   const [showBankOffers, setShowBankOffers] = useState(false);

//   const parsedData = useMemo(() => {
//     try {
//       const data = JSON.parse(location.state?.result || "{}");
//       return data.results || [];
//     } catch {
//       return [];
//     }
//   }, [location.state?.result]);

//   const priceComparisonData = useMemo(() =>
//     parsedData.map(item => ({
//       platform: item.platform?.toUpperCase() || 'UNKNOWN',
//       price: parseFloat(item.priceTitle?.[0] || 0),
//       title: item.priceTitle?.[1] || 'No Title',
//       onShowOffers: (platform) => {
//         setSelectedPlatform(platform);
//         setShowBankOffers(true);
//       }
//     })).filter(item => item.price > 0),
//     [parsedData]
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-wrap justify-center gap-6 mb-6">
//           {parsedData.map((data, index) => (
//             <ProductCard
//               key={index}
//               data={data}
//               onClick={() => setExpandedCard(data)}
//               isExpanded={expandedCard === data}
//             />
//           ))}
//         </div>

//         <div className="flex justify-center gap-6">
//           <div
//             className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[250px] w-[400px]"
//             onClick={() => setExpandedCard({ id: "price" })}
//           >
//             <div className="p-4">
//               <h3 className="text-center font-bold">Price Comparator</h3>
//             </div>
//           </div>
//         </div>

//         {expandedCard?.id === "price" ? (
//           <PriceComparator data={priceComparisonData} />
//         ) : expandedCard ? (
//           <ExpandedView data={expandedCard} onClose={() => setExpandedCard(null)} />
//         ) : null}

//         {showBankOffers && selectedPlatform && (
//           <BankOffersModal
//             platform={selectedPlatform}
//             onClose={() => {
//               setShowBankOffers(false);
//               setSelectedPlatform(null);
//             }}
//           />
//         )}
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

export default Sumresult;




