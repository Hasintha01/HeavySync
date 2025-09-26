// frontend/src/modules/supplier/components/QuotationTable.jsx

/**
 * QuotationTable Component
 * 
 * A comprehensive table component for displaying and comparing quotations.
 * Features:
 * - Sortable columns (price, supplier, delivery time, date)
 * - Expandable row details showing individual items
 * - Action buttons for each quotation (accept, view details, contact supplier)
 * - Responsive design with horizontal scroll on mobile
 * - Price comparison indicators (lowest, highest, percentage differences)
 * - Export functionality (future enhancement)
 * 
 * Props:
 * - quotations: Array of quotation objects with supplier info
 * - onAccept: Callback function when quotation is accepted
 * - onView: Callback function for viewing quotation details
 * - onContact: Callback function for contacting supplier
 * - sortable: Boolean to enable/disable column sorting (default: true)
 * - showActions: Boolean to show/hide action buttons (default: true)
 */

import React, { useState } from "react";

const QuotationTable = ({ 
  quotations = [], 
  onAccept, 
  onView, 
  onContact,
  sortable = true,
  showActions = true 
}) => {
  // Local state for table functionality
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRows, setExpandedRows] = useState(new Set());

  /**
   * Handles column sorting
   * @param {string} key - Column key to sort by
   */
  const handleSort = (key) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  /**
   * Sorts quotations based on current sort configuration
   * @param {Array} quotationList - Quotations to sort
   * @returns {Array} Sorted quotations
   */
  const sortedQuotations = React.useMemo(() => {
    if (!sortConfig.key) return quotations;

    return [...quotations].sort((a, b) => {
      let aValue, bValue;

      switch (sortConfig.key) {
        case 'total':
          aValue = a.total || 0;
          bValue = b.total || 0;
          break;
        case 'supplier':
          aValue = a.supplierName || '';
          bValue = b.supplierName || '';
          break;
        case 'delivery':
          aValue = new Date(a.expectedDelivery || '2099-12-31');
          bValue = new Date(b.expectedDelivery || '2099-12-31');
          break;
        case 'quoted':
          aValue = new Date(a.quotedAt || 0);
          bValue = new Date(b.quotedAt || 0);
          break;
        case 'items':
          aValue = a.items?.length || 0;
          bValue = b.items?.length || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [quotations, sortConfig]);

  /**
   * Toggles expanded state for a quotation row
   * @param {number} index - Index of the quotation to toggle
   */
  const toggleRowExpansion = (index) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  /**
   * Gets the sort indicator for a column header
   * @param {string} key - Column key
   * @returns {string} Sort indicator (↑, ↓, or empty)
   */
  const getSortIndicator = (key) => {
    if (!sortable || sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  /**
   * Formats currency amount
   * @param {number} amount - Amount to format
   * @returns {string} Formatted currency
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
   * @returns {string} Formatted date
   */
  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  /**
   * Gets price comparison indicator
   * @param {number} price - Current quotation price
   * @param {Array} allQuotations - All quotations for comparison
   * @returns {Object} Comparison result with status and message
   */
  const getPriceComparison = (price, allQuotations) => {
    const prices = allQuotations.map(q => q.total || 0).filter(p => p > 0);
    if (prices.length === 0) return { status: 'neutral', message: '' };

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    if (price === minPrice && price !== maxPrice) {
      return { status: 'best', message: 'Lowest Price' };
    }
    if (price === maxPrice && price !== minPrice) {
      const savings = price - minPrice;
      const percentage = ((savings / price) * 100).toFixed(1);
      return { status: 'highest', message: `${percentage}% higher` };
    }
    if (minPrice !== maxPrice) {
      const savings = price - minPrice;
      const percentage = ((savings / maxPrice) * 100).toFixed(1);
      return { status: 'middle', message: `${percentage}% above lowest` };
    }
    return { status: 'neutral', message: '' };
  };

  /**
   * Gets CSS classes for price comparison badge
   * @param {string} status - Comparison status
   * @returns {string} CSS classes
   */
  const getPriceComparisonClasses = (status) => {
    const baseClasses = 'text-xs px-2 py-1 rounded';
    switch (status) {
      case 'best':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'highest':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'middle':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-600`;
    }
  };

  // Show message if no quotations
  if (quotations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <div className="text-lg">No quotations available</div>
        <div className="text-sm text-gray-400 mt-1">Quotations will appear here once submitted</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        {/* Table Header */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left">
              {/* Expand/Collapse All Button */}
              <button
                onClick={() => {
                  if (expandedRows.size === sortedQuotations.length) {
                    setExpandedRows(new Set());
                  } else {
                    setExpandedRows(new Set([...Array(sortedQuotations.length).keys()]));
                  }
                }}
                className="text-gray-400 hover:text-gray-600"
                title={expandedRows.size === sortedQuotations.length ? "Collapse All" : "Expand All"}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </th>

            <th 
              className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
              onClick={() => handleSort('supplier')}
            >
              Supplier{getSortIndicator('supplier')}
            </th>

            <th 
              className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
              onClick={() => handleSort('total')}
            >
              Total Price{getSortIndicator('total')}
            </th>

            <th 
              className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
              onClick={() => handleSort('items')}
            >
              Items{getSortIndicator('items')}
            </th>

            <th 
              className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
              onClick={() => handleSort('delivery')}
            >
              Expected Delivery{getSortIndicator('delivery')}
            </th>

            <th 
              className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
              onClick={() => handleSort('quoted')}
            >
              Quoted Date{getSortIndicator('quoted')}
            </th>

            {showActions && (
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {sortedQuotations.map((quotation, index) => {
            const isExpanded = expandedRows.has(index);
            const priceComparison = getPriceComparison(quotation.total, quotations);

            return (
              <React.Fragment key={index}>
                {/* Main Row */}
                <tr className={`hover:bg-gray-50 ${isExpanded ? 'bg-blue-50' : ''}`}>
                  {/* Expand/Collapse Button */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleRowExpansion(index)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg 
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>

                  {/* Supplier */}
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {quotation.supplierName || 'Unknown Supplier'}
                    </div>
                  </td>

                  {/* Total Price */}
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(quotation.total)}
                    </div>
                    {priceComparison.message && (
                      <div className={getPriceComparisonClasses(priceComparison.status)}>
                        {priceComparison.message}
                      </div>
                    )}
                  </td>

                  {/* Items Count */}
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {quotation.items?.length || 0} items
                    </div>
                  </td>

                  {/* Expected Delivery */}
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {formatDate(quotation.expectedDelivery)}
                    </div>
                  </td>

                  {/* Quoted Date */}
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {formatDate(quotation.quotedAt)}
                    </div>
                  </td>

                  {/* Actions */}
                  {showActions && (
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onAccept?.(index)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                        >
                          Accept
                        </button>
                        
                        {onView && (
                          <button
                            onClick={() => onView(quotation, index)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                          >
                            View
                          </button>
                        )}

                        {onContact && (
                          <button
                            onClick={() => onContact(quotation)}
                            className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                          >
                            Contact
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>

                {/* Expanded Row Details */}
                {isExpanded && (
                  <tr className="bg-blue-50">
                    <td colSpan={showActions ? 7 : 6} className="px-4 py-3">
                      <div className="space-y-3">
                        {/* Items Details */}
                        {quotation.items && quotation.items.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Quoted Items:</h4>
                            <div className="bg-white rounded border">
                              <table className="min-w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Item</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Quantity</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Unit Price</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Total</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {quotation.items.map((item, itemIndex) => (
                                    <tr key={itemIndex}>
                                      <td className="px-3 py-2 text-sm text-gray-900">{item.itemName}</td>
                                      <td className="px-3 py-2 text-sm text-gray-900">{item.quantity}</td>
                                      <td className="px-3 py-2 text-sm text-gray-900">{formatCurrency(item.unitPrice)}</td>
                                      <td className="px-3 py-2 text-sm font-medium text-gray-900">
                                        {formatCurrency(item.total || (item.quantity * item.unitPrice))}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {quotation.notes && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Notes:</h4>
                            <div className="text-sm text-gray-600 bg-white p-3 rounded border">
                              {quotation.notes}
                            </div>
                          </div>
                        )}

                        {/* Additional Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Payment Terms:</span>
                            <span className="ml-2 text-gray-600">{quotation.paymentTerms || 'Not specified'}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Delivery Terms:</span>
                            <span className="ml-2 text-gray-600">{quotation.deliveryTerms || 'Not specified'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Table Footer with Summary */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 rounded-b-lg">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div>
            Showing {sortedQuotations.length} quotation{sortedQuotations.length !== 1 ? 's' : ''}
          </div>
          <div className="flex space-x-4">
            <span>
              Price Range: {formatCurrency(Math.min(...quotations.map(q => q.total || 0)))} - {formatCurrency(Math.max(...quotations.map(q => q.total || 0)))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationTable;