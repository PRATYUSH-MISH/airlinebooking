// // src/App.tsx
import React ,{useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from "./Screens/Home";
import Profile from "./Screens/UserProfile/UserProfile"
import Login from "./Screens/Auth/Login";
import Signup from './Screens/Auth/Signup';
import Bookings from './Screens/Booking/Bookings';
import FlightSearch from './Screens/Flight/Flight';
import Navbar from './Screens/Nav/Nav';
import Payment from './Screens/Payment/Payment';
import AddPassengers from './Screens/AddPassengers/AddPassengeer';
import Ticket from './Screens/UserProfile/Ticket'
//import ProtectedRoute from './Screens/ProtectedRoute';
import PrintTicket from './Screens/PrintTicket/PrintTicket';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Logout from './Screens/Logout'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            
            <Route path="/signup" element={<Signup />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path='/flight' element={<FlightSearch/>}/>
            <Route path='/addpassenger'element={<AddPassengers/>}/>
            <Route path='/payment' element={<Payment/>}/>
            
            <Route path='/printticket' element={<PrintTicket />} />
            <Route path='/tickets/:bookingId' element={<Ticket />} />

            {/* Define other routes that you need*/}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

