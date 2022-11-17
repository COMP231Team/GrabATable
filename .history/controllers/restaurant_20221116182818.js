
exports.
restaurantList = function(req, res) {
    res.render('customer/restaurantList', { 
        title: 'Restaurants'
    });
};

exports.editRestaurant = function(req, res) {
    res.render('vendor/editRestaurant', { 
        title: 'Edit Restaurant'
    });
};

exports.bookRestaurant = function(req, res) {
    res.render('customer/bookRestaurant', { 
        title: 'Book Table'
    });
};