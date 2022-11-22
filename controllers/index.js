let Restaurant = require('../models/restaurant');

exports.home = function(req, res) {
    return res.redirect('/restaurant');
};
