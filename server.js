//Dependancies 
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./controllers/")


//Sets up the express app
var app = express();
var port = process.env.PORT || 3000;

//Sets up express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParsesr.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Static directory 
app.use(express.static("./public"));


//Start server to begin listening 
app.listen(port, function() {
    console.log("App listening on PORT " + port);
});





