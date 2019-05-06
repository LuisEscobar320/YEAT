import firebase from 'firebase';
import React from 'react';
import {Button, Image, ScrollView, Text, View} from "react-native";
import { CheckBox } from 'react-native-elements'

export default class MyYeatsScreen extends React.Component {
    static navigationOptions = {
        title: 'My Yeats',
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Hello, world!</Text>
        </View>
    );
    }
}