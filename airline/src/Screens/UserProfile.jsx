// UserProfile.jsx

import React, { useState, useEffect } from 'react';
//import FlightCard from './FlightCard'; // Assume you have a FlightCard component to display flight details
import './UserProfile.css';

const UserProfile = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch('/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if required
      }
    })
      .then(response => response.json())
      .then(data => setFlights(data))
      .catch(error => console.error('Error fetching flights:', error));
  }, []);

  const handleDeleteFlight = async (flightId) => {
    try {
      const response = await fetch(`/profile/${flightId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if required
        }
      });
      if (response.ok) {
        setFlights(prevFlights => prevFlights.filter(flight => flight._id !== flightId));
      } else {
        console.error('Error deleting flight:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  return (
    <div className="user-profile">
      <h2>My Booked Flights</h2>
      <div className="flight-list">
        {flights.map(flight => (
          <FlightCard
            key={flight._id}
            flight={flight}
            onDelete={() => handleDeleteFlight(flight._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
