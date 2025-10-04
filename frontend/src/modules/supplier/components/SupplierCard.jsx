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
 * @param {string} props.supplier.contactEmail - Supplier email
 * @param {string} props.supplier.contactPhone - Supplier phone number
 * @param {string} props.supplier.address - Supplier address
 */
const SupplierCard = ({ supplier }) => (
  <div className="card">
    {/* Supplier Name - Main heading */}
    <h3 className="text-lg font-bold mb-2">{supplier.name}</h3>
    
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
  </div>
);

export default SupplierCard;
