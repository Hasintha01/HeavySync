import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Import pages
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
            <Route path="/" element={
              <div className="home max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6 text-gray-800">Welcome to HeavySync</h2>
                <p className="text-xl text-gray-600 mb-8">Supplier & Purchase Order Management System</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
                    <h3 className="text-2xl font-semibold mb-3 text-blue-900">📦 Manage Inventory</h3>
                    <p className="text-gray-700">Track parts, suppliers, and stock levels efficiently.</p>
                  </div>
                  <div className="bg-green-50 p-8 rounded-lg border border-green-200">
                    <h3 className="text-2xl font-semibold mb-3 text-green-900">🛒 Purchase Orders</h3>
                    <p className="text-gray-700">Create and manage purchase orders with ease.</p>
                  </div>
                  <div className="bg-purple-50 p-8 rounded-lg border border-purple-200">
                    <h3 className="text-2xl font-semibold mb-3 text-purple-900">👥 Supplier Network</h3>
                    <p className="text-gray-700">Maintain relationships with your suppliers.</p>
                  </div>
                  <div className="bg-orange-50 p-8 rounded-lg border border-orange-200">
                    <h3 className="text-2xl font-semibold mb-3 text-orange-900">📊 Compare Quotations</h3>
                    <p className="text-gray-700">Get the best deals by comparing supplier quotes.</p>
                  </div>
                </div>
              </div>
            } />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/suppliers/new" element={<SupplierForm />} />
            <Route path="/suppliers/edit/:id" element={<SupplierForm />} />
            <Route path="/parts" element={<PartList />} />
            <Route path="/parts/new" element={<PartForm />} />
            <Route path="/parts/edit/:id" element={<PartForm />} />
            <Route path="/purchase-orders" element={<PurchaseOrderList />} />
            <Route path="/purchase-orders/new" element={<PurchaseOrderForm />} />
            <Route path="/purchase-orders/edit/:id" element={<PurchaseOrderForm />} />
            <Route path="/purchase-orders/:id" element={<PurchaseOrderDetail />} />
            <Route path="/quotations" element={<QuotationComparison />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
