import axios from "axios";

// Quotation Service - Handles all API calls related to quotations

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Create a new quotation request
 * @param {Object} quotationData - Quotation data
 * @returns {Promise<Object>} Created quotation
 */
export const createQuotation = async (quotationData) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(`${API_BASE_URL}/quotations`, quotationData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating quotation:", error);
        throw error;
    }
};

/**
 * Get all quotations
 * @returns {Promise<Array>} List of quotations
 */
export const getAllQuotations = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${API_BASE_URL}/quotations`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching quotations:", error);
        throw error;
    }
};

/**
 * Get a single quotation by ID
 * @param {string} id - Quotation ID
 * @returns {Promise<Object>} Quotation details
 */
export const getQuotationById = async (id) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${API_BASE_URL}/quotations/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching quotation:", error);
        throw error;
    }
};

/**
 * Update quotation status
 * @param {string} id - Quotation ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated quotation
 */
export const updateQuotationStatus = async (id, status) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.put(`${API_BASE_URL}/quotations/${id}/status`, { status }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating quotation status:", error);
        throw error;
    }
};

/**
 * Update supplier quote in a quotation
 * @param {string} quotationId - Quotation ID
 * @param {string} supplierId - Supplier ID
 * @param {Object} quoteData - Quote data (quotedPrice, deliveryTime, status)
 * @returns {Promise<Object>} Updated quotation
 */
export const updateSupplierQuote = async (quotationId, supplierId, quoteData) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.put(`${API_BASE_URL}/quotations/${quotationId}/supplier/${supplierId}`, quoteData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating supplier quote:", error);
        throw error;
    }
};

/**
 * Delete a quotation
 * @param {string} id - Quotation ID
 * @returns {Promise<Object>} Success message
 */
export const deleteQuotation = async (id) => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.delete(`${API_BASE_URL}/quotations/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting quotation:", error);
        throw error;
    }
};
