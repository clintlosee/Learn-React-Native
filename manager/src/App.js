import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        const config = {
            apiKey: 'AIzaSyDfxXMfNNEVZWwWTSTxy6wYDgMQz_D-cDE',
            authDomain: 'manager-5c290.firebaseapp.com',
            databaseURL: 'https://manager-5c290.firebaseio.com',
            projectId: 'manager-5c290',
            storageBucket: 'manager-5c290.appspot.com',
            messagingSenderId: '67109951166'
        };
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
