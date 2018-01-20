// a set of routes for sending users to various html files

// Dependencies
var path = require('path');

// Routes
module.exports = function(app) {

    // index route loads dummycrawlers.html
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/index.handlebars"))
    });
    app.get("/crawlers", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/dummycrawlers.html"));
    });


};