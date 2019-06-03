import firebase from 'firebase';
import React from 'react';
import {Platform, Image, StyleSheet, ScrollView, Text, View} from "react-native";
import {Button, Card, Icon} from 'react-native-elements';
import {createAppContainer, createStackNavigator} from 'react-navigation';

/*
MyYeatsScreen class renders the My Yeats screen of the app
Shows the user up to 10 food items that they have "favorited"
on the Feed screen
 */
class MyYeatsScreen extends React.Component {
    static navigationOptions = {
        title: 'My Yeats',

        headerStyle:{
            backgroundColor: '#fff',
            elevation: 0,
            borderBottomWidth: 0,
        },

        headerTitleStyle: {
            color: '#153b50',
            fontSize: 35,
        },
    };

    constructor(props) {
        super(props);
        this.getYeats();

        this.state = {
            arr: [],
            hideCard: false,
            showCard1: false,
            showCard2: false,
            showCard3: false,
            showCard4: false,
            showCard5: false,
            showCard6: false,
            showCard7: false,
            showCard8: false,
            showCard9: false,
            showCard10: false,
            numCards: 0,
        };

    }

    // Method gets yeats (favorites) from the database by calling the controller
    getYeats() {
        this.getYeatsController();
    }

    // Method gets the yeats (favorites) from the database
    async getYeatsController() {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId + "/Favorites");
        let bool = false;
        await ref.on('value', (snap) => {

            // get children as an array
            var items = [];
            var num = 0;
            snap.forEach((child) => {
                num++;
                this.showCards(num);
                const pbj = {'check': child.key, 'bool': child.val()};
                items.push(
                    child.key,
                    child.val().name,
                    child.val().diningHall,
                    child.val().price,
                );
            });

            this.setState({
                arr: items,
                numCards: num
            });
        });
    }

    // Method removes food item from My Yeats
    removeFav(itemNum, fav, cardNum) {
        var userId = firebase.auth().currentUser.uid;
        let ref = firebase.database().ref("users/" + userId + "/Favorites/" + itemNum);
        ref.remove();
        this.removeCard(cardNum);
        alert(fav + ' Removed!')
    }

    // Method removes the card component when food is removed from My Yeats
    removeCard(num) {
        if (num === 1) {
            this.setState({
                showCard1: false,
            });
        } else if (num === 2) {
            this.setState({
                showCard2: false,
            });
        } else if (num === 3) {
            this.setState({
                showCard3: false,
            });
        }
        else if (num === 4) {
            this.setState({
                showCard4: false,
            });
        } else if (num === 5) {
            this.setState({
                showCard5: false,
            });
        } else if (num === 6) {
            this.setState({
                showCard6: false,
            });
        }
        if (num === 7) {
            this.setState({
                showCard7: false,
            });
        } else if (num === 8) {
            this.setState({
                showCard8: false,
            });
        } else if (num === 9) {
            this.setState({
                showCard9: false,
            });
        }
        else if (num === 10) {
            this.setState({
                showCard10:false,
            })
        }
    }

    // Method sets the cards to true if they are to be shown
    showCards(num) {
        if (num > 0) {
            this.setState ({
                showCard1: true,
            });
        }
        if (num > 1) {
            this.setState ({
                showCard2: true,
            });
        }
        if (num > 2) {
            this.setState ({
                showCard3: true,
            });
        }
        if (num > 3) {
            this.setState ({
                showCard4: true,
            });
        }
        if (num > 4) {
            this.setState ({
                showCard5: true,
            });
        }
        if (num > 5) {
            this.setState ({
                showCard6: true,
            });
        }
        if (num > 6) {
            this.setState ({
                showCard7: true,
            });
        }
        if (num > 7) {
            this.setState ({
                showCard8: true,
            });
        }
        if (num > 8) {
            this.setState ({
                showCard9: true,
            });
        }
        if (num > 9) {
            this.setState ({
                showCard10: true,
            });
        }
    }

    // Method returns text if the user has no yeats
    noCards() {
        if (this.state.numCards === 0) {
            return (
                <Text style= {{ color: '#9da9aa', fontSize: 20, textAlign: 'center', margin: 30}}>
                    You have no favorites yet.{'\n'}
                    Tap on the heart for any food item {'\n'} and it will be added to My Yeats!
                </Text>
            );  
        }
    }

    /* Displays the cards on the screen of the food item that the user marked as favorite
       Each card contains the name of the food item, its price, and dining hall
       User can tap on the heart to remove the card from My Yeats
       User can add up to 10 favorites
     */
    render() {
        return (
            
            <View style={{ flex: 1, justifyContent: "center" }}>
                {this.noCards}
                <ScrollView style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.showCard1 ? (
                            <Card containerStyle={styles.cardContainer}
                                    title = {
                                        <ScrollView horizontal={true}>
                                        <View style = {{ alignItems: 'flex-start' }}>
                                           <Text adjustsFontSizeToFit numberOfLines={1}
                                           style = {styles.cardTitleStyle} >{this.state.arr[1]}
                                           </Text>
                                        </View>
                                        </ScrollView>
                                    }>
                                <Text style = {styles.diningHallStyle}>{this.state.arr[2]}</Text>
                                <Text style = {styles.priceStyle}>{this.state.arr[3]}</Text>

                                <View style = {styles.heartStyle}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[0], this.state.arr[1], this.state.numCards)}
                                    />
                                </View>
                            </Card>
                        ) : null}

                        {this.state.showCard2 ? (
                            <Card  containerStyle={styles.cardContainer}
                                   title = {
                                        <ScrollView horizontal={true}>
                                        <View style = {{ alignItems: 'flex-start' }}>
                                           <Text adjustsFontSizeToFit numberOfLines={1}
                                           style = {styles.cardTitleStyle} >{this.state.arr[5]}
                                           </Text>
                                        </View>
                                        </ScrollView>
                                   }>
                                <Text style = {styles.diningHallStyle}>{this.state.arr[6]}</Text>
                                <Text style = {styles.priceStyle}>{this.state.arr[7]}</Text>

                                <View style = {styles.heartStyle}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[4], this.state.arr[5], this.state.numCards)}
                                    />
                                </View>

                            </Card>
                        ) : null}

                        {this.state.showCard3 ? (

                            <Card  containerStyle={styles.cardContainer}
                                title = {
                                    <ScrollView horizontal={true}>
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text adjustsFontSizeToFit numberOfLines={1}
                                           style = {styles.cardTitleStyle} >{this.state.arr[9]}
                                           </Text>
                                       </View>
                                    </ScrollView>
                                }>
                                <Text style = {styles.diningHallStyle}>{this.state.arr[10]}</Text>
                                <Text style = {styles.priceStyle}>{this.state.arr[11]}</Text>

                                <View style = {styles.heartStyle}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[8], this.state.arr[9], this.state.numCards)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard4 ? (

                            <Card  containerStyle={styles.cardContainer}
                                title = {
                                    <ScrollView horizontal={true}>
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text adjustsFontSizeToFit numberOfLines={1}
                                           style = {styles.cardTitleStyle} >{this.state.arr[13]}
                                           </Text>
                                       </View>
                                    </ScrollView>
                                }>
                                <Text style = {styles.diningHallStyle}>{this.state.arr[14]}</Text>
                                <Text style = {styles.priceStyle}>{this.state.arr[15]}</Text>

                                <View style = {styles.heartStyle}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[12], this.state.arr[13], this.state.numCards)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard5 ? (

                            <Card  containerStyle={styles.cardContainer}
                                title = {
                                    <ScrollView horizontal={true}>
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text adjustsFontSizeToFit numberOfLines={1}
                                           style = {styles.cardTitleStyle} >{this.state.arr[17]}
                                           </Text>
                                       </View>
                                    </ScrollView>
                                }>
                                <Text style = {styles.diningHallStyle}>{this.state.arr[18]}</Text>
                                <Text style = {styles.priceStyle}>{this.state.arr[19]}</Text>

                                <View style = {styles.heartStyle}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[16], this.state.arr[17], this.state.numCards)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard6 ? (

                            <Card  containerStyle={styles.cardContainer}
                                title = {
                                    <ScrollView horizontal={true}>    
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text adjustsFontSizeToFit numberOfLines={1}
                                           style = {styles.cardTitleStyle} >{this.state.arr[21]}
                                           </Text>
                                       </View>
                                    </ScrollView>
                                }>
                                <Text style = {styles.diningHallStyle}>{this.state.arr[22]}</Text>
                                <Text style = {styles.priceStyle}>{this.state.arr[23]}</Text>

                                <View style = {styles.heartStyle}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[20], this.state.arr[21], this.state.numCards)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard7 ? (

                            <Card  containerStyle={styles.cardContainer}
                                title = {
                                    <ScrollView horizontal={true}>
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text adjustsFontSizeToFit numberOfLines={1}
                                           style = {styles.cardTitleStyle} >{this.state.arr[25]}
                                           </Text>
                                       </View>
                                    </ScrollView>
                                   }>
                                <Text style = {styles.diningHallStyle}>{this.state.arr[26]}</Text>
                                <Text style = {styles.priceStyle}>{this.state.arr[27]}</Text>

                                <View style = {styles.heartStyle}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[24], this.state.arr[25], this.state.numCards)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard8 ? (

                            <Card  containerStyle={styles.cardContainer}
                                title = {
                                    <ScrollView horizontal={true}>
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text adjustsFontSizeToFit numberOfLines={1}
                                           style = {styles.cardTitleStyle} >{this.state.arr[29]}
                                           </Text>
                                       </View>
                                    </ScrollView>
                                }>
                                <Text style = {styles.diningHallStyle}>{this.state.arr[30]}</Text>
                                <Text style = {styles.priceStyle}>{this.state.arr[31]}</Text>

                                <View style = {styles.heartStyle}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[28], this.state.arr[29], this.state.numCards)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard9 ? (

                            <Card  containerStyle={styles.cardContainer}
                                title = {
                                    <ScrollView horizontal={true}>
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text adjustsFontSizeToFit numberOfLines={1}
                                           style = {styles.cardTitleStyle} >{this.state.arr[33]}
                                           </Text>
                                       </View>
                                    </ScrollView>
                                }>
                                <Text style = {styles.diningHallStyle}>{this.state.arr[34]}</Text>
                                <Text style = {styles.priceStyle}>{this.state.arr[35]}</Text>

                                <View style = {styles.heartStyle}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[32], this.state.arr[33], this.state.numCards)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard10 ? (

                            <Card  containerStyle={styles.cardContainer}
                                title = {
                                    <ScrollView horizontal={true}>
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text adjustsFontSizeToFit numberOfLines={1}
                                           style = {styles.cardTitleStyle} >{this.state.arr[37]}
                                           </Text>
                                       </View>
                                    </ScrollView>
                                }>
                                <Text style = {styles.diningHallStyle}>{this.state.arr[38]}</Text>
                                <Text style = {styles.priceStyle}>{this.state.arr[39]}</Text>

                                <View style = {styles.heartStyle}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[36], this.state.arr[37], this.state.numCards)}
                                    />
                                </View>

                            </Card>

                        ) : null}


                    </View>
                </ScrollView>

                <View style={{bottom: 0, left: 10, alignItems: 'flex-end', flex: 1, position: 'absolute'}}>
                    <Icon
                        reverse
                        name='user'
                        type='font-awesome'
                        color='#153b50'
                        onPress={()=> {
                            return this.props.navigation.navigate('Profile');
                        }}
                    />
                </View>
            </View>

        );
    }
}

