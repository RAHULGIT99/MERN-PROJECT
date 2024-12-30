import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically handle login logic
      // For now, we'll just log the credentials
      console.log('Login attempted with:', { email, password });
      alert('Login submitted! (Check console for details)');
    }
  };

  return (
    //<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="bg-neutral-900 p-8 rounded-xl shadow-2xl w-full max-w-md border border-neutral-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-neutral-400">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-neutral-500 h-5 w-5" />
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
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 bg-neutral-800 border-neutral-700 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="signup" className="font-medium text-blue-500 hover:text-blue-400">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-400">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-blue-500 hover:text-blue-400">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;