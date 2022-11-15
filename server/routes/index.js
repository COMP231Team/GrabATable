let express = require('express');
const router = express.Router();

//create models
// const reservation = require('../models/reservations')

/* GET home page. */
router.get('/', function(req, res, next) {
          console.log('home')
          res.render('home', {
            title: 'Restaurants',
          });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Restaurants'});
});
router.get('/edit', function(req, res, next) {
  res.render('editRestaurant', { title: 'edit'});
});
router.get('/book', function(req, res, next) {
  res.render('booking', { title: 'book'});
});

module.exports = router;