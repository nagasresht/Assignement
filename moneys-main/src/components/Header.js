import React from 'react';

const Header = ({ totalSpending, spendingCount, averageDaily }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span>Money Tracker</span>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <div className="stat-value">
              ₹{totalSpending?.toFixed(2) || '0.00'}
            </div>
            <div className="stat-label">Total This Month</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {spendingCount || 0}
            </div>
            <div className="stat-label">Transactions</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              ₹{averageDaily?.toFixed(2) || '0.00'}
            </div>
            <div className="stat-label">Daily Average</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
