
/* global Feature, Lacrimapsys, google */

/**
 * This specifies a CrimeIncident constructor.
 * @param {String} featureType
 * @param {Number} lat
 * @param {Number} lng
 * @param {String} crimeType
 * @returns {CrimeIncident}
 */
function CrimeIncident(featureType, lat, lng, crimeType) {
    Feature.call(this, featureType, lat, lng);

    this.MONTHS = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", "December"];

    this.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday"];

    this.crimeType = crimeType;
    this.timestamp = new Date().getTime(); // The current timestamp
    this.year = new Date().getFullYear(); // The current year
    this.month = this.MONTHS[new Date().getMonth()]; // The current month
    this.day = this.DAYS[new Date().getDay()]; // Today
    this.respondent; // command that responds to this crime incident
}

// Inherit attributes from Feature.
CrimeIncident.prototype = Object.create(Feature.prototype);
// Set the constructor.
CrimeIncident.prototype.constructor = CrimeIncident;

/**
 * This function returns an object which represents the crime incident
 * that can be stored in the database.
 * @returns {CrimeIncident.prototype.getCrimeIncidentData.featureAnonym$0}
 */
CrimeIncident.prototype.getCrimeIncidentData = function () {
    return {
        crime: this.crimeType,
        lat: this.lat,
        lng: this.lng,
        timestamp: this.timestamp,
        year: this.year,
        month: this.month,
        day: this.day,
        feature_type: this.featureType,
        response: null
    };
};

/**
 * This function returns the crime incident's type.
 * @returns {String}
 */
CrimeIncident.prototype.getCrimeType = function () {
    return this.crimeType;
};

/**
 * This function sets the crime incident's type.
 * @param {String} crimeType
 * @returns {void}
 */
CrimeIncident.prototype.setCrimeType = function (crimeType) {
    this.crimeType = crimeType;
};

/**
 * This function returns the crime incident's timestamp.
 * @returns {Number}
 */
CrimeIncident.prototype.getTimestamp = function () {
    return this.timestamp;
};

/**
 * This function sets the crime incident's timestamp.
 * @param {Number} timestamp
 * @returns {void}
 */
CrimeIncident.prototype.setTimestamp = function (timestamp) {
    this.timestamp = timestamp;
};

/**
 * This function returns the crime incident's year.
 * @returns {Number}
 */
CrimeIncident.prototype.getYear = function () {
    return this.year;
};

/**
 * This function set the crime incident's year.
 * @param {Number} year
 * @returns {void}
 */
CrimeIncident.prototype.setYear = function (year) {
    this.year = year;
};

/**
 * This function returns the crime incident's month.
 * @returns {String}
 */
CrimeIncident.prototype.getMonth = function () {
    return this.month;
};

/**
 * This function sets the crime incident's month.
 * @param {Number} month
 * @returns {void}
 */
CrimeIncident.prototype.setMonth = function (month) {
    this.month = this.MONTHS[month];
};

/**
 * This function returns the crime incident's day.
 * @returns {String}
 */
CrimeIncident.prototype.getDay = function () {
    return this.day;
};

/**
 * This function sets the crime incident's day.
 * @param {Number} day
 * @returns {void}
 */
CrimeIncident.prototype.setDay = function (day) {
    this.day = this.DAYS[day];
};

/**
 * This function returns the crime incident's respondent.
 * @returns {void}
 */
CrimeIncident.prototype.getRespondent = function () {
    return this.respondent;
};

/**
 * This function sets the crime incident's respondent.
 * @param {Station} respondent
 * @returns {void}
 */
CrimeIncident.prototype.setRespondent = function (respondent) {
    this.respondent = respondent;
};

/**
 * This function saves the data of a crime incident to the database.
 * @param {type} database
 * @param {type} crime
 * @returns {void}
 */
CrimeIncident.saveData = function (database, crime) {
    var incidentsRef = database.ref("incidents/");
    incidentsRef.push(crime.getCrimeIncidentData(), function () {
        var analysisRef = database.ref().child("analysis/");
        // TODO: Test these later : Done
        var analyzer = new Analyzer(analysisRef, crime);
        analyzer.performTimeBasedAnalysis();
        analyzer.performCrimeBasedAnalysis();
        // remove add crime feature form
        $("#crime").remove();
        // remove feature marker
        Lacrimapsys.featureMarker.setMap(null);
        // reset clicks
        Lacrimapsys.clicks = 0;

    }).catch(function (err) {
        var messageBoxDiv = document.createElement('div');
        // display error message
        Lacrimapsys.displayMessage(messageBoxDiv, err.toString(), '1');
    });
};

/**
 * This function handles adding crime incident features.
 * @param {type} crimesRef
 * @returns {void}
 */
CrimeIncident.addFeatureHandler = function (crimesRef) {
    crimesRef.orderByValue().on('value', function (snapshot) {

        if (snapshot.val()) {
            var crimeOptions = "";
            snapshot.forEach(function (snap) {
//                console.log(snap.key);
                crimeOptions += "<option value='" + snap.key + "'>" + snap.key + "</option>";
            });
            Lacrimapsys.createCrimeFeatureForm('crime', crimeOptions);
        } else {
            console.warn("a database error occured");
        }
    });
};

/**
 * This function displays crime incidents stored in the database on the map.
 * @param {type} database
 * @param {type} icons
 * @returns {void}
 */
CrimeIncident.showIncidents = function (database, icons) {
//    console.log(icons.downloadURLs);
    var incidentsRef = database.ref("incidents/");
    incidentsRef.orderByValue().on('value', function (snapshot) {

        if (snapshot.val()) {
            var incidents = [];
            snapshot.forEach(function (snap) {
                incidents.push({
                    position: new google.maps.LatLng(snap.val().lat, snap.val().lng),
                    type: snap.val().crime,
                    icon: icons[snap.val().crime].icon
                });

            });
//            console.log(incidents);
            Lacrimapsys.displayFeatures(incidents);
        } else {
            console.error("a database error occured");
        }
    });
};
