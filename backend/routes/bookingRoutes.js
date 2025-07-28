import express from 'express';
import {
  getBookedSeats,
  bookSeats,
  getBookingsByUser,
  deleteBooking
} from '../controllers/bookingController.js';

const router = express.Router();

router.get('/:flightId', getBookedSeats);              // Get booked seats for a flight
router.post('/', bookSeats);                           // Create a new booking
router.get('/user/:email', getBookingsByUser);         // Show all bookings of a user
router.delete('/:id', deleteBooking);                  // Cancel a booking by ID

export default router;