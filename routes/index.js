let express = require('express');
const router = express.Router();
let controllerIndex = require('../controllers/index');
let controllerRestaurant = require('../controllers/restaurant');

// Routes
router.get('/', controllerRestaurant.restaurantList);
router.get('/:cuisine', controllerRestaurant.filterRestaurantList);

module.exports = router;