class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        headerStyle:{
            backgroundColor: '#153b50',
            elevation: 0,
            borderBottomWidth: 0,
        },

        headerTitleStyle: {
            color: '#fff',
            fontSize: 35,
        }
    };

    constructor(props) {
        super(props);

        this.readUserNameEmail();

        this.state = {
            name: '',
            email: '',
        };

    }

    // Get the user's name and email by calling the controller
    readUserNameEmail() {
        this.readUserNameEmailController();
    }

    // Get the user's name and email from database
    async readUserNameEmailController() {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId);
        var userName = '';
        var userEmail = '';

        await ref.once("value")
            .then(function(snapshot) {
                userName = snapshot.child("name").val();
                userEmail = snapshot.child("gmail").val();
            });

        this.setState({name: userName});
        this.setState({email: userEmail});
    }

    // Displays the user's name, email, and the logout button
    render() {
        return (
            <ScrollView style={styles.profileContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text adjustsFontSizeToFit numberOfLines={1}
                          style = {styles.nameStyle}>{this.state.name}</Text>
                    <Text style = {styles.emailStyle}>{this.state.email}</Text>

                    <Button
                        title="Logout"
                        buttonStyle={styles.profileButton}
                        onPress={()=> firebase.auth().signOut()}
                    />

                    <Text style={{ fontSize: 18, color: '#fff', paddingTop: 150}}>Made by Team</Text>

                    <Image
                        source={require('../assets/images/oof.png')}
                        style={styles.oofImage}
                    />
                </View>
            </ScrollView>
        );
    }
}

