exports.book = function(req, res) {
    res.render('customer/booking', { 
        title: 'Home'
    });
};
exports.orderlist = function(req, res){
    res.render('vendor/orderlist',{
        title:'Order list'
    }     
    );
}