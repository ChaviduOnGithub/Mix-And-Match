import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages and components
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile'; 
import PrivateRoute from './components/accounts-management/PrivateRoute';

import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />              
              <Route element={<PrivateRoute />} >
              <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="/adminLogin" element={<AdminLogin />} />
              <Route path="/adminSignup" element={<AdminSignup />} />
              <Route path="/adminDashboard" element={<AdminDashboard />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  
   );
}

export default App;
