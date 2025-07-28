import Flight from '../models/Flight.js';

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
export const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const AdminFlights = async (req, res) => {
  try {
    // Clear old flights first
    await Flight.deleteMany();
    const flights = await Flight.insertMany(sampleFlights);
    res.status(201).json({ message: 'Flights populated', flights });
  } catch (error) {
    console.error('Admin error:', error);
    res.status(500).json({ message: 'Server error while seeding' });
  }
};

const sampleFlights = [
  {
    flightNumber: "AI202",
    origin: "Delhi",
    destination: "Mumbai",
    departureTime: new Date("2025-08-01T10:00:00"),
    arrivalTime: new Date("2025-08-01T12:00:00"),
    seatsAvailable: 120,
    price: 4500
  },
  {
    flightNumber: "6E303",
    origin: "Bangalore",
    destination: "Chennai",
    departureTime: new Date("2025-08-01T09:00:00"),
    arrivalTime: new Date("2025-08-01T10:15:00"),
    seatsAvailable: 80,
    price: 2000
  },
  {
    flightNumber: "SG404",
    origin: "Kolkata",
    destination: "Hyderabad",
    departureTime: new Date("2025-08-02T14:30:00"),
    arrivalTime: new Date("2025-08-02T17:00:00"),
    seatsAvailable: 100,
    price: 3500
  },
  {
    flightNumber: "UK105",
    origin: "Pune",
    destination: "Goa",
    departureTime: new Date("2025-08-03T06:45:00"),
    arrivalTime: new Date("2025-08-03T07:50:00"),
    seatsAvailable: 60,
    price: 1800
  }
];