// frontend/src/modules/supplier/components/PurchaseOrderCard.jsx

/**
 * PurchaseOrderCard Component
 * 
 * A comprehensive card component for displaying purchase order information.
 * Features:
 * - Status-based color coding and visual indicators
 * - Supplier information display
 * - Items summary with expandable details
 * - Action buttons based on current status
 * - Progress indicators for order lifecycle
 * - Price and date formatting
 * - Responsive design for different screen sizes
 * 
 * Props:
 * - order: Purchase order object with all order details
 * - onStatusChange: Callback for status change operations
 * - onEdit: Callback for edit action
 * - onView: Callback for view details action
 * - onDownloadPDF: Callback for PDF download
 * - onDelete: Callback for delete/cancel action
 * - showActions: Boolean to control action buttons visibility
 */

import React, { useState } from "react";

const PurchaseOrderCard = ({ 
  order, 
  onStatusChange,
  onEdit,
  onView, 
  onDownloadPDF,
  onDelete,
  showActions = true 
}) => {
  // Local state for managing expanded items view
  const [showAllItems, setShowAllItems] = useState(false);

  /**
   * Gets status-specific styling classes
   * @param {string} status - Order status
   * @returns {Object} CSS classes and colors for the status
   */
  const getStatusStyling = (status) => {
    const statusMap = {
      pending: {
        bgClass: 'bg-yellow-50 border-yellow-200',
        badgeClass: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        iconColor: 'text-yellow-600',
        progressColor: 'bg-yellow-400'
      },
      approved: {
        bgClass: 'bg-blue-50 border-blue-200',
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
        iconColor: 'text-blue-600',
        progressColor: 'bg-blue-400'
      },
      received: {
        bgClass: 'bg-green-50 border-green-200',
        badgeClass: 'bg-green-100 text-green-800 border-green-200',
        iconColor: 'text-green-600',
        progressColor: 'bg-green-400'
      },
      cancelled: {
        bgClass: 'bg-red-50 border-red-200',
        badgeClass: 'bg-red-100 text-red-800 border-red-200',
        iconColor: 'text-red-600',
        progressColor: 'bg-red-400'
      }
    };

    return statusMap[status] || statusMap.pending;
  };

  /**
   * Gets progress percentage based on status
   * @param {string} status - Order status
   * @returns {number} Progress percentage (0-100)
   */
  const getProgressPercentage = (status) => {
    const progressMap = {
      pending: 25,
      approved: 50,
      received: 100,
      cancelled: 0
    };
    return progressMap[status] || 0;
  };

  /**
   * Gets available actions based on order status
   * @param {string} status - Order status
   * @returns {Array} Array of available actions
   */
  const getAvailableActions = (status) => {
    switch (status) {
      case 'pending':
        return ['edit', 'approve', 'cancel', 'pdf'];
      case 'approved':
        return ['markReceived', 'cancel', 'pdf'];
      case 'received':
        return ['pdf'];
      case 'cancelled':
        return ['pdf'];
      default:
        return [];
    }
  };

  /**
   * Formats currency amount
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency string
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  /**
   * Formats date for display
   * @param {string|Date} date - Date to format
   * @returns {string} Formatted date string
   */
  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  /**
   * Handles status change with confirmation
   * @param {string} newStatus - New status to set
   */
  const handleStatusChange = (newStatus) => {
    const statusMessages = {
      approved: 'approve this purchase order',
      received: 'mark this order as received (this will update inventory)',
      cancelled: 'cancel this purchase order'
    };

    const message = statusMessages[newStatus];
    if (message && window.confirm(`Are you sure you want to ${message}?`)) {
      onStatusChange?.(order._id, newStatus);
    }
  };

  /**
   * Gets the supplier display name
   * @returns {string} Supplier name or ID
   */
  const getSupplierName = () => {
    if (typeof order.supplier === 'object' && order.supplier?.supplierName) {
      return order.supplier.supplierName;
    }
    return order.supplier || 'Unknown Supplier';
  };

  // Get styling for current status
  const styling = getStatusStyling(order.status);
  const availableActions = getAvailableActions(order.status);
  
  // Determine items to show (first 3 or all if expanded)
  const itemsToShow = showAllItems ? order.items : order.items?.slice(0, 3) || [];
  const hasMoreItems = order.items?.length > 3;

  return (
    <div className={`rounded-lg shadow-md border-2 p-6 transition-all duration-200 hover:shadow-lg ${styling.bgClass}`}>
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          {/* Order ID and Status */}
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {order.orderId}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styling.badgeClass}`}>
              {order.status.toUpperCase()}
            </span>
          </div>

          {/* Supplier Information */}
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Supplier:</span> {getSupplierName()}
          </div>

          {/* Order Date */}
          <div className="text-xs text-gray-500">
            Created: {formatDate(order.createdAt)}
          </div>
        </div>

        {/* Order Total */}
        <div className="text-right ml-4">
          <div className="text-xl font-bold text-gray-900">
            {formatCurrency(order.totalCost)}
          </div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600">Progress</span>
          <span className="text-xs text-gray-600">{getProgressPercentage(order.status)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${styling.progressColor}`}
            style={{ width: `${getProgressPercentage(order.status)}%` }}
          ></div>
        </div>
        
        {/* Status Steps */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span className={order.status === 'pending' ? 'font-medium text-gray-700' : ''}>Pending</span>
          <span className={order.status === 'approved' ? 'font-medium text-gray-700' : ''}>Approved</span>
          <span className={order.status === 'received' ? 'font-medium text-gray-700' : ''}>Received</span>
        </div>
      </div>

      {/* Expected Delivery Date */}
      {order.expectedDeliveryDate && (
        <div className="mb-4 text-sm">
          <span className="text-gray-600">Expected Delivery:</span>
          <span className="ml-2 font-medium text-gray-900">
            {formatDate(order.expectedDeliveryDate)}
          </span>
        </div>
      )}

      {/* Items Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Items ({order.items?.length || 0})
          </span>
          {hasMoreItems && (
            <button
              onClick={() => setShowAllItems(!showAllItems)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              {showAllItems ? 'Show Less' : 'Show All'}
            </button>
          )}
        </div>

        {/* Items List */}
        <div className="space-y-2">
          {itemsToShow.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm bg-white bg-opacity-50 rounded px-3 py-2">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{item.itemName}</div>
                <div className="text-gray-500 text-xs">
                  Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                </div>
              </div>
              <div className="text-right ml-2">
                <div className="font-medium text-gray-900">
                  {formatCurrency(item.total || (item.quantity * item.unitPrice))}
                </div>
              </div>
            </div>
          ))}
          
          {/* Show remaining items count */}
          {!showAllItems && hasMoreItems && (
            <div className="text-xs text-gray-500 text-center py-1">
              +{order.items.length - 3} more items
            </div>
          )}
        </div>
      </div>

      {/* Notes Section */}
      {order.notes && (
        <div className="mb-4 p-3 bg-white bg-opacity-50 rounded">
          <div className="text-sm font-medium text-gray-700 mb-1">Notes:</div>
          <div className="text-sm text-gray-600">{order.notes}</div>
        </div>
      )}

      {/* Inventory Sync Status (for received orders) */}
      {order.status === 'received' && order.inventorySync && (
        <div className="mb-4">
          <div className="flex items-center text-sm">
            <span className="text-gray-600 mr-2">Inventory Sync:</span>
            <span className={`font-medium ${
              order.inventorySync === 'done' 
                ? 'text-green-600' 
                : order.inventorySync === 'failed'
                  ? 'text-red-600'
                  : 'text-yellow-600'
            }`}>
              {order.inventorySync.charAt(0).toUpperCase() + order.inventorySync.slice(1)}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {showActions && availableActions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {availableActions.includes('edit') && (
            <button
              onClick={() => onEdit?.(order)}
              className="flex-1 min-w-[80px] bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Edit
            </button>
          )}

          {availableActions.includes('approve') && (
            <button
              onClick={() => handleStatusChange('approved')}
              className="flex-1 min-w-[80px] bg-green-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Approve
            </button>
          )}

          {availableActions.includes('markReceived') && (
            <button
              onClick={() => handleStatusChange('received')}
              className="flex-1 min-w-[80px] bg-green-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Mark Received
            </button>
          )}

          {availableActions.includes('cancel') && (
            <button
              onClick={() => handleStatusChange('cancelled')}
              className="flex-1 min-w-[80px] bg-red-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Cancel
            </button>
          )}

          {availableActions.includes('pdf') && (
            <button
              onClick={() => onDownloadPDF?.(order._id, order.orderId)}
              className="flex-1 min-w-[80px] bg-gray-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              📄 PDF
            </button>
          )}

          {onView && (
            <button
              onClick={() => onView(order)}
              className="flex-1 min-w-[80px] border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              View Details
            </button>
          )}
        </div>
      )}

      {/* Quotations Indicator */}
      {order.quotations && order.quotations.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Quotations received:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
              {order.quotations.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseOrderCard;