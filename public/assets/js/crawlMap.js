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

    //define geocoder as the google maps Geocoder method
    var geocoder = new google.maps.Geocoder();

    // Function for retrieving pubs and getting them ready to be rendered to the page

    //Below gets the crawlID from the url
    var url_string = window.location.href;
    var url = new URL(url_string);
    var crawlId = url.searchParams.get("crawlId");
    console.log('crawlId = ' + crawlId);
    //this establishes an empty array where we are going to put our places objects (the names, addresses and googleId's of the pubs in this crawl)
    const crawlArray = [];

    function getThisCrawl(id) {
        $.get('api/crawl/' + crawlId, makeCrawlArray);
    };

    function makeCrawlArray(data) {
        // console.log(data[0])
        for (var i = 0; i < data.length; i++) {
            crawlArray.push(data[i]);
        };
        getCentered(crawlArray);
    };

    //uses geocoder to get the lat/lang for the [0] index of the crawlArray and center the map on that place
    function getCentered(crawlArray) {
        console.log("in getCenterd:  " + crawlArray);
        var placeId = crawlArray[0].googlePlaceID;
        console.log(placeId);
        geocoder.geocode({ 'placeId': placeId }, function(results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
        placeMarkers(crawlArray)
    };


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

    function placeMarkers(crawlArray) {
        console.log("in placeMarkers:  " + crawlArray);
        for (var i = 0; i < crawlArray.length; i++) {
            var placeId = crawlArray[i].googlePlaceID;
            geocoder.geocode({ 'placeId': placeId }, function(results, status) {
                if (status == 'OK') {
                    // markers.push(createMarker(results[0].geometry.location))
                    const marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        animation: google.maps.Animation.DROP,
                        icon: './assets/images/beer16px.png'
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });

        }
        createList(crawlArray);
    };


    function createList() {
        console.log("in createList:  " + crawlArray);
        for (var i = 0; i < crawlArray.length; i++) {

            var pubRow = `<tr><td>${crawlArray[i].placesName}</td><td>${crawlArray[i].placesAddress}</td></tr>`;
            $("#crawlList").append(pubRow);
        }

    };


    // calling the above function to get the crawlArray populated with the pubs from this crawl
    getThisCrawl();
};
//END myMap2()