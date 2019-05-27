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
                    child.val().diningHall,
                    child.val().price
                );
            });
            console.log("item[0] is");
            console.log(items[0]);
            this.setState({
                arr: items,
                numCards: num
            });
            console.log("Num cards issssssssssssssssss");
        console.log(this.state.numCards);

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
                hideCard: true,
                showCard1: false,
            });
        } else if (num == 2) {
            this.setState({
                hideCard: true,
                showCard2: false,
            });
        } else if (num == 3) {
            this.setState({
                hideCard: true,
                showCard3: false,
            });
        }



    }

    createCards() {
        var num = 5;
        let list = [];
        let cardList = [];
        for (let i = 0; i < this.state.numCards; i++) {
        cardList.push(
            <Card containerStyle={{ width: 300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                title={
                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30, right: 10, top: -10 }} > {this.state.arr[i*3]} </Text>
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
                <Text style={styles.diningHallStyle}>{this.state.arr[(i*3)+1]} </Text>

                <Text style={styles.priceStyle}> {this.state.arr[(i*3)+2]} </Text>


                <View style={{ top: -180, right: -120 }}>
                    <Icon
                        name='heart'
                        type='font-awesome'
                        color='#153b50'

                        onPress={() => this.removeFav(this.state.arr[0], this.state.arr[1], 1)}
                    />
                </View>
            </Card>
        );

        
        list.push(
            <View>
                {cardList}
            </View>
        );
        }
        return list;
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

    render() {
        console.log(this.state.arr[1]);
        console.log("Num cards is");
        console.log(this.state.numCards);
        return (
	    <ScrollView style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title='Profile'
                    buttonStyle={styles.button}
                    onPress={()=> {
                        return this.props.navigation.navigate('Profile');
                    }}
                />        
                {this.state.showCard1 ? (
                    <Card  containerStyle={{ width: 300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                        title = {
                            <View style = {{ alignItems: 'flex-start' }}>
                                <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, right: 10, top: -10 }} > {this.state.arr[2]} </Text>
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
                        <Text style = {styles.diningHallStyle}>{this.state.arr[1]} </Text>
    
                        <Text style = {styles.priceStyle}> {this.state.arr[2]} </Text>

                        
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
                                <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, right: 10, top: -10 }} > {this.state.arr[3]} </Text>
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

                        <Text style = {styles.diningHallStyle}> {this.state.arr[4]} </Text>
    
                        <Text style = {styles.priceStyle}> {this.state.arr[5]} </Text>
                    
                        <View style = {{ top: -180, right: -120 }}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
        
                                onPress={() => this.removeFav(this.state.arr[3], this.state.arr[4], 2)} 
                            />
                        </View>

                    </Card>
                ) : null}          

                {this.state.showCard3 ? (
 
                    <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                        title = {
                            <View style = {{ alignItems: 'flex-start' }}>
                                <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[6]} </Text>
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

                        <Text style = {styles.diningHallStyle}> {this.state.arr[7]} </Text>
                        
                        <Text style = {styles.priceStyle}> {this.state.arr[8]} </Text>
            
                        <View style = {{ top: -180, right: -120 }}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
        
                                onPress={() => this.removeFav(this.state.arr[6], this.state.arr[7], 3)} 
                            />
                        </View>

                    </Card>

                ) : null}          
                
                {this.state.showCard4 ? (
 
                    <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                        title = {
                            <View style = {{ alignItems: 'flex-start' }}>
                                <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[6]} </Text>
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

                        <Text style = {styles.diningHallStyle}> {this.state.arr[7]} </Text>
                        
                        <Text style = {styles.priceStyle}> {this.state.arr[8]} </Text>
            
                        <View style = {{ top: -180, right: -120 }}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
        
                                onPress={() => this.removeFav(this.state.arr[6], this.state.arr[7], 3)} 
                            />
                        </View>

                    </Card>

                ) : null}          

                {this.state.showCard5 ? (
 
                    <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                        title = {
                            <View style = {{ alignItems: 'flex-start' }}>
                                <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[6]} </Text>
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

                        <Text style = {styles.diningHallStyle}> {this.state.arr[7]} </Text>
                        
                        <Text style = {styles.priceStyle}> {this.state.arr[8]} </Text>
            
                        <View style = {{ top: -180, right: -120 }}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
        
                                onPress={() => this.removeFav(this.state.arr[6], this.state.arr[7], 3)} 
                            />
                        </View>

                    </Card>

                ) : null}          
                
                {this.state.showCard6 ? (
 
                    <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                        title = {
                            <View style = {{ alignItems: 'flex-start' }}>
                                <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[6]} </Text>
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

                        <Text style = {styles.diningHallStyle}> {this.state.arr[7]} </Text>
                        
                        <Text style = {styles.priceStyle}> {this.state.arr[8]} </Text>
            
                        <View style = {{ top: -180, right: -120 }}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
        
                                onPress={() => this.removeFav(this.state.arr[6], this.state.arr[7], 3)} 
                            />
                        </View>

                    </Card>

                ) : null} 
                
                {this.state.showCard7 ? (
 
                    <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                        title = {
                            <View style = {{ alignItems: 'flex-start' }}>
                                <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[6]} </Text>
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

                        <Text style = {styles.diningHallStyle}> {this.state.arr[7]} </Text>
                        
                        <Text style = {styles.priceStyle}> {this.state.arr[8]} </Text>
            
                        <View style = {{ top: -180, right: -120 }}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
        
                                onPress={() => this.removeFav(this.state.arr[6], this.state.arr[7], 3)} 
                            />
                        </View>

                    </Card>

                ) : null}          

                {this.state.showCard8 ? (
 
                    <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                        title = {
                            <View style = {{ alignItems: 'flex-start' }}>
                                <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[6]} </Text>
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

                        <Text style = {styles.diningHallStyle}> {this.state.arr[7]} </Text>
                        
                        <Text style = {styles.priceStyle}> {this.state.arr[8]} </Text>
            
                        <View style = {{ top: -180, right: -120 }}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
        
                                onPress={() => this.removeFav(this.state.arr[6], this.state.arr[7], 3)} 
                            />
                        </View>

                    </Card>

                ) : null}          

                {this.state.showCard9 ? (
 
                    <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                        title = {
                            <View style = {{ alignItems: 'flex-start' }}>
                                <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[6]} </Text>
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

                        <Text style = {styles.diningHallStyle}> {this.state.arr[7]} </Text>
                        
                        <Text style = {styles.priceStyle}> {this.state.arr[8]} </Text>
            
                        <View style = {{ top: -180, right: -120 }}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
        
                                onPress={() => this.removeFav(this.state.arr[6], this.state.arr[7], 3)} 
                            />
                        </View>

                    </Card>

                ) : null}          
                
                {this.state.showCard10 ? (
 
                    <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                        title = {
                            <View style = {{ alignItems: 'flex-start' }}>
                                <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 30, top: -10, right: 10 }} > {this.state.arr[6]} </Text>
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

                        <Text style = {styles.diningHallStyle}> {this.state.arr[7]} </Text>
                        
                        <Text style = {styles.priceStyle}> {this.state.arr[8]} </Text>
            
                        <View style = {{ top: -180, right: -120 }}>
                            <Icon
                                name='heart'
                                type='font-awesome'
                                color='#153b50'
        
                                onPress={() => this.removeFav(this.state.arr[6], this.state.arr[7], 3)} 
                            />
                        </View>

                    </Card>

                ) : null}          


            </View>
	    </ScrollView>
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
