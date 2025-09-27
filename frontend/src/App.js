// src/App.js

/**
 * Main App Component for HeavySync Purchase Management System
 * 
 * This is the root component that sets up:
 * - React Router for navigation
 * - Main layout with navigation and routing
 * - Global styles and theming
 * - Authentication context (ready for future implementation)
 * 
 * The app includes:
 * - Supplier management pages
 * - Purchase order management
 * - Quotation comparison system
 * - Responsive navigation
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

// Import supplier module pages
import SupplierList from './modules/supplier/pages/SupplierList';
import SupplierForm from './modules/supplier/pages/SupplierForm';
import PurchaseOrderList from './modules/supplier/pages/PurchaseOrderList';
import PurchaseOrderForm from './modules/supplier/pages/PurchaseOrderForm';
import QuotationComparison from './modules/supplier/pages/QuotationComparison';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Header */}
        <Navigation />
        
        {/* Main Content Area */}
        <main className="container mx-auto px-4 py-6">
          <Routes>
            {/* Landing Page Route */}
            <Route path="/" element={<LandingPage />} />
            {/* Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Supplier Management Routes */}
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/suppliers/new" element={<SupplierForm />} />
            <Route path="/suppliers/:id/edit" element={<SupplierForm />} />
            
            {/* Purchase Order Routes */}
            <Route path="/purchase-orders" element={<PurchaseOrderList />} />
            <Route path="/purchase-orders/new" element={<PurchaseOrderForm />} />
            <Route path="/purchase-orders/:id/edit" element={<PurchaseOrderForm />} />
            
            {/* Quotation Routes */}
            <Route path="/quotations/:orderId" element={<QuotationComparison />} />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;