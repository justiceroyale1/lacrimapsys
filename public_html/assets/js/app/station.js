/* global Feature, Lacrimapsys, google, _ */

function Station(featureType, lat, lng, command) {
    Feature.call(this, featureType, lat, lng);
    
    if (Feature.isEmpty(command)) {
        // remove all feature forms.
        $("#station").remove();
        Lacrimapsys.featureMarker.setMap(null);
        Lacrimapsys.clicks = 0;
        var messageBoxDiv = document.createElement('div');
        // display error message
        Lacrimapsys.displayMessage(messageBoxDiv, "You must have forgotten to enter a name for the station, please try again.", '1');
    } else {
        this.command = command;
    }

    this.numOfOfficers = 0;
    this.numOfResponses = 0;
}


/**
 * This function returns an object which represents the station
 * that can be stored in the database.
 * @returns {Station.prototype.getStationData.featureAnonym$1}
 */
Station.prototype.getStationData = function () {
    return {
        command: this.command,
        lat: this.lat,
        lng: this.lng,
        num_of_officers: this.numOfOfficers,
        num_of_responses: this.numOfResponses,
        feature_type: this.featureType
    };
};
/**
 * This function returns the command of the station.
 * @returns {String}
 */
Station.prototype.getCommand = function () {
    return this.command;
};
/**
 * This function sets the station's command.
 * @param {type} comm
 * @returns {void}
 */
Station.prototype.setCommand = function (comm) {
    this.command = comm;
};
/**
 * This function returns the number of officers at a station.
 * @returns {Number}
 */
Station.prototype.getNumOfOfficers = function () {
    return this.numOfOfficers;
};
/**
 * This function sets the number of officers at a station.
 * @param {Number} numberOfOfficers
 * @returns {void}
 */
Station.prototype.setNumOfOfficers = function (numberOfOfficers) {
    this.numOfOfficers = numberOfOfficers;
};
/**
 * This function returns the number of responses the station has made
 * @returns {Number}
 */
Station.prototype.getNumOfResponses = function () {
    return this.numOfResponses;
};
/**
 * This function sets the number of responses the station has made.
 * @param {Number} numberOfResponses
 * @returns {void}
 */
Station.prototype.setNumOfResponses = function (numberOfResponses) {
    this.numOfResponses = numberOfResponses;
};

Station.saveData = function (database, station) {
    var stationsRef = database.ref("stations/");
    stationsRef.push(station.getStationData(), function () {
//        var analysisRef = database.ref().child("analysis/");
        // TODO: Test these later : Done
//        var analyzer = new Analyzer(analysisRef, station);
//        analyzer.performTimeBasedAnalysis();
//        analyzer.performCrimeBasedAnalysis();
        // remove add station feature form
        $("#station").remove();
        // remove feature marker
        Lacrimapsys.featureMarker.setMap(null);
        // reset clicks
        Lacrimapsys.clicks = 0;
        // display success message
        var messageBoxDiv = document.createElement('div');
        Lacrimapsys.displayMessage(messageBoxDiv, "The information has been saved.", '0');

    }
    ).catch(function (err) {
        var messageBoxDiv = document.createElement('div');
        // display error message
        Lacrimapsys.displayMessage(messageBoxDiv, err.toString(), '1');
    });
};

/**
 * This function handles adding station features.
 * @returns {void}
 */
Station.addFeatureHandler = function () {
    Lacrimapsys.createStationFeatureForm('station');
};



Station.showStations = function (database, icons) {
//    console.log(icons.downloadURLs);
    var stationsRef = database.ref("stations/");
    stationsRef.orderByValue().on('value', function (snapshot) {

        if (snapshot.val()) {
            var stations = [];
            snapshot.forEach(function (snap) {
                stations.push({
                    position: new google.maps.LatLng(snap.val().lat, snap.val().lng),
                    type: snap.val().feature_type,
                    name: _.unescape(snap.val().command),
                    icon: icons["Police"].icon
                });

            });
//            console.log(incidents);
            Lacrimapsys.displayFeatures(stations);
        } else {
            console.warn("a database error occured");
        }
    });
};