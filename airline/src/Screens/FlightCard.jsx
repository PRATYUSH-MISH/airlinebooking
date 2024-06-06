import React from 'react';

const FlightCard = ({ flight, onDelete }) => (
    <div className="flight-card">
        <p><strong>Flight No:</strong> {flight.flight_no}</p>
        <p><strong>Airline:</strong> {flight.airline}</p>
        <p><strong>Departure:</strong> {flight.depart_time}</p>
        <p><strong>Arrival:</strong> {flight.arrival_time}</p>
        <p><strong>Fare:</strong> {flight.fare}</p>
        <button onClick={onDelete}>Delete</button>
    </div>
);

export default FlightCard;
