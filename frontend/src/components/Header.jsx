import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiPackage, FiShoppingCart, FiFileText, FiPlusCircle, FiBarChart2, FiChevronDown, FiList } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="App-header">
      <nav>
        <div className="header-container">
          <div className="logo-section">
            <h1>HeavySync</h1>
            <p className="tagline">Supplier & Purchase Order Management</p>
          </div>
          
          <ul className="nav-menu">
            <li>
              <NavLink to="/" end className="nav-link" onClick={closeDropdowns}>
                <FiHome className="icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            {/* Suppliers Dropdown */}
            <li className="dropdown-menu">
              <button 
                className={`nav-link dropdown-toggle ${openDropdown === 'suppliers' ? 'active' : ''}`}
                onClick={() => toggleDropdown('suppliers')}
              >
                <FiUsers className="icon" />
                <span>Suppliers</span>
                <FiChevronDown className={`chevron ${openDropdown === 'suppliers' ? 'open' : ''}`} />
              </button>
              <div className={`dropdown-content ${openDropdown === 'suppliers' ? 'show' : ''}`}>
                <NavLink to="/suppliers" end onClick={closeDropdowns} className="dropdown-item">
                  <FiList className="icon" />
                  View All Suppliers
                </NavLink>
                <NavLink to="/suppliers/new" onClick={closeDropdowns} className="dropdown-item">
                  <FiPlusCircle className="icon" />
                  Add New Supplier
                </NavLink>
              </div>
            </li>

            {/* Parts Dropdown */}
            <li className="dropdown-menu">
              <button 
                className={`nav-link dropdown-toggle ${openDropdown === 'parts' ? 'active' : ''}`}
                onClick={() => toggleDropdown('parts')}
              >
                <FiPackage className="icon" />
                <span>Parts</span>
                <FiChevronDown className={`chevron ${openDropdown === 'parts' ? 'open' : ''}`} />
              </button>
              <div className={`dropdown-content ${openDropdown === 'parts' ? 'show' : ''}`}>
                <NavLink to="/parts" end onClick={closeDropdowns} className="dropdown-item">
                  <FiList className="icon" />
                  View Inventory
                </NavLink>
                <NavLink to="/parts/new" onClick={closeDropdowns} className="dropdown-item">
                  <FiPlusCircle className="icon" />
                  Add New Part
                </NavLink>
              </div>
            </li>

            {/* Purchase Orders Dropdown */}
            <li className="dropdown-menu">
              <button 
                className={`nav-link dropdown-toggle ${openDropdown === 'orders' ? 'active' : ''}`}
                onClick={() => toggleDropdown('orders')}
              >
                <FiShoppingCart className="icon" />
                <span>Purchase Orders</span>
                <FiChevronDown className={`chevron ${openDropdown === 'orders' ? 'open' : ''}`} />
              </button>
              <div className={`dropdown-content ${openDropdown === 'orders' ? 'show' : ''}`}>
                <NavLink to="/purchase-orders" end onClick={closeDropdowns} className="dropdown-item">
                  <FiList className="icon" />
                  View All Orders
                </NavLink>
                <NavLink to="/purchase-orders/new" onClick={closeDropdowns} className="dropdown-item">
                  <FiPlusCircle className="icon" />
                  Create New Order
                </NavLink>
              </div>
            </li>

            {/* Tools Section */}
            <li className="nav-divider"></li>
            
            <li>
              <NavLink to="/quotations" className="nav-link" onClick={closeDropdowns}>
                <FiFileText className="icon" />
                <span>Quotations</span>
              </NavLink>
            </li>
            
            <li>
              <NavLink to="/reports/purchase-orders" className="nav-link" onClick={closeDropdowns}>
                <FiBarChart2 className="icon" />
                <span>Reports</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
