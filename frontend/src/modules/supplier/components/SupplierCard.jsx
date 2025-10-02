// frontend/src/modules/supplier/components/SupplierCard.jsx

/**
 * SupplierCard Component
 * Displays individual supplier information in a card layout
 * Used in the SupplierList page to show supplier details
 */

import React from "react";

/**
 * Supplier Card Component
 * @param {Object} props - Component props
 * @param {Object} props.supplier - Supplier object containing supplier details
 * @param {string} props.supplier._id - Unique identifier
 * @param {string} props.supplier.name - Supplier name
 * @param {string} props.supplier.email - Supplier email
 * @param {string} props.supplier.phone - Supplier phone number
 * @param {string} props.supplier.category - Supplier category/type
 * @param {string} props.supplier.status - Supplier status (active/inactive)
 */
const SupplierCard = ({ supplier }) => (
  <div className="p-4 border rounded shadow bg-white">
    {/* Supplier Name - Main heading */}
    <h3 className="text-lg font-bold">{supplier.name}</h3>
    
    {/* Supplier Email */}
    <p>{supplier.email}</p>
    
    {/* Supplier Phone */}
    <p>{supplier.phone}</p>
    
    {/* Supplier Category */}
    <p>{supplier.category}</p>
    
    {/* Status Badge - Changes color based on active/inactive status */}
    <span
      className={`px-2 py-1 rounded text-sm ${
        supplier.status === "active" 
          ? "bg-green-100 text-green-700" // Green badge for active suppliers
          : "bg-red-100 text-red-700"     // Red badge for inactive suppliers
      }`}
    >
      {supplier.status}
    </span>
  </div>
);

export default SupplierCard;
