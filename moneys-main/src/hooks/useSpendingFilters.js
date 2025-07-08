import { useState, useMemo } from 'react';
import { 
  searchSpendings, 
  filterSpendingsByCategory, 
  sortSpendings,
  isCurrentMonth
} from '../utils/spendingUtils';

export const useSpendingFilters = (spendings) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState('current-month');

  // Get filtered spendings
  const filteredSpendings = useMemo(() => {
    let filtered = spendings;

    // Apply date range filter
    if (dateRange === 'current-month') {
      filtered = filtered.filter(s => isCurrentMonth(s.date));
    }

    // Apply search filter
    filtered = searchSpendings(filtered, searchTerm);

    // Apply category filter
    filtered = filterSpendingsByCategory(filtered, filterCategory);

    // Apply sorting
    filtered = sortSpendings(filtered, sortBy, sortOrder);

    return filtered;
  }, [spendings, searchTerm, filterCategory, sortBy, sortOrder, dateRange]);

  // Get unique categories from spendings
  const availableCategories = useMemo(() => {
    const categories = [...new Set(spendings.map(s => s.category))];
    return categories.sort();
  }, [spendings]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterCategory('all');
    setSortBy('date');
    setSortOrder('desc');
    setDateRange('current-month');
  };

  return {
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    dateRange,
    setDateRange,
    filteredSpendings,
    availableCategories,
    resetFilters
  };
};

export default useSpendingFilters;
