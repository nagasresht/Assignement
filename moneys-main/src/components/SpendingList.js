import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { 
  Edit2, 
  Trash2, 
  ShoppingBag, 
  Car, 
  Film, 
  Zap, 
  Heart, 
  Book, 
  Plane, 
  MoreHorizontal
} from 'lucide-react';
import EditSpendingModal from './EditSpendingModal';
import { getCategoryById } from '../utils/spendingUtils';

const SpendingList = ({ spendings, onUpdateSpending, onDeleteSpending }) => {
  const [editingSpending, setEditingSpending] = useState(null);

  // Group spendings by date
  const groupedSpendings = spendings.reduce((groups, spending) => {
    const date = format(parseISO(spending.date), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(spending);
    return groups;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedSpendings).sort((a, b) => new Date(b) - new Date(a));

  // Get category icon
  const getCategoryIcon = (category) => {
    const iconProps = { size: 16, className: 'category-icon' };
    
    switch (category) {
      case 'food':
        return null; // No icon for food
      case 'transportation':
        return <Car {...iconProps} />;
      case 'entertainment':
        return <Film {...iconProps} />;
      case 'shopping':
        return <ShoppingBag {...iconProps} />;
      case 'utilities':
        return <Zap {...iconProps} />;
      case 'health':
        return <Heart {...iconProps} />;
      case 'education':
        return <Book {...iconProps} />;
      case 'travel':
        return <Plane {...iconProps} />;
      default:
        return <MoreHorizontal {...iconProps} />;
    }
  };

  const handleEdit = (spending) => {
    setEditingSpending(spending);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this spending?')) {
      onDeleteSpending(id);
    }
  };

  const handleUpdateSpending = (id, updatedData) => {
    const success = onUpdateSpending(id, updatedData);
    if (success) {
      setEditingSpending(null);
    }
  };

  if (spendings.length === 0) {
    return (
      <div className="empty-state">
        <p>No spendings found.</p>
        <p>Add your first spending to get started!</p>
      </div>
    );
  }

  return (
    <div className="spending-list">
      {sortedDates.map(date => (
        <div key={date} className="spending-group">
          <h3 className="spending-date">
            {format(parseISO(date), 'EEEE, MMMM d, yyyy')}
          </h3>
          {groupedSpendings[date].map(spending => {
            const category = getCategoryById(spending.category);
            return (
              <div key={spending.id} className="spending-item">
                <div className="spending-info">
                  <div className="spending-description">
                    {spending.description} <span style={{ color: '#f87171', fontWeight: 500, marginLeft: 8 }}>₹{spending.amount.toFixed(2)}</span>
                  </div>
                  <div className="spending-category">
                    {getCategoryIcon(spending.category)}
                    {category.name}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="spending-actions">
                    <button
                      onClick={() => handleEdit(spending)}
                      className="btn btn-secondary btn-small"
                      title="Edit spending"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(spending.id)}
                      className="btn btn-danger btn-small"
                      title="Delete spending"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      
      {editingSpending && (
        <EditSpendingModal
          spending={editingSpending}
          onUpdateSpending={handleUpdateSpending}
          onClose={() => setEditingSpending(null)}
        />
      )}
    </div>
  );
};

export default SpendingList;
