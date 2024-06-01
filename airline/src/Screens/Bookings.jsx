import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Nav';
import './Bookings.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:8000/book/bookings');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched bookings data:', data);
                setBookings(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleBookingClick = (booking) => {
        navigate('/flight', { state: {bookingData: booking } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching bookings: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="bookings">
                <h1>My Bookings</h1>
                {bookings.length === 0 ? (
                    <p>No bookings available</p>
                ) : (
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Trip Type</th>
                                <th>Origin</th>
                                <th>Destination</th>
                                <th>Departure Date</th>
                                <th>Return Date</th>
                                <th>Seat</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={index}>
                                    <td>{booking.tripType === '1' ? 'One-way' : 'Round Trip'}</td>
                                    <td>{booking.originAirport.city} ({booking.originAirport.code})</td>
                                    <td>{booking.destinationAirport.city} ({booking.destinationAirport.code})</td>
                                    <td>{booking.departDate}</td>
                                    <td>{booking.returnDate || 'N/A'}</td>
                                    <td>{booking.seat}</td>
                                    <td>
                                        <button onClick={() => handleBookingClick(booking)}>View Flight</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Bookings;
