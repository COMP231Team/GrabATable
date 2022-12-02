let express = require('express');
let router = express.Router();

let controllerReservation = require('../controllers/reservations');

// Routes

// Vendor
// Get reservation list
router.get('/list', controllerReservation.reservationList);
//post reservation list
router.post('/list', controllerReservation.postreservationList);

// Customer
// Get available timing
router.get('/availability/:id', controllerReservation.availabilities);
// Post available timing
router.post('/availability/:id', controllerReservation.postAvailabilities);
// Get reservation booking form
router.get('/book/:id/:date/:time/:guests', controllerReservation.getBooking);
// Post reservation booking form
router.post("/book/:id/:date/:time/:guests", controllerReservation.postBooking)

// Get reservation edit booking form
router.get('/editBooking/:id', controllerReservation.getEditBooking);
// Post reservation edit booking form
router.post("/editBooking/:id", controllerReservation.postEditBooking)

router.get("/sendEmail", controllerReservation.sendEmail)

module.exports = router;

