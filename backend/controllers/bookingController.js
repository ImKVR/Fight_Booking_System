import Booking from '../models/Booking.js';

export const getBookedSeats = async (req, res) => {
  const { flightId } = req.params;
  try {
    const bookings = await Booking.find({ flightId });
    const allSeats = bookings.flatMap(b => b.seats);
    res.json(allSeats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booked seats' });
  }
};

export const bookSeats = async (req, res) => {
  const { flightId, userEmail, seats } = req.body;
  try {
    const booking = new Booking({ flightId, userEmail, seats });
    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Booking failed' });
  }
};
// Get all bookings made by a specific user
export const getBookingsByUser = async (req, res) => {
  const { email } = req.params;

  try {
    const bookings = await Booking.find({ userEmail: email }).populate('flightId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking' });
  }
};