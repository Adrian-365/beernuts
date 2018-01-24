// dependencies
var express = require('express');
var router = express.Router();
//Import the model
var models = require("../models")


router.post('/crawler/signup', function(req, res){
    console.log(req.body);
    res.send('post received');
});




