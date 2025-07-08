// Local storage utilities for Money Tracker

const STORAGE_KEY = 'moneyTracker_spendings';

export const loadSpendingsFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading spendings from localStorage:', error);
    return [];
  }
};

export const saveSpendingsToStorage = (spendings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(spendings));
  } catch (error) {
    console.error('Error saving spendings to localStorage:', error);
  }
};

export const clearSpendingsFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing spendings from localStorage:', error);
  }
};

// Generate unique ID for new spendings
export const generateSpendingId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// Category configuration
export const CATEGORIES = [
  { id: 'food', name: 'Food & Dining', color: '#f59e0b' },
  { id: 'transportation', name: 'Transportation', color: '#3b82f6' },
  { id: 'entertainment', name: 'Entertainment', color: '#8b5cf6' },
  { id: 'shopping', name: 'Shopping', color: '#ec4899' },
  { id: 'utilities', name: 'Utilities', color: '#10b981' },
  { id: 'health', name: 'Health & Fitness', color: '#ef4444' },
  { id: 'education', name: 'Education', color: '#f97316' },
  { id: 'travel', name: 'Travel', color: '#06b6d4' },
  { id: 'other', name: 'Other', color: '#6b7280' }
];

export const getCategoryById = (id) => {
  return CATEGORIES.find(cat => cat.id === id) || CATEGORIES[CATEGORIES.length - 1];
};

// Date utilities
export const getCurrentMonth = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    monthName: now.toLocaleString('en-US', { month: 'long' })
  };
};

export const isCurrentMonth = (dateString) => {
  const date = new Date(dateString);
  const current = getCurrentMonth();
  return date.getFullYear() === current.year && date.getMonth() === current.month;
};

// Statistics utilities
export const calculateMonthlyStats = (spendings) => {
  const currentMonthSpendings = spendings.filter(s => isCurrentMonth(s.date));
  const totalSpending = currentMonthSpendings.reduce((sum, s) => sum + s.amount, 0);
  const spendingCount = currentMonthSpendings.length;
  const averageDaily = totalSpending / new Date().getDate();
  
  // Category breakdown
  const categoryBreakdown = currentMonthSpendings.reduce((acc, spending) => {
    acc[spending.category] = (acc[spending.category] || 0) + spending.amount;
    return acc;
  }, {});
  
  return {
    totalSpending,
    spendingCount,
    averageDaily,
    categoryBreakdown
  };
};

// Validation utilities
export const validateSpending = (spending) => {
  const errors = [];
  
  if (!spending.description || spending.description.trim().length === 0) {
    errors.push('Description is required');
  }
  
  if (!spending.amount || spending.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }
  
  if (!spending.category) {
    errors.push('Category is required');
  }
  
  if (!spending.date) {
    errors.push('Date is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Search and filter utilities
export const searchSpendings = (spendings, searchTerm) => {
  if (!searchTerm) return spendings;
  
  const term = searchTerm.toLowerCase();
  return spendings.filter(spending =>
    spending.description.toLowerCase().includes(term) ||
    spending.category.toLowerCase().includes(term)
  );
};

export const filterSpendingsByCategory = (spendings, category) => {
  if (!category || category === 'all') return spendings;
  return spendings.filter(spending => spending.category === category);
};

export const sortSpendings = (spendings, sortBy, sortOrder) => {
  return [...spendings].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'date':
        aValue = new Date(a.date);
        bValue = new Date(b.date);
        break;
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'category':
        aValue = a.category;
        bValue = b.category;
        break;
      case 'description':
        aValue = a.description.toLowerCase();
        bValue = b.description.toLowerCase();
        break;
      default:
        aValue = new Date(a.date);
        bValue = new Date(b.date);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};
