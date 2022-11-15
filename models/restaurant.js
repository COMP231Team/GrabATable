let mongoose = require('mongoose');
let Table = require('./table');
let Reservation = require('./reservation');

// Restaurant Model
let restaurantModel = mongoose.Schema(
  {
    Name: String,
    Description: String,
    Email: String,
    Address: String,
    Phone: Number,
    Capacity: Number,
    ImageLinks: [String],
    Reservations: [Reservation],
    Tables: [Table]
  },
  {
    collection: "restaurant",
  }
);

module.exports = mongoose.model("Restaurant", restaurantModel);