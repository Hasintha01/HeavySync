// MainPage.jsx
// Main login and user creation page for HeavySync
// Shows username/password fields and a button to navigate to RegisterForm
import React, { useState } from 'react';

const MainPage = () => {

  // For navigation
  let navigate;
  try {
    navigate = require('react-router-dom').useNavigate();
  } catch (e) {
    navigate = null;
  }
  // State for login form fields
  const [login, setLogin] = useState({ username: '', password: '' });
  // State for login feedback
  const [loginMessage, setLoginMessage] = useState('');
  // State for login loading
  const [loginLoading, setLoginLoading] = useState(false);

  // Handle login field changes
  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // Handle login submit: send credentials to backend, store JWT, navigate to dashboard
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        // Store JWT in localStorage for future requests
        localStorage.setItem('token', data.token);
        setLoginMessage('Login successful! Redirecting to dashboard...');
        // Navigate to dashboard page
        setTimeout(() => {
          if (navigate) {
            navigate('/dashboard');
          } else {
            window.location.href = '/dashboard';
          }
        }, 1200);
      } else {
        setLoginMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setLoginMessage('Server error');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Removed welcome text as requested */}
      <form onSubmit={handleLoginSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={login.username}
          onChange={handleLoginChange}
          required
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={login.password}
          onChange={handleLoginChange}
          required
          className="w-full px-3 py-2 border rounded mb-4"
        />
        <button
          type="submit"
          disabled={loginLoading}
          className="w-full py-2 rounded font-semibold mb-2 text-white transition bg-gradient-to-r from-blue-700 to-blue-400 shadow-lg text-lg hover:from-blue-800 hover:to-blue-500"
        >
          {loginLoading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          className="w-full py-2 rounded font-semibold text-white transition bg-gradient-to-r from-green-700 to-green-400 shadow-lg text-lg hover:from-green-800 hover:to-green-500"
          onClick={() => navigate ? navigate('/register') : window.location.href = '/register'}
        >
          Create Account
        </button>
        {/* Show login feedback message if present */}
        {loginMessage && <p className="mt-4 text-center text-red-600">{loginMessage}</p>}
      </form>
    </div>
  );
};

export default MainPage;
