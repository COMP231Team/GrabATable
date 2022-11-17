let express = require('express');
let router = express.Router();

let controllerRestaurant = require('../controllers/reservations');

/*GET ORDER LIST PAGE*/
router.get('/orderlist', controllerRes);
  module.exports = router;