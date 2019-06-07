import React from 'react'
import firebase from 'firebase'
import { StyleSheet, Text, TextInput, View, Button, Linking, ScrollView, Dimensions } from 'react-native'
import { BarChart, PieChart } from 'react-native-chart-kit'
import { Card } from 'react-native-elements';

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
        return await callback();
    }

    async calculateDailySpending() {
        var userId = firebase.auth().currentUser.uid;
        var spendingHashmap = new Map([]);
        var query = firebase.database().ref("users/" + userId + "/tritoncard/thismonth").orderByKey();
        await query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              if(childSnapshot.key.substr(0, 11) === "Jan 01 1800") {
                  console.log("nothing in this month");
                  spendingHashmap.set(childSnapshot.key.substr(0,11), 0);
                  return true;
              }
	      else if(spendingHashmap.has(childSnapshot.key.substr(0, 11))) {
                spendingHashmap.set(childSnapshot.key.substr(0, 11), spendingHashmap.get(childSnapshot.key.substr(0, 11)) + parseFloat(childSnapshot.val()));
              }
              else {
                spendingHashmap.set(childSnapshot.key.substr(0, 11), parseFloat(childSnapshot.val()));
              }
            });
          });
        query = firebase.database().ref("users/" + userId + "/tritoncard/lastmonth").orderByKey();
        await query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
	      if(childSnapshot.key.substr(0, 11) === "Jan 01 1800") {
	        spendingHashmap.set(childSnapshot.key.substr(0, 11), 0);
	        return true;
	      }
	      else if(spendingHashmap.has(childSnapshot.key.substr(0, 11))) {
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

      var currentDay = new Date();
      var today = currentDay;
      var endDate = new Date(2019, 5, 14); // hard-coded date for end of academic year
      var daysLeft, weeksLeft, balance, dailyBudget, weeklyBudget, todaysSpending, thisWeeksTotal;
      daysLeft = weeksLeft = balance = dailyBudget = weeklyBudget = todaysSpending = thisWeeksTotal = 0;

      // this loop condition will never break if currentDay starts after endDate
      while(currentDay.toDateString() != endDate.toDateString()) {
          daysLeft++;
          currentDay.setDate(currentDay.getDate() + 1); // currentDay WILL change
      }
      weeksLeft = Math.ceil(daysLeft/7);

      // retrieve user's balance from firebase
      await ref.once("value")
      .then(function(snapshot) {
         balance = parseFloat(snapshot.child("tritoncard/balance").val());
         // then calculate daily and weekly budgets
         dailyBudget = (balance/daysLeft).toFixed(2);
         weeklyBudget = (dailyBudget*7).toFixed(2);
         query = firebase.database().ref("users/" + userId + "/tritoncard/thismonth").orderByKey();
      });

////////////////////////////////////////////////////////////////////////////////////

      var spendingHashmap = await this.calculateBudget(this.calculateDailySpending);
      currentDay = today;

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
                <View style = {{justifyContent: 'center ',alignItems: 'center', top: Dimensions.get('window').height/2}}><Text>Loading...</Text></View> :
            //     <Text> {this.state.data[0]} </Text>


            // }
                
            // </Text>);

  <ScrollView>
      <View style={styles.header}>
          <Text style={styles.head}>Budget</Text>
      </View>

      <Card
          containerStyle={{ alignSelf: 'center', width: 325, height: 200, backgroundColor: '#39cbd6', borderRadius: 15, }}
          title={
          <View style={styles.budgetDisplay}>
              <Text style={styles.budgetTitleOne}>Current Balance</Text>
              <Text style={styles.budgetText}>${this.state.data[0]}</Text>

              <Text style={styles.budgetTitleTwo}>Daily Budget</Text>
              <Text style={styles.budgetText}>${this.state.data[1]}</Text>

              <Text style={styles.budgetTitleTwo}>Weekly Budget</Text>
              <Text style={styles.budgetText}>${this.state.data[2]}</Text>
          </View>
      }>

      </Card>

      <View>
          <Text style={styles.chartHeaderDaily}>Daily Spending</Text>
      </View>

      {this.state.data[1] === "0.00" && this.state.data[3] === 0.00 ?
          <View style = {{justifyContent: 'center ',alignItems: 'center', paddingTop: 10, paddingBottom: 10}}><Text>You have no Dining Dollars!</Text></View> :
  <PieChart
    data = {[{name: 'Spent Today', amount: parseFloat((this.state.data[3]).toFixed(2)), color: '#153b50', legendFontColor: '#153b50', legendFontSize: 12},
             {name: 'Remaining Today', amount: parseFloat((this.state.data[1]-this.state.data[3]).toFixed(2)) , color: '#39cbd6', legendFontColor: '#153b50', legendFontSize: 12}]}
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
    // backgroundColor="#FFFFFF"
    style= {{
      marginVertical:24,
      borderRadius: 0
    }}
    paddingLeft="-8" // how far pi chart is from left of screen
    absolute
  /> }

      <View>
          <Text style={styles.chartHeaderWeekly}>Weekly Spending</Text>
      </View>


      {this.state.data[7] === 0.00 && this.state.data[6] === 0.00 && this.state.data[5] === 0.00 && this.state.data[4] === 0.00 ?
          <View style = {{justifyContent: 'center ',alignItems: 'center'}}><Text>You have not spent anything in the past month!</Text></View> :
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
      marginVertical: 0, // How far top edge of graph is from top edge
                          // of phone.
      borderRadius: 0 // 
    }}
  />}
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
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
        },
        head: {
            fontSize: 35,
            color: '#153b50',
            fontWeight: 'bold',
        },
        budgetDisplay: {
            marginLeft: 5,
        },
        budgetTitleOne: {
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
        },
        budgetTitleTwo: {
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
            marginTop: 5,
        },
        budgetText: {
            fontSize: 20,
            color: '#fff',
        },
        chartHeaderDaily: {
            color: '#153b50',
            fontSize: 28,
            paddingLeft: 15,
            paddingTop: 20,
        },
        chartHeaderWeekly: {
            color: '#153b50',
            fontSize: 28,
            paddingLeft: 15,
            paddingBottom: 30,
        }
    });
