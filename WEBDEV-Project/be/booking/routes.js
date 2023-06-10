const express = require("express");
const bookingController = require('./controller');
const router = express.Router();

router.post('/createbooking', bookingController.createBooking);

router.get('/get-bookings', bookingController.getAllBookings);

router.get('/getBookingByCustomername', bookingController.bookingbycustomername);

router.get('/getBooking', bookingController.getbooking);


module.exports = router;