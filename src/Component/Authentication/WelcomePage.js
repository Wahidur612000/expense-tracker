import React from "react";
import { useNavigate } from "react-router-dom";
import "./welcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleCompleteProfile = (event) => {
    event.preventDefault();
    navigate("/profilepage");
  };

  return (
    <div >
      <div className="welcome-page" >
        <div className="welcome-header">
          <div className="welcome-title">Welcome to Expense Tracker</div>
          <div className="profile-incomplete">
            Your Profile is Incomplete.
            <button className="complete-button" onClick={handleCompleteProfile}>
              Complete now
            </button>
          </div>
        </div>
      </div>
      <div className="red-line"></div>
    </div>
  );
};

export default WelcomePage;
