// dependencies
var express = require('express');
var router = express.Router();
//Import the model
var models = require("../models")

// Create all our routes and set up logic within those routes where required.
router.get('/', function (req, res) {
    res.render("index");
});

router.get('/sign-up', function (req, res) {
    res.render("sign-up");
});

router.get('/interface', function (req, res) {
    res.render("interface");
});

router.get('/crawlers', function (req, res) {
    models.Crawler.findAll({})
        .then(function (data) {
            console.log(data);
            res.render("crawlers", data)
        })
        .catch(function (err) {
            console.error(err);
        });
});


// Export routes for server.js to use.
module.exports = router;