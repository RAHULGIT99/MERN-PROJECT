// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const Load_com = () => {
//   const [displayText, setDisplayText] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const hasInitialized = useRef(false); // Prevent repeated requests
//   const isDevelopment = process.env.NODE_ENV === 'development'; // Detect development mode

//   // const { amazon_url, flipkart_url } = location.state?.requestBody || {};

//   const facts = [
//     "India's eCommerce market is expected to reach $200 billion by 2026.",
//     "Around 70% of eCommerce transactions in India are made through mobile phones.",
//     "India has over 900 million internet users, making it one of the largest markets for eCommerce.",
//     "The number of online shoppers in India reached around 150 million in 2023.",
//     "Fashion and apparel is the largest category in Indian eCommerce, followed by electronics and groceries.",
//     "Digital payments, including UPI and wallets, are rapidly growing in India, making online shopping more accessible.",
//     "Flipkart and Amazon dominate the Indian eCommerce market, followed by Myntra, Snapdeal, and BigBasket.",
//     "Tier 2 and Tier 3 cities are increasingly adopting eCommerce, contributing to the market's growth.",
//     "The Digital India initiative has boosted cashless transactions and increased online shopping adoption.",
//     "By 2025, rural India is expected to contribute 30-35% of the total online shoppers in India.",
//   ];

//   useEffect(() => {
//     if (isDevelopment && hasInitialized.current) {
//       return; // Prevent second run in React Strict Mode (development only)
//     }

//     hasInitialized.current = true; // Mark as initialized

//     const request_url = location.state;
//     if (!request_url || !request_url.url1 || !request_url.url2 || !request_url.spec) {
//       setError('Invalid input received. Please check the provided data.');
//       return;
//     }


//     const animateText = (fact) => {
//       let currentIndex = 0;
//       const timePerChar = 10000 / fact.length;
    
//       const intervalId = setInterval(() => {
//         if (currentIndex < fact.length) {
//           setDisplayText(fact.slice(0, currentIndex + 1));
//           currentIndex++;
//         } else {
//           clearInterval(intervalId);
//           console.log('Text animation completed');
//         }
//       }, timePerChar);
    
//       return () => clearInterval(intervalId);
//     };
    

//     const selectedFact = facts[Math.floor(Math.random() * facts.length)];
//     const stopAnimation = animateText(selectedFact);

//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5000/compare_products', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             url1: request_url.url1,
//             url2: request_url.url2,
//             spec: request_url.spec,
//           }),
//         });


//         if (!response.ok) throw new Error('Network response was not ok');

//         const data = await response.json();
//         if (data !== 'Request ignored') {
//           navigate('/compres', { state: { result: JSON.stringify(data) } });
//         }
//       } catch (err) {
//         setError('An error occurred while fetching data.');
//         console.error('Error fetching data:', err);
//       }
//     };

//     const timeoutId = setTimeout(() => {
//       setError('Failed to fetch data within 240 seconds.');
//     }, 240000);

//     fetchData();

//     return () => {
//       stopAnimation(); // Cleanup text animation interval
//       clearTimeout(timeoutId); // Cleanup timeout
//     };
//   }, [location.state, navigate, facts, isDevelopment]);

//   const generateCubes = () => {
//     const cubes = [];
//     for (let h = 1; h <= 3; h++) {
//       for (let w = 1; w <= 3; w++) {
//         for (let l = 1; l <= 3; l++) {
//           cubes.push({ h, w, l });
//         }
//       }
//     }
//     return cubes;
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
//       <div className="w-full max-w-lg p-8 text-center">
//         <div className="relative h-64 mb-6">
//           <div className="container">
//             <style jsx>{`
//               .container {
//                 position: relative;
//                 height: 100px;
//                 width: 86px;
//                 transform: scale(0.5);
//                 transform-origin: center center;
//                 margin: 100px auto;
//               }

//               .cube {
//                 position: absolute;
//                 width: 86px;
//                 height: 100px;
//               }

//               .face {
//                 height: 50px;
//                 width: 50px;
//                 position: absolute;
//                 transform-origin: 0 0;
//               }

//               .right {
//                 background: #E79C10;
//                 transform: rotate(-30deg) skewX(-30deg) translate(49px, 65px) scaleY(0.86);
//               }

//               .left {
//                 background: #D53A33;
//                 transform: rotate(90deg) skewX(-30deg) scaleY(0.86) translate(25px, -50px);
//               }

