
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
    } else {
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
    if (Feature.isLatValid(lat)) {
        this.lat = lat;
    } else {
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
    if (Feature.isLatValid(lng)) {
        this.lng = lng;
    } else {
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

/**
 * This functions checks if an object is empty. 
 * @param {type} obj The object to be checked.
 * @returns {Boolean} True if the object is empty and false otherwise.
 */
Feature.isEmpty = function(obj){
    if(typeof obj === 'string'){
        return (obj === ' ' || obj === '');
    }else if(typeof obj === 'object'){
        return (obj === null);
    }else if(typeof obj === 'undefined'){
        return true;
    }
};