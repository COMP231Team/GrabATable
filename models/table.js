let mongoose = require("mongoose");

// Tables
let tableModel = mongoose.Schema(
  {
    Date: Date,
    Time: Date,
    Available: Boolean,
    Duration: Number,
    Capacity: Number
  },
  {
    collection: "table",
  }
);

module.exports = mongoose.model("Table", tableModel);
