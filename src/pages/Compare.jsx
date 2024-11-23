import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Compare = () => {
  const navigate = useNavigate();
  const [product1, setProduct1] = useState('');
  const [product2, setProduct2] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async () => {
    setIsLoading(true);

    // Create JSON object
    const requestBody = {
      url1: product1,
      url2: product2,
      spec: userQuery,
    };
    console.log(requestBody)
    // Simulate API call
    // await new Promise(resolve => setTimeout(resolve, 1500));

    // Navigate to results page with JSON data
    navigate('/load_com', {
      state: requestBody,
    });
  };

  return (
    <div className="compare-container">
      <div className="compare-card">
        <div className="card-header">
          <h2>Product Comparison</h2>
        </div>

        <div className="card-content">
          <div className="input-grid">
            {/* Product 1 Input */}
            <div className="input-group">
              <label>Product 1</label>
              <textarea
                placeholder="Enter first product details..."
                value={product1}
                onChange={(e) => setProduct1(e.target.value)}
              />
            </div>

            <div className="arrow">→</div>

            {/* Product 2 Input */}
            <div className="input-group">
              <label>Product 2</label>
              <textarea
                placeholder="Enter second product details..."
                value={product2}
                onChange={(e) => setProduct2(e.target.value)}
              />
            </div>

            {/* Query Input */}
            <div className="input-group">
              <label>What would you like to compare?</label>
              <input
                type="text"
                placeholder="e.g., Compare the battery life and performance..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
              />
            </div>

            {/* Compare Button */}
            <button
              className="compare-button"
              onClick={handleCompare}
              disabled={isLoading || !product1 || !product2}
            >
              {isLoading ? (
                <span>Comparing Products...</span>
              ) : (
                'Compare Products'
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .compare-container {
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 1.5rem;
        }

        .compare-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-header h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .card-content {
          padding: 1.5rem;
        }

        .input-grid {
          display: grid;
          gap: 1.5rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .input-group label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        textarea, input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.875rem;
        }

        textarea {
          height: 8rem;
          resize: vertical;
        }

        textarea:focus, input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .arrow {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #9ca3af;
          font-size: 1.5rem;
        }

        .compare-button {
          background-color: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .compare-button:hover {
          background-color: #2563eb;
        }

        .compare-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Compare;
