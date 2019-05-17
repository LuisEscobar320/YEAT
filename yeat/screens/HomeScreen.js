import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Constants, Location, Permissions, WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';

/*
 * HomeScreen.js
 * 
 * aka FeedScreen. It displays the yeatiest and yuckiest meal of the day,
 * sorts dining halls by user's current location,
 * and allows horizontal scrolling view of the dining items
 * using Firebase Realtime Database
 */
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    location: null,       // location tracks the user's current location
    errorMessage: null,   // error message to be displayed when status is not granted
    diningHalls: [
      { name: 'Foodwarx', longitude: -117.230415, latitude: 32.878806, dis: -1},
      { name: 'Pines', longitude: -117.242558, latitude: 32.878979, dis: -1},
      { name: '64 Degrees', longitude: -117.242060, latitude: 32.874665, dis: -1},
      { name: 'The Bistro', longitude: -117.242044, latitude: 32.888023, dis: -1},
      { name: 'Goody\'s', longitude: -117.240411, latitude:32.883016, dis: -1},
      { name: 'Oceanview Terrace', longitude: -117.242750, latitude: 32.883268, dis: -1}
    ]
  }

  /*
   * handles the potential error message
   * and evokes get location function
   */
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'This function is not supported in android emulator',
      });
    } else {
      this._getLocationAsync();
    }
  }

  /*
   * gets user's current location info
   */
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  /*
   * updates user's current location info
   * and updates the dining hall locations accordingly
   */
  componentDidMount() {
    var _this=this;
    Location.watchPositionAsync({
      enableHighAccuracy:true
    }, location => {
      _this.setState({location});
      _this.updateDiningHalls();
    });
  }

  /*
   * handles dining hall sorting operation
   * and updates the order in which they
   * are displayed on the screen
   */
  updateDiningHalls(){
    let location = this.state.location;
    var self = this;
    const arr = this.state.diningHalls;

    arr.forEach(function(item){
      if(location!=null){
        // set the distance of each dining hall to 
        // the current location
        item.dis = self.getDistance(location, item);
      }
    });

    // sort arr based on relative distance
    arr.sort(function(a,b){
      return a.dis - b.dis;
    })

    // update the state and display the information on screen
    this.setState( {
      diningHalls: arr
    })
  }

  getDistance(location, diningLocation){
    return Math.pow(location.coords.latitude - diningLocation.latitude, 2) + 
           Math.pow(location.coords.longitude - diningLocation.longitude, 2);
  }

  render() {
    /* let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    } */

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}> yEAT@UCSD </Text>
          </View>
          
          {/*  
          <View style={styles.container}>
            <Text style={styles.paragraph}>{text}</Text>
          </View>
          */}

          <View style={styles.container}>
            { this.state.diningHalls.map((item, key)=>(
            <Text key={key} style={styles.getStartedText}> { item.name } </Text>)
            )}
          </View>


          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
      
    );


  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
