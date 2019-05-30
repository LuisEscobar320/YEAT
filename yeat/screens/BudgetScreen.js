import React from 'react'
import firebase from 'firebase'
import { StyleSheet, Text, TextInput, View, Button, Linking } from 'react-native'
// import { BarChart, Grid } from 'react-native-svg-charts'
import {
  BarChart,
  PieChart
} from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

    // var userId = firebase.auth().currentUser.uid;
    // var ref = firebase.database().ref("users/" + userId);

    // ref.once("value")
    //         .then(function(snapshot) {
    //           var ch = snapshot.child("name").val(); //Gets Use's name from ID
    //           // bool = snapshot.child("preferences/" + param).val();
    //         console.log(bool);
    // });
export default class BudgetScreen extends React.Component {
    var userId = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("users/" + "fi6DDOwDZMaCY1WIYNvfZFwUdRx2");

    var currentDate = new Date();
    var endDate = new Date(2019, 5, 14); // hard-coded date for end of academic year
    var daysLeft = 0;
    var balance = 0;

    pullBudgetFromFireBase() {

    }


    render() {
        var userId = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("users/" + "fi6DDOwDZMaCY1WIYNvfZFwUdRx2");

        var currentDate = new Date();
        var endDate = new Date(2019, 5, 14); // hard-coded date for end of academic year
        var daysLeft = 0;
        var balance = 0;

        // this loop condition will never break if currentDate starts after endDate
        while(currentDate.toDateString() != endDate.toDateString()) {
            daysLeft++;
            currentDate.setDate(currentDate.getDate() + 1); // currentDate WILL change
        }
        var weeksLeft = Math.ceil(daysLeft/7);
        var dailyBudget;
        var weeklyBudget;

        console.log(daysLeft + " days left");
        console.log(weeksLeft + " weeks left");

        // code to format date string to match format of firebase entry
        // toDateString method ALWAYS provides string of format "Day ### ## ####" 
        // endDate.toDateString().substr(4, 11);

        // retrieve user's balance from firebase
        var userId = firebase.auth().currentUser.uid;
        var query;
        var thisWeeksTotal = 0;

        ref.once("value")
        .then(function(snapshot) {
            balance = parseFloat(snapshot.child("tritoncard/balance").val());
            // then calculate daily and weekly budgets
            dailyBudget = balance/daysLeft;
            weeklyBudget = balance/weeksLeft;
            console.log("daily budget: $" + dailyBudget);
            console.log("weekly budget: $" + weeklyBudget);
            query = firebase.database().ref("users/" + "fi6DDOwDZMaCY1WIYNvfZFwUdRx2" + "/tritoncard/thismonth").orderByKey();


        });
        await(dailyBudget);

        
        

        // find this week's spending
        
        currentDate = new Date();
        var query = firebase.database().ref("users/" + "fi6DDOwDZMaCY1WIYNvfZFwUdRx2" + "/tritoncard/thismonth").orderByKey();
        while(currentDate.getDay() != 6) {
          query.once("value")
            .then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                if(currentDate.toDateString().substr(4, 3) != childSnapshot.key.substr(0, 3)) {
         query = firebase.database().ref("users/" + userId + "/tritoncard/lastmonth").orderByKey();
        }
        else if(currentDate.toDateString().substr(4, 11) == childSnapshot.key.substr(0, 11)) {
                  thisWeeksTotal += parseFloat(childSnapshot.val());
                }
                else if(currentDate.toDateString().substr(4, 11) < childSnapshot.key.substr(0, 11)) {
                  return true;
                }
            });
          });
          currentDate.setDate(currentDate.getDate() - 1);
        }
        console.log("this weeks total" +thisWeeksTotal);

        // // then find previous 3 weeks spending
        // var previousWeeks = [0, 0, 0];
        // for(var i = 0; i < 3; i++) {
        //   for(var j = 0; j < 7; j++) {
        //     query.once("value")
        //       .then(function(snapshot) {
        //         snapshot.forEach(function(childSnapshot) {
        //           if(currentDate.toDateString().substr(4, 3) != childSnapshot.key.substr(0, 3)) {
        //    query = firebase.database().ref("users/" + userId + "/tritoncard/lastmonth").orderByKey();
        //  }
        //    else if(currentDate.toDateString().substr(4, 11) == childSnapshot.key.substr(0, 11)) {
        //             previousWeeks[i] += parseFloat(childSnapshot.val());
        //           }
        //           else if(currentDate.toDateString().substr(4, 11) < childSnapshot.key.substr(0, 11)) {
        //             return true;
        //           }
        //       });
        //     });
        //     console.log(previousWeeks);

        //     currentDate.setDate(currentDate.getDate() - 1);




        const fill = 'rgb(57, 203, 214)'
        
        // const data   = [ 50, 50, 40, 95, 40 ]
        
        const keys = [ 'Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk4']

        const data = [
  { name: 'Seoul', population: 30, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Toronto', population: 40, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Beijing', population: 10, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'New York', population: 20, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Moscow', population: 0, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
]

        return (
            <View>
  <Text>
   Bezier Line Chart
   what is up
  </Text>

  <PieChart
    data = {data}
    width={Dimensions.get('window').width}
    height={220}
    chartConfig={{
      paddingTop: 10000,
      backgroundColor: '#39cbd6',
      backgroundGradientFrom: '#39cbd6',
      backgroundGradientTo: '#153B50',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}

    accessor="population"
    paddingLeft="0" // how far pi chart is from left of screen
    absolute
  />

  <BarChart
    data={{
      labels: ['Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk5'],
      datasets: [{
        data: [
          30,
          40,
          20,
          50,
          10
        ]
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={800}
    yAxisLabel={'$'}
    chartConfig={{
      paddingTop: 300,
      backgroundColor: '#39cbd6',
      backgroundGradientFrom: '#39cbd6',
      backgroundGradientTo: '#153B50',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 0, // How far top edge of graph is from top edge
                          // of phone.
      borderRadius: 16 // 
    }}
  />
</View>
            

            // <BarChart
            //     style={{ height: 200 }}
            //     data={ data }
            //     svg={{ fill }}
            //     contentInset={{ top: 80, bottom: 30 }}
            //     formatLabel={ (value, index) => index }
            // >

            //     <Grid/>
            // </BarChart>
        );
    }


}
    

    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4F6D7A',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
            color: '#F5FCFF',
        },
    });

    

