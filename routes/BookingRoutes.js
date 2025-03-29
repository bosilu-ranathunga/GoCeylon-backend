const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingControllers');

router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);

router.put('/update/:id',bookingController.updateBooking);
router.delete('/delete/:id', bookingController.deleteBooking);
router.get('/user/:userId', bookingController.getBookingsByUser);
module.exports = router;

