
/* global Lacrimapsys */

/**
 * This specifies an Analyzer constructor
 * @param {Reference} path
 * @param {CrimeIncident} crime
 * @returns {Analyzer}
 */
function Analyzer(path, crime) {
    this.analysisPath = path;
    this.yearlyPath = this.analysisPath.child("year/" + crime.getYear());
    this.monthlyPath = this.analysisPath.child("month/" + crime.getMonth());
    this.dailyPath = this.analysisPath.child("day/" + crime.getDay());
    this.yearlyCrimesPath = this.yearlyPath.child("crimes/" + crime.getCrimeType());
    this.monthlyCrimesPath = this.monthlyPath.child("crimes/" + crime.getCrimeType());
    this.dailyCrimesPath = this.dailyPath.child("crimes/" + crime.getCrimeType());
}

/**
 * This function performs time based analysis. It simply increments the total 
 * value at an appropriate reference path.
 * @returns {void}
 */
Analyzer.prototype.performTimeBasedAnalysis = function () {
    // perform yearlyPath transaction with data
    this.yearlyPath.transaction(function (data) {
        return Analyzer.prototype.analyze(data);
    }, function (error, commit, snapshot) {
        // if transaction on yearly ref was committed
        if (commit) {
            // success 
            // move to next step
        } else {
            // display error message
            var messageBoxDiv = document.createElement('div');
            Lacrimapsys.displayMessage(messageBoxDiv, error.toString(), '1');
        }
    });


    // perform monthlyPath transaction with data
    this.monthlyPath.transaction(function (data) {
        return Analyzer.prototype.analyze(data);
    }, function (error, commit, snapshot) {
        // if transaction on yearly ref was committed
        if (commit) {
            // success
            // move to next step
        } else {
            // display error message
            var messageBoxDiv = document.createElement('div');
            Lacrimapsys.displayMessage(messageBoxDiv, error.toString(), '1');
        }
    });


    // perform dailyPath transaction with data
    this.dailyPath.transaction(function (data) {
        return Analyzer.prototype.analyze(data);
    }, function (error, commit, snapshot) {
        var messageBoxDiv;
        // if transaction on yearly ref was committed
        if (commit) {
            // display success message
            messageBoxDiv = document.createElement('div');
            Lacrimapsys.displayMessage(messageBoxDiv, "The information has been saved.", '0');
            
        } else {
            // display error message
            messageBoxDiv = document.createElement('div');
            Lacrimapsys.displayMessage(messageBoxDiv, error.toString(), '1');
        }
    });

};

Analyzer.prototype.performCrimeBasedAnalysis = function () {
    // perform yearlyCrimesPath transaction with data
    this.yearlyCrimesPath.transaction(function (data) {
        return Analyzer.prototype.analyze(data);
    }, function (error, commit, snapshot) {
        // if transaction on yearly ref was committed
        if (commit) {
            // success 
            // move to next step
        } else {
            // display error message
            var messageBoxDiv = document.createElement('div');
            Lacrimapsys.displayMessage(messageBoxDiv, error.toString(), '1');
        }
    });

    // perform monthlyCrimesPath transaction with data
    this.monthlyCrimesPath.transaction(function (data) {
        return Analyzer.prototype.analyze(data);
    }, function (error, commit, snapshot) {
        // if transaction on yearly ref was committed
        if (commit) {
            // success
            // move to next step
        } else {
            // display error message
            var messageBoxDiv = document.createElement('div');
            Lacrimapsys.displayMessage(messageBoxDiv, error.toString(), '1');
        }
    });
    
    // perform dailyCrimesPath transaction with data
    this.dailyCrimesPath.transaction(function (data) {
        return Analyzer.prototype.analyze(data);
    }, function (error, commit, snapshot) {
        // if transaction on yearly ref was committed
        if (commit) {
            // display success message
            var messageBoxDiv = document.createElement('div');
            Lacrimapsys.displayMessage(messageBoxDiv, "Feature added.", '0');

        } else {
            // display error message
            var messageBoxDiv = document.createElement('div');
            Lacrimapsys.displayMessage(messageBoxDiv, error.toString(), '1');
        }
    });
};

/**
 * This function returns an appropriate data object with which
 * to perform an analysis transaction on a reference path.
 * @param {Object} data
 * @returns {Object}
 */
Analyzer.prototype.analyze = function (data) {
    // if data is null
    if (data === null) {
        // initialise data with 
        // attributes equal to 1
        data = {
            total: 1
        };
    } else {
        // data is not null
        // increment data attributes
        data.total++;
    }
    return data;
};

