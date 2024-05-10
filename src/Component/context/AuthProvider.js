import React, { useState, useEffect } from 'react';

// Create the AuthContext using React.createContext
export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const userIsLoggedIn = !!token;
  console.log('authprovider',userIsLoggedIn)

  // Create the value object for the context
  const authContextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    // Provide the AuthContext with the authContextValue
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
