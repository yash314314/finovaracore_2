
import './App.css'
import AadhaarStatusChecker from './components/adharStatus'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './components/Test'
import LoginPage from './components/loginpage';
import SignupPage from './components/signup';
import UserDashboard from './components/userdashboard';
import AdminDashboard from './components/admindashboard';
import ManagerDashboard from './components/retailerdashboard';

function App() {
return <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AadhaarStatusChecker />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/retailer-dashboard" element={<ManagerDashboard />} />
    </Routes>
  </BrowserRouter>
</>

}

export default App
