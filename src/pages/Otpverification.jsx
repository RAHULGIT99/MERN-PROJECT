import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './otp.css';
const Otpverification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Access the passed data from the previous page

  // Extract data from the location state
  const data = location.state.info || {};
  // const { email, name, password } = data;
  console.log("data received from register is ",data)
  const email = data.Email
  const name = data.Name
  const password = data.Password
  const role = data.Role
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert('Please enter the OTP');
      return;
    }
    // Combine user details with OTP
    const completeInfo = {
      email: email,
      otp: otp,
      name: name,
      password: password,
      role:role
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

        if (responseData.message === 'Email verified successfully') {
          navigate('/login'); // Redirect to sign-in page
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
