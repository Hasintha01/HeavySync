// frontend/src/modules/supplier/pages/SupplierForm.jsx

/**
 * SupplierForm Page Component
 * Form for creating a new supplier
 * Handles form input and submission to the backend API
 */

import React, { useState } from "react";
import supplierService from "../services/supplierService";

/**
 * Supplier Form Component
 * @param {Object} props - Component props
 * @param {Function} props.onSuccess - Optional callback function called after successful supplier creation
 * @returns {JSX.Element} Supplier creation form
 */
const SupplierForm = ({ onSuccess }) => {
  // State to manage form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    status: "active", // Default status is 'active'
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
   * Prevents default form behavior and calls the API to create supplier
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Call API to create new supplier with form data
    await supplierService.createSupplier(form);
    
    // Call optional success callback if provided
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
      {/* Form Title */}
      <h2 className="text-xl font-bold mb-4">Add Supplier</h2>
      
      {/* Dynamic Input Fields - Maps through array to create input fields */}
      {["name", "email", "phone", "address", "category"].map((field) => (
        <input
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
          className="w-full border p-2 rounded mb-3"
          required={field === "name"} // Only 'name' field is required
        />
      ))}
      
      {/* Status Dropdown - Select active or inactive */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      
      {/* Submit Button */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default SupplierForm;
