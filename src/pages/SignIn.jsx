import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (email && password) {
      const info = {
        email: email,
        password: password,
      };

      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const response = await fetch("http://localhost:4000/signin", {
          method: "POST",
          body: JSON.stringify(info),
          headers: headers,
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Response:", responseData);

          if (responseData.reply === "true") {
            navigate("/result"); // Redirect to result page on success
          } else {
            alert(responseData.to_be_displayed || "Invalid credentials. Please try again.");
          }
        } else {
          console.error("Error: No response from server");
          alert("Failed to connect to the server. Please try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    } else {
      alert("Please fill in both email and password.");
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type={showPassword ? 'text' : 'password'} // Toggle between text and password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
          Show Password
        </label>
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;