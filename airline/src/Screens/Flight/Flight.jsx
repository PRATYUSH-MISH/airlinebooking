

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './FlightSearch.css';
import { useLocation } from 'react-router-dom';

const FlightSearch = () => {
    const location = useLocation();
    const { bookingData } = location.state || {};
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFlights = async () => {
            if (!bookingData) {
                setError('Booking data is missing.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/flight/check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        originAirport: bookingData.originAirport,
                        destinationAirport: bookingData.destinationAirport,
                        departDate: bookingData.departDate,
                        seat: bookingData.seat,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched available flights data:', data);
                if (Array.isArray(data)) {
                    setFlights(data);
                } else {
                    throw new Error('Flights data is not an array');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFlights();
    }, [bookingData]);

    const generateBookingId = () => {
        const timestamp = Date.now();
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
        return `BOOK-${timestamp}-${randomNum}`;
    };

    const handleSelectFlight = (flight) => {
        const bookingId = generateBookingId();
        navigate('/addpassenger', { state: { flight, bookingId, bookingData } });
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching flights: {error}</div>;
    }

    return (
        <>
            
            <div className="flight-search">
                <div className="flight-info">
                    <h2>Flight Search Results</h2>
                    <p><strong>Origin:</strong> {bookingData.originAirport.city} ({bookingData.originAirport.code}) </p>
                    <p><strong>Destination:</strong> {bookingData.destinationAirport.city} ({bookingData.destinationAirport.code})</p>
                    <p><strong>Departure Date:</strong> {bookingData.departDate}</p>
                    <p><strong>Seat Type:</strong> {bookingData.seat}</p>
                </div>
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
                                        
                                    <th>Action</th>
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

                                        
                                        <td>
                                            <button onClick={() => handleSelectFlight(flight)}>
                                                Select
                                            </button>
                                        </td>
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
