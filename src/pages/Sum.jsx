import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  Navfirst from './Navfirst';

const Sum = () => {
  const [inputUrl, setInputUrl] = useState('');
  const navigate = useNavigate();
  const [userLink, setUserLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const trimmedUrl = inputUrl.trim();


    // const handleInputChange = (e) => {
    //   setUserLink(e.target.value);
    // };

    if (!trimmedUrl) {
      alert('Please enter a valid product URL.');
      return;
    }

    try {

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
              Product Summarizer (Only Electronics)
            </h2>
            <p className="text-gray-900 text-center mb-4">
              Paste a product URL (or) enter text in English, Hindi or Telugu to get an instant summary
              <p>
                Ex Url: https://amzn.in/d/gZk1plr
              </p>
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
            <h3>  Note: Supported Platforms: Amazon, Flipkart, Croma, Reliance Digital, Vijay Sales and Sangeetha (Search might take up to 2 minutes)</h3>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Sum;



// //with login
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import  Navfirst from './Navfirst';
// import Chatbot from '../com/Chatbot';

// const Sum = () => {
//   const [inputUrl, setInputUrl] = useState('');
//   const navigate = useNavigate();
//   const [userLink, setUserLink] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const trimmedUrl = inputUrl.trim();

//     if (!trimmedUrl) {
//       alert('Please enter a valid product URL.');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('userRole');

//     if (!token) {
//       alert('Please login to continue');
//       navigate('/login');
//       return;
//     }

//     if (userRole?.toLowerCase() === 'seller') {
//       alert('Sorry, only customers can access the summarizer feature. Sellers can access the visual analytics feature.');
//       // navigate('/');
//       return;
//     }

//     try {
//       // new URL(trimmedUrl);
//       navigate('/load_sum', { 
//         state: { 
//           requestBody: { url: trimmedUrl } 
//         } 
//       });
//     } catch (error) {
//       alert('Please enter a valid URL format.');
//     }
//   };

//   return (
//     <>
//     <Navfirst/>
//     <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
//       <div className="w-full max-w-[100vh]">
//         <form 
//           onSubmit={handleSubmit} 
//           className="bg-white shadow-xl rounded-2xl overflow-hidden"
//         >
//           <div className="p-8 space-y-6">
//             <h2 className="text-3xl font-extrabold text-gray-900 text-center">
//               Product URL Summarizer
//             </h2>
//             <p className="text-gray-600 text-center mb-4">
//               Paste a product URL to get an instant summary
//             </p>
            
//             <div>
//               <textarea
//                 value={inputUrl}
//                 onChange={(e) => setInputUrl(e.target.value)}
//                 placeholder="Enter product URL here..."
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700 resize-none"
//                 rows={4}
//                 required
//               />
//             </div>
            
//             <div>
//               <button
//                 type="submit"
//                 disabled={!inputUrl.trim()}
//                 className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Generate Summary
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//       <Chatbot />
//     </div>
//     </>
//   );
// };

// export default Sum;



