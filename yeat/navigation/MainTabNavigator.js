import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BudgetScreen from '../screens/BudgetScreen';
import TritonCardLoginScreen from "../screens/TritonCardLoginScreen";
import StartingBudgetScreen from "../screens/StartingBudgetScreen"
import MyYeatsScreen from '../screens/MyYeatsScreen';
import PreferencesScreen from '../screens/PreferencesScreen';

// Creates the Feed page
const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarOptions: {
      activeTintColor: '#00C6D7'
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-home'}
    />
  ),
};


const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

// Creates the My Yeats page
const MyYeatsStack = createStackNavigator({
    MyYeats: MyYeatsScreen,
},
    { headerMode: 'none'},
);

MyYeatsStack.navigationOptions = {
    tabBarLabel: 'My Yeats',
    tabBarOptions: {
        activeTintColor: '#00C6D7'
    },
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'md-person'}
        />
    ),
};

// Creates the Preferences page
const PreferencesStack = createStackNavigator({
    Preferences: PreferencesScreen,
});

PreferencesStack.navigationOptions = {
    tabBarLabel: 'Preferences',
    tabBarOptions: {
        activeTintColor: '#00C6D7'
    },
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={'md-settings'}
    />
    ),
};

// Creates the Budget page
const BudgetStack = createSwitchNavigator({
    Starting: StartingBudgetScreen,
    TritonCard: TritonCardLoginScreen,
    Budget: BudgetScreen,
    }, {
        initialRouteName: 'Starting'
});

BudgetStack.navigationOptions = {
    tabBarLabel: 'Budget',
    tabBarOptions: {
        activeTintColor: '#00C6D7'
    },
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'logo-usd'}
        />
    ),
}

export default createBottomTabNavigator({
    HomeStack,
    BudgetStack,
    MyYeatsStack,
    PreferencesStack,
});
