// frontend/src/modules/supplier/pages/PurchaseOrderForm.jsx

/**
 * PurchaseOrderForm Page Component
 * 
 * A comprehensive form for creating and editing purchase orders.
 * Features:
 * - Dynamic item management (add/remove items)
 * - Supplier selection with search/dropdown
 * - Real-time total calculations
 * - Form validation with error handling
 * - Support for both create and edit modes
 * - Expected delivery date selection
 * - Notes and additional information
 * 
 * Form Structure:
 * - Supplier selection (required)
 * - Items array with: itemName, quantity, unitPrice, productId (optional)
 * - Expected delivery date (optional)
 * - Notes (optional)
 * 
 * Calculations:
 * - Line totals: quantity × unitPrice
 * - Order total: sum of all line totals
 */

import React, { useState, useEffect } from "react";
import purchaseOrderService from "../services/purchaseOrderService";
import supplierService from "../services/supplierService";

const PurchaseOrderForm = ({ order = null, onSuccess, onCancel }) => {
  // Form state
  const [form, setForm] = useState({
    supplier: "",
    items: [
      {
        itemName: "",
        quantity: 1,
        unitPrice: 0,
        productId: "", // Optional reference to inventory item
      }
    ],
    expectedDeliveryDate: "",
    notes: "",
  });

  // Additional component state
  const [suppliers, setSuppliers] = useState([]); // Available suppliers
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  // Determine if this is edit mode
  const isEditMode = Boolean(order);

  /**
   * Effect to load suppliers on component mount
   */
  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const response = await supplierService.getSuppliers();
        // Filter only active suppliers
        const activeSuppliers = (response.data || response).filter(
          supplier => supplier.status === 'active'
        );
        setSuppliers(activeSuppliers);
      } catch (err) {
        console.error("Error loading suppliers:", err);
      }
    };

    loadSuppliers();
  }, []);

  /**
   * Effect to populate form when editing existing order
   */
  useEffect(() => {
    if (order) {
      setForm({
        supplier: order.supplier?._id || order.supplier,
        items: order.items?.length > 0 ? order.items : [
          { itemName: "", quantity: 1, unitPrice: 0, productId: "" }
        ],
        expectedDeliveryDate: order.expectedDeliveryDate 
          ? new Date(order.expectedDeliveryDate).toISOString().split('T')[0] 
          : "",
        notes: order.notes || "",
      });
    }
  }, [order]);

  /**
   * Effect to calculate total cost when items change
   */
  useEffect(() => {
    const newTotal = form.items.reduce((sum, item) => {
      const lineTotal = Number(item.quantity) * Number(item.unitPrice);
      return sum + (isNaN(lineTotal) ? 0 : lineTotal);
    }, 0);
    setTotalCost(newTotal);
  }, [form.items]);

  /**
   * Handles changes to basic form fields (not items)
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear errors
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    setSubmitError("");
  };

  /**
   * Handles changes to item fields within the items array
   * @param {number} index - Index of the item being changed
   * @param {string} field - Field name being changed
   * @param {string|number} value - New value for the field
   */
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'quantity' || field === 'unitPrice' ? Number(value) || 0 : value,
    };
    
    setForm(prev => ({ ...prev, items: updatedItems }));
    
    // Clear item-specific errors
    if (errors[`items.${index}.${field}`]) {
      setErrors(prev => ({ ...prev, [`items.${index}.${field}`]: "" }));
    }
  };

  /**
   * Adds a new empty item to the items array
   */
  const addItem = () => {
    setForm(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { itemName: "", quantity: 1, unitPrice: 0, productId: "" }
      ]
    }));
  };

  /**
   * Removes an item from the items array
   * @param {number} index - Index of the item to remove
   */
  const removeItem = (index) => {
    if (form.items.length > 1) {
      const updatedItems = form.items.filter((_, i) => i !== index);
      setForm(prev => ({ ...prev, items: updatedItems }));
      
      // Remove related errors
      const updatedErrors = { ...errors };
      Object.keys(updatedErrors).forEach(key => {
        if (key.startsWith(`items.${index}.`)) {
          delete updatedErrors[key];
        }
      });
      setErrors(updatedErrors);
    }
  };

  /**
   * Validates the entire form before submission
   * @returns {boolean} True if form is valid
   */
  const validateForm = () => {
    const newErrors = {};

    // Validate supplier selection
    if (!form.supplier) {
      newErrors.supplier = "Please select a supplier";
    }

    // Validate items
    if (form.items.length === 0) {
      newErrors.items = "At least one item is required";
    } else {
      form.items.forEach((item, index) => {
        if (!item.itemName.trim()) {
          newErrors[`items.${index}.itemName`] = "Item name is required";
        }
        if (!item.quantity || item.quantity <= 0) {
          newErrors[`items.${index}.quantity`] = "Quantity must be greater than 0";
        }
        if (item.unitPrice < 0) {
          newErrors[`items.${index}.unitPrice`] = "Unit price cannot be negative";
        }
      });
    }

    // Validate expected delivery date (if provided, should be future date)
    if (form.expectedDeliveryDate) {
      const selectedDate = new Date(form.expectedDeliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.expectedDeliveryDate = "Expected delivery date should be today or in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      // Prepare data for submission
      const submitData = {
        supplier: form.supplier,
        items: form.items.map(item => ({
          itemName: item.itemName.trim(),
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          ...(item.productId && { productId: item.productId }),
        })),
        ...(form.expectedDeliveryDate && { 
          expectedDeliveryDate: form.expectedDeliveryDate 
        }),
        ...(form.notes.trim() && { notes: form.notes.trim() }),
      };

      if (isEditMode) {
        await purchaseOrderService.updateOrder(order._id, submitData);
      } else {
        await purchaseOrderService.createOrder(submitData);
      }

      // Call success callback
      onSuccess?.();

      // Reset form if creating new order
      if (!isEditMode) {
        setForm({
          supplier: "",
          items: [{ itemName: "", quantity: 1, unitPrice: 0, productId: "" }],
          expectedDeliveryDate: "",
          notes: "",
        });
      }

    } catch (error) {
      console.error("Error saving purchase order:", error);
      setSubmitError(
        error.response?.data?.message || 
        `Failed to ${isEditMode ? 'update' : 'create'} purchase order. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        {/* Form Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditMode ? 'Edit Purchase Order' : 'Create New Purchase Order'}
          </h2>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          )}
        </div>

        {/* Submit Error */}
        {submitError && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {submitError}
          </div>
        )}

        {/* Supplier Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supplier <span className="text-red-500">*</span>
          </label>
          <select
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.supplier ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Select a supplier...</option>
            {suppliers.map(supplier => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.supplierName} - {supplier.category}
              </option>
            ))}
          </select>
          {errors.supplier && (
            <p className="text-red-500 text-sm mt-1">{errors.supplier}</p>
          )}
        </div>

        {/* Items Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Order Items <span className="text-red-500">*</span>
            </h3>
            <button
              type="button"
              onClick={addItem}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              + Add Item
            </button>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            {form.items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-md font-medium text-gray-700">Item {index + 1}</h4>
                  {form.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Item Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      placeholder="Enter item name"
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`items.${index}.itemName`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`items.${index}.itemName`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`items.${index}.itemName`]}</p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      min="1"
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`items.${index}.quantity`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`items.${index}.quantity`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`items.${index}.quantity`]}</p>
                    )}
                  </div>

                  {/* Unit Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Price ($)
                    </label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                      min="0"
                      step="0.01"
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`items.${index}.unitPrice`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`items.${index}.unitPrice`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`items.${index}.unitPrice`]}</p>
                    )}
                  </div>
                </div>

                {/* Line Total */}
                <div className="mt-3 text-right">
                  <span className="text-sm text-gray-600">
                    Line Total: <span className="font-semibold">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {errors.items && (
            <p className="text-red-500 text-sm mt-2">{errors.items}</p>
          )}
        </div>

        {/* Order Total */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="text-right">
            <span className="text-lg font-semibold text-gray-800">
              Total Order Cost: <span className="text-green-600">${totalCost.toFixed(2)}</span>
            </span>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Expected Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Delivery Date
            </label>
            <input
              type="date"
              name="expectedDeliveryDate"
              value={form.expectedDeliveryDate}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.expectedDeliveryDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.expectedDeliveryDate && (
              <p className="text-red-500 text-sm mt-1">{errors.expectedDeliveryDate}</p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Additional notes or special instructions..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={loading}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <span>{isEditMode ? 'Update Order' : 'Create Order'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseOrderForm;