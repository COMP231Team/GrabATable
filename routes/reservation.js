let express = require('express');
let router = express.Router();

let controllerReservation = require('../controllers/reservations');

// Routes
// Get reservation list
router.get('/list', controllerReservation.reservationList);

// Get reservation booking form
router.get('/book/:id', controllerReservation.getBooking);
// Post reservation booking form
router.post("/book/:id", controllerReservation.postBooking)

// ------------------------
// TODO : modify reservation
// ------------------------


module.exports = router;

