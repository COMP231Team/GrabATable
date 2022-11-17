let express = require('express');
let router = express.Router();

let controllerRestaurant = require('../controllers/reservations');

/*GET ORDER LIST PAGE*/
router.get('/orderlist', controllerRestaurant.resta);
  module.exports = router;