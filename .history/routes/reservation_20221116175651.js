let express = require('express');
let router = express.Router();

let controllerReservation = require('../controllers/reservations');

/*GET ORDER LIST PAGE*/
router.get('/orderlist', controllerR);
  module.exports = router;