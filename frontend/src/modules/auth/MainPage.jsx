// MainPage.jsx
// Main login and user creation page for HeavySync
// Shows username/password fields and a button to reveal the registration form
import React, { useState } from 'react';
import RegisterForm from './RegisterForm';

const MainPage = () => {

  // State to show/hide registration form
  const [showRegister, setShowRegister] = useState(false);
  // State for login form fields
  const [login, setLogin] = useState({ username: '', password: '' });
  // State for login feedback
  const [loginMessage, setLoginMessage] = useState('');
  // State for login loading
  const [loginLoading, setLoginLoading] = useState(false);

  // For navigation after login
  // Only import useNavigate if using react-router-dom v6+
  // If not available, replace with window.location
  let navigate;
  try {
    // Dynamically require to avoid breaking if not present
    // eslint-disable-next-line
    navigate = require('react-router-dom').useNavigate();
  } catch (e) {
    navigate = null;
  }

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
        setLoginMessage('Login successful!');
        // Navigate to dashboard
        if (navigate) {
          navigate('/');
        } else {
          window.location.href = '/';
        }
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
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition mb-2"
        >
          {loginLoading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
          onClick={() => setShowRegister(!showRegister)}
        >
          Create User
        </button>
        {/* Show login feedback message if present */}
        {loginMessage && <p className="mt-4 text-center text-red-600">{loginMessage}</p>}
      </form>
      {showRegister && <RegisterForm />}
    </div>
  );
};

export default MainPage;
