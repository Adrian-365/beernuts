// // get info from search field from the html.
// var searchParam = document.getElementById('generalSearch');
// var apiKey = 'AIzaSyAnAQs-jyK4ZZvqWDMHowl8LZm97MmHyZM';
// var searchTypes = 'bar';
// var lat = 30.267104;
// var lng = -97.743162;

// // Concatonate the search parameters
// function serialize(searchParam) {
//     var str = [];
//     for (var p in searchParam)
//         if (searchParam.hasOwnProperty(p)) {
//             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(searchParam[p]));
//         }
//     return str.join("+");
// }

// console.log(serialize({ foo: "hi there", bar: "100%" }));
// // foo=hi%20there&bar=100%25

// // Enter the search parameters into an api call to get the geocode info.
// function getLatLng() {

//     axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + searchParam + '&key=' + apiKey);
//     console.log(response);
//     // Capture the lat and lng into variables.

// }

// // search the map based on the lat lng data above, include types=bar.
// function getMap() {

//     axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lng + '&rankby=distance&libraries=places&types=' + searchTypes + '&key=' + apiKey)
//         .then(function(response) {
//             console.log(response.data); // ex.: { user: 'Your User'}
//             console.log(response.status); // ex.: 200
//             $('#googleMap').html(response);
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
//     // 	include a nested function.  If next_page_token exists, then run the search again.

// }

// getMap();

// // Function to add icons to each bar.
// // Function to create infowindow if bar icon is clicked.
// // api route to add the bar's place_id to the table if add button is clicked.
// // Logic to display the name and address of the bar in a table if button clicked.


// // var button = document.querySelector('.submit');
// // button.addEventListener('click', getMap);