import firebase from 'firebase';
import React from 'react';
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
        },

        headerRight: (
            <Icon size={40} iconStyle={{ right: 200}}
                name='user'
                type='evilicon'
                color='#153b50'
            />
        ),
    };
    
    constructor(props) {
        super(props);
        this.listenForItems();

        this.state = {
            arr: []
        };

    }

    async listenForItems() {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + userId + "/Favorites");
        let bool = false;
        await ref.on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
                const pbj = {'check': child.key, 'bool': child.val()};
                items.push(             
                    child.key,
                    child.val().item,
                    child.val().diningHall,
                    child.val().price
            //pbj
                );
                console.log(child.val());
                console.log(child.key);
            });
            this.setState({
                arr: items
            });
        });
    }

    removeFav(itemNum, fav) {
        var userId = firebase.auth().currentUser.uid;
        let ref = firebase.database().ref("users/" + userId + "/Favorites/" + itemNum);
        console.log("REF ISSSSSSSSSSSSSSSSSS");
        console.log(ref);
        ref.remove();
        alert(fav + ' Removed!')
    }
    render() {
        console.log(this.state.arr[1]);
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

                <Card  containerStyle={{ width: 300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                    title = {
                        <View style = {{ alignItems: 'flex-start' }}>
                            <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 35, right: 10, top: -10 }} > {this.state.arr[1]} </Text>
                        </View>
                    }>
                    <Icon
                        name='location-on'
                        color='#153b50'
                        size={15}
                        iconStyle={{
                            top: 50,
                            right: 130
                        }}
                    />
                    <Text style = {{
                        color: '#fff',
                        fontSize: 15, 
                        padding: 20, 
                        textAlign: 'center',
                        right: 100,
                        top:10 
                        }}> 
                        {this.state.arr[2]} </Text>

                    <Text style = {{color: '#fff', 
                        fontSize: 15, 
                        padding: 20, 
                        textAlign: 'center', 
                        right: 115,
                        top: -110}}> {this.state.arr[3]} </Text>

                    <Icon
                        name='heart'
                        type='font-awesome'
                        color='#153b50'
                        iconStyle={{
                            top:-180,
                            right: -110
                        }}

                        onPress={() => this.removeFav(this.state.arr[0], this.state.arr[1])} 
                    />
                </Card>
                
                <Card  containerStyle={{ width: 300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                    title = {
                        <View style = {{ alignItems: 'flex-start' }}>
                            <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 35, right: 10, top: -10 }} > {this.state.arr[5]} </Text>
                        </View>
                    }>
                    
                    <Icon
                        name='location-on'
                        color='#153b50'
                        size={15}
                        iconStyle={{
                            top: 50,
                            right: 130
                        }}
                    />

                    <Text style = {{
                        color: '#fff',
                        fontSize: 15, 
                        padding: 20, 
                        textAlign: 'center',
                        right: 100,
                        top:10 }}> {this.state.arr[6]} </Text>
                    <Text style = {{color: '#fff', 
                        fontSize: 15, 
                        padding: 20, 
                        textAlign: 'center', 
                        right: 115,
                        top: -110}}> {this.state.arr[7]} </Text>
        
                    <Icon
                        name='heart'
                        type='font-awesome'
                        color='#153b50'
                        iconStyle={{
                            top:-180,
                            right: -110
                        }}
                    />
                </Card>
 
                <Card  containerStyle={{ width:300, height: 150, backgroundColor: '#39cbd6', borderRadius: 15 }}
                    title = {
                        <View style = {{ alignItems: 'flex-start' }}>
                            <Text style = {{ color: '#fff', fontWeight: 'bold', fontSize: 35, top: -10, right: 10 }} > {this.state.arr[6]} </Text>
                        </View>
                    }>
                    <Icon
                        name='location-on'
                        color='#153b50'
                        size={15}
                        iconStyle={{
                            top: 50,
                            right: 130
                        }}
                    />

                    <Text style = {{
                        color: '#fff',
                        fontSize: 15, 
                        padding: 20, 
                        textAlign: 'center',
                        right: 100,
                        top:10 }}> {this.state.arr[9]} </Text>
                        
                    <Text style = {{color: '#fff', 
                        fontSize: 15, 
                        padding: 20, 
                        justifyContent : 'flex-end',
                        textAlign: 'center', 
                        right: 115,
                        top: -110}}> {this.state.arr[10]} </Text>
     
                    <Icon
                        name='heart'
                        type='font-awesome'
                        color='#153b50'
                        iconStyle={{
                            top:-180,
                            right: -110
                        }}
                    />
                </Card>
          

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
                console.log(pepasdasdade);
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
        fontSize: 40,
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
    }
});

