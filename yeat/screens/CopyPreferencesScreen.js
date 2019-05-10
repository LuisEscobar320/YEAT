import firebase from 'firebase';
import React from 'react';
import {Button, Image, ScrollView, Text, View} from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class PreferencesScreen extends React.Component {
    static navigationOptions = {
        title: 'Preferences',
    };

    constructor(props) {
        super(props);

        this.state = {
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            checkbox5: false,
            checkbox6: false,
        };
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Dietary Restrictions</Text>

            <CheckBox
                title='Vegetarian'
                checkbox1={this.state.checkbox1}
                onPress={() => this.setState({checkbox1: !this.state.checkbox1})}
            />

            <CheckBox
                title='Vegan'
                checkbox2={this.state.checkbox2}
                onPress={() => this.setState({checkbox2: !this.state.checkbox2})}
            />

            <CheckBox
                title='Gluten-free'
                checkbox3={this.state.checkbox3}
                onPress={() => this.setState({checkbox3: !this.state.checkbox3})}
            />

            <CheckBox
                title='Seafood'
                checkbox4={this.state.checkbox4}
                onPress={() => this.setState({checkbox4: !this.state.checkbox4})}
            />

            <CheckBox
                title='Dairy'
                checkbox5={this.state.checkbox5}
                onPress={() => this.setState({checkbox5: !this.state.checkbox5})}
            />

            <CheckBox
                title='Nuts'
                checkbox6={this.state.checkbox6}
                onPress={() => this.setState({checkbox6: !this.state.checkbox6})}
             />

            <Text>Cuisines</Text>

            <Text>Nutrition</Text>
        </View>
        );
    }
}
