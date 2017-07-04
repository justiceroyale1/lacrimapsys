/* global Station, Lacrimapsys, crimeOptions */

function Patrol(featureType, lat, lng, command, name) {
    Station.call(featureType, lat, lng, command);
    this.name = name;
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

Patrol.addFeatureHandler = function (stationsRef) {
    stationsRef.orderByValue().on("value", function (snapshot) {
        if (snapshot.val()) {
            var commandOptions = "";
            snapshot.forEach(function (snap) {
//                                            console.log(snap.val());
                commandOptions += "<option value='" + snap.val().command + "'>" + snap.val().command + "</option>";
            });
            Lacrimapsys.createPatrolFeatureForm('patrol', commandOptions);
        } else {
            console.warn("a database error occured");
        }
    });
};