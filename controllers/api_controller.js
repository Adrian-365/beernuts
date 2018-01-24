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
    console.log(models)
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

router.get("/crawls", function(req, res) {
    var query = {};
    if (req.query.CrawlerId) {
        query.CrawlerId = req.query.CrawlerId;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join

    models.Crawls.findAll({
        where: query,
        include: [models.Crawler]
    }).then(function(modelsCrawls) {
        res.json(modelsCrawls);
    });
});

router.post("/crawl/add/:crawlID?", function (req, res) {
    var gpid = req.body.gpid;
    console.log(models.PlacesToCrawlsJoin);
    models.Places.findOne({
            where: {
                googlePlaceID: gpid
            }
        })
        .then(function (response) {
            if (response) {
                // use the response to add join
                models.PlacesToCrawlsJoin.create({
                        CrawlId: req.params.crawlID,
                        PlaceId: response.id
                    })
                    .then(function (resp) {
                        res.json(resp);
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            } else {
                //create place and join
                models.Places.create({
                        placesName: req.body.placesName,
                        googlePlaceID: gpid,
                    })
                    .then(function (response) {
                        console.log(response);
                        models.PlacesToCrawlsJoin.create({
                                CrawlId: req.params.crawlID,
                                PlaceId: response.id
                            })
                            .then(function (resp) {
                                res.json(resp);
                            })
                            .catch(function (err) {
                                console.log(err);
                            })
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }
        })
        .catch(function (err) {
            console.error(err)
        })
})
// Export routes for server.js to use.
module.exports = router;