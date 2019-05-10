import firebase from 'firebase';
import React from 'react';
import {Button, Image, StyleSheet, ScrollView, Text, View} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PreferencesScreen extends React.Component {
    static navigationOptions = {
        title: 'Preferences',
	headerStyle: {
      	    backgroundColor: '#fff',
	    elevation: 0.
        },
    	headerTitleStyle: {
      	fontWeight: 'bold',

    	},
        headerTitleStyle: {
	    color: '#153b50',
	    fontSize: 35
        }
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
            checkbox7: false,
            checkbox8: false,
            checkbox9: false,
            checkbox10: false,
            checkbox11: false,
            checkbox12: false,
            checkbox13: false,
            checkbox14: false,
            checkbox15: false,
            checkbox16: false,
            checkbox17: false,


        };
    }

    render() {
        return (
	    <ScrollView style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center"/*, alignItems: "center"*/ }}>
            <Text style = {{color: '#153b50', fontSize: 25, padding: 20}} >Dietary Restrictions</Text>

            <CheckBox
                title='Vegetarian'
                checked={this.state.checkbox1}
                onPress={() => this.setState({checkbox1: !this.state.checkbox1})}
            />

            <CheckBox
                title='Vegan'
                checked={this.state.checkbox2}
                onPress={() => this.setState({checkbox2: !this.state.checkbox2})}
            />

            <CheckBox
                title='Gluten-free'
                checked={this.state.checkbox3}
                onPress={() => this.setState({checkbox3: !this.state.checkbox3})}
            />

            <CheckBox
                title='Seafood'
                checked={this.state.checkbox4}
                onPress={() => this.setState({checkbox4: !this.state.checkbox4})}
            />

            <CheckBox
                title='Dairy'
                checked={this.state.checkbox5}
                onPress={() => this.setState({checkbox5: !this.state.checkbox5})}
            />

            <CheckBox
                title='Nuts'
                checked={this.state.checkbox6}
                onPress={() => this.setState({checkbox6: !this.state.checkbox6})}
             />

	        <Text style = {{color: '#153b50', fontSize: 25, padding: 20}}>Cuisines</Text>
            
            <CheckBox
                title='American'
                checked={this.state.checkbox7}
                onPress={() => this.setState({checkbox7: !this.state.checkbox7})}
            />

            <CheckBox
                title='Asian'
                checked={this.state.checkbox8}
                onPress={() => this.setState({checkbox8: !this.state.checkbox8})}
            />

            <CheckBox
                title='Indian'
                checked={this.state.checkbox9}
                onPress={() => this.setState({checkbox9: !this.state.checkbox9})}
            />

            <CheckBox
                title='Italian'
                checked={this.state.checkbox10}
                onPress={() => this.setState({checkbox10: !this.state.checkbox10})}
            />

            <CheckBox
                title='Mediterranean'
                checked={this.state.checkbox11}
                onPress={() => this.setState({checkbox11: !this.state.checkbox11})}
            />

            <CheckBox
                title='Mexican'
                checked={this.state.checkbox12}
                onPress={() => this.setState({checkbox12: !this.state.checkbox12})}
             />

            <Text style = {{color: '#153b50', fontSize: 25, padding: 20}}>Nutrition</Text>
            <CheckBox
                title='Low-calorie'
                checked={this.state.checkbox13}
                onPress={() => this.setState({checkbox13: !this.state.checkbox13})}
            />

            <CheckBox
                title='Low-carb'
                checked={this.state.checkbox14}
                onPress={() => this.setState({checkbox14: !this.state.checkbox14})}
            />

            <CheckBox
                title='Low-fat'
                checked={this.state.checkbox15}
                onPress={() => this.setState({checkbox15: !this.state.checkbox15})}
            />

            <CheckBox
                title='Low-sodium'
                checked={this.state.checkbox16}
                onPress={() => this.setState({checkbox16: !this.state.checkbox16})}
            />

            <CheckBox
                title='Low-sugar'
                checked={this.state.checkbox17}
                onPress={() => this.setState({checkbox17: !this.state.checkbox17})}
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
})

