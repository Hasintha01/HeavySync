// frontend/src/modules/supplier/pages/PartForm.jsx

/**
 * PartForm Page Component
 * Form for creating a new part/item
 * Handles form input and submission to the backend API
 */

import React, { useState } from "react";
import partService from "../services/partService";

/**
 * Part Form Component
 * @param {Object} props - Component props
 * @param {Function} props.onSuccess - Optional callback function called after successful part creation
 * @returns {JSX.Element} Part creation form
 */
const PartForm = ({ onSuccess }) => {
  // State to manage form fields
  const [form, setForm] = useState({
    partId: "",
    name: "",
    description: "",
    partNumber: "",
    quantity: 0,
    minimumStock: 0,
    unitPrice: 0,
    location: "",
    categoryId: "",
    reportId: "",
  });

  // State to manage loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  /**
   * Validate part name
   * - Only alphanumeric characters and spaces allowed
   * - No special characters
   * - No character repeated more than twice consecutively
   */
  const validatePartName = (name) => {
    // Check for special characters (only allow letters, numbers, and spaces)
    const hasSpecialChars = /[^a-zA-Z0-9\s]/.test(name);
    if (hasSpecialChars) {
      return false;
    }
    
    // Check for same character repeated more than twice
    const hasTripleRepeat = /(.)\1{2,}/.test(name);
    if (hasTripleRepeat) {
      return false;
    }
    
    return true;
  };

  /**
   * Handle input field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear validation error for this field
    setValidationErrors({ ...validationErrors, [name]: "" });
    
    // Special handling for part name - validate before setting
    if (name === 'name') {
      if (value === '' || validatePartName(value)) {
        setForm({ ...form, [name]: value });
      } else {
        // Don't update if validation fails
        return;
      }
    } else if (name === 'quantity' || name === 'minimumStock' || name === 'unitPrice') {
      // For numeric fields, ensure non-negative
      const numValue = parseFloat(value) || 0;
      if (numValue < 0) {
        return; // Don't allow negative values
      }
      setForm({ ...form, [name]: numValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /**
   * Validate form before submission
   */
  const validateForm = () => {
    const errors = {};
    
    if (!form.partId.trim()) {
      errors.partId = "Part ID is required";
    }
    
    if (!form.name.trim()) {
      errors.name = "Part name is required";
    }
    
    if (!form.description.trim()) {
      errors.description = "Description is required";
    }
    
    if (!form.partNumber.trim()) {
      errors.partNumber = "Part number is required";
    }
    
    if (form.quantity < 0) {
      errors.quantity = "Quantity cannot be negative";
    }
    
    if (form.minimumStock < 0) {
      errors.minimumStock = "Minimum stock cannot be negative";
    }
    
    if (!form.unitPrice || form.unitPrice <= 0) {
      errors.unitPrice = "Unit price must be greater than 0";
    }
    
    if (!form.location.trim()) {
      errors.location = "Location is required";
    }
    
    if (!form.categoryId.trim()) {
      errors.categoryId = "Category ID is required";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    if (!validateForm()) {
      setError("Recheck entered details");
      return;
    }

    setLoading(true);

    try {
      // Call API to create new part
      await partService.createPart(form);
      
      // Reset form after success
      setForm({
        partId: "",
        name: "",
        description: "",
        partNumber: "",
        quantity: 0,
        minimumStock: 0,
        unitPrice: 0,
        location: "",
        categoryId: "",
        reportId: "",
      });
      setValidationErrors({});

      setSuccess("Part created successfully!");

      // Call optional success callback if provided
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create part. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg max-w-2xl">
      {/* Form Title */}
      <h2 className="text-xl font-bold mb-4">Add New Part</h2>

      {/* Display error if exists */}
      {error && <p className="text-red-500 mb-3">{error}</p>}
      
      {/* Display success message */}
      {success && <p className="text-green-500 mb-3">{success}</p>}

      <div className="grid grid-cols-2 gap-4">
        {/* Part ID */}
        <div className="mb-3">
          <label htmlFor="partId" className="block font-medium mb-1">
            Part ID <span className="text-red-500">*</span>
          </label>
          <input
            id="partId"
            name="partId"
            type="text"
            value={form.partId}
            onChange={handleChange}
            placeholder="Enter unique part ID"
            className={`w-full border p-2 rounded ${validationErrors.partId ? 'border-red-500' : ''}`}
            required
          />
          {validationErrors.partId && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.partId}</p>
          )}
        </div>

        {/* Part Number */}
        <div className="mb-3">
          <label htmlFor="partNumber" className="block font-medium mb-1">
            Part Number <span className="text-red-500">*</span>
          </label>
          <input
            id="partNumber"
            name="partNumber"
            type="text"
            value={form.partNumber}
            onChange={handleChange}
            placeholder="Enter part number"
            className={`w-full border p-2 rounded ${validationErrors.partNumber ? 'border-red-500' : ''}`}
            required
          />
          {validationErrors.partNumber && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.partNumber}</p>
          )}
        </div>
      </div>

      {/* Part Name */}
      <div className="mb-3">
        <label htmlFor="name" className="block font-medium mb-1">
          Part Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter part name (letters and numbers only)"
          className={`w-full border p-2 rounded ${validationErrors.name ? 'border-red-500' : ''}`}
          required
        />
        {validationErrors.name && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          Only letters, numbers, and spaces. No character more than twice in a row.
        </p>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="block font-medium mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter part description"
          className={`w-full border p-2 rounded ${validationErrors.description ? 'border-red-500' : ''}`}
          rows="3"
          required
        />
        {validationErrors.description && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Quantity */}
        <div className="mb-3">
          <label htmlFor="quantity" className="block font-medium mb-1">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={form.quantity}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${validationErrors.quantity ? 'border-red-500' : ''}`}
            required
          />
          {validationErrors.quantity && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.quantity}</p>
          )}
        </div>

        {/* Minimum Stock */}
        <div className="mb-3">
          <label htmlFor="minimumStock" className="block font-medium mb-1">
            Minimum Stock <span className="text-red-500">*</span>
          </label>
          <input
            id="minimumStock"
            name="minimumStock"
            type="number"
            min="0"
            value={form.minimumStock}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${validationErrors.minimumStock ? 'border-red-500' : ''}`}
            required
          />
          {validationErrors.minimumStock && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.minimumStock}</p>
          )}
        </div>

        {/* Unit Price */}
        <div className="mb-3">
          <label htmlFor="unitPrice" className="block font-medium mb-1">
            Unit Price (LKR) <span className="text-red-500">*</span>
          </label>
          <input
            id="unitPrice"
            name="unitPrice"
            type="number"
            min="0"
            step="0.01"
            value={form.unitPrice}
            onChange={handleChange}
            className={`w-full border p-2 rounded ${validationErrors.unitPrice ? 'border-red-500' : ''}`}
            required
          />
          {validationErrors.unitPrice && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.unitPrice}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Location */}
        <div className="mb-3">
          <label htmlFor="location" className="block font-medium mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            placeholder="Storage location"
            className={`w-full border p-2 rounded ${validationErrors.location ? 'border-red-500' : ''}`}
            required
          />
          {validationErrors.location && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.location}</p>
          )}
        </div>

        {/* Category ID */}
        <div className="mb-3">
          <label htmlFor="categoryId" className="block font-medium mb-1">
            Category ID <span className="text-red-500">*</span>
          </label>
          <input
            id="categoryId"
            name="categoryId"
            type="text"
            value={form.categoryId}
            onChange={handleChange}
            placeholder="Enter category ID"
            className={`w-full border p-2 rounded ${validationErrors.categoryId ? 'border-red-500' : ''}`}
            required
          />
          {validationErrors.categoryId && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.categoryId}</p>
          )}
        </div>
      </div>

      {/* Report ID (Optional) */}
      <div className="mb-3">
        <label htmlFor="reportId" className="block font-medium mb-1">
          Report ID <span className="text-gray-500 text-sm">(Optional)</span>
        </label>
        <input
          id="reportId"
          name="reportId"
          type="text"
          value={form.reportId}
          onChange={handleChange}
          placeholder="Enter report ID if applicable"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 w-full"
        disabled={loading}
      >
        {loading ? "Saving..." : "Add Part"}
      </button>
    </form>
  );
};

export default PartForm;
