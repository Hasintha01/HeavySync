// frontend/src/modules/supplier/pages/SupplierForm.jsx

/**
 * SupplierForm Page Component
 * 
 * This form component handles both creating new suppliers and editing existing ones.
 * Features:
 * - Controlled form inputs with validation
 * - Dynamic form fields based on supplier data structure
 * - Form submission with success/error handling
 * - Responsive design with Tailwind CSS
 * - Field validation (required fields, email format, etc.)
 * 
 * Props:
 * - supplier: (optional) Existing supplier data for edit mode
 * - onSuccess: Callback function called after successful submission
 * - onCancel: Callback function for form cancellation
 */

import React, { useState, useEffect } from "react";
import supplierService from "../services/supplierService";

const SupplierForm = ({ supplier = null, onSuccess, onCancel }) => {
  // Form state with all supplier fields
  const [form, setForm] = useState({
    supplierName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    status: "active",
  });

  // Form validation and submission states
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  // Determine if this is edit mode or create mode
  const isEditMode = Boolean(supplier);

  /**
   * Effect to populate form when editing existing supplier
   * Runs when supplier prop changes
   */
  useEffect(() => {
    if (supplier) {
      setForm({
        supplierName: supplier.supplierName || "",
        contactPerson: supplier.contactPerson || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
        category: supplier.category || "",
        status: supplier.status || "active",
      });
    }
  }, [supplier]);

  /**
   * Handles input field changes and clears related errors
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form state
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Clear general submit error
    setSubmitError("");
  };

  /**
   * Validates form data before submission
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!form.supplierName.trim()) {
      newErrors.supplierName = "Supplier name is required";
    }

    // Email validation (if provided)
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (basic check if provided)
    if (form.phone && form.phone.length < 10) {
      newErrors.phone = "Phone number should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission for both create and update operations
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      if (isEditMode) {
        // Update existing supplier
        await supplierService.updateSupplier(supplier._id, form);
      } else {
        // Create new supplier
        await supplierService.createSupplier(form);
      }
      
      // Call success callback if provided
      onSuccess?.();
      
      // Reset form if creating new supplier
      if (!isEditMode) {
        setForm({
          supplierName: "",
          contactPerson: "",
          email: "",
          phone: "",
          address: "",
          category: "",
          status: "active",
        });
      }
    } catch (error) {
      console.error("Error saving supplier:", error);
      setSubmitError(
        error.response?.data?.message || 
        `Failed to ${isEditMode ? 'update' : 'create'} supplier. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Form field configuration for dynamic rendering
  const formFields = [
    { name: "supplierName", label: "Supplier Name", type: "text", required: true },
    { name: "contactPerson", label: "Contact Person", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "address", label: "Address", type: "textarea" },
    { name: "category", label: "Category", type: "text", placeholder: "e.g., Engine Parts, Electronics" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        {/* Form header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditMode ? 'Edit Supplier' : 'Add New Supplier'}
          </h2>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>

        {/* Display submit error if any */}
        {submitError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {submitError}
          </div>
        )}

        {/* Dynamic form fields */}
        <div className="space-y-4">
          {formFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || field.label}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={3}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || field.label}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors[field.name] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required={field.required}
                />
              )}
              
              {/* Show field-specific error */}
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          {/* Status dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Form action buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={loading}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditMode ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              <span>{isEditMode ? 'Update Supplier' : 'Create Supplier'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierForm;