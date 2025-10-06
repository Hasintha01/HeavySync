import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="App-header">
      <nav>
        <h1>HeavySync - Supplier & Purchase Order Management</h1>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/suppliers">Suppliers</Link></li>
          <li><Link to="/suppliers/new">Add Supplier</Link></li>
          <li><Link to="/parts">Parts Inventory</Link></li>
          <li><Link to="/parts/new">Add Part</Link></li>
          <li><Link to="/purchase-orders">Purchase Orders</Link></li>
          <li><Link to="/purchase-orders/new">Create Order</Link></li>
          <li><Link to="/quotations">Compare Quotations</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
