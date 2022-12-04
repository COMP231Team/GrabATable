// define the restaurant model
let restaurant = require('../models/restaurant');
let nodemailer = require('nodemailer');

exports.reservationList = function(req, res) {
  res.render('reservation/reservationList', { 
    title: 'Reservations',
    restaurant: ""
    });
  };
   
  exports.postreservationList = function(req, res, next) {
    const restaurantName = req.body.Name;
    restaurant.findOne({Name:restaurantName},(err, restaurantDetails) => {
      if (err) {
          console.log(err);
      } else {
    res.render('reservation/reservationList', { 
      title: 'Reservations',
      restaurant:restaurantDetails
      });
     }
     }); 
}

exports.availabilities = function(req, res) {
    let restaurantId = req.params.id;

    restaurant.findById(restaurantId, (err, restaurantDetails) => {
        if (err) {
            console.log(err);
        } else {
            res.render('reservation/bookingAvailabilities', { 
                title: 'Reservations',
                restaurant: restaurantDetails,
                availableTimes: null,
                date: "",
                guests: ""
            });
        }
    });
};

exports.postAvailabilities = function(req, res) {
    let restaurantId = req.params.id;
    const date = req.body.Date;
    let requestedDate = new Date(date);
    let requestedGuests = req.body.Guests;
    restaurant.findById(restaurantId, (err, restaurantDetails) => {
        if (err) {
            console.log(err);
            res.end(err);
            } else {
            const dateString = date;
            const reservations =  restaurantDetails.Reservations.filter(res => {
                return res.Date >= requestedDate
            });
            const availabilityMap = new Map();
            const hours = [11, 13, 17, 19, 21];
            if(reservations.length === 0){
                for (let i = 0; i < hours.length; i++){
                    availabilityMap.set(hours[i], restaurantDetails.Capacity)
                };
            }else{
            const capacityMap = new Map();
            for (const res of reservations){
                const testResDate = new Date(res.Date)
                if(capacityMap.get(testResDate.getHours())){
                    const currentCapcity = capacityMap.get(testResDate.getHours());
                    capacityMap.set(testResDate.getHours(), res.NumberOfGuests + currentCapcity)
                }else{
                    capacityMap.set(testResDate.getHours(), res.NumberOfGuests)
                }
            }
            for (let i = 0; i < hours.length; i++){
                if(!capacityMap.get(hours[i])){
                    availabilityMap.set(hours[i], restaurantDetails.Capacity) 
                } 
                if(restaurantDetails.Capacity - capacityMap.get(hours[i]) >= parseInt(requestedGuests)){
                    availabilityMap.set(hours[i], restaurantDetails.Capacity - capacityMap.get(hours[i]))
                }
            };
        }
            res.render('reservation/bookingAvailabilities', { 
                title: 'Reservations',
                restaurant: restaurantDetails,
                availableTimes: availabilityMap,
                date: dateString,
                guests: requestedGuests
            });
        }
    });
};

// need restaurant id to book with specific restaurant- click restaurant page and book from there - no drop down in booking screen
exports.getBooking = function(req, res, next) {
    let id = req.params.id;
    let date = req.params.date;
    let time = req.params.time;
    let guests = req.params.guests;
    restaurant.findById(id, (err, restaurantDetails) => {
        if (err) {
        console.log(err);
        res.end(err);
        } else {
        res.render('reservation/bookRestaurant', { title: 'book', restaurant: restaurantDetails, date: date, time: time, guests: guests});
        //should we have the information here so the fields they choose are limited to what's available
        }
    });
};
  
exports.postBooking = function(req, res, next) {
    const dateTime = `${req.body.Date} ${req.body.Time}`

    let id = req.params.id;
    let reservation = ({
        Guest: req.body.Name,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Date: Date.parse(dateTime),
        NumberOfGuests: parseInt(req.body.Guests),
        Notes: req.body.Notes,
        TablesReserved: Math.round(parseInt(req.body.Guests) / 2),
    });
    restaurant.updateOne({ _id: id }, {$push: {Reservations: reservation}}, (err) => {
        if (err) {
        console.log(err);
        res.end(err);
        } else {
           //EMAIL FUNCTIONALITY CODE
           let transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false,
            auth: {
              user: "apikey",
              pass: "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"
            },
          });

          restaurant.findById(id, (err, restaurantDetails) => {
            if (err) {
            console.log(err);
            res.end(err);
            } else {
              var dateString= new Date(reservation.Date);
              var message = {
                to: reservation.Email,
                from: "team.Comp.231@gmail.com",
                subject: "Booking confirmed!",
                text: "Your Reservation Details",
                html: "<h3>Hello, "+reservation.Guest+"!</h3> <p>Your booking for "+restaurantDetails.Name+" on "+dateString.toString()+" has been confirmed! Press this <a href='/restaurant'>link</a> anytime to cancel!\n</p><p>Thank you, </br>The Grab A Table Team</p>"
              };

              transporter.sendMail(message, (err, info) => {
                if(err){
                  console.log(""+err.message);
                }
                else{
                  console.log(""+info.envelope)
                }
              })
            }
          });

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
      res.render('reservation/editBooking', { title: reserve.Name, reservation: reserve, resDate: fixedDate[0], restaurantName: reservationDetails.Name });
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
