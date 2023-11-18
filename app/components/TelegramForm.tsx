import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import ActionButton from './ActionButton'; // Assurez-vous que le chemin d'accès est correct

type Props = {
  onButtonPress: (text: string) => void;
  loading?: boolean;
};

const TelegramForm = ({onButtonPress, loading}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };
  console.log('inputValue', inputValue);

  const handlePress = () => {
    console.log('Pressed');

    if (onButtonPress && inputValue) {
      onButtonPress(inputValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your Telegram handle</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={inputValue}
        placeholder="Enter text here"
      />
      <ActionButton
        loading={loading}
        text="Enter the ETHBreaker"
        onPress={handlePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 50,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    color: 'white',
    borderRadius: 5,
  },
});

export default TelegramForm;
