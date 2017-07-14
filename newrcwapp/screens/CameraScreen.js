import Expo, { BarCodeScanner, Permissions } from 'expo';
import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';

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
        //     'Scan Successful',
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
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={{ height: 650, width: 400 }}
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

        // return (
        //     <View>
        //         {
        //           this.state.hasCameraPermission === null ?
        //           <Text>Requesting for camera permission</Text> :
        //           this.state.hasCameraPermission === false ?
        //             <Text>Camera permission is not granted</Text> :
        //             <BarCodeScanner
        //               onBarCodeRead={this._handleBarCodeRead}
        //               style={{ height: 650, width: 400 }}
        //             />
        //         }
        //     </View>
        // );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        right: 10
    }
}

export default CameraScreen;