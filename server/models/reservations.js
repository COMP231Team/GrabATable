import Table from './tables';
let mongoose = require("mongoose");

// create a model class just with questions
let Reservation = mongoose.Schema(
  {
    Date: Date,
    Time: Date,
    Tables: [Table],
    Duration: Number,
    Guests: Number,
    Notes: String
  },
  {
    collection: "reservations",
  }
);

module.exports = mongoose.model("Reservation", Reservation);