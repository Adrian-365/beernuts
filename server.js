//Dependancies 
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var apiRoutes = require('./controllers/api_controller.js');
var handlebarsRoutes = require('./controllers/handlebars_controller.js');
var models = require("./models");
var path = require('path');

//Sets up the express app
var app = express();
// override with POST having ?_method=PUT(or DELETE)
app.use(methodOverride('_method'));
// Sets an initial port
var port = process.env.PORT || 3307;

//Sets up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));
//needed for google maps search
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use('/', handlebarsRoutes);
app.use("/api", apiRoutes);

// Serve static content from the public directory
app.use(express.static(path.join(__dirname, 'public')));

//Start server to begin listening 
models.sequelize.sync({
    force: true
}).then(function() {
    // run the sql query to seed db here
    // seed the crawlers table
    models.Crawler.bulkCreate([{
        username: "BeerMe",
        user_email: "vivanaranja+1beerme@gmail.com",
        user_city: "Irvine",
        user_state: "CA",
        user_zip: "92602",
        user_blurb: "Here to beer",
        user_password: ""
    }, {
        username: "Pilsneresque",
        user_email: "vivanaranja+1pilsneresque@gmail.com",
        user_city: "San Clemente",
        user_state: "CA",
        user_zip: "92672",
        user_blurb: "Tiny the Younger",
        user_password: ""
    }, {
        username: "Caskmaster",
        user_email: "vivanaranja+1caskmaster@gmail.com",
        user_city: "Long Beach",
        user_state: "CA",
        user_zip: "90803",
        user_blurb: "Nice to mead you",
        user_password: ""
    }]);

    // seed the crawls table
    models.Crawls.bulkCreate([{
        places_id: "ChIJK69IL_bV3IARjfT8rdzx8Xo",
        user_email: "vivanaranja+1caskmaster@gmail.com"
    }]);

    // seed the places table
    models.Places.bulkCreate([{
        places_id: "ChIJC0Th0_fV3IARsf1y9Cnl0zc",
        places_name: "Branagan's Irish Pub",
        places_address: "213 North Harbor Boulevard, Fullerton"
    }, {
        places_id: "ChIJt0I-1Akq3YARa5kFf9wDubc",
        places_name: "Back Alley Bar & Grill",
        places_address: "116 West Wilshire Avenue, Fullerton"

    }, {
        places_id: "ChIJK69IL_bV3IARjfT8rdzx8Xo",
        places_name: "Fullerton Brew Co",
        places_address: "305 North Harbor Boulevard Suite 128, Fullerton"
    }, {
        places_id: "ChIJxVDbKPbV3IARthVVgHretkk",
        places_name: "The Cellar Restaurant and Spirit Room",
        places_address: "305 N Harbor Blvd, Fullerton"
    }]);
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
    });
});