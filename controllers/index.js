let Restaurant = require('../models/restaurant');

exports.home = function(req, res) {
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
