// RegisterForm.jsx
// User registration form for HeavySync
// See: https://github.com/Hasintha01/HeavySync for backend API details
import React, { useState } from 'react';


const RegisterForm = () => {

  // Form state: fullName, username, email, password, confirmPassword, role, phone, terms
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    phone: '',
    terms: false
  });
  // Feedback message for user
  const [message, setMessage] = useState('');
  // Loading state for async request
  const [loading, setLoading] = useState(false);



  // Update form state when user types
  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };



  // Submit registration form to backend
  // If registration fails, show backend error message
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    // Basic validation
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setMessage('Please fill all required fields.');
      return;
    }
    if (form.password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    if (!form.terms) {
      setMessage('You must accept the terms & conditions.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! Redirecting to login...');
        setForm({
          fullName: '', username: '', email: '', password: '', confirmPassword: '', role: 'admin', phone: '', terms: false
        });
        // Redirect to login page after short delay
        setTimeout(() => {
          if (window.location) {
            window.location.href = '/login';
          }
        }, 1200);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('Server error');
    } finally {
      setLoading(false);
    }
  };



  // UI: registration form
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block mb-1 font-medium">Full Name</label>
            <input type="text" name="fullName" id="fullName" value={form.fullName} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">Username</label>
            <input type="text" name="username" id="username" value={form.username} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input type="email" name="email" id="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">Contact Number</label>
            <input type="text" name="phone" id="phone" value={form.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1 font-medium">Role</label>
            <select name="role" id="role" value={form.role} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input type="password" name="password" id="password" value={form.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="terms" id="terms" checked={form.terms} onChange={handleChange} className="mr-2" />
            <label htmlFor="terms" className="text-sm">I accept the <a href="/terms" className="text-blue-600 underline">terms & conditions</a></label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded font-semibold text-white transition bg-gradient-to-r from-green-700 to-green-400 shadow-lg text-lg hover:from-green-800 hover:to-green-500"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-600 hover:underline">Already have an account? Login</a>
        </div>
        {/* Show feedback message if present */}
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
