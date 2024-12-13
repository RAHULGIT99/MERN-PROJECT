import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Load_visual = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [dots, setDots] = useState('');
  const requestSentRef = useRef(false);
  const typingTimeout = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [hasShownAlert, setHasShownAlert] = useState(false);

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

  const typeFact = (fact) => {
    let currentIndex = 0;
    const textLength = fact.length;
    const timePerChar = 100; // Time per character in ms

    const typeChar = () => {
      if (currentIndex <= textLength) {
        setDisplayText(fact.slice(0, currentIndex));
        currentIndex++;
        typingTimeout.current = setTimeout(typeChar, timePerChar);
      } else {
        // After typing, wait for 2 seconds and show the next fact
        setTimeout(() => {
          setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
        }, 2000);
      }
    };

    typeChar();
  };

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

  useEffect(() => {
    const { isLoggedIn, userRole } = location.state || {};
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (userRole?.toLowerCase() === 'customer' && !hasShownAlert) {
      setHasShownAlert(true);
      alert('Sorry, only sellers can access the visualization results. Please login as a seller to use this feature.');
      navigate('/visual', { replace: true });
      return;
    }

    if (!userRole?.toLowerCase() === 'customer') {
      // Loading animation only for sellers
      const intervalId = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [location.state, navigate, hasShownAlert]);

  useEffect(() => {
    console.log('Location state:', location.state);
    
    const { isLoggedIn, userRole } = location.state || {};
    
    if (!isLoggedIn || userRole?.toLowerCase() === 'customer') {
      return;
    }

    const fetchData = async () => {
      if (requestSentRef.current) return;

      console.log('Fetching data for URL:', location.state.request_url);
      
      try {
        requestSentRef.current = true;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 210000);
        
        const response = await fetch('http://127.0.0.1:5000/get-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            request_url: location.state.request_url,
            userRole: userRole?.toLowerCase(),
            userEmail: location.state.userEmail
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Failed to fetch visualization data. Server returned ${response.status}`);
        }

        const data = await response.json();
        console.log('Raw data from server:', data);
        console.log('Type of review_summary:', typeof data.review_summary);

        let reviewSummary;
        try {
          reviewSummary = typeof data.review_summary === 'string'
            ? JSON.parse(data.review_summary)
            : data.review_summary;
          console.log('Parsed review summary:', reviewSummary);
        } catch (parseError) {
          console.error('Error parsing review_summary:', parseError);
          throw parseError;
        }

        const parsedData = {
          review_summary: reviewSummary
        };
        console.log('Final data to be sent:', parsedData);

        navigate('/visualres', {
          state: {
            serverData: parsedData,
            timestamp: new Date().getTime() // Add timestamp to force state change
          }
        });
      } catch (err) {
        console.error('Error details:', err);
        if (err.name === 'AbortError') {
          setError('Request timed out after 210 seconds. The server might be busy, please try again.');
        } else {
          setError(`Failed to fetch visualization data: ${err.message}`);
        }
      }
    };

    if (!requestSentRef.current) {
      fetchData();
    }
  }, [location.state, navigate]);

  useEffect(() => {
    typeFact(facts[currentFactIndex]);
    return () => clearTimeout(typingTimeout.current);
  }, [currentFactIndex]);

  const handleTryAgain = () => {
    requestSentRef.current = false;
    setError(null);
    navigate('/visual');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={handleTryAgain}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
      </div>
    </div>
  );
};

export default Load_visual;
