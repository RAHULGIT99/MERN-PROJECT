import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Load_visual = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [dots, setDots] = useState('');
  const requestSentRef = useRef(false);

  useEffect(() => {
    // Loading animation
    const intervalId = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log('Location state:', location.state);
    
    const fetchData = async () => {
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
          body: JSON.stringify({ request_url: location.state.request_url }),
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <div className="relative mb-6">
          <div className="container">
            <div className="loader"></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Generating Visualization{dots}
        </h2>
        <p className="text-gray-600">Please wait while we process your request</p>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 20px 0;
        }
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Load_visual;
