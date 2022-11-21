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
    CuisineTags: [String],
    Reservations: [new mongoose.Schema({
      Guest: String,
      Email: String,
      Phone: String,
      NumberOfGuests: Number,
      Date: Date,
      TablesReserved: Number, 
      Notes: String,
    })],
    Tables: [new mongoose.Schema({
      Capacity: Number,
      Duration: Number
    })],
    HoursOfOperations: {
      Sunday: {
        StartTime: Time,
        EndTime: Time
      },
      Monday: {
          StartTime: Time,
          EndTime: Time
      },
      Tuesday: {
          StartTime: Time,
          EndTime: Time
      },
      Wednesday: {
          StartTime: Time,
          EndTime: Time
      },
      Thrusday: {
          StartTime: Time,
          EndTime: Time
      }, 
      Friday: {
          StartTime: Time,
          EndTime: Time
      },
      Saturday: {
          StartTime: Time,
          EndTime: Time
      }
    }
  },
  {
    collection: "restaurants",
  }
);

module.exports = mongoose.model("Restaurant", restaurantModel);