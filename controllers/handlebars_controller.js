// dependencies
var express = require('express');
var router = express.Router();
//Import the model
var models = require("../models")
var path = require("path");

// Create all our routes and set up logic within those routes where required.


router.get('/interface', function(req, res) {
    res.render("interface");
});

router.get('/makecrawl', function(req, res) {
    res.render("makecrawl");
});

router.get('/viewthiscrawl', function(req, res) {
    res.render("viewthiscrawl");
});

router.get('/my-crawls', function(req, res) {
    models.Crawls.findAll({})
        .then(function(data) {
            console.log('mycrawls', data);
            // res.render("my-crawls", data)
            res.json(data);
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.get('/crawlers', function(req, res) {
    models.Crawler.findAll({})
        .then(function(data) {
            console.log(data);
            res.render("crawlers", data)
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.get("/dummymap", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dummyhtml.html"));
});

router.get("/dummycrawlmap", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dummyCrawlMap.html"));
});

// Export routes for server.js to use.
module.exports = router;