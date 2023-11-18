import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

type Props = {
  text: string;
  style?: any;
};

function ActionButton({text, style}: Props) {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => console.log('Navigate to HandleView')}
        style={styles.button}>
        <Text style={styles.loremIpsum}>
          {text || 'Sign in with WalletConnect'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  button: {
    width: 320,
    height: 50,
    backgroundColor: 'rgba(33,92,175,1)',
    borderRadius: 5,
    alignSelf: 'center',
  },
  loremIpsum: {
    fontFamily: 'roboto-700',
    color: 'rgba(255,255,255,1)',
    marginTop: 17,
    marginLeft: 78,
  },
});

export default ActionButton;
