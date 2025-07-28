import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import FlightCard from './components/FlightCard';
import FlightSearchBar from './components/FlightSearchBar';
import SeatSelection from './components/SeatSelection';
import TicketPage from './components/TicketPage'; // ✅ Ticket page
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState({ origin: '', destination: '', date: '' });
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [showAllTickets, setShowAllTickets] = useState(false); // ✅ NEW

  // 🔁 Fetch all flights once user is logged in
  useEffect(() => {
    if (user) {
      fetch('http://localhost:8000/api/flights')
        .then(res => res.json())
        .then(data => {
          setFlights(data);
          setFilteredFlights(data);
        })
        .catch(err => console.error('Error fetching flights:', err));
    }
  }, [user]);

  // 🔍 Apply filters on flights list
  useEffect(() => {
    const filtered = flights.filter(flight =>
      flight.origin.toLowerCase().includes(search.origin.toLowerCase()) &&
      flight.destination.toLowerCase().includes(search.destination.toLowerCase()) &&
      (search.date === '' || flight.date === search.date)
    );
    setFilteredFlights(filtered);
  }, [search, flights]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch(prev => ({ ...prev, [name]: value }));
  };

  const handleBackToFlights = () => {
    setBookingData(null);
    setShowAllTickets(false); // ✅ return from ticket list too
  };

  if (!user) return <LoginPage onLogin={setUser} />;

  return (
    <div className="app-wrapper">
      <h2 className="welcome-heading">Welcome, {user}</h2>

      {/* ✅ 1. Show TicketPage for 1 flight booking */}
      {bookingData ? (
        <TicketPage booking={bookingData} onBack={handleBackToFlights} userEmail={user} />
      ) : showAllTickets ? (
        // ✅ 2. Show all tickets if user clicks "Show My Tickets"
        <TicketPage booking={null} onBack={handleBackToFlights} userEmail={user} />
      ) : selectedFlight ? (
        // ✅ 3. Seat Selection for selected flight
        <SeatSelection
          flight={selectedFlight}
          userEmail={user}
          onBack={() => setSelectedFlight(null)}
          onConfirm={(booking) => {
            setBookingData(booking);
            setSelectedFlight(null);
          }}
        />
      ) : (
        <>
          <FlightSearchBar search={search} onChange={handleSearchChange} />

          {/* ✅ "Show My Tickets" Button */}
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <button onClick={() => setShowAllTickets(true)}>🎟️ Show My Tickets</button>
          </div>

          <div className="flights-grid">
            {filteredFlights.length > 0 ? (
              filteredFlights.map(flight => (
                <FlightCard
                  key={flight._id}
                  flight={flight}
                  onBook={() => setSelectedFlight(flight)}
                />
              ))
            ) : (
              <p className="no-flights-msg">No flights found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;