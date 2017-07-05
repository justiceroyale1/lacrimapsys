

/* global google, e, CrimeIncident, Station, Outpost */

function Lacrimapsys(elementId) {
//    this.crimeOptions = "";
//    this.staionOptions = "";
//    this.outpostOptions = "";
//    this.patrolOptions = "";

    Lacrimapsys.clicks = 0;
// Create a new StyledMapType object, passing it an array of styles,
// and the name to be displayed on the map type control.
    var defaultMap = new google.maps.StyledMapType(
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
    // Default map properties.
    var mapProp = {
        center: new google.maps.LatLng(8.494239, 8.516786),
        rotateControl: true,
        zoom: 15,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'],
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
    };
    Lacrimapsys.map = new google.maps.Map(document.getElementById(elementId), mapProp);
    //Associate the styled map with the MapTypeId and set it to display.
    Lacrimapsys.map.mapTypes.set('styled_map', defaultMap);
    Lacrimapsys.map.setMapTypeId('styled_map');
}

Lacrimapsys.prototype.clickHandler = function (options) {
    // add click action listener to the map reference.
    Lacrimapsys.map.addListener("click", function (event) {
        if (Lacrimapsys.clicks === 0) {
            // ensure there are no messages, if there are delete them first.
            if (Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].getArray().length > 0) {
                Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
            }
            // increase number of clicks
            Lacrimapsys.clicks++;
            // create and display a feature marker on the map.
            Lacrimapsys.featureMarker = new google.maps.Marker({
                position: event.latLng,
                map: Lacrimapsys.map
            });
            // add click action listener to the feature marker.
            google.maps.event.addListener(Lacrimapsys.featureMarker, "click", function (e) {
                // create and add an info window on the map.
                Lacrimapsys.infoWindow = Lacrimapsys.createInfoWindow(e, options);
                Lacrimapsys.infoWindow.addListener('closeclick', function () {
                    // remove all feature forms.
                    $("#crime").remove();
                    $("#station").remove();
                    $("#outpost").remove();
                    $("#patrol").remove();
                    Lacrimapsys.featureMarker.setMap(null);
                    Lacrimapsys.clicks = 0;
                });
                Lacrimapsys.infoWindow.open(Lacrimapsys.map, Lacrimapsys.featureMarker);
            });
            // add double click action listener to the feature marker.
            Lacrimapsys.featureMarker.addListener("dblclick", function () {
                // remove the feature marker from the map.
                Lacrimapsys.featureMarker.setMap(null);
                Lacrimapsys.clicks = 0;
                Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
            });
        } else {
            // create and display an error message.
            var messageBoxDiv = document.createElement('div');
            Lacrimapsys.createMessageBox(messageBoxDiv, "You can not create more than 1 feature at a time. Double click on the marker the remove it.", '1');
            // ensure there are no other messages before displaying. If there is, delete the message then display
            if (Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].getArray().length === 0) {
                Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBoxDiv);
            } else {
                Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
                Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBoxDiv);
            }

        }
    });
};

Lacrimapsys.displayFeatures = function (features) {
    // Create markers.
    features.forEach(function (feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: feature.icon,
            title: feature.type,
            map: Lacrimapsys.map
        });
    });
};

Lacrimapsys.createFeatureForm = function (id, options) {
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
    $("#" + id).hide(); // hide feature form
};

Lacrimapsys.createInfoWindow = function (event, formOptions) {
//    var formOptions = "<option>select feature</option>"
//            + "<option value='1'>Crime</option>"
//            + "<option value='2'>Station</option>"
//            + "<option value='3'>Oupost</option>"
//            + "<option value='4'>Patrol</option>";
    // create feature form
    Lacrimapsys.createFeatureForm("form", formOptions);
    $("#form").show(); // show feature form
    // create infoWindow with feature form
    return new google.maps.InfoWindow({
        content: document.getElementById("form"),
        position: event.latLng
    });
};
Lacrimapsys.featureChangeHandler = function (options) {
    Lacrimapsys.options = "";
    // switch the value of the element
    switch ($("#feature").val()) {
        case '1':
        {
            var crimesRef = options.data.database.ref("crimes/");

            if ($("#crime").length === 0) {
                CrimeIncident.addFeatureHandler(crimesRef);
            } else {
                var messageBoxDiv = document.createElement('div');
                Lacrimapsys.createMessageBox(messageBoxDiv, "You can not add more than 1 crime at a time.", '1');
                if (Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].getArray().length === 0) {
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBoxDiv);
                } else {
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBoxDiv);
                }
            }

            break;
        }
        case '2':
        {
            if ($("#station").length === 0) {
                Station.addFeatureHandler();
            } else {
                var messageBoxDiv = document.createElement('div');
                Lacrimapsys.createMessageBox(messageBoxDiv, "You can not add more than 1 station at a time.", '1');
                if (Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].getArray().length === 0) {
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBoxDiv);
                } else {
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBoxDiv);
                }
            }
            break;
        }

        case '3':
        {
            var stationsRef = options.data.database.ref("stations/");
            if ($("#outpost").length === 0) {
                Outpost.addFeatureHandler(stationsRef);
            } else {
                var messageBoxDiv = document.createElement('div');
                Lacrimapsys.createMessageBox(messageBoxDiv, "You can not add more than 1 outpost at a time.", '1');
                if (Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].getArray().length === 0) {
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBoxDiv);
                } else {
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBoxDiv);
                }
            }
            break;
        }

        case '4':
        {
            var stationsRef = options.data.database.ref("stations/");
            if ($("#patrol").length === 0) {
                Patrol.addFeatureHandler(stationsRef);
            } else {
                var messageBoxDiv = document.createElement('div');
                Lacrimapsys.createMessageBox(messageBoxDiv, "You can not add more than 1 patrol at a time.", '1');
                if (Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].getArray().length === 0) {
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBoxDiv);
                } else {
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
                    Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBoxDiv);
                }
            }

            break;
        }
    }


};
/**
 * 
 * @param {String} controlDiv
 * @param {String} text
 * @param {String} state
 * @returns {void}
 */
