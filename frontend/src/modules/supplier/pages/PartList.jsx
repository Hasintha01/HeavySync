// frontend/src/modules/supplier/pages/PartList.jsx

/**
 * PartList Page Component
 * Displays all parts in a grid layout
 * NOW USING CUSTOM HOOK + SKELETON LOADERS!
 */

import React, { useState, useEffect } from "react";
import PartCard from "../components/PartCard";
import { useParts } from "../../../hooks";
import { SkeletonCard } from "../../../components/Skeletons";

/**
 * Part List Component
 * @returns {JSX.Element} Part list page with cards
 */
const PartList = () => {
  // 🚀 Using custom hook - cleaner data management!
  const { parts, loading, error, lowStockParts, searchParts, refetchParts } = useParts();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [filteredParts, setFilteredParts] = useState([]);

  /**
   * Filter parts based on search and low stock filter
   */
  useEffect(() => {
    let filtered = searchParts(searchTerm);

    // Filter by low stock
    if (showLowStockOnly) {
      filtered = filtered.filter((part) => part.quantity <= part.minimumStock);
    }

    setFilteredParts(filtered);
  }, [searchTerm, showLowStockOnly, parts, searchParts]);

  /**
   * Get count of low stock items
   */
  const lowStockCount = lowStockParts.length;

  // Export filtered parts to CSV
  const exportToCSV = () => {
    if (!filteredParts.length) return;
    const headers = [
      'Part ID', 'Name', 'Part Number', 'Category', 'Quantity', 'Minimum Stock', 'Unit Price'
    ];
    const rows = filteredParts.map(part => [
      part.partId,
      part.name,
      part.partNumber,
      part.categoryId,
      part.quantity,
      part.minimumStock,
      part.unitPrice
    ]);
    let csvContent = '';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(val => `"${val ?? ''}"`).join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Parts_Inventory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Show loading state with skeleton loaders
  if (loading) {
    return (
      <div className="container mx-auto p-8 max-w-7xl">
        {/* Page Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Parts Inventory</h1>
            <div className="skeleton-box h-6 w-64 mt-2 rounded"></div>
          </div>
          <button
            disabled
            className="flex items-center gap-2 bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed font-medium shadow-md"
            style={{ minWidth: 160 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="12" fill="#9ca3af" />
              <path d="M12 16V8M12 16L8 12M12 16L16 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export to CSV
          </button>
        </div>

        {/* Search Bar Skeleton */}
        <div className="mb-6">
          <div className="skeleton-box h-12 w-full rounded-lg"></div>
        </div>

        {/* Filter Button Skeleton */}
        <div className="mb-6">
          <div className="skeleton-box h-10 w-48 rounded-lg"></div>
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
      <div className="container mx-auto p-8 max-w-7xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Parts Inventory</h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Total: <span className="font-semibold">{parts.length}</span> parts | 
            Low Stock: <span className="font-semibold text-red-600 dark:text-red-400">{lowStockCount}</span>
          </p>
        </div>
        {/* Export to CSV Button */}
        <button
          onClick={exportToCSV}
          disabled={filteredParts.length === 0}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
          style={{ minWidth: 160 }}
        >
          {/* Use the same icon as PDF export, but green */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="#22c55e" />
            <path d="M12 16V8M12 16L8 12M12 16L16 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Export to CSV
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-2xl mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Search Input */}
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="Search by name, part ID, part number, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Low Stock Filter Toggle */}
          <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
            <input
              type="checkbox"
              checked={showLowStockOnly}
              onChange={(e) => setShowLowStockOnly(e.target.checked)}
              className="w-5 h-5 text-blue-600"
            />
            <span>Show Low Stock Only</span>
          </label>

          {/* Refresh Button */}
          <button
            onClick={refetchParts}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading parts...</p>
        </div>
      ) : filteredParts.length === 0 ? (
        /* No Parts Found */
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {searchTerm || showLowStockOnly
              ? "No parts match your search criteria."
              : "No parts available. Add a new part to get started."}
          </p>
        </div>
      ) : (
        /* Parts Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => (
            <PartCard key={part._id} part={part} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PartList;
