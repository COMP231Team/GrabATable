let mongoose = require('mongoose');
let Table = require('./table');

// Reservation Model
let reservationModel = mongoose.Schema(
  {
    Date: Date,
    Time: Date,
    Email: String,
    Name: String,
    Phone: String,
    Confirmed: Boolean, 
    Cancelled: Boolean,
    //Tables: [Table],
    Duration: Number,
    Guests: Number,
    Notes: String
  },
  {
    collection: "reservation",
  }
);

module.exports = mongoose.model("Reservation", reservationModel);
