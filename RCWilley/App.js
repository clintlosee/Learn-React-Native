import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import MainScreen from './screens/MainScreen';
import CameraScreen from './screens/CameraScreen';
import ProdSearchScreen from './screens/ProdSearchScreen';

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      main: { screen: MainScreen },
      camera: { screen: CameraScreen },
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20
    paddingTop: 20,
    backgroundColor: '#2859A6'
  }
});
