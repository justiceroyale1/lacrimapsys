
/* global google */

$(document).ready(function () {/* google maps -----------------------------------------------------*/
//google.maps.event.addDomListener(window, 'load', initMap);


        /* position Amsterdam */
//  var latlng = new google.maps.LatLng(52.3731, 4.8922);
//
//  var mapOptions = {
//    center: latlng,
//    scrollWheel: false,
//    zoom: 13
//  };
//  
//  var marker = new google.maps.Marker({
//    position: latlng,
//    url: '/',
//    animation: google.maps.Animation.DROP
//  });
//  
//  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//  marker.setMap(map);

        var map;
        function initMap() {
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3),
                mapTypeId: 'terrain'
            });

            // Create a <script> tag and set the USGS URL as the source.
            var script = document.createElement('script');
            // This example uses a local copy of the GeoJSON stored at
            // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
            script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        
        initMap();

    /* end google maps -----------------------------------------------------*/
});