// frontend/src/modules/supplier/pages/PurchaseOrderList.jsx

/**
 * PurchaseOrderList Page Component
 * Displays a grid of all purchase orders in the system
 * Fetches purchase order data on component mount and displays using PurchaseOrderCard components
 */

import React, { useEffect, useState } from "react";
import purchaseOrderService from "../services/purchaseOrderService";
import PurchaseOrderCard from "../components/PurchaseOrderCard";

/**
 * Purchase Order List Page
 * @returns {JSX.Element} Purchase order list page with grid layout
 */
const PurchaseOrderList = () => {
  // State to store the list of purchase orders
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * useEffect Hook - Runs on component mount
   * Fetches all purchase orders from the backend and updates state
   */
  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array ensures this runs only once on mount

  const fetchOrders = () => {
    // Call the getOrders API and set the returned data to state
    purchaseOrderService.getOrders().then(setOrders);
  };

  const handleDelete = (deletedId) => {
    setOrders(prevOrders => prevOrders.filter(o => o._id !== deletedId));
  };

  // Filter purchase orders based on search term
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Get supplier name - handle both populated object and string ID
    const supplierName = typeof order.supplier === 'object' && order.supplier?.name
      ? order.supplier.name.toLowerCase()
      : (typeof order.supplier === 'string' ? order.supplier.toLowerCase() : '');
    
    // Search by order ID (last 6 characters), supplier name, status, or total amount
    return (
      order._id?.toLowerCase().includes(searchLower) ||
      supplierName.includes(searchLower) ||
      order.status?.toLowerCase().includes(searchLower) ||
      order.totalAmount?.toString().includes(searchTerm) ||
      order.items?.some(item => item.name?.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Purchase Orders</h2>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by order ID, supplier, status, amount, or item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {/* Purchase Order Grid - Responsive: 1 column on mobile, 2 columns on medium+, 3 columns on large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map through filtered orders array and render a PurchaseOrderCard for each */}
        {filteredOrders.length > 0 ? (
          filteredOrders.map((o) => (
            <PurchaseOrderCard key={o._id} order={o} onDelete={handleDelete} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? "No purchase orders found matching your search." : "No purchase orders available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseOrderList;
