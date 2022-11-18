let express = require('express');
let router = express.Router();

let controllerRestaurant = require('../controllers/restaurant');

// Routes
// Get restaurant list
router.get('/list', controllerRestaurant.restaurantList);
// Get  restaurant edit page
router.get('/edit', controllerRestaurant.editRestaurant);

// ------------------------
// TODO : view restaurant details
// ------------------------

module.exports = router;

