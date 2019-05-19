import React from 'react'
import firebase from 'firebase'
import { StyleSheet, Text, TextInput, View, Button, Linking } from 'react-native'
export default class TritonCardLoginScreen extends React.Component {
    state = { username: '', password: '', errorMessage: null }
    handleLogin = () => {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        ref.child("tritoncard").set({
            username: this.state.username,
            password: this.state.password
        })
        this.props.navigation.navigate('Budget')
    }

    render() {
        return (
            <View style={styles.container}>
            <Text>Login</Text>
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
            <Button title="Login" onPress={this.handleLogin} />
        <Button
            title="Don't have an account? Tap here to sign Up on UCSD's Website!"
            onPress={() => { Linking.openURL('https://services.jsatech.com/mod_auth/register.php?cid=212') }}
            />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})