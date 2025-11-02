// frontend/src/modules/supplier/pages/PurchaseOrderList.jsx

/**
 * PurchaseOrderList Page Component
 * Displays a grid of all purchase orders in the system
 * NOW USING CUSTOM HOOK + SKELETON LOADERS!
 */

import React, { useState } from "react";
import { usePurchaseOrders } from "../../../hooks";
import PurchaseOrderCard from "../components/PurchaseOrderCard";
import { SkeletonCard } from "../../../components/Skeletons";

/**
 * Purchase Order List Page
 * @returns {JSX.Element} Purchase order list page with grid layout
 */
const PurchaseOrderList = () => {
  // 🚀 Using custom hook
  const { purchaseOrders, loading, error, deletePurchaseOrder, searchPurchaseOrders } = usePurchaseOrders();
  const [searchTerm, setSearchTerm] = useState("");

  // Use the built-in search function from the hook
  const filteredOrders = searchPurchaseOrders(searchTerm);

  const handleDelete = async (deletedId) => {
    await deletePurchaseOrder(deletedId);
  };

  // Show loading state with skeleton loaders
  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Purchase Orders</h2>
        
        {/* Search Bar Skeleton */}
        <div className="mb-6">
          <div className="skeleton-box h-12 w-full rounded-lg"></div>
        </div>
        
        {/* Skeleton Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={`skeleton-${idx}`} />
          ))}
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

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
