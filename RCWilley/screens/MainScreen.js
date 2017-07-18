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
import { Button, Icon, Tabs, Tab } from 'react-native-elements';

const WEBVIEW_REF = 'webview';
const DEFAULT_URL = 'https://www.rcwilley.com';

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
        const DATA = params ? params.scanData : '';
        const SEARCH_URL = `${DEFAULT_URL}/Search.jsp?q=${DATA}`;

        return (
            <View style={styles.container}>
                <WebView
                    ref={WEBVIEW_REF}
                    style={{ flex: 1 }}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                    source={{ uri: params ? SEARCH_URL : DEFAULT_URL }}
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
                // <View>
                //     <Tabs tabBarStyle={{ backgroundColor: '#14458A' }}>
                //         <Tab
                //             titleStyle={{ fontSize: 12, color: '#FFFFFF', marginTop: 5 }}
                //             title={'Back'}
                //             renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 42, marginBottom: 5}} color={'#FFFFFF'} name='reply' size={33} />}
                //             onPress={this.onBack.bind(this)}>
                //         >
                //         </Tab>
                //         <Tab
                //             titleStyle={{ fontSize: 12, color: '#FFFFFF', marginTop: 5 }}
                //             title={'Scan'}
                //             renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 42, marginBottom: 5}} color={'#FFFFFF'} name='crop-free' size={33} />}
                //             onPress={this.onCameraButtonPress}>
                //         >
                //         </Tab>
                //     </Tabs>
                // </View>
                }

            {
                // this.state.canGoBack ?
                // <View style={styles.topbar}>
                // <TouchableOpacity
                //     disabled={!this.state.canGoBack}
                //     onPress={this.onBack.bind(this)}
                // >
                //     <Text style={this.state.canGoBack ? styles.topbarText : styles.topbarTextDisabled}>
                //     Previous Page
                //     </Text>
                // </TouchableOpacity>
                // </View> : null
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
