// frontend/src/modules/supplier/pages/SupplierList.jsx

/**
 * SupplierList Page Component
 * 
 * This page displays a list of all suppliers in the system using a card-based layout.
 * Features:
 * - Fetches supplier data on component mount
 * - Responsive grid layout (1 column on mobile, 2 columns on medium+ screens)
 * - Uses SupplierCard component for consistent display
 * - Handles loading states and potential errors
 * 
 * Future enhancements could include:
 * - Search and filtering capabilities
 * - Pagination for large supplier lists
 * - Add new supplier button
 * - Bulk operations
 */

import React, { useEffect, useState } from "react";
import supplierService from "../services/supplierService";
import SupplierCard from "../components/SupplierCard";

const SupplierList = () => {
  // State to store the list of suppliers fetched from the API
  const [suppliers, setSuppliers] = useState([]);
  
  // State to handle loading state during API calls
  const [loading, setLoading] = useState(true);
  
  // State to handle any errors during data fetching
  const [error, setError] = useState(null);

  /**
   * Effect hook to fetch suppliers data when component mounts
   * Runs once when the component is first rendered
   */
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        // Fetch suppliers from the backend API
        const data = await supplierService.getSuppliers();
        // The API returns { data: suppliers[], meta: {...} }
        setSuppliers(data.data || data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
        setError("Failed to load suppliers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []); // Empty dependency array means this runs once on mount

  // Show loading spinner or message while data is being fetched
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading suppliers...</div>
        </div>
      </div>
    );
  }

  // Show error message if data fetching failed
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page header with title and supplier count */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Suppliers ({suppliers.length})
        </h2>
        
        {/* Future: Add New Supplier button could go here */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add New Supplier
        </button>
      </div>

      {/* Show message if no suppliers found */}
      {suppliers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No suppliers found</div>
          <div className="text-gray-400 text-sm mt-2">
            Start by adding your first supplier to the system
          </div>
        </div>
      ) : (
        // Responsive grid layout for supplier cards
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <SupplierCard 
              key={supplier._id} 
              supplier={supplier}
              // Future: Add callback for when supplier is updated/deleted
              onUpdate={() => {
                // Refresh the supplier list
                // Could implement more efficient update instead of full refresh
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierList;