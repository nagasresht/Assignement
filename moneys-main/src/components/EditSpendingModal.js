import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { CATEGORIES } from '../utils/spendingUtils';

const EditSpendingModal = ({ spending, onUpdateSpending, onClose }) => {
  const [formData, setFormData] = useState({
    description: spending.description,
    amount: spending.amount.toString(),
    category: spending.category,
    date: spending.date
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount && formData.category && formData.date) {
      const success = onUpdateSpending(spending.id, {
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date
      });
      
      if (success) {
        onClose();
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Edit Spending</h2>
          <button onClick={onClose} className="close-button">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-spending-form">
          <div className="form-group">
            <label htmlFor="edit-description" className="form-label">Description</label>
            <input
              type="text"
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What did you spend on?"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-amount" className="form-label">Amount</label>
            <input
              type="number"
              id="edit-amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-category" className="form-label">Category</label>
            <select
              id="edit-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              {CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-date" className="form-label">Date</label>
            <input
              type="date"
              id="edit-date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
              <Save size={20} />
              Save Changes
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSpendingModal;
