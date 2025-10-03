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

  // State to manage loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);
    setError("");

    try {
      // Call API to create new supplier with form data
      await supplierService.createSupplier(form);
      
      // Reset form after success
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        category: "",
        status: "active",
      });

      // Call optional success callback if provided
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setError("Failed to create supplier. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
      {/* Form Title */}
      <h2 className="text-xl font-bold mb-4">Add Supplier</h2>

      {/* Display error if exists */}
      {error && <p className="text-red-500 mb-3">{error}</p>}

      {/* Dynamic Input Fields - Maps through array to create input fields */}
      {["name", "email", "phone", "address", "category"].map((field) => (
        <div key={field} className="mb-3">
          <label htmlFor={field} className="block font-medium mb-1">{field}</label>
          <input
            id={field}
            name={field}
            type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full border p-2 rounded"
            required={field === "name"} // Only 'name' field is required
          />
        </div>
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
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading} // Disable while loading
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default SupplierForm;
