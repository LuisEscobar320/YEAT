import firebase from 'firebase';
import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {Button} from 'react-native-elements';


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
        super(props);

        this.state = {
            checkbox1: false, /*this.readUserData("vegetarianCheck"),*/  
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
        //ret = this.readUserData("vegetarianCheck"),
        console.log(this.checkbox1);
        this.setChecks();
        console.log("logging");
        //console.log(ret);
        console.log(this.checkbox1);
        console.log(this.checkbox2);
    }

            
    
    readUserData(param) {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        ref.once("value")
          .then(function(snapshot) {
            var ch = snapshot.child("name").val(); //Gets Use's name from ID
            var ch2 = snapshot.child("preferences/" + param).val(); //Gets check val
            //this.state.checkbox1 = ch2;
            /*console.log("logging");
            console.log(ch)*/;
            console.log("PRINTING");
            console.log("PRINTING");
            console.log("PRINTING");
            console.log("PRINTING");
            console.log("PRINTING");
            console.log(ch2);
            console.log("PRINTING");
            console.log("PRINTING");
            console.log("PRINTING");
            console.log("PRINTING");
            return(ch2);
            /*if (ch2 == true) {
                return(true);
            } else {
                return(false);
            }*/
            //return ch2;
            //console.log(userId);
        })
            /*console.log("PRINTING");
            console.log(ch2);*/
        //return ch2
    };
    
    setChecks(){
        this.setState({checkbox1: this.readUserData("vegetarianCheck")});
        console.log("PRINTING ONE");
        console.log(this.state.checkbox1);
    };


    // Method saves the user's preferences to Firebase
    savePrefs(ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11,
            ch12, ch13, ch14, ch15, ch16, ch17) {
        firebase.auth().onAuthStateChanged(user=> {
            if(user) {
                console.log("PRINTINGGGGGGGGG");
                console.log(ch1);
                console.log(ch2);
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

