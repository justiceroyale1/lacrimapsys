/* firebase.js
 * This file contains functions that may be used to 
 * connect to and manipulate firebase.
 * 
 */
/* global firebase */

/**
 * The firebase configuration
 * @type 
 */
var config = {
    apiKey: "AIzaSyBXVmMUf4aiHAeJgY5V4MAXCB2rnC40ytM",
    authDomain: "map-project-1494699551234.firebaseapp.com",
    databaseURL: "https://map-project-1494699551234.firebaseio.com",
    projectId: "map-project-1494699551234",
    storageBucket: "map-project-1494699551234.appspot.com",
    messagingSenderId: "215190078870"
};

// initialize firebase
firebase.initializeApp(config);

function signIn() {
    firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        console.log("Login Failed!", error);
        // ...
    });
}