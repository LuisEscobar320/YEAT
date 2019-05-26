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
import firebase from 'firebase'
import {Button, CheckBox, Icon} from 'react-native-elements';

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
      { name: 'Foodworx', longitude: -117.230415, latitude: 32.878806, dis: -1},
      { name: 'Cafe Ventanas', longitude:-117.242851, latitude: 32.886182, dis: -1},
      { name: 'Pines', longitude: -117.242558, latitude: 32.878979, dis: -1},
      { name: '64 Degrees', longitude: -117.242060, latitude: 32.874665, dis: -1},
      { name: '64 Degrees North', longitude: -117.2443437, latitude: 32.8748439, dis: -1},
      { name: 'Club Med', longitude: -117.237402, latitude: 32.8751508, dis:-1},
      { name: 'The Bistro', longitude: -117.242044, latitude: 32.888023, dis: -1},
      { name: 'Goody\'s', longitude: -117.240411, latitude:32.883016, dis: -1},
      { name: 'Oceanview Terrace', longitude: -117.242750, latitude: 32.883268, dis: -1}
    ],
    preferences: [],
    hasVege: null,
    hasVega: null,
    food: []
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
      _this.updateDiningHalls(()=>{
        _this.checkUser( ()=> {
          _this.getFood( ()=>{
            _this.filter()
          });
        });
      });
    });
  }

  /*
   * handles dining hall sorting operation
   * and updates the order in which they
   * are displayed on the screen
   */
  updateDiningHalls(callback){
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
    callback();
  }

  getDistance(location, diningLocation){
    return Math.pow(location.coords.latitude - diningLocation.latitude, 2) + 
           Math.pow(location.coords.longitude - diningLocation.longitude, 2);
  }

  checkUser(callback){
    var arr = this.state.preferences;
    var _this = this;
    var vege = false;
    var vega = false;
    firebase.auth().onAuthStateChanged(user=> {
      if(user){
        // get the pereferences and initialize preferences array
        firebase.database().ref('/users/'+user.uid+'/preferences')
        .on('value', function(data){
          if(data!=null){
            data.forEach(function(child){
              // removes the preferences according to firebase
              if(child.val() == true){
                arr.push(child.key.toLowerCase()) 
                if(!vege && child.key.includes('vege')){
                  vege = true;
                }
                if(!vega && child.key.includes('vega')){
                  vega = true;
                }
              }
            })
          }
          // update the state of preferences
          _this.setState({
            preferences: arr,
            hasVega: vega,
            hasVege: vege
          })
          callback();
        })
      } else{
      }
    });
  }

  getFood(callback){
    var foodarr = this.state.food;
    var vege = !this.state.hasVege;
    var vega = !this.state.hasVega;
    var _this = this;

    firebase.database().ref('/').on('value', function(data){
      data.forEach(function(child){
        if(child.key!='users'){ // traverse through all dining halls
          var arr = [];
          child.forEach(function(item){ // traverse through food items
            arr.push({
              name: item.key,
              info: item
            });
          })
          foodarr.push({
            name: child.key,
            items: arr 
          })
        }
      })
      _this.setState({
        food: foodarr
      })
      console.log(_this.state.food)
      callback();
    });

  }

  filter(){
    var foodarr = this.state.food;
    for(var i=0; i<foodarr.length;i++){ //traverse through dining halls/categories
      for(var j=0; j<foodarr[i].items.length;j++){ //traverse through each food
        // var vege = !this.state.hasVege;
        // var vega = !this.state.hasVega;
        
        // console.log(foodarr[i].items[j].info)

        // foodarr[i].items[j].info["Nutrition"].forEach(function(nutinfo){
        //   if(vege && nutinfo.key.includes('vege')){
        //     vege = true; //found vegetarian
        //   } else if(vega && nutinfo.key.includes('vega')){
        //     vega = true; //found vegetarian
        //   }
        // })

        // if(!vega || !vege){ //nonvegetarian food for vegetarian user or
        //                     //nonvegan food for nonvegan user
        //   foodarr[i].items.splice(j--,1); //remove this food item
        // }
      }
    }

    this.setState({
      food: foodarr
    })
  }



/* Read current likes */
async readNumLikes(currDiningHall, food) {
  var ref = firebase.database().ref(currDiningHall + food + 'Yeats');

  await ref.once("value");

  return ref;
}

  /* Push likes back to firebase */
  writeNumLikes(currDiningHall, food, Yeats) {
    firebase.database().ref(currDiningHall + food).update(Yeats);
  }

  // This will allow the user to like a food item
  likeFood(currDiningHall, foodItem) {
    currentLikes=this.readNumLikes(currDiningHall, foodItem)
    curentLikes = currentLikes + 1
    this.writeUserData(currDiningHall, foodItem, currentLikes);

  }

  // This will allow the user to dislike a food item



  // Get food items from the database



  // This will add an item to the favorites
  async addFavorite(food) {
    console.log("I am here");
    var userID = firebase.auth().currentUser.uid;

    console.log(userID)

    
    firebase.database().ref('/users/' + userID + '/Favorites/' + food).set(
      {
        name: food,
        price: '$3.00',
        diningHall: '64Degrees-Breakfast'
      });
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
          
          {/* sort dining halls based on location */}
          <View style={styles.container}>
            { this.state.diningHalls.map((item, key)=>(
            <Text key={key} style={styles.getStartedText}> { item.name } </Text>)
            )}
          </View>

          {/* Print Closest Dining Hall */}
          <View style={styles.topDiningHall}>
              <Text style={styles.topDiningHall}> {this.state.diningHalls[0].name} </Text>
          </View>

          {/* Janked together a example to add item to favorites 
              THIS NEEDS TO BE REPLACED WITH SOMETHING THAT ACTUALLY IS DYNAMIC*/}
          <View style={styles.foodItem}>
              <Text style={styles.foodItem}>
                  AvacadoToast
              </Text>
              
              <Button
                onPress={()=>this.addFavorite("AvacadoToast")}
                buttonStyle={styles.likeButton}
                name="Favorite1"
              />

          </View>


          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  foodItem: {
    fontSize: 32,
    textAlign: 'center',
    flexDirection: "row",
  },
  likeButton: {
    height: 48,
    width: 48,
  },
  topDiningHall: {

    fontSize: 48,
    textAlign: 'left',
    flexDirection: "row",
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
