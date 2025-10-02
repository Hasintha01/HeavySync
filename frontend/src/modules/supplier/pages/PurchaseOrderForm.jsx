// frontend/src/modules/supplier/pages/PurchaseOrderForm.jsx

/**
 * PurchaseOrderForm Page Component
 * Form for creating a new purchase order
 * Handles form input and submission to the backend API
 */

import React, { useState } from "react";
import purchaseOrderService from "../services/purchaseOrderService";

/**
 * Purchase Order Form Component
 * @param {Object} props - Component props
 * @param {Function} props.onSuccess - Optional callback function called after successful order creation
 * @returns {JSX.Element} Purchase order creation form
 */
const PurchaseOrderForm = ({ onSuccess }) => {
  // State to manage form fields
  const [form, setForm] = useState({
    supplier: "",        // Supplier ID
    items: [],           // Array of order items
    totalCost: 0,        // Total cost of the order
    status: "pending",   // Default status is 'pending'
  });

  /**
   * Handle input field changes
   * Updates the form state when user types in any input field
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submission
   * Prevents default form behavior and calls the API to create purchase order
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Call API to create new purchase order with form data
    await purchaseOrderService.createOrder(form);
    
    // Call optional success callback if provided
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
      {/* Form Title */}
      <h2 className="text-xl font-bold mb-4">Create Purchase Order</h2>
      
      {/* Supplier ID Input */}
      <input
        name="supplier"
        value={form.supplier}
        onChange={handleChange}
        placeholder="Supplier ID"
        className="w-full border p-2 rounded mb-3"
      />
      
      {/* Total Cost Input - Number type for numeric input */}
      <input
        name="totalCost"
        value={form.totalCost}
        onChange={handleChange}
        placeholder="Total Cost"
        type="number"
        className="w-full border p-2 rounded mb-3"
      />
      
      {/* Status Dropdown - Select order status */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="received">Received</option>
      </select>
      
      {/* Submit Button */}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default PurchaseOrderForm;
