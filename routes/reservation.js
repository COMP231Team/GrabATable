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

// Get reservation edit booking form
router.get('/editBooking/:id', controllerReservation.getEditBooking);
// Post reservation edit booking form
router.post("/editBooking/:id", controllerReservation.postEditBooking)


module.exports = router;

