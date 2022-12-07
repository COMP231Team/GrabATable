let mongoose = require("mongoose");
let RestaurantModel = require("../models/restaurant");
let CuisineModel = require("../models/cuisine");

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  }
  if (err.message) {
    return err.message;
  } else {
    return "Unknown server error";
  }
}

// GET restaurant list page
module.exports.restaurantList = function (req, res) {
  try {
    RestaurantModel.find({}, (err, restaurantList) => {
      if (err) {
        console.error(err);
        return res.status(400).json({
          success: false,
          message: getErrorMessage(err),
        });
      } else {
        CuisineModel.find({})
          .sort("Name")
          .exec((err, cuisineList) => {
            if (err) {
              console.error(err);
              return res.status(400).json({
                success: false,
                message: getErrorMessage(err),
              });
            } else {
              res.render("restaurant/restaurantList", {
                title: "Restaurants",
                restaurantList: restaurantList,
                cuisineList: cuisineList,
              });
            }
          });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

module.exports.filterRestaurantList = async (req, res) => {
  let filter = req.params.cuisine;
  try {
    if (filter == "trending") {
      const restaurantList = await RestaurantModel.aggregate([
        {
          $project:{
            Name: 1,
            Address: 1,
            Website: 1,
            Phone: 1,
            ImageLinks: 1,
            CuisineTags: 1,
            Description: 1,
            numOfRes: {$cond:{if: {$isArray: "$Reservations"}, then: {$size: "$Reservations"}, else: "0"}}
          }
        },
        {$sort: {numOfRes:-1}}
      ])

      CuisineModel.find({})
          .sort("Name")
          .exec((err, cuisineList) => {
            if (err) {
              console.error(err);
              return res.status(400).json({
                success: false,
                message: getErrorMessage(err),
              });
            } else {
              res.render("restaurant/restaurantList", {
                title: "Restaurants",
                restaurantList: restaurantList,
                cuisineList: cuisineList,
              });
            }
          });
    } else {
      RestaurantModel.find({ CuisineTags: filter }, (err, restaurantList) => {
        if (err) {
          console.error(err);
          return res.status(400).json({
            success: false,
            message: getErrorMessage(err),
          });
        } else {
          CuisineModel.find({}, (err, cuisineList) => {
            if (err) {
              console.error(err);
              return res.status(400).json({
                success: false,
                message: getErrorMessage(err),
              });
            } else {
              res.render("restaurant/restaurantList", {
                title: "Restaurants",
                restaurantList: restaurantList,
                cuisineList: cuisineList,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: getErrorMessage(error),
    });
  }
};

// GET edit restaurant page
module.exports.editRestaurant = function (req, res) {
  if (req.method == "GET") {
    RestaurantModel.findById(req.params.id, function (err, restaurant) {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.render("restaurant/editRestaurant", {
          title: "Edit Restaurant",
          restaurant: restaurant,
        });
      }
    });
  } else {
    var uCuisineTags = req.body.CuisineTags;
    var uImageUrls = [];
    var dt = new Date();
    SunStartTimeArray = req.body.SunStartTime.split(":");
    SunEndTimeArray = req.body.SunEndTime.split(":");
    MonStartTimeArray= req.body.MonStartTime.split(":");
    MonEndTimeArray = req.body.MonEndTime.split(":");
    TueStartTimeArray = req.body.TueStartTime.split(":");
    TueEndTimeArray = req.body.TueEndTime.split(":");
    WedStartTimeArray = req.body.WedStartTime.split(":");
    WedEndTimeArray = req.body.WedEndTime.split(":");
    ThuStartTimeArray = req.body.ThuStartTime.split(":");
    ThuEndTimeArray = req.body.ThuEndTime.split(":");
    FriStartTimeArray = req.body.FriStartTime.split(":");
    FriEndTimeArray = req.body.FriEndTime.split(":");
    SatStartTimeArray = req.body.SatStartTime.split(":");
    SatEndTimeArray = req.body.SatEndTime.split(":");

    var uHoursofOperations={Sunday:
      {StartTime:dt.setUTCHours(SunStartTimeArray[0],SunStartTimeArray[1]),
        EndTime:dt.setUTCHours(SunEndTimeArray[0],SunEndTimeArray[1])},
        Monday:
      {StartTime:dt.setUTCHours(MonStartTimeArray[0],MonStartTimeArray[1]),
        EndTime:dt.setUTCHours(MonEndTimeArray[0],MonEndTimeArray[1])},
        Tuesday: 
      {StartTime:dt.setUTCHours(TueStartTimeArray[0],TueStartTimeArray[1]),
      EndTime:dt.setUTCHours(TueEndTimeArray[0],TueEndTimeArray[1])},
        Wednesday:
      {StartTime:dt.setUTCHours(WedStartTimeArray[0],WedStartTimeArray[1]),
      EndTime:dt.setUTCHours(WedEndTimeArray[0],WedEndTimeArray[1])},
        Thrusday:
      {StartTime:dt.setUTCHours(ThuStartTimeArray[0],ThuStartTimeArray[1]),
      EndTime:dt.setUTCHours(ThuEndTimeArray[0],ThuEndTimeArray[1])},
        Friday:
      {StartTime:dt.setUTCHours(FriStartTimeArray[0],FriStartTimeArray[1]),
      EndTime:dt.setUTCHours(FriEndTimeArray[0],FriEndTimeArray[1])},
        Saturday:
      {StartTime:dt.setUTCHours(SatStartTimeArray[0],SatStartTimeArray[1]),
      EndTime:dt.setUTCHours(SatEndTimeArray[0],SatEndTimeArray[1])},
      };
    let uName = req.body.Name;
    let uDescription = req.body.Description;
    let uWebsite = req.body.Website;
    let uAddress = req.body.Address;
    let uPhone = req.body.Phone;
    let uCapacity = req.body.Capacity;
    uImageUrls = req.body.ImageLinks.split(",");
    //console.log(uImageUrls);
    let uMenuUrl = req.body.Menu;

    RestaurantModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          Name: uName,
          Description: uDescription,
          Website: uWebsite,
          Address: uAddress,
          Phone: uPhone,
          Capacity: uCapacity,
          ImageLinks: uImageUrls,
          Menu: uMenuUrl,
          CuisineTags:uCuisineTags,
          HoursOfOperations:uHoursofOperations
        },
      },
      (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          res.redirect("/restaurant");
        }
      }
    );
  }
};

// GET details page
module.exports.detailsOfRestaurant = function (req, res) {
  RestaurantModel.findById(req.params.id, function (err, restaurant) {
    res.render("restaurant/restaurantDetails", {
      title: restaurant.Name,
      restaurant: restaurant,
    });
  });
};
