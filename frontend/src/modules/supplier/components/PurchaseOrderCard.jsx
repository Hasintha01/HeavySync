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
 * @param {number} props.order.totalCost - Total cost of the order
 * @param {string} props.order.status - Order status (pending/approved/received)
 */
const PurchaseOrderCard = ({ order }) => (
  <div className="p-4 border rounded shadow bg-white">
    {/* Order ID - Main heading */}
    <h3 className="text-lg font-bold">Order #{order._id}</h3>
    
    {/* Supplier Name - Shows populated name or just the ID if not populated */}
    <p>Supplier: {order.supplier?.name || order.supplier}</p>
    
    {/* Total Cost of the order */}
    <p>Total Cost: ${order.totalCost}</p>
    
    {/* Status Badge - Changes color based on order status */}
    <span
      className={`px-2 py-1 rounded text-sm ${
        order.status === "pending"
          ? "bg-yellow-100 text-yellow-700"  // Yellow badge for pending orders
          : order.status === "approved"
          ? "bg-blue-100 text-blue-700"      // Blue badge for approved orders
          : "bg-green-100 text-green-700"    // Green badge for received orders
      }`}
    >
      {order.status}
    </span>
  </div>
);

export default PurchaseOrderCard;
