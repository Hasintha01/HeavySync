/**
 * useParts - Custom hook for managing part/item data and operations
 * 
 * Provides:
 * - List of all parts with loading/error states
 * - CRUD operations (create, update, delete)
 * - Search/filter functionality
 * - Low stock detection
 * - Auto-refresh after mutations
 * 
 * Example Usage:
 * const { 
 *   parts, 
 *   loading, 
 *   error, 
 *   createPart, 
 *   updatePart, 
 *   deletePart,
 *   lowStockParts,
 *   refreshParts 
 * } = useParts();
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import partService from '../modules/supplier/services/partService';
import toast from 'react-hot-toast';

const useParts = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all parts
  const fetchParts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await partService.getParts();
      setParts(data);
      return data;
    } catch (err) {
      console.error('Error fetching parts:', err);
      setError(err.message || 'Failed to fetch parts');
      toast.error('Failed to load parts');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchParts();
  }, [fetchParts]);

  // Create new part
  const createPart = useCallback(async (partData) => {
    try {
      const newPart = await partService.createPart(partData);
      setParts(prev => [...prev, newPart]);
      toast.success('Part created successfully!');
      return newPart;
    } catch (err) {
      console.error('Error creating part:', err);
      toast.error(err.message || 'Failed to create part');
      throw err;
    }
  }, []);

  // Update existing part
  const updatePart = useCallback(async (id, partData) => {
    try {
      const updatedPart = await partService.updatePart(id, partData);
      setParts(prev =>
        prev.map(p => p._id === id ? updatedPart : p)
      );
      toast.success('Part updated successfully!');
      return updatedPart;
    } catch (err) {
      console.error('Error updating part:', err);
      toast.error(err.message || 'Failed to update part');
      throw err;
    }
  }, []);

  // Delete part
  const deletePart = useCallback(async (id) => {
    try {
      await partService.deletePart(id);
      setParts(prev => prev.filter(p => p._id !== id));
      toast.success('Part deleted successfully!');
      return true;
    } catch (err) {
      console.error('Error deleting part:', err);
      toast.error(err.message || 'Failed to delete part');
      throw err;
    }
  }, []);

  // Get single part by ID
  const getPartById = useCallback(async (id) => {
    try {
      return await partService.getPartById(id);
    } catch (err) {
      console.error('Error fetching part:', err);
      toast.error('Failed to load part details');
      throw err;
    }
  }, []);

  // Search/filter parts
  const searchParts = useCallback((searchTerm) => {
    if (!searchTerm) return parts;

    const searchLower = searchTerm.toLowerCase();
    return parts.filter((part) =>
      part.name?.toLowerCase().includes(searchLower) ||
      part.partId?.toLowerCase().includes(searchLower) ||
      part.partNumber?.toLowerCase().includes(searchLower) ||
      part.description?.toLowerCase().includes(searchLower)
    );
  }, [parts]);

  // Get parts with low stock (quantity <= minimumStock)
  const lowStockParts = useMemo(() => {
    return parts.filter(part => part.quantity <= part.minimumStock);
  }, [parts]);

  return {
    parts,
    loading,
    error,
    createPart,
    updatePart,
    deletePart,
    getPartById,
    searchParts,
    lowStockParts,
    refreshParts: fetchParts,
  };
};

export default useParts;
