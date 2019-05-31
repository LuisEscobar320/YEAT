import React from 'react'
import firebase from 'firebase'
import { StyleSheet, Text, TextInput, View, Button, Linking, ActivityIndicator, AsyncStorage} from 'react-native'

export default class StartingBudgetScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
     }

     // Decides which screen to go to whether or not the user is logged in
    _bootstrapAsync = async () => {
        //const loggedIn = await AsyncStorage.getItem('loggedIn');
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        const hasTritonCard = await ref.once('value').then(function (snapshot) {
            return snapshot.hasChild("tritoncard")
        });
	if(hasTritonCard == false) {
		this.props.navigation.navigate('TritonCard');
	}
	else {
		var correctCredentials = await ref.once('value').then(function (snapshot) {
			return(snapchot.child("tritoncard/username").val() != 'wrong');
		}
		this.props.navigation.navigate(correctCredentials ? 'Budget' : 'Error');
	}
    }



    render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }
}
