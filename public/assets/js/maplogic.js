var map;
var infowindow;
var request;
var service;
var markers = [];
var lat = 33.683015;
var lng = -117.755315;

function getURLParameters(paramName) {
    var sURL = window.document.URL.toString();
    if (sURL.indexOf("?") > 0) {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);

        var i = 0;
        for (i = 0; i < arrURLParams.length; i++) {
            var sParam = arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i = 0; i < arrURLParams.length; i++) {
            if (arrParamNames[i] == paramName) {
                //alert("Parameter:" + arrParamValues[i]);
                return arrParamValues[i];
            }
        }
        return "No Parameters Found";
    }
}
//initial map function:
function myMapx() {
    console.log('maplogic.js in the house!!');
    $(document).on('click', '.add', addPlaceIdToCrawl);

    function addPlaceIdToCrawl(event) {
        console.log("adding place")
        event.preventDefault();
        console.log("event", event)
        console.log(this);
        var pubRow = `<tr><td>${this.getAttribute("place-name")}</td><td>${this.getAttribute("place-address")}</td></tr>`;
        $("#crawlList").append(pubRow);

        var pubName = this.getAttribute("place-name");
        var pubAdress = this.getAttribute("place-address");
        var pubId = this.getAttribute('gid');

        upsertPlace({
            googlePlaceID: pubId,
            placesName: pubName,
            placesAddress: pubAdress
        });

        // A function for creating a pub to a place
        function upsertPlace(pub) {
            console.log("HEY")
            $.ajax({
                    url: "api/crawl/" + getURLParameters("crawlId") + "/add",
                    data: pub,
                    method: "POST",
                    headers: { "Authorization": "Bearer " + localStorage.getItem("token") }

                })
                .done(function(resp) {
                    console.log("DONE")
                    console.log(resp);
                })
        }

    };
    var styledMapType = new google.maps.StyledMapType(
        [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'all',
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: 'poi',
                elementType: 'all',
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: 'poi.park',
                elementType: 'all',
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: 'poi.park',
                elementType: 'all',
                stylers: [{ visibility: "off" }]
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

    //specify the map location
    var center = new google.maps.LatLng(lat, lng);
    //create map and add it to the page
    var mapDiv = document.getElementById('googleMap');
    //set the map placement and zoom
    map = new google.maps.Map(mapDiv, {
        center: center,
        zoom: 14,
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
        radius: 1600,
        // types: ['bar'],
        keyword: ['pub', 'bar', 'cocktails', 'Happy hour drinks']
    }

    infowindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input, {
        center: center,
        zoom: 14,
        disableDefaultUI: true,
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
                radius: 1600,
                // types: ['bar'],
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
                radius: 1600,
                // types: ['bar'],
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
    if (results.next_page_token) {

    }

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
        animation: google.maps.Animation.DROP,
        icon: './assets/images/beer16px.png'
    });

    //BEGIN add info tag to marker if clicked
    google.maps.event.addListener(marker, 'click', function(event) {
        console.log(place);
        var rating = place.rating;
        var ratingString = rating.toString();
        // var mapLink = "maps.google.com/maps/"+place.name
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Rating: ' + ratingString + ' / out of 5<br>' + place.vicinity + '</div>' +
            '<div class="view link"><a target="_blank" href="https://google.com/maps/place/' + place.name + '/' + place.vicinity + '"><span> View on Google Maps </span></a></div><br>' +
            // the button below should be able to return the place.place_id and add it to the table for the specific crawl
            `<div><button gid="${place.place_id}" place-name="${place.name}" place-address="${place.vicinity}" class="add" style="padding: 3px; margin-top: 4px; margin-right: 20px" >Add to Crawl!</button> ` +
            // '<button id="pass" style="padding: 3px; margin-top: 4px">Hard Pass</button>' +
            '</div>'
        );


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
            radius: 1600,
            // types: ['bar'],
            keyword: ['pub', 'bar', 'cocktails', 'Happy hour drinks']
        };
        service.nearbySearch(request, callback);
        //END find bars within addListener


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