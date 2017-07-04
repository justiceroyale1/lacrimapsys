/* global Station, Lacrimapsys, crimeOptions */

function Outpost(featureType, lat, lng, command, name) {
    Station.call(featureType, lat, lng, command);
    this.name = name;
}

/**
 * This function returns an object which represents the outpost
 * that can be stored in the database. 
 * @returns {Outpost.prototype.getOutpostData.featureAnonym$2}
 */
Outpost.prototype.getOutpostData = function () {
    return {
        name: this.name,
        command: this.command,
        lat: this.lat,
        lng: this.lng,
        feature_type: this.featureType
    };
};
/**
 * This function returns the name of an outpost.
 * @returns {String}
 */
Outpost.prototype.getName = function () {
    return this.name;
};
/**
 * This function sets the outpost's name.
 * @param {String} name
 * @returns {void}
 */
Outpost.prototype.setName = function (name) {
    this.name = name;
};

Outpost.saveData = function (database, station) {
    var stationsRef = database.ref("stations/");
    stationsRef.push(station.getOutpostData(), function () {

        // remove add outpost feature form
        $("#outpost").remove();
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


Outpost.addFeatureHandler = function (stationsRef) {
    stationsRef.orderByValue().on("value", function (snapshot) {
        if (snapshot.val()) {
            var commandOptions = "";
            snapshot.forEach(function (snap) {
//                                            console.log(snap.val());
                commandOptions += "<option value='" + snap.val().command + "'>" + snap.val().command + "</option>";
            });
            Lacrimapsys.createOutpostFeatureForm('outpost', commandOptions);
        } else {
            console.warn("a database error occured");
        }
    });
};