import firebase from 'firebase';
import React from 'react';
import {Platform} from 'react-native';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Button, CheckBox, Icon} from 'react-native-elements';

class ControllerPreferences extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    // Gets the values of the checkboxes from the database        
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
    
    // Method saves the user's preferences to Firebase
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



