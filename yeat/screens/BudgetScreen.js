import React from 'react'
import firebase from 'firebase'
import { StyleSheet, Text, TextInput, View, Button, Linking } from 'react-native'
export default class BudgetScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Budget!
                </Text>
            </View>
        )
    }
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4F6D7A',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
            color: '#F5FCFF',
        },
    });
