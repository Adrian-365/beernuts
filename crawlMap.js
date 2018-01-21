// Map that searches based on the first place_id of a table.
// Adds an icon for each place id

// A get request to get all the placeId's that share a specific crawlId.
// Place those placeId's in an array.
// Render a google map centered on the [0] index placeId (or it's lat lng?)
function myMap2() {
    //map styliztion stuff:
    var styledMapType = new google.maps.StyledMapType(
        [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'poi.business',
                stylers: [{ visibility: 'off' }]
            }
        ], { name: 'Styled Map' });

    //define geocoder as the google maps Geocoder method
    var geocoder = new google.maps.Geocoder();

    //a mocked up array of placeId's from a specific crawl already established.
    const crawlArray = ['ChIJgSeZiffV3IARPJViPs1jCyc', 'ChIJ7U9Bi_fV3IARnCKGfwemsT0', 'ChIJ9X6K8_fV3IARGSCFK4fZdfA', 'ChIJS_eL7_fV3IARkt2OQsEGH7E', 'ChIJC0Th0_fV3IARsf1y9Cnl0zc']

    //uses geocoder to get the lat/lang for the [0] index of the crawlArray and center the map on that place
    function getCentered() {
        var placeId = crawlArray[0];
        geocoder.geocode({ 'placeId': placeId }, function(results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    };
    //calls the above function
    getCentered();

    //lat lng of Las Vegas dowtown for some reason.
    var lat = 36.168347;
    var lng = -115.138271;

    //specify the map location
    var center = new google.maps.LatLng(lat, lng);
    //create map and add it to the page
    var mapDiv = document.getElementById('googleMap2');
    //set the map placement and zoom
    map = new google.maps.Map(mapDiv, {
        center: center,
        zoom: 17,
        mapTypeControloptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'
            ]
        }
    });
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    //loop through the crawlArray and get a marker for each placeId.
    const markers = [];

    function placeMarkers() {
        for (var i = 0; i < crawlArray.length; i++) {
            var placeId = crawlArray[i];
            geocoder.geocode({ 'placeId': placeId }, function(results, status) {
                if (status == 'OK') {
                    // markers.push(createMarker(results[0].geometry.location))
                    const marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        animation: google.maps.Animation.DROP,
                        icon: './public/assets/images/beer16px.png'
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });

        }
        console.log(markers)

    };
    //calls the above function
    placeMarkers();

    //BEGIN add info tag to marker if clicked
    //     google.maps.event.addListener(marker, 'click', function() {
    //         var rating = place.rating;
    //         var ratingString = rating.toString();
    //         // var mapLink = "maps.google.com/maps/"+place.name
    //         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
    //             'Rating: ' + ratingString + ' / out of 5<br>' + place.vicinity + '</div>' +
    //             '<div class="view link"><a target="_blank" href="https://google.com/maps/place/' + place.name + '"><span> View on Google Maps </span></a><br>' +
    //             // the button below should be able to return the place.place_id and add it to the table for the specific crawl
    //             '<button value="' + place.place_id + '" id="add" style="padding: 3px; margin-top: 4px; margin-right: 20px">Add to Crawl!</button>' +
    //             // '<button id="pass" style="padding: 3px; margin-top: 4px">Hard Pass</button>' +
    //             '</div>'
    //         );
    //         $(document).one('click', '#add', addPlaceIdToCrawl);

    //         function addPlaceIdToCrawl(event) {
    //             var placeID = this.value;
    //             console.log('place.place_id:  ' + placeID)
    //                 // insertToCrawl({
    //                 //     googleID: placeID
    //                 // });
    //         };
    //         infowindow.open(map, this);
    //     });
    //     //END add info tag to marker
    //     return marker;
};
// END place marker 
// In the info window, display the number
// Below the map, render an unordered list with the name and address of each place on the map.  Include corresponding number starting at 1.


//END myMap2()