let express = require('express');
const router = express.Router();
let controllerIndex = require('../controllers/index');
// define the restaurant model
let restaurant = require('../models/restaurant');


// Routes
router.get('/', controllerIndex.home);

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Restaurants'});
});

module.exports = router;