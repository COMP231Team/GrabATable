exports.home = function(req, res) {
    res.render('index', { 
        title: 'Home'
    });
};

exports.restaurants = function(req, res) {
    res.render('customer/restaurantList', { 
        title: 'Restaurants'
    });
};