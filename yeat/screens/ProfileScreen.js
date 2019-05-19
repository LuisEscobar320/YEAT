import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import firebase from 'firebase';
import {Button} from 'react-native-elements';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        headerStyle:{
            backgroundColor: '#fff',
            elevation: 0,
            borderBottomWidth: 0,
        },

        headerTitleStyle: {
            color: '#00C6D7',
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
})