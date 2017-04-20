import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  WebView
} from 'react-native';

const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'http://rcwilley.com';

export default class albums extends Component {

  state = {
    url: DEFAULT_URL,
    status: 'No Page Loaded',
    loading: true,
    scalesPageToFit: true,
    canGoBack: false
  };

  onNavigationStateChange = (navState) => {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true,
      canGoBack: navState.canGoBack
    });
  };

  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  render() {
    return (
        <View style={styles.container}>
          <WebView
            ref={WEBVIEW_REF}
            style={{ flex: 1 }}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            source={{ uri: 'http://rcwilley.com' }}
            decelerationRate="normal"
            scalesPageToFit={this.state.scalesPageToFit}
          />
          {
            this.state.canGoBack ? 
            <View style={styles.topbar}>
              <TouchableOpacity
                disabled={!this.state.canGoBack}
                onPress={this.onBack.bind(this)}
              >
                <Text style={this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled}>
                  Previous Page
                </Text>
              </TouchableOpacity>
            </View> : null
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  topbar: {
    padding: 10,
    backgroundColor: '#14458a',
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'column'
  },
  topbarText: {
    color: 'white',
  },
  topbarTextDisabled: {
    color: 'gray'
  }
});

AppRegistry.registerComponent('albums', () => albums);
