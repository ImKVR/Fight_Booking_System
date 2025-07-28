import mongoose from 'mongoose';

// Define the flight schema
const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  seatsAvailable: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Create and export the Flight model
const Flight = mongoose.model('Flight', flightSchema);
export default Flight;