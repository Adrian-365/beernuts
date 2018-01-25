// dependencies
var express = require('express');
var router = express.Router();
//Import the model
var models = require("../models")
var path = require("path");

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
    res.render("index");
});

router.get('/sign-up', function(req, res) {
    res.render("sign-up");
});

router.get('/interface', function(req, res) {
    res.render("interface");
});

<<<<<<< HEAD
router.get('/my-crawls', function (req, res) {
    models.Crawls.findAll({})
        .then(function (data) {
            console.log('mycrawls',data);
            // res.render("my-crawls", data)
            res.json(data);
        })
        .catch(function (err) {
            console.error(err);
        });
});

router.get('/crawlers', function (req, res) {
=======
router.get('/crawlers', function(req, res) {
>>>>>>> 3848a8c71e6d85e9ecdc038dcf0aeb248ecf4312
    models.Crawler.findAll({})
        .then(function(data) {
            console.log(data);
            res.render("crawlers", data)
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.get("/pubmap", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dummyhtml.html"));
});


// Export routes for server.js to use.
module.exports = router;