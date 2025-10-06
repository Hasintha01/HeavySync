// frontend/src/modules/supplier/pages/PurchaseOrderForm.jsx

/**
 * PurchaseOrderForm Page Component
 * Form for creating or editing a purchase order
 * Handles form input and submission to the backend API
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import purchaseOrderService from "../services/purchaseOrderService";
import supplierService from "../services/supplierService";

/**
 * Purchase Order Form Component
 * @param {Object} props - Component props
 * @param {Function} props.onSuccess - Optional callback function called after successful order creation/update
 * @returns {JSX.Element} Purchase order creation/edit form
 */
const PurchaseOrderForm = ({ onSuccess }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // State for suppliers list
  const [suppliers, setSuppliers] = useState([]);
  
  // State to manage form fields
  const [form, setForm] = useState({
    supplier: "",        // Supplier ID
    items: [
      {
        name: "",
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
      }
    ],
  });

  // State for loading and messages
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load purchase order data when editing
  useEffect(() => {
    if (isEditMode) {
      setLoadingData(true);
      purchaseOrderService.getPurchaseOrderById(id)
        .then((data) => {
          setForm({
            supplier: data.supplier?._id || data.supplier,
            items: data.items && data.items.length > 0 ? data.items : [{
              name: "",
              quantity: 1,
              unitPrice: 0,
              totalPrice: 0,
            }],
          });
        })
        .catch((err) => {
          console.error("Error loading purchase order:", err);
          setError("Failed to load purchase order data");
        })
        .finally(() => {
          setLoadingData(false);
        });
    }
  }, [id, isEditMode]);

  // Fetch suppliers on component mount
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await supplierService.getSuppliers();
        setSuppliers(data);
      } catch (err) {
        console.error("Failed to fetch suppliers:", err);
      }
    };
    fetchSuppliers();
  }, []);

  /**
   * Handle supplier selection
   */
  const handleSupplierChange = (e) => {
    setForm({ ...form, supplier: e.target.value });
  };

  /**
   * Validate item name
   * - Only alphanumeric characters and spaces allowed
   * - No special characters
   * - No character repeated more than twice consecutively
   */
  const validateItemName = (name) => {
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
   * Handle item field changes
   */
  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    
    if (field === 'name') {
      // Validate item name before setting
      if (value === '' || validateItemName(value)) {
        newItems[index][field] = value;
      } else {
        // Don't update if validation fails (prevents typing invalid characters)
        return;
      }
    } else {
      // For quantity and unitPrice, parse and validate
      const numValue = parseFloat(value) || 0;
      newItems[index][field] = numValue;
    }
    
    // Auto-calculate totalPrice for the item
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].totalPrice = newItems[index].quantity * newItems[index].unitPrice;
    }
    
    setForm({ ...form, items: newItems });
  };

  /**
   * Add new item to the order
   */
  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: "", quantity: 1, unitPrice: 0, totalPrice: 0 }]
    });
  };

  /**
   * Remove item from the order
   */
  const removeItem = (index) => {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
  };

  /**
   * Calculate total amount from all items
   */
  const calculateTotal = () => {
    return form.items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  /**
   * Handle form submission
   * Prevents default form behavior and calls the API to create purchase order
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate form
      if (!form.supplier) {
        throw new Error("Please select a supplier");
      }
      
      if (form.items.length === 0) {
        throw new Error("Please add at least one item");
      }
      
      // Validate items
      for (let i = 0; i < form.items.length; i++) {
        const item = form.items[i];
        if (!item.name || item.name.trim() === "") {
          throw new Error(`Item #${i + 1}: Please enter item name`);
        }
        if (item.quantity <= 0) {
          throw new Error(`Item #${i + 1}: Quantity must be greater than 0`);
        }
        if (item.unitPrice <= 0) {
          throw new Error(`Item #${i + 1}: Unit price must be greater than 0`);
        }
      }

      // Prepare data for backend
      const orderData = {
        supplier: form.supplier,
        items: form.items,
        totalAmount: calculateTotal(),
      };

      console.log('Submitting order data:', orderData);

      if (isEditMode) {
        // Update existing order
        const response = await purchaseOrderService.updateOrder(id, orderData);
        console.log('Order updated successfully:', response);
        setSuccess("Purchase order updated successfully!");
        
        // Navigate back after delay
        setTimeout(() => {
          navigate("/purchase-orders");
        }, 1500);
      } else {
        // Create new order
        const response = await purchaseOrderService.createOrder(orderData);
        console.log('Order created successfully:', response);
        setSuccess("Purchase order created successfully!");
        
        // Reset form after success (only for create mode)
        setForm({
          supplier: "",
          items: [{ name: "", quantity: 1, unitPrice: 0, totalPrice: 0 }],
        });
      }

      // Call optional success callback if provided
      onSuccess?.();
    } catch (err) {
      console.error('Error with purchase order:', err);
      setError(err.message || `Failed to ${isEditMode ? 'update' : 'create'} purchase order. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="bg-white p-6 shadow rounded-lg max-w-2xl">
        <p className="text-center">Loading purchase order data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg max-w-2xl">
      {/* Form Title */}
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? 'Edit Purchase Order' : 'Create Purchase Order'}
      </h2>

      {/* Display error if exists */}
      {error && <p className="text-red-500 mb-3">{error}</p>}
      
      {/* Display success message */}
      {success && <p className="text-green-500 mb-3">{success}</p>}
      
      {/* Supplier Selection */}
      <div className="mb-4">
        <label htmlFor="supplier" className="block font-medium mb-1">
          Select Supplier <span className="text-red-500">*</span>
        </label>
        <select
          id="supplier"
          value={form.supplier}
          onChange={handleSupplierChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Select Supplier --</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>

      {/* Items Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Order Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            + Add Item
          </button>
        </div>

        {form.items.map((item, index) => (
          <div key={index} className="border p-3 rounded mb-3 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Item #{index + 1}</span>
              {form.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Item Name */}
            <div className="mb-2">
              <label className="block text-sm mb-1">Item Name *</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                placeholder="Enter item name (letters and numbers only)"
                className="w-full border p-2 rounded"
                required
                minLength="1"
              />
              {item.name.trim() === '' && (
                <p className="text-red-500 text-xs mt-1">Item name is required</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Only letters, numbers, and spaces. No character more than twice in a row.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Quantity */}
              <div>
                <label className="block text-sm mb-1">Quantity *</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
                {item.quantity <= 0 && (
                  <p className="text-red-500 text-xs mt-1">Must be greater than 0</p>
                )}
              </div>

              {/* Unit Price */}
              <div>
                <label className="block text-sm mb-1">Unit Price *</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              {/* Total Price (Read-only) */}
              <div>
                <label className="block text-sm mb-1">Total</label>
                <input
                  type="number"
                  value={item.totalPrice.toFixed(2)}
                  className="w-full border p-2 rounded bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Amount Display */}
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Total Amount:</span>
          <span className="font-bold text-lg text-blue-600">
            LKR {calculateTotal().toFixed(2)}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 flex-1"
          disabled={loading}
        >
          {loading 
            ? (isEditMode ? "Updating..." : "Creating Order...") 
            : (isEditMode ? "Update Purchase Order" : "Create Purchase Order")
          }
        </button>
        
        {isEditMode && (
          <button
            type="button"
            onClick={() => navigate("/purchase-orders")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PurchaseOrderForm;
