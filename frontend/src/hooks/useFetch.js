/**
 * useFetch - Generic hook for fetching data with loading and error states
 * 
 * @param {Function} fetchFunction - The API call function to execute
 * @param {Array} dependencies - Array of dependencies that trigger refetch (default: [])
 * @returns {Object} { data, loading, error, refetch }
 * 
 * Example Usage:
 * const { data, loading, error, refetch } = useFetch(supplierService.getSuppliers);
 */

import { useState, useEffect, useCallback } from 'react';

const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
      return result;
    } catch (err) {
      console.error('useFetch error:', err);
      setError(err.message || 'An error occurred while fetching data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, ...dependencies]);

  // Manual refetch function
  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useFetch;
