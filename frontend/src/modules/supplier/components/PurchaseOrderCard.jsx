// frontend/src/modules/supplier/components/PurchaseOrderCard.jsx

/**
 * PurchaseOrderCard Component
 * Displays individual purchase order information in a card layout
 * Used in the PurchaseOrderList page to show order details
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import pdfService from "../services/pdfService";
import StatusBadge from "./StatusBadge";
import { FiEdit, FiDownload } from "react-icons/fi"; // Feather Icons

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
const PurchaseOrderCard = ({ order }) => {
  const navigate = useNavigate();
  
  const handleDownloadPDF = (e) => {
    e.stopPropagation(); // Prevent card click when clicking download
    try {
      console.log('Download PDF clicked for order:', order._id);
      console.log('Order data:', order);
      
      pdfService.generatePurchaseOrderPDF(order);
      console.log('PDF generation completed successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Failed to generate PDF: ${error.message}\n\nCheck browser console for details.`);
    }
  };

  const handleCardClick = () => {
    navigate(`/purchase-orders/${order._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/purchase-orders/edit/${order._id}`);
  };

  return (
    <div 
      className="card cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onClick={handleCardClick}
    >
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
        <strong>Total Amount:</strong> LKR {order.totalAmount?.toFixed(2) || '0.00'}
      </p>
      
      {/* Status Badge - Changes color based on order status */}
      <div className="mb-3">
        <StatusBadge status={order.status} />
      </div>

      {/* Download PDF Button */}
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium flex-1 flex items-center justify-center gap-2"
        >
          <FiEdit className="w-4 h-4" />
          Edit Order
        </button>
        
        <button
          onClick={handleDownloadPDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <FiDownload className="w-4 h-4" />
          PDF
        </button>
      </div>
    </div>
  );
};

export default PurchaseOrderCard;
