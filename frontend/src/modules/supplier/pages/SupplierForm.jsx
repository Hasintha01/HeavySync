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
  // State to manage form fields (matching backend schema)
  const [form, setForm] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });

  // State to manage loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    try {
      // Call API to create new supplier with form data
      await supplierService.createSupplier(form);
      
      // Reset form after success
      setForm({
        name: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
      });

      setSuccess("Supplier created successfully!");

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
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg max-w-md">
      {/* Form Title */}
      <h2 className="text-xl font-bold mb-4">Add Supplier</h2>

      {/* Display error if exists */}
      {error && <p className="text-red-500 mb-3">{error}</p>}
      
      {/* Display success message */}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      {/* Supplier Name */}
      <div className="mb-3">
        <label htmlFor="name" className="block font-medium mb-1">
          Supplier Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter supplier name"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Contact Email */}
      <div className="mb-3">
        <label htmlFor="contactEmail" className="block font-medium mb-1">
          Contact Email <span className="text-red-500">*</span>
        </label>
        <input
          id="contactEmail"
          name="contactEmail"
          type="email"
          value={form.contactEmail}
          onChange={handleChange}
          placeholder="email@example.com"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Contact Phone */}
      <div className="mb-3">
        <label htmlFor="contactPhone" className="block font-medium mb-1">
          Contact Phone <span className="text-red-500">*</span>
        </label>
        <input
          id="contactPhone"
          name="contactPhone"
          type="tel"
          value={form.contactPhone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Address */}
      <div className="mb-3">
        <label htmlFor="address" className="block font-medium mb-1">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter supplier address"
          className="w-full border p-2 rounded"
          rows="3"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Supplier"}
      </button>
    </form>
  );
};

export default SupplierForm;
