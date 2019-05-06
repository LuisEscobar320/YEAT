import { Button } from 'react-native';
import firebase from 'firebase';

import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// firebase configuration setup
var config = {
    apiKey: "AIzaSyALKZhwhY6_AyEe94gqKQYgx0WX6tlr82U",
    authDomain: "yeat-dc4bc.firebaseapp.com",
    databaseURL: "https://yeat-dc4bc.firebaseio.com",
    projectId: "yeat-dc4bc",
    storageBucket: "yeat-dc4bc.appspot.com",
    messagingSenderId: "790782934000"
  };
firebase.initializeApp(config);

export default class LoginScrren extends React.Component {
  static navigationOptions = {
    title: 'Register and Login',
  };

    // handling login with google

    signin = async () => {
      try{
        const result = await Expo.Google.logInAsync({
          behavior: 'web',
          androidClientId: '790782934000-qnrgh51jc2bhjmid7ltcqu1uu9pctr36.apps.googleusercontent.com',
          iosClientId: '790782934000-229ca1tq0h4l1n9dibvotu4qluiuv8gc.apps.googleusercontent.com',
          scopes: ['profile','email'],
        });
  
        if(result.type==='success'){
          this.onSignIn(result);
          return result.accessToken;
        } else{
          return {cancelled: true};
        }
      } catch(e){
  
      }
    }
  
    onSignIn = (googleUser) => {
      console.log('Google Auth Response', googleUser);
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken, 
              googleUser.accessToken
              );
          // Sign in with credential from the Google user.
          firebase.auth().signInAndRetrieveDataWithCredential(credential)
          .then(function(cred){
            if(cred.additionalUserInfo.isNewUser){
              firebase.database().ref('/users/'+cred.user.uid).set(
                {
                  gmail: cred.user.email,
                  name: cred.user.displayName,
                  created_at: Date.now()
                }
              )
            } else{
              firebase.database().ref('/users/'+cred.user.uid).update(
                {
                  last_logged_in: Date.now()
                }
              )
            }
          })
  
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
      );
    }
  
    //detect the same user
    isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.uid) {
            // We don't need to reauth the Firebase connection.
            return true;
          }
        }
      }
      return false;
    }


  render() {
    return (
      <ScrollView style={styles.container}>
          
          <Image
              source={require('../assets/images/robot-dev.png')}
              style={styles.welcomeImage}/>

          <Text style={styles.getStartedText}> yEAT@UCSD </Text>
          
          <View><Button
              onPress={()=> this.signin()}
              title="Login"
              color="#841584"
              /></View>
      </ScrollView>
    );
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    textAlign: 'center'
  },  
  welcomeImage: {
    width: 200,
    height: 160,
    resizeMode: 'contain',
    paddingTop: 30
  },
})