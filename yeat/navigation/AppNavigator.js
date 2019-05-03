import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import LoadingScreen from '../screens/LoadingScreen';

const AuthStack = createStackNavigator({ Login : LoginScreen});

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Loading: LoadingScreen,
    Auth: AuthStack,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'Loading',
  }
));