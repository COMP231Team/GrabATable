let mongoose = require("mongoose");

// create a model class just with questions
let Table = mongoose.Schema(
  {
    Date: Date,
    Time: Date,
    Available: Boolean,
    Duration: Number,
    Capacity: Number
  },
  {
    collection: "tables",
  }
);

module.exports = mongoose.model("Table", Table);
