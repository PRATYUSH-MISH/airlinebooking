import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './PrintTicket.css';
import axios from 'axios';

const PrintTicket = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingId, passengers = [], totalFare, paymentType, flight = {}, origin, destination } = location.state || {};

    const {
        flight_no = 'N/A',
        airline = 'N/A',
        depart_time = 'N/A',
        arrival_time = 'N/A',
        departDate = 'N/A',
       
    } = flight;

    // Function to format date as dd-mm-yyyy
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
    }; 
    // Extract origin and destination details
    const originCity = origin ? origin.city : 'N/A';
    const originCode = origin ? origin.code : 'N/A';
    const destinationCity = destination ? destination.city : 'N/A';
    const destinationCode = destination ? destination.code : 'N/A';

    const handleDownloadPDF = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('User not authenticated');
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }

        const doc = new jsPDF();
        doc.text('Booking Details', 10, 10);
        doc.autoTable({
            startY: 20,
            head: [['Detail', 'Value']],
            body: [
                ['Booking ID', bookingId],
                ['Total Passengers', passengers.length],
                ['Total Fare', totalFare],
                ['Payment Method', paymentType],
                ['Flight No', flight_no],
                ['Airline', airline],
                ['Origin', `${originCity} (${originCode})`],
                ['Destination', `${destinationCity} (${destinationCode})`],
                ['Departure Time', depart_time],
                ['Arrival Time', arrival_time],
                ['Flight Date', departDate], // Display departDate
            ],
        });

        const tableColumn = ['Name', 'Age', 'Gender'];
        const tableRows = passengers.map(passenger => [
            passenger.name,
            passenger.age,
            passenger.gender,
        ]);

        doc.text('Passenger Details', 10, doc.autoTable.previous.finalY + 20);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: doc.autoTable.previous.finalY + 30,
        });

        doc.save(`Ticket_${bookingId}.pdf`);

        try {
            // Send POST request to backend with departDate included
            await axios.post('http://localhost:8000/api/tickets', {
                bookingId,
                passengers,
                totalFare,
                paymentType,
                flight: {
                    ...flight,
                    origin: { city: originCity, code: originCode },
                    destination: { city: destinationCity, code: destinationCode },
                    departDate: departDate, // Include departDate
                }
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Ticket data sent to backend successfully');
        } catch (error) {
            console.error('Error sending ticket data to backend:', error);
        }
    };

    return (
        <div className="print-ticket">
            <h2>Your Ticket</h2>

            <h3>Booking Details</h3>
            <table className="details-table">
                <tbody>
                    <tr>
                        <td><strong>Booking ID</strong></td>
                        <td>{bookingId}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Passengers</strong></td>
                        <td>{passengers.length}</td>
                    </tr>
                    <tr>
                        <td><strong>Total Fare</strong></td>
                        <td>{totalFare}</td>
                    </tr>
                    <tr>
                        <td><strong>Payment Method</strong></td>
                        <td>{paymentType}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Flight Details</h3>
            <table className="details-table">
                <tbody>
                    <tr>
                        <td><strong>Flight No</strong></td>
                        <td>{flight_no}</td>
                    </tr>
                    <tr>
                        <td><strong>Airline</strong></td>
                        <td>{airline}</td>
                    </tr>
                    <tr>
                        <td><strong>Origin</strong></td>
                        <td>{`${originCity} (${originCode})`}</td>
                    </tr>
                    <tr>
                        <td><strong>Destination</strong></td>
                        <td>{`${destinationCity} (${destinationCode})`}</td>
                    </tr>
                    <tr>
                        <td><strong>Departure Time</strong></td>
                        <td>{depart_time}</td>
                    </tr>
                    <tr>
                        <td><strong>Arrival Time</strong></td>
                        <td>{arrival_time}</td>
                    </tr>
                    <tr>
                        <td><strong>Flight Date</strong></td>
                        <td>{formatDate(departDate)}</td>
                    </tr>
                </tbody>
            </table>

            <h3>Passenger Details</h3>
            <table className="passenger-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers.map((passenger, index) => (
                        <tr key={index}>
                            <td>{passenger.name}</td>
                            <td>{passenger.age}</td>
                            <td>{passenger.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={handleDownloadPDF}>Download Ticket as PDF</button>
        </div>
    );
};

export default PrintTicket;

