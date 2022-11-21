// define the restaurant model
let restaurant = require('../models/restaurant');

exports.reservationList = function(req, res) {
    res.render('reservation/reservationList', { 
        title: 'Reservations'
    });
};

exports.availabilities = function(req, res) {
    let restaurantId = req.params.id;

    restaurant.findById(restaurantId, (err, restaurantDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.render('reservation/bookingAvailabilities', { 
                title: 'Reservations',
                restaurant: restaurantDetails
            });
        }
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
        res.render('reservation/bookRestaurant', { title: 'book', restaurant: restaurantDetails});
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

exports.getEditBooking = function (req, res, next) {
    let id = req.params.id;
  restaurant.findOne({ "Reservations._id": id }, (err, reservationDetails) => {
    let i = 0;
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      reservationDetails.Reservations.every(element => {
        let idCheck = String(element._id);
        let idCurrent = String(id);
        if (idCheck !== idCurrent) {
          i++;
          return true;
        }
        return false;
      });
      let reserve = reservationDetails.Reservations[i];

      //modifies the data from the db into a form that's accepted by the ejs file
      let cast = new Date(Date.parse(reserve.Date));
      let fixedDate = cast.toISOString();
      fixedDate = fixedDate.split("T");
      res.render('reservation/editBooking', { reservation: reserve, resDate: fixedDate[0], restaurantName: reservationDetails.Name });
    }
  });
}

exports.postEditBooking = function (req, res, next) {
    //needs the id of the reservation, not restaurant
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
  
    restaurant.findOne({ "Reservations._id": id }, (err, reservationDetails) => {
      let i = 0;
  
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        //user wants to modify
        if (req.body.choice == 1) {
          reservationDetails.Reservations.every(element => {
            let idCheck = String(element._id);
            let idCurrent = String(id);
            if (idCheck !== idCurrent) {
              i++;
              return true;
            }
  
            reservationDetails.Reservations[i] = reservation;
            reservationDetails.Reservations[i]._id = id;
  
            restaurant.updateOne({ "Reservations._id": id }, { $set: { Reservations: reservationDetails.Reservations } }, (err) => {
              if (err) {
                console.log(err);
                res.end(err);
              } else {
                res.redirect('/');
              }
            });
            return false;
          });
        }
  
        //user wants to cancel
        if (req.body.choice == 2) {
          restaurant.updateOne({ "Reservations._id": id }, { $pull: { Reservations: { _id: id } } }, (err) => {
            if (err) {
              console.log(err);
              res.end(err);
            } else {
              res.redirect('/');
            }
          });
        }
  
        //user wants to go back to the homepage
        if(req.body.choice == 3) {
          res.redirect('/');
        }
      }
    });
}
