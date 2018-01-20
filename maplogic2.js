// // Performing a GET request
// var searchParam = document.getElementById('generalSearch');
// var apiKey = 'AIzaSyAnAQs-jyK4ZZvqWDMHowl8LZm97MmHyZM';
// var searchTypes = 'bar';
// var lat = 30.267104;
// var lng = -97.743162;

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

// function getLatLng() {

//     axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + searchParam + '&key=' + apiKey);
//     console.log(response);


// }

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

// }

// getMap();

// // var button = document.querySelector('.submit');
// // button.addEventListener('click', getMap);