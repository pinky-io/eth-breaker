import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

type Props = {
  text: string;
  style?: any;
};

function ActionButton({text, style}: Props) {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => console.log('Navigate to HandleView')}
        style={[styles.button, {width: screenWidth * 0.8}]} // 80% de la largeur de l'écran
      >
        <Text style={styles.text}>{text || 'Sign in with WalletConnect'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  button: {
    height: 50,
    backgroundColor: 'rgba(33,92,175,1)',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center', // Centre horizontalement
  },
  text: {
    textAlign: 'center',
    fontFamily: 'roboto-700',
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
  },
});

export default ActionButton;
