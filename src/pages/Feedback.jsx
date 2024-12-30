// src/pages/Feedback.js
import React, { useState } from 'react';
import './Feedback.css';


const Feedback = () => {
  const [productLink, setProductLink] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleGenerate = () => {
    // Here you would typically call your API to generate feedback based on the link.
    setFeedback(`Feedback for product at ${productLink}: This is a great product!`);
  };

  return (
    <div>
      <h1>Generate Feedback</h1>
      <input
        type="text"
        value={productLink}
        onChange={(e) => setProductLink(e.target.value)}
        placeholder="Enter product link"
      />
      <button onClick={handleGenerate}>Generate</button>
      {feedback && <div><h2>Feedback:</h2><p>{feedback}</p></div>}
    </div>
  );
};

export default Feedback;
