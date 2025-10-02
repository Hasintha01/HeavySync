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

  /**
   * useEffect Hook - Runs on component mount
   * Fetches all suppliers from the backend and updates state
   */
  useEffect(() => {
    // Call the getSuppliers API and set the returned data to state
    supplierService.getSuppliers().then(setSuppliers);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-4">Suppliers</h2>
      
      {/* Supplier Grid - Responsive: 1 column on mobile, 2 columns on medium+ screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Map through suppliers array and render a SupplierCard for each */}
        {suppliers.map((s) => (
          <SupplierCard key={s._id} supplier={s} />
        ))}
      </div>
    </div>
  );
};

export default SupplierList;
