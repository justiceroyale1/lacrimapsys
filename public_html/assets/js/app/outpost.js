/* global Station, Lacrimapsys, crimeOptions, Feature, _, google */

function Outpost(featureType, lat, lng, command, name) {
    Station.call(this, featureType, lat, lng, command);
    
    if (Feature.isEmpty(name)) {
        // remove all feature forms.
        $("#outpost").remove();
        Lacrimapsys.featureMarker.setMap(null);
        Lacrimapsys.clicks = 0;
        var messageBoxDiv = document.createElement('div');
        // display error message
        Lacrimapsys.displayMessage(messageBoxDiv, "You must have forgotten to enter a name for the outpost, please try again.", '1');
        
    }else{
        this.name = name;
    }
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

Outpost.saveData = function (database, outpost) {
    var outpostsRef = database.ref("outposts/");
    outpostsRef.push(outpost.getOutpostData(), function () {

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

/**
 * This function handles adding outpost features.
 * @param {firebase.database.Reference} stationsRef
 * @returns {void}
 */
Outpost.addFeatureHandler = function (stationsRef) {
    stationsRef.orderByValue().on("value", function (snapshot) {
        if (snapshot.val()) {
            var commandOptions = "";
            snapshot.forEach(function (snap) {
//                                            console.log(snap.val());
// don't unescape snap.val().command as a value, but do unscape it as an option so that it is human readable.
                commandOptions += "<option value='" + snap.val().command + "'>" + _.unescape(snap.val().command) + "</option>";
            });
            Lacrimapsys.createOutpostFeatureForm('outpost', commandOptions);
        } else {
            console.warn("a database error occured");
        }
    });
};

/**
 * This function displays the outposts in the database on the map.
 * @param {firebase.database.Reference} database
 * @param {Object} icons
 * @returns {void}
 */
Outpost.showOutposts = function (database, icons) {
//    console.log(icons.downloadURLs);
    var outpostsRef = database.ref("outposts/");
    outpostsRef.orderByValue().on('value', function (snapshot) {

        if (snapshot.val()) {
            var outposts = [];
            snapshot.forEach(function (snap) {
                outposts.push({
                    position: new google.maps.LatLng(snap.val().lat, snap.val().lng),
                    type: _.unescape(snap.val().name) + " " + snap.val().feature_type,
                    icon: icons["Police"].icon
                });

            });
//            console.log(incidents);
            Lacrimapsys.displayFeatures(outposts);
        } else {
            console.warn("a database error occured");
        }
    });
};