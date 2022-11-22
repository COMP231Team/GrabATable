let mongoose = require('mongoose');

let cuisineModel = mongoose.Schema(
  {
    Name: String
  },
  {
    collection: "cuisines",
  }
);

module.exports = mongoose.model("Cuisine", cuisineModel);
