// define the restaurant model
let restaurant = require('../models/restaurant');

exports.reservationList = function(req, res) {
    res.render('reservation/reservationList', { 
        title: 'Reservations'
    });
};

// need restaurant id to book with specific restaurant- click restaurant page and book from there - no drop down in booking screen
exports.getBooking = function(req, res, next) {
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
};
  
exports.postBooking = function(req, res, next) {
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
}

// ------------------------
// TODO : modify reservation
// ------------------------
