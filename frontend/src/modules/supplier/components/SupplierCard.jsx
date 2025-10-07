// frontend/src/modules/supplier/components/SupplierCard.jsx

/**
 * SupplierCard Component
 * Displays individual supplier information in a card layout
 * Used in the SupplierList page to show supplier details
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi"; // Feather Icons - Edit

/**
 * Supplier Card Component
 * @param {Object} props - Component props
 * @param {Object} props.supplier - Supplier object containing supplier details
 * @param {string} props.supplier._id - Unique identifier
 * @param {string} props.supplier.supplierId - Supplier ID
 * @param {string} props.supplier.name - Supplier name
 * @param {string} props.supplier.contactEmail - Supplier email
 * @param {string} props.supplier.contactPhone - Supplier phone number
 * @param {string} props.supplier.address - Supplier address
 * @param {string} props.supplier.reportId - Report ID (optional)
 */
const SupplierCard = ({ supplier }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/suppliers/edit/${supplier._id}`);
  };

  return (
    <div className="card cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Supplier Name - Main heading */}
      <h3 className="text-xl font-bold mb-4 text-gray-800">{supplier.name}</h3>
      
      {/* Supplier Information Grid */}
      <div className="space-y-3 mb-6">
        {/* Supplier ID */}
        <p className="text-sm">
          <strong className="text-gray-700">Supplier ID:</strong>{" "}
          <span className="text-gray-600">{supplier.supplierId}</span>
        </p>
        
        {/* Supplier Email */}
        <p className="text-sm">
          <strong className="text-gray-700">Email:</strong>{" "}
          <span className="text-gray-600">{supplier.contactEmail}</span>
        </p>
        
        {/* Supplier Phone */}
        <p className="text-sm">
          <strong className="text-gray-700">Phone:</strong>{" "}
          <span className="text-gray-600">{supplier.contactPhone}</span>
        </p>
        
        {/* Supplier Address */}
        <p className="text-sm">
          <strong className="text-gray-700">Address:</strong>{" "}
          <span className="text-gray-600">{supplier.address}</span>
        </p>
        
        {/* Report ID - Only show if exists */}
        {supplier.reportId && (
          <p className="text-sm">
            <strong className="text-gray-700">Report ID:</strong>{" "}
            <span className="text-gray-600">{supplier.reportId}</span>
          </p>
        )}
      </div>

      {/* Edit Button */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button 
          onClick={handleEdit}
          className="btn-primary text-sm flex items-center justify-center gap-2 w-full"
        >
          <FiEdit className="w-4 h-4" />
          Edit Supplier
        </button>
      </div>
    </div>
  );
};

export default SupplierCard;
