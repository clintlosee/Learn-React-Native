import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

class App extends React.Component {
    componentDidMount() {
        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyB3tfYnlMCvCdUj358P_fgpecmRfZR3YVQ",
            authDomain: "one-time-password-81201.firebaseapp.com",
            databaseURL: "https://one-time-password-81201.firebaseio.com",
            projectId: "one-time-password-81201",
            storageBucket: "one-time-password-81201.appspot.com",
            messagingSenderId: "40906547967"
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
        <View style={styles.container}>
            <SignUpForm />
            <SignInForm />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

Expo.registerRootComponent(App);
