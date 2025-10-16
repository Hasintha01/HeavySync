import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    phone: '',
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setMessage('No token found. Please log in again.');
          return;
        }
        const { data } = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
        setEditData({
          fullName: data.fullName || '',
          phone: data.phone || '',
        });
      } catch (err) {
        setMessage('Failed to load user info: ' + (err.response?.data?.message || err.message));
      }
    };
    fetchUser();
  }, []);

  const handleEditChange = e => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.put('http://localhost:5000/api/users/me', editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({ ...user, ...editData });
      setEditMode(false); // Always reset edit mode after save
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setEditMode(false); // Also reset edit mode on error
      setMessage('Failed to update profile: ' + (err.response?.data?.message || err.message));
    }
  };

  const handlePasswordChange = async e => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setMessage('New passwords do not match!');
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post('http://localhost:5000/api/users/change-password', {
        oldPassword: passwords.old,
        newPassword: passwords.new,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowPasswordModal(false);
      setMessage(res.data.message || 'Password changed successfully!');
      setTimeout(() => setMessage(''), 2000);
      setPasswords({ old: '', new: '', confirm: '' });
    } catch (err) {
      setMessage('Failed to change password: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {!user && !message ? (
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-12" style={{ textAlign: 'center' }}>
          <span>Loading profile...</span>
        </div>
      ) : message && !user ? (
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-12" style={{ textAlign: 'center', color: 'red' }}>
          <span>{message}</span>
        </div>
      ) : (
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <label htmlFor="fullName" className="block mb-1 font-medium">Full Name <span className="text-red-500">*</span></label>
              {editMode ? (
                <input type="text" name="fullName" id="fullName" value={editData.fullName} onChange={handleEditChange} required className="w-full px-3 py-2 border rounded" />
              ) : (
                <input type="text" name="fullName" id="fullName" value={user.fullName || ''} readOnly className="w-full px-3 py-2 border rounded bg-gray-100" />
              )}
            </div>
            <div>
              <label htmlFor="username" className="block mb-1 font-medium">Username <span className="text-red-500">*</span></label>
              <input type="text" name="username" id="username" value={user.username || ''} readOnly className="w-full px-3 py-2 border rounded bg-gray-100" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
              <input type="email" name="email" id="email" value={user.email || ''} readOnly className="w-full px-3 py-2 border rounded bg-gray-100" />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 font-medium">Contact Number <span className="text-red-500">*</span></label>
              {editMode ? (
                <input type="text" name="phone" id="phone" value={editData.phone} onChange={handleEditChange} required className="w-full px-3 py-2 border rounded" placeholder="0712345678" />
              ) : (
                <input type="text" name="phone" id="phone" value={user.phone || ''} readOnly className="w-full px-3 py-2 border rounded bg-gray-100" />
              )}
            </div>
            <div className="flex items-center gap-4 mt-4">
              {editMode ? (
                <button type="submit" className="py-2 px-6 rounded font-semibold text-white transition bg-gradient-to-r from-green-700 to-green-400 shadow-lg text-lg hover:from-green-800 hover:to-green-500">Save</button>
              ) : (
                <>
                  <button type="button" className="py-2 px-6 rounded font-semibold text-white transition bg-gradient-to-r from-blue-700 to-blue-400 shadow-lg text-lg hover:from-blue-800 hover:to-blue-500" onClick={() => setEditMode(true)}>Edit</button>
                </>
              )}
              <button type="button" className="py-2 px-6 rounded font-semibold text-white transition bg-gradient-to-r from-yellow-700 to-yellow-400 shadow-lg text-lg hover:from-yellow-800 hover:to-yellow-500" onClick={() => setShowPasswordModal(true)}>Change Password</button>
              <button type="button" className="py-2 px-6 rounded font-semibold text-white transition bg-gradient-to-r from-red-700 to-red-400 shadow-lg text-lg hover:from-red-800 hover:to-red-500" onClick={() => { localStorage.removeItem('authToken'); window.location.href = '/login'; }}>Log out</button>
            </div>
            {message && <div className="mt-4 text-center text-green-600">{message}</div>}
          </form>
          {showPasswordModal && (
            <div className="profile-modal-bg">
              <div className="profile-modal">
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <input type="password" name="old" placeholder="Old Password" value={passwords.old} onChange={e => setPasswords({ ...passwords, old: e.target.value })} className="profile-input" required />
                  <input type="password" name="new" placeholder="New Password" value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} className="profile-input" required />
                  <input type="password" name="confirm" placeholder="Confirm New Password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} className="profile-input" required />
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.</p>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="profile-btn save">Submit</button>
                    <button type="button" className="profile-btn logout" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
