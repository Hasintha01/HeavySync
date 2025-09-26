// frontend/src/modules/supplier/pages/QuotationComparison.jsx

/**
 * QuotationComparison Page Component
 * 
 * This page provides a comprehensive interface for comparing quotations from different suppliers
 * for a specific purchase request. Features include:
 * - Side-by-side quotation comparison
 * - Sorting and filtering options
 * - Price analysis and recommendations
 * - Direct quotation acceptance workflow
 * - Integration with purchase order creation
 * 
 * Future enhancements:
 * - Export comparison to PDF/Excel
 * - Historical quotation tracking
 * - Supplier performance metrics
 * - Automated recommendation system based on price, delivery time, and supplier rating
 */

import React, { useState, useEffect } from "react";
import purchaseOrderService from "../services/purchaseOrderService";
import supplierService from "../services/supplierService";
import QuotationTable from "../components/QuotationTable";

const QuotationComparison = ({ purchaseOrderId }) => {
  // Component state
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [suppliers, setSuppliers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  
  // Sorting and filtering state
  const [sortBy, setSortBy] = useState('total'); // total, delivery, supplier
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterSupplier, setFilterSupplier] = useState('');

  /**
   * Effect to load purchase order data and quotations on component mount
   */
  useEffect(() => {
    if (purchaseOrderId) {
      loadPurchaseOrderData();
    }
  }, [purchaseOrderId]);

  /**
   * Loads purchase order data including quotations
   */
  const loadPurchaseOrderData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch purchase order with quotations
      const orderData = await purchaseOrderService.getOrderById(purchaseOrderId);
      setPurchaseOrder(orderData);
      setQuotations(orderData.quotations || []);

      // Fetch supplier details for all quotations
      if (orderData.quotations && orderData.quotations.length > 0) {
        await loadSupplierDetails(orderData.quotations);
      }

    } catch (err) {
      console.error("Error loading purchase order data:", err);
      setError("Failed to load quotation data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Loads supplier details for all quotations
   * @param {Array} quotationList - List of quotations with supplierId
   */
  const loadSupplierDetails = async (quotationList) => {
    try {
      const supplierIds = [...new Set(quotationList.map(q => q.supplierId))];
      const supplierData = {};

      // Fetch each supplier's details
      await Promise.all(
        supplierIds.map(async (supplierId) => {
          try {
            const supplier = await supplierService.getSupplierById(supplierId);
            supplierData[supplierId] = supplier;
          } catch (err) {
            console.error(`Error fetching supplier ${supplierId}:`, err);
            supplierData[supplierId] = { supplierName: "Unknown Supplier" };
          }
        })
      );

      setSuppliers(supplierData);
    } catch (err) {
      console.error("Error loading supplier details:", err);
    }
  };

  /**
   * Sorts quotations based on selected criteria
   * @param {Array} quotationList - List of quotations to sort
   * @returns {Array} Sorted quotations
   */
  const sortQuotations = (quotationList) => {
    return [...quotationList].sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case 'total':
          valueA = a.total || 0;
          valueB = b.total || 0;
          break;
        case 'delivery':
          valueA = new Date(a.expectedDelivery || '2099-12-31');
          valueB = new Date(b.expectedDelivery || '2099-12-31');
          break;
        case 'supplier':
          valueA = suppliers[a.supplierId]?.supplierName || '';
          valueB = suppliers[b.supplierId]?.supplierName || '';
          break;
        default:
          valueA = a.quotedAt;
          valueB = b.quotedAt;
      }

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };

  /**
   * Filters quotations based on selected supplier
   * @param {Array} quotationList - List of quotations to filter
   * @returns {Array} Filtered quotations
   */
  const filterQuotations = (quotationList) => {
    if (!filterSupplier) return quotationList;
    return quotationList.filter(q => q.supplierId === filterSupplier);
  };

  /**
   * Handles quotation acceptance
   * @param {number} quotationIndex - Index of quotation to accept
   */
  const handleAcceptQuotation = async (quotationIndex) => {
    try {
      setLoading(true);
      
      // Accept quotation and create new purchase order
      const result = await purchaseOrderService.acceptQuotation(purchaseOrderId, quotationIndex);
      
      // Show success message or redirect to new purchase order
      alert(`New purchase order created: ${result.purchaseOrder?.orderId}`);
      
      // Refresh data
      await loadPurchaseOrderData();
      
    } catch (err) {
      console.error("Error accepting quotation:", err);
      alert("Failed to accept quotation. Please try again.");
    } finally {
      setLoading(false);
      setShowAcceptModal(false);
      setSelectedQuotation(null);
    }
  };

  /**
   * Calculates savings compared to highest quote
   * @param {number} currentTotal - Current quotation total
   * @param {number} maxTotal - Highest quotation total
   * @returns {Object} Savings amount and percentage
   */
  const calculateSavings = (currentTotal, maxTotal) => {
    const savings = maxTotal - currentTotal;
    const percentage = maxTotal > 0 ? (savings / maxTotal) * 100 : 0;
    return { amount: savings, percentage };
  };

  // Get processed quotations
  const processedQuotations = sortQuotations(filterQuotations(quotations));
  const maxTotal = Math.max(...quotations.map(q => q.total || 0));
  const minTotal = Math.min(...quotations.map(q => q.total || 0));

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <div className="ml-4 text-lg text-gray-600">Loading quotations...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={loadPurchaseOrderData}
            className="ml-4 text-red-800 underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No purchase order selected
  if (!purchaseOrder) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quotation Comparison</h2>
          <div className="text-gray-600">
            Select a purchase order to compare quotations
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Quotation Comparison
        </h2>
        <div className="text-gray-600">
          Purchase Order: <span className="font-semibold">{purchaseOrder.orderId}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {quotations.length} quotation{quotations.length !== 1 ? 's' : ''} received
        </div>
      </div>

      {/* No quotations message */}
      {quotations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No quotations received yet</div>
          <div className="text-gray-400 text-sm">
            Quotations will appear here once suppliers submit their offers
          </div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="text-green-800 text-sm font-medium">Best Quote</div>
              <div className="text-2xl font-bold text-green-900">${minTotal.toFixed(2)}</div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-800 text-sm font-medium">Highest Quote</div>
              <div className="text-2xl font-bold text-red-900">${maxTotal.toFixed(2)}</div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-blue-800 text-sm font-medium">Potential Savings</div>
              <div className="text-2xl font-bold text-blue-900">
                ${(maxTotal - minTotal).toFixed(2)}
              </div>
              <div className="text-sm text-blue-700">
                ({((maxTotal - minTotal) / maxTotal * 100).toFixed(1)}% savings)
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Sort Controls */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="total">Total Price</option>
                  <option value="delivery">Delivery Time</option>
                  <option value="supplier">Supplier Name</option>
                </select>
                
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>

              {/* Filter Controls */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Filter by supplier:</label>
                <select
                  value={filterSupplier}
                  onChange={(e) => setFilterSupplier(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="">All Suppliers</option>
                  {Object.entries(suppliers).map(([id, supplier]) => (
                    <option key={id} value={id}>
                      {supplier.supplierName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quotation Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
            {processedQuotations.map((quotation, index) => {
              const supplier = suppliers[quotation.supplierId] || {};
              const savings = calculateSavings(quotation.total, maxTotal);
              const isLowest = quotation.total === minTotal;
              
              return (
                <div 
                  key={index} 
                  className={`bg-white rounded-lg shadow-md border-2 ${
                    isLowest ? 'border-green-400 bg-green-50' : 'border-gray-200'
                  } p-6`}
                >
                  {/* Supplier Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {supplier.supplierName || 'Unknown Supplier'}
                      </h3>
                      <div className="text-sm text-gray-500">
                        {supplier.category} • {supplier.email}
                      </div>
                    </div>
                    {isLowest && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        BEST PRICE
                      </span>
                    )}
                  </div>

                  {/* Price Information */}
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ${quotation.total?.toFixed(2)}
                    </div>
                    {savings.amount > 0 && (
                      <div className="text-sm text-green-600">
                        Save ${savings.amount.toFixed(2)} ({savings.percentage.toFixed(1)}%)
                      </div>
                    )}
                  </div>

                  {/* Items Summary */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Items:</div>
                    <div className="space-y-1">
                      {quotation.items?.slice(0, 3).map((item, itemIndex) => (
                        <div key={itemIndex} className="text-sm text-gray-600 flex justify-between">
                          <span>{item.itemName}</span>
                          <span>{item.quantity} × ${item.unitPrice}</span>
                        </div>
                      ))}
                      {quotation.items?.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{quotation.items.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quotation Details */}
                  <div className="mb-4 text-sm text-gray-600">
                    <div>Quoted: {new Date(quotation.quotedAt).toLocaleDateString()}</div>
                    {quotation.notes && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                        {quotation.notes}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedQuotation({ quotation, index });
                        setShowAcceptModal(true);
                      }}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Accept Quote
                    </button>
                    
                    <button className="px-3 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Detailed Comparison</h3>
            </div>
            <QuotationTable 
              quotations={processedQuotations.map(q => ({
                ...q,
                supplierName: suppliers[q.supplierId]?.supplierName || 'Unknown'
              }))}
              onAccept={(index) => {
                const quotation = processedQuotations[index];
                setSelectedQuotation({ quotation, index });
                setShowAcceptModal(true);
              }}
            />
          </div>
        </>
      )}

      {/* Accept Quotation Modal */}
      {showAcceptModal && selectedQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Accept Quotation</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to accept this quotation from{' '}
              <strong>{suppliers[selectedQuotation.quotation.supplierId]?.supplierName}</strong>?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              This will create a new approved purchase order with the quoted items and prices.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAcceptModal(false);
                  setSelectedQuotation(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAcceptQuotation(selectedQuotation.index)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Accept Quotation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotationComparison;