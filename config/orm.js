// import connection to db
var connection = require('./connection.js');

// Helper function to convert object key/value pairs to SQL syntax
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        // ob[key] = ob.key
        var value = ob[key];
        if (ob.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations)
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}


var orm = {
    // selectAll grabs all from crawlers table
    selectAll: function (tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function (err, result) {
            if (err) {
                console.log(err);
            }
            cb(result);
        });
    },


};


// Export the orm object for the model (crawler.js).
module.exports = orm;