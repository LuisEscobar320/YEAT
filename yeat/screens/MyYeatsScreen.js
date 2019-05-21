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
            <Icon size={40} iconStyle={{ right: 200}}
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

