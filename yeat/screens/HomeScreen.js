import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Constants, Location, Permissions, WebBrowser } from 'expo';
import firebase from 'firebase'
import {Icon, Card} from 'react-native-elements';

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
        title: 'Feed',

        headerStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            borderBottomWidth: 0,
        },

        headerTitleStyle: {
            color: '#153b50',
            fontSize: 35,
            alignSelf: 'flex-end',
            //code to change it dynamically for android or ios
            //right: Platform.OS ==='android' ? 0 : 93,
        },
        /*headerRight: (
            <Icon size={40} 
            iconStyle = {{ right: 150, top: Platform.OS === 'android' ? 7 : 3}}
            name='cog'
            type='font-awesome'
            color='#517fa4'
            />
        ),*/
    };

    state = {
        location: null,       // location tracks the user's current location
        errorMessage: null,   // error message to be displayed when status is not granted
        diningHalls: [
            { name: 'FoodWorx', longitude: -117.230415, latitude: 32.878806, dis: -1, food:[{name: 'loading'}] },
            { name: 'Cafe Ventanas', longitude: -117.242851, latitude: 32.886182, dis: -1,food:[{name: 'loading'}] },
            { name: 'Pines', longitude: -117.242558, latitude: 32.878979, dis: -1,food:[{name: 'loading'}] },
            { name: '64Degrees', longitude: -117.242060, latitude: 32.874665, dis: -1,food:[{name: 'loading'}]},
            { name: 'Club Med', longitude: -117.237402, latitude: 32.8751508, dis: -1,food:[{name: 'loading'}]},
            { name: 'Goody\'s Place', longitude: -117.240411, latitude: 32.883016, dis: -1, food:[{name: 'loading'}]},
            { name: 'OceanView', longitude: -117.242750, latitude: 32.883268, dis: -1, food:[{name: 'loading'}]}
        ],
        preferences: { // default preference: no restrictions and all cuisines
            vegan: false,
            vegetarian: false,
            Dairy: true,
            TreeNuts: true,
            Soy: true,
            Wheat: true,
            Fish: true,
            Shellfish: true,
            Eggs: true,
            Gluten: true,
            american: true,
            asian: true,
            indian: true,
            italian: true,
            mexican: true
        },
        hour: '', // breakfast, lunch, or dinner
        food: [], // food items to be loaded and displayed
        yeatiest: {name: 'loading', yeats: -1, yucks: -1, cost: -1, hall: ''},
        yuckiest: {name: 'loading', yeats: -1, yucks: -1, cost: -1, hall: ''}
    };

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
        var _this = this;
        Location.watchPositionAsync({
            enableHighAccuracy: true
        }, location => {
            _this.setState({ location });
            _this.updateDiningHalls(() => {
                _this.checkUser(() => {
                    _this.getFood(() => {
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
    updateDiningHalls(callback) {
        let location = this.state.location;
        var self = this;
        const arr = this.state.diningHalls;

        arr.forEach(function (item) {
            if (location != null) {
                // set the distance of each dining hall to
                // the current location
                item.dis = self.getDistance(location, item);
            }
        });

        // sort arr based on relative distance
        arr.sort(function (a, b) {
            return a.dis - b.dis;
        });

        // update the state and display the information on screen
        this.setState({
            diningHalls: arr
        });
        callback();
    }

    getDistance(location, diningLocation) {
        return Math.pow(location.coords.latitude - diningLocation.latitude, 2) +
            Math.pow(location.coords.longitude - diningLocation.longitude, 2);
    }

    checkUser(callback) {
        var _this = this;
        var pref = this.state.preferences;
        var currHour = parseInt(new Date().getHours(), 10);
        var mealOfTheDay;

        if (currHour < 11) {
            mealOfTheDay = 'Breakfast';
        } else if (currHour < 17) {
            mealOfTheDay = 'Lunch';
        } else {
            mealOfTheDay = 'Dinner';
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // get the pereferences and initialize preferences array
                firebase.database().ref('/users/' + user.uid + '/preferences')
                    .on('value', function (data) {
                        if (data != null) {
                            data.forEach(function (child) {
                                // removes the preferences according to firebase
                                if (child.val() == true) {
                                    if (child.key.includes('vegan')) {
                                        pref.vegan = true;
                                    } else if (child.key.includes('vegetarian')) {
                                        pref.vegetarian = true;
                                    } else if (child.key.includes('Dairy')) {
                                        pref.Dairy = false;
                                    } else if (child.key.includes('Eggs')) {
                                        pref.Eggs = false;
                                    } else if (child.key.includes('Fish')) {
                                        pref.Fish = false;
                                    } else if (child.key.includes('Soy')) {
                                        pref.Soy = false;
                                    } else if (child.key.includes('TreeNuts')) {
                                        pref.TreeNuts = false;
                                    } else if (child.key.includes('Wheat')) {
                                        pref.Wheat = false;
                                    } else if (child.key.includes('Shellfish')) {
                                        pref.Shellfish = false;
                                    } else if (child.key.includes('gluten')) {
                                        pref.Gluten = false;
                                    }
                                } else { // cuisine preference update
                                    if (child.key.includes('american')) {
                                        pref.american = false;
                                    } else if (child.key.includes('asian')) {
                                        pref.asian = false;
                                    } else if (child.key.includes('italian')) {
                                        pref.italian = false;
                                    } else if (child.key.includes('indian')) {
                                        pref.indian = false;
                                    } else if (child.key.includes('mexican')) {
                                        pref.mexican = false;
                                    }
                                }
                            })
                        }
                        // update the state of preferences
                        _this.setState({
                            preferences: pref,
                            hour: mealOfTheDay
                        });
                        console.log(_this.state.preferences);
                        console.log(_this.state.hour);
                        callback();
                    })
            } else {
            }
        });
    }

    getFood(callback) {
        var foodarr = [];
        var _this = this;
        var localyeatiest = this.state.yeatiest;
        var localyuckiest = this.state.yuckiest;
        // get either breakfast, lunch, or dinner according to the this.state.hour
        firebase.database().ref(_this.state.hour + '/').on('value', function (data) {
            data.forEach(function (child) {
                // traverse through all dining halls
                if (child.key === '64Degrees' || child.key === 'Cafe Ventanas' ||
                    child.key === 'Club Med' || child.key === 'FoodWorx' ||
                    child.key === 'Goody\'s Place' || child.key === 'OceanView' ||
                    child.key === 'Pines') {
                    var arr = [];
                    child.forEach(function (item) { // traverse through food items
                        // keep track of the item with the highest likes (yeatiest) and dislikes (yuckiest)
                        if(localyeatiest.yeats < item.child('Yeats').val()){
                            localyeatiest = {
                                name: item.key,
                                yeats: item.child('Yeats').val(),
                                yucks: item.child('Yucks').val(),
                                cost: item.child('cost').val(),
                                hall: child.key
                            }
                        }
                        if(localyuckiest.yucks < item.child('Yucks').val()){
                            localyuckiest = {
                                name: item.key,
                                yucks: item.child('Yucks').val(),
                                yeats: item.child('Yeats').val(),
                                cost: item.child('cost').val(),
                                hall: child.key
                            }
                        }
                        arr.push({ //add current food item to the current dining hall
                            name: item.key,
                            yeats: item.child('Yeats').val(),
                            yucks: item.child('Yucks').val(),
                            cost: item.child('cost').val()
                        });
                    });
                    foodarr.push({
                        name: child.key,
                        items: arr
                    })
                }
            });
            _this.setState({
                    food: foodarr,
                    yeatiest: localyeatiest,
                    yuckiest: localyuckiest
                },
                function () {
                    console.log("setState completed", this.state.food.length);
                    console.log(foodarr[0].name) });

            callback();
        });

    }

    /*
     * apply the filter according to the user's preferences
     *
     * the updated result will be recorded in this.state.food
     */
    filter() {
        var foodarr = JSON.parse(JSON.stringify(this.state.food));
        var _this = this;
        var foodedit = JSON.parse(JSON.stringify(foodarr)); // deep copy foodarr
        var foodvege = JSON.parse(JSON.stringify(foodarr));
        var foodvega = JSON.parse(JSON.stringify(foodarr));
        for (var i = 0; i < foodvege.length; i++) {
            foodvege[i].items = []; // zero-initialize the arrays for adding
            foodvega[i].items = []; // vegan or vegetarian options later
        }
        // traverse through preferences to initialize filtering
        for (let [key, val] of Object.entries(this.state.preferences)) {
            if (key === 'vegan' && val === true) { // only include vegan food to foodarr
                firebase.database().ref(_this.state.hour + '/Vegan/').on('value', function (data) {
                    var counter = 0;
                    data.forEach(function (item) {
                        counter++;
                        // traverse through dining halls to find an item
                        for (var i = 0; i < foodarr.length; i++) {
                            // attempt to find the particular item
                            var getFood = foodarr[i].items.find(function (element) {
                                return element.name === item.key;
                            });
                            if (getFood !== undefined) {
                                foodvega[i].items.push(getFood);
                            }
                        }
                        if (counter === data.numChildren()) {
                            foodarr = JSON.parse(JSON.stringify(foodvega));
                        }
                    });
                });
            } else if (key === 'vegetarian' && val === true) { // only include vegetarian food to foodarr
                firebase.database().ref(_this.state.hour + '/Vegetarian/').on('value', function (data) {
                    var counter = 0;
                    data.forEach(function (item) {
                        counter++;
                        // traverse through dining halls to find an item
                        for (var i = 0; i < foodarr.length; i++) {
                            // attempt to find the particular item
                            var getFood = foodarr[i].items.find(function (element) {
                                return element.name === item.key;
                            });
                            if (getFood !== undefined) {
                                foodvege[i].items.push(getFood); //remove this item from food array
                            }
                        }
                        if (counter === data.numChildren()) {
                            foodarr = JSON.parse(JSON.stringify(foodvege));
                        }
                    });
                });
            } else if (val === false && key !== 'vegan' && key !== 'vegetarian') { // restrictions and preferences (to filter)
                firebase.database().ref(_this.state.hour).on('value', function (data) {
                    if (data.hasChild(key)) { // check if the category exists
                        var count = 0;
                        foodedit = JSON.parse(JSON.stringify(foodarr));
                        data.child(key).forEach(function (item) {
                            count++;
                            // traverse through dining halls to find an item
                            for (var i = 0; i < foodedit.length; i++) {
                                // attempt to find the particular item
                                var ind = foodedit[i].items.findIndex(function (element) {
                                    return element.name === item.key;
                                });
                                if (ind >= 0) {
                                    foodedit[i].items.splice(ind, 1); //remove this item from food array
                                    break;
                                }
                            }
                            if (count === data.child(key).numChildren()) {
                                foodarr = JSON.parse(JSON.stringify(foodedit));
                            }
                        })
                    }
                })
            }
        }
        this.setState({
            food: foodarr // update the filtered food array to the state attribute
        }, function () {
            _this.state.food[0].items.forEach(function (data) {
                console.log(data.name)
            });
            var newdininghalls = _this.state.diningHalls;
            var count = 0;
            for(var i=0; i< _this.state.diningHalls.length;i++){
                count++;
                for(var j=0; j< _this.state.food.length;j++){
                    if(_this.state.diningHalls[i].name.includes(_this.state.food[j].name)){
                        newdininghalls[i].food = _this.state.food[j].items;
                        newdininghalls[i].food.sort(function(a,b){
                            return b.yeats - a.yeats;
                        });
                    }
                }
            }
            if(count === _this.state.diningHalls.length){
                _this.setState({
                    diningHalls: newdininghalls //update food to dining halls
                })
            }
        })
    }


    // This will allow the user to like a food item
    async likeFood(hour, diningHall, food) {
        var _this = this;
        firebase.database().ref('/'+hour+'/'+diningHall+'/'+food+'/').once('value', function (snapshot) {

            var numLikes = snapshot.val().Yeats;
            numLikes = numLikes + 1;

            firebase.database().ref('/'+hour+'/'+diningHall+'/'+food).update(
                {
                    Yeats: numLikes
                });

            _this.componentDidMount();

        });


    }

    // This will allow the user to dislike a food item
    async dislikeFood(hour, diningHall, food) {
        var _this = this;
        firebase.database().ref('/'+hour+'/'+diningHall+'/'+food+'/').once('value', function (snapshot) {

            var numLikes = snapshot.val().Yucks;
            numLikes = numLikes + 1;

            firebase.database().ref('/'+hour+'/'+diningHall+'/'+food).update(
                {
                    Yucks: numLikes
                });
            _this.setState({hour: hour})
        });
        _this.componentDidMount();

    }

    // This will add an item to the favorites
    async addFavorite(food, currHall, cost) {

        var userID = firebase.auth().currentUser.uid;

        firebase.database().ref('/users/' + userID + '/Favorites/' + food).set(
            {
                name: food,
                diningHall: currHall,
                price: cost
            });

        alert("Added to My Yeats!");
    }


    render() {

        return (

            <View style={styles.container}>
                <ScrollView style={styles.container} >
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.header}>Yeatiest</Text>
                    
                    
                    <View style={{left:15, top: 5}}>
                        <Icon
                            onPress={() => this.likeFood(this.state.hour, this.state.yeatiest.hall, this.state.yeatiest.name)}
                            name='thumbs-up'
                            type='font-awesome'
                            color='#153b50'
                        />
                    <Text style={{color: '#153b50', fontSize: 25, left: 38, top: -25}}>{this.state.yeatiest.yeats}</Text>

                    </View>
                    </View>

                    <Card containerStyle={{ alignSelf: 'center', width: 325, height: 150, backgroundColor: '#39cbd6', borderRadius: 15, top:-5, marginTop: 0 }}
                          title={
                              <View style={{ alignItems: 'flex-start' }}>
                                  <Text adjustsFontSizeToFit numberOfLines={1}
                                        style={{ color: '#fff', fontWeight: 'bold', fontSize: 30, right: 5, top: -10 }} >
                                      {this.state.yeatiest.name}
                                  </Text>
                              </View>
                          }>

                        <Text style={{color: "#fff", fontSize: 18}}>{this.state.yeatiest.hall}</Text>
                        <Text style={{color: "#fff", fontSize: 18}}>{this.state.yeatiest.cost}</Text>

                        <View style={styles.heartStyle}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
                                onPress={() => this.addFavorite(this.state.yeatiest.name, this.state.yeatiest.hall, this.state.yeatiest.cost)}
                            />
                        </View>

                    </Card>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={styles.headerTwo}>Yuckiest</Text>
                        
                        <View style={{ left:15, top: 20}}>
                            <Icon
                                onPress={() => this.dislikeFood(this.state.hour, this.state.yuckiest.hall, this.state.yuckiest.name)}
                                name='thumbs-down'
                                type='font-awesome'
                                color='#153b50'
                            />
                        <Text style={{color: '#153b50', fontSize: 25, left: 38, top: -25}}>{this.state.yuckiest.yucks}</Text>

                        </View>
                    </View>


                    <Card containerStyle={{ alignSelf: 'center', width: 325, height: 150, backgroundColor: '#39cbd6', borderRadius: 15, marginTop: 8 }}
                          title={
                              <View style={{ alignItems: 'flex-start' }}>
                                  <Text adjustsFontSizeToFit numberOfLines={1}
                                        style={{ color: '#fff', fontWeight: 'bold', fontSize: 30, right: 5, top: -10 }} >
                                      {this.state.yuckiest.name}
                                  </Text>
                              </View>
                          }>

                        <Text style={{color: "#fff", fontSize: 18}}>{this.state.yuckiest.hall}</Text>
                        <Text style={{color: "#fff", fontSize: 18}}>{this.state.yuckiest.cost}</Text>

                        <View style={styles.heartStyle}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
                                onPress={() => this.addFavorite(this.state.yuckiest.name, this.state.yuckiest.hall, this.state.yuckiest.cost)}
                            />
                        </View>

                    </Card>

                    <Text style={styles.headerTwo}>Dining Halls</Text>

                    {/* Prints out Dining Halls alongside all food items within them */}
                    <View style={styles.container}>
                        { this.state.diningHalls.map((item, key)=>(
                            <View key={key}>
                                <Text style={styles.topDiningHall}> { item.name } </Text>
                                <ScrollView horizontal={true}>
                                    { item.food.map((food, key1)=>(
                                        <Card key={key1} containerStyle={styles.foodItemCard}>
                                            <Text style={styles.foodName}>
                                                {food.name}
                                            </Text>

                                            <Text style={styles.foodCost}>
                                                {food.cost}
                                            </Text>

                                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                {/* Thumbs up icon will be the button to like */}
                                                <Icon
                                                    onPress={() => this.likeFood(this.state.hour, item.name, food.name)}
                                                    name='thumbs-up'
                                                    type='font-awesome'
                                                    color='#153b50'
                                                    paddingHorizontal={20}
                                                    paddingBotton={5}
                                                    size={30}
                                                />

                                                <Text>     </Text>

                                                {/* Thumbs down icon will be the button to dislike */}
                                                <Icon
                                                    onPress={() => this.dislikeFood(this.state.hour, item.name, food.name)}
                                                    name='thumbs-down'
                                                    type='font-awesome'
                                                    color='#153b50'
                                                    paddingBottom={5}
                                                    size={30}
                                                />

                                                <Text>     </Text>

                                                {/* Heart icon will be the button to add to my yeats */}
                                                <Icon
                                                    onPress={() => this.addFavorite(food.name, item.name, food.cost) }
                                                    name='heart'
                                                    type='font-awesome'
                                                    color='#153b50'
                                                    size={30}
                                                    paddingHorizontal={0}
                                                />

                                            </View>

                                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                              <Text>{food.yeats}         {food.yucks}           </Text>
                                            </View>
                                        </Card>

                                    ))}
                                </ScrollView>
                            </View>))}
                    </View>
                </ScrollView>
            </View>

        );


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    foodItem: {
        marginLeft: 20,
        borderWidth: 0.5,
        fontSize: 32,
        textAlign: 'center',
        flexDirection: "row",
    },
    foodName: {
        fontSize: 18,
        color: '#153b50',
        textAlign: 'center',
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    foodCost: {
        fontSize: 16,
        color: '#153b50',
        textAlign: 'center',
        paddingBottom: 10,
        fontWeight: 'bold',
    },
    likeButton: {
        height: 48,
        width: 48,
    },
    topDiningHall: {
        color: '#39cbd6',
        fontSize: 22,
        textAlign: 'left',
        flexDirection: "row",
        paddingLeft: 12,
        paddingTop: 10,
        fontWeight: 'bold',
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
    header: {
        color: '#153b50',
        fontSize: 28,
        paddingLeft: 15
    },
    headerTwo: {
        color: '#153b50',
        fontSize: 28,
        paddingLeft: 15,
        paddingTop: 15,
    },
    foodItemCard: {
        width: 180,
        height: 170,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    heartStyle: {
        top: 22,
        right: -137
    }
});
