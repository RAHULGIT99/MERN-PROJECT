import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Load_comp = () => {
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
    const request_url = location.state;
    console.log(request_url)
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
      let data; // Declare data variable here so it's accessible in both try and catch

      try {
        // Send the user input URL in the correct format
        const response = await fetch('http://127.0.0.1:5000/compare_products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  url1: request_url.url1,
            url2: request_url.url2,
            spec: request_url.spec }), // Sending user input as URL
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        data = await response.json(); // Capture the data from the response
        console.log(data)
        // Only proceed if the data is not 'Request ignored'
        if (data !== 'Request ignored') {
          clearInterval(timeoutId); // Clear the timeout when response is received
          navigate('/Abc', {state: { result: JSON.stringify(data) } }); // Navigate with the result
        } else {
          // Return early without triggering the error handling
          return;
        }

      } catch (err) {
        // Handle error if data is not 'Request ignored'
        if (data !== 'Request ignored') { // Check the value of data before throwing an error
          setError('An error occurred while fetching data.');
          console.error('Error fetching data:', err);
          clearInterval(timeoutId); // Clear the timeout if there's an error
        }
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

        <div className="text-white text-xl font-medium mb-4">
          <div>{displayText}<span className="cursor"></span></div>
        </div>

        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default Load_comp;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Compare = () => {
//   const navigate = useNavigate();
//   const [product1, setProduct1] = useState('');
//   const [product2, setProduct2] = useState('');
//   const [userQuery, setUserQuery] = useState('');

//   const handleCompare = () => {
//     // Create JSON object
//     const requestBody = {
//       url1: product1,
//       url2: product2,
//       spec: userQuery,
//     };

//     console.log(requestBody); // Log requestBody for debugging

//     // Navigate to results page with JSON data
//     navigate('/load_com', {
//       state: requestBody,
//     });
//   };

//   return (
//     <div className="compare-container">
//       <div className="compare-card">
//         <div className="card-header">
//           <h2>Product Comparison</h2>
//         </div>

//         <div className="card-content">
//           <div className="input-grid">
//             {/* Product 1 Input */}
//             <div className="input-group">
//               <label>Product 1</label>
//               <textarea
//                 placeholder="Enter first product details..."
//                 value={product1}
//                 onChange={(e) => setProduct1(e.target.value)}
//               />
//             </div>
//             {/* Product 2 Input */}
//             <div className="input-group">
//               <label>Product 2</label>
//               <textarea
//                 placeholder="Enter second product details..."
//                 value={product2}
//                 onChange={(e) => setProduct2(e.target.value)}
//               />
//             </div>

//             {/* Query Input */}
//             <div className="input-group">
//               <label>What would you like to compare?</label>
//               <input
//                 type="text"
//                 placeholder="e.g., Compare the battery life and performance..."
//                 value={userQuery}
//                 onChange={(e) => setUserQuery(e.target.value)}
//               />
//             </div>

//             {/* Compare Button */}
//             <button
//               className="compare-button"
//               onClick={handleCompare}
//               disabled={!product1 || !product2}
//             >
//               Compare Products
//             </button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .compare-container {
//           min-height: 100vh;
//           background-color: #f5f5f5;
//           padding: 1.5rem;
//         }

//         .compare-card {
//           background: white;
//           border-radius: 8px;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//           max-width: 800px;
//           margin: 0 auto;
//         }

//         .card-header {
//           padding: 1.5rem;
//           border-bottom: 1px solid #eee;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .card-header h2 {
//           margin: 0;
//           font-size: 1.5rem;
//           font-weight: 600;
//         }

//         .card-content {
//           padding: 1.5rem;
//         }

//         .input-grid {
//           display: grid;
//           gap: 1.5rem;
//         }

//         .input-group {
//           display: flex;
//           flex-direction: column;
//           gap: 0.5rem;
//         }

//         .input-group label {
//           font-size: 0.875rem;
//           font-weight: 500;
//           color: #374151;
//         }

//         textarea, input {
//           width: 100%;
//           padding: 0.75rem;
//           border: 1px solid #d1d5db;
//           border-radius: 6px;
//           font-size: 0.875rem;
//         }

//         textarea {
//           height: 8rem;
//           resize: vertical;
//         }

//         textarea:focus, input:focus {
//           outline: none;
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
//         }

//         .compare-button {
//           background-color: #3b82f6;
//           color: white;
//           border: none;
//           padding: 0.75rem 1.5rem;
//           border-radius: 6px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: background-color 0.2s;
//         }

//         .compare-button:hover {
//           background-color: #2563eb;
//         }

//         .compare-button:disabled {
//           background-color: #9ca3af;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Compare;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

// const Visual = () => {
//   const [inputUrl, setInputUrl] = useState('');
//   const navigate = useNavigate();  // Initialize the navigation hook

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // const trimmedUrl = inputUrl;
//     // console.log(trimmedUrl);

//     if (!inputUrl) {
//       alert('Please enter a valid URL.');
//       return;
//     }

//     // Navigate to the next page with the URL input passed in state
//     navigate('/load_visual', { state: { request_body: inputUrl } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
//               Visual Analytics Generator
//             </h2>
//             <p className="text-sm text-center text-gray-500 mb-4">
//               Paste a data visualization URL for instant insights
//             </p>
//           </div>

//           <div>
//             <textarea
//               value={inputUrl}
//               onChange={(e) => setInputUrl(e.target.value)}
//               placeholder="Enter visualization URL here..."
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm text-gray-700 resize-none"
//               rows={4}
//               required
//             />
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={!inputUrl.trim()}
//               className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Generate Visualization
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Visual;
// // console.log('handleSubmit function called');
// // console.log('trimmedUrl:', trimmedUrl);
// // console.log('navigate function called with url:', trimmedUrl);


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