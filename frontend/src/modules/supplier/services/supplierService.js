// frontend/src/modules/supplier/services/supplierService.js

/**
 * Supplier Service - API interaction layer for supplier management
 * 
 * This service handles all HTTP requests related to supplier operations including:
 * - Fetching supplier lists and individual supplier data
 * - Creating new suppliers
 * - Updating existing supplier information
 * - Soft deleting (deactivating) suppliers
 * 
 * Uses axios for HTTP requests with proper error handling
 */

import axios from "axios";

// Base API endpoint for all supplier-related requests
const API_URL = "/api/suppliers";

/**
 * Fetches all suppliers from the backend
 * @returns {Promise<Object>} Response containing supplier data array and metadata
 */
const getSuppliers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

/**
 * Fetches a single supplier by their ID
 * @param {string} id - The supplier's MongoDB ObjectId
 * @returns {Promise<Object>} Single supplier object with all details
 */
const getSupplierById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

/**
 * Creates a new supplier in the system
 * @param {Object} supplierData - Supplier information object
 * @param {string} supplierData.supplierName - Required: Name of the supplier
 * @param {string} supplierData.contactPerson - Optional: Main contact person
 * @param {string} supplierData.email - Optional: Contact email
 * @param {string} supplierData.phone - Optional: Contact phone number
 * @param {string} supplierData.address - Optional: Physical address
 * @param {string} supplierData.category - Optional: Supplier category (e.g., "engine parts")
 * @param {string} supplierData.status - Optional: "active" or "inactive"
 * @returns {Promise<Object>} Created supplier object with generated ID
 */
const createSupplier = async (supplierData) => {
  const res = await axios.post(API_URL, supplierData);
  return res.data;
};

/**
 * Updates an existing supplier's information
 * @param {string} id - The supplier's MongoDB ObjectId
 * @param {Object} supplierData - Updated supplier information
 * @returns {Promise<Object>} Updated supplier object
 */
const updateSupplier = async (id, supplierData) => {
  const res = await axios.put(`${API_URL}/${id}`, supplierData);
  return res.data;
};

/**
 * Soft deletes a supplier by setting status to "inactive"
 * @param {string} id - The supplier's MongoDB ObjectId
 * @returns {Promise<Object>} Success message
 */
const deleteSupplier = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

// Export all service functions as a single object for easy importing
export default {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};