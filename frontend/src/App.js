import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';

// Import pages

const Dashboard = lazy(() => import('./modules/supplier/pages/Dashboard'));
const SupplierForm = lazy(() => import('./modules/supplier/pages/SupplierForm'));
const SupplierList = lazy(() => import('./modules/supplier/pages/SupplierList'));
const PurchaseOrderForm = lazy(() => import('./modules/supplier/pages/PurchaseOrderForm'));
const PurchaseOrderList = lazy(() => import('./modules/supplier/pages/PurchaseOrderList'));
const PurchaseOrderDetail = lazy(() => import('./modules/supplier/pages/PurchaseOrderDetail'));
const PurchaseOrderReport = lazy(() => import('./modules/supplier/pages/PurchaseOrderReport'));
const QuotationComparison = lazy(() => import('./modules/supplier/pages/QuotationComparison'));
const PartForm = lazy(() => import('./modules/supplier/pages/PartForm'));
const PartList = lazy(() => import('./modules/supplier/pages/PartList'));
const MainPage = lazy(() => import('./modules/auth/MainPage'));
const RegisterPage = lazy(() => import('./modules/auth/RegisterPage'));
const ProfilePage = lazy(() => import('./modules/auth/ProfilePage'));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
            {/* MainPage is now the root route and login page */}
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<MainPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Main app routes with header/footer */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <>
                    <Header />
                    <main className="App-main">
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />
                        {/* Supplier Routes */}
                        <Route path="suppliers" element={<SupplierList />} />
                        <Route path="suppliers/new" element={<SupplierForm />} />
                        <Route path="suppliers/edit/:id" element={<SupplierForm />} />
                        {/* Parts Routes */}
                        <Route path="parts" element={<PartList />} />
                        <Route path="parts/new" element={<PartForm />} />
                        <Route path="parts/edit/:id" element={<PartForm />} />
                        {/* Purchase Order Routes */}
                        <Route path="purchase-orders" element={<PurchaseOrderList />} />
                        <Route path="purchase-orders/new" element={<PurchaseOrderForm />} />
                        <Route path="purchase-orders/edit/:id" element={<PurchaseOrderForm />} />
                        <Route path="purchase-orders/:id" element={<PurchaseOrderDetail />} />
                        {/* Reports Routes */}
                        <Route path="reports/purchase-orders" element={<PurchaseOrderReport />} />
                        {/* Quotation Routes */}
                        <Route path="quotations" element={<QuotationComparison />} />
                        <Route path="profile" element={<ProfilePage />} />
                      </Routes>
                    </main>
                    <Footer />
                    {/* Toast Notifications Container */}
                    <Toaster
                      position="top-right"
                      reverseOrder={false}
                      toastOptions={{
                        duration: 4000,
                        style: {
                          background: '#363636',
                          color: '#fff',
                          padding: '16px',
                          borderRadius: '8px',
                        },
                        success: {
                          duration: 3000,
                          iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                          },
                        },
                        error: {
                          duration: 4000,
                          iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                          },
                        },
                      }}
                    />
                  </>
                </ProtectedRoute>
              }
            />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
