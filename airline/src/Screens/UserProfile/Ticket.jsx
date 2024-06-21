import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
//import './Ticket.css'; // Assuming you have a CSS file for Ticket component styling

const Ticket = () => {
    const { bookingId } = useParams();
    const [ticketData, setTicketData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicketData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/tickets/${bookingId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setTicketData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTicketData();
    }, [bookingId]);

    // Function to format date as dd-mm-yyyy
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='ticket'>
            <h2>Ticket Details</h2>
            {ticketData && (
                <div>
                    <p><strong>Booking ID:</strong> {ticketData.bookingId}</p>
                    <p><strong>Total Fare:</strong> {ticketData.totalFare}</p>
                    <p><strong>Payment Type:</strong> {ticketData.paymentType}</p>
                    <p><strong>Flight Number:</strong> {ticketData.flight.flight_no}</p>
                    <p><strong>Airline:</strong> {ticketData.flight.airline}</p>
                    <p><strong>Origin:</strong> {ticketData.flight.origin.city} ({ticketData.flight.origin.code})</p>
                    <p><strong>Departure Time:</strong> {ticketData.flight.depart_time}</p>
                    <p><strong>Arrival Time:</strong> {ticketData.flight.arrival_time}</p>
                    <p><strong>Destination:</strong> {ticketData.flight.destination.city} ({ticketData.flight.destination.code})</p>
                    <p><strong>Booking Date:</strong> {formatDate(ticketData.flight.departDate)}</p>




                    <h3>Passengers</h3>
                    <ul>
                        {ticketData.passengers.map((passenger, index) => (
                            <li key={index}>
                                <p>Name: {passenger.name}</p>
                                <p>Age: {passenger.age}</p>
                                <p>Gender: {passenger.gender}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Ticket;
