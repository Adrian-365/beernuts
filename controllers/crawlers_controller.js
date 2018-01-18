// dependencies
var express = require('express');
var router = express.Router();
//Import the model
var crawler = require('../models/crawler.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', function(req, res) {
    res.redirect('/index');
});

router.get('/index', function(req, res) {
    crawler.selectAll(
    function(data) {
        res.json(data);
    })
});

router.post('/crawlers/addCrawler', function (req, res) {
    crawler.addCrawler([
        'username', 'user_email', 'user_city', 'user_state', 'user_zip', 'user_blurb', 'user_password'
    ], [
            req.body.name, false
        ], function () {
            res.redirect('/index');
        });
});

// Export routes for server.js to use.
module.exports = router;