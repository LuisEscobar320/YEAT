import firebase from 'firebase';
import React from 'react';
import {Image, StyleSheet, ScrollView, Text, View} from "react-native";
import {Button, Card, Icon} from 'react-native-elements';
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
        },

        headerRight: (
            <Icon size={40} style={{ right: 50}}
                name='user'
                type='evilicon'
                color='#153b50'
            />
        ),
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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
            backgroundColor: '#153b50',
            elevation: 0,
            borderBottomWidth: 0,
        },

        headerTitleStyle: {
            color: '#fff',
            fontSize: 35,
        }
    };

    constructor(props) {
        super(props);

        this.readUserNameEmail();

        this.state = {
            name: '',
            email: '',
        };

    }


    // Get the user's name and email from database
    async readUserNameEmail() {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        var userName = '';
        var userEmail = '';

        await ref.once("value")
            .then(function(snapshot) {
                userName = snapshot.child("name").val();
                userEmail = snapshot.child("gmail").val();
        });

        this.setState({name: userName});
        this.setState({email: userEmail});
    }

    render() {
        return (
            <ScrollView style={styles.profileContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {styles.nameStyle}>{this.state.name}</Text>
                    <Text style = {styles.emailStyle}>{this.state.email}</Text>

                    <Button
                        title="Logout"
                        buttonStyle={styles.profileButton}
                        onPress={()=> firebase.auth().signOut()}
                    />

                    <Text style={{ fontSize: 18, color: '#fff', paddingTop: 150}}>Made by Team</Text>

                    <Image
                        source={require('../assets/images/oof.png')}
                        style={styles.oofImage}
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
    profileContainer: {
        flex: 1,
        backgroundColor: '#153b50',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#153b50',
        borderRadius: 15,
        width: 200,
    },
    profileButton: {
        backgroundColor: '#00C6D7',
        borderRadius: 15,
        width: 200,
    },
    nameStyle: {
        color: '#fff',
        fontSize: 40,
        textAlign: "center",
        paddingTop: 35,
    },
    emailStyle: {
        color: '#00C6D7',
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 50
    },
    oofImage: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        paddingTop: 30
    }
});

