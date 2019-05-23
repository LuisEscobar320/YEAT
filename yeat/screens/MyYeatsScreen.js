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
    
    constructor(props) {
        super(props);
        this.listenForItems();

        this.state = {
            arr: []
        };

    }

    async listenForItems() {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId + "/preferences");
        let bool = false;
        await ref.on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
                const pbj = {'check': child.key, 'bool': child.val()};
                items.push(             
                    child.key
                    //pbj
                );
                console.log(child.val());
                console.log(child.key);
            });
            console.log("ITEMSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
            console.log(items[0]);
            this.setState({
                arr: items
            });
            console.log("CHECKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
            console.log(this.state.arr[0].check);
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
        console.log(this.state.arr[1]);
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
            <Card title = {this.state.arr[0]}>
            <Text> {this.state.arr[1]} </Text>
            </Card>
            <Card title = {this.state.arr[2]}>
            <Text> {this.state.arr[3]} </Text>
            </Card>
            <Card title = {this.state.arr[4]}>
            <Text> {this.state.arr[5]} </Text>
            </Card>
            <Card title = {this.state.arr[6]}>
            <Text> {this.state.arr[7]} </Text>
            </Card>


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

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
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

