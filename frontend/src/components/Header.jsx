import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="App-header">
      <nav>
        <h1>HeavySync - Supplier & Purchase Order Management</h1>
        <ul className="nav-menu">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/suppliers" end>Suppliers</NavLink></li>
          <li><NavLink to="/suppliers/new">Add Supplier</NavLink></li>
          <li><NavLink to="/parts" end>Parts Inventory</NavLink></li>
          <li><NavLink to="/parts/new">Add Part</NavLink></li>
          <li><NavLink to="/purchase-orders" end>Purchase Orders</NavLink></li>
          <li><NavLink to="/purchase-orders/new">Create Order</NavLink></li>
          <li><NavLink to="/quotations">Compare Quotations</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
