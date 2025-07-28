// src/components/TicketPage.jsx
import React, { useEffect, useState } from 'react';
import './TicketPage.css';

const TicketPage = ({ booking, userEmail, onBack }) => {
  const [allBookings, setAllBookings] = useState([]);

  // Fetch all bookings of user if no single booking passed
  useEffect(() => {
    if (!booking) {
      fetch(`http://localhost:8000/api/bookings/user/${userEmail}`)
        .then(res => res.json())
        .then(data => setAllBookings(data))
        .catch(err => console.error('Error fetching user bookings:', err));
    }
  }, [booking, userEmail]);

  const handleCancel = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/api/bookings/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok) {
        setAllBookings((prev) => prev.filter(b => b._id !== id));
        alert('Booking cancelled successfully');
      } else {
        alert(data.message || 'Cancellation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error while cancelling');
    }
  };

  // Ticket Card UI
  const renderTicket = (ticket, showCancel = false) => (
    <div className="ticket-card" key={ticket._id}>
      <h3>{ticket.flightId.origin} → {ticket.flightId.destination}</h3>
      <p><strong>Date:</strong> {ticket.flightId.date}</p>
      <p><strong>Seats:</strong> {ticket.seats.join(', ')}</p>
      <p><strong>Flight Number:</strong> {ticket.flightId.flightNumber}</p>
      <p><strong>Passenger:</strong> {ticket.userEmail}</p>
      {showCancel && (
        <button className="cancel-btn" onClick={() => handleCancel(ticket._id)}>
           Cancel Booking
        </button>
      )}
    </div>
  );

  return (
    <div className="ticket-page">
      <h2>🎟️ Your Ticket(s)</h2>

      {booking ? (
        renderTicket(booking, false) // single booking after confirm
      ) : (
        <>
          {allBookings.length > 0 ? (
            allBookings.map(ticket => renderTicket(ticket, true))
          ) : (
            <p>No tickets found.</p>
          )}
        </>
      )}

      <button onClick={onBack} className="back-btn">Back to Flights</button>
    </div>
  );
};

export default TicketPage;