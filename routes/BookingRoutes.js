const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingControllers');

router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);
module.exports = router;