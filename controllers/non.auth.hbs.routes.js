var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render("index");
});

router.get('/sign-up', function (req, res) {
    res.render("sign-up");
});
module.exports = router;