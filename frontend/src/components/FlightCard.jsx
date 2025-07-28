import React from 'react';
import './FlightCard.css';

const FlightCard = ({ flight, onBook }) => {
  return (
    <div className="flight-card">
      <h3>{flight.flightNumber}</h3>
      <p><strong>From:</strong> {flight.origin}</p>
      <p><strong>To:</strong> {flight.destination}</p>
      <p><strong>Date:</strong> {flight.date}</p>
      <p><strong>Time:</strong> {flight.time}</p>
      <p><strong>Price:</strong> ₹{flight.price}</p>
      <button onClick={() => onBook(flight)}>Book Now</button>
    </div>
  );
};

export default FlightCard;