// src/components/SeatSelection.jsx
import React, { useEffect, useState } from 'react';
import './SeatSelection.css';

const rows = ['A', 'B', 'C', 'D'];
const seatsPerRow = 6;

const SeatSelection = ({ flight, userEmail, onBack, onConfirm }) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch already booked seats from backend
  useEffect(() => {
    fetch(`http://localhost:8000/api/bookings/${flight._id}`)
      .then(res => res.json())
      .then(data => setBookedSeats(data))
      .catch(err => console.error('Error fetching booked seats:', err));
  }, [flight]);

  // Handle seat click
  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return; // Can't book already booked seats

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat) // Unselect
        : [...prev, seat]               // Select
    );
  };

  // Confirm booking
  const handleConfirm = async () => {
  if (selectedSeats.length === 0) {
    setMessage('Please select at least one seat.');
    return;
  }

  try {
    const res = await fetch('http://localhost:8000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        flightId: flight._id,
        userEmail,
        seats: selectedSeats
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Booking confirmed!');
      setBookedSeats([...bookedSeats, ...selectedSeats]);
      setSelectedSeats([]);

      // ✅ CALL THE onConfirm prop to pass data back to App.jsx
      if (typeof onConfirm === 'function') {
        onConfirm(data.booking);  // This will trigger <TicketPage /> in App.jsx
      }
    } else {
      setMessage(data.message || 'Booking failed');
    }
  } catch (err) {
    console.error(err);
    setMessage('Server error');
  }
};

  // UI rendering
  return (
    <div className="seat-page">
      <h3>Flight: {flight.origin} → {flight.destination}</h3>
      <div className="seat-grid">
        {rows.map((row) =>
          Array.from({ length: seatsPerRow }, (_, i) => {
            const seatNumber = `${i + 1}${row}`;
            const isBooked = bookedSeats.includes(seatNumber);
            const isSelected = selectedSeats.includes(seatNumber);
            return (
              <div
                key={seatNumber}
                className={`seat ${
                  isBooked ? 'booked' : isSelected ? 'selected' : ''
                }`}
                onClick={() => toggleSeat(seatNumber)}
              >
                {seatNumber}
              </div>
            );
          })
        )}
      </div>

      <div className="actions">
        <button onClick={onBack}>Back</button>
        <button onClick={handleConfirm}>Confirm Booking</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default SeatSelection;