import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=YOUR_API_KEY', {
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
      navigate('/Store');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <grid className="Grid">
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
          <button type="submit">Sign Up</button>
        </form>
        <div>
          <a href="#">Have an account? Login</a>
        </div>
      </div>
    </div>
    </grid>
  );
};

export default SignUp;
