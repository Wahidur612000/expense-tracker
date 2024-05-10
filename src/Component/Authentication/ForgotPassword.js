import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import './SignUp.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const loginctx=useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyABaG4S_aphDMO1LCWGC_o8rfNrqtaDdgw', {
      method: 'POST',
      body: JSON.stringify({
        requestType:"PASSWORD_RESET",
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      navigate('/login');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
    <div className="container"> 
      <div > 
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <p>Enter the mail which you have registered</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <button type="submit">Send Link</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
