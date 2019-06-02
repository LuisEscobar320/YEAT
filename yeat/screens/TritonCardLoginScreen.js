import React from 'react';
import firebase from 'firebase';
import {StyleSheet, Text, TextInput, View, Linking, AsyncStorage, Image} from 'react-native';
import {Button} from 'react-native-elements';

export default class TritonCardLoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', errorMessage: null,};
    }

    handleLogin = async() => {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        ref.child("tritoncard").set({
            username: this.state.username,
            password: this.state.password
        });
        await AsyncStorage.setItem('loggedIn', 'true');
        this.props.navigation.navigate('Budget');
    };


    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/yeatlogo.png')}
                    style={styles.logo}
                />

                <Text style={styles.loginPrompt}>Login using your Triton Card Account</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                {this.state.errorMessage}
                </Text>}

                <TextInput
                    style={styles.textInput}
                    keyboardType={'numeric'}
                    autoCapitalize="none"
                    placeholder="PID (replace 'A' with '9')"
                    onChangeText={username => this.setState({ username })}
                    value={this.state.username}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />

                <View style={styles.buttonContainer}>
                    <View style={styles.loginContainer}>
                        <Button
                            title="Login" onPress={this.handleLogin}
                            buttonStyle={styles.button}
                        />
                    </View>

                    <View style={styles.signUpContainer}>
                        <Button
                            title="Sign Up"
                            onPress={() => { Linking.openURL('https://services.jsatech.com/mod_auth/register.php?cid=212') }}
                            buttonStyle={styles.button}
                        />
                    </View>
                </View>
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
        height: 300,
        resizeMode: 'contain',
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