import React from 'react';
import './ExpenseTracker.css'; // Ensure this imports your CSS

const ToggleButton = ({ isLightMode, toggleTheme }) => {
  return (
    <div
      className={`toggle-button ${isLightMode ? 'light' : 'dark'}`}
      onClick={toggleTheme}
    >
      <div className="toggle-circle"></div>
      <div className="icon sun">🌞</div>
      <div className="icon moon">🌜</div>
    </div>
  );
};

export default ToggleButton;
