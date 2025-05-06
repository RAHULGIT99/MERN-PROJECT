// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to ReflectAI</h1>
      <p>We provide insightful feedback analysis.</p>
      <Link to="/signin">
        <button>Get Started</button>
      </Link>
    </div>
  );
};

export default Home;