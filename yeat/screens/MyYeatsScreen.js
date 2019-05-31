import firebase from 'firebase';
import React from 'react';
import {Platform} from 'react-native';
import {Image, StyleSheet, ScrollView, Text, View} from "react-native";
import {Button, Card, Icon} from 'react-native-elements';
import {createAppContainer, createStackNavigator} from 'react-navigation';

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
            //right: Platform.OS ==='android' ? 0 : 120,
        },

        /*headerRight: (
            <Icon size={40} iconStyle={{right:200}}
                name='user'
                type='font-awesome'
                color='#153b50'
            />
        ),*/
    };

    constructor(props) {
        super(props);
        this.listenForItems();

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

    async listenForItems() {
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
            console.log("item[0] is");
            console.log(items[0]);
            this.setState({
                arr: items,
                numCards: num
            });

        });
    }

    // Removes food item from my yeats
    removeFav(itemNum, fav, cardNum) {
        var userId = firebase.auth().currentUser.uid;
        let ref = firebase.database().ref("users/" + userId + "/Favorites/" + itemNum);
        console.log("REF ISSSSSSSSSSSSSSSSSS");
        console.log(ref);
        ref.remove();
        this.removeCard(cardNum);
        alert(fav + ' Removed!')
    }

    // Removes the card component when food is removed from my yeats
    removeCard(num) {
        if (num == 1) {
            this.setState({
                showCard1: false,
            });
        } else if (num == 2) {
            this.setState({
                showCard2: false,
            });
        } else if (num == 3) {
            this.setState({
                showCard3: false,
            });
        }
        else if (num == 4) {
            this.setState({
                showCard4: false,
            });
        } else if (num == 5) {
            this.setState({
                showCard5: false,
            });
        } else if (num == 6) {
            this.setState({
                showCard6: false,
            });
        }
        if (num == 7) {
            this.setState({
                showCard7: false,
            });
        } else if (num == 8) {
            this.setState({
                showCard8: false,
            });
        } else if (num == 9) {
            this.setState({
                showCard9: false,
            });
        }
        else if (num == 10) {
            this.setState({
                showCard10:false,
            })
        }
    }


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

    noCards() {
        if (this.state.numCards == 0) {
            return (
                <Text style= {{ color: '#9da9aa', fontSize: 20, textAlign: 'center', margin: 30}}>
                    You have no favorites yet.{'\n'}
                    Tap on the heart for any food item {'\n'} and it will be added to My Yeats!
                </Text>
            );
        }
    }

    render() {
        console.log(this.state.arr[1]);
        console.log("Num cards is");
        console.log(this.state.numCards);
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ScrollView style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {this.noCards()}
                        {this.state.showCard1 ? (
                            <Card  containerStyle={{ width: 300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                                   title = {
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, right: 10, top: -10 }} > {this.state.arr[1]} </Text>
                                       </View>
                                   }>
                                <Icon
                                    name='location-on'
                                    color='#153b50'
                                    size={15}
                                    iconStyle={{
                                        top: 71,
                                        right: 130
                                    }}
                                />
                                <Text style = {styles.diningHallStyle}>{this.state.arr[2]} </Text>

                                <Text style = {styles.priceStyle}> {this.state.arr[3]} </Text>


                                <View style = {{ top: -180, right: -120 }}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[0], this.state.arr[1], 1)}
                                    />
                                </View>
                            </Card>
                        ) : null}

                        {this.state.showCard2 ? (
                            <Card  containerStyle={{ width: 300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                                   title = {
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, right: 10, top: -10, margin: 10 }} > {this.state.arr[5]} </Text>
                                       </View>
                                   }>

                                <Icon
                                    name='location-on'
                                    color='#153b50'
                                    size={15}
                                    iconStyle={{
                                        top: 71,
                                        right: 130
                                    }}
                                />

                                <Text style = {styles.diningHallStyle}> {this.state.arr[6]} </Text>

                                <Text style = {styles.priceStyle}> {this.state.arr[7]} </Text>

                                <View style = {{ top: -180, right: -120 }}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[4], this.state.arr[5], 2)}
                                    />
                                </View>

                            </Card>
                        ) : null}

                        {this.state.showCard3 ? (

                            <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                                   title = {
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[9]} </Text>
                                       </View>
                                   }>
                                <Icon
                                    name='location-on'
                                    color='#153b50'
                                    size={15}
                                    iconStyle={{
                                        top: 71,
                                        right: 130
                                    }}
                                />

                                <Text style = {styles.diningHallStyle}> {this.state.arr[10]} </Text>

                                <Text style = {styles.priceStyle}> {this.state.arr[11]} </Text>

                                <View style = {{ top: -180, right: -120 }}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[8], this.state.arr[9], 3)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard4 ? (

                            <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                                   title = {
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[13]} </Text>
                                       </View>
                                   }>
                                <Icon
                                    name='location-on'
                                    color='#153b50'
                                    size={15}
                                    iconStyle={{
                                        top: 71,
                                        right: 130
                                    }}
                                />

                                <Text style = {styles.diningHallStyle}> {this.state.arr[14]} </Text>

                                <Text style = {styles.priceStyle}> {this.state.arr[15]} </Text>

                                <View style = {{ top: -180, right: -120 }}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[12], this.state.arr[13], 4)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard5 ? (

                            <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                                   title = {
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[17]} </Text>
                                       </View>
                                   }>
                                <Icon
                                    name='location-on'
                                    color='#153b50'
                                    size={15}
                                    iconStyle={{
                                        top: 71,
                                        right: 130
                                    }}
                                />

                                <Text style = {styles.diningHallStyle}> {this.state.arr[18]} </Text>

                                <Text style = {styles.priceStyle}> {this.state.arr[19]} </Text>

                                <View style = {{ top: -180, right: -120 }}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[16], this.state.arr[17], 5)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard6 ? (

                            <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                                   title = {
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[21]} </Text>
                                       </View>
                                   }>
                                <Icon
                                    name='location-on'
                                    color='#153b50'
                                    size={15}
                                    iconStyle={{
                                        top: 71,
                                        right: 130
                                    }}
                                />

                                <Text style = {styles.diningHallStyle}> {this.state.arr[22]} </Text>

                                <Text style = {styles.priceStyle}> {this.state.arr[23]} </Text>

                                <View style = {{ top: -180, right: -120 }}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[20], this.state.arr[21], 6)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard7 ? (

                            <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                                   title = {
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[25]} </Text>
                                       </View>
                                   }>
                                <Icon
                                    name='location-on'
                                    color='#153b50'
                                    size={15}
                                    iconStyle={{
                                        top: 71,
                                        right: 130
                                    }}
                                />

                                <Text style = {styles.diningHallStyle}> {this.state.arr[26]} </Text>

                                <Text style = {styles.priceStyle}> {this.state.arr[27]} </Text>

                                <View style = {{ top: -180, right: -120 }}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[24], this.state.arr[25], 7)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard8 ? (

                            <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                                   title = {
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[29]} </Text>
                                       </View>
                                   }>
                                <Icon
                                    name='location-on'
                                    color='#153b50'
                                    size={15}
                                    iconStyle={{
                                        top: 71,
                                        right: 130
                                    }}
                                />

                                <Text style = {styles.diningHallStyle}> {this.state.arr[30]} </Text>

                                <Text style = {styles.priceStyle}> {this.state.arr[31]} </Text>

                                <View style = {{ top: -180, right: -120 }}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[28], this.state.arr[29], 8)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard9 ? (

                            <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                                   title = {
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[33]} </Text>
                                       </View>
                                   }>
                                <Icon
                                    name='location-on'
                                    color='#153b50'
                                    size={15}
                                    iconStyle={{
                                        top: 71,
                                        right: 130
                                    }}
                                />

                                <Text style = {styles.diningHallStyle}> {this.state.arr[34]} </Text>

                                <Text style = {styles.priceStyle}> {this.state.arr[35]} </Text>

                                <View style = {{ top: -180, right: -120 }}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[32], this.state.arr[33], 9)}
                                    />
                                </View>

                            </Card>

                        ) : null}

                        {this.state.showCard10 ? (

                            <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                                   title = {
                                       <View style = {{ alignItems: 'flex-start' }}>
                                           <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[37]} </Text>
                                       </View>
                                   }>
                                <Icon
                                    name='location-on'
                                    color='#153b50'
                                    size={15}
                                    iconStyle={{
                                        top: 71,
                                        right: 130
                                    }}
                                />

                                <Text style = {styles.diningHallStyle}> {this.state.arr[38]} </Text>

                                <Text style = {styles.priceStyle}> {this.state.arr[39]} </Text>

                                <View style = {{ top: -180, right: -120 }}>
                                    <Icon
                                        name='heart'
                                        type='font-awesome'
                                        color='#153b50'

                                        onPress={() => this.removeFav(this.state.arr[36], this.state.arr[37], 10)}
                                    />
                                </View>

                            </Card>

                        ) : null}


                    </View>
                </ScrollView>

                <View style={{bottom: 0, right: 10, alignItems: 'flex-end', flex: 1, position: 'absolute'}}>
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


    // Get the user's name and email from database
    async readUserNameEmail() {
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

    render() {
        return (
            <ScrollView style={styles.profileContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Text style = {styles.nameStyle}>{this.state.name}</Text>
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
        paddingBottom: 50
    },
    oofImage: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        paddingTop: 30
    },
    diningHallStyle: {
        color: '#fff',
        fontSize: 15,
        padding: 20,
        textAlign: 'center',
        right: 80,
        top: 35
    },
    priceStyle: {
        color: '#fff',
        fontSize: 20,
        padding: 20,
        textAlign: 'center',
        right: 112,
        top: -110
    }
});