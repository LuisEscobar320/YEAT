import React from 'react';
import MapView from 'react-native-maps'
import { ExpoConfigView } from '@expo/samples';
import { View, Button } from 'react-native';
import firebase from 'firebase';

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (

      <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 32.8801,
        longitude: -117.235277,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      }}
      showsUserLocation={true}
      showsBuildings={true}
    />

    );
      
  }
}
