import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import MainScreen from './screens/MainScreen';
import CameraScreen from './screens/CameraScreen';
import ProdSearchScreen from './screens/ProdSearchScreen';

const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://rcwtest.rcwilley.com';

class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      main: { screen: MainScreen },
      camera: { screen: CameraScreen },
      // product: { screen: ProdSearchScreen }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  }
});

Expo.registerRootComponent(App);
