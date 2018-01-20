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
var port = process.env.PORT || 3000;

//Sets up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use('/', handlebarsRoutes);
app.use("/api", apiRoutes);

// Serve static content from the public directory
app.use(express.static("./public"));

//Start server to begin listening 
models.sequelize.sync({ force: true }).then(function () {
    // run the sql query to seed db here
    models.Crawler.bulkCreate([{ username: "BeerMe", user_email: "vivanaranja+1beerme@gmail.com", user_city: "Irvine", user_state: "CA", user_zip: "92602", user_blurb: "Here to beer", user_password: "flimflam" }, { username: "Pilsneresque", user_email: "vivanaranja+1pilsneresque@gmail.com", user_city: "San Clemente", user_state: "CA", user_zip: "92672", user_blurb: "Tiny the Younger", user_password: "triangletime" }, { username: "Caskmaster", user_email: "vivanaranja+1caskmaster@gmail.com", user_city: "Long Beach", user_state: "CA", user_zip: "90803", user_blurb: "Nice to mead you", user_password: "showmethedubble" }]);
    models.Crawls.bulkCreate([{ placeId: "ChIJ7YHUCyAw3YARfZ79M1J6u68" }, { placeId: "ChIJuYNGVh4w3YARFyshF6Esgt0" }, { placeId: "ChIJ4QrZWB4w3YARtw_bH88lsjI" }, { placeId: "ChIJI9IA4SQw3YARL-56ZCO4KiM"}]);
    app.listen(port, function () {
        console.log("App listening on PORT " + port);
    });
});





