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

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Suppliers</h2>
      
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
