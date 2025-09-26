// frontend/src/modules/supplier/services/purchaseOrderService.js

/**
 * Purchase Order Service - API interaction layer for purchase order management
 * 
 * This service handles all HTTP requests related to purchase order operations including:
 * - Fetching purchase order lists and individual order details
 * - Creating new purchase orders with items and supplier information
 * - Updating existing orders (only when status is "pending")
 * - Managing order status changes (pending → approved → received → cancelled)
 * - Handling quotations and PDF downloads
 * 
 * Integrates with the backend's comprehensive purchase order system
 */

import axios from "axios";

// Base API endpoint for all purchase order-related requests
const API_URL = "/api/purchaseOrders";

/**
 * Fetches all purchase orders with optional filtering
 * @param {Object} params - Optional query parameters for filtering
 * @param {string} params.supplier - Filter by supplier ID
 * @param {string} params.status - Filter by order status
 * @param {string} params.fromDate - Filter orders from this date
 * @param {string} params.toDate - Filter orders up to this date
 * @param {number} params.page - Page number for pagination
 * @param {number} params.limit - Number of orders per page
 * @returns {Promise<Object>} Response with orders array and pagination metadata
 */
const getOrders = async (params = {}) => {
  const res = await axios.get(API_URL, { params });
  return res.data;
};

/**
 * Fetches a single purchase order with populated supplier information
 * @param {string} id - The purchase order's MongoDB ObjectId
 * @returns {Promise<Object>} Complete purchase order object with supplier details
 */
const getOrderById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

/**
 * Creates a new purchase order
 * @param {Object} orderData - Purchase order information
 * @param {string} orderData.supplier - Required: Supplier's ObjectId
 * @param {Array} orderData.items - Required: Array of order items
 * @param {string} orderData.items[].itemName - Required: Name of the item
 * @param {number} orderData.items[].quantity - Required: Quantity to order
 * @param {number} orderData.items[].unitPrice - Required: Price per unit
 * @param {string} orderData.items[].productId - Optional: Reference to inventory item
 * @param {Date} orderData.expectedDeliveryDate - Optional: Expected delivery date
 * @param {string} orderData.notes - Optional: Additional notes
 * @returns {Promise<Object>} Created purchase order with auto-generated orderId
 */
const createOrder = async (orderData) => {
  const res = await axios.post(API_URL, orderData);
  return res.data;
};

/**
 * Updates an existing purchase order (only if status is "pending")
 * @param {string} id - The purchase order's MongoDB ObjectId
 * @param {Object} orderData - Updated order information
 * @returns {Promise<Object>} Updated purchase order object
 */
const updateOrder = async (id, orderData) => {
  const res = await axios.put(`${API_URL}/${id}`, orderData);
  return res.data;
};

/**
 * Changes the status of a purchase order
 * @param {string} id - The purchase order's MongoDB ObjectId
 * @param {string} status - New status: "pending", "approved", "received", "cancelled"
 * @returns {Promise<Object>} Updated purchase order with new status
 */
const changeOrderStatus = async (id, status) => {
  const res = await axios.patch(`${API_URL}/${id}/status`, { status });
  return res.data;
};

/**
 * Cancels a purchase order (soft delete)
 * @param {string} id - The purchase order's MongoDB ObjectId
 * @returns {Promise<Object>} Success message and cancelled order
 */
const deleteOrder = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

/**
 * Downloads a purchase order as PDF
 * @param {string} id - The purchase order's MongoDB ObjectId
 * @returns {Promise<Blob>} PDF file as blob for download
 */
const downloadOrderPDF = async (id) => {
  const res = await axios.get(`${API_URL}/${id}/pdf`, {
    responseType: 'blob', // Important for file downloads
  });
  return res.data;
};

/**
 * Submits a quotation for an existing purchase order
 * @param {string} poId - The purchase order's MongoDB ObjectId
 * @param {Object} quotationData - Quotation information
 * @param {string} quotationData.supplierId - Supplier providing the quotation
 * @param {Array} quotationData.items - Items with quoted prices
 * @param {string} quotationData.notes - Optional notes
 * @returns {Promise<Object>} Success message and quotation details
 */
const submitQuotation = async (poId, quotationData) => {
  const res = await axios.post(`${API_URL}/${poId}/quotations`, quotationData);
  return res.data;
};

/**
 * Accepts a quotation and creates a new purchase order from it
 * @param {string} poId - The original purchase order's MongoDB ObjectId
 * @param {number} quotationIndex - Index of the quotation to accept
 * @returns {Promise<Object>} New purchase order created from accepted quotation
 */
const acceptQuotation = async (poId, quotationIndex) => {
  const res = await axios.post(`${API_URL}/${poId}/quotations/${quotationIndex}/accept`);
  return res.data;
};

// Export all service functions for purchase order management
export default {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  changeOrderStatus,
  deleteOrder,
  downloadOrderPDF,
  submitQuotation,
  acceptQuotation,
};