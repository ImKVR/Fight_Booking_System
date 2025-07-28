import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  seats: {
    type: [String], // Example: ['1A', '2B']
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;