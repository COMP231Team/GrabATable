let express = require('express');
let router = express.Router();
let mongoose = express.mongoose;

let reservationRouter = require('../controllers/reservations');

router.get('/book', reservationRouter.book);

module.exports = router;

