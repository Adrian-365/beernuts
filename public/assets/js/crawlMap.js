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


    // Function for retrieving pubs and getting them ready to be rendered to the page
    function getCrawlMap() {
        $.get("/api/authors", function(data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createAuthorRow(data[i]));
            }
            renderAuthorList(rowsToAdd);
            nameInput.val("");
        });
    }
    //a mocked up array of placeId's from a specific crawl already established.
    const crawlArray = [{
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
    }];

    //uses geocoder to get the lat/lang for the [0] index of the crawlArray and center the map on that place
    function getCentered() {
        var placeId = crawlArray[0].places_id;
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
        zoom: 16,
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
    ///---TRYING A DIFFERENT WAY------------------------------------------------
    // var service = new google.maps.places.PlacesService(map);

    // //search for 
    // function placeMarkers() {
    //     for (var i = 0; i < crawlArray.length; i++) {
    //         var placeId = crawlArray[i];
    //         console.log(placeId)
    //         request = {
    //             location: center,
    //             radius: 1600,
    //             placeId: placeId
    //         }
    //         service.nearbySearch(request, callback);
    //     }

    //     function callback(results, status) {
    //         console.log('callback results: ' + results);
    //         if (status == google.maps.places.PlacesServiceStatus.OK) {
    //             markers.push(createMarker(results[0]));
    //         }

    //     }

    //     function createMarker(place) {
    //         var placeLoc = place.geometry.location;
    //         var marker = new google.maps.Marker({
    //             map: map,
    //             position: place.geometry.location,
    //             animation: google.maps.Animation.DROP,
    //             icon: './public/assets/images/beer16px.png'
    //         });
    //     }
    // }
    // placeMarkers();
    ///----END DIFFERENT WAY-----------------

    function placeMarkers() {
        for (var i = 0; i < crawlArray.length; i++) {
            var placeId = crawlArray[i].places_id;
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

    // Below the map, render an unordered list with the name and address of each place on the map.  Include corresponding number starting at 1.
    // function createList() {
    //     far(var i = 0; i < carwlArray.length; i++) {

    //         var pubRow = `<tr><td>${place.name}</td><td>${place.vicinity}</td></tr>`;
    //         $("#crawlList").append(pubRow);
    //     }

    // };

    function createList() {
        for (var i = 0; i < crawlArray.length; i++) {

            var pubRow = `<tr><td>${crawlArray[i].places_name}</td><td>${crawlArray[i].places_address}</td></tr>`;
            $("#crawlList").append(pubRow);
        }

    };
    createList();




};





//END myMap2()