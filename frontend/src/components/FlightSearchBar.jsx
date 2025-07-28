import React from 'react';
import './FlightSearchBar.css';

const FlightSearchBar = ({ search, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        name="origin"
        placeholder="Origin"
        value={search.origin}
        onChange={onChange}
      />
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={search.destination}
        onChange={onChange}
      />
      <input
        type="date"
        name="date"
        value={search.date}
        onChange={onChange}
      />
    </div>
  );
};

export default FlightSearchBar;