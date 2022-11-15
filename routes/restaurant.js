let express = require('express');
let router = express.Router();

let controllerRestaurant = require('../controllers/restaurant');

// Routes
router.get('/list', controllerRestaurant.restaurantList);
router.get('/edit', controllerRestaurant.editRestaurant);
router.get('/:id/book', controllerRestaurant.bookRestaurant);

module.exports = router;

