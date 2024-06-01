import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Nav';
import './AddPassengers.css';

const AddPassengers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, bookingId, bookingData } = location.state || {};
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [passengers, setPassengers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passengerData = { name, age, gender, bookingId };

    try {
      const response = await fetch('http://localhost:8000/passengers/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passengerData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPassengers([...passengers, passengerData]);
      setMessage(data.message);
      setError('');
      setName('');
      setAge('');
      setGender('');
    } catch (error) {
      setError('Error adding passenger: ' + error.message);
      setMessage('');
    }
  };

  const handlePayment = () => {
    navigate('/payment', {
      state: {
        bookingId,
        passengers,
        totalFare,
        flight: {
          flight_no: flight.flight_no,
          airline: flight.airline,
          depart_time: flight.depart_time,
          arrival_time: flight.arrival_time,
          departDate: bookingData.departDate,
          fare: flight[`${bookingData.seat}_fare`]
        }
      }
    });
  };

  const totalFare = passengers.length * flight[`${bookingData.seat}_fare`];

  return (
    <>
      <Navbar />
      <div className="add-passenger">
        <h2>Add Passenger</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <div>
          <h3>Flight Details</h3>
          <p>Flight No: {flight.flight_no}</p>
          <p>Airline: {flight.airline}</p>
          <p>Departure Time: {flight.depart_time}</p>
          <p>Arrival Time: {flight.arrival_time}</p>
          <p>Duration: {flight.duration}</p>
          <p>Fare: {flight[`${bookingData.seat}_fare`]}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit">Add Passenger</button>
        </form>
        <div className="passenger-list">
          <h3>Added Passengers</h3>
          <ul>
            {passengers.map((p, index) => (
              <li key={index}>
                {p.name}, {p.age} years old, {p.gender}
              </li>
            ))}
          </ul>
          <p>Total Passengers: {passengers.length}</p>
          <p>Total Fare: {totalFare}</p>
          {passengers.length > 0 && (
            <button onClick={handlePayment}>Proceed to Payment</button>
          )}
        </div>
      </div>
    </>
  );
};

export default AddPassengers;
