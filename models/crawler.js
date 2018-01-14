// Import the ORM to create functions that will interact with the database.
var orm = require('../config/orm.js');

var crawler = {
    selectAll: function (cb) {
        orm.selectAll('crawlers', function (res) {
            cb(res);
        });
    },  

};

module.exports = crawler;