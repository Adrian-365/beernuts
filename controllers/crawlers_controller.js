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

// Export routes for server.js to use.
module.exports = router;