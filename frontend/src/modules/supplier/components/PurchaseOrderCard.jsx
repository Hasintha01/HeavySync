// frontend/src/modules/supplier/components/PurchaseOrderCard.jsx

/**
 * PurchaseOrderCard Component
 * Displays individual purchase order information in a card layout
 * Used in the PurchaseOrderList page to show order details
 */

import React from "react";

/**
 * Purchase Order Card Component
 * @param {Object} props - Component props
 * @param {Object} props.order - Purchase order object containing order details
 * @param {string} props.order._id - Unique order identifier
 * @param {Object|string} props.order.supplier - Supplier object or supplier ID
 * @param {string} props.order.supplier.name - Supplier name (if populated)
 * @param {Array} props.order.items - Array of order items
 * @param {number} props.order.totalAmount - Total amount of the order
 * @param {string} props.order.status - Order status (Pending/Approved/Received/Cancelled)
 */
const PurchaseOrderCard = ({ order }) => (
  <div className="card">
    {/* Order ID - Main heading */}
    <h3 className="text-lg font-bold mb-2">Order #{order._id.slice(-6)}</h3>
    
    {/* Supplier Name - Shows populated name or just the ID if not populated */}
    <p className="mb-1">
      <strong>Supplier:</strong> {order.supplier?.name || order.supplier}
    </p>
    
    {/* Number of Items */}
    <p className="mb-1">
      <strong>Items:</strong> {order.items?.length || 0} item(s)
    </p>
    
    {/* Total Amount of the order */}
    <p className="mb-2">
      <strong>Total Amount:</strong> ${order.totalAmount?.toFixed(2) || '0.00'}
    </p>
    
    {/* Status Badge - Changes color based on order status */}
    <span
      className={`px-2 py-1 rounded text-sm ${
        order.status === "Pending"
          ? "bg-yellow-100 text-yellow-700"  // Yellow badge for pending orders
          : order.status === "Approved"
          ? "bg-blue-100 text-blue-700"      // Blue badge for approved orders
          : order.status === "Received"
          ? "bg-green-100 text-green-700"    // Green badge for received orders
          : "bg-red-100 text-red-700"        // Red badge for cancelled orders
      }`}
    >
      {order.status}
    </span>
  </div>
);

export default PurchaseOrderCard;
