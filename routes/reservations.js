let express = require('express');
let router = express.Router();
let mongoose = express.mongoose;

let reservation = require('../models/reservation');

router.get('/', (req, res) => {
    //res.render('home',{title:"reservaio"});
    
})

module.exports = router;
