// frontend/src/modules/supplier/pages/SupplierList.jsx

/**
 * SupplierList Page Component
 * Displays a grid of all suppliers in the system
 * Fetches supplier data on component mount and displays using SupplierCard components
 */

import React, { useEffect, useState } from "react";
import supplierService from "../services/supplierService";
import SupplierCard from "../components/SupplierCard";

/**
 * Supplier List Page
 * @returns {JSX.Element} Supplier list page with grid layout
 */
const SupplierList = () => {
  // State to store the list of suppliers
  const [suppliers, setSuppliers] = useState([]);
  const [duplicateIds, setDuplicateIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * useEffect Hook - Runs on component mount
   * Fetches all suppliers from the backend and updates state
   */
  useEffect(() => {
    fetchSuppliers();
  }, []); // Empty dependency array ensures this runs only once on mount

  const fetchSuppliers = () => {
    // Call the getSuppliers API and set the returned data to state
    supplierService.getSuppliers().then((data) => {
      setSuppliers(data);
      
      // Check for duplicate supplier IDs
      const idCounts = {};
      data.forEach(s => {
        idCounts[s.supplierId] = (idCounts[s.supplierId] || 0) + 1;
      });
      
      const duplicates = Object.keys(idCounts).filter(id => idCounts[id] > 1);
      setDuplicateIds(duplicates);
      
      if (duplicates.length > 0) {
        console.warn("⚠️ DUPLICATE SUPPLIER IDs FOUND:", duplicates);
        console.warn("Affected suppliers:", data.filter(s => duplicates.includes(s.supplierId)));
      }
    });
  };

  const handleDelete = (deletedId) => {
    setSuppliers(prevSuppliers => prevSuppliers.filter(s => s._id !== deletedId));
  };

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter((supplier) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      supplier.name?.toLowerCase().includes(searchLower) ||
      supplier.supplierId?.toLowerCase().includes(searchLower) ||
      supplier.email?.toLowerCase().includes(searchLower) ||
      supplier.contactNumber?.includes(searchTerm)
    );
  });

  // Export filtered suppliers to CSV
  const exportToCSV = () => {
    if (!filteredSuppliers.length) return;
    const headers = [
      'Supplier ID', 'Name', 'Email', 'Contact Number', 'Address', 'Report ID'
    ];
    const rows = filteredSuppliers.map(supplier => [
      supplier.supplierId,
      supplier.name,
      supplier.email,
      supplier.contactNumber,
      supplier.address,
      supplier.reportId
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
    link.setAttribute('download', `Suppliers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Title and Export Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Suppliers</h2>
        <button
          onClick={exportToCSV}
          disabled={filteredSuppliers.length === 0}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
          style={{ minWidth: 160 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="#22c55e" />
            <path d="M12 16V8M12 16L8 12M12 16L16 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Export to CSV
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search suppliers by name, ID, email, or contact number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Warning for duplicate IDs */}
      {duplicateIds.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-sm">
          <strong>⚠️ Warning:</strong> Found {duplicateIds.length} duplicate Supplier ID(s): {duplicateIds.join(', ')}
          <br />
          <span className="text-sm mt-2 block">Please update these suppliers with unique IDs to avoid issues.</span>
        </div>
      )}

      {/* Supplier Grid - Responsive: 1 column on mobile, 2 columns on medium+, 3 columns on large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map through filtered suppliers array and render a SupplierCard for each */}
        {filteredSuppliers.length > 0 ? (
          filteredSuppliers.map((s) => (
            <div key={s._id} className={duplicateIds.includes(s.supplierId) ? 'ring-2 ring-red-500 rounded-lg' : ''}>
              <SupplierCard supplier={s} onDelete={handleDelete} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? "No suppliers found matching your search." : "No suppliers available."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierList;
