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

  /**
   * useEffect Hook - Runs on component mount
   * Fetches all suppliers from the backend and updates state
   */
  useEffect(() => {
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
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
      
      {/* Warning for duplicate IDs */}
      {duplicateIds.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>⚠️ Warning:</strong> Found {duplicateIds.length} duplicate Supplier ID(s): {duplicateIds.join(', ')}
          <br />
          <span className="text-sm">Please update these suppliers with unique IDs to avoid issues.</span>
        </div>
      )}
      
      {/* Supplier Grid - Responsive: 1 column on mobile, 2 columns on medium+ screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Map through suppliers array and render a SupplierCard for each */}
        {suppliers.map((s) => (
          <div key={s._id} className={duplicateIds.includes(s.supplierId) ? 'ring-2 ring-red-500 rounded-lg' : ''}>
            <SupplierCard supplier={s} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierList;
