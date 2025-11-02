/**
 * usePurchaseOrders - Custom hook for managing purchase order data and operations
 * 
 * Provides:
 * - List of all purchase orders with loading/error states
 * - CRUD operations (create, update, delete)
 * - Filter by status (Pending, Approved, Received, Cancelled)
 * - Search functionality
 * - Auto-refresh after mutations
 * 
 * Example Usage:
 * const { 
 *   purchaseOrders, 
 *   loading, 
 *   error, 
 *   createPurchaseOrder, 
 *   updatePurchaseOrder, 
 *   deletePurchaseOrder,
 *   filterByStatus,
 *   refreshPurchaseOrders 
 * } = usePurchaseOrders();
 */

import { useState, useEffect, useCallback } from 'react';
import purchaseOrderService from '../modules/supplier/services/purchaseOrderService';
import toast from 'react-hot-toast';

const usePurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all purchase orders
  const fetchPurchaseOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await purchaseOrderService.getPurchaseOrders();
      setPurchaseOrders(data);
      return data;
    } catch (err) {
      console.error('Error fetching purchase orders:', err);
      setError(err.message || 'Failed to fetch purchase orders');
      toast.error('Failed to load purchase orders');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchPurchaseOrders();
  }, [fetchPurchaseOrders]);

  // Create new purchase order
  const createPurchaseOrder = useCallback(async (poData) => {
    try {
      const newPO = await purchaseOrderService.createPurchaseOrder(poData);
      setPurchaseOrders(prev => [...prev, newPO]);
      toast.success('Purchase order created successfully!');
      return newPO;
    } catch (err) {
      console.error('Error creating purchase order:', err);
      toast.error(err.message || 'Failed to create purchase order');
      throw err;
    }
  }, []);

  // Update existing purchase order
  const updatePurchaseOrder = useCallback(async (id, poData) => {
    try {
      const updatedPO = await purchaseOrderService.updatePurchaseOrder(id, poData);
      setPurchaseOrders(prev =>
        prev.map(po => po._id === id ? updatedPO : po)
      );
      toast.success('Purchase order updated successfully!');
      return updatedPO;
    } catch (err) {
      console.error('Error updating purchase order:', err);
      toast.error(err.message || 'Failed to update purchase order');
      throw err;
    }
  }, []);

  // Delete purchase order
  const deletePurchaseOrder = useCallback(async (id) => {
    try {
      await purchaseOrderService.deletePurchaseOrder(id);
      setPurchaseOrders(prev => prev.filter(po => po._id !== id));
      toast.success('Purchase order deleted successfully!');
      return true;
    } catch (err) {
      console.error('Error deleting purchase order:', err);
      toast.error(err.message || 'Failed to delete purchase order');
      throw err;
    }
  }, []);

  // Get single purchase order by ID
  const getPurchaseOrderById = useCallback(async (id) => {
    try {
      return await purchaseOrderService.getPurchaseOrderById(id);
    } catch (err) {
      console.error('Error fetching purchase order:', err);
      toast.error('Failed to load purchase order details');
      throw err;
    }
  }, []);

  // Filter by status
  const filterByStatus = useCallback((status) => {
    if (!status) return purchaseOrders;
    return purchaseOrders.filter(po => po.status === status);
  }, [purchaseOrders]);

  // Search purchase orders
  const searchPurchaseOrders = useCallback((searchTerm) => {
    if (!searchTerm) return purchaseOrders;

    const searchLower = searchTerm.toLowerCase();
    return purchaseOrders.filter((po) =>
      po.poNumber?.toLowerCase().includes(searchLower) ||
      po.supplier?.name?.toLowerCase().includes(searchLower) ||
      po.status?.toLowerCase().includes(searchLower)
    );
  }, [purchaseOrders]);

  // Get statistics
  const getStats = useCallback(() => {
    return {
      total: purchaseOrders.length,
      pending: purchaseOrders.filter(po => po.status === 'Pending').length,
      approved: purchaseOrders.filter(po => po.status === 'Approved').length,
      received: purchaseOrders.filter(po => po.status === 'Received').length,
      cancelled: purchaseOrders.filter(po => po.status === 'Cancelled').length,
    };
  }, [purchaseOrders]);

  return {
    purchaseOrders,
    loading,
    error,
    createPurchaseOrder,
    updatePurchaseOrder,
    deletePurchaseOrder,
    getPurchaseOrderById,
    filterByStatus,
    searchPurchaseOrders,
    stats: getStats(),
    refreshPurchaseOrders: fetchPurchaseOrders,
  };
};

export default usePurchaseOrders;
