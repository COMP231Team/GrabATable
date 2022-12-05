let mongoose = require('mongoose');

let restaurantModel = mongoose.Schema(
  {
    Name: String,
    Description: String,
    Website: String,
    Address: String,
    Phone: String,
    Capacity: Number,
    ImageLinks: [String],
    Menu:String,
    CuisineTags: [String],
    Status: String,
    Reservations: [new mongoose.Schema({
      Guest: String,
      Email: String,
      Phone: String,
      NumberOfGuests: Number,
      Date: Date,
      TablesReserved: Number, 
      Notes: String,
      
    })],
    HoursOfOperations: {
      Sunday: {
        StartTime: Date,
        EndTime: Date
      },
      Monday: {
        StartTime: Date,
        EndTime: Date
      },
      Tuesday: {
        StartTime: Date,
        EndTime: Date
      },
      Wednesday: {
        StartTime: Date,
        EndTime: Date
      },
      Thrusday: {
        StartTime: Date,
        EndTime: Date
      }, 
      Friday: {
        StartTime: Date,
        EndTime: Date
      },
      Saturday: {
        StartTime: Date,
        EndTime: Date
      }
    }
  },
  {
    collection: "restaurants",
  }
);

module.exports = mongoose.model("Restaurant", restaurantModel);
