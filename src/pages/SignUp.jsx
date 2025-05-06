import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (name  && email && password) {
      const info = {
        Name: name,
        Email: email,
        Password: password,
      };

      try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const response = await fetch("http://localhost:4000/generate-otp", {
          method: "POST",
          body: JSON.stringify(info),
          headers: headers,
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Response:", responseData);
          if (
            responseData ===
            "Please enter another email for registration because your currently entered email is already registered."
          ) {
            alert("Email already registered. Please use a different email.");
          } else {
            navigate("/verification", { state: info }); // Navigate to verification page with user info
          }
        } else {
          console.error("Error: Unable to register");
          alert("Failed to register. Please try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="signin-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type={showPassword ? "text" : "password"} // Toggle between text and password
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleCheckboxChange}
          />
          <label>Show Password</label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;