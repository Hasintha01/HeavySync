// frontend/src/modules/supplier/components/SupplierCard.jsx

/**
 * SupplierCard Component
 * 
 * A reusable card component for displaying supplier information in a consistent format.
 * Features:
 * - Displays key supplier information (name, contact, category, status)
 * - Status indicator with color coding (active/inactive)
 * - Quick action buttons for common operations
 * - Responsive design that works in grid layouts
 * - Click handlers for edit, delete, and view operations
 * - Contact information display with proper formatting
 * 
 * Props:
 * - supplier: Supplier object with all required fields
 * - onEdit: Callback function for edit action
 * - onDelete: Callback function for delete action
 * - onView: Callback function for view details action
 * - showActions: Boolean to show/hide action buttons (default: true)
 */

import React from "react";

const SupplierCard = ({ 
  supplier, 
  onEdit, 
  onDelete, 
  onView, 
  showActions = true 
}) => {
  /**
   * Formats phone number for better readability
   * @param {string} phone - Raw phone number
   * @returns {string} Formatted phone number
   */
  const formatPhone = (phone) => {
    if (!phone) return '';
    // Simple formatting - can be enhanced based on local requirements
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  /**
   * Gets the appropriate CSS classes for status badge
   * @param {string} status - Supplier status
   * @returns {string} CSS classes for status styling
   */
  const getStatusClasses = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-700 border border-green-200`;
      case 'inactive':
        return `${baseClasses} bg-red-100 text-red-700 border border-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`;
    }
  };

  /**
   * Gets the display text for status
   * @param {string} status - Supplier status
   * @returns {string} Display text for status
   */
  const getStatusText = (status) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown';
  };

  /**
   * Handles the card click for viewing details
   * Only triggers if onView is provided and click is not on action buttons
   */
  const handleCardClick = (e) => {
    // Don't trigger if clicking on action buttons
    if (e.target.closest('.action-buttons')) {
      return;
    }
    onView?.(supplier);
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg hover:border-gray-300 ${
        onView ? 'cursor-pointer' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Header with supplier name and status */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {supplier.supplierName}
          </h3>
          {supplier.category && (
            <div className="text-sm text-blue-600 font-medium mt-1">
              {supplier.category}
            </div>
          )}
        </div>
        
        {/* Status Badge */}
        <div className="ml-3 flex-shrink-0">
          <span className={getStatusClasses(supplier.status)}>
            {getStatusText(supplier.status)}
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-2 mb-4">
        {/* Contact Person */}
        {supplier.contactPerson && (
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="truncate">{supplier.contactPerson}</span>
          </div>
        )}

        {/* Email */}
        {supplier.email && (
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a 
              href={`mailto:${supplier.email}`} 
              className="text-blue-600 hover:text-blue-800 truncate"
              onClick={(e) => e.stopPropagation()} // Prevent card click
            >
              {supplier.email}
            </a>
          </div>
        )}

        {/* Phone */}
        {supplier.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a 
              href={`tel:${supplier.phone}`}
              className="text-blue-600 hover:text-blue-800"
              onClick={(e) => e.stopPropagation()} // Prevent card click
            >
              {formatPhone(supplier.phone)}
            </a>
          </div>
        )}

        {/* Address */}
        {supplier.address && (
          <div className="flex items-start text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-2">{supplier.address}</span>
          </div>
        )}
      </div>

      {/* Creation Date */}
      <div className="text-xs text-gray-500 mb-4">
        Added: {new Date(supplier.createdAt).toLocaleDateString()}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="action-buttons flex space-x-2">
          {onView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(supplier);
              }}
              className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200"
            >
              View Details
            </button>
          )}
          
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(supplier);
              }}
              className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors border border-gray-200"
            >
              Edit
            </button>
          )}
          
          {onDelete && supplier.status !== 'inactive' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to deactivate ${supplier.supplierName}?`)) {
                  onDelete(supplier);
                }
              }}
              className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded text-sm font-medium hover:bg-red-100 transition-colors border border-red-200"
            >
              Deactivate
            </button>
          )}
        </div>
      )}

      {/* Purchase Orders Count (if available) */}
      {supplier.purchaseOrderCount !== undefined && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Purchase Orders:</span>
            <span className="font-medium">{supplier.purchaseOrderCount}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierCard;