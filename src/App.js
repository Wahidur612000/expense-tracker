import './App.css';
import SignUp from './Component/Authentication/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Route, Routes} from 'react-router-dom';
import Home from './Component/Home';
import About from './Component/About';
import Login from './Component/Authentication/Login';
import WelcomePage from './Component/Authentication/WelcomePage';
import ProfilePage from './Component/Authentication/ProfilePage';
import ForgotPassword from './Component/Authentication/ForgotPassword';

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
        <Route path="/forgotpassword" element={<ForgotPassword />} />        
      </Routes> 
    </div>
  );
}

export default App;
