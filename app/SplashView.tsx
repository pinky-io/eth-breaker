import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {W3mButton} from '@web3modal/wagmi-react-native';

function SplashView({}) {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <W3mButton />
      <Image
        source={require('./assets/images/Cover.png')}
        resizeMode="contain"
        style={{width: screenWidth, height: screenHeight}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29,38,51,1)',
  },
  actionButton: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 50,
  },
});

export default SplashView;
