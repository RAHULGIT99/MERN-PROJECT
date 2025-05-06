import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SignIn.css';
import './Otpverification.css';

const Otpverification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Access the passed data from the previous page

  // Extract data from the location state
  const data = location.state || {};
  const { Email: email, Name: name, Password: password, Age: age } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert('Please enter the OTP');
      return;
    }

    // Combine user details with OTP
    const completeInfo = {
      Email: email,
      Otp: otp,
      Name: name,
      Password: password,
      Age: age,
    };

    try {
      // Make a POST request to verify the OTP
      const response = await fetch('http://localhost:4000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeInfo),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        if (responseData.reply === 'true' && responseData.success === 'OTP verified successfully') {
  
          navigate('/signin'); // Redirect to sign-in page
        } else {
          alert(responseData.message || 'Invalid OTP. Please try again.');
        }
      } else {
        alert('Error during OTP verification. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div className="signin-container">
      <h1>OTP Verification</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};

export default Otpverification;