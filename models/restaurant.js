let mongoose = require('mongoose');

let restaurantModel = mongoose.Schema(
  {
    Name: String,
    Description: String,
    Email: String,
    Address: String,
    Phone: Number,
    Capacity: Number,
    ImageLinks: [String],
    Reservations: [{
      Guest: String,
      Email: String,
      Phone: String,
      NumberOfGuests: Number,
      Date: Date,
      TablesReserved: Number, 
      Notes: String,
    }],
    Tables: [{
      Capacity: Number,
      Duration: Number
    }],
  },
  {
    collection: "restaurants",
  }
);

module.exports = mongoose.model("Restaurant", restaurantModel);