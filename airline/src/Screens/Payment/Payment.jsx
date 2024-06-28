import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import processgif from '../img/process.gif';
import './Payment.css';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingId, passengers, totalFare, flight, origin, destination } = location.state || {};
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePayment = (paymentType) => {
        setSelectedPayment(paymentType);
        setIsProcessing(true);

        // Simulate a delay for processing
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/printticket', {
                state: {
                    bookingId,
                    passengers,
                    totalFare,
                    paymentType,
                    flight,
                    origin,        // Include origin data
                    destination    // Include destination data
                }
            });
        },4000);
    };

    return (
        <div className="payment-container">
            {isProcessing ? (
                <div className="processing-container">
                    <img src={processgif} alt="Processing" className="processing-gif" />
                    <p>Processing your {selectedPayment} payment...</p>
                </div>
            ) : (
                <>
                    <h2>Choose Payment Method</h2>
                    <p>Booking ID: {bookingId}</p>
                    <p>Total Fare: {totalFare}</p>
                    <p>Origin: {origin.city} ({origin.code})</p> {/* Display origin details */}
                    <p>Destination: {destination.city} ({destination.code})</p> {/* Display destination details */}
                    <div className="payment-options">
                        <button onClick={() => handlePayment('UPI')}>UPI</button>
                        <button onClick={() => handlePayment('Net Banking')}>Net Banking</button>
                        <button onClick={() => handlePayment('Debit Card')}>Debit Card</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Payment;
