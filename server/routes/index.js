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

module.exports = router;