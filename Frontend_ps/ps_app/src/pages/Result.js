import React, { useState } from 'react';
import './result.css';

function Result() {
  const [result, setResult] = useState(''); 
  const [error, setError] = useState(''); 

  async function dosomething() {
    setResult('');
    setError('');
    let user_input_storer = document.getElementById("user_input").value;
    var info = {
      "url": user_input_storer,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      const responsed = await fetch("http://192.168.21.91:8000/receive-json", {
        method: "POST",
        body: JSON.stringify(info),
        headers: myHeaders,
      });
      if (responsed.ok) {
        const responsed_new = await responsed.json();
        console.log(responsed_new);

        if (responsed_new.message) {
          setResult(responsed_new.message); 
        } else {
          setError("No message found in the response.");
        }
      } else {
        setError("Failed to fetch data from the server.");
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: '#f5f5f5',
      paddingTop: '50px'
    }}>
      <div style={{
        width: '80%',
        maxWidth: '600px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
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
            border: '1px solid #ddd'
          }}
        />
        <button 
          onClick={dosomething} 
          className="Link"
        >
          Submit
        </button>

        <div style={{ marginTop: '2rem' }}>
          {result && (
            <p style={{
              padding: '1rem',
              backgroundColor: '#e8f5e9',
              borderRadius: '5px',
              marginBottom: '1rem',
              wordBreak: 'break-word'
            }}>
              {result}
            </p>
          )}
          {error && (
            <p style={{
              padding: '1rem',
              backgroundColor: '#ffebee',
              borderRadius: '5px',
              color: '#d32f2f',
              marginBottom: '1rem'
            }}>
              <strong>Error:</strong> {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;
