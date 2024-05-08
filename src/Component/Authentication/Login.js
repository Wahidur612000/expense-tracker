import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABaG4S_aphDMO1LCWGC_o8rfNrqtaDdgw', {
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
      navigate('/welcome');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
    <div className="container"> 
      <div > 
        <h1>Login</h1>
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
          <button type="submit">Login</button>
        </form>
        <div>
          <a href="/signup">Don't have an account? Sign Up</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
