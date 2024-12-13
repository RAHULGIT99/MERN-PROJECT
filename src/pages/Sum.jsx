import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Navfirst from './Navfirst';

const Sum = () => {
  const [inputUrl, setInputUrl] = useState('');
  const navigate = useNavigate();
  const [userLink, setUserLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUrl = inputUrl.trim();

    if (!trimmedUrl) {
      alert('Please enter a valid product URL.');
      return;
    }

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token) {
      alert('Please login to continue');
      navigate('/login');
      return;
    }

    if (userRole?.toLowerCase() === 'seller') {
      alert('Sorry, only customers can access the summarizer feature. Sellers can access the visual analytics feature.');
      // navigate('/');
      return;
    }

    try {
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
      <div className="w-full max-w-[100vh]">
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

//for the real one
// import React, { useState, useMemo } from 'react';
// import { useLocation } from 'react-router-dom';
// import { X, ChevronLeft, CreditCard } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// const Sumresult = () => {
//   const location = useLocation();
//   // const navigate = useNavigate();
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [selectedPlatform, setSelectedPlatform] = useState(null);
//   const [showBankOffers, setShowBankOffers] = useState(false);

//   const SENTIMENT_COLORS = {
//     Positive: '#4ade80',
//     Neutral: '#94a3b8',
//     Negative: '#f87171'
//   };

//   const platformImages = {
//     amazon: "ecom/amazon.webp",
//     flipkart: "ecom/flipkart.webp",
//     myntra: "ecom/myntra.jpg",
//   };

//   const additionalSections = [
//     // { id: "aggregate", title: "Aggregate Summary" },
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
//       title: item.priceTitle?.[1] || 'No Title',
//       link:item.priceTitle?.[2] || 'NO link'
//     })).filter(item => item.price > 0)
//   , [parsedData]);

//   const bankOffers = {
//     AMAZON: [
//       "10% Instant Discount on HDFC Bank Credit Cards",
//       "No Cost EMI on select Credit Cards",
//       "Special Cashback Offers"
//     ],
//     FLIPKART: [
//       "5% Cashback on Axis Bank Credit Cards",
//       "Instant Discount with Citi Bank Cards",
//       "Zero Processing Fee on EMI"
//     ],
//     MYNTRA: [
//       "Extra 10% Off with ICICI Bank Cards",
//       "Instant Discount on SBI Credit Cards",
//       "Special Weekend Offers"
//     ]
//   };

//   const ProductCard = ({ data }) => {
//     const getSentimentScore = () => {
//       if (!data.sentiment?.[0]?.[0]) return null;
//       return data.sentiment[0][0].score * 100;
//     };
  
//     const sentimentScore = getSentimentScore();
//     const sentimentData =
//       data.sentiment?.[0]?.map((item) => ({
//         name: item.label.charAt(0).toUpperCase() + item.label.slice(1),
//         value: Number((item.score * 100).toFixed(1)),
//       })) || [];
  
//     const isExpanded = expandedCard === data;
  
//     return (
//       <div
//         className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[400px] w-[300px]"
//         onClick={() => setExpandedCard(isExpanded ? null : data)} // Toggle card expansion
//       >
//         {/* Collapsed State */}
//         {!isExpanded && (
//           <div className="h-1/2 w-full flex justify-center items-center bg-gray-100">
//             <img
//               src={platformImages[data.platform?.toLowerCase()] || "/api/placeholder/400/400"}
//               alt={data.platform}
//               className="w-48 h-48 object-contain"
//               onError={(e) => (e.target.src = "/api/placeholder/400/400")}
//             />
//           </div>
//         )}
  
//         {/* Expanded State */}
//         {isExpanded && sentimentScore && (
//           // <div className="h-24">
//             <div className="flex justify-center items-center h-40 w-full bg-gray-100 rounded-lg p-4">
//             <div className="w-full max-w-2xl">
//             <ResponsiveContainer width="100%" height="200">
//               <PieChart>
//                 <Pie
//                   data={sentimentData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={40}
//                   outerRadius={60}
//                   paddingAngle={2}
//                   dataKey="value"
//                 >
//                   {sentimentData.map((entry, index) => (
//                     <Cell key={index} fill={SENTIMENT_COLORS[entry.name]} />
//                   ))}
//                 </Pie>
//                 <RechartsTooltip formatter={(value) => `${value}%`} />
//               </PieChart>
//             </ResponsiveContainer>
//             </div>
//           </div>
//         )}
  
//         {/* Card Content */}
//         <div className="p-4">
//           <h3 className="font-bold text-lg mb-2">{data.platform.toUpperCase()}</h3>
//           <p className="text-sm text-gray-700 mb-2 line-clamp-2">{data.priceTitle?.[1]}</p>
//           <p className="text-lg font-bold text-gray-900 mb-3">₹{data.priceTitle?.[0]}</p>
//         </div>
//       </div>
//     );
//   };
  



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
//                         {priceComparisonData.map((item, index) => (
//                           <tr key={index} className="border-b hover:bg-gray-100 transition">
//                             <td className="p-3">{item.platform}</td>
//                             <td className="p-3">₹{item.price}</td>
//                             <td className="p-3 truncate max-w-[200px]">{item.title}</td>
//                             <td className="p-3">
//                               <button 
//                                 onClick={() => {
//                                   setSelectedPlatform(item.platform);
//                                   setShowBankOffers(true);
//                                 }} 
//                                 className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition flex items-center"
//                               >
//                                 <CreditCard className="mr-2" size={16} /> Offers
//                               </button>
//                             </td>
//                           </tr>
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

  
//   const renderExpandedView = (data) => {
//     const sentimentData = data.sentiment?.[0]?.map(item => ({
//       name: item.label.charAt(0).toUpperCase() + item.label.slice(1),
//       value: Number((item.score * 100).toFixed(1))
//     })) || [];

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
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
            
//             <div className="flex-1 overflow-auto p-6">
//               <div className="max-w-4xl mx-auto">
//                 <div className="flex flex-col md:flex-row gap-8 mb-8">
//                   <div className="md:w-1/3">
//                     <img
//                       src={data.priceTitle?.[3] || "/api/placeholder/400/400"}
//                       alt={data.platform}
//                       className="w-full rounded-lg shadow-md"
//                       onError={(e) => {
//                         e.target.src = "/api/placeholder/400/400";
//                       }}
//                     />
                    
//                     {sentimentData.length > 0 && (
//                       <div className="mt-10 mr-10 p-2 bg-gray-50 rounded-lg ">{/*changes here for the size of piechart */}
//                         <h4 className="font-semibold mb-3">Sentiment Analysis</h4>
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
//                                 // label={({ name, value }) => `${name}: ${value}%`}
//                                 // labelLine={true}  //for label line  -positive 95%.etc
//                                 >
//                                 {sentimentData.map((entry, index) => (
//                                   <Cell key={index} fill={SENTIMENT_COLORS[entry.name] } />
//                                 ))}
//                               </Pie>
//                               <RechartsTooltip 
//                                 formatter={(value) => `${value}%`}
//                               />
//                               {/* <Legend verticalAlign="bottom" height={36} /> */} 
//                               {/*for the lengds the score appears in bottom */}
//                               <Legend 
//                               verticalAlign="bottom" 
//                               height={36} 
//                               content={(props) => {
//                                 const { payload } = props;
//                                 return (
//                                   <ul style={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
//                                     {payload.map((entry, index) => (
//                                       <li key={`item-${index}`} style={{ margin: '0 10px', listStyleType: 'none', fontSize: '14px' }}>
//                                         <span style={{ color: entry.color, fontWeight: 'bold' }}>{entry.value}</span>: {entry.payload.value}%
//                                       </li>
//                                     ))}
//                                   </ul>
//                                 );
//                               }}
//                             />
//                             </PieChart>
//                           </ResponsiveContainer>
//                         </div>
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="md:w-2/3">
//                     <h2 className="text-2xl font-bold mb-4">{data.priceTitle?.[1]}</h2>
//                     <div className="flex items-center gap-4 mb-6">
//                       <span className="text-2xl font-bold">₹{data.priceTitle?.[0]}</span>
//                       <a 
//                         href={data.priceTitle?.[2]} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                       >
//                         View on {data.platform.toUpperCase()}   {/*view on a plotform.. */}
//                       </a>
//                     </div>
                    
//                     <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                       <h3 className="font-semibold mb-3">Review Summary</h3>
//                       <p className="text-gray-700 leading-relaxed">{data.review}</p>
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

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-wrap justify-center gap-10 mb-6">
//           {parsedData.map((data, index) => (
//             <ProductCard key={index} data={data} />
//           ))}
//         </div>
//         <div className="flex justify-center gap-6">
//           {additionalSections.map((section) => (
//             <div
//               key={section.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg h-[250px] w-[400px]"
//               onClick={() => setExpandedCard({ id: section.id, title: section.title })}
//             >
//               <div className="p-4">
//                 <h3 className="text-center font-bold">{section.title}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//         {expandedCard && (
//           expandedCard.id === "price" ? 
//             renderPriceComparator() : 
//             renderExpandedView(expandedCard)
//         )}
//         {renderBankOffersModal()}
//       </div>
//     </div>
//   );
// };

// export default Sumresult;
