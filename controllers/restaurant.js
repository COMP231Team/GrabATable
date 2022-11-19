let mongoose = require('mongoose');
let Restaurant = require('../models/restaurant');

// GET restaurant list page
exports.restaurantList = async function(req, res) {
    Restaurant.find((err, restaurants) => { 
        if (err) {
            return console.log(err);
        }
        return res.render('restaurant/restaurantList', { 
            title: 'Restaurants',
            restaurantList: restaurants
        });
    });
};

// GET edit restaurant page
exports.editRestaurant = function(req, res) {
    res.render('restaurant/editRestaurant', { 
        title: 'Edit Restaurant'
    });
};

// GET details page
exports.detailsOfRestaurant = function (req, res) {
    Restaurant.findById(req.params.id, function(err, r){
        console.log(r);
        res.render('restaurant/restaurantDetails', { 
            title: r.Name,
            restaurant: r
        });        
    })
}
