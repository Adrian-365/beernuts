// dependencies
var express = require('express');
var router = express.Router();
//Import the model
var models = require("../models")

// Create all our routes and set up logic within those routes where required.
// Shouldn't all this be in the routes files in the routes folder? Asking for a friend.
router.get('/crawlers', function(req, res) {
    models.Crawler.findAll({})
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            console.error(err);
        });
});
router.get('/crawlers/:id', function(req, res) {
    models.Crawler.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            console.error(err);
        });
});
router.post('/crawlers', function(req, res) {
    models.Crawler.create(req.body)
        .then(function(crawler) {
            res.json(crawler)
        })
        .catch(function(err) {
            console.error(err);
        })
});
router.delete('/crawlers/:id', function(req, res) {
    models.Crawler.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(crawler) {
            res.json(crawler);
        })
        .catch(function(err) {
            console.error(err);
        })
});
//add a bar to a crawl
router.post('/places/:id', function(req, res) {
    models.Places.create(req.body)
        .then(function(placesId) {
            res.json(placesId)
        })
        .catch(function(err) {
            console.error(err);
        })

})

//get all crawls

router.get("/api/crawls", function (req, res) {
    var query = {};
    if (req.query.CrawlerId) {
        query.CrawlerId = req.query.CrawlerId;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join

    models.Crawls.findAll({
        where: query,
        include: [models.Crawler]
    }).then(function (modelsCrawls) {
        res.json(modelsCrawls);
    });
});

// Export routes for server.js to use.
module.exports = router;