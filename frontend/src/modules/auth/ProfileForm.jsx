// ProfileForm.jsx
// User profile edit form for HeavySync
import React, { useState, useEffect } from 'react';

const ProfileForm = ({ user, onSave }) => {
  // Initial form state from user prop
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    role: user?.role || 'user',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Update form state when user prop changes
  useEffect(() => {
    setForm({
      fullName: user?.fullName || '',
      username: user?.username || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      role: user?.role || 'user',
    });
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    // Basic validation
    if (!form.fullName || !form.email) {
      setMessage('Please fill all required fields.');
      setLoading(false);
      return;
    }
    try {
      // Call parent onSave or send to backend
      await onSave?.(form);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block mb-1 font-medium">Full Name</label>
            <input type="text" name="fullName" id="fullName" value={form.fullName} onChange={handleChange} required className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">Username</label>
            <input type="text" name="username" id="username" value={form.username} onChange={handleChange} required className="w-full px-3 py-2 border rounded" disabled />
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
            <label htmlFor="address" className="block mb-1 font-medium">Address</label>
            <textarea name="address" id="address" value={form.address} onChange={handleChange} className="w-full px-3 py-2 border rounded" rows="2" />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1 font-medium">Role</label>
            <input type="text" name="role" id="role" value={form.role} className="w-full px-3 py-2 border rounded bg-gray-100" disabled />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded font-semibold text-white transition bg-gradient-to-r from-blue-700 to-blue-400 shadow-lg text-lg hover:from-blue-800 hover:to-blue-500"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
        {/* Show feedback message if present */}
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default ProfileForm;
