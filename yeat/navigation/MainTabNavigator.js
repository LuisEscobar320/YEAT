import React from 'react';
import { Platform } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BudgetScreen from '../screens/BudgetScreen';
import TritonCardLoginScreen from "../screens/TritonCardLoginScreen";
import StartingBudgetScreen from "../screens/StartingBudgetScreen"
import ErrorScreen from "../screens/ErrorScreen";
import MyYeatsScreen from '../screens/MyYeatsScreen';
import PreferencesScreen from '../screens/PreferencesScreen';

// Creates the Feed page
const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
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
});

MyYeatsStack.navigationOptions = {
    tabBarLabel: 'My Yeats',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

// Creates the Preferences page
const PreferencesStack = createStackNavigator({
    Preferences: PreferencesScreen,
});

PreferencesStack.navigationOptions = {
    tabBarLabel: 'Preferences',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
    ),
};

const BudgetStack = createSwitchNavigator({
    Starting: StartingBudgetScreen,
    TritonCard: TritonCardLoginScreen,
    Budget: BudgetScreen,
    Error: ErrorScreen,
    }, {
        initialRouteName: 'Starting'
});

BudgetStack.navigationOptions = {
    tabBarLabel: 'Budget',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'logo-usd'}
        />
    ),
}

export default createBottomTabNavigator({
    HomeStack,
    SettingsStack,
    MyYeatsStack,
    PreferencesStack,
    BudgetStack,
});
