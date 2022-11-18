let express = require('express');
let router = express.Router();

let controllerRestaurant = require('../controllers/reservations');

// Routes
// Get reservation list
router.get('/list', controllerRestaurant.reservationList);

// Get reservation booking form
router.get('/book', controllerRestaurant.book);

// ------------------------
// TODO : modify reservation
// ------------------------


module.exports = router;

