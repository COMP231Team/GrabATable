import Table from './tables'; //Error here; Syntax error: cannot use import statement out of module. 
let mongoose = require('mongoose');

// create a model class just with questions
let Reservation = mongoose.Schema(
  {
    Date: Date,
    Time: Date,
    Email: String,
    Name: String,
    Phone: String,
    Confirmed: Boolean, 
    Cancelled: Boolean,
    Tables: [Table],
    Duration: Number,
    Guests: Number,
    Notes: String
  }
);

module.exports = mongoose.model("Reservation", Reservation);
