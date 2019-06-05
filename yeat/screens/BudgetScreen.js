import React from 'react'
import firebase from 'firebase'
import { StyleSheet, Text, TextInput, View, Button, Linking, ScrollView, Dimensions } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'

export default class BudgetScreen extends React.Component {


    /* constructor to initiate state.data to null to delay rendering */
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount(){
        this.calculateWeeklySpending()
    }

    async waitForHashmap(callback) {
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

    async gatherSpendingData() {
      /* hashmap to store info from firebase to minimize database access */
      /* key: month, day, year; value: total spending for that day */
      var spendingHashmap = new Map([]);
      var userId = firebase.auth().currentUser.uid;

      /* gather spending data from current month */
      var query = firebase.database().ref("users/" + userId + "/tritoncard/thismonth").orderByKey();
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

      /* gather spending data from previous month */
      query = firebase.database().ref("users/" + userId + "/tritoncard/lastmonth").orderByKey();
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
	    
      return spendingHashmap;     
    }

    async calculateWeeklySpending() {

////////////////////////////////////////////////////////////////////////////////////

      var userId = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref("users/" + userId);
      var query;

      var currentDate = new Date();
      var today = currentDate;
      var endDate = new Date(2019, 5, 14); // hard-coded date for end of academic year
      var daysLeft, balance, dailyBudget, weeklyBudget, thisWeeksTotal, todaysSpending;
      daysLeft = balance = dailyBudget = weeklyBudget = thisWeeksTotal = todaysSpending = 0;
//      var spendingHashmap = await this.gatherSpendingData;
      var spendingHashmap = await this.waitForHashmap(this.gatherSpendingData);

      /* calculate remaining days left for daily/weekly budget */
      while(currentDate.toDateString() != endDate.toDateString()) {
          daysLeft++;
          currentDate.setDate(currentDate.getDate() + 1);
      }

      /* retrieve user's balance and use that to calculate daily/weekly budget */
      await ref.once("value")
      .then(function(snapshot) {
         balance = parseFloat(snapshot.child("tritoncard/balance").val());
         dailyBudget = (balance/daysLeft).toFixed(2);
         weeklyBudget = (dailyBudget*7).toFixed(2);
         query = firebase.database().ref("users/" + userId + "/tritoncard/thismonth").orderByKey();
      });

////////////////////////////////////////////////////////////////////////////////////

//      var spendingHashmap = await this.calculateBudget(this.gatherSpendingData);
      /* reset currentDate to iterate from today again */
      currentDate = today;

      // get today's spending
      if(spendingHashmap.has(currentDate.toDateString().substr(4, 11))) {
	todaysSpending = spendingHashmap.get(currentDate.toDateString().substr(4, 11));
      }

      // if starting on a Saturday
      if(currentDate.getDay() == 6) {
        if(spendingHashmap.has(currentDate.toDateString().substr(4, 11))) {
          thisWeeksTotal += spendingHashmap.get(currentDate.toDateString().substr(4, 11));
        }
        currentDate.setDate(currentDate.getDate() - 1);
      }

      // then iterate to previous Saturday
      while(currentDate.getDay() != 6) {
        if(spendingHashmap.has(currentDate.toDateString().substr(4, 11))) {
          thisWeeksTotal += spendingHashmap.get(currentDate.toDateString().substr(4, 11));
        }   
        currentDate.setDate(currentDate.getDate() - 1);
      }

      // now calculate previous 3 weeks spending
      var i, j;
      var previousWeeks = [0, 0, 0];

      /* "for each previous week" */
      for(i = 0; i < 3; i++) {
	/* "for each day of the week" */
        for(j = 0; j < 7; j++) {
          if(spendingHashmap.has(currentDate.toDateString().substr(4, 11))) {
            previousWeeks[i] += spendingHashmap.get(currentDate.toDateString().substr(4, 11));
          }
          currentDate.setDate(currentDate.getDate() - 1);
        }
      }
      var infoToDisplay = [balance, dailyBudget, weeklyBudget, todaysSpending,
		           thisWeeksTotal, previousWeeks[0], previousWeeks[1], previousWeeks[2]];
      this.setState({data: infoToDisplay});
      return previousWeeks;
    }

    render() {

        const fill = 'rgb(57, 203, 214)'
        
        const keys = [ 'Wk1', 'Wk2', 'Wk3', 'Wk4', 'Wk4']

        return (
            <View>
            {this.state.data === null ?
                <View style = {{justifyContent: 'center ',alignItems: 'center', top: Dimensions.get('window').height/2}}><Text>Loading...</Text></View> :
  
  <ScrollView>
      <View style={styles.header}>
          <Text style={styles.head}>Budget</Text>
      </View>
      <View style={styles.budgetdisplay}>
          <Text style={styles.budgettext}>Current Balance: ${this.state.data[0]}</Text>
          <Text style={styles.budgettext}>Daily Budget: ${this.state.data[1]}</Text>
          <Text style={styles.budgettext}>Weekly Budget: ${this.state.data[2]}</Text>
      </View>
  <PieChart
    data = {[{name: 'Spent Today', amount: this.state.data[3], color: '#153b50', legendFontColor: '#153b50', legendFontSize: 12},
             {name: 'Remaining Today', amount: (this.state.data[1] - this.state.data[3]).toFixed(2), color: '#39cbd6', legendFontColor: '#153b50', legendFontSize: 12}]}
    width={Dimensions.get('window').width}
    height={200}
    chartConfig={{
      paddingTop: 10000000000000,
      backgroundColor: '#39cbd6',
      backgroundGradientFrom: '#39cbd6',
      backgroundGradientTo: '#153B50',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    backgroundColor = "#FFFFFF"
    accessor="amount"
    style= {{
      marginVertical:24,
      borderRadius: 0
    }}
    paddingLeft="-8" // how far pi chart is from left of screen
    absolute
  />

  <BarChart
    data={{
      labels: ['3 weeks ago', '2 weeks ago', '1 week ago', 'This week'],
      datasets: [{
        data: [this.state.data[7], this.state.data[6], this.state.data[5], this.state.data[4]]
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={Dimensions.get('window').height-200}
    yAxisLabel={'$'}
    chartConfig={{
      paddingTop: 300,
      backgroundColor: '#FFFFFF',
      backgroundGradientFrom: '#FFFFFF',
      backgroundGradientTo: '#FFFFFF',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(21, 59, 80, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 0, // How far top edge of graph is from top edge of phone.
      borderRadius: 0 
    }}
  />
</ScrollView>

         }   

            
            </View>)
    }


}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4F6D7A',
        },
        loading: {
            fontSize: 20,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
            color: '#F5FCFF',
        },
        header: {
            fontSize: 35,
            color: '#153b50',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
        },
        head: {
            fontSize: 35,
            color: '#153b50',
            fontWeight: 'bold',
        },
        budgetdisplay: {
            paddingTop: 20,
            marginLeft: 5,
        },
        budgettext: {
            fontSize: 20,
        },
    });
