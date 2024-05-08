import './App.css';
import SignUp from './Component/Authentication/SignUp';
import Header from './Component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Route, Routes,Navigate } from 'react-router-dom';
import Home from './Component/Home';
import About from './Component/About';
import Login from './Component/Authentication/Login';
import WelcomePage from './Component/Authentication/WelcomePage';
import ProfilePage from './Component/Authentication/ProfilePage';

function App() {
  return (
    <div className="App">
      
      
      <Routes> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/profilepage" element={<ProfilePage />} />        
      </Routes> 
    </div>
  );
}

export default App;
