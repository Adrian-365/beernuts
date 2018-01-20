// dependencies
var express = require('express');
var router = express.Router();
//Import the model
var models = require("../models")

// Create all our routes and set up logic within those routes where required.
router.get('/crawlers', function (req, res) {
    models.Crawler.findAll({})
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.error(err);
        });
});
router.get('/crawlers/:id', function (req, res) {
    models.Crawler.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            console.error(err);
        });
});
router.post('/crawlers', function (req, res) {
    models.Crawler.create(req.body)
        .then(function (crawler) {
            res.json(crawler)
        })
        .catch(function (err) {
            console.error(err);
        })
});

// Export routes for server.js to use.
module.exports = router;