import firebase from 'firebase';
import React from 'react';

/*
ControllerPreferences class grabs the user's preferences from
the database and saves the user's preferences to the database
 */
class ControllerPreferences extends React.Component {
    constructor(props) {
        super(props);
    }

    /* Gets the value of the checkbox from the database        
    param is the checkbox value to get the boolean for
    returns the boolean for the checkbox parameter
    */
    async readUserChecks(param) {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        let bool = false;
        await ref.once("value")

          .then(function(snapshot) {
            bool = snapshot.child("preferences/" + param).val(); //Gets check val
        });
        return bool;
    };
    
    /* Method saves the user's preferences to Firebase
    parameters are the bools of the checkboxes in order as they appear on the screen
    */
    savePrefs(ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11,
            ch12, ch13, ch14, ch15, ch16) {
        firebase.auth().onAuthStateChanged(user=> {
            if(user) {
                firebase.database().ref('/users/' + user.uid + '/preferences/').update(
                    {
                        veganCheck: ch1,
                        vegetarianCheck: ch2,
                        noDairyCheck: ch3,
                        noTreeNutsCheck: ch4,
                        noSoyCheck: ch5,
                        noWheatCheck: ch6,
                        noFishCheck: ch7,
                        noShellfishCheck: ch8,
                        noPeanutsCheck: ch9,
                        noEggsCheck: ch10,
                        glutenFreeCheck: ch11,
                        americanCheck: ch12,
                        asianCheck: ch13,
                        indianCheck: ch14,
                        italianCheck: ch15,
                        mexicanCheck: ch16,
                    });
            }
        });
        alert('Preferences saved!')
    }
}

const pref = new ControllerPreferences();
export default pref;



