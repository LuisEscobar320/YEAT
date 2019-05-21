import firebase from 'firebase';
import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {Button, CheckBox, Icon} from 'react-native-elements';

export default class PreferencesScreen extends React.Component {
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
            alignSelf: 'flex-end'
        },
        /*headerLeft:(
            <Text style = {{color: '#153b50', fontSize: 40, padding: 0}} >Preferences</Text>
        ),*/ 
        headerRight: (
            <Icon size={40} 
            iconStyle = {{ right: 150, top: 7}}
            name='gear'
            type='evilicon'
            color='#517fa4'
            />
        ),
    };


    constructor(props) {
        super(props);
       
        // Gets the boolean for all of the boxes
        this.readUserData("vegetarianCheck");
        this.readUserData("veganCheck");
        this.readUserData("glutenFreeCheck");
        this.readUserData("noSeafoodCheck");
        this.readUserData("noDairyCheck");
        this.readUserData("noNutsCheck");
        this.readUserData("americanCheck");
        this.readUserData("asianCheck");
        this.readUserData("indianCheck");
        this.readUserData("italianCheck");
        this.readUserData("mediterraneanCheck");
        this.readUserData("mexicanCheck");
        this.readUserData("lowCalorieCheck");
        this.readUserData("lowCarbCheck");
        this.readUserData("lowFatCheck");
        this.readUserData("lowSodiumCheck");
        this.readUserData("lowSugarCheck");

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

            
    async readUserData(param) {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        let bool = false;
        await ref.once("value")

          .then(function(snapshot) {
            bool = snapshot.child("preferences/" + param).val(); //Gets check val
            console.log("logging");
            console.log("preference/" + param);
        });

        // Sets the corresponding checkbox to be true or false
        if (param === "vegetarianCheck") {
            this.setState({checkbox1: bool});
        }
        else if (param === "veganCheck") {
            this.setState({checkbox2: bool});
        }
        else if (param === "glutenFreeCheck") {
            this.setState({checkbox3: bool});
        }
        else if (param === "noSeafoodCheck") {
            this.setState({checkbox4: bool});
        }
        else if (param === "noDairyCheck") {
            this.setState({checkbox5: bool});
        }
        else if (param === "noNutsCheck") {
            this.setState({checkbox6: bool});
        }
        else if (param === "americanCheck") {
            this.setState({checkbox7: bool});
        }
        else if (param === "asianCheck") {
            this.setState({checkbox8: bool});
        }
        else if (param === "indianCheck") {
            this.setState({checkbox9: bool});
        }
        else if (param === "italianCheck") {
            this.setState({checkbox10: bool});
        }
        else if (param === "mediterraneanCheck") {
            this.setState({checkbox11: bool});
        }
        else if (param === "mexicanCheck") {
            this.setState({checkbox12: bool});
        }
        else if (param === "lowCalorieCheck") {
            this.setState({checkbox13: bool});
        }
        else if (param === "lowCarbCheck") {
            this.setState({checkbox14: bool});
        }
        else if (param === "lowFatCheck") {
            this.setState({checkbox15: bool});
        }
        else if (param === "lowSodiumCheck") {
            this.setState({checkbox16: bool});
        }
        else if (param === "lowSugarCheck") {
            this.setState({checkbox17: bool});
        }

    };
    
    // Method saves the user's preferences to Firebase
    savePrefs(ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11,
            ch12, ch13, ch14, ch15, ch16, ch17) {
        firebase.auth().onAuthStateChanged(user=> {
            if(user) {
                firebase.database().ref('/users/' + user.uid + '/preferences/').update(
                    {
                        vegetarianCheck: ch1,
                        veganCheck: ch2,
                        glutenFreeCheck: ch3,
                        noSeafoodCheck: ch4,
                        noDairyCheck: ch5,
                        noNutsCheck: ch6,
                        americanCheck: ch7,
                        asianCheck: ch8,
                        indianCheck: ch9,
                        italianCheck: ch10,
                        mediterraneanCheck: ch11,
                        mexicanCheck: ch12,
                        lowCalorieCheck: ch13,
                        lowCarbCheck: ch14,
                        lowFatCheck: ch15,
                        lowSodiumCheck: ch16,
                        lowSugarCheck: ch17
                    });
            }
        })
        alert('Preferences saved!')

    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                
                <ScrollView style={styles.container}>
                   

                    <Text style = {{color: '#153b50', fontSize: 25, padding: 20}} >Dietary Restrictions</Text>

                    <CheckBox
                        title='Vegetarian'
                        checked={this.state.checkbox1}
                        checkboxStyle={{justifyContent: 'flex-start', width:200}}
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
                        title='No Seafood'
                        checked={this.state.checkbox4}
                        onPress={() => this.setState({checkbox4: !this.state.checkbox4})}
                    />

                    <CheckBox
                        title='No Dairy'
                        checked={this.state.checkbox5}
                        onPress={() => this.setState({checkbox5: !this.state.checkbox5})}
                    />

                    <CheckBox
                        title='No Nuts'
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
                </ScrollView>

                <Button
                        title="Save"
                        type="solid"
                        buttonStyle={styles.button}
                        onPress={() => this.savePrefs(this.state.checkbox1, this.state.checkbox2,
                            this.state.checkbox3, this.state.checkbox4, this.state.checkbox5,
                            this.state.checkbox6, this.state.checkbox7, this.state.checkbox8,
                            this.state.checkbox9, this.state.checkbox10, this.state.checkbox11,
                            this.state.checkbox12, this.state.checkbox13, this.state.checkbox14,
                            this.state.checkbox15, this.state.checkbox16, this.state.checkbox17)}
                />   

            </View>

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
        //my stuff
        width: 66,
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'absolute',
        top: -55,
        right: 15,
    },
    check:{
        //flex : 1,
        //flexDirection: 'row',
        //justifyContent: 'center',
        //alignItems: 'flex-end',
        //position: 'absolute',
        top: -20,
        right: -30,
    }
});

