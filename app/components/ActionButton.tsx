import React from 'react';
import {TouchableOpacity, Text, Dimensions} from 'react-native';
import ButtonStyle from './Button.style';

const screenWidth = Dimensions.get('window').width;

type Props = {
  text: string;

  onPress?: () => void;
};

function ActionButton({text, onPress}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[ButtonStyle.button, {width: screenWidth * 0.8}]} // 80% de la largeur de l'écran
    >
      <Text style={ButtonStyle.text}>{text}</Text>
    </TouchableOpacity>
  );
}

export default ActionButton;
