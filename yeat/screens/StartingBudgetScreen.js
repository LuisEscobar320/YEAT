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
        const loggedIn = await ref.once('value').then(function (snapshot) {
            return snapshot.hasChild("tritoncard")
        });
        console.log(loggedIn)
        this.props.navigation.navigate(loggedIn ? 'Budget' : 'TritonCard')
    }



    render() {
        return (
            <View>
                <Button
                    title="Get the fuck back "
                    onPress={() => navigate('TritonCardLoginScreen')}
                />
            </View>
        );
    }
}