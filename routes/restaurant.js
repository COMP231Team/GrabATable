let express = require('express');
let router = express.Router();

let controllerRestaurant = require('../controllers/restaurant');

// Routes
// Get restaurant list
router.get('/', controllerRestaurant.restaurantList);
// Get  restaurant edit page
router.get('/edit/:id', controllerRestaurant.editRestaurant);
// Get  restaurant details page
router.get('/details/:id', controllerRestaurant.detailsOfRestaurant);



//router.put('/edit/:id', controllerRestaurant.editRestaurant);

router.post('/edit/:id', controllerRestaurant.editRestaurant);
// ------------------------
// TODO : view restaurant details
// ------------------------

module.exports = router;

