// WelcomePage.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./welcomePage.css";
import ExpenseTracker from "../ExpenseTracker";
import { logout } from "../Reducer/authSlice";
import { toggleTheme } from "../Reducer/themeReducer";
import ToggleButton from "../ToggleButton";

const WelcomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const theme = useSelector((state) => state.theme.mode); // Get the theme mode from Redux store

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleCompleteProfile = (event) => {
    event.preventDefault();
    navigate("/profilepage");
  };

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=YOUR_API_KEY', {
      method: "POST",
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        navigate('/welcome');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // Dispatch toggleTheme action
  };

  return (
    <div>
      <div className={`welcome-page ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}>
        <div className="welcome-header">
          <div className="welcome-title">Welcome to Expense Tracker</div>
          <div className={`profile-incomplete ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light"}`}>
            <button className="complete-button1" onClick={handleVerifyEmail}>
              Verify Email
            </button>
            <button className="complete-button1" onClick={handleLogout}>
              Logout
            </button>
            <div >Your Profile is Incomplete.</div>
            <button className="complete-button" onClick={handleCompleteProfile}>
              Complete now
            </button>    
            <div>
            <ToggleButton isLightMode={theme === "light"} toggleTheme={handleToggleTheme} />
            </div>
          </div>
        </div>
      </div>
      <div className="red-line"></div>
      {isLoggedIn && <ExpenseTracker />}
    </div>
  );
};

export default WelcomePage;
