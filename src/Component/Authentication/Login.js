import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import './SignUp.css'; 
import { useDispatch } from 'react-redux';
import { login } from '../Reducer/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginctx=useContext(AuthContext)

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
      //loginctx.loginHandler(data.idToken);
      localStorage.setItem("token", data.idToken);
      console.log('inlogin',data)
      dispatch(login());
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
          <div>
            <a href="/forgotpassword" style={{color: 'red'}}>Forgot Password?</a>
          </div>
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
