import React from 'react';
import {TouchableOpacity, Text, Dimensions} from 'react-native';
import ButtonStyle from './Button.style';

const screenWidth = Dimensions.get('window').width;

type Props = {
  text: string;
  style?: any;
  onPress?: () => void;
};

function ActionButton({text, style, onPress}: Props) {
  return (
    <TouchableOpacity style={[ButtonStyle.container, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={[ButtonStyle.button, {width: screenWidth * 0.8}]} // 80% de la largeur de l'écran
      >
        <Text style={ButtonStyle.text}>
          {text || 'Sign in with WalletConnect'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default ActionButton;
