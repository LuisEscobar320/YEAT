import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import MyYeatsScreen from '../screens/MyYeatsScreen';

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

const PreferencesStack = createStackNavigator({
    Settings: PreferencesScreen,
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

const MyYeatsStack = createStackNavigator({
    Settings: MyYeatsScreen,
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

export default createBottomTabNavigator({
  HomeStack,
  SettingsStack,
    PreferencesStack,
    MyYeatsStack
});
