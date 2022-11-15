import Table from './tables';
import Reservation from './reservations';
let mongoose = require("mongoose");

// create a model class just with questions
let Restaurant = mongoose.Schema(
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
    collection: "restaurants",
  }
);

module.exports = mongoose.model("Restaurant", Restaurant);