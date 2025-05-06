import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LoadSum.css'; 

const LoadSum = () => {
  const [currentFact, setCurrentFact] = useState('');
  const [factIndex, setFactIndex] = useState(0);
  const [fade, setFade] = useState('fade-in');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const hasRequestBeenSent = useRef(false);

  const facts = [
    "India's eCommerce market is projected to surge to $400 billion by 2030, driven by increasing internet penetration and digital adoption.",
    "Mobile commerce dominates India's online shopping landscape, accounting for approximately 80% of eCommerce gross merchandise value.",
    "With over 700 million internet users, India presents a massive opportunity for eCommerce businesses to tap into a diverse customer base.",
    "The number of online shoppers in India is rapidly expanding, expected to reach over 350 million by 2025, indicating significant growth potential.",
    "Consumer electronics and fashion are among the top-selling categories in Indian eCommerce, reflecting evolving lifestyle preferences and purchasing power.",
    "Tier 2 and Tier 3 cities are emerging as key growth drivers for eCommerce in India, fueled by improved logistics and digital infrastructure.",
    "Social commerce is gaining traction in India, with platforms like Instagram and Facebook becoming increasingly important channels for online sales.",
    "The Indian government's 'Digital India' initiative is playing a crucial role in fostering the growth of the eCommerce sector through infrastructure development and policy support.",
    "Quick commerce (q-commerce), focusing on rapid delivery of groceries and essentials, is a rapidly expanding segment within Indian eCommerce.",
    "Sustainability is becoming a growing concern for Indian online shoppers, with increasing demand for eco-friendly products and ethical sourcing practices."
  ];

  useEffect(() => {
    const changeFact = () => {
      setFade('fade-out');
      setTimeout(() => {
        setFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
        setFade('fade-in');
      }, 1000); // Match the CSS fade-out duration
    };

    const intervalId = setInterval(changeFact, 9000); // Change fact every 4 seconds

    return () => clearInterval(intervalId);
  }, [facts.length]);

  useEffect(() => {
    setCurrentFact(facts[factIndex]);
  }, [factIndex, facts]);

  useEffect(() => {
    const request_url = location.state?.requestBody;
    if (hasRequestBeenSent.current || !request_url) return;
    const maxWaitTime = 180000; // 180 seconds
    const timeoutId = setTimeout(() => {
      setError('Failed to fetch data within 180 seconds.');
    }, maxWaitTime);

    const fetchData = async () => {
      hasRequestBeenSent.current = true;
      try {
        const response = await fetch('http://192.168.151.236:5000/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ request_url }),
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        if (data) {
          clearTimeout(timeoutId);
          navigate('/summarize', { state: { result: data } });
        } else {
          throw new Error('No valid data received from server.');
        }
      } catch (err) {
        setError('An error occurred while fetching data.');
      } finally {
        clearTimeout(timeoutId);
        hasRequestBeenSent.current = false;
      }
    };

    fetchData();
    return () => clearTimeout(timeoutId);
  }, [location.state?.requestBody, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center p-6">
        <div className="loader mb-4"></div>
        <h2 className="text-lg font-semibold mb-4">Search might take up some time. Please wait...</h2>
        {error && <p className="text-red-500">{error}</p>}
        {!error && (
          <div className={`fact-box p-4 bg-gray-800 rounded-lg ${fade}`}>
            <p className="text-lg">{currentFact}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadSum;