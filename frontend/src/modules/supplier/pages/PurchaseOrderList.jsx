// frontend/src/modules/supplier/pages/PurchaseOrderList.jsx

/**
 * PurchaseOrderList Page Component
 * 
 * This page displays a comprehensive list of all purchase orders with filtering capabilities.
 * Features:
 * - Fetches purchase order data with supplier information populated
 * - Advanced filtering by status, supplier, date range
 * - Search functionality across order items
 * - Responsive card-based layout
 * - Status-based color coding
 * - Pagination support for large datasets
 * - Quick actions (view, edit, download PDF, change status)
 * 
 * Integration points:
 * - Uses PurchaseOrderCard component for consistent display
 * - Connects to purchaseOrderService for API calls
 * - Handles different order statuses: pending, approved, received, cancelled
 */

import React, { useEffect, useState } from "react";
import purchaseOrderService from "../services/purchaseOrderService";
import PurchaseOrderCard from "../components/PurchaseOrderCard";

const PurchaseOrderList = () => {
  // Main data state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering and search state
  const [filters, setFilters] = useState({
    status: '', // Filter by order status
    supplier: '', // Filter by supplier ID
    fromDate: '', // Start date for date range filter
    toDate: '', // End date for date range filter
    searchQuery: '', // Text search across order items
  });
  
  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  /**
   * Fetches purchase orders with current filters and pagination
   * Called on component mount and when filters/pagination changes
   */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Prepare query parameters
      const queryParams = {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        ...filters, // Spread all filter values
      };
      
      // Remove empty filter values
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] === '' || queryParams[key] === null) {
          delete queryParams[key];
        }
      });
      
      const response = await purchaseOrderService.getOrders(queryParams);
      
      // Update orders and pagination info
      setOrders(response.data || []);
      setPagination(prev => ({
        ...prev,
        totalItems: response.meta?.total || 0,
        totalPages: Math.ceil((response.meta?.total || 0) / pagination.itemsPerPage),
      }));
      
    } catch (err) {
      console.error("Error fetching purchase orders:", err);
      setError("Failed to load purchase orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Effect to fetch orders when component mounts or dependencies change
   */
  useEffect(() => {
    fetchOrders();
  }, [pagination.currentPage, pagination.itemsPerPage]); // Re-fetch when pagination changes

  /**
   * Effect to reset pagination and fetch when filters change
   */
  useEffect(() => {
    if (pagination.currentPage !== 1) {
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    } else {
      fetchOrders();
    }
  }, [filters]);

  /**
   * Handles filter changes and debounces search input
   * @param {string} filterType - The type of filter being changed
   * @param {string} value - The new filter value
   */
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  /**
   * Handles status change for a purchase order
   * @param {string} orderId - The order ID to update
   * @param {string} newStatus - The new status to set
   */
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await purchaseOrderService.changeOrderStatus(orderId, newStatus);
      // Refresh the orders list
      fetchOrders();
    } catch (err) {
      console.error("Error changing order status:", err);
      alert("Failed to change order status. Please try again.");
    }
  };

  /**
   * Handles PDF download for a purchase order
   * @param {string} orderId - The order ID to download
   * @param {string} orderNumber - The order number for filename
   */
  const handleDownloadPDF = async (orderId, orderNumber) => {
    try {
      const pdfBlob = await purchaseOrderService.downloadOrderPDF(orderId);
      
      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${orderNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading PDF:", err);
      alert("Failed to download PDF. Please try again.");
    }
  };

  // Status options for filter dropdown
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'received', label: 'Received' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  // Loading state
  if (loading && orders.length === 0) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <div className="ml-4 text-lg text-gray-600">Loading purchase orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Purchase Orders</h2>
          <p className="text-gray-600 mt-1">
            {pagination.totalItems} total orders
          </p>
        </div>
        
        {/* Add New Order Button */}
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
          Create New Order
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => handleFilterChange('fromDate', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => handleFilterChange('toDate', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Items
            </label>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              placeholder="Search by item name..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4">
          <button
            onClick={() => setFilters({
              status: '',
              supplier: '',
              fromDate: '',
              toDate: '',
              searchQuery: '',
            })}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={fetchOrders}
            className="ml-4 text-red-800 underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No purchase orders found</div>
          <div className="text-gray-400 text-sm mt-2">
            {Object.values(filters).some(filter => filter) 
              ? "Try adjusting your filters or create a new order"
              : "Create your first purchase order to get started"
            }
          </div>
        </div>
      ) : (
        <>
          {/* Orders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {orders.map((order) => (
              <PurchaseOrderCard 
                key={order._id} 
                order={order}
                onStatusChange={handleStatusChange}
                onDownloadPDF={handleDownloadPDF}
                onRefresh={fetchOrders}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                {pagination.totalItems} orders
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                  disabled={pagination.currentPage <= 1}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <span className="flex items-center px-3 py-2 text-sm text-gray-700">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                
                <button
                  onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PurchaseOrderList;