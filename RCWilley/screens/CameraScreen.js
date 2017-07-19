import Expo, { BarCodeScanner, Permissions } from 'expo';
import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Icon, Header } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class CameraScreen extends Component {
    state = {
        hasCameraPermission: ''
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    };

    _handleBarCodeRead = data => {
        this.props.navigation.navigate('main', { scanData: data.data });
        // Alert.alert(
        //     'Scanned',
        //     'SKU: ' + JSON.stringify(data.data),
        //     [
        //         { text: 'Sounds Good', onPress: () => 
        //             // this.props.navigation.navigate('product', { scanData: data.data })
        //             this.props.navigation.navigate('main', { scanData: data.data })
        //         },
        //         { text: 'Cancel', onPress: () => {}, style: 'cancel' }
        //     ]
        // );
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Text style={styles.scanText}>Scan Barcode</Text>
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={{ height: SCREEN_HEIGHT - 65, width: SCREEN_WIDTH, top: 65 }}
                        type="back"
                    />
                    <View style={styles.buttonContainer}>
                        <Icon
                            raised
                            name='close'
                            type='font-awesome'
                            color='#14458A'
                            size={28}
                            onPress={ () => this.props.navigation.navigate('main') } />
                    </View>
                </View>
            );
        }
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        right: 10
    },
    scanText: {
        position: 'absolute',
        top: 15,
        left: 0,
        right: 0,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: 'transparent',
        color: '#FFFFFF'
    }
}

export default CameraScreen;
