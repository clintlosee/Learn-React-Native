import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Card, CardSection, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBTvDcQJn2lp4lx2SdSQ-8FY_IJIKJp_Xs',
            authDomain: 'auth-4f8ff.firebaseapp.com',
            databaseURL: 'https://auth-4f8ff.firebaseio.com',
            storageBucket: 'auth-4f8ff.appspot.com',
            messagingSenderId: '891393386847'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </Card>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText={'Authentication'}/>
                {//this.renderContent()
                    }
                <Button>
                    test
                    Text
                    </Button>
            </View>
        );
    }
}

export default App;