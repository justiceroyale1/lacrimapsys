/* global Station, Lacrimapsys, crimeOptions, Feature */

function Patrol(featureType, lat, lng, command, name) {
    Station.call(this, featureType, lat, lng, command);

    if (Feature.isEmpty(name)) {
        // remove all feature forms.
        $("#patrol").remove();
        Lacrimapsys.featureMarker.setMap(null);
        Lacrimapsys.clicks = 0;
        var messageBoxDiv = document.createElement('div');
        // display error message
        Lacrimapsys.displayMessage(messageBoxDiv, "You must have forgotten to enter a name for the patrol, please try again.", '1');

    } else {
        this.name = name;
    }
}

/**
 * This function returns an object which represents the patrol
 * that can be stored in the database. 
 * @returns {Patrol.prototype.getPatrolData.featureAnonym$2}
 */
Patrol.prototype.getPatrolData = function () {
    return {
        name: this.name,
        command: this.command,
        lat: this.lat,
        lng: this.lng,
        feature_type: this.featureType
    };
};
/**
 * This function returns the name of an patrol.
 * @returns {String}
 */
Patrol.prototype.getName = function () {
    return this.name;
};
/**
 * This function sets the patrol's name.
 * @param {String} name
 * @returns {void}
 */
Patrol.prototype.setName = function (name) {
    this.name = name;
};

Patrol.saveData = function (database, patrol) {
    var patrolsRef = database.ref("patrols/");
    patrolsRef.push(patrol.getPatrolData(), function () {

        // remove add outpost feature form
        $("#patrol").remove();
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

Patrol.addFeatureHandler = function (stationsRef) {
    stationsRef.orderByValue().on("value", function (snapshot) {
        if (snapshot.val()) {
            var commandOptions = "";
            snapshot.forEach(function (snap) {
//                                            console.log(snap.val());
// don't unescape snap.val().command as a value, but do unscape it as an option so that it is human readable.
                commandOptions += "<option value='" + snap.val().command + "'>" + _.unescape(snap.val().command) + "</option>";
            });
            Lacrimapsys.createPatrolFeatureForm('patrol', commandOptions);
        } else {
            console.warn("a database error occured");
        }
    });
};