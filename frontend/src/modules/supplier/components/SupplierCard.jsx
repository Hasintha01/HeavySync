// frontend/src/modules/supplier/components/SupplierCard.jsx

/**
 * SupplierCard Component
 * Displays individual supplier information in a card layout
 * Used in the SupplierList page to show supplier details
 */

import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="card">
      {/* Supplier Name - Main heading */}
      <h3 className="text-lg font-bold mb-2">{supplier.name}</h3>
      
      {/* Supplier ID */}
      <p className="mb-1">
        <strong>Supplier ID:</strong> {supplier.supplierId}
      </p>
      
      {/* Supplier Email */}
      <p className="mb-1">
        <strong>Email:</strong> {supplier.contactEmail}
      </p>
      
      {/* Supplier Phone */}
      <p className="mb-1">
        <strong>Phone:</strong> {supplier.contactPhone}
      </p>
      
      {/* Supplier Address */}
      <p className="mb-1">
        <strong>Address:</strong> {supplier.address}
      </p>
      
      {/* Report ID - Only show if exists */}
      {supplier.reportId && (
        <p className="mb-1">
          <strong>Report ID:</strong> {supplier.reportId}
        </p>
      )}

      {/* Edit Button */}
      <div className="mt-4">
        <button 
          onClick={handleEdit}
          className="btn-primary text-sm"
        >
          Edit Supplier
        </button>
      </div>
    </div>
  );
};

export default SupplierCard;
