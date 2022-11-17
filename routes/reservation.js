let express = require('express');
let router = express.Router();

let controllerReservations = require('../controllers/reservations');

// Routes
// Get booking page
router.get('/book', controllerReservations.book);


module.exports = router;

