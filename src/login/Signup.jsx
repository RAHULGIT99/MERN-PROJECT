import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation logic
    const newErrors = {
      username: !username ? 'Username is required' : '',
      email: !email ? 'Email is required' : 
             !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Invalid email format' : '',
      password: !password ? 'Password is required' : 
                password.length < 8 ? 'Password must be at least 8 characters' : '',
      confirmPassword: !confirmPassword ? 'Please confirm your password' :
                       password !== confirmPassword ? 'Passwords do not match' : ''
    };

    setErrors(newErrors);

    // If no errors, proceed with signup
    if (Object.values(newErrors).every(error => error === '')) {
      console.log('Signup attempted', { username, email, password });
      // Add actual signup logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="bg-neutral-900 p-8 rounded-xl shadow-2xl w-full max-w-md border border-neutral-800">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
          <p className="text-neutral-400">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-neutral-300 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-neutral-500 h-5 w-5" />
              </div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 bg-neutral-800 border rounded-md focus:outline-none focus:ring-2 text-white ${
                  errors.username 
                    ? 'border-red-600 focus:ring-red-600' 
                    : 'border-neutral-700 focus:ring-blue-600'
                }`}
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-neutral-500 h-5 w-5" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 bg-neutral-800 border rounded-md focus:outline-none focus:ring-2 text-white ${
                  errors.email 
                    ? 'border-red-600 focus:ring-red-600' 
                    : 'border-neutral-700 focus:ring-blue-600'
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-neutral-500 h-5 w-5" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 bg-neutral-800 border rounded-md focus:outline-none focus:ring-2 text-white ${
                  errors.password 
                    ? 'border-red-600 focus:ring-red-600' 
                    : 'border-neutral-700 focus:ring-blue-600'
                }`}
                placeholder="Create a strong password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-neutral-500 h-5 w-5" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 bg-neutral-800 border rounded-md focus:outline-none focus:ring-2 text-white ${
                  errors.confirmPassword 
                    ? 'border-red-600 focus:ring-red-600' 
                    : 'border-neutral-700 focus:ring-blue-600'
                }`}
                placeholder="Repeat your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
              <a href="/first" className="font-medium text-blue-500 hover:text-blue-400"></a>
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-400">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-500 hover:text-blue-400">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;