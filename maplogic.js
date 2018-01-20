var map;
var infowindow;
var request;
var service;
var markers = [];
var lat = 33.683015;
var lng = -117.755315;

//initial map function:
function myMapx() {

    var styledMapType = new google.maps.StyledMapType(
        [
            { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
            {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#c9b2a6' }]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#dcd2be' }]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#ae9e90' }]
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#93817c' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{ color: '#a5b076' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#447530' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#f5f1e6' }]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{ color: '#fdfcf8' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#f8c967' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#e9bc62' }]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{ color: '#e98d58' }]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#db8555' }]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#806b63' }]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#8f7d77' }]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#ebe3cd' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{ color: '#dfd2ae' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{ color: '#3486db' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#2998d' }]
            }
        ], { name: 'Styled Map' });

    //specify the map location
    var center = new google.maps.LatLng(lat, lng);
    //create map and add it to the page
    var mapDiv = document.getElementById('googleMap');
    //set the map placement and zoom
    map = new google.maps.Map(mapDiv, {
        center: center,
        zoom: 15,
        mapTypeControloptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'
            ]
        }
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map')

    //----------------------------------------
    //----------------------------------------

    //search for bars within 1 mile
    request = {
        location: center,
        radius: 1609,
        // types: ['bar', 'night_club'],
        keyword: ['pub', 'bar', 'cocktails', 'Happy hour drinks']
    }

    infowindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input, {
        center: center,
        zoom: 10,
        mapTypeControloptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'
            ]
        }
    });
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });


    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            //find bars within listener ------------------.
            request = {
                location: place.geometry.location,
                radius: 1609,
                // types: ['bar', 'night_club'],
                keyword: ['pub', 'bar', 'cocktails', 'Happy hour drinks']
            };
            service.nearbySearch(request, callback);
            //END find bars withing addListener

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
    //   }
    ////new new new END

    //listener to recenter map if right clicked
    google.maps.event.addListener(map, 'rightclick', function(event) {
            map.setCenter(event.latLng)
                //clear existing markers
            clearResults(markers)

            //find bars within listener ------------------.
            request = {
                location: event.latLng,
                radius: 1609,
                // types: ['bar', 'night_club'],
                keyword: ['pub', 'bar', 'cocktails', 'Happy hour drinks']
            };
            service.nearbySearch(request, callback);
            //END find bars withing addListener

        }) //END Listner---------

} //END initial map function


//BEGIN marker
//BEGIN create virtual marker begin -------------------

function callback(results, status) {
    console.log(results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
        }
    }
}
//END create virtual marker  ------

//BEGIN place marker--------
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: '.public/assets/images/beer16px.png'
    });

    //BEGIN add info tag to marker if clicked
    google.maps.event.addListener(marker, 'click', function() {
        var rating = place.rating;
        var ratingString = rating.toString();
        // var mapLink = "maps.google.com/maps/"+place.name
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Rating: ' + ratingString + ' / out of 5<br>' + place.vicinity + '</div>' +
            '<div class="view link"><a target="_blank" href="https://google.com/maps/place/' + place.name + '"><span> View on Google Maps </span></a><br>' +
            // the button below should be able to return the place.place_id and add it to the table for the specific crawl
            '<button value= "' + place.place_id + '"id="add" style="padding: 3px; margin-top: 4px; margin-right: 20px">Add to Crawl!</button>' +
            // '<button id="pass" style="padding: 3px; margin-top: 4px">Hard Pass</button>' +
            '</div>'
        );
        $(document).on('click', '#add', addPlaceIdToCrawl);

        function addPlaceIdToCrawl(event) {
            var placeID = this.value;
            console.log('place.place_id:  ' + placeID)
                // insertToCrawl({
                //     googleID: placeID
                // });
        }
        infowindow.open(map, this);
    });
    //END add info tag to marker
    return marker;
}
//END place marker 

function clearResults(markers) {
    for (var m in markers) {
        markers[m].setMap(null)
    }
}
markers = []

//END marker

// Try HTML5 geolocation.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        infowindow.setPosition(pos);
        infowindow.setContent('Location found.');
        infowindow.open(map);
        map.setCenter(pos);
        //find bars within listener ------------------.
        var request = {
            location: pos,
            radius: 1609,
            // types: ['bar', 'night_club'],
            keyword: ['pub', 'bar', 'cocktails', 'Happy hour drinks']
        };
        service.nearbySearch(request, callback);
        //END find bars withing addListener


    }, function() {
        handleLocationError(true, infowindow, map.getCenter());
    });



} else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infowindow, map.getCenter());
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infowindow.setPosition(pos);
    infowindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infowindow.open(map);

}
// END HTML5 geolocation....