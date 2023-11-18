import React from 'react';
import {StyleSheet, View, StatusBar, Image} from 'react-native';
import ActionButton from './components/ActionButton';

function SplashView({}) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ActionButton text="Connect Wallet" style={styles.actionButton} />
      <Image
        source={require('./assets/images/Cover.png')}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(29,38,51,1)',
  },
  actionButton: {
    height: 50,
    width: 320,
    marginTop: 705,
    marginLeft: 27,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: -698,
    marginLeft: 73,
  },
});

export default SplashView;
