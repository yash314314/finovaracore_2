
import './App.css'
import AadhaarStatusChecker from './components/adharStatus'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './components/Test'
import LoginPage from './components/loginpage';
import SignupPage from './components/signup';

function App() {
return <>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AadhaarStatusChecker />} />
      <Route path="/test" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  </BrowserRouter>
</>

}

export default App
