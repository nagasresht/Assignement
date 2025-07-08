import React from 'react';
import { getCategoryById } from '../utils/spendingUtils';

const CategoryBreakdown = ({ categoryBreakdown }) => {
  // Convert category breakdown to chart data
  const chartData = Object.entries(categoryBreakdown).map(([categoryId, amount]) => {
    const category = getCategoryById(categoryId);
    return {
      name: category.name,
      value: amount,
      color: category.color,
      id: categoryId
    };
  });

  // Sort by value (highest first)
  chartData.sort((a, b) => b.value - a.value);

  // Calculate total for percentage calculation
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (chartData.length === 0) {
    return (
      <div className="category-breakdown">
        <div className="panel-header">
          <h3 className="panel-title">Category Breakdown</h3>
        </div>
        <div className="empty-state">
          <p>No spending data available for breakdown.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-breakdown">
      <div className="panel-header">
        <h3 className="panel-title">Category Breakdown</h3>
      </div>
      
      <div className="category-list">
        {chartData.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={item.id} className="category-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                <div 
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: item.color,
                    borderRadius: '50%',
                    flexShrink: 0
                  }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{item.name}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="category-amount">${item.value.toFixed(2)}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{percentage}%</div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Simple visual bar chart */}
      <div style={{ marginTop: '1rem' }}>
        <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
          Visual Breakdown
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {chartData.map((item) => {
            const percentage = (item.value / total) * 100;
            return (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ minWidth: '80px', fontSize: '0.75rem', color: '#6b7280' }}>
                  {item.name}
                </div>
                <div style={{ 
                  flex: 1, 
                  height: '20px', 
                  backgroundColor: '#f3f4f6',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div 
                    style={{
                      height: '100%',
                      backgroundColor: item.color,
                      width: `${percentage}%`
                    }}
                  />
                </div>
                <div style={{ minWidth: '50px', fontSize: '0.75rem', textAlign: 'right' }}>
                  {percentage.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBreakdown;
