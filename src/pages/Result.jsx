import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './result.css';

function Result() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    setError('');
    const user_input_storer = document.getElementById("user_input").value.trim();
    if (!user_input_storer) {
      setError('Please enter a valid URL.');
      return;
    }
    navigate('/load_sum', { state: { requestBody : { url : user_input_storer } } });
    
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#f5f5f5',
        paddingTop: '50px',
      }}
    >
      <div
        style={{
          width: '80%',
          maxWidth: '600px',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Enter your URL below:</h2>
        <input
          type="text"
          id="user_input"
          required
          style={{
            width: '100%',
            padding: '0.8rem',
            marginBottom: '1rem',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
        <button onClick={handleSubmit} className="Link">
          Submit
        </button>

        <div style={{ marginTop: '2rem' }}>
          {error && (
            <p
              style={{
                padding: '1rem',
                backgroundColor: '#ffebee',
                borderRadius: '5px',
                color: '#d32f2f',
                marginBottom: '1rem',
              }}
            >
              <strong>Error:</strong> {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;
