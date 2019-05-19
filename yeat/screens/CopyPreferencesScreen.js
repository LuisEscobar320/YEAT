import firebase from 'firebase';
import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {Button} from 'react-native-elements';

let b = true;

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
        }
    };


    constructor(props) {
        /*let bool = false;
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        ref.once("value")
            .then(function(snapshot) {
              var ch = snapshot.child("name").val(); //Gets Use's name from ID
              bool = snapshot.child("preferences/" + param).val();
            console.log(bool);
        })*/

        super(props);
        let bool = false;
        bool = this.readUserData("vegetarianCheck", bool);
        //bool = this.readUserData("vegetarianCheck", bool).then(bool => ;
        console.log("RET VAL IS");
        console.log(bool);

        this.state = {
            
            //checkbox1: this.readUserData("vegetarianCheck"),
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
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
            /*checkbox1: this.readUserData("vegetarianCheck"),
            checkbox2: this.readUserData("veganCheck"),
            checkbox3: this.readUserData("glutenFreeCheck"),
            checkbox4: this.readUserData("noSeafoodCheck"),
            checkbox5: this.readUserData("noDairyCheck"),
            checkbox6: this.readUserData("noNutsCheck"),
            checkbox7: this.readUserData("americanCheck"),
            checkbox8: this.readUserData("asianCheck"),
            checkbox9: this.readUserData("indianCheck"),
            checkbox10: this.readUserData("italianCheck"),
            checkbox11: this.readUserData("mediterraneanCheck"),
            checkbox12: this.readUserData("mexicanCheck"),
            checkbox13: this.readUserData("lowCalorieCheck"),
            checkbox14: this.readUserData("lowCarbCheck"),
            checkbox15: this.readUserData("lowFatCheck"),
            checkbox16: this.readUserData("lowSodiumCheck"),
            checkbox17: this.readUserData("lowSugarCheck"),*/
        };
    }

            
    readUserData(param, bool) {
//        let bool = false;
        return new Promise(function(resolve, reject) {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        ref.once("value")

          .then(function(snapshot) {
            //var ch = snapshot.child("name").val(); //Gets Use's name from ID
            bool = snapshot.child("preferences/" + param).val(); //Gets check val
            //this.state.checkbox1 = ch2;
            console.log("logging");
            console.log("preference/" + param);
            console.log(bool);
            //return(ch2);
            /*if (ret === true) {
                console.log("RETURNING TRUE");
                return(true);
            } else {
                console.log("RETURNING FALSE");

                return(false);
            }*/
            console.log(userId);
        })
        console.log("bool is");
        console.log(bool);
        });
        //return(bool);

            /*console.log("PRINTING");
            console.log(ch2);*/
        //return ch2
    };
    
    /*setChecks(){
        var ret = this.readUserData("vegetarianCheck");
        this.setState({checkbox1: this.readUserData("vegetarianCheck")});
        console.log("PRINTING ONE");
        console.log(ret);
        console.log(this.state.checkbox1);
    };*/


    // Method saves the user's preferences to Firebase
    savePrefs(ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11,
            ch12, ch13, ch14, ch15, ch16, ch17) {
        firebase.auth().onAuthStateChanged(user=> {
            if(user) {
                console.log("PRINTINGGGGGGGGG");
                console.log(ch1);
                console.log(ch2);
                console.log(ch3);
                firebase.database().ref('/users/' + user.uid+'/preferences/').update(
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

    }


    render() {
//        this.setState({checkbox1: this.readUserData("vegetarianCheck")});
        console.log("CHECKBOX1 VALUE");
        console.log("CHECKBOX1 VALUE");
        console.log("CHECKBOX1 VALUE");
        console.log("CHECKBOX1 VALUE");
        console.log(this.state.checkbox1);
        return (
	    <ScrollView style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center" }}>
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

            <Button
                backgroundColor="39cbd6"
                title="Save"
                type="solid"
                onPress={() => this.savePrefs(this.state.checkbox1, this.state.checkbox2, 
                    this.state.checkbox3, this.state.checkbox4, this.state.checkbox5, 
                    this.state.checkbox6, this.state.checkbox7, this.state.checkbox8, 
                    this.state.checkbox9, this.state.checkbox10, this.state.checkbox11, 
                    this.state.checkbox12, this.state.checkbox13, this.state.checkbox14, 
                    this.state.checkbox15, this.state.checkbox16, this.state.checkbox17)}
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
    buttonStyle: {
        backgroundColor: '#ecebe4'
    },
})

