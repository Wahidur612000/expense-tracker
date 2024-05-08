import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './welcomePage.css'; 

const WelcomePage = () => {
  const navigate = useNavigate(); 
  const handleCompleteProfile = () => {
    navigate('/profilepage'); 
  };

  return (
    <div className="welcome-page">
      <div className="welcome-header">
        <div className="welcome-title">Welcome to Expense Tracker</div>
        <div className="profile-incomplete">Your Profile is Incomplete.</div>
        <button className="complete-button" onClick={handleCompleteProfile}>
          Complete now
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
