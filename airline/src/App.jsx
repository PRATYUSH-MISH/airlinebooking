// src/App.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
//import AddFlight from './Screens/Addflight';
import UpdateProduct from './Screens/Update';
import Home from "./Screens/Home";
import Profile from "./Screens/UserProfile"
import PrivateComponent from './Screens/Privatecom';
import Login from "./Screens/Login";
import Signup from './Screens/Signup';
import Bookings from './Screens/Bookings';
import FlightSearch from './Screens/Flight';
import Navbar from './Screens/Nav';
import Payment from './Screens/Payment';
import AddPassengers from './Screens/AddPassengeer';
import PrintTicket from './Screens/PrintTicket';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logout from './Screens/Logout'


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path='/flight' element={<FlightSearch/>}/>
            <Route path='/addpassenger'element={<AddPassengers/>}/>
<Route path='/payment' element={<Payment/>}/>

            <Route path='/printticket' element={<PrintTicket />} />

            {/* Define other routes that you need*/}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
