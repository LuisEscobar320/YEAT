import React from 'react'
import firebase from 'firebase'
import { StyleSheet, Text, TextInput, View, Button, Linking } from 'react-native'
// import { BarChart, Grid } from 'react-native-svg-charts'
import {
  BarChart,
  PieChart
} from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

export default class BudgetScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount(){
        this.calculateWeeklySpending()
    }
    async calculateBudget(callback) {
//        var userId = firebase.auth().currentUser.uid;
//       var ref = firebase.database().ref("users/" + "fi6DDOwDZMaCY1WIYNvfZFwUdRx2");

//        var currentDate = new Date();
//        var endDate = new Date(2019, 5, 14); // hard-coded date for end of academic year
//        var daysLeft = 0;
//        var balance = 0;

        // this loop condition will never break if currentDate starts after endDate
//        while(currentDate.toDateString() != endDate.toDateString()) {
//            daysLeft++;
//            currentDate.setDate(currentDate.getDate() + 1); // currentDate WILL change
//        }
//        var weeksLeft = Math.ceil(daysLeft/7);
//        var dailyBudget;
//        var weeklyBudget;

//        console.log(daysLeft + " days left");
//        console.log(weeksLeft + " weeks left");

        // code to format date string to match format of firebase entry
        // toDateString method ALWAYS provides string of format "Day ### ## ####" 
        // endDate.toDateString().substr(4, 11);

        // retrieve user's balance from firebase
//        var userId = firebase.auth().currentUser.uid;
//        var query;
//        var thisWeeksTotal = 0;

  //      await ref.once("value")
//        .then(function(snapshot) {
//            balance = parseFloat(snapshot.child("tritoncard/balance").val());
            // then calculate daily and weekly budgets
//            dailyBudget = (balance/daysLeft).toFixed(2);
//            weeklyBudget = dailyBudget*7;
//            console.log("daily budget: $" + dailyBudget);
//            console.log("weekly budget: $" + weeklyBudget);
//            query = firebase.database().ref("users/" + "fi6DDOwDZMaCY1WIYNvfZFwUdRx2" + "/tritoncard/thismonth").orderByKey();
//        });
        return await callback();
    }

    async calculateDailySpending() {
        console.log("bet");
        var spendingHashmap = new Map([]);
        var query = firebase.database().ref("users/" + "fi6DDOwDZMaCY1WIYNvfZFwUdRx2" + "/tritoncard/thismonth").orderByKey();
        await query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              if(spendingHashmap.has(childSnapshot.key.substr(0, 11))) {
                spendingHashmap.set(childSnapshot.key.substr(0, 11), spendingHashmap.get(childSnapshot.key.substr(0, 11)) + parseFloat(childSnapshot.val()));
              }
              else {
                spendingHashmap.set(childSnapshot.key.substr(0, 11), parseFloat(childSnapshot.val()));
              }
            });
          });
        query = firebase.database().ref("users/" + "fi6DDOwDZMaCY1WIYNvfZFwUdRx2" + "/tritoncard/lastmonth").orderByKey();
        console.log("hello1");
        await query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              if(spendingHashmap.has(childSnapshot.key.substr(0, 11))) {
                spendingHashmap.set(childSnapshot.key.substr(0, 11), spendingHashmap.get(childSnapshot.key.substr(0, 11)) + parseFloat(childSnapshot.val()));
              }
              else {
                spendingHashmap.set(childSnapshot.key.substr(0, 11), parseFloat(childSnapshot.val()));
              }
            });
          });
          console.log(spendingHashmap.get("May 23 2019"));
          console.log("hello2");
          return spendingHashmap;     
    }

    async calculateWeeklySpending() {

////////////////////////////////////////////////////////////////////////////////////

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

      await ref.once("value")
      .then(function(snapshot) {
         balance = parseFloat(snapshot.child("tritoncard/balance").val());
         // then calculate daily and weekly budgets
         dailyBudget = (balance/daysLeft).toFixed(2);
         weeklyBudget = dailyBudget*7;
         console.log("daily budget: $" + dailyBudget);
         console.log("weekly budget: $" + weeklyBudget);
         query = firebase.database().ref("users/" + "fi6DDOwDZMaCY1WIYNvfZFwUdRx2" + "/tritoncard/thismonth").orderByKey();
      });

////////////////////////////////////////////////////////////////////////////////////

      var spendingHashmap = await this.calculateBudget(this.calculateDailySpending);
      var currentDay = new Date(2019, 4, 31);
      var startDay = currentDay;
      var thisWeeksTotal = 0;
      var todaysSpending = 0;

      // get today's spending
      if(spendingHashmap.has(currentDay.toDateString().substr(4, 11))) {
	todaysSpending = spendingHashmap.get(currentDay.toDateString().substr(4, 11));
      }

      // if starting on a Saturday
      if(currentDay.getDay() == 6) {
        if(spendingHashmap.has(currentDay.toDateString().substr(4, 11))) {
          thisWeeksTotal += spendingHashmap.get(currentDay.toDateString().substr(4, 11));
        }
        currentDay.setDate(currentDay.getDate() - 1);
      }

      // now iterate to previous Saturday
      while(currentDay.getDay() != 6) {
        if(spendingHashmap.has(currentDay.toDateString().substr(4, 11))) {
          thisWeeksTotal += spendingHashmap.get(currentDay.toDateString().substr(4, 11));
        }   
            currentDay.setDate(currentDay.getDate() - 1);
        }
        console.log("Total spending for this week: $" + thisWeeksTotal);

        // now calculate previous 3 weeks spending
        var i;
        var j;
        var previousWeeks = [0, 0, 0];
        for(i = 0; i < 3; i++) {
            for(j = 0; j < 7; j++) {
                if(spendingHashmap.has(currentDay.toDateString().substr(4, 11))) {
                    previousWeeks[i] += spendingHashmap.get(currentDay.toDateString().substr(4, 11));
                }
                currentDay.setDate(currentDay.getDate() - 1);
            }
        }
        console.log("Spending for 1 week ago: $" + previousWeeks[0]);
        console.log("Spending for 2 weeks ago: $" + previousWeeks[1]);
        console.log("Spending for 3 weeks ago: $" + previousWeeks[2]);
	var infoToDisplay = [balance, dailyBudget, weeklyBudget, todaysSpending,
		             thisWeeksTotal, previousWeeks[0], previousWeeks[1], previousWeeks[2]];
        this.setState({data: infoToDisplay});
        return previousWeeks;
    }










    render() {
        


        // this.calculateBudget().then(this.calculateSpending.then());
        // this.calculateBudget(this.calculateSpending);
        // this.calculateWeeklySpending();
        // console.log("hello2");
        // var weekspending;
        // (async () => {
        //     weekspending = await this.calculateWeeklySpending();
        // })();
        // console.log("whats" + weekspending[0]);



    
        // console.log("this weeks total " +thisWeeksTotal);

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

//        const data = [
//  { name: 'Amount Spent Today', amount: 30, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
//  { name: 'Remaining Balance for Today', amount: 40, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
//]

        return (
            <View>
            {this.state.data === null ?
                <Text>Loading</Text>
                :
            //     <Text> {this.state.data[0]} </Text>


            // }
                
            // </Text>);
  // <Text>
  //  Bezier Line Chart
  //  what is up
  // </Text>
  <View>
  <PieChart
    data = {[{name: 'Amount Spent Today', amount: this.state.data[3], color: '#F6FD00', legendFontColor: '#7F7F7F', legendFontSize: 12},
             {name: 'Remaining for Today', amount: (this.state.data[1] - this.state.data[3]), color: '#05FD00', legendFontColor: '#7F7F7F', legendFontSize: 12}]}
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
    accessor="amount"
    backgroundColor="#00C6D7"
    paddingLeft="0" // how far pi chart is from left of screen
    absolute
  />

  <BarChart
    data={{
      labels: ['3 weeks ago', '2 weeks ago', '1 week ago', 'This week'],
      datasets: [{
        data: [
          this.state.data[7],
          this.state.data[6],
          this.state.data[5],
	  this.state.data[4]
        ]
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={600}
    yAxisLabel={'$'}
    chartConfig={{
      paddingTop: 300,
      backgroundColor: '#00C6D7',
      backgroundGradientFrom: '#00C6D7',
      backgroundGradientTo: '#00C6D7',
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
      borderRadius: 0 // 
    }}
  />
</View>

         }   

            
        </View>);
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
