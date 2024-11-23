import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
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
  );
};

export default Sum;


// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { X, ChevronLeft, Info } from "lucide-react";

// const Sumresult = () => {
//   const location = useLocation();
//   const receivedMessage = location.state?.result || "No message received";

//   const platformImages = {
//     amazon: "ecom/amazon.webp",
//     flipkart: "ecom/flipkart.webp",
//     myntra: "ecom/myntra.jpg",
//   };

//   const isValidJSON = (str) => {
//     try {
//       JSON.parse(str);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   const parsedData = isValidJSON(receivedMessage)
//     ? JSON.parse(receivedMessage)?.results || []
//     : [];

//   const [expandedCard, setExpandedCard] = useState(null);
//   const [selectedPlatform, setSelectedPlatform] = useState(null);

//   // Mock bank offers data
//   const bankOffers = {
//     amazon: [
//       "10% Instant Discount on HDFC Bank Credit Cards",
//       "5% Cashback on Axis Bank Debit Cards",
//       "No Cost EMI on Select Credit Cards"
//     ],
//     flipkart: [
//       "15% Instant Discount with SBI Credit Cards",
//       "Flat ₹500 Off on Kotak Bank Credit Cards",
//       "Zero Processing Fee on ICICI Bank EMI"
//     ],
//     myntra: [
//       "Extra 10% Off with HDFC Bank Debit Cards",
//       "5% Cashback on Citi Bank Credit Cards",
//       "Special EMI Offers for RBL Bank Customers"
//     ]
//   };

//   const PriceComparatorTable = () => {
//     return (
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold mb-4">Price Comparator</h2>
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-3 text-left">Platform</th>
//               <th className="border p-3 text-left">Product</th>
//               <th className="border p-3 text-right">Price</th>
//               <th className="border p-3 text-center">Bank Offers</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parsedData.map((item) => (
//               <tr key={item.platform} className="hover:bg-gray-50">
//                 <td className="border p-3">
//                   <div className="flex items-center">
//                     <img 
//                       src={platformImages[item.platform]} 
//                       alt={`${item.platform} logo`} 
//                       className="w-10 h-10 mr-3 rounded-full object-cover"
//                       onError={(e) => {
//                         e.target.src = "/api/placeholder/400/400";
//                         e.target.alt = "Image not found";
//                       }}
//                     />
//                     {item.platform.toUpperCase()}
//                   </div>
//                 </td>
//                 <td className="border p-3 truncate max-w-xs">{item.priceTitle?.[1] || 'N/A'}</td>
//                 <td className="border p-3 text-right font-semibold">₹{item.priceTitle?.[0] || 'N/A'}</td>
//                 <td className="border p-3 text-center">
//                   <button 
//                     onClick={() => setSelectedPlatform(item.platform)}
//                     className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
//                   >
//                     <Info className="w-5 h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const BankOffersModal = ({ platform, onClose }) => {
//     return (
//       <div className="fixed inset-0 z-50 overflow-hidden">
//         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl w-96 max-h-[500px] overflow-auto">
//           <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
//             <h2 className="text-xl font-bold">{platform.toUpperCase()} Bank Offers</h2>
//             <button
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               onClick={onClose}
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//           <div className="p-6">
//             <ul className="space-y-4">
//               {bankOffers[platform]?.map((offer, index) => (
//                 <li 
//                   key={index} 
//                   className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500"
//                 >
//                   {offer}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <PriceComparatorTable />
//         {selectedPlatform && (
//           <BankOffersModal 
//             platform={selectedPlatform} 
//             onClose={() => setSelectedPlatform(null)} 
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sumresult;