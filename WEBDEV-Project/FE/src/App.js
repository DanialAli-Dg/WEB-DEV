// import './App.css';
import { Route, Router, Routes, BrowserRouter } from 'react-router-dom';
import { Switch } from '@mui/material';
import SignIn from "./SignIn";
import Home from "./Home"
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import VerifyOtp from "./VerifyOtp";
import Dashboard from './Dashboard';
import Service from './Service';
import ServiceDetails from './ServiceDetails';
import Createbooking from './Createbooking';



function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="*"  element={<Home />} />  
          <Route path="/Dash"  element={<Dashboard/>} />
          <Route path="/ServiceDetails"  element={<ServiceDetails/>} />
          <Route path="/createbooking"  element={<Createbooking/>} />
          <Route path="/Service"  element={<Service/>} /> 
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>  
  </div>
  );
}

export default App;