import React, { useState, useEffect } from 'react';
import Navbar from './Nav';
import './FlightSearch.css';

const FlightSearch = ({ bookingData }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [flights, setFlights] = useState([]);

  
    useEffect(() => {
    const fetchFlights =async () => {
        try {
            const response = await fetch('http://localhost:8000/flight/check');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched availabe data:', data);
            setFlights(data); // Corrected from setBookings(data)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchFlights();
}, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching bookings: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="flight-search">
                <div className="flight-results">
                    <h2>Available Flights</h2>
                    {error && <p>{error}</p>}
                    {flights.length === 0 && !error ? (
                        <p>No flights available</p>
                    ) : (
                        <table className="flights-table">
                            <thead>
                                <tr>
                                    <th>Flight No</th>
                                    <th>Airline</th>
                                    <th>Departure Time</th>
                                    <th>Arrival Time</th>
                                    <th>Duration</th>
                                    <th>Fare</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map((flight, index) => (
                                    <tr key={index}>
                                        <td>{flight.flight_no}</td>
                                        <td>{flight.airline}</td>
                                        <td>{flight.depart_time}</td>
                                        <td>{flight.arrival_time}</td>
                                        <td>{flight.duration}</td>
                                        <td>{flight[`${bookingData.seat}_fare`]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default FlightSearch;
