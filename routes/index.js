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
router.get('/edit', function(req, res, next) {
  res.render('vendor/editRestaurant', { title: 'edit'});
});

// need restaurant id to book with specific restaurant- click restaurant page and book from there - no drop down in booking screen
router.get("/book/:id", (req, res, next) => {
  let id = req.params.id;
  restaurant.findById(id, (err, restaurantDetails) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // console.log("restaurantDetails", restaurantDetails);
      res.render('customer/bookRestaurant', { title: 'book', restaurant: restaurantDetails});
      //should we have the information here so the fields they choose are limited to what's available
    }
  });
});

router.post("/book/:id", (req, res, next) => {
  console.log('req.body', req.body);

  let id = req.params.id;
  let reservation = ({
    Guest: req.body.Name,
    Phone: req.body.Phone,
    Email: req.body.Email,
    Date: Date.parse(req.body.Date),
    NumberOfGuests: parseInt(req.body.Guests),
    Notes: req.body.Notes,
    TablesReserved: parseInt(req.body.Guests) / 2,
  });
  restaurant.updateOne({ _id: id }, {$push: {Reservations: reservation}}, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log('success!!');
      res.redirect('/');
    }
  });
});

router.get('/orderlist', function(req, res, next) {
  res.render('vendor/orderlist', { title: 'Order List'});
});



module.exports = router;