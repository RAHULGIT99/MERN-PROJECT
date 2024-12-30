import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for JWT token and decode username
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload.username);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);



  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>ReflectAI</h1>
        </Link>
        
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
