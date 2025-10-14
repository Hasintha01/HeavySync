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
    phone: '',
    terms: false,
    role: 'user', // default role
  });
  // Feedback message for user
  const [message, setMessage] = useState('');
  // Loading state for async request
  const [loading, setLoading] = useState(false);



  // Validation state
  const [errors, setErrors] = useState({});


  // Validate email format
  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  // Validate phone number (10 digits)
  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  // Validate password strength
  const validatePassword = (password) => {
    // At least one uppercase, one lowercase, one number, one symbol, min 8 chars
    return /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password) &&
           /[^A-Za-z0-9]/.test(password) &&
           password.length >= 8;
  };

  // Update form state when user types
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: '' });
  };



  // Submit registration form to backend
  // If registration fails, show backend error message
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    let newErrors = {};
    // All details compulsory
    if (!form.fullName) newErrors.fullName = 'Full name is required.';
    if (!form.username) newErrors.username = 'Username is required.';
    if (!form.email) newErrors.email = 'Email is required.';
    if (!form.password) newErrors.password = 'Password is required.';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm password is required.';
    if (!form.phone) newErrors.phone = 'Phone number is required.';
    if (!form.terms) newErrors.terms = 'You must accept the terms & conditions.';
    // Password validation
    if (form.password && !validatePassword(form.password)) {
      newErrors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.';
    }
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    // Email validation
    if (form.email && !validateEmail(form.email)) newErrors.email = 'Invalid email format.';
    // Phone validation
    if (form.phone && !validatePhone(form.phone)) newErrors.phone = 'Phone number must be 10 digits.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    setLoading(true);
    try {
      // Check for duplicate username
      const checkRes = await fetch('http://localhost:5000/api/users/check-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username })
      });
      const checkData = await checkRes.json();
      if (!checkRes.ok || checkData.exists) {
        setErrors({ ...newErrors, username: 'Username already taken.' });
        setLoading(false);
        return;
      }
      // Register user
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! Redirecting to login...');
        setForm({
          fullName: '', username: '', email: '', password: '', confirmPassword: '', phone: '', terms: false, role: 'user'
        });
        setErrors({});
        // Redirect to login page after short delay
        setTimeout(() => {
            if (window.location) {
              window.location.href = '/login';
            }
        }, 1200);
      } else {
        // If backend returns validation errors for fields, display them next to inputs
        if (data.errors && typeof data.errors === 'object') {
          setErrors(prev => ({ ...prev, ...data.errors }));
          setMessage('');
        } else {
          setMessage(data.message || 'Registration failed');
        }
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
            <label htmlFor="fullName" className="block mb-1 font-medium">Full Name <span className="text-red-500">*</span></label>
            <input type="text" name="fullName" id="fullName" value={form.fullName} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">Username <span className="text-red-500">*</span></label>
            <input type="text" name="username" id="username" value={form.username} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
            <input type="email" name="email" id="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded" placeholder="user@example.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">Contact Number <span className="text-red-500">*</span></label>
            <input type="text" name="phone" id="phone" value={form.phone} onChange={handleChange} required className="w-full px-3 py-2 border rounded" placeholder="0712345678" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          {/* Role selection removed. Role is set to 'user' by default. */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password <span className="text-red-500">*</span></label>
            <input type="password" name="password" id="password" value={form.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded" minLength={8} />
            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.</p>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password <span className="text-red-500">*</span></label>
            <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="terms" id="terms" checked={form.terms} onChange={handleChange} className="mr-2" />
            <label htmlFor="terms" className="text-sm">I accept the <a href="/terms" className="text-blue-600 underline">terms & conditions</a></label>
            {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
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
          <a href="/main" className="text-blue-600 hover:underline">Already have an account? Login</a>
        </div>
        {/* Show feedback message if present */}
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
