/* map.js
 * This file contains functions that may be used to 
 * create and manipulate the map.
 * 
 */

/* global google, infowindow */

/**
 * Array of strings representing days in a week.
 * @type Array
 */
var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/**
 * Array of strings representing months in a year.
 * @type Array
 */
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * A reference to the map object.
 * @type google.map.Maps
 */
var map;

/**
 * The map's properties.
 * @type google.map.MapOptions
 */
var mapProp;

/**
 * The marker that is used to create features on the map.
 * @type google.maps.Marker
 */
//var featureMarker;

/**
 * The default map style.
 * @type google.maps.StyledMapType
 */
var defaultMap;


/**
 * The element that contains the map.
 * @type DOM element
 */
var mapContainer;

/**
 * The infowindow displayed on the map.
 * @type google.maps.InfoWindow
 */
var infoWindow;

/**
 * This stores data about the crime incident
 * @type Object
 */
var crimeData = {
    crime: null,
    lat: null,
    lng: null,
    timestamp: null,
    year: null,
    month: null,
    day: null,
    response: false
};

/**
 * This function initializes the map,
 * creates and adds the default style to the map, 
 * and displays the map.
 * @returns {void}
 */
function initMap() {
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    defaultMap = new google.maps.StyledMapType(
            [
                {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
                {
                    featureType: 'administrative',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#c9b2a6'}]
                },
                {
                    featureType: 'administrative.land_parcel',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#dcd2be'}]
                },
                {
                    featureType: 'administrative.land_parcel',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#ae9e90'}]
                },
                {
                    featureType: 'landscape.natural',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                },
                {
                    featureType: 'landscape.man_made',
                    elementType: 'geometry',
                    stylers: [{color: '#ddff2ae'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#93817c'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry.fill',
                    stylers: [{color: '#a5b076'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#447530'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#ff5555'}]
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'geometry',
                    stylers: [{color: '#fdfcf8'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#f8c967'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#e9bc62'}]
                },
                {
                    featureType: 'road.highway.controlled_access',
                    elementType: 'geometry',
                    stylers: [{color: '#e98d58'}]
                },
                {
                    featureType: 'road.highway.controlled_access',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#db8555'}]
                },
                {
                    featureType: 'road.local',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#806b63'}]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#8f7d77'}]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#ebe3cd'}]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry.fill',
                    stylers: [{color: '#b9d3c2'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#92998d'}]
                }
            ],
            {name: 'Default Map'});

    mapProp = {
        center: new google.maps.LatLng(8.494239, 8.516786),
        rotateControl: true,
        zoom: 15,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'],
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
    };
    mapContainer = document.getElementById("map-canvas");

    map = new google.maps.Map(mapContainer, mapProp);
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', defaultMap);
    map.setMapTypeId('styled_map');
}

/**
 * This function resizes the map when the mapContainer width is increased.
 * @returns {void}
 */
function resizeMap() {
    google.maps.event.trigger(map, "resize");
}

function createAddFeatureForm(id, options) {

    var formDiv = '<div id="' + id + '">'
            + '<table>'
            + '<tr>'
            + '<td>Feature:</td>'
            + '<td>'
            + '<select id="feature">'
            + options
            + '</select>'
            + '</td>'
            + '</tr>'
            + '</table>'
            + '</div>';

    $("#map-canvas").append(formDiv);
    $("#" + id).hide();
}

function clickCreateMarker() {
    var featureMarker;
    var formOptions = "<option>select feature</option>"
            + "<option value='1'>Crime</option>"
            + "<option value='2'>Police Station</option>"
            + "<option value='3'>Oupost</option>"
            + "<option value='4'>Patrol</option>";

    createAddFeatureForm("form", formOptions);
    // initialise infoWindow
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById("form")
    });

    map.addListener("click", function (event, featureMarker) {
        featureMarker = new google.maps.Marker({
            position: event.latLng,
            map: map
        });


        google.maps.event.addListener(featureMarker, "click", function () {
            infoWindow.open(map, featureMarker);
        });
        $("#form").show();

    });
    return featureMarker;
}

function createCrimeFeatureForm(id, options) {
    var formDiv = '<div id=' + id + ' class="col-xs-12 col-sm-4">'
            + '<div class="widget-box">'
            + '<div class="widget-header">'
            + '<h4 class="widget-title">Add feature</h4>'
            + '<span class="widget-toolbar">'
            + '<a href="#" data-action="close">'
            + '<i class="ace-icon fa fa-times"></i>'
            + '</a>'
            + '</span>'
            + '</div>'
            + '<div class="widget-body">'

            + '<div class="widget-main no-padding">'
            + '<form>'
            + '<fieldset>'

            + '<div class="col-md-12">'
            + '<div id="success" class="alert alert-success">'
            + '<button type="button" class="close" data-dismiss="alert">'
            + '<i class="ace-icon fa fa-times"></i>'
            + '</button>'
            + '<p id="success-string">'
            + '<i class="ace-icon fa fa-check"></i>'
            + ""
            + '</p>'
            + '</div>'
            + '</div>'

            + '<div class="col-md-12">'
            + '<div id="error" class="alert alert-danger">'
            + '<button type="button" class="close" data-dismiss="alert">'
            + '<i class="ace-icon fa fa-times"></i>'
            + '</button>'

            + '<p id="error-string">'
            + '<i class="ace-icon fa fa-times"></i>'
            + ""
            + '</p>'
            + '</div>'
            + '</div>'

            + '<div>'
            + '<label for="form-field-select-1">Default</label>'
            + '<select class="form-control" id="crime">'
            + options
            + '</select>'
            + '</div>'
            + '</fieldset>'

            + '<div class="form-actions center">'
            + '<button id="saveCrimeBtn" type="button" class="btn btn-sm btn-success">'
            + 'Submit'
            + '<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>'
            + '</button>'
            + '</div>'
            + '</form>'
            + '</div>'
            + '</div>'
            + '</div>';

    $("#map-canvas").append(formDiv);
    $("#success").hide();
}

function saveAnalysis() {

}

function latIsValid(lat) {
    return ((Math.abs(lat) >= 0) || (Math.abs(lat) <= 90));
}

function lngIsValid(lng) {
    return ((Math.abs(lng) >= 0) || (Math.abs(lng) <= 180));
}

/**
 * This method is used to retrieve the crime data.
 * @param {Number} timestamp
 * @param {Number} year
 * @param {Number} month
 * @param {Number} day
 * @returns {crimeData}
 */
function getCrimeData(lat, lng, timestamp, year, month, day) {
    if (latIsValid(lat) && lngIsValid(lng)) {
        crimeData.crime = escape($("#crime").attr('selected'));
        crimeData.lat = lat;
        crimeData.lng = lng;
        crimeData.timestamp = timestamp;
        crimeData.year = year;
        crimeData.month = MONTHS[month];
        crimeData.day = DAYS[day];

        return crimeData;
    } else {
        $("#errorString").append("Invalid location!");
        return null;
    }

}

function createSuccessMessage(message) {
    var successDiv = '<div class="col-md-12">'
            + '<div id="success" class="alert alert-success">'
            + '<button type="button" class="close" data-dismiss="alert">'
            + '<i class="ace-icon fa fa-times"></i>'
            + '</button>'
            + '<p>'
            + '<i class="ace-icon fa fa-check"></i>'
            + message
            + '</p>'
            + '</div>'
            + '</div>';
    //var divWrap = document.createElement("div");
    return $("#map-container").append(successDiv);
    //divWrap.appendChild(document.getElementById("success"));
    //map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById("success"));
}

function makeInfoBox(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '6px';
    controlText.textContent = 'The map shows all clicks made in the last 10 minutes.';
    controlUI.appendChild(controlText);
}


//function saveCrimeData(data, analysisRef){
//    if(data){
//        var yearPath = analysisRef.child("year/" + data.year);
//        yearPath.transaction(function(post){
//            if(post.total){
//                post.total++;
//            }else{
//                post.total = 1;
//            }
//        });
//    }
//}