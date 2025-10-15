import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiUsers, FiChevronDown } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  // Hide header on login/register pages
  if (!token || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    closeDropdowns();
    navigate('/login');
  };

  return (
    <header className="App-header">
      <nav>
        <div className="header-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          {/* Brand Section */}
          <div className="logo-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 180 }}>
            <h1 style={{ fontWeight: 700, fontSize: '1.7rem', color: '#6366f1', marginBottom: 0 }}>HeavySync</h1>
            <p className="tagline" style={{ fontSize: '0.98rem', color: '#fff', fontWeight: 500, marginTop: 2, textShadow: '0 1px 2px rgba(0,0,0,0.07)' }}>Supplier & Purchase Order Management</p>
          </div>

          {/* Navigation Section */}
          <ul className="nav-menu" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', margin: 0, flex: 1, justifyContent: 'center' }}>
            <li>
              <NavLink
                to="/dashboard"
                className="nav-link"
                style={{
                  fontWeight: 500,
                  color: location.pathname === '/dashboard' ? '#6366f1' : '#fff',
                  fontSize: '1rem',
                  padding: '0.5rem 1rem',
                  transition: 'color 0.2s',
                }}
                activeStyle={{ textDecoration: 'underline', color: '#6366f1' }}
                onClick={closeDropdowns}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="dropdown-menu" style={{ position: 'relative' }}>
              <button
                className={`nav-link dropdown-toggle ${openDropdown === 'suppliers' ? 'active' : ''}`}
                style={{
                  fontWeight: 500,
                  color:
                    openDropdown === 'suppliers' || location.pathname === '/suppliers' || location.pathname === '/suppliers/new'
                      ? '#6366f1'
                      : '#fff',
                  fontSize: '1rem',
                  padding: '0.5rem 1rem',
                  background:
                    openDropdown === 'suppliers' || location.pathname === '/suppliers' || location.pathname === '/suppliers/new'
                      ? '#eef2ff'
                      : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom:
                    openDropdown === 'suppliers' || location.pathname === '/suppliers' || location.pathname === '/suppliers/new'
                      ? '1px solid #6366f1'
                      : '1px solid transparent',
                  transition: 'background 0.2s, color 0.2s, border-bottom 0.2s',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
                onClick={() => toggleDropdown('suppliers')}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#eef2ff';
                  e.currentTarget.style.color = '#6366f1';
                  e.currentTarget.style.borderBottom = '1px solid #6366f1';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background =
                    openDropdown === 'suppliers' || location.pathname === '/suppliers' || location.pathname === '/suppliers/new'
                      ? '#eef2ff'
                      : 'none';
                  e.currentTarget.style.color =
                    openDropdown === 'suppliers' || location.pathname === '/suppliers' || location.pathname === '/suppliers/new'
                      ? '#6366f1'
                      : '#fff';
                  e.currentTarget.style.borderBottom =
                    openDropdown === 'suppliers' || location.pathname === '/suppliers' || location.pathname === '/suppliers/new'
                      ? '1px solid #6366f1'
                      : '1px solid transparent';
                }}
              >
                Suppliers
                <FiChevronDown className="chevron" style={{ transform: openDropdown === 'suppliers' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: openDropdown === 'suppliers' ? '#6366f1' : '#6366f1' }} />
              </button>
              {openDropdown === 'suppliers' && (
                <div className="dropdown-content show" style={{ position: 'absolute', top: '2.5rem', left: 0, background: '#fff', color: '#374151', borderRadius: '0.75rem', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', minWidth: '190px', zIndex: 100, border: '1px solid #e5e7eb' }}>
                  <NavLink to="/suppliers" end onClick={closeDropdowns} className="dropdown-item" style={{ display: 'block', padding: '0.8rem 1.2rem', textDecoration: 'none', color: '#374151', fontWeight: 500, borderRadius: '0.5rem', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#eef2ff'} onMouseOut={e => e.currentTarget.style.background = 'none'}>View All Suppliers</NavLink>
                  <NavLink to="/suppliers/new" onClick={closeDropdowns} className="dropdown-item" style={{ display: 'block', padding: '0.8rem 1.2rem', textDecoration: 'none', color: '#374151', fontWeight: 500, borderRadius: '0.5rem', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#eef2ff'} onMouseOut={e => e.currentTarget.style.background = 'none'}>Add New Supplier</NavLink>
                </div>
              )}
            </li>
            <li className="dropdown-menu" style={{ position: 'relative' }}>
              <button
                className={`nav-link dropdown-toggle ${openDropdown === 'parts' ? 'active' : ''}`}
                style={{
                  fontWeight: 500,
                  color:
                    openDropdown === 'parts' || location.pathname === '/parts' || location.pathname === '/parts/new'
                      ? '#6366f1'
                      : '#fff',
                  fontSize: '1rem',
                  padding: '0.5rem 1rem',
                  background:
                    openDropdown === 'parts' || location.pathname === '/parts' || location.pathname === '/parts/new'
                      ? '#eef2ff'
                      : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom:
                    openDropdown === 'parts' || location.pathname === '/parts' || location.pathname === '/parts/new'
                      ? '1px solid #6366f1'
                      : '1px solid transparent',
                  transition: 'background 0.2s, color 0.2s, border-bottom 0.2s',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
                onClick={() => toggleDropdown('parts')}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#eef2ff';
                  e.currentTarget.style.color = '#6366f1';
                  e.currentTarget.style.borderBottom = '1px solid #6366f1';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background =
                    openDropdown === 'parts' || location.pathname === '/parts' || location.pathname === '/parts/new'
                      ? '#eef2ff'
                      : 'none';
                  e.currentTarget.style.color =
                    openDropdown === 'parts' || location.pathname === '/parts' || location.pathname === '/parts/new'
                      ? '#6366f1'
                      : '#fff';
                  e.currentTarget.style.borderBottom =
                    openDropdown === 'parts' || location.pathname === '/parts' || location.pathname === '/parts/new'
                      ? '1px solid #6366f1'
                      : '1px solid transparent';
                }}
              >
                Parts
                <FiChevronDown className="chevron" style={{ transform: openDropdown === 'parts' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: openDropdown === 'parts' ? '#6366f1' : '#6366f1' }} />
              </button>
              {openDropdown === 'parts' && (
                <div className="dropdown-content show" style={{ position: 'absolute', top: '2.5rem', left: 0, background: '#fff', color: '#374151', borderRadius: '0.75rem', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', minWidth: '190px', zIndex: 100, border: '1px solid #e5e7eb' }}>
                  <NavLink to="/parts" end onClick={closeDropdowns} className="dropdown-item" style={{ display: 'block', padding: '0.8rem 1.2rem', textDecoration: 'none', color: '#374151', fontWeight: 500, borderRadius: '0.5rem', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#eef2ff'} onMouseOut={e => e.currentTarget.style.background = 'none'}>View Inventory</NavLink>
                  <NavLink to="/parts/new" onClick={closeDropdowns} className="dropdown-item" style={{ display: 'block', padding: '0.8rem 1.2rem', textDecoration: 'none', color: '#374151', fontWeight: 500, borderRadius: '0.5rem', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#eef2ff'} onMouseOut={e => e.currentTarget.style.background = 'none'}>Add New Part</NavLink>
                </div>
              )}
            </li>
          </ul>

          {/* Actions Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <NavLink
              to="/quotations"
              className="nav-link quotations-btn"
              style={{
                background: '#6366f1',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '1.5rem',
                padding: '0.5rem 1.5rem',
                boxShadow: '0 1px 4px rgba(99,102,241,0.10)',
                border: 'none',
                transition: 'background 0.2s, box-shadow 0.2s',
                marginRight: '0.5rem',
                textDecoration: 'none',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#4f46e5'}
              onMouseOut={e => e.currentTarget.style.background = '#6366f1'}
            >
              Quotations
            </NavLink>
            <NavLink
              to="/reports/purchase-orders"
              className="nav-link reports-btn"
              style={{
                background: '#818cf8',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                borderRadius: '1.5rem',
                padding: '0.5rem 1.5rem',
                boxShadow: '0 1px 4px rgba(99,102,241,0.08)',
                border: 'none',
                transition: 'background 0.2s, box-shadow 0.2s',
                marginRight: '1.2rem',
                textDecoration: 'none',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#6366f1'}
              onMouseOut={e => e.currentTarget.style.background = '#818cf8'}
            >
              Reports
            </NavLink>
            {/* Profile Button with Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                className="nav-link profile-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '1.5rem',
                  cursor: 'pointer',
                  color: '#374151',
                  fontWeight: 600,
                  padding: '0.5rem 1.2rem',
                  boxShadow: '0 1px 4px rgba(99,102,241,0.06)',
                  transition: 'background 0.2s, box-shadow 0.2s',
                  height: '2.6rem',
                }}
                onClick={() => setOpenDropdown(openDropdown === 'profile' ? null : 'profile')}
                onMouseOver={e => e.currentTarget.style.background = '#e0e7ff'}
                onMouseOut={e => e.currentTarget.style.background = '#f3f4f6'}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#6366f1', color: '#fff', borderRadius: '50%', width: 28, height: 28, fontSize: '1.2rem', marginRight: 2 }}>
                  <FiUsers />
                </span>
                Profile
                <FiChevronDown style={{ marginLeft: 4, transition: 'transform 0.2s', transform: openDropdown === 'profile' ? 'rotate(180deg)' : 'rotate(0deg)', color: '#6366f1' }} />
              </button>
              {openDropdown === 'profile' && (
                <div style={{ position: 'absolute', right: 0, top: '2.8rem', background: '#fff', color: '#374151', borderRadius: '0.75rem', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', minWidth: '160px', zIndex: 200, border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', padding: '0.3rem 0' }}>
                  <NavLink
                    to="/profile"
                    className="dropdown-item"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.9rem 1.2rem', textDecoration: 'none', color: '#374151', fontWeight: 500, borderBottom: '1px solid #f3f4f6', background: 'none' }}
                    onClick={() => { closeDropdowns(); }}
                  >
                    <FiUsers style={{ color: '#6366f1' }} /> Profile
                  </NavLink>
                  <button
                    className="dropdown-item"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.9rem 1.2rem', color: '#374151', fontWeight: 500, background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    onClick={handleLogout}
                  >
                    <span style={{ color: '#6366f1', fontSize: '1.1rem' }}><FiUsers /></span> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
