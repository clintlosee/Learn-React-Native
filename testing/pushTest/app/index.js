import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

import OneSignal from 'react-native-onesignal'; // Import package from node modules

export default class App extends Component {
    componentDidMount() {
        OneSignal.configure({});
        OneSignal.enableInAppAlertNotification(true);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Hello!</Text>
            </View>
        )
    }
}