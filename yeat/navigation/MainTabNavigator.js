import React from 'react';
import { Platform } from 'react-native';
import firebase from 'firebase';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BudgetScreen from '../screens/BudgetScreen';
import TritonCardLoginScreen from "../screens/TritonCardLoginScreen";
import StartingBudgetScreen from "../screens/StartingBudgetScreen"

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
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

const BudgetStack = createSwitchNavigator({
            Starting: StartingBudgetScreen,
            TritonCard: TritonCardLoginScreen,
            Budget: BudgetScreen
        },
        {
            //initialRouteName: isLoggedIn ? "Budget": "TritonCard"
            initialRouteName: "Starting"
        }
);


BudgetStack.navigationOptions = {
  tabBarLabel: 'Budget',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon
          focused={focused}
          name={'logo-usd'}
      />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
  BudgetStack,
});
