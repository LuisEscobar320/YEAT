import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends React.Component {

    componentDidMount(){
      this.checkLoggedIn();
    }

    constructor() {
      super();
    }
  
    checkLoggedIn = ()=>{
      firebase.auth().onAuthStateChanged(user=> {
        if(user){
          this.props.navigation.navigate('Main');
        } else{
          this.props.navigation.navigate('Auth');
        }
      })
    }
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
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
    welcomeImage: {
      width: 200,
      height: 160,
      resizeMode: 'contain',
      paddingTop: 30
    },
  })