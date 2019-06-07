import React from 'react'
import firebase from 'firebase'

import {StyleSheet, Text, TextInput, View, Button, Linking, AsyncStorage, Image, Alert, ActivityIndicator} from 'react-native'

export default class TritonCardLoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', errorMessage: null, loading: false};
        this.alertbutton = this.alertbutton.bind(this)
    }


    sleep(ms) {
        this.setState({loading: true});
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    checkUser() {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        return ref.child('tritoncard').child('username').once('value').then((snapshot) => {
            console.log("in here");
            //timeout(5000);
            //var checkUser;
            console.log(snapshot.val())
            return snapshot.val();
        });
    }

    alertbutton() {
        this.setState({ lastRefresh: Date(Date.now()).toString()})
    }

    handleLogin = async() => {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        // if (this.state.username.toString().equals("wrong")) {
        //      if (!alert('Your Username/Password is Wrong!')) {
        //          window.location.reload()
        //      }
        // }
        ref.child("tritoncard").set({
            username: this.state.username,
            password: this.state.password
        });
        await this.sleep(15000);
        this.setState({loading: false});
        //this.myFunc()
        this.checkUser().then(tocheck=> {
            if (tocheck === "wrong") {
                Alert.alert("Incorrect Credentials Detected", "Please log in using correct credentials", [
                    {text:'OK', onPress:this.alertbutton}
                ]);
            } else {
                AsyncStorage.setItem('loggedIn', 'true')
                this.props.navigation.navigate('Budget')
            }
        });

    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/yeatlogo.png')}
                    style={styles.logo}
                />

                <Text style={styles.loginPrompt}>Login using your Triton Card Account</Text>
                <Text style={styles.loginPrompt}>*Will take about 15 seconds*</Text>
                {this.state.errorMessage &&
                <Text style={{color: 'red'}}>
                    {this.state.errorMessage}
                </Text>}

                <TextInput
                    style={styles.textInput}
                    keyboardType={'numeric'}
                    autoCapitalize="none"
                    placeholder="PID (replace 'A' with '9')"
                    onChangeText={username => this.setState({username})}
                    value={this.state.username}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                />

                <Button title="Login" onPress={this.handleLogin}/>
                <Button
                    title="Don't have an account? Tap here to sign up on UCSD's website!"
                    onPress={() => {
                        Linking.openURL('https://services.jsatech.com/mod_auth/register.php?cid=212')
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00C6D7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 500,
        height: 225,
        resizeMode: 'contain',
        paddingTop: 20,
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: '#fff',
        borderWidth: 1,
        marginTop: 8,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    loginPrompt: {
        fontSize: 18,
        color: '#fff',
    },
    button: {
        backgroundColor: '#153b50',
        borderRadius: 15,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18
    },
    loginContainer: {
        flex: 1,
        marginLeft: 18,
        marginRight: 5,
    },
    signUpContainer: {
        flex: 1,
        marginRight: 18,
        marginLeft: 5,
    },
});