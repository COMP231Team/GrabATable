let express = require('express');
let router = express.Router();

let controllerReservation = require('../controllers/reservations');
//const {  validateUser,} = require('../validator/userValidator');

// Routes

// Vendor
// Buffer Page
router.get('/buffer', controllerReservation.buffer);

// Get reservation list
router.get('/list', controllerReservation.reservationList);
router.get('/list/:id', controllerReservation.reservationList);

//post reservation list
router.post('/list/name', controllerReservation.postReservationListName);
router.post('/list/id', controllerReservation.postReservationListId);

// Get reservation dashboard
router.get('/dashboard/:restaurantId', controllerReservation.reservationDashboard)

// Customer
// Get available timing
router.get('/availability/:id', controllerReservation.availabilities);
// Post available timing
router.post('/availability/:id', controllerReservation.postAvailabilities);
// Get reservation booking form
router.get('/book/:id/:date/:time/:guests',controllerReservation.getBooking);
// Post reservation booking form
router.post("/book/:id/:date/:time/:guests", controllerReservation.postBooking)

// Get reservation edit booking form
router.get('/editBooking/:id', controllerReservation.getEditBooking);
// Post reservation edit booking form
router.post("/editBooking/:id", controllerReservation.postEditBooking)

// Delete reservation: email
router.get("/delete/:reservationId&:restaurantId", controllerReservation.deleteBooking)

module.exports = router;

