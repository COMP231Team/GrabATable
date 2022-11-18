exports.book = function(req, res) {
    res.render('reservation/bookRestaurant', { 
        title: 'Book a Reservation'
    });
};

exports.reservationList = function(req, res) {
    res.render('reservation/reservationList', { 
        title: 'Reservations'
    });
};

// ------------------------
// TODO : modify reservation
// ------------------------
