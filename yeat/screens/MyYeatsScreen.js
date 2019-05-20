import firebase from 'firebase';
import React from 'react';
import {Image, StyleSheet, ScrollView, Text, View} from "react-native";
import {Button, Card} from 'react-native-elements';
import {createAppContainer, createStackNavigator} from 'react-navigation';

class MyYeatsScreen extends React.Component {
    static navigationOptions = {
        title: 'My Yeats',
        headerStyle:{
            backgroundColor: '#fff',
            elevation: 0,
            borderBottomWidth: 0,
        },

        headerTitleStyle: {
            color: '#153b50',
            fontSize: 35,
        }
    };

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
            items.push({
                title: child.val().title,
                _key: child.key
            });
        });

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items)
        });

        });
    }

    snapshotToArray(snapshot) {
        var returnArr = [];

        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;

            returnArr.push(item);
        });

        return returnArr;
    };
    
    render() {
        return (
	    <ScrollView style={styles.container}>
            <View>
                <Button
                    title='Profile'
                    buttonStyle={styles.button}
                    onPress={()=> {
                        return this.props.navigation.navigate('Profile');
                    }}
                />
            </View>
	    </ScrollView>
    );
    }
}

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        headerStyle:{
            backgroundColor: '#fff',
            elevation: 0,
            borderBottomWidth: 0,
        },

        headerTitleStyle: {
            color: '#153b50',
            fontSize: 35,
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            name: '',
        };

        this.readUserName();
    }


    // Get the user's name from database
    readUserName() {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);

        ref.once("value")
            .then(function(snapshot) {
                console.log(snapshot.child("name").val());
                this.setState({name: snapshot.child("name").val()});
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text>{this.state.name}</Text>
                    <Text>{this.state.email}</Text>

                    <Button
                        title="Logout"
                        color="#841584"
                        buttonStyle={styles.button}
                        onPress={()=> firebase.auth().signOut()}
                    />
                </View>
            </ScrollView>
        );
    }
}

const AppNavigator = createStackNavigator({
    MyYeats: {
        screen: MyYeatsScreen,
    },
    Profile: {
        screen: ProfileScreen,
    },
}, {
    initialRouteName: 'MyYeats',
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#153b50',
        borderRadius: 15,
    }

});

