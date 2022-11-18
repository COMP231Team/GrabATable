
exports.
restaurantList = function(req, res) {
    res.render('restaurant/restaurantList', { 
        title: 'Restaurants'
    });
};

exports.editRestaurant = function(req, res) {
    res.render('restaurant/editRestaurant', { 
        title: 'Edit Restaurant'
    });
};

// ------------------------
// TODO : view restaurant details
// ------------------------