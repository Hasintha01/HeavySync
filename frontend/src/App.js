import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Import pages
import Dashboard from './modules/supplier/pages/Dashboard';
import SupplierForm from './modules/supplier/pages/SupplierForm';
import SupplierList from './modules/supplier/pages/SupplierList';
import PurchaseOrderForm from './modules/supplier/pages/PurchaseOrderForm';
import PurchaseOrderList from './modules/supplier/pages/PurchaseOrderList';
import PurchaseOrderDetail from './modules/supplier/pages/PurchaseOrderDetail';
import QuotationComparison from './modules/supplier/pages/QuotationComparison';
import PartForm from './modules/supplier/pages/PartForm';
import PartList from './modules/supplier/pages/PartList';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main className="App-main">
          <Routes>
            {/* Dashboard - Main landing page with statistics and insights */}
            <Route path="/" element={<Dashboard />} />
            
            {/* Supplier Routes */}
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/suppliers/new" element={<SupplierForm />} />
            <Route path="/suppliers/edit/:id" element={<SupplierForm />} />
            
            {/* Parts Routes */}
            <Route path="/parts" element={<PartList />} />
            <Route path="/parts/new" element={<PartForm />} />
            <Route path="/parts/edit/:id" element={<PartForm />} />
            
            {/* Purchase Order Routes */}
            <Route path="/purchase-orders" element={<PurchaseOrderList />} />
            <Route path="/purchase-orders/new" element={<PurchaseOrderForm />} />
            <Route path="/purchase-orders/edit/:id" element={<PurchaseOrderForm />} />
            <Route path="/purchase-orders/:id" element={<PurchaseOrderDetail />} />
            
            {/* Quotation Routes */}
            <Route path="/quotations" element={<QuotationComparison />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
