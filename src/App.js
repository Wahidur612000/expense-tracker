import './App.css';
import SignUp from './Component/Authentication/SignUp';
import Header from './Component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Route, Routes,Navigate } from 'react-router-dom';
import Home from './Component/Home';
import About from './Component/About';
import Login from './Component/Authentication/Login';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <SignUp />
      <Routes> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes> 
    </div>
  );
}

export default App;