//               .top {
//                 background: #1d9099;
//                 transform: rotate(210deg) skew(-30deg) translate(-75px, -22px) scaleY(0.86);
//                 z-index: 2;
//               }

//               ${generateCubes().map(({ h, w, l }) => `
//                 .h${h}.w${w}.l${l} {
//                   z-index: -${h};
//                   animation: h${h}w${w}l${l} 3s ease infinite;
//                 }

//                 @keyframes h${h}w${w}l${l} {
//                   0% {
//                     transform: translate(${(w * -50 - 50) + (l * 50 + 50)}%, ${(h * 50 - 200) + (w * 25 - 25) + (l * 25 + 25)}%);
//                   }
//                   14% {
//                     transform: translate(${(w * -50 - 50) + (l * 100 - 50)}%, ${(h * 50 - 200) + (w * 25 - 25) + (l * 50 - 25)}%);
//                   }
//                   28% {
//                     transform: translate(${(w * -100 + 50) + (l * 100 - 50)}%, ${(h * 50 - 200) + (w * 50 - 75) + (l * 50 - 25)}%);
//                   }
//                   43% {
//                     transform: translate(${(w * -100 - 100) + (l * 100 + 100)}%, ${(h * 100 - 400) + (w * 50 - 50) + (l * 50 + 50)}%);
//                   }
//                   57% {
//                     transform: translate(${(w * -100 - 100) + (l * 50 + 200)}%, ${(h * 100 - 400) + (w * 50 - 50) + (l * 25 + 100)}%);
//                   }
//                   71% {
//                     transform: translate(${(w * -50 - 200) + (l * 50 + 200)}%, ${(h * 100 - 375) + (w * 25 - 25) + (l * 25 + 100)}%);
//                   }
//                   85%, 100% {
//                     transform: translate(${(w * -50 - 50) + (l * 50 + 50)}%, ${(h * 50 - 200) + (w * 25 - 25) + (l * 25 + 25)}%);
//                   }
//                 }
//               `).join('\n')}

//               @keyframes blink {
//                 0%, 100% { opacity: 1; }
//                 50% { opacity: 0; }
//               }

//               .cursor {
//                 display: inline-block;
//                 width: 2px;
//                 height: 1em;
//                 background-color: white;
//                 margin-left: 2px;
//                 animation: blink 1s step-end infinite;
//                 vertical-align: middle;
//               }
//             `}</style>

//             {generateCubes().map(({ h, w, l }, index) => (
//               <div key={index} className={`cube h${h} w${w} l${l}`}>
//                 <div className="face top"></div>
//                 <div className="face left"></div>
//                 <div className="face right"></div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="text-white text-xl font-medium mb-4">
//           <div>{displayText}<span className="cursor"></span></div>
//         </div>

//         {error && <div className="text-red-500">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default Load_com;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Load_com = () => {
  const [displayText, setDisplayText] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const hasInitialized = useRef(false); // Prevent repeated requests
  const isDevelopment = process.env.NODE_ENV === 'development'; // Detect development mode

  // const { amazon_url, flipkart_url } = location.state?.requestBody || {};

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
    if (isDevelopment && hasInitialized.current) {
      return; // Prevent second run in React Strict Mode (development only)
    }

    hasInitialized.current = true; // Mark as initialized

    const request_url = location.state;
    if (!request_url || !request_url.url1 || !request_url.url2 || !request_url.spec) {
      setError('Invalid input received. Please check the provided data.');
      return;
    }


    const animateText = (fact) => {
      let currentIndex = 0;
      const timePerChar = 10000 / fact.length;
    
      const intervalId = setInterval(() => {
        if (currentIndex < fact.length) {
          setDisplayText(fact.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          console.log('Text animation completed');
        }
      }, timePerChar);
    
      return () => clearInterval(intervalId);
    };
    

    const selectedFact = facts[Math.floor(Math.random() * facts.length)];
    const stopAnimation = animateText(selectedFact);

    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/compare_products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url1: request_url.url1,
            url2: request_url.url2,
            spec: request_url.spec,
          }),
        });


        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        if (data !== 'Request ignored') {
          navigate('/compres', { state: { result: JSON.stringify(data) } });
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
        console.error('Error fetching data:', err);
      }
    };

    const timeoutId = setTimeout(() => {
      setError('Failed to fetch data within 240 seconds.');
    }, 240000);

    fetchData();

    return () => {
      stopAnimation(); // Cleanup text animation interval
      clearTimeout(timeoutId); // Cleanup timeout
    };
  }, [location.state, navigate, facts, isDevelopment]);

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

export default Load_com;

