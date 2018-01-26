require("dotenv").config();

//Dependancies 
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var hbs = require('express-handlebars');
var apiRoutes = require('./controllers/api_controller.js');
var authRoutes = require("./controllers/auth_ctrl");
var handlebarsRoutes = require('./controllers/handlebars_controller.js');
var models = require("./models");
var path = require('path');
var cookieParser = require('cookie-parser');
var jwt = require("jsonwebtoken");
var nonAuthHbsRoutes = require("./controllers/non.auth.hbs.routes");
var authHelpers = require("./helpers/auth.helpers")
    //Sets up the express app
var app = express();
// override with POST having ?_method=PUT(or DELETE)
app.use(methodOverride('_method'));
// Sets an initial port
var port = process.env.PORT || 3000;

//Sets up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

app.use(cookieParser());

var auth = function(req, res, next) {
    try {
        console.log("COOKIE AUTH", req.get("Authorization"));
        var token = req.cookies.token || req.get("Authorization").split(" ")[1]
        console.log(token);
        try {
            console.log("we trying")
            jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (err) {
            console.log("we failin", err)
            throw new Error("Not Authenticated");
        }
    } catch (err) {
        console.log("something is really wrong", err)
        throw new Error("Not Authenticated");
    }

}

//needed for google maps search
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.engine('handlebars', hbs({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'handlebars');
// Serve static content from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use("/auth", authRoutes)
app.use('/', nonAuthHbsRoutes);
app.use(auth);
app.use('/', handlebarsRoutes);
app.use("/api", apiRoutes);


var insecSalt = authHelpers.getSalt();

//Start server to begin listening 
models.sequelize.sync({
    force: true
}).then(function() {
    // run the sql query to seed db here
    // seed the crawlers table
    models.Crawler.bulkCreate([{
        username: "BeerMe",
        email: "vivanaranja+1beerme@gmail.com",
        city: "Irvine",
        state: "CA",
        zip: "92602",
        blurb: "Here to beer",
        salt: insecSalt,
        hash: authHelpers.getHash("meme", insecSalt)
    }, {
        username: "Pilsneresque",
        email: "vivanaranja+1pilsneresque@gmail.com",
        city: "San Clemente",
        state: "CA",
        zip: "92672",
        blurb: "Tiny the Younger",
        salt: insecSalt,
        hash: authHelpers.getHash("meme", insecSalt)
    }, {
        username: "Caskmaster",
        email: "asd@asd.net",
        city: "Long Beach",
        state: "CA",
        zip: "90803",
        blurb: "Nice to mead you",
        salt: insecSalt,
        hash: authHelpers.getHash("meme", insecSalt)
    }]);

    // seed the crawls table
    // models.Crawls.bulkCreate([{
    //     placesID: "ChIJK69IL_bV3IARjfT8rdzx8Xo",
    //     crawlerID: "1"
    // }, {
    //     placesID: "ChIJK69IL_bV3IARjfT8rdzx8Xo",
    //     crawlerID: "1"
    // }, {
    //     placesID: "ChIJxVDbKPbV3IARthVVgHretkk",
    //     crawlerID: "2"
    // }]);

    // seed the places table
    models.Places.bulkCreate([{
        googlePlaceID: "ChIJC0Th0_fV3IARsf1y9Cnl0zc",
        placesName: "Branagan's Irish Pub",
        placesAddress: "213 North Harbor Boulevard, Fullerton"
    }, {
        googlePlaceID: "ChIJt0I-1Akq3YARa5kFf9wDubc",
        placesName: "Back Alley Bar & Grill",
        placesAddress: "116 West Wilshire Avenue, Fullerton"

    }, {
        googlePlaceID: "ChIJK69IL_bV3IARjfT8rdzx8Xo",
        placesName: "Fullerton Brew Co",
        placesAddress: "305 North Harbor Boulevard Suite 128, Fullerton"
    }, {
        googlePlaceID: "ChIJxVDbKPbV3IARthVVgHretkk",
        placesName: "The Cellar Restaurant and Spirit Room",
        placesAddress: "305 N Harbor Blvd, Fullerton"
    }]);
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
    });
});