import React from "react";
import { useNavigate } from "react-router-dom";
import "./welcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleCompleteProfile = (event) => {
    event.preventDefault();
    navigate("/profilepage");
  };
  const handleVeryfyEmail=(e)=>{
    e.preventDefault();
    const token=localStorage.getItem('token');
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyABaG4S_aphDMO1LCWGC_o8rfNrqtaDdgw',
    {
        method: "POST",
        body: JSON.stringify({
            requestType:"VERIFY_EMAIL",
            idToken:token,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }
    )
    .then(response => response.json())
    .then(data => {
        navigate('/welcome');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

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
            <button className="complete-button1" onClick={handleVeryfyEmail}>
                Verify Email
            </button>
          </div>
        </div>
      </div>
      <div className="red-line"></div>
    </div>
  );
};

export default WelcomePage;
