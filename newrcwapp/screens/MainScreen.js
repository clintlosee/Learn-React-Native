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
import { Button, Icon } from 'react-native-elements';

const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://rcwtest.rcwilley.com';

class MainScreen extends Component {
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

    onCameraButtonPress = () => {
        this.props.navigation.navigate('camera');
    }

  render() {
      const { params } = this.props.navigation.state;
    //   const searchUrl = params ? params.scanData : '';
        const data = params ? params.scanData : '';
      const searchUrl = 'https://rcwtest.rcwilley.com/Search.jsp?q=' + data;
    return (
        <View style={styles.container}>
            <WebView
                ref={WEBVIEW_REF}
                style={{ flex: 1 }}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                // source={{ uri: `${DEFAULT_URL}?q=${searchUrl}` }}
                source={{ uri: params ? searchUrl : DEFAULT_URL }}
                decelerationRate="normal"
                scalesPageToFit={this.state.scalesPageToFit}
                javaScriptEnabled={this.state.javaScriptEnabled}
                // injectedJavaScript={this.webview.postMessage('Hello from RN')}
            />

            <View style={styles.buttonContainer}>
                <Icon
                    reverse
                    raised
                    name='camera'
                    type='font-awesome'
                    color='#14458A'
                    size={28}
                    onPress={this.onCameraButtonPress} />
                    {// <Button
                    //     medium
                    //     title="Scan Barcode"
                    //     buttonStyle={{ borderRadius: 10, backgroundColor: '#F90' }}
                    //     icon={{ name: 'camera' }}
                    //     onPress={this.onCameraButtonPress}
                    // />
                    }
            </View>


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
  },
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        // left: 100,
        right: 10
    }
});

export default MainScreen;
