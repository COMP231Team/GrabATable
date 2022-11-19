let express = require('express');
let router = express.Router();

let controllerRestaurant = require('../controllers/restaurant');

// Routes
// Get restaurant list
router.get('/list', controllerRestaurant.restaurantList);
// Get  restaurant edit page
router.get('/edit', controllerRestaurant.editRestaurant);
// Get  restaurant details page
router.get('/details/:id', controllerRestaurant.detailsOfRestaurant);

// ------------------------
// TODO : view restaurant details
// ------------------------

module.exports = router;

