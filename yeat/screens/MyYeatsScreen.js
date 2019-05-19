import firebase from 'firebase';
import React from 'react';
import {Button, Image, StyleSheet, ScrollView, Text, View} from "react-native";
import { Card } from 'react-native-elements';

export default class MyYeatsScreen extends React.Component {
    static navigationOptions = {
        title: 'My Yeats',
        headerStyle: {
            backgroundColor: '#fff',
	    elevation : 0,
        },
        headerTitleStyle: {
            color: '#153b50',
	    fontSize: 35
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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

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
})

