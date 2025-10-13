import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

// Dummy user data for initial layout (replace with API call)
// Remove dummyUser, use API data

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    fullName: '',
    phone: '',
    department: '',
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [message, setMessage] = useState('');

  // TODO: Replace with API call to fetch user info
  useEffect(() => {
    // Fetch user info from backend
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('No token found. Please log in again.');
          return;
        }
        const res = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setEditData({
            fullName: data.fullName || '',
            phone: data.phone || '',
            department: data.department || '',
          });
        } else {
          const errorText = await res.text();
          setMessage(`Error ${res.status}: ${errorText}`);
        }
      } catch (err) {
        setMessage('Failed to load user info: ' + err.message);
      }
    };
    fetchUser();
  }, []);

  const handleEditChange = e => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = e => {
    e.preventDefault();
    // API call to update user info
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch('/api/users/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(editData),
    })
      .then(res => res.json())
      .then(data => {
        setUser({ ...user, ...editData });
        setEditMode(false);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 2000);
      })
      .catch(() => {
        setMessage('Failed to update profile');
      });
  };

  const handlePasswordChange = e => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setMessage('New passwords do not match!');
      return;
    }
    const token = localStorage.getItem('token');
    fetch('/api/users/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: passwords.old,
        newPassword: passwords.new,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setShowPasswordModal(false);
        setMessage(data.message || 'Password changed successfully!');
        setTimeout(() => setMessage(''), 2000);
        setPasswords({ old: '', new: '', confirm: '' });
      })
      .catch(() => {
        setMessage('Failed to change password');
      });
  };

  return (
    <div className="profile-bg">
      {!user && !message ? (
        <div className="profile-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <span>Loading profile...</span>
        </div>
      ) : message && !user ? (
        <div className="profile-card" style={{ textAlign: 'center', padding: '3rem', color: 'red' }}>
          <span>{message}</span>
        </div>
      ) : (
        <>
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() : 'U'}
              </div>
              <div>
                <h2>{user.fullName || ''}</h2>
                <p className="profile-role">{user.role || ''}, HeavySync</p>
              </div>
            </div>
            <div className="profile-info">
              <div className="profile-row">
                <span>Email:</span>
                <span className="profile-value">{user.email || ''}</span>
              </div>
              <div className="profile-row">
                <span>Department:</span>
                <span className="profile-value">{editMode ? (
                  <input name="department" value={editData.department} onChange={handleEditChange} className="profile-input" />
                ) : (user.department || '')}</span>
              </div>
              <div className="profile-row">
                <span>Contact No:</span>
                <span className="profile-value">{editMode ? (
                  <input name="phone" value={editData.phone} onChange={handleEditChange} className="profile-input" />
                ) : (user.phone || '')}</span>
              </div>
              <div className="profile-row">
                <span>Joined:</span>
                <span className="profile-value">{user.joined || user.createdAt || ''}</span>
              </div>
              <div className="profile-row">
                <span>Last Login:</span>
                <span className="profile-value">{user.lastLogin || user.updatedAt || ''}</span>
              </div>
              <div className="profile-row">
                <span>User ID:</span>
                <span className="profile-value">{user.userId || user._id || ''}</span>
              </div>
              <div className="profile-row">
                <span>Account Type:</span>
                <span className="profile-value">{user.accountType || user.role || ''}</span>
              </div>
            </div>
            <div className="profile-actions">
              {editMode ? (
                <button className="profile-btn save" onClick={handleSave}>Save</button>
              ) : (
                <button className="profile-btn edit" onClick={() => setEditMode(true)}>Edit Details</button>
              )}
              <button className="profile-btn password" onClick={() => setShowPasswordModal(true)}>Change Password</button>
              <button className="profile-btn logout" onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Log out</button>
            </div>
            {message && <div className="profile-message">{message}</div>}
          </div>
          {showPasswordModal && (
            <div className="profile-modal-bg">
              <div className="profile-modal">
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <input type="password" name="old" placeholder="Old Password" value={passwords.old} onChange={e => setPasswords({ ...passwords, old: e.target.value })} className="profile-input" required />
                  <input type="password" name="new" placeholder="New Password" value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} className="profile-input" required />
                  <input type="password" name="confirm" placeholder="Confirm New Password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} className="profile-input" required />
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="profile-btn save">Submit</button>
                    <button type="button" className="profile-btn logout" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
