import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import pages
import SupplierForm from './modules/supplier/pages/SupplierForm';
import SupplierList from './modules/supplier/pages/SupplierList';
import PurchaseOrderForm from './modules/supplier/pages/PurchaseOrderForm';
import PurchaseOrderList from './modules/supplier/pages/PurchaseOrderList';
import QuotationComparison from './modules/supplier/pages/QuotationComparison';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <h1>HeavySync - Supplier & Purchase Order Management</h1>
            <ul className="nav-menu">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/suppliers">Suppliers</Link></li>
              <li><Link to="/suppliers/new">Add Supplier</Link></li>
              <li><Link to="/purchase-orders">Purchase Orders</Link></li>
              <li><Link to="/purchase-orders/new">Create Order</Link></li>
              <li><Link to="/quotations">Compare Quotations</Link></li>
            </ul>
          </nav>
        </header>

        <main className="App-main">
          <Routes>
            <Route path="/" element={
              <div className="home">
                <h2>Welcome to HeavySync</h2>
                <p>Supplier & Purchase Order Management System</p>
              </div>
            } />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/suppliers/new" element={<SupplierForm />} />
            <Route path="/purchase-orders" element={<PurchaseOrderList />} />
            <Route path="/purchase-orders/new" element={<PurchaseOrderForm />} />
            <Route path="/quotations" element={<QuotationComparison />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
