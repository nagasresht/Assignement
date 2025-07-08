import { useState, useEffect } from 'react';
import { 
  loadSpendingsFromStorage, 
  saveSpendingsToStorage, 
  generateSpendingId,
  validateSpending 
} from '../utils/spendingUtils';

export const useSpendings = () => {
  const [spendings, setSpendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load spendings from localStorage on mount
  useEffect(() => {
    try {
      const savedSpendings = loadSpendingsFromStorage();
      setSpendings(savedSpendings);
    } catch (err) {
      setError('Failed to load spendings');
      console.error('Error loading spendings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save spendings to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      saveSpendingsToStorage(spendings);
    }
  }, [spendings, loading]);

  // Add new spending
  const addSpending = (spendingData) => {
    const validation = validateSpending(spendingData);
    
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      return false;
    }

    const newSpending = {
      id: generateSpendingId(),
      ...spendingData,
      amount: parseFloat(spendingData.amount),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSpendings(prev => [...prev, newSpending]);
    setError(null);
    return true;
  };

  // Update existing spending
  const updateSpending = (id, updateData) => {
    const validation = validateSpending(updateData);
    
    if (!validation.isValid) {
      setError(validation.errors.join(', '));
      return false;
    }

    setSpendings(prev =>
      prev.map(spending =>
        spending.id === id
          ? { 
              ...spending, 
              ...updateData, 
              amount: parseFloat(updateData.amount),
              updatedAt: new Date().toISOString() 
            }
          : spending
      )
    );
    setError(null);
    return true;
  };

  // Delete spending
  const deleteSpending = (id) => {
    setSpendings(prev => prev.filter(spending => spending.id !== id));
    setError(null);
  };

  // Delete multiple spendings
  const deleteMultipleSpendings = (ids) => {
    setSpendings(prev => prev.filter(spending => !ids.includes(spending.id)));
    setError(null);
  };

  // Clear all spendings
  const clearAllSpendings = () => {
    setSpendings([]);
    setError(null);
  };

  // Get spending by ID
  const getSpendingById = (id) => {
    return spendings.find(spending => spending.id === id);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return {
    spendings,
    loading,
    error,
    addSpending,
    updateSpending,
    deleteSpending,
    deleteMultipleSpendings,
    clearAllSpendings,
    getSpendingById,
    clearError
  };
};

export default useSpendings;
