let express = require('express');
let router = express.Router();

let controllerRestaurant = require('../controllers/reservations');

/*GET ORDER LIST PAGE*/
router.get('/list', controllerRestaurant.restaurantList);
  module.exports = router;