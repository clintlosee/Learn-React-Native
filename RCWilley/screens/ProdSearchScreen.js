import Expo, { Constants, BarCodeScanner, Permissions } from 'expo';
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  WebView,
  Alert
} from 'react-native';

const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://rcwtest.rcwilley.com';

class ProdSearchScreen extends Component {
    state = {
        url: DEFAULT_URL,
        status: 'No Page Loaded',
        loading: true,
        scalesPageToFit: true,
        canGoBack: false,
        hasCameraPermission: ''
    };

    onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
            scalesPageToFit: true,
            javaScriptEnabled: true,
            canGoBack: navState.canGoBack
        });
    };

    onBack() {
        this.refs[WEBVIEW_REF].goBack();
    }

    onCamera = () => {
        this.props.navigation.navigate('camera', { user: 'clint' });
    }

    render() {
        const { params } = this.props.navigation.state;
        const searchUrl = 'https://rcwtest.rcwilley.com/Search.jsp?q=' + params.scanData;
        return (
            <View style={styles.container}>
                <View style={styles.cameraButton}>
                    <TouchableOpacity onPress={this.onCamera}>
                        <Text>Product URL { `${searchUrl}` }</Text>
                    </TouchableOpacity>
                </View>

                {
                    params ?
                    <WebView
                        ref={WEBVIEW_REF}
                        style={{ flex: 1 }}
                        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                        source={{ uri: `${searchUrl}` }}
                        decelerationRate="normal"
                        scalesPageToFit={this.state.scalesPageToFit}
                        javaScriptEnabled={this.state.javaScriptEnabled}
                        // injectedJavaScript={this.webview.postMessage('Hello from RN')}
                    /> : null
                }

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
    // marginTop: 20
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
  },
  cameraButton: {
    padding: 20,
    backgroundColor: '#ff6600'
  }
});

export default ProdSearchScreen;