Lacrimapsys.createMessageBox = function (controlDiv, text, state) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    switch (state) {
        case '1' :
        {
            controlUI.style.backgroundColor = '#f00';
            controlUI.style.border = '2px solid #f00';
            break;
        }
        case '0' :
        {
            controlUI.style.backgroundColor = '#0f0';
            controlUI.style.border = '2px solid #0f0';
            break;
        }
        default :
        {
            controlUI.style.backgroundColor = '#fff';
            controlUI.style.border = '2px solid #fff';
        }
    }
//    controlUI.style.backgroundColor = '#fff';
//    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '150%';
    controlText.style.padding = '6px';
    controlText.textContent = text;
    controlUI.appendChild(controlText);
};
Lacrimapsys.createCrimeFeatureForm = function (id, options) {
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

            + '<div>'
            + '<label for="form-field-select-1">Crime</label>'
            + '<select class="form-control" id="crimeType">'
            + options
            + '</select>'
            + '</div>'
            + '</fieldset>'

            + '<div class="form-actions center">'
            + '<button id="cancelCrimeBtn" type="reset" class="btn btn-sm btn-default">'
            + 'Cancel'
            + '</button>'
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
//    $("#success").hide();
};
Lacrimapsys.createStationFeatureForm = function (id) {
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

            + '<div>'
            + '<label for="form-field-select-1">Station</label>'
            + '<input type="text" class="form-control" id="command" required/>'
            + '</div>'
            + '</fieldset>'

            + '<div class="form-actions center">'
            + '<button id="cancelCommBtn" type="reset" class="btn btn-sm btn-default">'
            + 'Cancel'
            + '</button>'
            + '<button id="saveStationBtn" type="button" class="btn btn-sm btn-success">'
            + 'Submit'
            + '<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>'
            + '</button>'
            + '</div>'
            + '</form>'
            + '</div>'
            + '</div>'
            + '</div>';
    $("#map-canvas").append(formDiv);
//    $("#success").hide();
};
Lacrimapsys.createOutpostFeatureForm = function (id, options) {
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

            + '<div>'
            + '<label for="form-field-select-1">Outpost</label>'
            + '<input type="text" class="form-control" id="outpostName" required/>'
            + '</div>'
            + '<div>'
            + '<select id="o_command" class="form-control">'
            + '<option>select a command station</option>'
            + options
            + '</select>'
            + '</div>'
            + '</fieldset>'

            + '<div class="form-actions center">'
            + '<button id="cancelOupostBtn" type="reset" class="btn btn-sm btn-default">'
            + 'Cancel'
            + '</button>'
            + '<button id="saveOutpostBtn" type="button" class="btn btn-sm btn-success">'
            + 'Submit'
            + '<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>'
            + '</button>'
            + '</div>'
            + '</form>'
            + '</div>'
            + '</div>'
            + '</div>';
    $("#map-canvas").append(formDiv);
//    $("#success").hide();
};
Lacrimapsys.createPatrolFeatureForm = function (id, options) {
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

            + '<div>'
            + '<label for="form-field-select-1">Patrol</label>'
            + '<input type="text" class="form-control" id="patrolName" required/>'
            + '</div>'
            + '<div>'
            + '<select id="p_command" class="form-control">'
            + '<option>select a command station</option>'
            + options
            + '</select>'
            + '</div>'
            + '</fieldset>'

            + '<div class="form-actions center">'
            + '<button id="cancelPatrolBtn" type="reset" class="btn btn-sm btn-default">'
            + 'Cancel'
            + '</button>'
            + '<button id="savePatrolBtn" type="button" class="btn btn-sm btn-success">'
            + 'Submit'
            + '<i class="ace-icon fa fa-arrow-right icon-on-right bigger-110"></i>'
            + '</button>'
            + '</div>'
            + '</form>'
            + '</div>'
            + '</div>'
            + '</div>';
    $("#map-canvas").append(formDiv);
//    $("#success").hide();
};
Lacrimapsys.displayMessage = function (messageBox, errorString, type) {
    Lacrimapsys.createMessageBox(messageBox, errorString, type);
    // ensure there are no other messages before displaying. If there is, delete the message then display
    if (Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].getArray().length === 0) {
        Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBox);
    } else {
        Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
        Lacrimapsys.map.controls[google.maps.ControlPosition.TOP_CENTER].push(messageBox);
    }
};

