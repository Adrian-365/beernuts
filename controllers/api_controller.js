// dependencies
var express = require('express');
var router = express.Router();
//Import the model
var models = require("../models")

// Create all our routes and set up logic within those routes where required.
// Shouldn't all this be in the routes files in the routes folder? Asking for a friend.

//**************not sure if this will work...**************
router.get('/crawl/:id', function(req, res) {
    models.Places.findAll({
        include: [{
            model: models.Crawls,
            where: { id: req.params.id }
        }]

    })

    .then(function(crawl) {
        // console.log('YaaaYYYYYYYY!!! Association')
        res.json(crawl);
        var respObj = JSON.stringify(crawl)
        console.log(respObj);
    });

});
//*********************************************************



// post a new crawler
router.post('/crawlers/signup', function(req, res) {
    console.log(req.body);
    models.Crawler.create(req.body)
        .then(function(resp) {
            res.json(resp);
        })
});

// get all crawlers
router.get('/crawlers', function(req, res) {

    models.Crawler.findAll({})
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            console.error(err);
        });
});
//get a crawler with a specific id
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
            res.json(crawler);
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

// crawls routes
router.get('/crawls', function(req, res) {

    models.Crawls.findAll({})
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            console.error(err);
        });
});
router.get('/crawls/:id', function(req, res) {
    models.Crawls.findOne({
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
router.post('/crawls', function(req, res) {
    console.log(req.body.CrawlerId)
    models.Crawls.create({ CrawlerId: req.body.CrawlerID })
        .then(function(crawl) {
            res.json(crawl)
        })
        .catch(function(err) {
            console.error(err);
        })
});
router.delete('/crawls/:id', function(req, res) {
    models.Crawls.destroy({
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

});

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
        include: [models.Crawler, models.Places]
    }).then(function(modelsCrawls) {
        res.json(modelsCrawls);
    });
});

// add to places router
router.post("/crawl/:crawlID/add", function(req, res) {
        var gpid = req.body.googlePlaceID;
        console.log(models.PlacesToCrawlsJoin);
        models.Places.findOne({
                where: {
                    googlePlaceID: gpid
                }
            })
            .then(function(response) {
                if (response) {
                    // use the response to add join
                    models.PlacesToCrawlsJoin.create({
                            CrawlId: req.params.crawlID,
                            PlaceId: response.id
                        })
                        .then(function(resp) {
                            res.json(resp);
                        })
                        .catch(function(err) {
                            console.log(err);
                        })
                } else {
                    //create place and join
                    models.Places.create({
                            placesName: req.body.placesName,
                            googlePlaceID: gpid,
                            placesAddress: req.body.placesAddress

                        })
                        .then(function(response) {
                            console.log(response);
                            models.PlacesToCrawlsJoin.create({
                                    CrawlId: req.params.crawlID,
                                    PlaceId: response.id
                                })
                                .then(function(resp) {
                                    res.json(resp);
                                })
                                .catch(function(err) {
                                    console.log(err);
                                })
                        })
                        .catch(function(err) {
                            console.log(err);
                        })
                }
            })
            .catch(function(err) {
                console.error(err)
            })
    })
    // Export routes for server.js to use.

module.exports = router;