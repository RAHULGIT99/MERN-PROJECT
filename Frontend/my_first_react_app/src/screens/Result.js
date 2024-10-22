import React, { useState } from 'react';
import './hdesign.css';

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
      const responsed = await fetch("http://192.168.116.236:8000/receive-json", {
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
    <div>
      <h2>Enter your URL below: </h2>
      <input type="text" id="user_input" required />
      <br /><br />
      <button onClick={dosomething} className='Link'>Submit</button>

      
      <div className="result-display">
        {result && <p>{result}</p>} 
        {error && <p className="error"><strong>Error:</strong> {error}</p>}
      </div>
    </div>
  );
}

export default Result;
