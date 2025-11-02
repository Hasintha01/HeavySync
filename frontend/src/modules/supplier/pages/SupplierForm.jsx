// frontend/src/modules/supplier/pages/SupplierForm.jsx

/**
 * SupplierForm Page Component
 * Form for creating or editing a supplier
 * NOW USING REACT HOOK FORM - Much cleaner and more powerful!
 */

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSuppliers, useFormHandler } from "../../../hooks";
import { supplierSchema } from "../../../utils/validationSchemas";

/**
 * Supplier Form Component
 * @returns {JSX.Element} Supplier creation/edit form
 */
const SupplierForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // 🚀 Use custom hooks for data and form handling
  const { createSupplier, updateSupplier, getSupplierById } = useSuppliers();
  const { 
    register, 
    handleSubmit, 
    errors, 
    isSubmitting,
    reset,
    setValues
  } = useFormHandler(
    {
      supplierId: "",
      name: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
      reportId: "",
    },
    supplierSchema
  );

  const [loadingData, setLoadingData] = React.useState(false);

  /**
   * Load supplier data when editing
   */
  useEffect(() => {
    if (isEditMode) {
      setLoadingData(true);
      getSupplierById(id)
        .then((data) => {
          // Populate form with existing data
          setValues({
            supplierId: data.supplierId || "",
            name: data.name || "",
            contactEmail: data.contactEmail || "",
            contactPhone: data.contactPhone || "",
            address: data.address || "",
            reportId: data.reportId || "",
          });
        })
        .catch((err) => {
          console.error("Error loading supplier:", err);
        })
        .finally(() => {
          setLoadingData(false);
        });
    }
  }, [id, isEditMode, getSupplierById, setValues]);

  /**
   * Handle form submission
   */
  const onSubmit = async (formData) => {
    try {
      if (isEditMode) {
        await updateSupplier(id, formData);
        setTimeout(() => navigate("/suppliers"), 1000);
      } else {
        await createSupplier(formData);
        reset(); // Reset form after successful creation
      }
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-start">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-2xl mt-12">
          <p className="text-center text-lg text-gray-600">Loading supplier data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-start">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 shadow-lg rounded-lg w-full max-w-2xl mt-12">
        {/* Form Title */}
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          {isEditMode ? 'Edit Supplier' : 'Add New Supplier'}
        </h2>

        {/* Supplier ID */}
        <div className="mb-6">
          <label htmlFor="supplierId" className="block font-semibold mb-2 text-gray-700">
            Supplier ID <span className="text-red-500">*</span>
          </label>
          <input
            id="supplierId"
            type="text"
            {...register("supplierId")}
            placeholder="Enter unique supplier ID"
            className={`w-full border p-2 rounded ${errors.supplierId ? 'border-red-500' : 'border-gray-300'}`}
          />
          <p className="text-xs text-gray-500 mt-1">Must be unique (e.g., SUP001, SUP002)</p>
          {errors.supplierId && (
            <p className="text-red-500 text-xs mt-1">{errors.supplierId.message}</p>
          )}
        </div>

        {/* Supplier Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2 text-gray-700">
            Supplier Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Enter supplier name"
            className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Contact Email */}
        <div className="mb-6">
          <label htmlFor="contactEmail" className="block font-semibold mb-2 text-gray-700">
            Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            id="contactEmail"
            type="email"
            {...register("contactEmail")}
            placeholder="email@example.com"
            className={`w-full border p-2 rounded ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.contactEmail.message}</p>
          )}
        </div>

        {/* Contact Phone */}
        <div className="mb-6">
          <label htmlFor="contactPhone" className="block font-semibold mb-2 text-gray-700">
            Contact Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="contactPhone"
            type="tel"
            {...register("contactPhone")}
            placeholder="0712345678 (10 digits)"
            className={`w-full border p-2 rounded ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'}`}
            maxLength="10"
          />
          {errors.contactPhone && (
            <p className="text-red-500 text-xs mt-1">{errors.contactPhone.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-6">
          <label htmlFor="address" className="block font-semibold mb-2 text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            {...register("address")}
            placeholder="Enter supplier address"
            className={`w-full border p-2 rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            rows="3"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Report ID (Optional) */}
        <div className="mb-6">
          <label htmlFor="reportId" className="block font-semibold mb-2 text-gray-700">
            Report ID <span className="text-gray-500 text-sm">(Optional)</span>
          </label>
          <input
            id="reportId"
            type="text"
            {...register("reportId")}
            placeholder="Enter report ID if applicable"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 flex-1 font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : isEditMode ? "Update Supplier" : "Save Supplier"}
          </button>
          
          {isEditMode && (
            <button
              type="button"
              onClick={() => navigate("/suppliers")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-medium"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SupplierForm;
