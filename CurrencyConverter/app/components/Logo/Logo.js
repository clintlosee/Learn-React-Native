import React from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import styles from './styles';

const Logo = () => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.containerImage}
      source={require('./images/background.png')}
      resizeMode="contain"
    >
      <Image style={styles.image} resizeMode="contain" source={require('./images/logo.png')} />
    </ImageBackground>
    <Text style={styles.text}>Currencty Converter</Text>
  </View>
);

export default Logo;
