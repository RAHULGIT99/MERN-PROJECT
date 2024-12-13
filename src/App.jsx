import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sum from './pages/Sum';
import Compare from './pages/Compare';
import Sumresult from './pages/Sumresult';
import ComparePrices from './pages/Pricecomp';
import CompareResult from './pages/CompareResult';
import Visual from './pages/Visual';
import Visualres from './pages/visualres';
import Load_sum from './pages/Load_sum';
import Load_com from './pages/Load_com';
import Load_visual from './pages/Load_visual';
import Login from './login/Login';
import Signup from './login/Signup';
import Nav from './pages/Nav';
import Navfirst from './pages/Navfirst';
import Home from './com/Home';
import Profile from './pages/Profile';
import Otpverification from './pages/Otpverification';
import ProtectedRoute from './com/ProtectedRoute';
import Profile_customer from './pages/Profile_customer';
import Profile_seller from './pages/Profile_seller';
import Wishlist from './pages/Wishlist';

// Create role-specific route components
const SellerRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  
  if (!token || !decodedToken) {
    return <Navigate to="/login" />;
  }
  
  if (decodedToken.role !== 'seller') {
    return <Navigate to="/profile" />;
  }
  
  return children;
};

const CustomerRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  
  if (!token || !decodedToken) {
    return <Navigate to="/login" />;
  }
  
  if (decodedToken.role !== 'customer') {
    return <Navigate to="/profile" />;
  }
  
  return children;
};

// AppContent component that uses useLocation
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Check authentication status and role
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(!!token);
    setUserRole(role || '');
  }, [location.pathname]);

  return (
    <>
      {/* Show Nav based on auth status */}
      {location.pathname !== '/login' && 
       location.pathname !== '/signup' && 
       location.pathname !== '/otp' && 
       (isLoggedIn ? <Nav /> : <Navfirst />)}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otpverification />} />
        
        {/* Common Routes - Accessible to all */}
        <Route path="/summarize" element={<Sum />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/visual" element={<Visual />} />

        {/* Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Seller Profile Route */}
        <Route path="/profile-seller" element={
          <SellerRoute>
            <Profile_seller />
          </SellerRoute>
        } />
        
        {/* Customer Profile Route */}
        <Route path="/profile-customer" element={
          <CustomerRoute>
            <Profile_customer />
          </CustomerRoute>
        } />
      
        {/* Customer-only Routes */}
        <Route path="/sumresult" element={
          <ProtectedRoute>
            <Sumresult />
          </ProtectedRoute>
        } />

        <Route path="/pricecomp" element={
          <ProtectedRoute>
            <ComparePrices />
          </ProtectedRoute>
        } />

        <Route path="/load_sum" element={
          <ProtectedRoute>
            <Load_sum />
          </ProtectedRoute>
        } />

        <Route path="/load_com" element={
          <ProtectedRoute>
            <Load_com />
          </ProtectedRoute>
        } />

        <Route path="/wishlist" element={
          <CustomerRoute>
            <Wishlist />
          </CustomerRoute>
        } />

        {/* Seller-only Routes */}
        <Route path="/load_visual" element={
          <ProtectedRoute>
            <Load_visual />
          </ProtectedRoute>
        } />

        <Route path="/visualres" element={
          <ProtectedRoute>
            <Visualres />
          </ProtectedRoute>
        } />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

// Main App component wrapped with Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