const AppNavigator = createStackNavigator({
    MyYeats: {
        screen: MyYeatsScreen,
    },
    Profile: {
        screen: ProfileScreen,
    },
}, {
    initialRouteName: 'MyYeats',
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    profileContainer: {
        flex: 1,
        backgroundColor: '#153b50',
        textAlign: 'center'
    },
    cardContainer: {
        width: 300,
        height: 150,
        backgroundColor: '#39cbd6',
        borderRadius: 15
    },
    button: {
        backgroundColor: '#153b50',
        borderRadius: 15,
        width: 200,
    },
    profileButton: {
        backgroundColor: '#00C6D7',
        borderRadius: 15,
        width: 200,
    },
    nameStyle: {
        color: '#fff',
        fontSize: 35,
        textAlign: "center",
        paddingTop: 35,
    },
    emailStyle: {
        color: '#00C6D7',
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 80
    },
    oofImage: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        paddingTop: 30
    },
    cardTitleStyle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        top: -5,
    },
    diningHallStyle: {
        color: '#fff',
        fontSize: 18,
        padding: 20,
        top: -20,
        right: 20,
    },
    priceStyle: {
        color: '#fff',
        fontSize: 18,
        padding: 20,
        top: -60,
        right: 20,
        marginTop: 0
    },
    heartStyle: {
        top: Platform.OS === 'ios' ? -50 : -60,
        right: -126
    }
});
