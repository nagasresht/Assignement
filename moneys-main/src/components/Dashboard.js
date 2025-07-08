import React from 'react';
import { motion } from 'framer-motion';
import AddSpendingForm from './AddSpendingForm';
import SpendingList from './SpendingList';
import CategoryBreakdown from './CategoryBreakdown';
import Header from './Header';
import useSpendings from '../hooks/useSpendings';
import useSpendingFilters from '../hooks/useSpendingFilters';
import { calculateMonthlyStats } from '../utils/spendingUtils';

const Dashboard = () => {
  const { 
    spendings, 
    loading, 
    error, 
    addSpending, 
    updateSpending, 
    deleteSpending,
    clearError 
  } = useSpendings();

  const {
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredSpendings,
    availableCategories,
    resetFilters
  } = useSpendingFilters(spendings);

  // Calculate statistics
  const stats = calculateMonthlyStats(spendings);

  if (loading) {
    return (
      <div className="App">
        <div className="main-content">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Header 
        totalSpending={stats.totalSpending}
        spendingCount={stats.spendingCount}
        averageDaily={stats.averageDaily}
      />
      
      {error && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          style={{ 
            background: 'rgba(254, 226, 226, 0.1)', 
            color: '#ff6b6b', 
            padding: '1rem', 
            margin: '1rem 0',
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid rgba(255, 107, 107, 0.3)'
          }}
        >
          {error}
          <button 
            onClick={clearError}
            style={{ 
              marginLeft: '1rem',
              background: 'none',
              border: 'none',
              color: '#ff6b6b',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Dismiss
          </button>
        </motion.div>
      )}
      
      <motion.div 
        className="dashboard-grid"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.div 
          className="panel panel-third"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="panel-header">
            <h2 className="panel-title">Add New Spending</h2>
          </div>
          <AddSpendingForm onAddSpending={addSpending} />
        </motion.div>
        
        <motion.div 
          className="panel panel-full"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="panel-header">
            <h2 className="panel-title">Your Spendings</h2>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search spendings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="form-select"
            >
              <option value="all">All Categories</option>
              {availableCategories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <button
              onClick={resetFilters}
              className="btn btn-secondary"
              title="Reset all filters"
            >
              Reset
            </button>
          </div>
          
          {/* Sort Controls */}
          <div className="search-bar">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="category">Sort by Category</option>
              <option value="description">Sort by Description</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="form-select"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          
          <SpendingList
            spendings={filteredSpendings}
            onUpdateSpending={updateSpending}
            onDeleteSpending={deleteSpending}
          />
        </motion.div>
        
        <motion.div 
          className="panel panel-third"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          whileHover={{ scale: 1.02 }}
        >
          <CategoryBreakdown categoryBreakdown={stats.categoryBreakdown} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
