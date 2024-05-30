// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddFlight from './Screens/Addflight';
import UpdateProduct from './Screens/Update';
import Home from './Screens/Home';
import Profile from './Screens/Profile';
import PrivateComponent from './Screens/Privatecom';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Bookings from './Screens/Bookings';
import FlightSearch from './Screens/Flight';
import Navbar from './Screens/Nav';
import Logout from './Screens/Logout';

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
            <Route path="/flight" element={<FlightSearch />} />
            <Route path="/flight" element={<AddFlight />} />
            <Route path="/flight" element={<UpdateProduct />} />
            <Route path="/flight" element={<PrivateComponent />} />
            
            {/* Define other routes that you need */}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
