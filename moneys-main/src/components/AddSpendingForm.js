import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { CATEGORIES } from '../utils/spendingUtils';

const AddSpendingForm = ({ onAddSpending }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'food',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.description && formData.amount && formData.category && formData.date) {
      const success = onAddSpending({
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date
      });
      
      // Reset form only if successfully added
      if (success) {
        setFormData({
          description: '',
          amount: '',
          category: 'food',
          date: format(new Date(), 'yyyy-MM-dd')
        });
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

  return (
    <form 
      onSubmit={handleSubmit} 
      className="add-spending-form"
    >
      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What did you spend on?"
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="number"
          id="amount"
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
        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
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
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <button 
        type="submit" 
        className="btn btn-primary"
      >
        <Plus size={20} />
        Add Spending
      </button>
    </form>
  );
};

export default AddSpendingForm;
