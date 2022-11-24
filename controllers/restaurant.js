let mongoose = require('mongoose');
let RestaurantModel = require('../models/restaurant');
let CuisineModel = require('../models/cuisine');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    }
    if (err.message) {
        return err.message;
    } else {
        return 'Unknown server error';
    }
};


// GET restaurant list page
module.exports.restaurantList = function (req, res) {
    try {
        RestaurantModel.find({}, (err, restaurantList) => {
            if (err) {
                console.error(err);
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                CuisineModel.find({}).sort('Name').exec((err, cuisineList) => { 
                    if (err) {
                        console.error(err);
                        return res.status(400).json({
                            success: false,
                            message: getErrorMessage(err)
                        });
                    } else {
                        res.render('restaurant/restaurantList', { 
                            title: 'Restaurants',
                            restaurantList: restaurantList,
                            cuisineList: cuisineList
                        });
                    }
                });
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        });
    }

};

module.exports.filterRestaurantList = function (req, res) {
    let filter = req.params.cuisine;
    try {
        if (filter == "trending") {
            RestaurantModel.find({$addFields: {numberReservations: {$size: "$Reservations" }}}).sort({'reservationCount' : -1}).exec((err, restaurantList) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({
                        success: false,
                        message: getErrorMessage(err)
                    });
                } else {
                    console.log(restaurantList[0].numberReservations);
                    CuisineModel.find({}).sort('Name').exec((err, cuisineList) => { 
                        if (err) {
                            console.error(err);
                            return res.status(400).json({
                                success: false,
                                message: getErrorMessage(err)
                            });
                        } else {
                            res.render('restaurant/restaurantList', { 
                                title: 'Restaurants',
                                restaurantList: restaurantList,
                                cuisineList: cuisineList
                            });
                        }
                    });
                }
            })

        } else {
            RestaurantModel.find({CuisineTags: filter }, (err, restaurantList) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({
                        success: false,
                        message: getErrorMessage(err)
                    });
                } else {
                    CuisineModel.find({}, (err, cuisineList) => { 
                        if (err) {
                            console.error(err);
                            return res.status(400).json({
                                success: false,
                                message: getErrorMessage(err)
                            });
                        } else {
                            res.render('restaurant/restaurantList', { 
                                title: 'Restaurants',
                                restaurantList: restaurantList,
                                cuisineList: cuisineList
                            });
                        }
                    });
                }
            })
            
        } 
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        });
    }
};

// GET edit restaurant page
module.exports.editRestaurant = function (req, res) {
    
    console.log(req.method)
    if(req.method == 'GET'){
    RestaurantModel.findById(req.params.id, function(err, restaurantDetails){
        if(err){
            console.log(err);
           res.end(err);
        } else {
            //console.log(restaurantDetails)
            res.render('restaurant/editRestaurant', 
            {title:'Edit Restaurant',restaurant: restaurantDetails});
            
        }
    })
    } else {
        let uName = req.body.Name;
        let uDescription = req.body.Description;
        let uEmail = req.body.Email;
        let uAddress = req.body.Address;
        let uPhone = req.body.Phone;
        let uCapacity = req.body.Capacity;
        let uImageUrl = req.body.ImageLinks;

        Restaurant.findByIdAndUpdate(req.params.id,{$set:{Name : uName,
            Description:uDescription,
            Email:uEmail,
            Address:uAddress,
            Phone:uPhone,
            Capacity:uCapacity,
            ImageLinks:uImageUrl
        }},(err)=>{
            if (err) {
                console.log(err);
                res.end(err);
                } else {
                console.log('success!!');
                res.redirect('/restaurant/list')
                }
        });
    }

}

// GET details page
module.exports.detailsOfRestaurant = function (req, res) {
    RestaurantModel.findById(req.params.id, function(err, restaurant){
        console.log(restaurant);
        res.render('restaurant/restaurantDetails', { 
            title: restaurant.Name,
            restaurant: restaurant
        });        
    })
}
