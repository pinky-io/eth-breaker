import React from 'react';
import {
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import ButtonStyle from './Button.style';

const screenWidth = Dimensions.get('window').width;

type Props = {
  text: string;
  style?: any;
  onPress?: () => void;
  loading?: boolean;
};

function ActionButton({text, onPress, style, loading}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[ButtonStyle.button, {width: screenWidth * 0.8}, style]} // 80% de la largeur de l'écran
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={ButtonStyle.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

export default ActionButton;
