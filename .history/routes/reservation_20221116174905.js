let express = require('express');
let router = express.Router();

let controllerRestaurant = require('../controllers/reservations');

/*GET ORDER LIST PAGE*/
router.get('/orderlist', function(req, res, next) {
    res.render('orderlist', { title: 'orderlist'});
  });
  
  module.exports = router;