import Table from './tables'
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
    ImageLink: String,
    Tables: [Table]
  },
  {
    collection: "restaurants",
  }
);

module.exports = mongoose.model("Restaurant", Restaurant);