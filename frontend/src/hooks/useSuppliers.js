/**
 * useSuppliers - Custom hook for managing supplier data and operations
 * 
 * Provides:
 * - List of all suppliers with loading/error states
 * - CRUD operations (create, update, delete)
 * - Search/filter functionality
 * - Duplicate detection
 * - Auto-refresh after mutations
 * 
 * Example Usage:
 * const { 
 *   suppliers, 
 *   loading, 
 *   error, 
 *   createSupplier, 
 *   updateSupplier, 
 *   deleteSupplier,
 *   refreshSuppliers 
 * } = useSuppliers();
 */

import { useState, useEffect, useCallback } from 'react';
import supplierService from '../modules/supplier/services/supplierService';
import toast from 'react-hot-toast';

const useSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [duplicateIds, setDuplicateIds] = useState([]);

  // Fetch all suppliers
  const fetchSuppliers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supplierService.getSuppliers();
      setSuppliers(data);

      // Check for duplicate supplier IDs (optimized - single pass)
      const duplicates = data.reduce((acc, supplier) => {
        const id = supplier.supplierId;
        if (acc.seen.has(id)) {
          acc.duplicates.add(id);
        } else {
          acc.seen.add(id);
        }
        return acc;
      }, { seen: new Set(), duplicates: new Set() }).duplicates;

      const duplicateArray = Array.from(duplicates);
      setDuplicateIds(duplicateArray);

      if (duplicateArray.length > 0) {
        console.warn('⚠️ DUPLICATE SUPPLIER IDs FOUND:', duplicateArray);
      }

      return data;
    } catch (err) {
      console.error('Error fetching suppliers:', err);
      setError(err.message || 'Failed to fetch suppliers');
      toast.error('Failed to load suppliers');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  // Create new supplier
  const createSupplier = useCallback(async (supplierData) => {
    try {
      const newSupplier = await supplierService.createSupplier(supplierData);
      setSuppliers(prev => [...prev, newSupplier]);
      toast.success('Supplier created successfully!');
      return newSupplier;
    } catch (err) {
      console.error('Error creating supplier:', err);
      toast.error(err.message || 'Failed to create supplier');
      throw err;
    }
  }, []);

  // Update existing supplier
  const updateSupplier = useCallback(async (id, supplierData) => {
    try {
      const updatedSupplier = await supplierService.updateSupplier(id, supplierData);
      setSuppliers(prev =>
        prev.map(s => s._id === id ? updatedSupplier : s)
      );
      toast.success('Supplier updated successfully!');
      return updatedSupplier;
    } catch (err) {
      console.error('Error updating supplier:', err);
      toast.error(err.message || 'Failed to update supplier');
      throw err;
    }
  }, []);

  // Delete supplier
  const deleteSupplier = useCallback(async (id) => {
    try {
      await supplierService.deleteSupplier(id);
      setSuppliers(prev => prev.filter(s => s._id !== id));
      toast.success('Supplier deleted successfully!');
      return true;
    } catch (err) {
      console.error('Error deleting supplier:', err);
      toast.error(err.message || 'Failed to delete supplier');
      throw err;
    }
  }, []);

  // Get single supplier by ID
  const getSupplierById = useCallback(async (id) => {
    try {
      return await supplierService.getSupplierById(id);
    } catch (err) {
      console.error('Error fetching supplier:', err);
      toast.error('Failed to load supplier details');
      throw err;
    }
  }, []);

  // Search/filter suppliers
  const searchSuppliers = useCallback((searchTerm) => {
    if (!searchTerm) return suppliers;

    const searchLower = searchTerm.toLowerCase();
    return suppliers.filter((supplier) =>
      supplier.name?.toLowerCase().includes(searchLower) ||
      supplier.supplierId?.toLowerCase().includes(searchLower) ||
      supplier.contactEmail?.toLowerCase().includes(searchLower) ||
      supplier.contactPhone?.includes(searchTerm)
    );
  }, [suppliers]);

  return {
    suppliers,
    loading,
    error,
    duplicateIds,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierById,
    searchSuppliers,
    refreshSuppliers: fetchSuppliers,
  };
};

export default useSuppliers;
