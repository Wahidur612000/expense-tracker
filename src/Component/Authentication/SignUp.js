import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import './SignUp.css'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABaG4S_aphDMO1LCWGC_o8rfNrqtaDdgw', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      navigate('/home');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <Header />
    <div className="container"> 
      <div > 
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Sign Up</button>
        </form>
        <div>
          <a href="/login">Have an account? Login</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
