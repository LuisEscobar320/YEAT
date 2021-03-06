import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import ControllerPreferences from "./ControllerPreferences.js";

/*
PreferencesScreen class renders the Preferences screen of the app
Shows the checkboxes of Dietary Restrictions and Cuisines and the
user has the ability to check and save their preferences
 */
export default class PreferencesScreen extends React.Component {
    //styling for the title
    static navigationOptions = {
        title: 'Preferences',
    	headerStyle:{
            backgroundColor: '#fff',
    	    elevation: 0,
            borderBottomWidth: 0,
        },

        headerTitleStyle: {
	        color: '#153b50',
            fontSize: 35,
            alignSelf: 'flex-end',
        },
    };

    /*
    Initiates checkbox values for the PreferencesScreen class
    by calling setChecks
    */
    constructor(props) {
        super(props);
       
        // Gets the boolean for all of the boxes by calling setChecks
        this.setChecks("veganCheck");
        this.setChecks("vegetarianCheck");
        this.setChecks("noDairyCheck");
        this.setChecks("noTreeNutsCheck");
        this.setChecks("noSoyCheck");
        this.setChecks("noWheatCheck");
        this.setChecks("noFishCheck");
        this.setChecks("noShellfishCheck");
        this.setChecks("noPeanutsCheck");
        this.setChecks("noEggsCheck");
        this.setChecks("glutenFreeCheck");
        this.setChecks("americanCheck");
        this.setChecks("asianCheck");
        this.setChecks("indianCheck");
        this.setChecks("italianCheck");
        this.setChecks("mexicanCheck");

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
        };
    }

    /* Method sets the checkboxes to be checked or unchecked depending
    on whether that value in the database is true or false
    param is the check to set
    */
    async setChecks(param) {
        // Calls the controller to get values from the database
        let bool = await ControllerPreferences.readUserChecks(param);

        // Sets the corresponding checkbox to be true or false
        if (param === "veganCheck") {
            this.setState({checkbox1: bool});
        }
        else if (param === "vegetarianCheck") {
            this.setState({checkbox2: bool});
        }
        else if (param === "noDairyCheck") {
            this.setState({checkbox3: bool});
        }
        else if (param === "noTreeNutsCheck") {
            this.setState({checkbox4: bool});
        }
        else if (param === "noSoyCheck") {
            this.setState({checkbox5: bool});
        }
        else if (param === "noWheatCheck") {
            this.setState({checkbox6: bool});
        }
        else if (param === "noFishCheck") {
            this.setState({checkbox7: bool});
        }
        else if (param === "noShellfishCheck") {
            this.setState({checkbox8: bool});
        }
        else if (param === "noPeanutsCheck") {
            this.setState({checkbox9: bool});
        }
        else if (param === "noEggsCheck") {
            this.setState({checkbox10: bool});
        }
        else if (param === "glutenFreeCheck") {
            this.setState({checkbox11: bool});
        }
        else if (param === "americanCheck") {
            this.setState({checkbox12: bool});
        }
        else if (param === "asianCheck") {
            this.setState({checkbox13: bool});
        }
        else if (param === "indianCheck") {
            this.setState({checkbox14: bool});
        }
        else if (param === "italianCheck") {
            this.setState({checkbox15: bool});
        }
        else if (param === "mexicanCheck") {
            this.setState({checkbox16: bool});
        }

    };
    
    /* Method saves the user's preferences to Firebase by calling the controller
    the parameters are the values of the checks in the order that they appear
    */
    updateChecks(ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11,
            ch12, ch13, ch14, ch15, ch16) {
        // Calls the control to update the database
        ControllerPreferences.savePrefs(ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11,
            ch12, ch13, ch14, ch15, ch16);
        alert('Preferences saved!')

    }

    /* Renders the Preferences screen - shows the checkboxes under the
    headings Dietary Restrictions and Cuisines and the user can check
    and save their preferences
    */
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                
                <ScrollView style={styles.container}>

                    <Text style = {styles.title} >Dietary Restrictions</Text>

                    <CheckBox
                        title='Vegan'
                        checked={this.state.checkbox1}
                        checkboxStyle={{justifyContent: 'flex-start', width:200}}
                        onPress={() => this.setState({checkbox1: !this.state.checkbox1})}
                    />

                    <CheckBox
                        title='Vegetarian'
                        checked={this.state.checkbox2}
                        onPress={() => this.setState({checkbox2: !this.state.checkbox2})}
                    />

                    <CheckBox
                        title='No Dairy'
                        checked={this.state.checkbox3}
                        onPress={() => this.setState({checkbox3: !this.state.checkbox3})}
                    />

                    <CheckBox
                        title='No Tree Nuts'
                        checked={this.state.checkbox4}
                        onPress={() => this.setState({checkbox4: !this.state.checkbox4})}
                    />

                    <CheckBox
                        title='No Soy'
                        checked={this.state.checkbox5}
                        onPress={() => this.setState({checkbox5: !this.state.checkbox5})}
                    />

                    <CheckBox
                        title='No Wheat'
                        checked={this.state.checkbox6}
                        onPress={() => this.setState({checkbox6: !this.state.checkbox6})}
                    />

                    <CheckBox
                        title='No Fish'
                        checked={this.state.checkbox7}
                        onPress={() => this.setState({checkbox7: !this.state.checkbox7})}
                    />

                    <CheckBox
                        title='No Shellfish'
                        checked={this.state.checkbox8}
                        onPress={() => this.setState({checkbox8: !this.state.checkbox8})}
                    />

                    <CheckBox
                        title='No Peanuts'
                        checked={this.state.checkbox9}
                        onPress={() => this.setState({checkbox9: !this.state.checkbox9})}
                    />

                    <CheckBox
                        title='No Eggs'
                        checked={this.state.checkbox10}
                        onPress={() => this.setState({checkbox10: !this.state.checkbox10})}
                    />

                    <CheckBox
                        title='Gluten-free'
                        checked={this.state.checkbox11}
                        onPress={() => this.setState({checkbox11: !this.state.checkbox11})}
                    />

                    <Text style = {styles.title}>Cuisines</Text>

                    <CheckBox
                        title='American'
                        checked={this.state.checkbox12}
                        onPress={() => this.setState({checkbox12: !this.state.checkbox12})}
                     />

                    <CheckBox
                        title='Asian'
                        checked={this.state.checkbox13}
                        onPress={() => this.setState({checkbox13: !this.state.checkbox13})}
                    />

                    <CheckBox
                        title='Indian'
                        checked={this.state.checkbox14}
                        onPress={() => this.setState({checkbox14: !this.state.checkbox14})}
                    />

                    <CheckBox
                        title='Italian'
                        checked={this.state.checkbox15}
                        onPress={() => this.setState({checkbox15: !this.state.checkbox15})}
                    />

                    <CheckBox
                        title='Mexican'
                        checked={this.state.checkbox16}
                        onPress={() => this.setState({checkbox16: !this.state.checkbox16})}
                    />
                </ScrollView>

                <Button
                        title="Save"
                        type="solid"
                        buttonStyle={styles.button}
                        onPress={() => this.updateChecks(this.state.checkbox1, this.state.checkbox2,
                            this.state.checkbox3, this.state.checkbox4, this.state.checkbox5,
                            this.state.checkbox6, this.state.checkbox7, this.state.checkbox8,
                            this.state.checkbox9, this.state.checkbox10, this.state.checkbox11,
                            this.state.checkbox12, this.state.checkbox13, this.state.checkbox14,
                            this.state.checkbox15, this.state.checkbox16)}
                />   

            </View>

        );
    }
}

/*
Styles for buttons, checks, container, and title
*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#153b50',
        borderRadius: 15,
        width: 66,
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        top: -55,
        right: 15,
    },
    check: {
        top: -20,
        right: -30,
    },
    title: {
        color: '#153b50',
        fontSize: 25,
        padding: 20
    }
});

