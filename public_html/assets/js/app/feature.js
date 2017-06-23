
/**
 * This specifies a Feature constructor.
 * @param {String} featureType
 * @param {Number} lat
 * @param {Number} lng
 * @returns {Feature}
 */
function Feature(featureType, lat, lng) {
    if (Feature.isLatValid(lat) && Feature.isLngValid(lng)) {
        this.featureType = featureType;
        this.lat = lat;
        this.lng = lng;
    }else{
        console.error("Invalid argument passed.");
    }
}

/**
 * This function returns the feature type.
 * @returns {String}
 */
Feature.prototype.getFeatureType = function () {
    return this.featureType;
};

/**
 * This function sets the feature type.
 * @param {String} featureType
 * @returns {void}
 */
Feature.prototype.setFeatureType = function (featureType) {
    this.featureType = featureType;
};

/**
 * This function returns the feature's latitude attribute.
 * @returns {Number}
 */
Feature.prototype.getLat = function () {
    return this.lat;
};

/**
 * This function sets the feature's latitude attribute.
 * @param {type} lat
 * @returns {void}
 */
Feature.prototype.setLat = function (lat) {
    if(Feature.isLatValid(lat)){
        this.lat = lat;
    }else{
        console.error("Invalid argument passed.");
    }  
};

/**
 * This function returns the feature's longitude attribute.
 * @returns {Number}
 */
Feature.prototype.getLng = function () {
    return this.lng;
};

/**
 * This function sets the feature's longitude attribute.
 * @param {Number} lng
 * @returns {void}
 */
Feature.prototype.setLng = function (lng) {
    if(Feature.isLatValid(lng)){
        this.lng = lng;
    }else{
        console.error("Invalid argument passed.");
    }  
};

/**
 * This function validates the feature's latitude attribute.
 * @param {Number} lat
 * @returns {Boolean}
 */
Feature.isLatValid = function (lat) {
    // The absolute valid of the latitude must be greater than or 
    // equal to 0 and less than or equal to 90.
    return ((Math.abs(lat) >= 0) && (Math.abs(lat) <= 90));
};

/**
 * This function validates the feature's longitude attribute.
 * @param {Number} lng
 * @returns {Boolean}
 */
Feature.isLngValid = function (lng) {
    // The absolute value of the longitude must be greater than or 
    // equal to 0 and less than or equal 180.
    return ((Math.abs(lng)) >= 0 && (Math.abs(lng) <= 180));
};


function CrimeIncident(featureType, lat, lng, crimeType) {
    Feature.call(this, featureType, lat, lng, crimeType);

    this.MONTHS = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", "December"];

    this.DAYS = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
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
        response: null
    };
};

/**
 * This function returns the crime incident's type.
 * @returns {String}
 */
CrimeIncident.prototype.getCrimeType = function(){
    return this.crimeType;
};

/**
 * This function sets the crime incident's type.
 * @param {String} crimeType
 * @returns {void}
 */
CrimeIncident.prototype.setCrimeType = function(crimeType){
    this.crimeType = crimeType;
};

/**
 * This function returns the crime incident's timestamp.
 * @returns {Number}
 */
CrimeIncident.prototype.getTimestamp = function(){
    return this.timestamp;
};

/**
 * This function sets the crime incident's timestamp.
 * @param {Number} timestamp
 * @returns {void}
 */
CrimeIncident.prototype.setTimestamp = function(timestamp){
    this.timestamp = timestamp;
};

/**
 * This function returns the crime incident's year.
 * @returns {Number}
 */
CrimeIncident.prototype.getYear = function(){
    return this.year;
};

/**
 * This function set the crime incident's year.
 * @param {Number} year
 * @returns {void}
 */
CrimeIncident.prototype.setYear = function(year){
    this.year = year;
};

/**
 * This function returns the crime incident's month.
 * @returns {String}
 */
CrimeIncident.prototype.getMonth = function(){
    return this.month;
};

/**
 * This function sets the crime incident's month.
 * @param {Number} month
 * @returns {void}
 */
CrimeIncident.prototype.setMonth = function(month){
    this.month = this.MONTHS[month];
};

/**
 * This function returns the crime incident's day.
 * @returns {String}
 */
CrimeIncident.prototype.getDay = function(){
    return this.day;
};

/**
 * This function sets the crime incident's day.
 * @param {Number} day
 * @returns {void}
 */
CrimeIncident.prototype.setDay = function(day){
    this.day = this.DAYS[day];
};

/**
 * This function returns the crime incident's respondent.
 * @returns {void}
 */
CrimeIncident.prototype.getRespondent = function(){
    return this.respondent;
};

/**
 * This function sets the crime incident's respondent.
 * @param {Station} respondent
 * @returns {void}
 */
CrimeIncident.prototype.setRespondent = function(respondent){
    this.respondent = respondent;
};