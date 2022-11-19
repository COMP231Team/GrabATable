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
exports.editRestaurant = function (req, res) {
    
    console.log(req.method)
    if(req.method == 'GET'){
    Restaurant.findById(req.params.id, function(err, restaurantDetails){
        if(err){
            console.log(err);
           res.end(err);
        }else{
            //console.log(restaurantDetails)
            res.render('restaurant/editRestaurant', 
            {title:'Edit Restaurant',restaurant: restaurantDetails});
            
        }
    })
}else{
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
           // res.end();
            res.redirect('/restaurant/list')
            }
    });}

}







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
