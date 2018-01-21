var express = require('express');
var router = express.Router();

$('.toggle').on('click', function() {
    $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
    $('.container').stop().removeClass('active');
});

//grab the placeId from the DOM
$('#add').on('click', function() {
    var newPlaceID = {
        placeID: this.value
    };
    console.log('place.place_id:  ' + newPlaceID)
});
//end grab placeId from the DOM


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Node Tutorial' });
});

router.post('/', function(req, res) {
    //Grab the request body
    var body = req.body;

    var res_body = {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email
    };

    res.render('welcome', res_body);
});




module.exports = router;